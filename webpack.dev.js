let { smart } = require('webpack-merge');
let base = require('./webpack.base');
// 合并base文件
module.exports = smart(base, {
    mode: 'development',
    devServer: {
        port: '3030',
        contentBase: './dist',
        progress: true,
        compress: true,
    }
})