const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map', //为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '192.168.1.31',
        port: 7000,
    },
});