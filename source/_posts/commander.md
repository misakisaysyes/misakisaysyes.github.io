---
title: 关于commander
date: 2021-07-01 19:56:23
tags: ['commander', '技术', '前端']
---

### 什么是commander?

这是一个帮助我们开发nodejs命令行的工具🔧。

这个工具将开发者从繁琐的命令解析中解放出来，使开发者更专注于开发命令所实现的功能，极大地提高了开发效率。

本来是为了开发自定义脚手架看的commander。

后来意外地发现看了commander以后，之前很多npm包的help内容理解起来比以前更轻松了。

也算意外之喜吧。

### 命令行开发环境搭建

#### 目录结构

首先 保证电脑中安装了`nodejs`和`npm`，在项目中安装了`commander`

然后 创建包目录
```
mkdir test-cli
npm init
```

得到的项目结构如下：
```
- test-cli
    - package.json
    - index.js // 命令行代码实现文件
```

#### 调试

`全局命令方式`

给package.json的`bin`字段指定命令行实现文件位置
```
{
  "name": "test-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "test-cli": "./index.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "commander": "^7.2.0"
  }
}
```

index.js文件开头加上
```
#!/usr/bin/env node
```

执行
```
npm link
```

之后可以在控制台直接使用`test-cli`命令

调试完后记得执行，把软连接删掉
```
npm unlink
```

`脚本调试方式`

直接在控制台执行
```
node index.js [params]
```

### 快速开发总结

commander开发主要分为选项（option）和指令（command）两类。

两者有相似的地方，但也有区别。个人理解指令开发用于更复杂的场景。

开发模版：
```
#!/usr/bin/env node
const { Command } = require('commander')
const program = new Command()

// ... 选项开发 ... 

// ... 指令开发 ...

program.parse() // parse之后才能生效
```

选项开发
```
program
  .option([1], [2], [3], [4])

// [1] : 指定选项缩写、选项全名、选项所带参数。模版 `-${缩写}, --${全名} <${参数名}>`
// [2] : 选项描述。模版 `${描述}`
// [3] : 默认值，或者选项参数处理函数（可省）
// [4] : 当为带变量的选项执行方式时，该处为初始值（可省）
// <${参数}>: 不可省
// [${参数}]: 可省
```

指令开发
```
program
  .command() // 命令名
  .argument() // 参数
  .option() // 选项
  .action() // 动作
  ...
```

### 参考

[commander](https://github.com/tj/commander.js)

