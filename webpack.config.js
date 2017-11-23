let path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin')

const env = process.env.NODE_ENV || 'dev'

const extractApp = new ExtractTextPlugin('app.css'),
  extractSassBulma = new ExtractTextPlugin('bulma.css'),
  extractScssFontAwesome = new ExtractTextPlugin('font-awesome.css')

const commonPlugins = [
  new CleanWebpackPlugin('./dist'),
  extractApp,
  extractSassBulma,
  extractScssFontAwesome
]

const devPlugins = [
  ...commonPlugins,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  new BrowserSyncPlugin({
    open: false,
    host: 'localhost',
    port: 3000,
    server: {
      baseDir: [__dirname]
    }
  }, {
    reload: true
  }),
  new webpack.NoEmitOnErrorsPlugin()
]

const prodPlugins = [
  ...commonPlugins,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': "'production'"
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
]

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.jsx'),
    vendor: ['preact', 'preact-router', 'history']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.sass']
  },

  node: {
    fs: 'empty'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(css|scss|sass)$/,
      loader: extractApp.extract(['css-loader', 'sass-loader']),
      exclude: /node_modules|assets\/sass\//
    }, {
      test: /\.sass$/,
      loader: extractSassBulma.extract(['css-loader', 'sass-loader']),
      include: /Bulma.sass/
    }, {
      test: /\.scss$/,
      loader: extractScssFontAwesome.extract(['css-loader', 'sass-loader']),
      include: /node_modules\/font-awesome\//
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
      loader: 'file-loader?name=[name].[ext]'
    }]
  },

  plugins: (env === 'production' ? prodPlugins : devPlugins)
}