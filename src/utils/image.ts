import { uriParser } from 'utils';

export const getCachedUrl = (url: string) =>
  `${uriParser(document.baseURI).pathname}api/cached?url=${encodeURIComponent(url)}`;
