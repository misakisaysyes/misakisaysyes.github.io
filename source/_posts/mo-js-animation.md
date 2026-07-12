---
title: mo.js 动画库
date: 2021-06-11 18:53:32
tags: ['博客基建', '技术', '前端']
---

### 写在前面

给博客加了个彩蛋，把鼠标移到`Misakisaysyes`上，会有烟花动画，`❤️`也会跳动一下。

### mojs简介

彩蛋动画使用了mo.js动画库，这是一个轻量（130kb）、使用简单（采用声明式语法，同样采用声明式语法的有css和html）的动画库。

使用mojs制作动画主要分为`两步`：

1 `创建实体`

这里指创建动画实体，是动画中运动的元素。

在创建实体时，我们可以指定实体的形状、大小、颜色、位置等属性。

mojs通过`Modules类型`的api创建实体

2 `控制流程`

控制流程主要用来解决：

一个动画中的元素什么时候开始运动（播放）？

运动时间有多长？

能不能重复运动？

几个动画在一块播出顺序是什么？等诸如此类的问题。

mojs通过`Tweens类型`的api进行流程控制。

让我们来看一个最简单的动画例子

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="YzZgQPm" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/YzZgQPm">
  mojs - simple example</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

在这个例子中，我们使用 `Modules类型`的`mojs.Shape`api创建了一个动画实体，并指定了实体的形状、半径变化和填充颜色变化。

又因为mojs的api本质是`类`，Modules类型的api都继承了`Tweens类型`中用来实现`流程控制`的某个api（`mojs.Tween`），所以在构造实体时，可以配置和`流程控制`相关的属性，实体使用时，可以调用`流程控制`相关的方法。

在这个例子中，构造时就指定了动画周期、重复次数、播放方向，构造之后调用了play()方法播放动画。

