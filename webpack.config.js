let path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')

const addPath = (...args) => path.join(...args)

const env = process.env.NODE_ENV || 'dev'

const extractAPP  = new ExtractTextPlugin('app.css'),
      extractSCSS = new ExtractTextPlugin('bulma.css')

const prodPlugins = [
    extractAPP,
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': "'production'"
        }
    }),
    new webpack.ProvidePlugin({
        'React': 'react'
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

const devPlugins = [
    new CleanWebpackPlugin('./dist'),
    extractAPP,
    extractSCSS,
    new webpack.ProvidePlugin({
        'React': 'react'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new BrowserSyncPlugin({
        open: false,
        host: 'localhost',
        port: 3000,
        server: { baseDir: [__dirname] }
    }, { reload: true }),
    new webpack.NoEmitOnErrorsPlugin()
]

module.exports = {
    entry: {
        app: addPath(__dirname, 'src', 'index.jsx'),
        vendor: ['react', 'react-dom']
    },

    output: {
        path: addPath(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    node: {
        fs: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css/,
                loader: extractAPP.extract(['css-loader']),
                exclude: /node_modules/
            }, {
                test: /\.sass/,
                loader: extractSCSS.extract(['css-loader', 'sass-loader'])
            }
        ]
    },

    plugins: (env === 'production' ? prodPlugins : devPlugins)
}