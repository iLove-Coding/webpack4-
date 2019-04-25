const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // webpack4在开发阶段可以不写devtool
  devServer: {
    contentBase: './dist', // 将 dist 目录下的文件，作为可访问文件。
    compress: true, // 开启Gzip压缩
    host: 'localhost', // 设置服务器的ip地址，默认localhost
    inline: true, // do not use iframe for the page, true is default
    open: true, // open browser after dev server starts
    port: 8082, // 8080 is default
    proxy: { // proxy backend api
      '/api': 'http://localhost:3000'
    },
    hot: true,
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join('/', "index.html")
      }]
    }
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              // localIdentName: '[name]---[local]---[hash:base64:5]'
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
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热替换插件
  ]
})