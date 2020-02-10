import React, { FC } from 'react';
import { cleanup } from '@testing-library/react';
import AppBar from 'core/layout/AppBar';
import { renderWithWrapper } from 'utils/tests';
import { Home, Tv, Movie } from '@material-ui/icons';
import { registerPlugin } from 'core/plugins/registry';
import HomePage from './index';

const TestHome: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <HomePage />
    </>
  );
};

registerPlugin('/tasks', {
  routeDisplayName: 'Tasks',
  routeIcon: Home,
  component: () => <div />,
  cardComponent: () => <div />,
});

registerPlugin('/series', {
  routeDisplayName: 'Series',
  routeIcon: Tv,
  component: () => <div />,
  cardComponent: () => <div />,
});

registerPlugin('/movies', {
  routeDisplayName: 'Movies',
  routeIcon: Movie,
  component: () => <div />,
});

describe('core/home', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have title Managed List', () => {
    const { queryByText } = renderWithWrapper(<TestHome />);

    expect(queryByText('Flexget Manager', { selector: 'h6' })).toBeInTheDocument();
  });

  it('should render plugin cards', () => {
    const { queryByText } = renderWithWrapper(<TestHome />);

    expect(queryByText('Tasks')).toBeInTheDocument();
    expect(queryByText('Series')).toBeInTheDocument();
    expect(queryByText('Movies')).not.toBeInTheDocument();
  });

  it('should have plugin links', () => {
    const { queryByText } = renderWithWrapper(<TestHome />);

    expect(queryByText('Tasks')?.closest('a')).toHaveAttribute('href', '/tasks');
    expect(queryByText('Series')?.closest('a')).toHaveAttribute('href', '/series');
  });
});
