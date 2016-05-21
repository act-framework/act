module.exports = {
  cache: true,
  entry: {
    bundle: './index.js'
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
          'css?modules,localIdentName=[local]'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|eot|woff|ttf|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url'
      }
    ]
  }
}
