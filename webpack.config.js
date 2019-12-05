const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const __DEBUG__ = !!process.env.DEBUG;
const __DEV__ = process.env.NODE_ENV !== 'production';
const mode = __DEV__ ? 'development' : 'production';
const PATH_PREFIX = 'v2';

const entry = {
  main: [...(__DEV__ ? ['react-hot-loader/patch'] : []), 'whatwg-fetch', './src/app.tsx'],
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

const output = {
  path: __DEV__ ? __dirname : path.join(__dirname, 'dist', 'assets'),
  filename: __DEV__ ? '[name].bundle.js' : '[name].[chunkhash].js',
  publicPath: __DEV__ ? '/' : `${PATH_PREFIX}/assets/`,
};

const htmlConfig = {
  title: 'FlexGet Manager v2',
  template: './src/index.ejs',
};

if (__DEV__) {
  htmlConfig.base = '/';
} else {
  htmlConfig.filename = '../index.html';
  htmlConfig.base = `{{ base_url }}/`;
}

const plugins = [
  new webpack.DefinePlugin({ __DEV__ }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: path.resolve('tsconfig.json'),
  }),
  new HtmlWebpackPlugin(htmlConfig),
  ...(__DEV__
    ? [new webpack.HotModuleReplacementPlugin()]
    : [
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          allChunks: true,
        }),
      ]),
  ...(__DEBUG__
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
        }),
      ]
    : []),
];

const config = {
  mode,
  entry,
  output,
  plugins,
  devtool: __DEV__ ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve('./src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loaders: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/,
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
      {
        test: /\.css$/,
        use: [
          ...(__DEV__
            ? ['style-loader']
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '',
                  },
                },
              ]),
          'css-loader',
        ],
      },
    ],
  },
};

if (!__DEV__) {
  config.optimization = {
    splitChunks: {
      chunks: 'all',
    },
  };
}

module.exports = config;
