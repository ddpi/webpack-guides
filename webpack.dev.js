const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app:
      [
        'webpack-hot-middleware/client',
        './src/index.js'
      ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    publicPath: '/'
  }
})
