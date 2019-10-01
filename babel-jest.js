const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  configFile: path.resolve(__dirname, 'babel.config.js'),
});
