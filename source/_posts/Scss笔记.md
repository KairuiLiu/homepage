---
title: Scss笔记
date: 2020-11-27 16:14:18
toc: true
description: Scss是与Less相似的css预处理器,设计的比Less好一些
categories:
  - [前端,CSS]
tags:
  - 前端
  - CSS
  - Scss
  - 笔记
---

作者：阮一峰

## 什么是SASS

SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

本文总结了SASS的主要用法。我的目标是，有了这篇文章，日常的一般使用就不需要去看官方文档了。

## 安装和使用

2.1 安装

SASS是Ruby语言写的，但是两者的语法没有关系。不懂Ruby，照样使用。只是必须先安装Ruby，然后再安装SASS。

假定你已经安装好了Ruby，接着在命令行输入下面的命令：
```bash
gem install sass
```
然后，就可以使用了。

2.2 使用

SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss，意思为Sassy CSS。

下面的命令，可以在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）
```bash
sass test.scss
```
如果要将显示结果保存成文件，后面再跟一个.css文件名。
```bash
sass test.scss test.css
```
SASS提供四个编译风格的选项：

- nested：嵌套缩进的css代码，它是默认值。
- expanded：没有缩进的、扩展的css代码。
- compact：简洁格式的css代码。
- compressed：压缩后的css代码。

生产环境当中，一般使用最后一个选项。
```bash
sass --style compressed test.sass test.css
```
你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。
```bash
// watch a file
sass --watch input.scss:output.css
// watch a directory
sass --watch app/sass:public/stylesheets
```
SASS的官方网站，提供了一个在线转换器。你可以在那里，试运行下面的各种例子。

## 基本用法

3.1 变量

SASS允许使用变量，所有变量以$开头。
```scss
$blue : #1875e7;　
div {
　color : $blue;
}
```
如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
```scss
$side : left;
.rounded {
border-#{$side}-radius: 5px;
}
```
3.2 计算功能
SASS允许在代码中使用算式：
```scss
body {
　　margin: (14px/2);
　　top: 50px + 100px;
　　right: $var * 10%;
}
```
3.3 嵌套

SASS允许选择器嵌套。比如，下面的CSS代码：
```scss
div h1 {
　　color : red;
}
```
可以写成：
```scss
div {
　　hi {
　　　　color:red;
　　}
}
```
属性也可以嵌套，比如border-color属性，可以写成：
```scss
p {
　　border: {
　　　　color: red;
　　}
}
```
注意，border后面必须加上冒号。

在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类，可以写成：
```scss
a {
　　&:hover { color: #ffb3ff; }
}
```
3.4 注释

SASS共有两种注释风格。

标准的CSS注释 /* comment */ ，会保留到编译后的文件。

单行注释 // comment，只保留在SASS源文件中，编译后被省略。

在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。
```scss
/*!
　　重要注释！
*/
```

## 代码的重用

4.1 继承

SASS允许一个选择器，继承另一个选择器。比如，现有class1：
```scss
.class1 {
　　border: 1px solid #ddd;
}
```
class2要继承class1，就要使用@extend命令：
```scss
.class2 {
　　@extend .class1;
　　font-size:120%;
}
```
4.2 Mixin

Mixin有点像C语言的宏（macro），是可以重用的代码块。

使用@mixin命令，定义一个代码块。
```scss
@mixin left {
　　float: left;
　　margin-left: 10px;
}
```
使用@include命令，调用这个mixin。
```scss
div {
　　@include left;
}
```
mixin的强大之处，在于可以指定参数和缺省值。
```scss
@mixin left($value: 10px) {
　　float: left;
　　margin-right: $value;
}
```
使用的时候，根据需要加入参数：
```scss
div {
　　@include left(20px);
}
```
下面是一个mixin的实例，用来生成浏览器前缀。
```scss
@mixin rounded($vert, $horz, $radius: 10px) {
　　border-#{$vert}-#{$horz}-radius: $radius;
　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
```
使用的时候，可以像下面这样调用：
```scss
#navbar li { @include rounded(top, left); }
#footer { @include rounded(top, left, 5px); }
```
4.3 颜色函数

SASS提供了一些内置的颜色函数，以便生成系列颜色。
```scss
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```
4.4 插入文件

@import命令，用来插入外部文件。
```scss
@import "path/filename.scss";
```
如果插入的是.css文件，则等同于css的import命令。
```scss
@import "foo.css";
```

## 高级用法

5.1 条件语句

@if可以用来判断：
```scss
p {
　　@if 1 + 1 == 2 { border: 1px solid; }
　　@if 5 < 3 { border: 2px dotted; }
}
```
配套的还有@else命令：
```scss
@if lightness($color) > 30% {
　　background-color: #000;
} @else {
　　background-color: #fff;
}
```
5.2 循环语句

