import path from 'path';
import { codeFrameColumns } from '@babel/code-frame';
import { info } from '@actions/core';
import { GitHub, context } from '@actions/github';
import { CLIEngine, Linter } from 'eslint';

export async function getCheckRunForAction(github: GitHub) {
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

export const formatSummary = ({
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

export const formatResults = (results: CLIEngine.LintResult[]) => {
  return results
    .filter(result => !!result.messages.length)
    .flatMap(result => result.messages.map(m => formatMessage(m, result)));
};
