import { createBrowserHistory } from 'history';
import { uriParser } from 'utils';

export default createBrowserHistory({
  basename: `${uriParser(document.baseURI).pathname}${
    process.env.NODE_ENV === 'production' ? 'v2/' : ''
  }`,
});
