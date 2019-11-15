const { getInput, setFailed } = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');

  const { repo, ref } = context;
  const { repos } = new GitHub(myToken);

  try {
    await repos.createDeployment({
      ...repo,
      ref,
      task: 'deploy',
      environment: 'production',
    });
  } catch(err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
