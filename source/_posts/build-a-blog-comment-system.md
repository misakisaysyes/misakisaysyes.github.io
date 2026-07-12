---
title: 博客评论系统
date: 2026-07-06 10:56:12
tags: ['博客基建', '技术', '前端']
---

## 前言

给博客新增了评论系统，主要功能有：

- 支持发表评论、点赞和回复。
- 支持免登录评论，访客填写昵称和邮箱即可评论。
- 支持邮件通知，评论收到回复时会邮件提醒。
- 提供管理后台，方便admin管理评论数据。

## 方案

该博客评论系统采用`Waline`搭建，`Waline`提供了开箱即用的评论、点赞、回复、邮件与后台管理功能，只需在Hexo静态网站中接入`Waline Client`并将`Waline Server`部署到云平台上便能使用。本博客使用`Vercel`托管`Waline Server`，并通过`MongoDB`存储评论数据。

搭建完后整个的博客运行时序如下：

{% raw %}
<pre class="mermaid">
sequenceDiagram
    autonumber
    participant Browser as 浏览器
    participant GitHub as GitHub Pages
    participant Vercel as Vercel
    participant MongoDB as MongoDB

    Browser->>GitHub: 请求 Hexo 文章
    GitHub-->>Browser: 返回 HTML、CSS 和 JavaScript
    Note over Browser: Waline Client 在浏览器中初始化
    Browser->>Vercel: Waline Client 请求评论列表
    Note over Vercel: Waline Server 部署在 Vercel
    Vercel->>MongoDB: 查询评论
    MongoDB-->>Vercel: 返回评论数据
    Vercel-->>Browser: Waline Server 返回评论 JSON
    Browser->>Browser: Waline Client 渲染评论列表

    Browser->>Vercel: Waline Client 提交评论
    Vercel->>MongoDB: 保存评论
    MongoDB-->>Vercel: 保存成功
    Vercel-->>Browser: Waline Server 返回新评论
    Browser->>Browser: Waline Client 更新评论列表
</pre>
{% endraw %}

名词解释：
- `Waline Client`：前端程序，运行在浏览器，负责展示评论界面、发起评论请求
- `Waline Server`： 服务端程序，负责处理评论请求、执行业务逻辑、读写数据库
- `Vercel`：云托管平台，在上面部署和运行Waline Server
- `MongoDB`：数据库，负责持久化存储评论数据
- `GitHub Pages`：云托管平台，托管和分发Hexo生成的静态网站文件

## 实现

<b> 1.在Vercel上部署Waline Server </b>

相关平台：[Vercel](https://vercel.com)，参考文档：[ref](https://waline.js.org/guide/deploy/vercel.html)

- Vercel新建项目时会关联Github自动创建Waline Server仓库。
- Vercel拉取Waline Server仓库代码，自动完成构建和部署。
 
<b> 2.在Vercel创建MongoDB数据库，将数据库关联到Waline Server</b>

相关平台：[Vercel](https://vercel.com)

- 在Vercel中创建MongoDB数据库，创建路径：`Storage > Create Database > MongoDB Atlas`。
- 将数据库关联到Waline Server：Vercel创建数据库时指定关联Waline Server项目即可，关联成功后Waline Server项目会有和数据库相关的环境变量配置，查看路径：`Environment Variables`。

<b> 3.在Hexo博客中配置Waline Client，并指定Waline Server地址</b>

该博客使用的主题hexo-theme-orange本身集成了Waline Client，详见[_config.yml](https://github.com/zchengsite/hexo-theme-oranges/blob/ae47484c9ff9ed6cdea5b37ca981e067186c622d/_config.yml#L75)。

故只用配置Waline Server地址即可，参考：[_config.yml](https://github.com/zchengsite/hexo-theme-oranges/blob/ae47484c9ff9ed6cdea5b37ca981e067186c622d/_config.yml#L78)。


Waline Server地址可以从[Vercel](https://vercel.com)获取，相关路径 `Waline Server项目 > Domains`。

<b> 4.配置邮件通知</b>

- 申请一个walilne发信邮箱，开启SMTP服务。
- 在Vercel的Waline Server项目关联邮箱，即配置和邮箱相关的环境变量，可参考：[环境变量配置](https://waline.js.org/reference/server/env.html#%E4%B8%BB%E8%A6%81%E9%85%8D%E7%BD%AE)。