export const uriParser = (uri: string) => {
  const a = document.createElement('a');
  a.href = uri;
  return a;
};
