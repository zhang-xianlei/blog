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
    }
};