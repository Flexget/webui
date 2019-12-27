type func = (...args: any[]) => any;

const is = {
  undef: (v): v is undefined => v === null || v === undefined,
  notUndef: v => v !== null && v !== undefined,
  func: (f): f is func => typeof f === 'function',
  number: (n): n is number => typeof n === 'number',
  string: (s): s is string => typeof s === 'string',
  object: (obj): obj is object => obj && !Array.isArray(obj) && typeof obj === 'object',
  instanceOf: (c, p): c is typeof p => c && p && c instanceof p,
};

export default is;
