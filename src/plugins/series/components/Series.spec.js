import { mapStateToProps } from 'plugins/series/components';

describe('plugins/series/components/Series', () => {
  it('should return the right stuff', () => {
    expect(mapStateToProps({
      series: {
        shows: {
          items: [],
        },
      },
    })).toMatchSnapshot();
  });
});
