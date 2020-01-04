import { setFailed } from '@actions/core';
import { GitHub, context } from '@actions/github';

type Status =
      | "error"
      | "failure"
      | "inactive"
      | "in_progress"
      | "queued"
      | "pending"
      | "success";

async function run() {
  const state = process.argv[2] as Status;

  const { repo, payload } = context;
  const { repos } = new GitHub(process.env.GITHUB_TOKEN, { previews: ['flash'] });

  try {
    await repos.createDeploymentStatus({
      ...repo,
      deployment_id: payload.deployment.id,
      state,
    });
  } catch(err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
