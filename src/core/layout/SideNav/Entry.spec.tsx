import React from 'react';
import renderer from 'react-test-renderer';
import { themed, router } from 'utils/tests';
import SVGIcon from '@material-ui/core/SvgIcon';
import Entry from './Entry';

describe('core/layout/SideNavEntry', () => {
  it('renders correctly with link', () => {
    const tree = renderer
      .create(router(themed(<Entry Icon={SVGIcon} name="Test" path="/test" />)))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without link', () => {
    const tree = renderer.create(themed(<Entry Icon={SVGIcon} name="Test" />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
