// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from "react-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let container = null;
global.beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

global.afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

global.console = {
  log: console.log, // console.log are ignored in tests

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: jest.fn(),
  warn: jest.fn(),
  info: console.info,
  debug: console.debug,
};

configure({ adapter: new Adapter() });