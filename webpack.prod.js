const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.shared');

config.mode = 'production';

config.output = {
  path: path.join(__dirname, 'dist', 'assets'),
  filename: '[name].[chunkhash].js',
  publicPath: '/v2/assets/',
};
config.optimization = {
  splitChunks: {
    chunks: 'all',
  },
};
config.devtool = 'source-map';
config.plugins = [
  new FaviconsWebpackPlugin(path.resolve('./src/favicon.png')),
  new webpack.DefinePlugin({
    __DEV__: false,
  }),
  new HtmlWebpackPlugin({
    title: 'FlexGet Manager v2',
    filename: '../index.html',
    template: './src/index.ejs',
    base: '/v2/',
  }),
  new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true,
  }),
  ...process.env.DEBUG ? [new BundleAnalyzerPlugin({
    analyzerMode: 'server',
  })] : [],
];
config.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(['css-loader']),
});

module.exports = config;
