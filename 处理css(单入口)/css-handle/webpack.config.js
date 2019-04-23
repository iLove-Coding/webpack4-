const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分离css代码
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // }
            {
                test: /\.(s*)css$/,
                use: [  MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[name]---[local]---[hash:base64:5]'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            tempalte: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        })
    ]
}