import React, { FC, useEffect } from 'react';
import { cleanup } from '@testing-library/react';
import { useHistory, Route, Switch } from 'react-router';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import PendingList from './Series';

interface Props {
  path: string;
}

const TestSeries: FC<Props> = ({ path }) => {
  const { push } = useHistory();
  useEffect(() => {
    push(path);
  }, [path, push]);
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Switch>
        <Route path="/series">
          <PendingList />
        </Route>
      </Switch>
    </>
  );
};

describe('plugins/series', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/series?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('contextual app bar', () => {
    describe.each`
      name          | title         | path
      ${'series'}   | ${'Series'}   | ${'/series'}
      ${'episodes'} | ${'Episodes'} | ${'/series/1'}
      ${'releases'} | ${'Releases'} | ${'/series/1/episodes/2'}
    `('$name', ({ title, path }) => {
      it(`should have title ${title} on ${path}`, async () => {
        const { findByText } = renderWithWrapper(<TestSeries path={path} />);

        expect(await findByText(title, { selector: 'h6' })).toBeInTheDocument();
      });
    });
  });
});
