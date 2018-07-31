const path = require('path');
const fs = require('fs');

const HappyPack = require('happypack');
const webpack = require('webpack');


const fileExist = (filePath) => {
    try {
        fs.statSync(filePath);
    } catch (err) {
        if (err.code == 'ENOENT') return false;
    }
    return true;
};

const aliases = {};

const PORT = 8190;

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        info: [
            'regenerator-runtime/runtime',
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${PORT}`,
            'webpack/hot/only-dev-server',
            './src/info',
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: `http://localhost:${PORT}/dist/`
    },
    devServer: {
        host: 'localhost',
        port: PORT,

        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    plugins: [
        new HappyPack({
            id: 'jsx',
            threads: 6,
            loaders: ['babel-loader']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEVTOOLS__: fileExist('.dev'),
        })
    ],
    resolve: {
        alias: aliases,
        extensions: ['.js', '.jsx'],

        modules: [
            path.join(__dirname, "node_modules")
        ]
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=jsx'
            },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' },
            // {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            // {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"},
            // {
            //     test: /\.jsx?$/,
            //     loaders: ['babel-loader'],
            //     exclude: path.resolve(__dirname, "node_modules"),
            // }
        ]
    },
    externals: {
        'jquery': 'JQuery',
    },
};
