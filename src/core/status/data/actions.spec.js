import { clearStatus } from 'core/status/data/actions';

describe('core/status/data/actions', () => {
  it('should create an action to close the status', () => {
    expect(clearStatus()).toMatchSnapshot();
  });
});
