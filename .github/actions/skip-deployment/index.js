const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const myToken = core.getInput('GITHUB_PERSONAL_ACCESS_TOKEN');

  const { repo, ref } = github.context;
  const octokit = new github.GitHub(myToken);
  const { data  } = await octokit.checks.listSuitesForRef({
    ...repo,
    ref,
  })

    console.log(data);
}

run();
