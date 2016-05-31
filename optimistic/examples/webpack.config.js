const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './index.js'
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|eot|woff|ttf|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url'
      }
    ]
  }
}
