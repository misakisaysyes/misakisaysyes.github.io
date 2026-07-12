---
title: hexo-codepen-snippet插件开发
date: 2021-10-07 15:41:07
tags: ["博客基建", "技术", "前端"]
---

## 前言

hexo博客里插入codepen，本质就是在`文章.md`中插入一段`iframe`标签代码。

但这样插入会让`文章.md`的可读性变差，不符合我的审美。

于是按图索骥，捣鼓了`hexo-codepen-snippet`插件，它能更优雅地将codepen插入`文章.md`中。

本文记录了插件的开发、使用与上线。

## 插件开发

基于hexo`Extensions`中的`Tag`能力，将`iframe`标签代码片段抽象成模版，封装成自定义标签。

基本用法，详见[文档](https://hexo.io/api/tag)

```
    // name 自定义标签名，funciton为插件功能回调函数
    hexo.extend.tag.register(name, function(args, content){

    }, options);
```

`hexo-codepen-snippet`插件的核心实现如下，详见[源码](https://github.com/misakisaysyes/hexo-codepen-snippet)。

```
hexo.extend.tag.register('codepen', (args) => {

    // 内置默认配置
    const default_config = {
        style: 'height: 256px; width: 100%;',
        scrolling: 'no',
        frameborder: 'no',
        loading: 'lazy',
        allowtransparency: 'true',
        allowfullscreen: 'true'
    }

    const config = { ...default_config, ...hexo.config.codepen }
    args.forEach(arg => {
        const buf = arg.split(':')
        config[buf[0]] = buf[1]
    })

    const {
        src_prefix,
        slug_hash,
        default_tab,
        theme_id,
        style,
        scrolling,
        frameborder,
        loading,
        allowtransparency,
        allowfullscreen
    } = config

    return `<iframe
                src="${src_prefix}/${slug_hash}?default-tab=${default_tab}&theme-id=${theme_id}"
                style="${style}"
                scrolling=${scrolling}
                frameborder=${frameborder}
                loading=${loading}
                allowtransparency=${allowtransparency}
                allowfullscreen=${allowfullscreen}
            >
            </iframe>`
})
```

这里的config字段分为两类：

- 有默认值：`style`、`scrolling`、`frameborder`、`loading`、`allowtransparency`、`allowfullscreen` 都是`iframe`标签的属性。
- 无默认值：`src_prefix`、`slug_hash`、`default_tab`、`theme_id` 共同构成`iframe.src`的值，在hexo博客使用插件时必传。

config字段值可以参考codepen中`Embed`的配置
![Codepen Embed 配置面板](codepen-embed-configuration.png)

## 插件使用

首先需要在项目中引入插件脚🦶本，然后做全局配置，之后就可以在`文章.md`中使用自定义标签了。

相关参考：[引入插件脚🦶本](https://hexo.io/docs/plugins.html)、[插件配置&使用](https://github.com/misakisaysyes/hexo-codepen-snippet)

### 脚🦶本引入

<b>方式一</b>
首先博客根目录下（package.json同级目录下）的script目录中引入。

    | - MyBolg
        | - package.json
        | - ...
        | - scripts // 自定义插件目录
            | - index.js // 自定义插件脚本

这种方式适用于插件比较简单的情况。

<b>方式二</b>
npm包方式引入，注意：包名必须以`hexo-`开头。

    | - MyBolg
        | - node_modules // npm包目录
            | - hexo-xxx
                | - package.json
                | - index.js // 自定义插件脚本

### 全局配置

在配置文件中引入codepen插件

    | - MyBolg
        | - _config.yml // 配置文件

在\_config.yml的codepen插件配置中，可以全局配置`无默认值`的config字段，如下

```
    # codepen
    codepen:
    src_prefix: 'https://codepen.io/misakisaysyes/embed'
    default_tab: js
    theme_id: light
```

### 标签使用

`文章.md`中插入标签如下：

```
{% codepen slug_hash:WNOjqzq %}
```

用slug_hash区分不同的codepen

## 插件上线

插件实现后，需要将包`上线`，即将代码上传到github仓库，并将包发到npm上。

手动发包的流程为：

[1] 本地修改版本号`package.json version` <i>（npm version）</i>。
[2] 本地修改`CHANGELOG.md` <i>（手动）</i>。
[3] 本地commit后打tag <i>（git commit 后 git tag）</i>。
[4] 推送到github仓库 <i>（git push）</i>。
[5] 发布包到npm上 <i>（npm publish）</i>。

略繁琐，这里借助`semantic-release`和`git action`，实现自动化发包，简化发包流程。

在自动化发包的流程中，开发者在本地commit并push之后，`git action`就会根据项目中的流水线配置`.github/workflows/main.yml`触发`semantic-release`。

`semantic-release`会根据`commit message`的`type`（feat、fix、etc...）匹配发布对应版本的（major、patch、etc...）npm包，无需开发者介入自动完成手动发包的1～5步。

> commit message type详细见：[config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)
> commit message type与npm包版映射关系详见：[默认映射](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js)

使用`semantic-release`和`git action`需要在两处做配置：

- 项目仓库：详见[参考](https://meixg.cn/2021/01/20/semantic-release-guide/#semantic-release)，主要涉及`semantic-release设置配置`和`git action流水线配置`
- github：需要在仓库 -> settings -> secrets and variables -> actions中配置`NPM_TOKEN` （token获取地址：https://www.npmjs.com/）

附git action资料：[github action 阮一峰教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 、[github action 官方文档](https://docs.github.com/en/actions/learn-github-actions/expressions)

