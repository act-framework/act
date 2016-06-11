const path = require('path')

module.exports = {
  entry: {
    bundle: './index.js'
  },
  resolve: {
    root: path.join(__dirname, '../packages')
  },
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
