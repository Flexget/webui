export function groupBy<T extends object>(
  array: T[],
  key: keyof T,
  transform: (i: T[typeof key]) => PropertyKey = f => `${f}`,
) {
  return array.reduce((obj, curr) => {
    const modKey: PropertyKey = transform(curr[key]);
    return {
      ...obj,
      [modKey]: obj[modKey] ? [...obj[modKey], curr] : [curr],
    };
  }, {});
}
