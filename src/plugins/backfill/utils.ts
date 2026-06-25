import YAML from 'yaml';
import { FormValues } from './types';

export const toKebabCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const applyRssUrl = (obj: Record<string, any>, newUrl: string): boolean => {
  if (typeof obj.rss === 'string') {
    obj.rss = newUrl;
    return true;
  }
  if (obj.rss && typeof obj.rss === 'object' && 'url' in obj.rss) {
    obj.rss.url = newUrl;
    return true;
  }
  return false;
};

export const replaceRssUrl = (taskConfig: string, newUrl: string): string => {
  const parsed = YAML.parse(taskConfig);
  if (!parsed || typeof parsed !== 'object') return taskConfig;
  if (!applyRssUrl(parsed, newUrl) && parsed.config && typeof parsed.config === 'object') {
    applyRssUrl(parsed.config, newUrl);
  }
  return YAML.stringify(parsed);
};

export const replaceTaskName = (taskConfig: string, taskName: string): string => {
  const parsed = YAML.parse(taskConfig);
  if (!parsed || typeof parsed !== 'object' || !('name' in parsed)) return taskConfig;
  parsed.name = taskName;
  return YAML.stringify(parsed);
};

export const extractTaskName = (taskConfig: string): string => {
  try {
    const parsed = YAML.parse(taskConfig);
    if (!parsed || typeof parsed !== 'object') return '';
    return typeof parsed.name === 'string' ? parsed.name : '';
  } catch {
    return '';
  }
};

export const extractRssUrl = (taskConfig: string): string => {
  try {
    const parsed = YAML.parse(taskConfig);
    if (!parsed || typeof parsed !== 'object') return '';
    if (typeof parsed.rss === 'string') return parsed.rss;
    if (parsed.rss && typeof parsed.rss === 'object' && 'url' in parsed.rss) return parsed.rss.url;
    if (parsed.config && typeof parsed.config === 'object') {
      if (typeof parsed.config.rss === 'string') return parsed.config.rss;
      if (parsed.config.rss && typeof parsed.config.rss === 'object' && 'url' in parsed.config.rss)
        return parsed.config.rss.url;
    }
  } catch {
    // ignore malformed YAML
  }
  return '';
};

const extractSeriesEntry = (entry: any): string[] => {
  if (typeof entry === 'string') return [entry];
  if (entry && typeof entry === 'object') return Object.keys(entry);
  return [];
};

export const extractSeriesNames = (taskConfig: string): string[] => {
  try {
    const parsed = YAML.parse(taskConfig);
    if (!parsed || typeof parsed !== 'object') return [];
    const seriesConfig = parsed.config?.series ?? parsed.series;
    if (!seriesConfig) return [];
    if (Array.isArray(seriesConfig)) {
      return seriesConfig.flatMap(extractSeriesEntry);
    }
    if (typeof seriesConfig === 'object') {
      return Object.values(seriesConfig).flatMap((group: any) =>
        Array.isArray(group) ? group.flatMap(extractSeriesEntry) : [],
      );
    }
  } catch {
    // ignore malformed YAML
  }
  return [];
};

export const buildAutoTaskName = (taskParam: string, series: string, extras: string): string => {
  const combined = [series, extras].filter(Boolean).join('-');
  return combined
    ? `${taskParam}-${toKebabCase(combined)}-backfill`
    : `${taskParam}-backfill`;
};

export const buildEncodedSeriesName = (series: string, extras: string): string => {
  const combined = [series, extras].filter(Boolean).join('-');
  return encodeURIComponent(combined).replace(/%20/g, '+');
};

export const appendToQueryParam = (url: string, paramName: string, suffix: string): string => {
  const regex = new RegExp(`([?&]${paramName}=)([^&]*)`);
  return url.replace(regex, `$1$2+${suffix}`);
};

export const extractQueryParamNames = (url: string): string[] => {
  try {
    return Array.from(new URL(url).searchParams.keys());
  } catch {
    return [];
  }
};

export const validate = (values: FormValues): Partial<FormValues> => {
  const errors: Partial<FormValues> = {};
  if (!values.taskName) errors.taskName = 'Task name is required';
  if (!values.rssBackfillUrl) errors.rssBackfillUrl = 'Backfill RSS URL is required';
  if (!values.taskConfig) errors.taskConfig = 'Task Config is required';
  return errors;
};
