import { setFailed } from '@actions/core';
import{ GitHub, context } from '@actions/github';

async function run() {
  const { repo, ref } = context;
  const { repos } = new GitHub(proces.env.GITHUB_TOKEN);

  try {
    await repos.createDeployment({
      ...repo,
      ref: ref.slice(11),
    });
  } catch(err) {
    setFailed(`Action failed with err ${err}`);
  }
}

run();
