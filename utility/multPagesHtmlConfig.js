import fs from 'fs'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const CWD = process.cwd(),
    RELATIVE_PATH = './pages/',
    ABSOLUTE_PATH = path.resolve(CWD, RELATIVE_PATH)
let entries = {},
    htmlConfs = [],
    pages = fs.readdirSync(ABSOLUTE_PATH)
pages.forEach((page) => {
    let htmlConf = new HtmlWebpackPlugin({
        filename: page + '.html',
        template: './' + page + '/index.html',
        chunks: [page]
    })
    htmlConfs.push(htmlConf)
    entries[page] = './' + page + '/src/script/index'
})
export {
    htmlConfs,
    entries
}