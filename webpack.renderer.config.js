const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const isProd = process.env.NODE_ENV === 'production'
const isDebugProd = process.env.DEBUG_PROD === 'true'

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' }, 
    { loader: 'css-loader' },
  ],
})

rules.push({
  test: /\.global\.(scss|sass)$/,
  use: [
    {
      loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
    },
  ],
})

// from electron-react-boilerplate
rules.push({
  test: /^((?!\.global).)*\.(scss|sass)$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: '@teamsupercell/typings-for-css-modules-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: isProd? (isDebugProd? '[name]_[local]__[hash:base64]': '[hash:base64]'): '[name]_[local]',
        },
        importLoaders: 1,
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
})

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