SASS支持for循环：
```scss
@for $i from 1 to 10 {
　　.border-#{$i} {
　　　　border: #{$i}px solid blue;
　　}
}
```
也支持while循环：
```scss
$i: 6;
@while $i > 0 {
　　.item-#{$i} { width: 2em * $i; }
　　$i: $i - 2;
}
```
each命令，作用与for类似：
```scss
@each $member in a, b, c, d {
　　.#{$member} {
　　　　background-image: url("/image/#{$member}.jpg");
　　}
}
```
5.3 自定义函数

SASS允许用户编写自己的函数。
```scss
@function double($n) {
　　@return $n * 2;
}
#sidebar {
　　width: double(5px);
}
```

---

- Sass是什么
  
  Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。Sass 是采用 Ruby 语言编写的一款 CSS 预处理语言，它诞生于2007年，是最大的成熟的 CSS 预处理语言。最初它是为了配合HAML（一种缩进式 HTML 预编译器）而设计的，因此有着和 HTML 一样的缩进式风格。SASS是CSS3的一个扩展，增加了规则嵌套、变量、混合、选择器继承等等。通过使用命令行的工具或WEB框架插件把它转换成标准的、格式良好的CSS代码。

- Scss是什么

    Scss 是 Sass 3 引入新的语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于Sass。说白了Scss就是Sass的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。另外，SCSS 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法，例如：古老的 IE filter 语法。

    由于 Scss 是 CSS 的扩展，因此，所有在 CSS 中正常工作的代码也能在 Scss 中正常工作。也就是说，对于一个 Sass 用户，只需要理解 Sass 扩展部分如何工作的，就能完全理解 Scss。大部分扩展，例如变量、parent references 和 指令都是一致的；唯一不同的是，SCSS 需要使用分号和花括号而不是换行和缩进。

- Scss 与 Sass异同

    Sass 和 Scss 其实就是同一种东西，我们平时都称之为 Sass，两者之间不同之处主要有以下两点：

  1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名。
   
  2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 Scss 的语法书写和我们的CSS 语法书写方式非常类似。

- less与sass比较

    从词法角度讲， LESS的确是最接近CSS的，但是仅限于如此。 但是不幸的是它占用了 @at-rule 关键字作为了变量标识符，使得功能扩展性大大降低比如SCSS等预处理器可以轻易引入 @extend 来实现继承功能（从语法上是符合规范的） 
    ```scss
    .foo{}
    .foo-lg{@extend .foo}
    ```
    但LESS就不得不在选择器上面开刀，引出了`:extend`这样的自定义伪类
    ```less
    nav ul {
        &:extend(.inline);
        background: blue;
    }
    .inline {
        color: red;
    }
    ```
    当然在表现上会有所区别，比如嵌套结构的继承，但是大体实现的相似的功能。  但是从语言角度角度讲，扩展@at-rule 比扩展选择器要更健康一些，也更符合 css原本的设计。再者， 假如你要引入其它功能呢？比如循环、条件。 大家可以脑补下LESS的递归解决方案.  灵活性不可同日而语， **而这个缺陷在LESS第一版出现时，就已经注定了**，所以LESS作者肯定不是一个语言设计的大师。

    > 一直没有分清楚两者区别，变量，嵌套，mixin和函数两个都有的。为什么感觉原来越多的人倾向SCSS的呢？

    **答案就是语言能力，LESS的设计限制了它的语言扩展性**。预处理器80%的功能都是类似的， 但是往往一些细微的区别就可能导致你选型的不同。  

    首先LESS是没有函数支持的，  函数支持并不是一个独立存在， 它需要有完整的内部数据类型定义，参数、条件或循环控制、返回值定义等等... LESS显然没有提供所有的这些。 正是因为如此，这也是预处理器语言能力的分水岭. 

    或许有些人说，  函数完全可以由js来实现，我可以操作AST来实现具体函数， 大家可以脑补下为什么现在React配合JSX会让我有舒爽的感觉，而React通过JS直接声明函数嵌套就乏味的很， 这就是DSL（领域专属语言）带来的魅力，它是一个更高级的抽像(比接口封装更高级)， 它隐藏了内部细节，而只暴露了领域模型的“外衣”供你使用， 比如你可以直接使用  1+$width, 使用场景非常简单。  但是从语法分析和解析角度， 并不是所有人都可以**轻易**通过生成AST和操作AST来解决这个加法的简单问题的。

    **并且函数直接在预处理语言中定义还具有天然的跨（运行时宿主）语言特性.**