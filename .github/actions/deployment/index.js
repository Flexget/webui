import github from '@actions/github';
import core from '@actions/core';

async function run() {
  const myToken = core.getInput('token');

  const { repo, ref } = github.context;
  const octokit = new github.GitHub(myToken);

  try {
    octokit.repos.createDeployment({
      ...repo,
      ref,
      task: 'deploy',
      environment: 'production',
    });
  } catch(err) {
    core.setFailed(`Action failed with err ${err}`);
  }
}

run();
