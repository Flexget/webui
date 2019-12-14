import React from 'react';
import renderer from 'react-test-renderer';
import SideNavEntry from 'core/layout/SideNavEntry';
import { themed, router } from 'utils/tests';
import SVGIcon from '@material-ui/core/SvgIcon';

describe('core/layout/SideNavEntry', () => {
  it('renders correctly with link', () => {
    const tree = renderer
      .create(router(themed(<SideNavEntry Icon={SVGIcon} name="Test" path="/test" />)))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without link', () => {
    const tree = renderer.create(themed(<SideNavEntry Icon={SVGIcon} name="Test" />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
