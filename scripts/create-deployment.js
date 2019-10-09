import Octokit from '@octokit/rest';

const github = new Octokit();

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

github.repos
  .createDeployment({
    owner: 'FlexGet',
    repo: 'webui',
    ref: process.ENV.GITHUB_REF,
    task: 'deploy',
    environment: 'production',
  })
  .catch(err => {
    console.log('Problem creating release');
    console.log(err);
    process.exit(1);
  });
