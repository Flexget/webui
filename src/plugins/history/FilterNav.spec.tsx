import React from 'react';
import { Formik } from 'formik';
import fetchMock from 'fetch-mock';
import renderer from 'react-test-renderer';
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
    fetchMock.reset();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
