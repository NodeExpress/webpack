let { smart } = require('webpack-merge');
let base = require('./webpack.base');
// 合并base文件
module.exports = smart(base, {
    mode: 'production'
})