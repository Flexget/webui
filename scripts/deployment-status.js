import fs from 'fs';
import Octokit from '@octokit/rest';

const github = new Octokit({
  auth: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
});

const args = process.argv.slice(2);

const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' });

const payload = JSON.parse(file);
const deploymentId = payload.deployment.id;

github.repos
  .createDeploymentStatus({
    owner: 'Flexget',
    repo: 'webui',
    deployment_id: deploymentId,
    status: args[0],
  })
  .catch(err => {
    console.log('Problem creating release');
    console.log(err);
    process.exit(1);
  });
