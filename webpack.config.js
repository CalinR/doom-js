var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");

module.exports = [
    {
        entry  : './src/main.js',
        output : {
            path     : './dist',
            filename : 'doom-engine.js'
        },
        module : {
            loaders: [ {
                test   : /\.js$/,
                loader : 'babel-loader'
                },
                {
                    test: /\.jsx$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }
            })
        ]
    },
    {
        entry  : './src/editor.js',
        output : {
            path     : './dist',
            filename : 'editor.js'
        },
        module : {
            loaders: [ {
                test   : /\.js$/,
                loader : 'babel-loader'
            },
                {
                    test: /\.jsx$/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }
            })
        ]
    }
];
