const path = require('path')
const webpack = require('webpack')

module.exports = {
  cache: true,
  entry: {
    bundle: './todo.js'
  },
  output: {
    path: './js/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules,localIdentName=ttt[local]ttt'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|eot|woff|ttf|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url'
      }

    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    root: path.join(__dirname),
    modulesDirectories: [
      './node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.es6']
  }
}
