import { RawEntry } from 'core/entry/types';

export const toExecuteRequest = (entry?: RawEntry) => {
  if (entry) {
    const { id, title, originalUrl, ...fields } = entry;
    return { title, url: originalUrl, fields };
  }
  return { title: '', url: '', fields: {} };
};
