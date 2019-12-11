export const uriParser = (uri: string) => {
  const a = document.createElement('a');
  a.href = uri;
  return a;
};

export const compose = <R>(fn1: (a: R) => R, ...fns: ReadonlyArray<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
