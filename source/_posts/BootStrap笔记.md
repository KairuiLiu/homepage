---
title: BootStrap 笔记
date: 2020-10-31 00:00:20
toc: true
description: BootStrapt是一套UI库，学习的时候应该注意重点在实践而不是理解原理，学习的时候需要常常访问其官网参考文档,主讲:尚硅谷,视频来自B站:BV1YW411T7yy
categories:
  - [前端,CSS]
tags:
  - 前端
  - CSS
  - 笔记
  - BootStrap
---

BootStrapt是一套UI库，学习的时候应该注意重点在实践而不是理解原理，学习的时候需要常常访问其[官网参考文档](https://v3.bootcss.com/)

## BootStrap的引入

BootStrapt是使用Less/Sass写的UI库，可以在官网下载的到其调用库，Less源码，Sass源码，其中压缩包带Dist的是编译后文件，无源码，编译后的文件结构较为简单

- CSS文件夹： 放置样式文件
- fonts文件及：图标字体库
- js文件夹：里面有BootStrap的JS文件，那个npm.js为编译时使用的没用

使用的时候在HTML代码中引入BootStrap文件，包括

```html
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <script src="../bootstrap/js/jquery-3.5.1.min.js"></script>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
```

由于Bootstrap的所有组件都依赖于jQuary所以还需要去jQuary下载一份jQuary的JS文件,顺便就放JS文件夹了。还需要注意的是因为是BootStrap依赖于jQuary所以应该是jQuray在前，BootStrap在后，Js永远在`\body`后`/html`前

引入之后我们发现：虽然我们什么都没有写，但是已经有了很多样式了，这些是BootStrap的**自带Normalize.css**,其中值得注意的是所有的元素`box-sizing:border-box`

## 流体容器

在`body`中写下如下内容
```html
<div class="container-fluid">
    test
</div>
```
我们会看到`.container-fluid`在审查元素中存在如下样式
```css
.container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
```
左右内边距`15px`,左右外边距`auto`，相当于是做了一个居中  
为`.container-fluid`加入背景色，修改视口的大小，我们会发现div的大小会随之变化，盒子宽度可以认为是100%

## 固定容器

```html
<div class="container">
    test
</div>
```
类名就是流体容器去掉`-fluid`  
可以看到，在全屏下(1080p)盒子并没有撑满整个页面，审查元素看到了很长的媒体查询
```css
@media (min-width: 1200px)
.container {
    width: 1170px;
}
@media (min-width: 992px)
.container {
    width: 970px;
}
@media (min-width: 768px)
.container {
    width: 750px;
}
```

里面看到三个阈值

|意义|代号|屏幕宽度|div宽度|
|--|--|--|--|
|大屏PC|lg|>=1200|1170|
|中屏PC|md|>=992 <1200|970|
|平板|sm|>=768 <992|750|
|移动手机|xs|<768|auto|
**注意**：width的默认值为auto而不是100%，区别是，`width:100%`时候padding是向外扩，auto是时候是向内扣

## 珊格布局（珊格系统）

在使用珊格系统的时候我们一般使用固定容器作为他的父元素，使用`.row`类定义一个行，使用`col-XX-YY`定义一个列，例如
```html
<div class="container">
    <div class="row">
        <div class="col-lg-10">10</div>
        <div class="col-lg-2">2</div>
    </div>
</div>
```
分别着色之后我们可以看到两个div占据了一个固定容器

**BootStrap默认分一行为12列，列名上的YY就是占据多少列**

但是如果我们将视口宽度调整小一点效果消失了，具体见读源码部分

## BootStrap 读源码
源码是Less文件，所以在less文件夹里面，再看到里面有一个mixin文件夹放所有的混合，外面的文件可以视为一些入口 

我们需要的文件有 

- less/mixin/`clearfix.less`,`grid-framework.less`,`gird.less`
- less/`gird.less` 珊格系统的总入口
- less/`variables.less` 定义了所有需要的变量

我们只看less/`gird.less`需要引入的时候从别的地方摘

```less
.container {
  .container-fixed();

  @media (min-width: @screen-sm-min) {
    width: @container-sm;
  }
  @media (min-width: @screen-md-min) {
    width: @container-md;
  }
  @media (min-width: @screen-lg-min) {
    width: @container-lg;
  }
}

.container-fluid {
  .container-fixed();
}

.row {
  .make-row();
}

.make-grid-columns();
.make-grid(xs);

@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}

@media (min-width: @screen-md-min) {
  .make-grid(md);
}

@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}

```

首先比较困惑的是最后几行，也没有写属于那个类，直接就是个引用和媒体查询(感觉是会作为一个包被其他文件引用)

**第一部分 固定容器**
```less
.container {                                // 固定容器
  .container-fixed();                       // 

  @media (min-width: @screen-sm-min) {
    width: @container-sm;
  }
  @media (min-width: @screen-md-min) {
    width: @container-md;
  }
  @media (min-width: @screen-lg-min) {
    width: @container-lg;
  }
}
```
这是一个固定容器的**类**，先调用了一个混合，混合去mixin里面找`gird.less`
```less
// 固定容器和流体容器的公共样式
.container-fixed(@gutter: @grid-gutter-width) {
  margin-right: auto;
  margin-left: auto;
  padding-left:  floor((@gutter / 2));
  padding-right: ceil((@gutter / 2));
  &:extend(.clearfix all);
}
```
看到有个参数`@gutter`，同时他还有一个默认参数`@grid-gutter-width`,对于不知道的变量要去`\less\variables.less`找，得到`@grid-gutter-width:30px`

这个变量我们称之为**槽宽**，其实就是固定容器默认的内边距

在混合中，我们将设置左右内边距为槽宽的一半向上向下取整，设置左右margin为auto相当于居中，最后混合继承了一个`.cldearfix()`的所有属性

在固定容器的样式中，之后是三个媒体查询，我们要看一下`@screen-XX-min`的值，具体要去`\less\variables.less`，可以看到如下代码
```less
@screen-xs:                  480px;
@screen-xs-min:              @screen-xs;
@screen-sm:                  768px;
@screen-sm-min:              @screen-sm;
@screen-md:                  992px;
@screen-md-min:              @screen-md;
@screen-lg:                  1200px;
@screen-lg-min:              @screen-lg;
```
我们可以看到`xs/sm/md/lg`分别为`480px,768px,992px,1200px`  
继续去找`container-xx`
```less
@container-tablet:             (720px + @grid-gutter-width);
@container-sm:                 @container-tablet;
@container-desktop:            (940px + @grid-gutter-width);
@container-md:                 @container-desktop;
@container-large-desktop:      (1140px + @grid-gutter-width);
@container-lg:                 @container-large-desktop;
```

三者就是三个屏的固定容器宽度+槽宽

根据移动优先的原则我们把默认给了xs(是auto所以没写)

注意这边的顺序，先小后大，这样巨大平会依次被拦，但是后生效者优先


**第二部分 流体容器**
```less
.container-fluid {
  .container-fixed();
}
```
就是固定容器的公共样式

**第三部分 行**
```less
.row {
  .make-row();
}
```

是个混合，当然是从mixin\ `gird.less`里面找

```less
.make-row(@gutter: @grid-gutter-width) {
  margin-left:  ceil((@gutter / -2));
  margin-right: floor((@gutter / -2));
  &:extend(.clearfix all);
}
```
左右加了个外边距为**负的**半个槽宽，


**第四部分 列**
```less
.make-grid-columns();
.make-grid(xs);

@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}

@media (min-width: @screen-md-min) {
  .make-grid(md);
}

@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}
```

先调用了一个混合`make-grid-columns()`

```less
.make-grid-columns() {
  .col(@index) {
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) { 
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) {
    @{list} {
      position: relative;
      min-height: 1px;
      padding-left:  ceil((@grid-gutter-width / 2));
      padding-right: floor((@grid-gutter-width / 2));
    }
  }
  .col(1);
}
```

看到这个混合，先进去，看到是三个混合，先不管，直接看到唯一一个可以运行的`.col(1)`，一个变量，进入第一个混合
```less
  .col(@index) {
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), @item);
  }
```
尝试跑一下，进入直接就是一个避免编译，然后去调用了一个二元的`.col`,第一句item得到的是
```
.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1
```
然后看第二句，成了
```
.col(2,.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1);
```
第一个混合结束了，因为是**避免编译**所以我们的item是一个变量以字符串的形式传递出去，两个变量，进入第二个混合
```less
.col(@index, @list) when (@index =< @grid-columns) { 
    @item: ~".col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
}
```

查询到`@grid-columns:12;`实际上就是默认12列

index=2,进入之后我们又得到一个item
```
.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2
```
这里发生了一个递归，index=3的时候第二句话变成了
```less
.col(3,.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2)
```
由于是避免编译，所以后面仍然是一个变量，我们可以看到index是会比后面的`col-xx-y`的`y`大1

我们找到这个递归的边界`index=12`,也就是`index=13`的时候不会进入下一次递归，这时候的调用命令应该是
```less
.col(13,
.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,
.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,
.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,
.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,
.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,
.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,
.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,
.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,
.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,
.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,
.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,
.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12
)
```
值得注意的是后面之一个整体字符串，因为避免编译了`13>12`所以进入第三个混合
```less
.col(@index, @list) when (@index > @grid-columns) {
    @{list} {
      position: relative;
      min-height: 1px;
      padding-left:  ceil((@grid-gutter-width / 2));
      padding-right: floor((@grid-gutter-width / 2));
    }
  }
```
这里要用变量作为选择器所以要写`@{}`,这里相当于写了
```less
.col-xs-1,.col-sm-1,.col-md-1,.col-lg-1,
.col-xs-2,.col-sm-2,.col-md-2,.col-lg-2,
.col-xs-3,.col-sm-3,.col-md-3,.col-lg-3,
.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,
.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,
.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,
.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,
.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,
.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,
.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,
.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,
.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12{
    position: relative;
    min-height: 1px;
    padding-left:  ceil((@grid-gutter-width / 2));
    padding-right: floor((@grid-gutter-width / 2));
}
```
相对位置(BFC)，最小高度，设置左右槽宽

这样设计的原因是：less没有循环，所以用递归的形式构造了一个大的字符串作为选择器，第一部分是递归开始，中间是递归构造部分，最后递归边界设定样式，这种构造选择器的方法值得注意！

然后就是三个媒体查询
```less
.make-grid(xs);         // 手机屏，下面都拦不住，先设置为默认移动端，移动端优先

@media (min-width: @screen-sm-min) {
  .make-grid(sm);
}

@media (min-width: @screen-md-min) {
  .make-grid(md);
}

@media (min-width: @screen-lg-min) {
  .make-grid(lg);
}
```

然后他们都是调用了一个混合

```less
.make-grid(@class) {
  .float-grid-columns(@class);
  .loop-grid-columns(@grid-columns, @class, width);
  .loop-grid-columns(@grid-columns, @class, pull);
  .loop-grid-columns(@grid-columns, @class, push);
  .loop-grid-columns(@grid-columns, @class, offset);
}
```
他又调用了两个混合

第一个

```less
.float-grid-columns(@class) {
  .col(@index) {
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @grid-columns) {
    @item: ~".col-@{class}-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index, @list) when (@index > @grid-columns) {
    @{list} {
      float: left;
    }
  }
  .col(1);
}
```

和之前那个`.make-grid-columns()`一样，只不过这次指定了类型，最后相当于设置了一个左浮动

第二个，默认`@grid-columns：12`
```less
.loop-grid-columns(@index, @class, @type) when (@index >= 0) {
  .calc-grid-column(@index, @class, @type);
  .loop-grid-columns((@index - 1), @class, @type);
}
```
相当于给**0**-12(注意不是**1**-12)设置`.calc-grid-column(@index, @class, @type)`

```less
.calc-grid-column(@index, @class, @type) when (@type = width) and (@index > 0) {
  .col-@{class}-@{index} {
    width: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index > 0) {
  .col-@{class}-push-@{index} {
    left: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = push) and (@index = 0) {
  .col-@{class}-push-0 {
    left: auto;
  }
}
.calc-grid-column(@index, @class, @type) when (@type = pull) and (@index > 0) {
  .col-@{class}-pull-@{index} {
    right: percentage((@index / @grid-columns));
  }
}
.calc-grid-column(@index, @class, @type) when (@type = pull) and (@index = 0) {
  .col-@{class}-pull-0 {
    right: auto;
  }
}
.calc-grid-column(@index, @class, @type) when (@type = offset) {
  .col-@{class}-offset-@{index} {
    margin-left: percentage((@index / @grid-columns));
  }
}
```

分别是：

设置宽度，左列排序，左特判，右列排序，右特判，列偏移

切记这里排序的时候0的时候是auto不是0

排序和偏移的区别就是排序是按正常顺序排序，偏移之对特殊元素处理

## Bootstrap 实例

尝试制作BootStrap中文站首页四个图片可以上下的特效

我们知道这种样式bootstrap官网一定会提供组件的，[链接](https://v3.bootcss.com/components/#thumbnails-custom-content)

直接套用略作样式修改

```html
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <style>
        .caption{text-align: center;}
        .caption h3{color:#337ab7;}
        .caption h4{font-size:15.6px;color:#777;}
        .caption{color: #555;}
        .thumbnail{height: 326px;}
    </style>

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="thumbnail">
                    <img src="./img/expo.png">
                    <div class="caption">
                        <h3>优站精选</h3>
                        <h4>Bootstrap 网站实例</h4>
                        <p>Bootstrap 优站精选频道收集了众多基于 Bootstrap 构建、设计精美的、有创意的网站。</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="thumbnail">
                    <img src="./img/webpack.png">
                    <div class="caption">
                        <h3>Webpack</h3>
                        <h4>是前端资源模块化管理和打包工具</h4>
                        <p>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。</p>                    </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="thumbnail">
                    <img src="./img/react.png">
                    <div class="caption">
                        <h3>React</h3>
                        <h4>用于构建用户界面的 JavaScript 框架</h4>
                        <p>React 起源于 Facebook 的内部项目，是一个用于构建用户界面的 JavaScript 库。</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="thumbnail">
                    <img src="./img/typescript.png">
                    <div class="caption">
                        <h3>TypeScript</h3>
                        <h4>中文手册</h4>
                        <p>TypeScript 是由微软开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
    <script src="../bootstrap/js/jquery-3.5.1.min.js"></script>
    <script src="../bootstrap/js/bootstrap.js"></script>
</html>
```

**一定要注意的是**：因为我们是一级一级的往下掉，所以必须把lg,md,sm全写一边，任何一个都不能少

**还要注意**：BootStrap是三端同步，所以一定要加上视口

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## BootStrap 的列排序和列偏移
在上一节的基础上，我们希望可以实现当网页宽度变小的时候原本是尾部先下去改头先下去(明显修改float即可)我们尝试使用列排序和偏移实现

我们的思路是，不管怎么修改，最开始掉下来的肯定是html代码中在最后的元素，所以我们要把所有元素都反着写,所以，结构方面的位置就已经卡死了，我们希望修改css的样式从而敢于网页的表现形式

我们考虑css端的表达，我们知道刚刚源码的列排序都是正数没有负数，所以只能是右面往左推，于是给最右面那个元素写下`class="col-lg-pull-9"` 相当于是从右往左偏移了9/12，于是最后一个位置上的元素就到了首位，并且重合，于是同理修改其他元素

剩下的2种情况也要考虑

于是得到代码如下

```html
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-push-9 col-md-push-8 col-sm-push-6">
            <div class="thumbnail">
                <img src="./img/typescript.png">
                <div class="caption">
                    <h3>TypeScript</h3>
                    <h4>中文手册</h4>
                    <p>TypeScript 是由微软开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。</p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-push-3 col-sm-pull-6">
            <div class="thumbnail">
                <img src="./img/react.png">
                <div class="caption">
                    <h3>React</h3>
                    <h4>用于构建用户界面的 JavaScript 框架</h4>
                    <p>React 起源于 Facebook 的内部项目，是一个用于构建用户界面的 JavaScript 库。</p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-pull-3 col-md-pull-8">
            <div class="thumbnail">
                <img src="./img/webpack.png">
                <div class="caption">
                    <h3>Webpack</h3>
                    <h4>是前端资源模块化管理和打包工具</h4>
                    <p>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。</p>                    </p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-pull-9">
            <div class="thumbnail">
                <img src="./img/expo.png">
                <div class="caption">
                    <h3>优站精选</h3>
                    <h4>Bootstrap 网站实例</h4>
                    <p>Bootstrap 优站精选频道收集了众多基于 Bootstrap 构建、设计精美的、有创意的网站。</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

在写完之后发现出锅了,在md的情况下原来正常但是写完sm之后就不正常了

发现出锅的是React部分,这是因为我们的宽度没有达到lg,所以根据移动端优先的原则,媒体查询被sm截掉了,于是就出现了列排序,所以我们要显式指定md状态下的列偏移为0,这就是为什么当时源码是`>=0'而不是`>0`

```html
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-push-9 col-md-push-8 col-sm-push-6">
            <div class="thumbnail">
                <img src="./img/typescript.png">
                <div class="caption">
                    <h3>TypeScript</h3>
                    <h4>中文手册</h4>
                    <p>TypeScript 是由微软开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。</p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-push-3 col-md-pull-0 col-sm-pull-6">
            <div class="thumbnail">
                <img src="./img/react.png">
                <div class="caption">
                    <h3>React</h3>
                    <h4>用于构建用户界面的 JavaScript 框架</h4>
                    <p>React 起源于 Facebook 的内部项目，是一个用于构建用户界面的 JavaScript 库。</p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-pull-3 col-md-pull-8 col-sm-pull-0">
            <div class="thumbnail">
                <img src="./img/webpack.png">
                <div class="caption">
                    <h3>Webpack</h3>
                    <h4>是前端资源模块化管理和打包工具</h4>
                    <p>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。</p>                    </p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 col-lg-pull-9 col-md-pull-0 col-sm-pull-0">
            <div class="thumbnail">
                <img src="./img/expo.png">
                <div class="caption">
                    <h3>优站精选</h3>
                    <h4>Bootstrap 网站实例</h4>
                    <p>Bootstrap 优站精选频道收集了众多基于 Bootstrap 构建、设计精美的、有创意的网站。</p>
                </div>
            </div>
        </div>
    </div>
</div>
```
换而言之就是: 可以有偏移,但是同种偏移必须**不能跳着写**

## BootStrap 的响应式工具[读源码学工具]

BootStrap 的响应是工具是以珊格布局为基础的,所以要加在珊格布局的里面,还需新增文件`responsive-utilities.less`与`/mixin/grid-framework.less`,前者是主文件

最开始的模块是
```less
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  .responsive-invisibility();
}
```
去找`responsive-invisibility()`

```less
.responsive-invisibility() {
  display: none !important;
}
```
强制所有的元素全部隐藏

所以我们可以尝试使用 `visiable-xs`
```html
<div class="container visible-md">
    <div class="jumbotron">
        <h1>Hello, world!</h1>
        <p>...</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
    </div>
</div>
```

发现只有在md状态下可见

与之相反的是`hidden-xx`,意思相反不解释

## 珊格模型设计的精妙之处

写一个珊格系统,F12查属性,外层容器有一个
```css
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
```
最后两行就是一个居中,然后就是**容器的两边给了一个padding15**

看到`.row`属性,看到如下命令
```css
    margin-right: -15px;
    margin-left: -15px;
```

看任意一个列,可以看到有
```css
padding-right: 15px;
padding-left: 15px;
```
是做槽宽的

得到

  - 固定容器两边有15px的padding
  - row    两边有-15px的margin
  - col    两边有15px的padding

原理

- 为了维护槽宽的规则,列两边必须要有15px的padding
- 正常情况下这是可以的,但是考虑一种情况,在列里面我想加一个行
- 由于列自带槽宽,行没有办法占据整个列,这样,在行里面再加入列,边缘相当于有45px的槽宽
- 我们如果给行加入-15px就可以抵消45px的异常槽宽
- 但是产生了的问题是最外层的那个固定容器套的行也有一个负槽宽
- 解决方案是给固定容器加入槽宽15

**思想**: 为了解决问题我们修改了行列的边距,但是会影响到最外层,因为最外层的固定容器不是行列容器,**是一个特殊化的元素**,我们的思想是把他**一般化**,也就是在当前问题上具有与col,row一样的属性,也就是槽宽15

## BootStrap 定制化

- To C 面向客户的(eg 电商),这类项目要自己写
- To B 面向公司内网的(eg OA),直接从网上下载类似的UI库直接用

有的需求要求有自己的风格,直接修改bootstrap源码是可以的,但是不利于维护,所以我们可以再写一个less,然后import源码的bootstrap.less 然后在后面修改变量值,编译自己写的less

p.s. 在H5中`dara-`开头的大多数JS,
