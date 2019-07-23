const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./webpack.shared');

config.entry.main.push(
  'webpack/hot/dev-server',
  `webpack-dev-server/client?http://localhost:${process.env.PORT || 8000}`
);

config.mode = 'development';

config.output = {
  path: __dirname,
  filename: '[name].bundle.js',
  publicPath: '/',
};
config.devtool = 'cheap-source-map';
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
  }),
  new HtmlWebpackPlugin({
    title: 'FlexGet Manager v2',
    template: './src/index.ejs',
    base: '/',
  }),
];
config.module.rules.push({
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader'],
});

module.exports = config;
