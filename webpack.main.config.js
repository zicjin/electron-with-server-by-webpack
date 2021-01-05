const HtmlWebpackPlugin = require("html-webpack-plugin")
const rules = require('./webpack.rules')

const isProd = process.env.ELECTRON_ENV === 'production'
const isDebugProd = process.env.DEBUG_PROD === 'true'

module.exports = {
  // mode: isProd? 'production': 'development',
  // devtool: isProd ? (isDebugProd ? 'source-map' : false) : 'cheap-module-source-map', // from cra-ejected
  
  entry: {
    index: './src/main.ts',
    renderer_preload: './src/renderer-preload.js',
    backend: './src/backend/backend.ts',
    handlers: './src/backend/handlers.ts',
    ipc: './src/backend/ipc.ts',
  },

  output: {
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/backend/backend-dev.html",
      filename: "backend-dev.html",
    }),
  ],

  module: {
    rules,
  },

  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
}