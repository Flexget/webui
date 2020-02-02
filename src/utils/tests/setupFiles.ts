import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('monaco-editor/esm/vs/editor/editor.api.js');

Enzyme.configure({ adapter: new Adapter() });

console.error = jest.fn(); // eslint-disable-line no-console,@typescript-eslint/unbound-method
