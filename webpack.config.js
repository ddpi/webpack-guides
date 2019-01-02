const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
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
    contentBase: './dist',
    open: 'Google Chrome', // ブラウザをChromeに指定
    headers: { 'Access-Control-Allow-Origin': '*' }, // [WDS] Disconnected対応。https://github.com/webpack/webpack-dev-server/issues/851
    disableHostCheck: true // 同上
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
