import path from 'path';
import { chunk } from 'lodash';
import { getInput, setFailed, info } from '@actions/core';
import { GitHub, context } from '@actions/github';
import { codeFrameColumns } from '@babel/code-frame';
import { CLIEngine, Linter } from 'eslint';

const formatFilePath = (filePath: string, line: number, column: number) => {
  const relPath = path.relative(process.cwd(), filePath);

  if (line && column) {
    return `${relPath}:${line}:${column}`;
  }
  return relPath;
};

const formatMessage = (
  { message, ruleId, line, column, fatal, severity }: Linter.LintMessage,
  { filePath, output, source }: CLIEngine.LintResult,
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
  } as const;
};

const pluralize = (word: string, count: number) => (count === 1 ? word : `${word}s`);
const formatSummary = ({
  errorCount: errors,
  warningCount: warnings,
  fixableErrorCount: fixableErrors,
  fixableWarningCount: fixableWarnings,
}: CLIEngine.LintReport) => {
  const summary: string[] = [];
  const fixablesSummary: string[] = [];

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

const formatResults = (results: CLIEngine.LintResult[]) => {
  return results
    .filter(result => !!result.messages.length)
    .flatMap(result => result.messages.map(m => formatMessage(m, result)));
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
  info(formatter(report.results));
  const { repo, sha, eventName } = context;

  if (eventName === 'pull_request') {
    return;
  }

  const { checks } = new GitHub(myToken);

  const annotations = formatResults(report.results);
  const conclusion = report.errorCount ? 'failure' : 'success';
  const grouped = chunk(annotations, 50);
  const a = grouped.shift();

  const rawOutput = {
    title: 'Eslint',
    summary: formatSummary(report),
  };

  try {
    const { data } = await checks.create({
      ...repo,
      name: 'eslint',
      head_sha: sha,
      status: grouped.length ? 'in_progress' : 'completed',
      output: {
        ...rawOutput,
        annotations: a,
      },
      conclusion: grouped.length ? conclusion : undefined,
    });

    while (grouped.length) {
      const ann = grouped.shift();
      checks.update({
        ...repo,
        check_run_id: data.id,
        status: grouped.length ? 'in_progress' : 'completed',
        output: {
          ...rawOutput,
          annotations: ann,
        },
        conclusion: grouped.length ? conclusion : undefined,
      });
    }
  } catch (err) {
    setFailed(`Action failed with err ${err}`);
  }
};

run();
