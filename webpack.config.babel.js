/**
 * Created by leo on 2017/7/13.
 */

import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackManifestPlugin from 'webpack-manifest-plugin';
import HappyPack from 'happypack';

module.exports = {
    entry: {
        home: path.resolve(__dirname, './pages/home/src/script/index')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].bundle.js',
        publicPath: "./dist/ "
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
        new HtmlWebpackPlugin({
            title: 'Leo Blog',
            filename: 'home.html'
        }),
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