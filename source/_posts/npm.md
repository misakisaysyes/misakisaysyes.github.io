---
title: 关于npm
date: 2021-06-23 19:55:34
tags: ['npm', '技术', '前端']
---

### npm root [-g]

local模式：打印出有效的（当前项目使用的）`node_modules`文件夹路径。

global模式：打印出全局有效的（全局使用的）`node_modules`文件夹路径。

默认local模式。


### npm prefix [-g]

local 模式下：打印出`最近的`、包含`package.json`的`父级文件夹`目录。

global 模式下：得到路径前缀`prefix`。

默认local模式。


#### 关于npm prefix (本地)

在mac中，本地prefix的值为`/Users/admin`，尽管该路径下 默认 是没有关于npm的配置文件的。


#### 关于npm prefix -g （全局）

全局安装的包被放在 `{prefix}/lib/node_modules` 文件夹。

bin文件夹的路径为 `{prefix}/bin` 。

说明文件（man page）被放在 `{prefix}/share/man` 内。


> 在mac中 prefix 为 `/usr/local`
> 全局包安装的路径为 `/usr/local/lib/node_modules`。
> bin文件夹的路径为 `/usr/local/bin`。

bin文件夹中大多数是一些`软链接`文件，也有`可执行`文件。 

这些`软链接`最终指向一些`可执行`文件，或者`shell`脚本。

注意⚠️：`/usr/local/bin` 软链接的包 包括但不仅限于npm下载的包。

以mac为例🌰，mac的usr目录如下所示：

    | - usr
        | - local
            | - lib
                | - node_modules
                    | - hexo-cli
                        | - bin 
                            | - hexo // 可执行文件
            | - bin
                | - hexo // 软链接文件

npm全局下载的`hexo包`会被放在`/usr/local/lib/node_modules`下。

同时，`/usr/local/bin`目录下会自动生成`软链接`文件hexo。

该`软链接`文件指向hexo包中的可执行文件 （`/usr/local/lib/node_modules/hexo-cli/bin/hexo`）。

当然，我们可以通过`npm config`系列命令修改npm配置，从而改变下载包存放的位置。


### npm config

npm从`.npmrc`文件中获取配置（代理、安装目录等）。

.npmrc文件中的配置都以key=value的形式存在。

有4种不同位置的.npmrc文件：

1. per-project config file (/path/to/my/project/.npmrc)

   每个项目都会有一个☝️.npmrc文件，该文件在项目的`根目录`下。

   一个项目的`根目录`就是该项目的`package.json`和`node_modules`所在的目录。

   该配置只在项目内部生效。

2. per-user config file (~/.npmrc)

    // 极少用到，具体用法见文档

3. global config file ($PREFIX/etc/npmrc)

    全局npmrc文件应放在`${PREFIX}/etc`中。

    对于mac而言就是放在`/usr/local/etc`中。

4. npm builtin config file (/path/to/npm/npmrc)

    // 极少用到，具体用法见文档

4种不同位置的.npmrc文件优先级为 1 > 2 > 3 > 4

也就是在项目根目录下配置.npmrc文件，其配置能覆盖全局的.npmrc文件配置。

通过命令行修改npm配置，实质是通过命令行修改了npmrc文件，从而达到了更改配置的目的。

npm所有的配置项可参见 [npm config setting](https://docs.npmjs.com/cli/v7/using-npm/config#config-settings)

```
// 常用修改命令
npm config list // 查看所有配置
npm config get <key>
npm config set <key> <value>
```

### package.json 和 package-lock.json

#### package.json 之 script 字段

package.json中的script字段可以用来配置命令

举个例子🌰：

    // 假设有项目
    | - proj
        | - node_modules
            | - .bin
                | - test // 软链接文件
                | - ...
            | - test
                | - bin
                    | - test.js // shell脚本
                | ...
        | - package.json


    // 现在在package.json中写一些命令，来在项目中运行test这个包
    "script" : {
        "test1": "test",
        "test2": "./node_modules/.bin/test",
        "test3": "node ./node_modules/test/bin/*"
        "test4": "./node_modules/test/bin/*",
    },

在这个例子中,在命令行分别执行以下条命令，得到的结果是一样的：

第一组
`npm run test1`
`npx test`

第二组
`npm run test2`
`npx ./node_modules/.bin/test`
`./node_modules/.bin/test`

第三组
`npm run test3`
`npm run test4`
`./node_modules/test/bin/*`
`npx ./node_modules/test/bin/*`
`node ./node_modules/test/bin/*`
`npx node ./node_modules/test/bin/*`

怎么理解这三组命令执行结果都是一样的？

**首先**

要明确一个☝️点，命令都是手段，最终的目的都是把包运行起来，要运行包得执行包中的`shell脚本`。

在这个例子中shell脚本就是`./node_modules/test/bin/test.js`。

执行shell脚本可以在命令行中直接输入脚本路径： `./node_modules/test/bin/*`

可以使用`node`、`npx`命令执行shell脚本： `npx ./node_modules/test/bin/*` 、`node ./node_modules/test/bin/*`、`npx node ./node_modules/test/bin/*`。

可以使用`npm run <script>`的方式执行脚本： `npm run test3`、`npm run test4`。

所以第三组的命令，全是围绕着怎么去执行包的shell文件展开。

> 这里的shell脚本是js文件
> 但该js文件但开头一定要有`#!/usr/bin/env node`

**其次**

系统执行shell脚本，还可以通过软链接的方式。

软连接文件指向shell脚本文件，在命令行中输入软链接文件可以直接指向shell脚本，从而运行起来：`./node_modules/.bin/test`。

可以使用`npx`命令执行软链接文件指向的shell脚本：`npx ./node_modules/.bin/test`。

也可以使用`npm run <script>`的方式执行脚本：`npm run test2`。

所以第二组命令，全是围绕着怎样根据包的软链接文件执行shell脚本展开。


**最后**

对于第一组命令，npm会自动给它`./node_modules/.bin`下所有的软链接起别名，别名就是软链接文件名。

在定义"script"对象中的键值对命令时，我们可以使用这个别名。


#### package.json 之 bin 字段

有时，我们需要开发自定的npm包。并把包中的shell脚本安装到全局执行。这时，我们便需要设置"bin"字段

举个例子🌰：

    // 现在有个测试项目
    | - proj
        | - package.json
        | - test.js
    
    // package.json
    "bin" : {
        "test" : "./test.js",
    }

    // test.js
    #!/usr/bin/env node
    console.log('this is a test')

执行`npm link`。

就会有`/usr/local/lib/node_modules/proj`指向`proj`这个项目

然后会有`/usr/local/bin/test`软链接指向`/usr/local/lib/node_modules/proj/test.js`脚本。

此时这个包的命令在本机全局安装成功，可以在命令行执行`test`命令。

package.json其他字段和作用可参考 [2025.2.2补充](https://zhuanlan.zhihu.com/p/701397670)
    
#### package-lock.json

该文件记录了一个树状数据结构，该结构记录了一个包所依赖的其他包。

它可以加快npm下载的速度，举个栗子🌰：

当在项目中下载某个包时，会先读取这个包中的package-lock.json，了解这个包中所有的依赖。

如果项目中已下载了这些依赖，那就不用重新下载了，从而节省了下载请求次数，提高了下包速度。

> package-lock.json中所记录的包
> `等价于` node_modules中所有的包 
> `包含` package.json "dependencies"字段中所有的包
> `包含` package.json "devDependencies"字段中所有的包

### 参考

[npm](https://docs.npmjs.com/cli/v6)





    




    
    

    

    






