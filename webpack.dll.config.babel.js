import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import config from './config'
const vendors = [
    'jquery',
    'es5-shim',
    'babel-polyfill'
];
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, 'dist/script'),
        filename: '[name]_dll_[chunkhash].js',
        library: '[name]_dll_[chunkhash]_library'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'happypack/loader'
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll_[chunkhash]_library',
            context: __dirname,
            path: path.join(__dirname, './dist', '[name]_manifest.json'),
        }),
        new webpack.HashedModulesIdsPlugin(),
        new HappyPack({
            cache: true,
            loaders: [{
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'pages'),
                    path.resolve(__dirname, 'src')
                ],
                query: config.babelLoaderQuery
            }]
        })
    ]
};