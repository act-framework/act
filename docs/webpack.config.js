module.exports = {
  entry: {
    bundle: './your-js-file.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
