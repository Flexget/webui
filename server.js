const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const server = new WebpackDevServer(webpack(config), {
  contentBase: './app',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  proxy: {
    '/api': process.env.SERVER || 'http://localhost:5050',
  },
  stats: {
    colors: true,
  },
});

server.listen(process.env.PORT || 8000, process.env.HOST || 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at ${process.env.HOST || 'localhost'}:${process.env.PORT || 8000}`);
});

server.c
