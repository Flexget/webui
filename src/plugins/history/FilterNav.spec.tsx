import React from 'react';
import { Formik } from 'formik';
import fetchMock from 'fetch-mock';
import { cleanup, render } from '@testing-library/react';
import { Direction } from 'utils/query';
import { BaseProviders } from 'utils/tests';
import { TaskContainer } from 'plugins/tasks/hooks';
import { GroupByFields, SortByFields } from './types';
import FilterNav from './FilterNav';

describe('plugins/history/FilterNav', () => {
  beforeEach(() => {
    fetchMock.get('/api/tasks', []).catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('renders correctly', () => {
    const { container } = render(
      <BaseProviders>
        <TaskContainer.Provider>
          <Formik
            initialValues={{
              grouping: GroupByFields.Time,
              task: '',
              page: 1,
              order: Direction.Desc,
              sort: SortByFields.Time,
            }}
            onSubmit={jest.fn()}
          >
            <FilterNav />
          </Formik>
        </TaskContainer.Provider>
      </BaseProviders>,
    );
    expect(container).toMatchSnapshot();
  });
});
