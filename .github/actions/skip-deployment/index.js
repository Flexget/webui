import github from '@actions/github';
import core from '@actions/core';

async function run() {
  const myToken = core.getInput('token');

  const { repo, ref } = github.context;
  const octokit = new github.GitHub(myToken);
  try {
    const { data } = await octokit.checks.listSuitesForRef({
      ...repo,
      ref,
    });
    const check = data.check_suites.find((s) => (
      s.app.slug === 'github-actions' && s.status === 'completed'
    ));
    if (!(!check || check.conclusion !== 'success')) {
      core.setOutput('skip', 'true');
      console.log('here');
      return core.setFailed(`Skipping deployment because tests failed to pass`);
    }

    console.log(' or here');
    core.setOutput('skip', 'false');

  } catch(err) {
    core.setFailed(`Action failed with error ${err}`);
  }
}

run();