另外，mojs还提供了一些工具函数来丰富动画细节，更多详见 [mojs api 文档](https://mojs.github.io/api/)。

这里主要列举一些常用的api：
```
mojs
    - Modules类api // 用于创建动画实体
        - Html
        - Shape
        - ShapeSwirl
        - Burst
    - Tweens类api // 用于控制动画流程
        - Tween
        - Timeline
    - Easing类api // 用于指定动画在不同点上行进速度的api
        - Base Easing Functions
        - Bezier Curves
        - Path Easing
        - Approximate
```

### mojs api之Modules类

mojs Moudles类型api主要用来创建动画实体。

我们可以通过这类api，给已存在的`dom元素`绑定动画，也可以新建`mojs动画实体元素`。


Modules类型有好几个api，这些api都有如下共性：

1. is开头命名的属性都是bool型，该属性值为bool值。

2. ∆（delta）类型属性，其值为一个对象，该对象中可以用一对key:value表示属性值的变化范围。还可以在对象中设置easing属性。

3. Tween型属性，该类属性是Modules类型api对Tweens类型api继承的结果。

1、2、3条是Modules类型api属性的共性，这里用 mojs.Shape api举例：

```
const circle = new mojs.Shape({
  shape: 'circle',

  isShowStart: true,    // bool型属性，实体创建后便显示出来

  fill: {               // ∆属性
    'red': 'blue',      // 该形状的颜色由red变为blue
    easing: 'ease.in',  // 该动画以越来越快的速度执行
  }

  duration: 1000,       // Tween属性，动画执行时间1000ms

  onComplete(isForward, isYoyo) {   // Tween回调属性，动画结束时执行
    console.log('the animation is over')
  },
})
```

4. Tween公共方法，play() 、replay()方法等。

5. Tune方法，该方法用来在动画播放中`修改`动画实体的某个属性值。

6. Generate方法，该方法用来在动画播放中给动画实体某个属性`生成随机值`。

4、5、6是Moudles型api方法的共性，继续用mojs.Shape举例 

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="qBrgwwP" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/qBrgwwP">
  mojs - Modules api common func</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

下面来具体看看各类api的特性：

#### [mojs.Html](https://mojs.github.io/api/modules/html/#contents)

这个api可以给现有dom元素绑定动画，它有4点值得了解：

1. 在构造实体时，可以采用驼峰式写法直接指定实体的css属性。

2. mojs.Html的∆型属性，可以直接赋值一个mojs.Tween类对象。

3. 可以自定义属性，但需要自己实现相应的方法，告诉mojs.Html自定属性如何生效。

4. 目前版本(@mojs/core 1.1.0)的master分支的mo.min.js中没有mojs.Html这个api，但dev分支上有。

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="abJMWYq" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/abJMWYq">
  mojs - mojs.Html</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### [mojs.Shape](https://mojs.github.io/api/modules/shape/)

mojs.Shape api 可以用来创建`mojs动画实体元素`。

通过这个api，我们可以既创建指定形状的动画实体（圆、方、三角 ...etc），也可以借助svg创建自定义形状的动画实体。
 
通过 mojs.Shape 创建指定形状示例 

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="dyvLxvG" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/dyvLxvG">
  mojs -  mojs.Shape - basic shape</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<br/>

通过 mojs.Shape 借助svg创建自定义形状

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="QWpzedR" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/QWpzedR">
  mojs - mojs.Shape - customized shape</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<br/>

> ⚠️ 在自定义形状中，如果当自定义动画实体中的`strokeDasharray`或`strokeDashoffset`属性使用了`百分比`的值，则需要在自定义形状的类里重写`getLength`方法返回一个`确定的长度`。

#### [mojs.ShapeSwirl](https://mojs.github.io/api/modules/shape-swirl/)

mojs.ShapeSwirl 是另一个创建`mojs动画实体元素`的api，它是 mojs.Shape api 的增强版本。

这个api可以用来创建运动轨迹为正弦函数的元素。 一般用于创建烟雾泡泡效果。

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="qBrweYb" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/qBrweYb">
  mojs - mojs.ShapeSwirl - bubble effect</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### [mojs.Burst](https://mojs.github.io/api/modules/burst/)

burst api中的children是用来设置爆照效果中每个粒子的属性，这是个mojs.ShapeSwirl类型的值。

### mojs api之Tweens类

#### [mojs.Tween](https://mojs.github.io/api/tweens/tween.html)

从上文已知，mojs中的Modules类型中的api继承了mojs.Tween类，所以在Modules类型的api中就能使用mojs.Tween中控制流程相关的属性和方法。

但偶尔，mojs.Tween也可以用于替代mojs.Html，给已有的dom元素绑定动画并控制播放，这里有一个给span标签绑定动画的例子：

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="abJXzrV" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/abJXzrV">
  mojs - mojs.Tween</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

#### mojs.Timeline

被其他类`继承`的mojs.Tween通常为`单个动画实体`提供了流程控制。但如果有多个动画实体需要控制时，这时就需要用到mojs.Timeline这个api了。

`mojs.Timeline继承了mojs.Tween`，故mojs.Timeline实例可以使用mojs.Tween中所有的属性和方法。唯二不同的是：` * `mojs.Timeline中无法对duration属性赋值，其duration属性是其所有children的duration之和。` * `mojs.Timeline增加了add和remove方法用于增删其控制的动画实体。

这是一个mojs.Timeline的使用例子：

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="vYxbOwE" data-user="misakisaysyes" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/misakisaysyes/pen/vYxbOwE">
  mojs - mojs.Timeline</a> by Misakisaysyes (<a href="https://codepen.io/misakisaysyes">@misakisaysyes</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### mojs api之Easing类

这些类别的api相当于常量，用于给mojs.Tween的`easing`属性赋值，表示当前动画在某时间点运行的速度。

更多用法详见文档 [mojs Base Easing Functions](https://mojs.github.io/api/easing/base-functions.html)、[mojs Bezier Curves](https://mojs.github.io/api/easing/bezier-curves.html)、[Path Easing](https://mojs.github.io/api/easing/path-easing.html)、[Approximate](https://mojs.github.io/api/easing/approximate.html)

### 参考

[mojs 官网](https://mojs.github.io/)

[An Introduction to mo.js](https://css-tricks.com/introduction-mo-js/)