import chunk from 'lodash.chunk';
import { getInput, setFailed, error } from '@actions/core';
import { GitHub, context } from '@actions/github';
import { CLIEngine } from 'eslint';
import { formatSummary, formatResults, getCheckRunForAction } from './utils';

const run = async () => {
  const extensions = getInput('extensions').split(/,\s*/);
  const files = getInput('files').split(/,\s*/);
  const myToken = getInput('token');

  const cli = new CLIEngine({
    extensions,
  });
  const report = cli.executeOnFiles(files);
  const formatter = cli.getFormatter();
  const { repo } = context;

  const github = new GitHub(myToken);

  const grouped = chunk(formatResults(report.results), 50);

  const rawOutput = {
    title: 'Eslint',
    summary: formatSummary(report),
  };

  try {
    const run = await getCheckRunForAction(github);
    await Promise.all(
      grouped.map(annotations =>
        github.checks.update({
          ...repo,
          check_run_id: run.id,
          output: {
            ...rawOutput,
            annotations,
          },
        }),
      ),
    );
  } catch (err) {
    setFailed(`Action failed with err ${err}`);
  }

  if (report.errorCount || report.warningCount) {
    error(formatter(report.results));
    setFailed('Linting errors');
  }
};

run();
