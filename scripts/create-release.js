import GitHubApi from 'github';
const github = new GitHubApi();

github.authenticate({
  type: 'token',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

github.repos.createRelease({
  owner: 'Flexget',
  repo: 'webui',
  tag_name: `v${process.env.VERSION}`,
  prerelease: process.env.VERSION.includes('beta'),
}).then(result => {
  const id = result.data.id;

  github.authenticate({
    type: 'token',
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  github.uploadAssets({
    owner: 'Flexget',
    repo: 'webui',
    id,
    filePath: '/tmp/dist.zip',
    name: 'dist.zip',
    label: 'Production Build',
  });
});
