export function removeDupesIgnoreCase(values) {
  const lowerMap = Object.assign({}, ...values.map(v => ({ [v.toLowerCase()]: v })));
  const uniqueValues = new Set(values.map(v => v.toLowerCase()));
  return Array.from(uniqueValues).map(v => lowerMap[v]);
}
