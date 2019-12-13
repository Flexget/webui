import { setFailed } from '@actions/core';
import { GitHub, context } from '@actions/github';

async function run() {
  const state = process.argv[2];

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
