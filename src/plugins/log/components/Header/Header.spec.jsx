import React from 'react';
import renderer from 'react-test-renderer';
import { mapStateToProps, Header } from 'plugins/log/components/Header';
import { themed } from 'utils/tests';

describe('plugins/log/components/Header', () => {
  describe('Header', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        themed(<Header
          start={jest.fn()}
          connected
          stop={jest.fn()}
          query=""
          lines="400"
          clearLogs={jest.fn()}
        />)
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return the right stuff', () => {
      expect(mapStateToProps({ log: {
        connected: true,
        lines: 400,
        query: 'query',
      } })).toMatchSnapshot();
    });
  });
});
