---
title: 基于hexo + github.io搭建个人博客
date: 2020-08-27 17:07:03
tags: ['博客基建', '技术', '前端']
---

## 博客搭建

### 1 mac全局安装hexo 

[doc](https://hexo.io/docs/)

```
$sudo npm install hexo
```

### 2 初始化项目 

[doc](https://hexo.io/docs/setup)

```
$ hexo init <folder>
$ cd <folder>
$ npm install
```

得到如下目录结构的项目
```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### 3 下载oranges主题

[doc](https://github.com/zchengsite/hexo-theme-oranges)

下载后将包含主题的`oranges`文件夹放置于上述目录结构的`themes`下

> 注意 ：若用文档中的方式下载主题，则会在themes目录下得到一个oranges的git项目，在这种情况下，若对oranges主题做一些修改，则这些修改只能在oranges目录下被管理（commit discard ...），在oranges目录之外只能被识别而无法被管理。所以最好不要在一个git项目中管理另外一个git项目。

### 4 hexo上传图片配置

[doc](https://github.com/xcodebuild/hexo-asset-image)

[issue](https://github.com/xcodebuild/hexo-asset-image/issues/44#issuecomment-499405301)

[reference blog](https://www.jianshu.com/p/f72aaad7b852)

### 5 本地测试

```
$ hexo server
```

### 6 上线

#### 6.1 朴素上线（不使用插件）

部署到github.io上 [doc](https://hexo.io/docs/github-pages)

此处的文档是标准部署流程，但目前博客部署的方式比较野生（无脑），大致就是：将资源文件传到以`github注册名.github.io`命名到仓库上，再对仓库进行配置，配置生效后，`github注册名.github.io`就是可访问地址。

具体有三个操作：
- 1.本地生成静态资源文件。 
- 2.给线上仓库配置服务器目录
- 3.将静态资源文件上传到线上服务器目录下

*本地生成静态文件*
```
$ hexo generate  // 生成静态文件，静态文件默认输出的目录为public
$ mkdir docs  // 在根目录下创建名为docs的目录作为线上的服务器目录（该目录的位置和名称与仓库配置相关）
$ cp -r ./public/* ./docs  // 将public下的内容复制到docs下

// 项目目录结构参考如下：
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
|   └── oranges
└── publics
└── docs
```

*给线上仓库配置服务器目录*

![1.png](1.png)

其中source项的目录配置只有`/`和`/docs`两种，选择`/`则项目里只能存放静态资源文件，选择`/docs`则项目里需要有个docs目录存放静态资源文件。

#### 6.2 高效上线（使用插件）

使用 [hexo-deployer-git](https://www.npmjs.com/package/hexo-deployer-git) 插件

### 7 新文章发布

[doc](https://hexo.io/docs/commands)

#### 7.1 基于朴素上线的发布方式

**创建新文章** 
```
$ hexo new post `文章名.md`
```
**本地生成静态文件**
```
$ hexo generate 
$ mkdir docs 
$ cp -r ./public/* ./docs
```
**上线**
```
$ ... //  git操作
```

#### 7.2 基于高效上线的发布方式

**创建新文章** 
```
$ hexo new post `文章名.md`
```
**发布文章** 
```
hexo clean && hexo d
```

## 博客优化日志

### 为orange主题添加mojs动画

    | - MYBLOG
        | - themes
            | - oranges
                | 。。。
                | - source
                    | ...
                    | - js
                        | - mo.min.js // 动画库文件
                        | - animation.js // 动画js实现
                | - layout
                    | ...
                    | - _partial
                        | - navigation.ejs // 在需要用到动画的ejs模版中引入文件

```
/** navigation.ejs 文件最末尾引入js文件
 *  并且mo.min.js必须先于animation.js引入
 */
    <%- js(['/js/mo.min.js'])%>
    <%- js(['/js/animation.js'])%>
```

### 在hexo中插入codepen代码

目前主流的代码在线编辑器有：`codepen` 和 `codesandbox`。

从使用体验上，个人感觉codesandbox加载npm包和热更新的速度不如codepen，而且有时热更新还会出错。

所以我还是偏爱codepen，博客插入代码也选择了codepen。

在hexo博客嵌入codepen可以用[插件](https://github.com/timnew/hexo-tag-codepen)。

但这个插件很久没维护了，有些配置已失效。

所以此处的解决方案是：直接在markdown中贴上codepen网站导出的代码。

codepen导出代码方法如图所示：

`New Pen` -> `编辑代码` -> `Save` -> `Embed`

![2.png](2.png)

### 封装hexo-codepen-snippet优化codepen插入方式

[在hexo中插入codepen代码](#在hexo中插入codepen代码)这节描述的插入方法有个的问题：

就是一大段html代码插到md文件中，看上去很不整洁。

![3.png](3.png)

于是参考失效的codepen[插件](https://github.com/timnew/hexo-tag-codepen)重新写了一个，并发布到npm，详见[hexo-codepen-snippet](https://www.npmjs.com/package/hexo-codepen-snippet)。

安装插件后，需要插入codepen代码，只用在md中插入如下语句：

![4.png](4.png)

整个md文件顿时变得清爽很多。

### 接入clustrmaps

clustrmaps是一款能记录访问你博客ip地理位置的工具🔧

具体用法就是：

1.登陆[clustrmaps官网](http://clustrmaps.com/)
2.配置想要搜集ip地理数据的网址，然后导出一段js代码插入md文档中


