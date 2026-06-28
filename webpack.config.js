const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const cfg = require('./package.json');

const __DEBUG__ = !!process.env.DEBUG;
const __DEV__ = process.env.NODE_ENV !== 'production';
const mode = __DEV__ ? 'development' : 'production';
const __VERSION__ = process.env.VERSION || cfg.version;

const entry = {
  main: ['whatwg-fetch', './src/app.tsx'],
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
    typescript: {
      configFile: path.resolve('tsconfig.json'),
    },
  }),
  new HtmlWebpackPlugin(htmlConfig),
  new MonacoEditorWebpackPlugin({ languages: ['yaml'] }),
  ...(__DEV__
    ? [new ReactRefreshWebpackPlugin()]
    : [
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
        }),
      ]),
  ...(__DEBUG__
    ? [new BundleAnalyzerPlugin({ analyzerMode: 'server' })]
    : []),
];

const devServer = {
  hot: true,
  historyApiFallback: true,
  proxy: [
    {
      context: ['/api'],
      target: process.env.SERVER || 'http://localhost:5050',
    },
  ],
};

const config = {
  mode,
  entry,
  output,
  plugins,
  devtool: __DEV__ ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve('./src'), 'node_modules'],
    alias: {},
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
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(gif|png|jpe?g)(\?.*)?$/,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8192 } },
      },
      {
        test: /\.css$/,
        use: [
          ...(__DEV__
            ? ['style-loader']
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '' },
                },
              ]),
          'css-loader',
        ],
      },
    ],
  },
  ...(__DEV__ ? { devServer } : {}),
};

module.exports = config;
