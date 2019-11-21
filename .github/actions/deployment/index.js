const { getInput, setFailed, info } = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');

  const { repo, ref } = context;
  const { repos } = new GitHub(myToken);

  try {
    const req = {
      ...repo,
      ref,
    };
    info(JSON.stringify(req, null, 2));
    const data = await repos.createDeployment({
      ...repo,
      ref,
    });
    info(JSON.stringify(data, null, 2));
  } catch(err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
