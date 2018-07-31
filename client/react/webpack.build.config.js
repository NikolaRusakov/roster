//require('babel-polyfill');
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const logger = exports;
logger.debugLevel = 'warn';
logger.log = function (level, message) {
    const levels = ['error', 'warn', 'info'];
    if (levels.indexOf(level) >= levels.indexOf(logger.debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        console.log(level + ': ' + message);
    }
};


const projectRootPath = path.resolve(__dirname);
const assetsPath = path.resolve(projectRootPath, '../../../../../target/react-dist');


module.exports = {
    entry: {
        mobile: ['core-js/es6/symbol', './src/public_path', './src/mobile'],
        pairing: './src/pairing',
        info: ['core-js/es6/symbol', './src/public_path', './src/info']
    },
    output: {
        path: assetsPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!resolve-url-loader!sass-loader'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            },
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        net: "empty",
        tls: "empty"
    },
    plugins: [
        new CleanPlugin([assetsPath], {root: projectRootPath}),

        // css files from the extract-text-plugin loader
        //new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),

        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),


        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.DefinePlugin({
            'process.env.BABEL_ENV': JSON.stringify('production'),
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
            __SHOW_DEVTOOLS__: false,
            __DEV__: false
        }),

        // optimizations
        new CommonsChunkPlugin({name: "vendor", filename: "vendor.js"}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true)

    ]
};
