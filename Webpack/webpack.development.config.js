const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'app': './app/main.ts'
    },

    output: {
        filename: './app/app.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: './tsconfig.json' }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('hu-lsd-new-client', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('hu-lsd-new-client', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    plugins: [
        //// Workaround for angular/angular#11580
        //new webpack.ContextReplacementPlugin(
        //    // The (\\|\/) piece accounts for path separators in *nix and Windows
        //    /angular(\\|\/)core(\\|\/)@angular/,
        //    helpers.root('./hu-lsd-new-client'), // location of your src
        //    {} // a map of your routes
        //),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),

        //new HtmlWebpackPlugin({
        //    template: 'Views/Home/Index.cshtml'
        //})
    ],
    devtool: "source-map",
    watch: true //ha ez be van kapcsolva akkor a task runner nem áll le!!!
};
