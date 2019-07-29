import { createBrowserHistory } from 'history';

export default createBrowserHistory({
  basename: process.env.NODE_ENV === 'production' ? '/v2/' : '',
});
