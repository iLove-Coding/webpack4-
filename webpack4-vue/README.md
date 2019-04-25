# webpack-4
webpack4搭建vue环境

## 目录结构说明

```javascript
.
├── README.md
├── package.json
├── .gitignore // git忽略的文件
├── postcss.config.js // css后处理器的配置文件
├── .editorconfig // 编辑器代码风格的配置文件
├── .eslintrc.js // eslint的配置文件
├── .babelrc // babel的配置文件
│   ├── scss // 文件夹，用于存放公共sass文件
│   │   ├── global.scss
│   │   ├── index.scss // 公共sass文件入口)
│   │   └── variables.scss
├── src // 源代码文件夹
│   ├── services // 文件夹，存放访问后端API的js文件）
│   ├── index.html // 入口HTML文件模板）
│   ├── main.js // 入口js文件
│   ├── assets // 文件夹，用于存放图片、字体等资源文件，需要webpack处理
│   │   ├── big-image.jpg
│   │   └── small-image.jpg
│   ├── components // 文件夹，用于存放公用组件
│   │   └── HelloWorld.vue
│   ├── views // 文件夹，用于存放页面级别的组件，每个page都有对应路由
│   │   ├── demo.vue
│   │   └── App.vue (根目录组件)
│   ├── router// 文件夹，用于存放路由配置
│   │   └── index.js
│   ├── store // 文件夹，用于存放vuex相关文件
│   └── utils // 文件夹，用于存放工具文件）
├── static // 文件夹，用于存放图片等资源文件，与assets不同的是，static文件夹下是文件不会经过webpack处理，而是直接被拷贝到输出目录中）
└──  build // 文件夹，用于存放公共webpack配置文件）
    ├── webpack.base.conf.js // 公共webpack配置文件）
    ├── webpack.dev.conf.js // development环境配置文件）
    └── webpack.prod.conf.js // production环境配置文件）
```

## 目前配置的功能

- development
  + devServer
    * 通过process.env.NODE_ENV区分环境
    * 热更替（默认）
    * 设置port/host
    * 设置publicPath
    * 设置是否自动打开浏览器
  + 静态文件编译处理
    * 处理vue文件,开启css module (暂时没有设置css module。需要可查看 vue-loader@15文档 https://vue-loader.vuejs.org/zh/ )
    * 处理css路径
    * 处理css预处理的解析
    * 处理图片路径
    * 处理ES7/ES7的编译
    * 处理postcss添加css前缀
  + 指定devtool
  + 代码规范性约束
    * .eslint
    * .editorconfig
    * pre-commont防止不符合eslint的代码被提交
  + 设置resolve，注意css里解析alias需要配置css-loadr


- production
  + 静态路径的调整
  + 将代码单独打包，代码分割，分配不同hash，以最大化利用缓存
    * 单独分离css
    * 单独分离第三方类库、webpack的manifest
    * 动态import做代码分割，异步加载组件
  + 压缩、混淆js和css
  + 处理打包后的静态文件路径
  + 自动生成html模板、打包前自动remove dist文件夹
  + 指定devtool



