import React, { FC, useEffect } from 'react';
import { cleanup } from '@testing-library/react';
import { useHistory, Route, Switch } from 'react-router';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import Tasks from './Tasks';

interface Props {
  path: string;
}

const TestTasks: FC<Props> = ({ path }) => {
  const { push } = useHistory();
  useEffect(() => {
    push(path);
  }, [path, push]);
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Switch>
        <Route path="/tasks">
          <Tasks />
        </Route>
      </Switch>
    </>
  );
};

describe('plugins/tasks', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/tasks/status?*', [])
      .get('glob:/api/tasks/status/1', {})
      .get('glob:/api/tasks/status/1/executions?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    describe.each`
      name            | title                          | path
      ${'task'}       | ${'Tasks - Latest Executions'} | ${'/tasks'}
      ${'executions'} | ${'Task Executions'}           | ${'/tasks/1'}
    `('$name', ({ title, path }) => {
      it(`should have title ${title} on ${path}`, async () => {
        const { findByText } = renderWithWrapper(<TestTasks path={path} />);

        expect(await findByText(title, { selector: 'h6' })).toBeInTheDocument();
      });
    });
  });
});
