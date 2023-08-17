import { cleanFlexgetVersion } from 'utils/version';

describe('utils/version', () => {
  it('parses valid semver', async () => {
    let version = '1.2.3';
    let cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.3');

    version = '2.1.0';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('2.1.0');

    version = '1.2.3-dev';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.3-dev.0');

    version = '1.2.3-dev.1';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.3-dev.1');
  });

  it('parses incomplete semver', async () => {
    let version = '1.1';
    let cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.1.0');

    version = '1';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.0.0');
  });

  it('parses .dev prerelease tags', async () => {
    let version = '1.2.3.dev';
    let cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.3-dev.0');

    version = '1.2.3.dev.1';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.3-dev.1');

    version = '1.2.dev';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.0-dev.0');

    version = '1.2.dev.1';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.2.0-dev.1');

    version = '1.dev';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.0.0-dev.0');

    version = '1.dev.1';
    cleaned = cleanFlexgetVersion(version);
    expect(cleaned).toEqual('1.0.0-dev.1');
  });
});
