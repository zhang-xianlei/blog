import fs from 'fs'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dllConfig from '../dist/dll-config.json'

const CWD = process.cwd(),
    RELATIVE_PATH = './pages/',
    ABSOLUTE_PATH = path.resolve(CWD, RELATIVE_PATH)
let entries = {},
    htmlConfs = [],
    pages = fs.readdirSync(ABSOLUTE_PATH)
pages.forEach((page) => {
    let htmlConf = new HtmlWebpackPlugin({
        title: page,
        filename: page + '.html',
        template: './' + page + '/index.html',
        chunks: [page],
        dllName: './script/' + dllConfig.vendor.js
    })
    htmlConfs.push(htmlConf)
    entries[page] = './' + page + '/src/script/index'
})
export {
    htmlConfs,
    entries
} 