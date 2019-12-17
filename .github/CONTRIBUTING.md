## How to Contribute

The UI has a solid base but we need help building the plugins and maintaining. If you would like to get your hands dirty in React, CSS or UX Design then please read below and join our [chat](https://flexget.com/Chat).

### Technologies we use:
* [Typescript](https://www.typescriptlang.org)
* [React](https://reactjs.org)
* [Unstated Next](https://github.com/jamiebuilds/unstated-next)
* [Redux](https://redux.js.org) (old - new componets use hooks/unstated)
* [Redux Saga](https://github.com/redux-saga/redux-saga) (old - new components use hooks/unstated)
* [Material UI](https://material-ui.com)
* [Emotion](https://emotion.sh)
* [Webpack](https://webpack.js.org/)

### Getting Setup:

This assumes you have the following technologies installed and on your path:
* [Node 12+](https://nodejs.org)
* [Yarn](https://yarnpkg.com/lang/en/)

1. Fork the repo (Once we see any semi-serious input from a developer we will grant write permissions to our central repository. You can also request this earlier if you wish.)
2. Install dependencies
```bash
$ yarn install
```
3. To start the webpack dever server, you can run. This has hot reloading on by default to make development easier:
```bash
SERVER=<flexget_api:port> yarn start
```
Then you can go to http://localhost:8000 (use `PORT` env variable to run on a different port) in your browser.
4. After you've made your changes, open a PR.

### Notes
* We are in the process of moving from javascript to typescript and if you are making substantial changes to a javascript file, please convert it to typescript if you feel comfortable doing so. All new files should be written in typescript. 

## Testing
We currently use [Jest](https://facebook.github.io/jest/) and primarily [Snapshot Testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) for tests. Going forward we are deprecating snapshot testing outside of inline snapshots.

### Technologies we use:
* [Jest](https://facebook.github.io/jest/)
* [Snapshot Testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) (old tests only)
* [Enzyme](https://airbnb.io/enzyme)
* [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) (only old saga tests)
* [react-test-renderer](https://reactjs.org/docs/test-renderer.html)
* [react-testing-library](https://github.com/testing-library/react-testing-library) (looking into using this over enzyme)

To run the tests, run `yarn test`. To run the tests in watch mode, run `yarn test --watch`. To run tests with coverage, run `yarn test --coverage`.  You can also view coverage on [Codecov](https://codecov.io/gh/Flexget/webui) once you've made a PR.



