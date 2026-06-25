import YAML from 'yaml';
import {
  toKebabCase,
  extractRssUrl,
  replaceRssUrl,
  replaceTaskName,
  extractSeriesNames,
  appendToQueryParam,
  extractQueryParamNames,
  validate,
} from './utils';
import { FormValues } from './types';

// ---------------------------------------------------------------------------
// toKebabCase
// ---------------------------------------------------------------------------
describe('toKebabCase', () => {
  it('lowercases and hyphenates words', () => {
    expect(toKebabCase('Breaking Bad')).toBe('breaking-bad');
  });

  it('strips leading and trailing punctuation', () => {
    expect(toKebabCase('--Show Name--')).toBe('show-name');
  });

  it('collapses consecutive non-alphanumeric chars into one hyphen', () => {
    expect(toKebabCase('Mr. Robot!')).toBe('mr-robot');
  });

  it('leaves an already-kebab string unchanged', () => {
    expect(toKebabCase('already-kebab')).toBe('already-kebab');
  });

  it('handles numeric characters', () => {
    expect(toKebabCase('Show 2049')).toBe('show-2049');
  });
});

// ---------------------------------------------------------------------------
// extractRssUrl
// ---------------------------------------------------------------------------
describe('extractRssUrl', () => {
  it('extracts a direct string rss key', () => {
    const yaml = YAML.stringify({ rss: 'http://direct.com/feed' });
    expect(extractRssUrl(yaml)).toBe('http://direct.com/feed');
  });

  it('extracts rss.url from an object rss key', () => {
    const yaml = YAML.stringify({ rss: { url: 'http://obj.com/feed', other: true } });
    expect(extractRssUrl(yaml)).toBe('http://obj.com/feed');
  });

  it('extracts from nested config.rss string', () => {
    const yaml = YAML.stringify({ config: { rss: 'http://nested.com/feed' }, name: 'task' });
    expect(extractRssUrl(yaml)).toBe('http://nested.com/feed');
  });

  it('extracts from nested config.rss.url', () => {
    const yaml = YAML.stringify({
      config: { rss: { url: 'http://nested-obj.com/feed' } },
      name: 'task',
    });
    expect(extractRssUrl(yaml)).toBe('http://nested-obj.com/feed');
  });

  it('returns empty string when no rss key', () => {
    expect(extractRssUrl(YAML.stringify({ name: 'no-rss' }))).toBe('');
  });

  it('returns empty string for malformed YAML', () => {
    expect(extractRssUrl(': bad: yaml: {')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(extractRssUrl('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// replaceRssUrl
// ---------------------------------------------------------------------------
describe('replaceRssUrl', () => {
  it('replaces a direct string rss value', () => {
    const input = YAML.stringify({ rss: 'http://old.com', name: 'task' });
    const result = YAML.parse(replaceRssUrl(input, 'http://new.com'));
    expect(result.rss).toBe('http://new.com');
    expect(result.name).toBe('task');
  });

  it('replaces rss.url in object form', () => {
    const input = YAML.stringify({ rss: { url: 'http://old.com', ttl: 30 } });
    const result = YAML.parse(replaceRssUrl(input, 'http://new.com'));
    expect(result.rss.url).toBe('http://new.com');
    expect(result.rss.ttl).toBe(30);
  });

  it('replaces nested config.rss string', () => {
    const input = YAML.stringify({ config: { rss: 'http://old.com' }, name: 'task' });
    const result = YAML.parse(replaceRssUrl(input, 'http://new.com'));
    expect(result.config.rss).toBe('http://new.com');
  });

  it('replaces nested config.rss.url', () => {
    const input = YAML.stringify({ config: { rss: { url: 'http://old.com' } }, name: 'task' });
    const result = YAML.parse(replaceRssUrl(input, 'http://new.com'));
    expect(result.config.rss.url).toBe('http://new.com');
  });

  it('returns the original string unchanged for non-object YAML', () => {
    expect(replaceRssUrl('just a string', 'http://new.com')).toBe('just a string');
  });
});

// ---------------------------------------------------------------------------
// replaceTaskName
// ---------------------------------------------------------------------------
describe('replaceTaskName', () => {
  it('replaces the name key', () => {
    const input = YAML.stringify({ name: 'old-name', config: { rss: 'http://x.com' } });
    const result = YAML.parse(replaceTaskName(input, 'new-name'));
    expect(result.name).toBe('new-name');
    expect(result.config.rss).toBe('http://x.com');
  });

  it('returns original string when no name key present', () => {
    const input = YAML.stringify({ config: { rss: 'http://x.com' } });
    expect(replaceTaskName(input, 'new-name')).toBe(input);
  });

  it('returns original string for non-object YAML', () => {
    expect(replaceTaskName('plain string', 'new-name')).toBe('plain string');
  });
});

// ---------------------------------------------------------------------------
// extractSeriesNames
// ---------------------------------------------------------------------------
describe('extractSeriesNames', () => {
  it('extracts a flat array of string series', () => {
    const yaml = YAML.stringify({ series: ['Breaking Bad', 'The Wire'] });
    expect(extractSeriesNames(yaml)).toEqual(expect.arrayContaining(['Breaking Bad', 'The Wire']));
  });

  it('extracts series from array of single-key objects', () => {
    const yaml = YAML.stringify({ series: [{ 'Show Name': { quality: 'hdtv' } }] });
    expect(extractSeriesNames(yaml)).toContain('Show Name');
  });

  it('extracts from grouped object format', () => {
    const yaml = YAML.stringify({ series: { group1: ['Foo', 'Bar'] } });
    expect(extractSeriesNames(yaml)).toEqual(expect.arrayContaining(['Foo', 'Bar']));
  });

  it('extracts from nested config.series', () => {
    const yaml = YAML.stringify({ config: { series: ['Nested Show'] }, name: 'task' });
    expect(extractSeriesNames(yaml)).toContain('Nested Show');
  });

  it('returns empty array when no series key', () => {
    expect(extractSeriesNames(YAML.stringify({ name: 'task' }))).toEqual([]);
  });

  it('returns empty array for malformed YAML', () => {
    expect(extractSeriesNames(': { bad')).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(extractSeriesNames('')).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// appendToQueryParam
// ---------------------------------------------------------------------------
describe('appendToQueryParam', () => {
  it('appends suffix to the named param value', () => {
    expect(appendToQueryParam('http://x.com?q=base&cat=1', 'q', 'Foo')).toBe(
      'http://x.com?q=base+Foo&cat=1',
    );
  });

  it('leaves URL unchanged when param is not present', () => {
    const url = 'http://x.com?other=1';
    expect(appendToQueryParam(url, 'q', 'Foo')).toBe(url);
  });

  it('only appends to the first matching param', () => {
    const result = appendToQueryParam('http://x.com?q=a&q=b', 'q', 'X');
    expect(result).toBe('http://x.com?q=a+X&q=b');
  });
});

// ---------------------------------------------------------------------------
// extractQueryParamNames
// ---------------------------------------------------------------------------
describe('extractQueryParamNames', () => {
  it('returns all param names from a valid URL', () => {
    expect(extractQueryParamNames('http://x.com?foo=1&bar=2')).toEqual(['foo', 'bar']);
  });

  it('returns empty array for URL with no query string', () => {
    expect(extractQueryParamNames('http://x.com/path')).toEqual([]);
  });

  it('returns empty array for an invalid URL without throwing', () => {
    expect(extractQueryParamNames('not a url')).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// validate
// ---------------------------------------------------------------------------
describe('validate', () => {
  const base: FormValues = {
    taskName: 'my-task',
    autoUpdateTaskName: false,
    rssBackfillUrl: 'http://x.com',
    sourceBackfillUrl: 'http://x.com',
    taskConfig: 'name: my-task',
    selectedSeries: '',
    backfillTaskConfig: '',
    extras: '',
    sourceTaskName: '',
  };

  it('returns no errors when all required fields are present', () => {
    expect(validate(base)).toEqual({});
  });

  it('requires taskName', () => {
    expect(validate({ ...base, taskName: '' })).toMatchObject({
      taskName: 'Task name is required',
    });
  });

  it('requires rssBackfillUrl', () => {
    expect(validate({ ...base, rssBackfillUrl: '' })).toMatchObject({
      rssBackfillUrl: 'Backfill RSS URL is required',
    });
  });

  it('requires taskConfig', () => {
    expect(validate({ ...base, taskConfig: '' })).toMatchObject({
      taskConfig: 'Task Config is required',
    });
  });

  it('returns all three errors when all required fields are empty', () => {
    const errors = validate({ ...base, taskName: '', rssBackfillUrl: '', taskConfig: '' });
    expect(errors).toMatchObject({
      taskName: expect.any(String),
      rssBackfillUrl: expect.any(String),
      taskConfig: expect.any(String),
    });
  });
});
