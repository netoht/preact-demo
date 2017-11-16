let path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')

const addPath = (...args) => path.join(...args)

const env = process.env.NODE_ENV || 'dev'

const extractAPP  = new ExtractTextPlugin('app.css'),
      extractSCSSBulma = new ExtractTextPlugin('bulma.css'),
      extractSCSSFontAwesome = new ExtractTextPlugin('font-awesome.css')

const commonPlugins = [
    new CleanWebpackPlugin('./dist'),
    extractAPP,
    extractSCSSBulma,
    extractSCSSFontAwesome
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
        server: { baseDir: [__dirname] }
    }, { reload: true }),
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
        app: addPath(__dirname, 'src', 'index.jsx'),
        vendor: ['preact', 'preact-router', 'history']
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
                loader: extractSCSSBulma.extract(['css-loader', 'sass-loader'])
            }, {
                test: /\.scss/,
                loader: extractSCSSFontAwesome.extract(['css-loader', 'sass-loader'])
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },

    plugins: (env === 'production' ? prodPlugins : devPlugins)
}
