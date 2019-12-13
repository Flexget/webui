import { getInput, setFailed } from '@actions/core';
import { GitHub, context } from '@actions/github';

async function run() {
  const myToken = getInput('token');

  const { repo, ref } = context;
  const { repos } = new GitHub(myToken);

  try {
    const data = await repos.createDeployment({
      ...repo,
      ref: ref.slice(11),
    });
  } catch (err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
