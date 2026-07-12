---
title: 设计模式
date: 2021-09-09 18:32:46
tags: ['设计模式', '技术', '前端']
---

## 前言

`设计模式`是为`面对象编程`思想服务的一种工具。

它是软件工程师们基于`面对象编程`的概念体系(类、对象、继承、多态...)，结合实际工程应用，总结出的一套`编程原则`和`代码模式（模版）`。

这套原则和模版，能帮助新手软件工程师们更快地写出易扩展、好维护的代码。

本文主要介绍了以下内容：

![1.png](1.png)

## 设计模式原则

### 单一职责原则

别名：单一功能原则

一个类只用来完成一项工作，对于这个类对实体，尽量保证只有一个引起它变化的因素。

以提内聚性来减少引起变化对因素，从而降低耦合度。

### 开放封闭原则

对象或实体应该对扩展开放，对修改封闭。

对扩展开放：一旦有新需求，原有类应该很容易扩展出新方法。

对修改封闭：已经设计完成的类可以独立完成其工作，不需要大的修改。

通过对抽象类继承，和多态重写机制来实现开放封闭原则。

### 里氏(Liskov)替换原则

在对象`x`为类型`T`时`q(x)`成立。那么`S`为`T`的子类时，当`y`的类型为`S`那么`q(y)`也成立。

即：对父类的调用对子类同样成立。子类或者派生类必然可以替换它们的父类或基类，但反之不一定成立。

`Liskov替换原则`是关于继承机制的设计原则，违反类Liskov设计原则就必然违反`开放封闭原则`

### 接口隔离原则

不应该强迫客户端实现一个它们用不上的接口。

核心思想：实现多个小而专的接口，不要实现大的总接口。`多重继承`体现类接口隔离原则。

### 依赖倒置原则

实体必须依赖抽象而不是具体实现。高层次的模块不应该依赖低层次的模块，它们都应该依赖于抽象。

> 当两个模块之间存在紧密的耦合关系时，最好的方法就是分离接口和实现：在依赖之间定义一个抽象的接口使得高层模块调用接口，而底层模块实现接口的定义，以此来有效控制耦合关系，达到依赖于抽象的设计目标。

### 其他原则

#### 合成复用原则

合成复用原则就是指在一个新的对象里通过关联关系（包括组合关系和聚合关系）来使用一些已有的对象，使之成为新对象的一部分；新对象通过委派调用已有对象的方法达到复用其已有功能的目的。简言之：要尽量使用组合/聚合关系，少用继承。

#### 迪米特法则

一个实体应当尽量少的与其他实体之间发生相互作用，使得系统功能模块相对独立。

这样减少修改实体时对其他实体造成的影响。

## 创建型模型

对类实例化的过程进行抽象，将软件模块中创建对象和使用对象分离，外界只知道使用对象的接口，使得整个系统更符合`单一职责原则`。

### 简单工厂模式 (Simple Factory)

别名：静态工厂方法 (Static Factory Method)

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/simple_factory.html#)

{% codepen slug_hash:NWgpEKJ %}


### 工厂方法模式

别名：工厂模式、虚拟构造器模式、多态工厂模式。

父类负责定义创建产品对象对公共接口，子类工厂负责生产具体对产品对象。

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/factory_method.html)

{% codepen slug_hash:QWgvRbq %}


### 抽象工厂模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/abstract_factory.html)

别名：kit模式，对象创建型模式

{% codepen slug_hash:RwgVmYp %}

### 建造者模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/builder.html)

{% codepen slug_hash:WNOjqzq %}

### 单例模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/singleton.html)

别名：单件模式、单态模式

{% codepen slug_hash:WNOjVQv %}


## 结构型模式

结构型模式描述如何将类和对象结合在一起，从而形成更复杂，功能更强大的结构。

结构型模式可以分为：`类结构型模式`和`对象型结构模式`。

`类结构型模式`：

关心类的组合，由多个类组合成更大的系统。


`对象型结构模式` ：

关心类与对象的组合，通过关联关系使得一个类中定义另一个类的实例对象，然后通过该对象调用类方法。

根据`合成复用原则`，在系统中应该尽量使用`关联关系`替代`继承关系`，因此大部分结构模式都是对象型结构模式。


### 适配器模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/adapter.html)

用于接口转换

#### 对象适配器

{% codepen slug_hash:VwWWZQa %}


#### 类适配器

{% codepen slug_hash:PojmMvN %}3.


### 桥接模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/bridge.html)

别名：柄体模式、接口模式

是一种对象结构型模式，将继承关系转换成关联关系

{% codepen slug_hash:WNOOZqK %}


### 装饰器模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/decorator.html)

别名：油漆工模式，是一种对象结构模型

{% codepen slug_hash:NWgwKod %}


### 外观模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/facade.html)

{% codepen slug_hash:rNwYPop %}


### 享元模式

[ref 1](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/flyweight.html)

[ref 2](https://www.cnblogs.com/pingan8787/p/13069474.html)

别名：轻量级模式，对象结构型模式

{% codepen slug_hash:qBjVvqw %}


### 代理模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/structural_patterns/proxy.html)

别名：对象结构型模式

代理一般和权限控制相关。

{% codepen slug_hash:dyRJbGm %}


## 行为模式

行为模式：类行为模式、对象行为模式

### 命令模式

[ref1](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/command.html)

[ref2](https://www.jianshu.com/p/b16d9d90544d) // 🤔：使用命令模式设计编辑器的撤销保存

[ref3](https://www.cnblogs.com/brookshi/p/6533920.html) // 命令模式的备忘录功能

别名： 事务模式、动作模式

将行为请求者和行为实现者进行解耦，适用于一些需要对行为进行记录撤销的场景。

{% codepen slug_hash:rNwpBYw %}

### 中介者模式
[ref1](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/mediator.html)

[ref2](https://www.cnblogs.com/brookshi/p/6545238.html)

别名：调停者模式

{% codepen slug_hash:vYZpYqy %}

### 观察者模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/observer.html)

别名：发布订阅模式、模型视图模式、源监听模式、从属者模式

{% codepen slug_hash:MWorwbe %}


### 状态模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/state.html)

别名：状态对象

{% codepen slug_hash:qBjxOaJ %}

### 策略模式

[ref](https://design-patterns.readthedocs.io/zh_CN/latest/behavioral_patterns/strategy.html)

别名：也称为政策模式

{% codepen slug_hash:oNwEjoO %}

## 参考

[UML时序图](https://www.cnblogs.com/gy19920604/p/5368358.html)

[图说设计模式](https://design-patterns.readthedocs.io/zh_CN/latest/index.html) 

[面向对象对五个基本原则](https://www.cnblogs.com/z00377750/p/9153615.html#3993673374)