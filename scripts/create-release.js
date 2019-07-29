import fs from 'fs';
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
}).then((result) => {
  console.log(result);

  github.authenticate({
    type: 'token',
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const fileStream = fs.createReadStream('/tmp/dist.zip');
  const stats = fs.statSync('/tmp/dist.zip');

  return github.repos.uploadAsset({
    url: result.data.upload_url,
    file: fileStream,
    contentType: 'application/zip',
    contentLength: stats.size,
    name: 'dist.zip',
    label: 'Production Build',
  });
})
  .catch((err) => {
    console.log('Problem creating release');
    console.log(err);
    process.exit(1);
  });
