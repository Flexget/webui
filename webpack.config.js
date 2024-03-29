const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const cfg = require('./package.json')

const __DEBUG__ = !!process.env.DEBUG;
const __DEV__ = process.env.NODE_ENV !== 'production';
const mode = __DEV__ ? 'development' : 'production';
const __VERSION__ = process.env.VERSION || cfg.version;

const entry = {
  main: [...(__DEV__ ? ['react-hot-loader/patch'] : []), 'whatwg-fetch', './src/app.tsx'],
};

const output = {
  path: __DEV__ ? __dirname : path.join(__dirname, 'dist', 'assets'),
  filename: __DEV__ ? '[name].bundle.js' : '[name].[chunkhash].js',
  publicPath: __DEV__ ? '/' : 'assets/',
  globalObject: 'this',
};

const htmlConfig = {
  title: 'FlexGet Manager',
  template: './src/index.ejs',
};

if (__DEV__) {
  htmlConfig.base = '/';
} else {
  htmlConfig.filename = '../index.html';
  htmlConfig.base = `{{ base_url }}/`;
}

const plugins = [
  new webpack.DefinePlugin({
    __DEV__,
    __VERSION__: JSON.stringify(__VERSION__),
  }),
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
  optimization: {
    sideEffects: true,
    splitChunks: {
      cacheGroups: {
        default: {
          chunks: 'async',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
        },
      },
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

module.exports = config;
