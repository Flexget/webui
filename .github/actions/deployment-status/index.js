const { setFailed } = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');
  const state = getInput('status');

  const { repo, payload } = context;
  const { repos } = new GitHub(myToken, { previews: ['flash'] });

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
