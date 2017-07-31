/**
 * Created by leo on 2017/7/13.
 */

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackManifestPlugin from 'webpack-manifest-plugin'
import HappyPack from 'happypack'
import {entries, htmlConfs} from "./utility/multPagesHtmlConfig"


module.exports = {
    context: path.resolve(process.cwd(), 'pages'),
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'happyPack/loader'
            }
        ]
    },
    devtool: 'source-map',
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


        })
    ],
    devServer: {
        port: 80,
        hot: true,
        disableHostCheck: true
    }
};