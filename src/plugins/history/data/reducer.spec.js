import reducer from 'plugins/history/data/reducer';
import { GET_HISTORY } from 'plugins/history/data/actions';
import { Headers } from 'utils/tests';


describe('plugins/history/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should store history on GET_HISTORY', () => {
    expect(reducer(undefined, {
      type: GET_HISTORY,
      payload: {
        data: [{ an: 'object' }],
        headers: new Headers({ 'total-count': 1 }),
      },
    })).toMatchSnapshot();
  });
});
