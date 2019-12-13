import { getInput, setFailed } from '@actions/core';
import { GitHub, context } from '@actions/github';

type Status = 'error' | 'failure' | 'inactive' | 'in_progress' | 'queued' | 'pending' | 'success';

async function run() {
  const myToken = getInput('token');
  const state: Status = getInput('status') as Status;

  const { repo, payload } = context;
  const { repos } = new GitHub(myToken, { previews: ['flash'] });

  try {
    await repos.createDeploymentStatus({
      ...repo,
      deployment_id: payload.deployment.id,
      state,
    });
  } catch (err) {
    setFailed(`Action failed with err ${err}`);
  }
}
run();
