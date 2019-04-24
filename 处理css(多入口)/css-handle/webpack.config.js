const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        'index1': './src/index1.js',
        'index2': './src/index2.js'
    },
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
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]---[local]---[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require("autoprefixer")],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
               
                styles: {
                    name: 'styles',
                    test: /\.(s*)css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index1.html',
            filename: 'index1.html',
            chunks: ['index1', 'manifest','styles']
        }),
        new HtmlWebpackPlugin({
            template: './src/index2.html',
            filename: 'index2.html',
            chunks: ['index2', 'manifest','styles']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        })
    ]
}