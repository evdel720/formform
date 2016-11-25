const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./lib/game_view.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  devtool: 'source-maps'
};
