import React from 'react';
import { Formik } from 'formik';
import TextField from 'common/inputs/formik/TextField';
import renderer from 'react-test-renderer';
import ThemeProvider from 'core/theme/ThemeProvider';

describe('common/TextField', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Formik initialValues={{ field: '' }} onSubmit={jest.fn()}>
          <ThemeProvider>
            <TextField name="field" />
          </ThemeProvider>
        </Formik>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
