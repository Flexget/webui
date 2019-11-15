const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const myToken = core.getInput('token');

  const { repo, ref } = github.context;
  const octokit = new github.GitHub(myToken);
  try {
    const { data } = await octokit.checks.listSuitesForRef({
      ...repo,
      ref,
    });
    console.log(JSON.stringify(data, null, 4));
  } catch(e) {
    core.setFailed(`Action failed with error ${err}`);
  }
}

run();
