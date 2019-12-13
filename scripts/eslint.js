import path from 'path';
import { codeFrameColumns } from '@babel/code-frame';
import { getInput, setFailed, info } from '@actions/core';
import { GitHub, context } from '@actions/github';
const { CLIEngine } = require('eslint');

function chunk(array, size = 1) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

async function getCheckRunForAction(github) {
  const { ref, repo, eventName } = context;
  const { data } = await github.checks.listForRef({
    ...repo,
    ref,
    status: 'in_progress'
  });

  if (!data.check_runs.length) {
    throw new Error(`Could not find check run for action: ${name}`);
  }
  const checkRun = data.check_runs.find(run =>
    run.name.includes(eventName)
  );

  if (!checkRun) {
    info(JSON.stringify(data, null, 2));
    throw new Error(`Could not find check run in: runs`);
  }
  return checkRun;
}

const formatFilePath = (filePath, line, column) => {
  const relPath = path.relative(process.cwd(), filePath);

  if (line && column) {
    return `${relPath}:${line}:${column}`;
  }
  return relPath;
};

const formatMessage = (
  { message, ruleId, line, column, fatal, severity },
  { filePath, output, source },
) => {
  const type = fatal || severity === 2 ? 'failure' : 'warning';
  const fp = formatFilePath(filePath, line, column);
  const sourceCode = output || source;

  const firstLine = [
    `${type}:`,
    message,
    fatal ? ruleId : '',
    sourceCode ? `at ${fp}:` : `at ${fp}`,
  ]
    .filter(String)
    .join(' ');

  const result = sourceCode
    ? codeFrameColumns(sourceCode, { start: { line, column } }, { highlightCode: false })
    : '';

  return {
    message: result,
    start_line: line,
    end_line: line,
    annotation_level: type,
    start_column: column,
    end_column: column,
    path: fp,
    title: firstLine,
  };
};

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

const formatSummary = ({
  errorCount: errors,
  warningCount: warnings,
  fixableErrorCount: fixableErrors,
  fixableWarningCount: fixableWarnings,
}) => {
  const summary = [];
  const fixablesSummary = [];

  if (errors > 0) {
    summary.push(`${errors} ${pluralize('error', errors)}`);
  }

  if (warnings > 0) {
    summary.push(`${warnings} ${pluralize('warning', warnings)}`);
  }

  if (fixableErrors > 0) {
    fixablesSummary.push(`${fixableErrors} ${pluralize('error', fixableErrors)}`);
  }

  if (fixableWarnings > 0) {
    fixablesSummary.push(`${fixableWarnings} ${pluralize('warning', fixableWarnings)}`);
  }

  let output = `${summary.join(' and ')} found.`;

  if (fixableErrors || fixableWarnings) {
    output += `\n${fixablesSummary.join(' and ')} potentially fixable with the \`--fix\` option.`;
  }

  return output;
};

const formatResults = (results) => {
  return results
    .filter(result => !!result.messages.length)
    .flatMap(result => {
      info(JSON.stringify(result))
      return      result.messages.map(m => formatMessage(m, result))
    });
};

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
