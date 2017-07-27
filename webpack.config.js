/**
 * Created by leo on 2017/7/13.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        publicPath: "/build/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    devtool: 'source-map',
    plugins: [
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({
            title: 'Management',
            filename: 'app.html'
        })
    ],
    devServer: {
        port: 80,
        hot: true,
        disableHostCheck: true
    }
};