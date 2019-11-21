const { getInput, setFailed, info } = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');

  const { repo, ref } = context;
  const { repos } = new GitHub(myToken);

  try {
    const data = await repos.createDeployment({
      ...repo,
      ref,
      task: 'deploy',
      environment: 'production',
    });
    info(data);
  } catch(err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
