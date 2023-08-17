import { coerce } from 'semver';

export const cleanFlexgetVersion = (version: string) => {
  const coercedVersion = coerce(version, { includePrerelease: true });
  if (!coercedVersion) {
    return '';
  }

  const regexPrerelease = /(?:\.|-)dev(?:(\.\d+))?/;
  const preMatch = version.match(regexPrerelease);
  const preString = preMatch ? `-dev${preMatch[1] || '.0'}` : '';
  return `${coercedVersion?.format()}${preString}`;
};
