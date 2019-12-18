import React from 'react';
import TextField from 'common/inputs/formik/TextField';
import renderer from 'react-test-renderer';
import { themed, formik } from 'utils/tests';

describe('common/TextField', () => {
  it('renders correctly', () => {
    const textFied = <TextField name="field" />;
    const tree = renderer
      .create(formik(themed(textFied), { initialValues: { field: '' }, onSubmit: jest.fn() }))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
