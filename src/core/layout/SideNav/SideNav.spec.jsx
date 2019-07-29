import React from 'react';
import renderer from 'react-test-renderer';
import SideNav from 'core/layout/SideNav';
import { provider, themed, router } from 'utils/tests';
import fetchMock from 'fetch-mock';

describe('core/layout/components/Sidenav', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/server/version', {});
  });

  xit('renders correctly with sideBarOpen', () => {
    const sideNav = <SideNav sideBarOpen />;
    const tree = renderer.create(provider(router(themed(sideNav)), { version: {} })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('adds mini classes without sideBarOpen', () => {
    const sideNav = <SideNav sideBarOpen={false} />;
    const tree = renderer.create(provider(router(themed(sideNav)), { version: {} })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
