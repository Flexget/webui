export function getValues(object, fields) {
  const values = [];
  fields.forEach((field) => {
    if (field in object) {
      values.push(object[field]);
    }
  });
  return values;
}
