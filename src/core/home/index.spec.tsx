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
  displayName: 'Tasks',
  icon: Home,
  component: () => <div />,
  cardComponent: () => <div />,
});

registerPlugin('series', {
  displayName: 'Series',
  icon: Tv,
  cardComponent: () => <div />,
});

registerPlugin('/movies', {
  displayName: 'Movies',
  icon: Movie,
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
    const { queryAllByText } = renderWithWrapper(<TestHome />);

    const buttons = queryAllByText('See More');

    expect(buttons).toHaveLength(1);

    expect(buttons[0].closest('a')).toHaveAttribute('href', '/tasks');
  });
});
