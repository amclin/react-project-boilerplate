const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const IS_DEV = process.env.NODE_ENV === 'development'

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'mf2.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __IS_DEV__: IS_DEV
    }),
    IS_DEV && new HtmlWebpackPlugin({
        template: './index.html'
      })
  ].filter(x => x)
}

module.exports = webpackConfig