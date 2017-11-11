import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

/* eslint-disable no-underscore-dangle */
const __DEV__ = process.env.NODE_ENV !== 'production';
const __DEBUG__ = !!process.env.DEBUG;
/* eslint-enable no-underscore-dangle */

let output;
const entry = {
  main: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/js/app.jsx',
  ],
  vendor: [
    'redux',
    'react-redux',
    'react-router',
    'react-router-dom',
    'react',
    'react-dom',
    'redux-saga',
  ],
};

const module = {
  rules: [
    {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.md$/,
      loaders: ['html-loader', 'markdown-loader'],
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    },
    {
      test: /\.(gif|png|jpg|jpeg)(\?[a-z0-9]+)?$/,
      loader: 'url-loader?limit=8192',
    },

  ],
};

const plugins = [
  new FaviconsWebpackPlugin(path.resolve('./src/favicon.png')),
  new webpack.DefinePlugin({
    __DEV__,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  new HtmlWebpackPlugin({
    title: 'FlexGet Manager v2',
    template: './src/index.ejs',
    base: __DEV__ ? '/' : '/v2/',
    filename: __DEV__ ? undefined : '../index.html',
  }),
  new webpack.NoEmitOnErrorsPlugin(),
];

if (__DEV__) {
  entry.main.push(
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${process.env.PORT || 8000}`
  );

  module.rules.push({
    test: /\.s?css$/,
    loaders: ['style-loader', 'css-loader', 'resolve-url-loader'],
  });

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  );

  output = {
    path: __dirname,
    filename: '[name].bundle.js',
    publicPath: '/',
  };
} else {
  module.rules.push({
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract(['css-loader', 'resolve-url-loader']),
  });

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'manifest'], minChunks: Infinity }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 8192 }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: false,
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true,
    }),
  );

  output = {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: '[name].[chunkhash].js',
    publicPath: '/v2/assets/',
  };
}

if (__DEBUG__) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  );
}

module.exports = {
  entry,
  devtool: __DEV__ ? 'cheap-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module,
  plugins,
  output,
};
