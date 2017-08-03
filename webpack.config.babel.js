/**
 * Created by leo on 2017/7/13.
 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import WebpackManifestPlugin from 'webpack-manifest-plugin'
import HappyPack from 'happypack'
import {entries, htmlConfs} from "./utility/multPagesHtmlConfig"

const extractSass = new ExtractTextWebpackPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
    context: path.resolve(process.cwd(), 'pages'),
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'happyPack/loader'
            },
            {
                test: /\.[s]css$/,
                use: extractSass.extract({
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    'pages',
                                    'src'
                                ],
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            "@share": path.resolve(__dirname, "./src")
        }

    },
    plugins: [
        new WebpackManifestPlugin(),
        ...htmlConfs,
        new HappyPack({
            cache: true,
            loaders: [
                {
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, './pages')
                    ],
                    query: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            ["env",
                                {
                                    "targets": {
                                        "browsers": ["last 2 versions", "ie>=9"]
                                    },
                                    "modules": false,
                                    "useBuiltIns": true,
                                    "debug": true,
                                    "loose": false
                                }
                            ],
                            "stage-0"
                        ],
                        plugins: [
                            "minify-dead-code-elimination", "transform-runtime"
                        ]
                    }
                }
            ]


        }),
        new webpack.HotModuleReplacementPlugin(),
        extractSass
    ],
    devServer: {
        port: 80,
        hot: true,
        disableHostCheck: true
    }
};