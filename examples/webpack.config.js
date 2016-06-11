const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const R = require('ramda')

const configEntry = (entry) =>
  [R.head(entry.split('/')), './' + entry]

const buildableEntry = (entry) =>
  !~['hmr', 'ws', 'xhr'].indexOf(entry[0])

const entries = R.compose(
  R.filter(buildableEntry),
  R.map(configEntry))(glob.sync('*/index.js'))

module.exports = {
  entry: R.fromPairs(entries),
  resolve: {
    root: path.join(__dirname, '../packages')
  },
  output: {
    filename: '[name]/bundle.js'
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
        loaders: ['style', 'css?modules']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|eot|woff|ttf|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url'
      }
    ]
  }
}
