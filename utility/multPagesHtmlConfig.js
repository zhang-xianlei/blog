import fs from 'fs'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const CWD = process.cwd(),
    RELATIVE_PATH = './pages',
    ABSOLUTE_PATH = path.resolve(CWD, RELATIVE_PATH)
let entry = [],
    htmlConfs = [],
    pages = fs.readdirSync(ABSOLUTE_PATH)
pages.forEach((page) => {
    let outPath = './dist/' + page
    let htmlConf = new HtmlWebpackPlugin({
        filename: outPath + '[chunkhash]',
        template: RELATIVE_PATH + './index',
        chunks: [page],

    })
    htmlConfs.push(htmlConf)
    entry[page] = RELATIVE_PATH + '/' + page + '/src/scripts/index'
})

export {
    htmlConfs,
    entry
}