const { getInput, setOutput, setFailed, info} = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');

  const { repo, ref } = context;
  const { checks } = new GitHub(myToken);
  try {
    const { data } = await checks.listSuitesForRef({
      ...repo,
      ref,
    });
    const check = data.check_suites.find((s) => (
      s.app.slug === 'github-actions' && s.status === 'completed'
    ));
    if (!check || check.conclusion !== 'success') {
      setOutput('skip', 'true');
      setFailed(`Skipping deployment because tests failed to pass`);
      return;
    }

    info('Not skipping deployment');
    setOutput('skip', 'false');

  } catch(err) {
    setFailed(`Action failed with error ${err}`);
  }
}

run();
