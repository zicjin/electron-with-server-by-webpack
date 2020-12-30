const rules = require('./webpack.rules')

const isProd = process.env.NODE_ENV === 'production'
const isDebugProd = process.env.DEBUG_PROD === 'true'

module.exports = {
  // mode: isProd? 'production': 'development',
  // devtool: isProd ? (isDebugProd ? 'source-map' : false) : 'cheap-module-source-map', // from cra-ejected
  
  entry: {
    index: './src/main.ts',
    server: './src/server.js',
    rendererPreload: './src/renderer.preload.js',
  },

  output: {
    filename: '[name].js',
  },

  module: {
    rules,
  },

  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
}