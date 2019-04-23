const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    //use inline-source-map for development:
    devtool: 'inline-source-map',

    //use source-map for production:
    // devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: true,
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // 解决 hash 频繁变动的问题
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
        // 分割webpack运行时代码
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                common: {
                    // 最小引用次数
                    minChunks: 2,
                    // 符合条件的module都放到同一个名为commons的文件中
                    name: 'commons',
                    // 通过异步加载的module符合条件
                    chunks: 'async',
                    // 提升优先级
                    priority: 10,
                    // 使用已存在的
                    reuseExistingChunk: true,
                    // 强制执行
                    enforce: true
                }
            }
        }
    }
}