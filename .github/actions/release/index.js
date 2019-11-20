const fs = require('fs').promises;
const semver = require('semver');
const path = require('path');
const { getInput, setOutput, setFailed } = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  const myToken = getInput('token');
}

run();
