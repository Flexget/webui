import React from 'react';
import renderer from 'react-test-renderer';
import { provider, themed, router } from 'utils/tests';
import fetchMock from 'fetch-mock';
import SideNav from './SideNav';

describe('core/layout/components/Sidenav', () => {
  beforeEach(() => {
    fetchMock.get('/api/server/version', {});
  });

  xit('renders correctly with sideBarOpen', () => {
    const sideNav = <SideNav sideBarOpen toggle={jest.fn()} />;
    const tree = renderer.create(provider(router(themed(sideNav)), { version: {} })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('adds mini classes without sideBarOpen', () => {
    const sideNav = <SideNav toggle={jest.fn()} />;
    const tree = renderer.create(provider(router(themed(sideNav)), { version: {} })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
