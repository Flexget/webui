## How to Contribute

The UI has a solid base but we need help building the plugins and maintaining. If you would like to get your hands dirty in React, CSS or UX Design then please read below and join our chat on [Gitter](https://gitter.im/Flexget/Flexget).

Technologies we use:
* [React](https://reactjs.org)
* [Material UI](https://material-ui.com)
* [Emotion](https://emotion.sh)

Requirements:
* Node 8+

1. Fork the repo (Once we see any semi-serious input from a developer we will grant write permissions to our central repository. You can also request this earlier if you wish.)
2. Install dependencies
```bash
$ npm install
```
3. To start the webpack dever server, you can run. This has hot reloading on by default to make development easier:
```bash
SERVER=<flexget_api:port> npm start
```
Then you can go to http://localhost:8000/v2 (use `PORT` env variable to run on a different port) in your browser.
4. After you've made your changes, open a PR.

## Testing
We currently use [Jest](https://facebook.github.io/jest/) and primarily [Snapshot Testing](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) for tests. To run the tests, run `npm test`. To run the tests in watch mode, run `npm test -- --watch`. To run tests with coverage, run `npm test -- --coverage`.


