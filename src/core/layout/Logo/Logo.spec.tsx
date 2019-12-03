import * as React from 'react';
import renderer from 'react-test-renderer';
import { themed, router } from 'utils/tests';
import Logo from 'core/layout/Logo';

describe('core/layout/components/Logo', () => {
  it('renders correctly with sideBarOpen', () => {
    const tree = renderer.create(router(themed(<Logo sidebarOpen />))).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('adds logoMini class without sideBarOpen', () => {
    const tree = renderer.create(router(themed(<Logo sidebarOpen={false} />))).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
