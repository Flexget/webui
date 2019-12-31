import React from 'react';
import renderer from 'react-test-renderer';
import FilterNav from 'plugins/history/FilterNav';
import ThemeProvider from 'core/theme/ThemeProvider';

describe('plugins/history/components/FilterNav', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <FilterNav handleChange={jest.fn()} toggleOrder={jest.fn()} grouping="time" sort="time" />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
