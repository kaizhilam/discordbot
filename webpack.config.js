/* eslint-disable @typescript-eslint/no-var-requires */
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['babel-polyfill', './src/index'],
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [],
};
