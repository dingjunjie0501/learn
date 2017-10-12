const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: { //入口起点
        app: './src/index.js'
    },
    devtool: 'inline-source-map', //为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '192.168.1.31',
        port: 7000,
    },
    plugins: [ //插件，在 webpack 配置中，向 plugins 属性传入 new 实例
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: { //输出
        filename: '[name].bundle.js', //用于输出文件的文件名
        path: path.resolve(__dirname, 'dist'), //目标输出目录 path 的绝对路径
        publicPath: '/',
    },
    module: {
        rules: [
            /** webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。loader 用于对模块的源代码进行转换。*/
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
};