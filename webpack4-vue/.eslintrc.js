module.exports = {
  // 开启推荐配置信息
  // "extends": "eslint:recommended",
  root: true, 
  // 当访问未定义的变量时，no-undef 规则将发出警告。如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
  globals: {
    "window":true,
    "document":true
  },
  // 设置解析器选项（必须设置这个属性）
  parserOptions: {
      sourceType: 'module',
      //指定要使用的ECMAScript版本，默认值5
      "ecmaVersion": 7,
      "jsx": true,
      parser: "babel-eslint",
  },
  parser: "vue-eslint-parser",
  plugins: ['html'],
  env: {
      browser: true,
  },
  rules: {
      "indent": ["error", 2],
      "semi": [2,'never'],
      "no-console": "error",
      "arrow-parens": 0,
      // 在同一个作用域中禁止多次重复定义
      "no-redeclare": 1
  }
}