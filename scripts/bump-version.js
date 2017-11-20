import semver from 'semver';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

if (args[0] === 'dev') {
  // change this to patch once we hit 2.0.0
  config.version = `${semver.inc(config.version, 'prerelease')}.dev`;
} else if (args[0] === 'release') {
  config.version = config.version.replace(/.dev$/, '');
}

fs.writeFileSync(path.resolve(__dirname, '../package.json'), `${JSON.stringify(config, null, 2)}\n`);

console.log(config.version);
