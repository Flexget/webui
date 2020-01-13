import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import { themed } from 'utils/tests';
import { ReadyState } from 'core/api';
import Header from './Header';

describe('plugins/log/Header', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        themed(
          <Formik initialValues={{ query: '', lines: 400 }} onSubmit={jest.fn()}>
            <Header
              connect={jest.fn()}
              readyState={ReadyState.Open}
              disconnect={jest.fn()}
              clear={jest.fn()}
            />
          </Formik>,
        ),
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
