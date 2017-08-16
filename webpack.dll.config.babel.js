import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

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
            {}
        ]
    }
};