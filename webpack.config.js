var webpack = require('webpack');
var path = require('path');
var plugins = [];

var config = {
    entry: {
        index: './src/index.js',
        vendor: ['three', 'three-stereo-effect']
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js?$/,
                include: path.resolve('src'),
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'istanbul-instrumenter-loader',
                        query: {
                            esModules: true
                        }
                    }
                ]


            }
        ]
    },
    plugins: plugins
};

module.exports = config;