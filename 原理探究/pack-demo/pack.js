#! /usr/bin/env node    
const entry = './src/index.js';   // 入口文件
const output = './dist/main.js'   // 出口文件
const fs = require('fs');
const path = require('path');
let script = fs.readFileSync(entry, 'utf8');
const results = []; // 打包结果
const ejs = require('ejs');

let styleLoader = function(src) {
  // src就是样式中的内容
  return `
      let style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(src).replace(/(\\r)?\\n/g, '')}; // 这里用JSON.stringify处理字符串不能换行的问题
      document.head.appendChild(style);
  `;
};

// 如果有require引用的依赖，那就需要替换处理依赖
script = script.replace(/require\(['"](.+?)["']\)/g, function () {
  let name = path.join('./src/',  arguments[1]);
  let content = fs.readFileSync(name, 'utf8');
  if (/\.css$/.test(name)) {
    content = styleLoader(content);
  }
  results.push({
    name,
    content
  });
  return `require('${name}')`;
});

// 这里的模板其实就是dist/main.js里的核心代码
let template = `
    (function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("<%-entry%>");
})
    ({
        "<%-entry%>": (function (module, exports, require) {
            eval(\`<%-script%>\`);
        })
        <%for(let i=0;i<results.length;i++){
            let mod = results[i];%>,
            "<%-mod.name%>": (function (module, exports, require) {
                eval(\`<%-mod.content%>\`);
            })
        <%}%>
    });
`;

// result为替换后的结果，最终要写到output中
let result = ejs.render(template, {
  entry,
  script,
  results
});

try {
  fs.writeFileSync(output, result);
} catch(e) {
  console.log('编译失败', e);
}
console.log('编译成功');