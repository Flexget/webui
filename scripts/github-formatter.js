const path = require('path');
const { codeFrameColumns } = require('@babel/code-frame');
const { getInput, setFailed, info } = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const formatter = require('eslint/lib/cli-engine/formatters/stylish');

function chunk(array, size = 1) {
  size = Math.max(size, 0);
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

async function getCheckRunForAction(github) {
  const { ref, repo, eventName, action } = context;
  const { data } = await github.checks.listForRef({
    ...repo,
    ref,
    status: 'in_progress',
  });

  if (!data.check_runs.length) {
    throw new Error(`Could not find check run for action: ${action}`);
  }
  const checkRun = data.check_runs.find(run => run.name.includes(eventName));

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

const formatResults = results =>
  results
    .filter(result => !!result.messages.length)
    .flatMap(result => {
      info(JSON.stringify(result));
      return result.messages.map(m => formatMessage(m, result));
    });

module.exports = async results => {
  const myToken = getInput('token');

  const { repo } = context;

  const github = new GitHub(myToken);

  const grouped = chunk(formatResults(results), 50);

  try {
    const run = await getCheckRunForAction(github);
    await Promise.all(
      grouped.map(annotations =>
        github.checks.update({
          ...repo,
          check_run_id: run.id,
          output: {
            annotations,
          },
        }),
      ),
    );
  } catch (err) {
    setFailed(`Action failed with err ${err}`);
  }

  return formatter(results);
};
