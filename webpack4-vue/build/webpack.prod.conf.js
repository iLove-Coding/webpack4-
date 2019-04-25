const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    publicPath: '/'
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
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "../scss/variables.scss";'
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
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    // minimizer: [ // 压缩 css,使用minimizer会自动取消webpack的默认配置，所以记得用UglifyJsPlugin
    //   new UglifyJsPlugin({
    //     exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
    //     extractComments: false, // 移除注释
    //     parallel: true, // 开启并行压缩，充分利用cpu
    //     cache: true,
    //     // 压缩 js
    //     uglifyOptions: {
    //       compress: {
    //         unused: true,
    //         warnings: false,
    //         drop_debugger: true
    //       },
    //       output: {
    //         comments: false
    //       }
    //     }
    //   }),
    //   // 用于优化css文件
    //   new OptimizeCssAssetsPlugin({})
    // ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css"
    }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
    //   canPrint: true
    // }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})