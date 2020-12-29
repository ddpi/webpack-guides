// Webpack config toolで生成 https://webpack.jakoblind.no/

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const path = require('path')

const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV)

module.exports = {
  mode: ifProduction('production', 'development'),
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: 'Google Chrome',
    host: 'localhost',
    port: 3000,
    inline: true,
    hot: true
  },
  plugins: removeEmpty([
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: ifProduction('Learning Webpack Production', 'Learning Webpack Development')
    }),
    ifDevelopment(new webpack.HotModuleReplacementPlugin())
  ]),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: removeEmpty([
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ])
  }
}
