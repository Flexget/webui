import { JSDOM, DOMWindow } from 'jsdom';
import fetch, { Headers, Response, Request } from 'node-fetch';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('monaco-editor/esm/vs/editor/editor.api.js');

Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props as any);
}

declare const global: {
  window: DOMWindow;
  document: Document;
  navigator: {
    userAgent: string;
  };
  Response: typeof Response;
  Headers: typeof Headers;
  Request: typeof Request;
  fetch: typeof fetch;
  monaco: any;
};

global.window = window;
global.document = window.document;
global.fetch = fetch;

global.Response = Response;
global.Headers = Headers;
global.Request = Request;

global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

console.error = jest.fn(); // eslint-disable-line no-console,@typescript-eslint/unbound-method
