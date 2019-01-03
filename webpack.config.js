// Webpack config toolで生成 https://webpack.jakoblind.no/

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const path = require('path')

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)

module.exports = {
  mode: ifProduction('production', 'development'),
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: ifProduction('Learning Webpack Production', 'Learning Webpack Development')
    })
  ],
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
