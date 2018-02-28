import GitHubApi from 'github';

const github = new GitHubApi();

const args = process.argv.slice(2);

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

github.repos.createRelease({
  owner: 'Flexget',
  repo: 'webui',
  tag_name: args[0],
  prerelease: false,
}).then(result => {
  const id = result.data.id;

  github.authenticate({
    type: 'token',
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  github.repos.uploadAsset({
    owner: 'Flexget',
    repo: 'webui',
    id,
    filePath: '/tmp/dist.zip',
    name: 'dist.zip',
    label: 'Production Build',
  });
})
  .catch((err) => {
    console.log('Problem creating release');
    console.log(err);
  });
