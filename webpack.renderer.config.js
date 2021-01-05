const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const isProd = process.env.ELECTRON_ENV === 'production'
const isDebugProd = process.env.DEBUG_PROD === 'true'

module.exports = {
  mode: isProd? 'production': 'development',
  devtool: isProd? (isDebugProd? 'source-map': false): 'cheap-module-source-map', // from cra-ejected
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
}
