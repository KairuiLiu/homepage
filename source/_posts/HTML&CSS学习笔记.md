---
title: HTML&CSS学习笔记
date: 2020-10-31 00:00:19
toc: true
description: HTML&CSS入门笔记,主讲:尚硅谷李立超,视频来自B站:BV1XJ411X7Ud
categories:
  - [前端,HTML]
  - [前端,CSS]
tags:
  - 前端
  - HTML
  - CSS
  - 笔记
---


## 1. HTML基础

### 1.1 网页的结构

**前端的三种语言**：HTML(结构)，CSS(表现)，JavaScript(行为)

**标准**：W3C

**基本结构**

```html
<html>
<head>
    元数据，给浏览器搜索引擎看的
</head>
<body>
	想要被看到的内容
</body>
</html>
```

标签一般成对出现但是存在自结束标签，例如`<input>`,`<img>`,H5不推荐写自结束的`/`

**注释的写法**`<!-- 这是一个注释 -->`，**注释不能嵌套**

**标签的属性：**在标签的开始/自结束标签前面写，是一个名值对结构

```html
<h1>这是我的<font color="Red">第三个</font>网页</h1>
```

属性之间空格隔开

**网页的基本结构：** 

```html
<!doctype html>   html5声明
<html>
    <head>
        <meta charset="utf-8">
        字符集应该与编辑器的一致
    </head>
    <body>
    </body>
</html>
```

- 迭代：
  HTML4、XHTML2.0、HTML5...
- 文档声明(doctype)：文档声明告诉浏览器网页的版本`<doctype html>`
- 计算机的最小操作单位是 *1byte=8bit*
- 乱码问题：如果编码解码字符集不同就会有乱码问题
- 设置charset应该与编辑器的编码一致

**`<html lang="en">`** 告诉浏览器你写的是英文网站，到时候会弹出是否翻译，中文则为`<html lang="zh">`

### 1.2 HTML中的"实体"

在网页中，编写的多个空格会自动被浏览器解析为一个空格，目的是方便格式化代码  
但是在html中有时候不能书写一些特殊符号，比如字母两侧的 '<' '>' 号 那么我们就需要实体(转义字符)语法是"&"开头";"结尾，例如

- `&nbsp;` 是空格
-  `&gt;` 是大于
-  `&lt;` 是小于
-  `&copy;`是版权号

例如

```html
a < b > c
a&lt;b&gt;c
a<b>c
```

### 1.3  meta 标签

 meta主要用于设置网页的元数据，元数据是并不是给用户看的，其组成有两个

- name 指定数据名称
- content 指定数据内容

值得注意的是meta并不是键，name才是，例如`<meta charset="UTF-8">`中charset是键，UTF-8是值。常见的键值对包括                

- charset: 网页采用的字符集，他的写法是另一种键值对的，见下
- keywords: 搜索引擎用的关键词，用逗号隔开
- description: 搜索引擎蓝字下面的那个
- auther: 作者
- title: 标题，会作为搜索引擎的结果标题表示
- http-equiv 协议，其中http-equiv="refresh" 几秒后跳转网页到

```html
<meta charset="UTF-8">
<meta name="keywords" content="HTML5,前端，CSS">
<meta name="description" content="LaLaLaLaLaLaLaLa">
<meta http-equiv="refresh" content="3;url=http://www.swu.edu.cn"> 
```

## 1.4 语义化标签

语义化标签在HTML中表示特定的结构，但是会在显示的时候存在样式的变化。但是注意HTML是专门负责网页结构的，所以在使用html标签时应该关注的是标签的语义而不是标签的样式

- 标题标签
  
    - `h1`~`h6`一共有6级标题，重要性递减
    - `h1`是最重要的仅次于`title`，一般只有一个`h1`
    
    - 一般只用到`h1`到`h3`
    
- `p`标签，表示一个段落，也是一个块元素

- `hgroup`标签：将h标题分组

- `em`是语音语调的加重，是一个行内元素

- `strong`表示强调

- `blockqueue` 表示一个长引用

- `q` 表示一个短引用

- `br` 换行

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<p>123</p>
<p>456</p>

<hgroup>
    <h1>回乡偶书</h1>
    <h2>其一</h2>
</hgroup>

<p>今天天气<em>真</em>不错</p>

<p>你今天必须要<strong>完成作业</strong></p>

鲁迅说：
<blockquote>我是从来没有说过的</blockquote>

子曰<q>学而时习之</q>
<br>
<br>
<br>
今天天气真不错
```

- 块元素：主要对元素进行布局

- 行内元素：用来包裹文字，一般是块内放行内


`p`元素里不能放任何块元素,浏览器会对网页自动修正，例如在html外的元素，把`h1`放在`p`里面，浏览器不会再源码里纠正，但是会在加载的内存中纠正，在检查元素中显示纠正结果

结构化语义标签(用的不多)
- header: 网页头部
- main: 网页的主体部分(只有一个)
- footer: 网页底部
- nav: 网页的导航
- aside: 侧注释，与主体相关的其他内容
- article 独立的文章
- section: 其他的独立区块

结构化无意义标签

- div: 没有语义，表示一个独立区块
- span: 行内元素，没有语义，用来选中文字

## 1.7 列表

- 无序列表 ul
- 有序列表 ol
- 定义列表 dl
    - dt 定义的内容
    - dd 对定义进行解释说明
- 内容用 li
  

列表间可以互相嵌套
```html
<ul>
    <li>结构</li>
    <li>表现</li>
    <li>行为</li>
</ul>

<ol>
    <li>结构</li>
    <li>表现</li>
    <li>行为</li>
</ol>

<dl>
    <dt>结构</dt>
    <dd>解释解释解释解释</dd>
    <dd>解释解释解释解释</dd>
    <dd>解释解释解释解释4</dd>
</dl>

<ul>
    <li>
        <ol>
            <li>结构</li>
            <li>表现</li>
            <li>行为</li>
        </ol>
    </li>
    <li>表现</li>
    <li>行为</li>
</ul>
```

## 1.8 超链接

超链接让页面跳转到另一个位置或者其他页面

用a定义超链接
a是一个行内元素可以嵌套除他自身以外块的元素

a的属性： 

- href:目标跳转路径
    - 值可以是外部网站地址，也可以是内部页面地址
    - #是回到顶部
    - #ID跳转到页面指定位置
    - 在开发中可以用javascript:;这样什么也不发生

- target属性，可选值
    - _self 默认值，在当前页面打开
    - _blank 在新的页面打开

**注意**：ID是唯一属性，不能一样，字母开头，区分大小写，靠前的元素优先生效

例如

```html
<a href="07.列表.html" target="_blank">超链接</a>
<a href="#but">去底部</a>
<a href="javascript:;">什么也不发生</a>
```

## 1.9 图

img标签用于引入图片

使用img标签引入外部标签，img是一个自结束标签

img 属于替换元素，属于行内元素和替换元素之间的一种元素，即img这段代码被具体的东西给替换了

属性：

- src 属性指定的外部路劲
- alt 对于图片的描述，描述默认情况下是不会显示的，会在图片显示不出来的时候显示，搜索引擎会通过alt来搜索图片
- width 指定图片的宽度(单位是像素)
- height 指定图片的高度(单位是像素)

**注意**：如果只修改了一个，图片会被等比例缩放，如果指定了两个图片就不会等比例变化

**注意**：一般在PC端不建议修改图片的大小，为了节省网络资源，最好直接在做图的时候改好,但是在移动端经常会把图片缩小

图片的格式：

- jpg(jpeg)
    - 颜色多，不支持透明，不支持动图
    - 一般用于显示照片
- gif
    - 支持的颜色少，支持简单透明，支持动图
    - 颜色单一的动图
- png
    - 颜色丰富，支持透明，不支持动图
    - 颜色丰富，复杂透明(转为网页而生)
- webp
    - 谷歌新推出的，专业用于网络的格式
    - 具有其他图片格式的优点，文件特别小
    - 兼容性不好(例如IE)
- base64
    - 使用base64进行编码，这样可以直接把图片转化为字符，通过字符格式引入
    - 一般都是需要与网页一起加载的图片

**原则**：效果一样用小的(快)，效果不一样用效果好的

```html
<img src="./img/img/1.gif" alt="" width=100px>
<img src="./img/img/5.gif" alt="松鼠">
<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1763336060,2397496866&fm=26&gp=0.jpg" alt="">
<img src="data:image/jpeg;base64...code...>
```

## 1.10 内联框架

内联框架，用于向当前页面中引入其他页面

- src 指定要引入的网页路径

- frameborder 只有0/1 就是显示与不显示边框

内联框架是把一个网页做为窗口引入现在的网页，注意的是**内联框架的内容不会被搜索框架所索引**

```html
<iframe src="https://www.qq.com" frameborder="0" width=800 height=400></iframe>
```

## 1.11 音视频

audio 向网页引入音频文件，音视频文件引入的时候默认情况下是不允许用户操作的
    
属性:

- controls 只有键没有值 是否允许用户控制播放
- autoplay 音频是否自动播放(兼容性差，例如火狐不自动播放)

```html
<audio src="./source/audio.mp3" controls autoplay></audio>
```

除了通过src实现之外，还可以通过source实现,这样可以实现对于不同浏览器提供最佳匹配文件,IE8不支持，所以要输出提示，原理是：进入`audio`标签，如果匹配到source,那么浏览器会自动忽略内部其他代码，实现选择，IE8不认识source所以会自动忽略所有`source`标签，于是只找到提示信息，自动不全`p`标签，输出提示

```html
<audio controls>
    对不起你的浏览器不支持播放音频，请升级浏览器
    <source src="./source/audio.mp3">
    <source src="./source/audio.ogg">
    <embed src="./source/audio.mp3" type="">
</audio>
```

视频标签是`video`，同理
```html
<video src="./source/flower.mp4" controls></video>

<video controls>
    <source src="./source/flower.webm">
    <source src="./source/flower.mp4">
    <embed src="./source/flower.mp4" type="">
</video>
```
# 2. CSS基础

## 2.1 CSS简介

网页的三个部分

- 结构HTML
- 表现CSS
- 行为JS

CSS

- 层叠样式表
- 网页实际上是一个多层的结构，通过css样式可以对网页的每一个层设置样式，最后可以看到的只有最上层的

CSS的定义方式

- 第一种方式： 
    - 在标签内部通过style设置元素的样式
    - 问题：
        如果希望影响到多个元素，必须在多个元素复制一遍，当样式发送变化时要一个一个修改，非常不方便
    - 注意：开发时候绝对不要使用
- 第二种方式：
    - 将样式编写到style标签里
    - 通过css选择器为多个标签设置样式，并且只修改一次
    - 更方便对样式进行复用
    - 问题：
        - 只对一个网页起作用
        - 里面的样式不能跨网页复用
- 第三种方式 
    - 将css样式写到一个css文件里
    通过link链接外部css文件
    - 写到外面可以触发浏览器的缓存机制，从而加快网页的加载速度，提高用户的体验

## 2.2 CSS基本语法

- 注释是`/*...*/`，会被浏览器自动忽略
- 选择器&申明块 

    通过选择器选定指定页面,比如p的作用就是选中所有的p元素,申明块，通过声明块来为指定的元素设置演样式声明块是一个名值对的一个样式，名值对之间以:链接，以;结尾

## 2.3 CSS 选择器基础

class是标签属性，和id类似，不同的是class可以重复使用

- 元素选择器
  - 作用，根据标签名确定指定元素
  - 语法：标签名{}

- ID选择器
  - 作用，根据元素的ID属性选中一个元素
  - 语法，#ID属性值
  - 例子，#box{},#red{}

- class

  - 多个元素可以绑定一个class
  - 一个元素可以绑定多个class(用空格隔开)
  - 语法 .class 属性值

- 统配选择器：
    - *{}

## 2.4 CSS的复合选择器
- 交集选择器，同时选择有几个类的元素，两个选择器直接写在一起
    **注意**：交集选择器中如果有元素选择器，必须以元素选择器开头

- 并集选择器，同时选择多个选择器对应的元素，用`,`分割开
    ```css
    #b1,p,h1.red{}
    ```

## 2.5 关系选择器

- 父元素
    - 直接包含子元素的元素就是父元素
- 子元素
    - 直接被父元素包含的元素
- 祖先元素
    - 直接或间接包含后代的元素就是祖先元素
    - 一个元素是父元素也是他的祖先元素
- 后代元素
    - 直接或间接被祖先包含的元素叫后代元素
- 兄弟元素
    - 拥有相同父元素的元素就是兄弟元素

选择器

- 子元素选择器：

  - 作用：指定父元素的子元素
  - 语法 父元素>子元素

```css
div.box>span{
    color:red;
}
```
- 下一个兄弟选择器
    - 选择具有相同父亲的兄弟元素

```css
p+span{
    color:blue;
}
```

- 下边所有的兄弟兄弟选择器
    - 选择具有相同父亲的兄弟元素
    - 语法:~

## 2.6 属性选择器


- `[属性名]` 选择含有指定属性的元素
- `[属性名=属性值]` 选择含有指定属性和属性值的元素
- `[属性名^=属性值]` 以属性值开头的元素
- `[属性名$=属性值]` 以属性值结尾的元素
- `[属性名*=属性值]` 以属性值含有某值的元素

```css
p[title=abc]{
    color:orange;
}

p[title^=abc]{
    background-color: red;
}
```

## 2.7 伪类选择器
伪类：不存在的元素，特殊的类

- 伪类用来描述一个元素的特殊形态，比如第一个子元素，被点击的元素，鼠标移入的元素
- 伪类一般情况下是使用:开头 
    - :first-child 第一个元素(不是说同类的第一个子元素，是所有子元素的子元素)
    - :last-child 最后一个子元素
    - :nth-child() 选中第n个子元素
        - 如果直接写n，相当于是0-INF
        - 如果直接写2n，相当于是所有偶数元素
        - 如果直接写2n+1，相当于是所有奇数元素(有3)
        - odd/even

- 加type的child
    - :first-of-type
    - :last-of-type
    - :nth-of-type

- not是否定伪类
    - 将符合条件的元素从选择器去除


## 2.8 `a`元素的伪类选择器

- `a:link{...}`:正常的链接
- `a:visited{...}`:访问过的链接，**出于用户隐私考虑，visited只能改颜色**
- `a:active{...}`:鼠标点击
- `a:hover{...}`: 鼠标移入

注意的是伪类一定要按照以上顺序写:`link`,`visited`,`active`,`hover`(LoVe A Ha)

## 2.9 伪元素选择器

伪元素表示页面中并不真实存在的一些元素(特殊的位置)，使用`::`开头

- ::first-letter
- ::first-line
- ::selection 选中的内容
- ::before
- ::after,**注意**:必须结合content结合使用

## 2.10 样式的继承
我们为一个元素设置的样式也会应用到他的后代元素

继承是发生在祖先与后代之间的

继承的设计师为了开发，利用继承只需写一次就可以让所有的元素都具有该样式

**注意**：并不是所有的样式都可以被继承，比如背景相关的，布局相关的样式都不会被继承

## 2.11 样式的冲突与优先级问题

当我们用不同的选择器选择相同的元素，并且为相同的样式设置不同的值，此时发生了样式的冲突

发生样式冲突的时候，显示的效果是由显示的优先级决定的

|选择器的权重|         优先级|
|--|--|
|内联样式      |  1,0,0,0|
|ID选择器     |   0,1,0,0|
|类和伪类选择器   |0,0,1,0|
|元素选择器     | 0,0,0,1|
|通配选择器     | 0,0,0,0|
|继承的样式     | 没有优先级|

- 比较优先级的时候要把所有的**求和**计算，最后优先级高的优先显示，分组选择器单独计算

- 选择器累加不会超过下一级的，也就是不进位，如果优先级计算后相同优先使用考下的样式

- 在属性结束后加上 !important; 会获取最高优先级，慎用！！

## 2.12 长度单位
- 像素
    - 显示器实际上是由一个一个发光的小点构成的
    - 不同屏幕像素大小不同
    - 所以同样的200像素在不同的设备下显示效果不一样
- 百分比
    - 相对于父元素的百分比
    - 使得子元素随着父元素改变而改变
- em
    - 随着字体大小的改变而改变
    - 1个em是一个字的大小，字的大小可以在div内部修改，即字体大小是自身的字体大小
- rem
    - 1个rem是相对根元素的字体大小而变化
    - 经常用于移动端开发

## 2.13 颜色单位

在css中可以直接使用颜色名来配置各种颜色，但是直接使用颜色名来命名是非常不方便的

- RGB值
    - RGB是通过不同的颜色浓度调配处不同的颜色
    - 每一种颜色是在0-255或者0-100%
    - 语法: RGB(xx,xx,xx)
    
- RGBA值
    - 在RGB基础上多了个透明度值A
    - 范围0-1,1是完全不透明
    - 语法: RGBA(xx,xx,xx,xx)

- 16进制的RGB
    - 语法#RGB
    - 颜色浓度00-ff
    - 如果两位两位重复，例如#AABBCC可以写成#ABC

- HSL和HSLA值
    - 在工业设计使用多
    - H色相(0-360)
    - S饱和度(浓度0-100)
    - L亮度(亮度0-100)

# 3. 文档流与盒子模型

## 3.1 文档流
- 我们认为网页是一个多层结构，是一层一层的
- 可以通过css为每一次设置样式
- 用户只能看到最上面的一层
- 我们称最下面的一层叫文档流，文档流是网页的基础
    我们创建的元素默认是在文档流中进行排列
- 对于我们来说元素主要有两种状态
    - 在文档流中
    - 不在文档流中
- 元素在文档流中的特点：
    - 块元素
        -在页面中会独占一行
        - 默认宽度是占满父元素
        - 默认高度是被子元素撑开
    - 行内元素
        - 不会独占页面的一行，值占自身大小
        - 自左向右排列
        - 和书写习惯一致
        - 行内元素默认的高度和宽度都是被内容撑开

## 3.2 盒子模型基础

- CSS将页面全部元素设置为了一个矩形的盒子
- 将元素设置为矩形的盒子之后，对网页的布局就变成了对不同盒子放在不同的位置
- 每一个盒子都有以下几个部分
    - 内容区(content)
    - 内边距(padding)
    - 边框(border)
    - 外边距(margin)

内容区的设置，大小和高度默认设置的是内容区属性  
边框属于盒子的边缘，我们需要设置至少三个样式

- border-width
- border-color
- border-style

边框的大小会影响到盒子的大小

- border-width: 10px;
- border-color: red;
- border-style: solid;

## 3.3 盒子的边框

指定四个方向边框粗细，不写默认是3px，写四个值就是上右下左三个值的时候，默认第四个值同第二个，两个的时候上下同，左右同

写下如下在吗
```html
border-color: red yellow green aliceblue; 
```
可以看到边界是梯形而不是矩形，这是因为如果某部分被两个边框重合，那么中间切开，但是如果你只写了`border-left-style`就不会出现这个情况

- border-style属性:
  - solid 实线
  - dashed 虚线
  - double 双线
  - 默认值是none

还有一个属性是border-XXX-YYY其中XXX取top,left...YYY取color,width...

border的简写属性，没有相对顺序,不能设置多项

## 3.4 盒子的内边距
  - 内容区的边框时间的距离
  - 一共有四个内边距
  - 内边距设置会影响盒子的大小
  - 背景颜色会延伸到内边距上
  - 盒子大小由内容区，边框，内边距共同决定

## 3.5 外边距
  - 外边距不影响可见框的大小
  - 外边距会影响盒子的位置
  - 一共有四个外边距
  - 元素会尽量的自左向右顺序排列，在默认情况下如果我们设置左上的边距会影响自己，右下会影响别人
  - 也可以设置负值，但是元素会向左上移动
  - mergin不会影响元素的可见框的大小，但是会影响盒子的实际大小

## 3.6 盒子的水平布局(重要)
元素在父元素的位置由以下属性决定

- margin-left
- border-left
- padding-left
- width
- padding-right
- border-right
- margin-right
          

一个元素在他的父元素中  
子**元素的margin-left+border-left+padding-left+width+padding-right+border-right=父元素宽度(必须满足)**

等式不成立的时候，我们称他为**过度约束**，这个时候我们会**自动调整**

  - 如果7个值中没有auto会先调整margin-right
  - 这7个值中有三个可以设置为auto
      - width (默认是auto)
      - margin-left
      - margin-right
  - 如果某一个值为auto就会先自动调整那个值
  - 如果一个宽度和一个外边距是auto，那么宽度会调整到最大
  - 如果三个都是auto，那么宽度会是最大
  - 如果外边距都是auto，那么两个auto会赋相同的值(常用这个特点实现水平居中)

## 3.7 盒子模型垂直方向布局

**盒子的高度默认的父元素高度被子元素撑开**

子元素在内容区中排列

  - 如果子元素的大小超过父元素则子元素会从父元素中溢出
  - 使用overflow属性来设置父元素如何处理溢出的子元素

可选值：

  - visible：(默认值)子元素从父元素中溢出，在父元素的外部显示
  - hidden:溢出的元素将会被裁减而不显示
  - scroll:生成两个滚动条，通过两个滚动条实现浏览
  - auto：根据需要生成两个滚动条

## 3.8 外边距折叠问题

相邻的垂直方向的外边距会发生折叠现象

  - 相邻元素垂直外边距之间会发生重叠
  - 兄弟元素
      - 兄弟元素之间相邻垂直外边距会取较大值
      - 特殊情况
          - 如果两个一正一负取和
          - 如果两个都是负数取绝对值较大的

  - 父子元素
      - 父子元素之间的外边距子元素会传递给父元素
      - 父子外边距折叠会对页面造成影响

## 3.9 行内元素的盒子模型

- width,height不支持设置宽度和高度
- 行内元素可以padding但是垂直方向不会影响布局
- 行内元素可以boarder但是垂直方向不会影响布局
- 行内元素不折叠，只相加
- display 用来设置元素显示的类型，其可选值有
    - inline 设置为行内元素
    - blockn 行内转换块元素
    - inline-block 既可以设置宽度又不会独占一行,类似于替换元素
    - table 表格
    - none 隐藏，啥都没了
    - visibility: hidden; 隐藏了，但是占据位置

## 3.10 默认样式(重置样式表)

重置样式表有两个

- `reset.css` 去除了所有的css样式
- `normalize.css` 是将css样式进行了统一但不去除


```html
<link rel="stylesheet" href="./css/reset.css">
<link rel="stylesheet" href="./css/normalize.css">
```

## 3.11 盒子尺寸的计算方式

默认情况下盒子的可见框大小是由内容区，内边距，边框共同确定的

box-size 可以设置盒子的计算方式，设置width，height的作用域，可选值：

- content-box 默认值，使用宽度高度设置内容区的大小
- border-box 宽和高用来设定整个盒子可见区的大小

## 3.12 盒子的轮廓和圆角

outline 用来设置元素的轮廓线，用法和boarder一样，但是轮廓不影响可见框的大小

boxs-shadow用来设置元素的阴影效果，不影响页面布局

  - 两个参数是阴影的右偏移量 影印的下偏移量
  - 第三个是影印的模糊半径
  - 第四个是影印的颜色

# 4. 浮动布局
## 4.1 浮动简介

通过浮动可以使一个元素向其父元素的左侧或者右侧移动，使用float属性设置元素的浮动
    
可选值：

  - none 默认值元素不浮动
  - left 向左浮动
  - right 向右浮动

元素设置浮动之后元素的水平布局等式**不需要强制成立**

- 元素设置浮动以后会完全从文档流脱离
- 元素下面还在文档流中的元素会向上一定
  

浮动可以让元素横向排列 

  1. 浮动元素会完全脱离文档流不占位置
  2. 设置浮动以后元素会向父元素的左侧或者右侧移动
  3. 浮动元素不会从父元素中移出
  4. 浮动元素向左右移动不会超过前面的元素
  5. 如果浮动元素上面是没有浮动的块元素则浮动无法上移
  6. 浮动元素不会超过他上面的兄弟元素最多最多一样高

浮动的主要作用是让元素水平排列，通过浮动可以制作水平方向上的布局

## 4.2 浮动的特点

浮动不会盖住文字，文字会自动环绕在浮动元素周围

元素从文档流脱离之后会发生变换

- 块元素
    1. 块元素不在独占一行
    2. 脱离文档流以后宽度和高度被内容撑开
- 行内元素
    1. 行内元素脱离文档流之后会变成块元素，长宽默认被内容撑开，但是可以设置
        也就是不区分行内和块了


## 4.3 高度塌陷问题

**BFC块级格式化环境**

 - BFC是CSS中的一个隐藏的属性，可以为一个元素开启BFC，开启BFC元素会变成一个独立的布局区域
 - 元素开启BFC之后的特点：
     1. 开启BFC的元素不会被浮动元素所覆盖
     2. 开启BFC元素子元素和父元素的外边距不会重叠
     3. 开启BFC可以包含浮动的子元素
 - 可以通过特殊方式开启BFC
     1. 设置元素浮动(不推荐)
     2. 将元素设置为行内块元素(不推荐)
     3. overflow 这只非visible一般设置auto或者hidden

**高度塌陷问题**：

在浮动布局中，父元素的高度默认被子元素撑开的子元素浮动以后会完全脱离文档流，子元素从文档流脱离将无法撑起父元素的高度，导致父元素高度丢失

父元素丢失以后，其下的元素会自动上移，导致页面布局混乱所以高度塌陷是浮动布局较常见的一个问题我们必须处理

## 4.4 BFC最优解决方案
直接引入clearfix类
```css
.clearfix::before,
.clearfix::after{
    content: "";
    display: table;
    clear: both;
}
```
```html
<div class="box1 clearfix">
    <div class="box2"></div>
</div>
```

原理比较简单，首先设置一个前后属性，里面填充一个空内容，但是如果是内联的话就不会显示，我们必须设置为非内联，为了解决外边距重叠问题，设置为`table`,最后为了解决BFC所以设置`clear:both`

# 5 定位

## 5.1 定位的简介

- 定位是一种更加高级的布局手段
- 通过定位我们可以将元素摆放到页面的任何地方
- 使用position设置定位, 可选值
    - static 静止的，默认值，不开启定位
    - relatove 开启元素相对定位
    - absolute 开启元素绝对定位
    - fixed 开启 元素的固定定位
    - sticky 开启 元素的粘滞定位

- 相对定位：
    - 当元素的position时则开启了元素的相对定位
    - 相对定位的特点
        1. 元素开启相对定位以后如果不设置偏移量不会发生任何变化
- 偏移量(off-set)
    - 当元素开启了定位之后可以通过偏移量设置元素的位置
        top
        bottum
        left
        right
        通常情况下我们四选二即可实现定位

## 5.2 绝对定位
- 当元素的position设置为abslute的时候开启了绝对定位
- 开启绝对定位之后不设置偏移量位置不会发生变化
- 开启绝对定位之后会从文档流脱离
- 绝对定位会改变元素的性质-> 行内变快，块的大小被内容撑开
- 绝对定位会提升元素层级\
- 绝对定位元素是相对于包含块进行定位的
  

包含块：

  - 正常情况下：
      包含块是当前元素最近的祖先元素**块元素**
      
      <div><div></div></div>
  - 绝对定位的包含块
      绝对定位的包含块就是离他最近的祖先元素
      所有的祖先元素都没有开启定位就相对于根元素

`html`是根元素，也是初始包含块

于是有了一种对于确定大小的盒子的居中方式
```css
width: 100px;
height: 100px;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
```

## 5.3 固定定位
将元素的posituin设置为fixed

- 固定定位可以认为是一种特别的绝对定位
- 文档流脱离
- 改位置不动
- 内联变快，快内容撑开
- 唯一不同的是他们的参考系一定是视口

## 5.4 粘滞定位
  - 当元素的position属性设置为sticky则开启了元素的粘滞定位
  - 粘滞定位和相对定位的特点基本一致，不同的是粘滞定位可以在元素达到某个位置时将其固定

## 5.5 水平垂直布局
包含块的宽度=$\Sigma$ 7+绝对定位的left right

当发生过度约束的时候

  - 如果9个值没有auto就调整right
  - 如果有auto就调整auto
  - left right的默认值是auto，所以如果不知道left right 而且等式不成立，那么自动调整这两个值

垂直布局

- **top+margin*2+padding*2+height+buttom=h**

## 5.6 元素的垂直层级

对于开启了定位的元素，可以使用z-index指定元素的层级

  - z-index需要一个整数作为参数,越大越优先显示
  - 元素层级如果一样优先显示后面的
  - 层级可以设置负数，但是别用
  - 祖先元素的层级再高也不会盖住后代元素

# 6 表格与表单
## 6.1 表格

在现实生活中，我们经常需要使用表格表示格式化数据，课程表，名单，成绩单，在网页中我们也需要设置表格，通过使用table创建表格

```html
<table border="1">
    <!-- 在table中使用tr表示一行,有几个tr就表示几行 -->
    <tr>
        <!-- 在tr中使用td表示一个单元格,有几个td就是有几个单元格 -->
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>
    <tr>
        <td>1</td>
        <td colspan="2">2</td>
        <!-- 他会只占自己大小不合并单元格，除非指定 -->
    </tr>
</table>
```

## 6.2 长表格
可以将一个表格分为三部分

  - 表头 thead
  - 主体 tbody
  - 底部 tfoot
  - th 表格头部单元格

## 6.3 表格的样式
- 边框之间的间距
```css
border-spacing: 0px;
```
- 边框合并
```css
border-collapse: collapse;
```

**如果不使用tbody直接使用tr，浏览器会自动创建一个tbody然后把所有tr放到里面，所以tr不是table子元素，这就导致子元素选择器无法选择**

- 将元素设置为单元格
```css
display: table-cell;
vertical-align: middle;
```

## 6.4 表单

- 现实生活中用于提交数据
- 网页中的表单用于将本地数据提交远程的服务器
- 使用form标签创建表单

实例

```html
<form action="./target.html">
    <!-- 添加表单项 -->
    <!-- 文本框
        注意
            数据要提交的服务器中必须要指定一个name
    -->
    文本框<input type="text" name="username">
    密码框<input type="password" name="pw">

    <br>
    单选按钮
    <!--必须有一个相同的name属性，否则不知道哪两个选项是一组的 -->
        <input type="radio" name="hrll" value="a">
        <input type="radio" name="hrll" value="b" checked>

    <br>
        <input type="checkbox" name="tt" value="1" checked>
        <input type="checkbox" name="tt" value="2" checked>
        <input type="checkbox" name="tt" value="3">

    <br>

    下拉列表
    <select name="aa">
        <option value="i">选项一</option>
        <option selected value="ii">选项二</option>
        <option value="iii">选项三</option>
    </select>

    <!-- 提交按钮 -->
    <input type="submit" value="注册">
</form>
```

## 6.5 表单的属性
- action 表单提交的地址
```html
<!-- 关闭自动填充 -->
<form action="./target.html" autocomplete="on">
    
    <input type="text" name="username" value="hello">

    <br><br>

    <input type="color">
    <!-- 自动获取焦点 -->
    <input type="email" autofocus>
    <input type="submit">

    <!-- 将表单设置为只读 数据提交 -->
    <input type="text" value="fasd" readonly>
    <!-- 将表单设置为禁用 数据不提交 -->
    <input type="text" value="fasd" disabled>

    <br>
    
    <input type="reset">

    <br>
    
    <input type="button" value="按钮">
</form>
```

# 7 动画与过渡
## 7.1过渡   
  - 通过过渡指定一个属性发生变化时候的切换方式
  - 通过过渡效果可以创建一些非常好的效果提升用户体验

过渡的简写属性是transition，还有很多属性

  1. transition-property 指定要执行要被过渡的属性,多个属性之间’,‘隔开，所有属性都要过渡写all大部分属性都支持过渡效果，只要他的值是数值，可以计算的可以过渡注意过渡时必须是一个有效数值向另外一个过渡，例如auto就不是
```css
transition-property: width;
```
  2. transition-duration 指定过渡效果的持续时间，时间可以分别指定
```css
transition-duration: 1s
```
  3. transition-timing-function 过渡的时序函数，即过渡的执行方式，可选值：
      - ease 默认值 开始慢先加速后减速
      - linear 匀速直线
      - ease-in 加速运动
      - ease-out 减速运动
      - ease-in-out 先加速后减速      
        速度实际上都是通过贝塞尔曲线指定的
        ```css
            transition-timing-function: cubic-bezier(0,0,1,1);
        ```
        四个值分别是贝塞尔曲线两个点的坐标
     - 还可使用step 分步实现，transition-timing-function: steps(3);，后面加end/start 表示是在这一阶段的开始还是结束执行
  4. transition-delay 等待一定的时间之后开始


以上可以直接用transition，唯一的顺序要求是需要同时写持续和延迟，先持续后延迟

## 7.2 动画

动画与过渡类似都可以实现动态的效果，不同的是过渡需要在某个属性发生变化的时候才会触发，**动画是可以自动触发的效果**

设置动画效果必须先设置一个**关键帧**，关键帧设置了一个动画执行的每一个步骤

动画的属性设置全部是**animation**开头的:

  - animation-name: 要对当前元素生效的关键帧的名字
  - animation-duration: 动画的持续时间
  - animation-timing-function :动画显示形式
  - animation-delay :动画的延时
  - animation-iteration-count: 动画迭代次数可以指定次数""无限执行infinite"
  - animation-direction: 动画执行的方向
      - normal 默认值 from到to运行每次都是这样
      - reverse 反向
      - alternate 当运行重复执行动画的时候偶数次反向执行
  - animation-fill-mode: 动画执行结束的位置
      正常情况下动画执行完毕之后并不会回到from的位置而是回到非动画的css样式
      - none 默认值 动画执行完毕之后回到原来的位置
      - forwards 动画执行完毕弧就地停下
      - backwords 在动画开始的等待期间元素就处于from关键帧状态否则不提前进入关键帧
      - both：结合了forwards和backwords
  - animation-play-state: 动画的执行状态
      - running 默认值 运行
      - paused 动画暂停

以上全部使用animation一个实现，所以直接用且无顺序只要保证延时在后面写

实例
```CSS
/* 动画的调用 */
.box1 .box2{
    transition: all 2s;
    transition-timing-function: ease-out;
    animation: test 2s;
    animation-iteration-count: 4;
    animation-direction: alternate;
}
/* 动画的实现 */
@keyframes test {
    /* 指定动画的开始位置 from也可以写作0%*/
    from{
        margin-left: 0px;
    }

    33.5%{
        margin-left: 10px;
    }

    /* 指定动画的结束位置 to也可以写作100%*/
    to{
        margin-left: 7000px;
    }
}
```

## 7.3 变形
变形就是指通过CSS来改变元素的形状或者位置

  - 变形不会影响到元素的页面布局
  - transform 用来设置元素的变形效果
      - 平移
          - translateX() 沿着X轴平移
          - translateY() 沿着Y轴平移
          - translateZ() 沿着Z轴平移
          - **平移元素的百分比是相对于自身运算的**
        ```CSS
        transform: translateX(-100px);
        transform: translateX(50%);
        ```
      - 旋转：通过旋转可以是元素围绕xyz旋转指定角度
          - transform: rotateX();
          - transform: rotateY();
          - transform: rotateZ();
          - backface-visibility: hidden; 是否显示元素的背面
        ```css
            transform: rotateZ(720deg);
            transform: rotateX(.5turn);
            transform: rotateY(.5turn);
            transform: rotateX(.5turn) rotateY(.5turn) rotateZ(.5turn); */
            transform: rotateY(45deg) rotateZ(50deg);
            /* 要把transform写在一起，但是有先后优先级 */
            transform: rotateY(180deg) translateZ(400px);   /*Y轴是位置不变的*/
            transform: translateZ(400px) rotateY(180deg);   /*Y轴是变化位置的*/
        ```
      - 缩放
          - scaleX()
          - scaleY()
          - 还有z轴缩放，但是没有用，原因是scale的原理是将坐标轴拉长，不是直接放大图片
          - scale()同时缩放
      - 特殊的Z轴平移
            
        Z轴平移就是在调整元素在Z轴的位置，正常情况下是调整元素和人眼之间的距离，距离越大元素离人越近
        
        Z轴的平移属于立体效果(近大远小)默认情况下我们的网页时不支持透视的如果需要看到效果，必须设置网页的视距，设置方法为在html下写下(一般800-1200均可)
        ```css
        perspective: 800px;
        ```

# 8 弹性容器与移动端

## 8.1 弹性盒/伸缩盒子
  - 是css的另一种布局手段，主要用来代替浮动完成页面的布局
  - 如果你不需要兼容老浏览器就用flex要是需要兼容PC就用float
  - 伸缩盒可以使元素更有弹性，让元素可以跟随页面的大小而改变
  - 弹性容器
      - 要使用弹性盒子必须先将元素设置为弹性容器
      - 通过display设置弹性容器
          display:flex            设置为块级元素的弹性盒子
          display:inline-flex     设置为行内块元素的弹性盒子
      
  - 弹性元素
      - 弹性容器的子元素是弹性元素(弹性项目)
      - 只有弹性容器的直接子元素蚕食元素，后代元素不是
      - 一个元素既可以是弹性容器也可以弹性元素

  - 弹性容器的属性
    - flex-direction 用于指定弹性元素的排列方式，可选值有
        - row (默认值),弹性元素在容器中水平排列，这个row是按书写顺序排列，中国是左到右他就是左到右
        - row-reversw 反向水平排列
        - column 弹性元素纵向排列 (自上向下)

    - 主轴
        - 弹性元素的排列方向称为主轴,例如row的时候主轴值自左向右...
    - 侧轴
        - 与主轴垂直方向的称为侧轴 一般不说具体的方向只说水平还是垂直

  - 弹性元素的属性 
      - flex-grow 指定元素伸展的系数
          - 当父元素有多余的空间的时候子元素如何伸展
          - 父元素的剩余空间按比例分配

      - flex-shrink 指定元素的收缩系数
          - 当父元素中的空间不足以容纳所有的子元素时如何对子元素进行收缩
          - 默认值是1 等比例收缩
          - 0是不收缩
          - 值越大收缩越多

## 8.2 弹性容器的使用

设置弹性元素是否在弹性容器中自动换行 

  - nowrap 元素不自动换行
  - wrap 元素自动换行
  - wrap-reverse 元素沿着辅轴反方向换行

flex-flow wrap和direction 的简写属性

justify-content 如何分配主轴上的空白空间 主轴上的元素如何排列，可选值

- flex-start 沿着主轴起边排列 主轴较大值处空白
- flex-end 元素沿着主轴终边排列
- center 元素居中排列 空白分布到两边
- space-around 空白分布到每一个元素的两侧 但是起始两个的左右是小一半
- space-evenly 空白分布到元素单侧 所有的空隙全相等 (唯独这一个兼容性的不好)
- space-between 空白分布元素之间，起始终止的左右没有

**align 开头的是设置辅轴上的样式 **

alihn-items 是设置元素在辅轴上如何对齐

  - 他设置的是**元素间**的关系
  - stretch (默认值)将元素之间长度设置为相同值 这个行指的是与本行元素高度均相同，其他行不管
  - flex-start 元素不会拉伸沿着辅轴起边对齐
  - flex-end 辅轴终边对齐
  - center 居中对齐
  - baseline 基线对齐

align-content 辅轴上的空白空间对齐方式，同justify-content

align-self 用来覆盖覆盖元素的align-items，相当于单独修改

## 8.3 弹性元素的样式

弹性元素的增长系数`flex-grow`是分配是在宽度的基础上加上按比例分配的空白的空间

弹性元素的缩减系数`flex-shrink`

  - 缩减系数的计算方式比较复杂
  - 缩减多少是根据缩减系数和元素的大小来计算的

计算元素`flex-basis`在主轴上的基础长度的时候就忽略了width，

  - 默认值是auto即参考元素自身的width
  - 如果传递了一个具体的数字即以该值为准

**可以理解为弹簧的三种状态**  

  - flex-basic就是弹簧自然状态
  - flex-grow 弹簧拉伸
  - flex-shrink 弹簧压缩
  - 他们有一个通用属性 flex: grow shrink basic
      - flex有一个默认值 initial 相当于 flex:0 1 auto
      - flex有一个 auto 相当于 flex:1 1 auto
      - flex有一个 none 相当于 flex:0 0 auto  相当于弹性元素没有弹性

order 决定弹性元素的排列顺序

## 8.4 像素与视口
像素

  - 屏幕是由一个一个发光的小点构成的，这一个一个发光的小点就是一个一个像素
  - 分辨率：1920*1080 说的就是屏幕中小点的数量
  - 像素在前端开发中分成两种情况：CSS像素和物理像素
  - 物理像素：上述所说的小点点就是物理像素
  - CSS像素：在编写网页的时候我们所用的像素就是css像素
      - 浏览器在现实网页的时候需要把css像素转化为物理像素，然后再呈现
      - 一个css像素最终由几个物理像素现实由浏览器决定，默认情况下PC端1个css像素就是1个物理像素

视口(viewport)

  - 视口就是屏幕中用来显示网页的区域
  - 可以通过查看视口的大小来观察css像素和物理像素的比值
  - 默认情况下视口的宽度就是html标签的宽度
  - 浏览器放大两倍之后
      - 视口宽度 960px
      物理像素   1920px
  - 我们可以通过改变视口的大小改变比值

## 8.5 移动端介绍

在不同屏幕，单位像素的大小是不同的，像素越小，屏幕会越清晰

    https://material.io/resources/devices/

智能手机的像素要远远小于计算机显示器的像素点，默认情况下移动端的网页都会被设置为980px(CSS像素)以确保PC端网页可以在移动端正常访问，但是如果网页的宽度超过980，移动端浏览器会自动对网页缩放以完整显示网页

所以基本上大部分PC端网站可以在移动端正常浏览器，但往往没有好的体验，为了解决这个问题大部分网站会专门为移动端设计网页

移动端默认的视口大小是980px(css像素)，默认情况下移动端的像素比是 980/移动端像素宽度，如果我们直接在网页端编写移动端代码，这样在980视口下我们的像素比是非常不友好的，导致网页中的内容非常非常小，编写移动端页面的时候必须要确保一个比较合理的像素比
        $$1CSS=2物理px$$

- 我们可以改变视口的大小实现适配

- 可以通过meta设置视口的大小

- 每一款移动设备都会有最佳的像素比

    - 一般我们只要将像素比设置为该值就可以得到最佳像素比
    - 视口将像素比设置为最佳像素比的视口大小成为完美视口

记住：
```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 8.6 视口
不同的设备完美视口的大小是不一样的 

  - iPhone6 -- 375
  - iPhone6Plus --414

由于不同设备的视口和像素比不同，所以同样的375px在不同设备意义下是不一样的，例如在iPhone6中375是全屏的，但是在plus中375就会缺一个角，所以在移动端开发的时候就不能使用px来布局了，当然转而使用%就可以了，但是不能这样，应为网页复杂之后没法写了 

## 8.7 vm适配

vw是一个css的新单位，表示视口单位(viewport width)

  - 100vw就是一个视口的宽度
  - 1vw就是1%视口宽度

  vw这个单位永远是相对于视口宽度进行计算，但是他在PC端适配并不好(移动端可以的)

当设计图的宽度为750px创建一个 48*35 的元素

- 100vw   = 750px
- 6.4vw   = 48px
- 4.667vw = 35px

但是这样实现涉及到计算，十分麻烦，可以使用rm进行适配

## 8.8 响应式布局

  - 网页课可以根据不同的设备窗口大小呈现不同的效果
  - 使用响应式布局可以使一个网页适用于所有设备
  - 响应式布局的关键是媒体查询
  - 通过媒体查询可以为不同的设备或者不同的状态分别设置样式(屏幕 打印 屏幕阅读器)


例如：
```css
@media all {
    body{
        background-color: #bfa;
    }
}
@media print{
    body{
        background-color: orange;
    }
}
/* 可以使用,表示并*/
@media speech,media {
    body{
        background-color: blue;
    }
}
```

在媒体类型前添加only 表示只有,only的使用时为了兼容老浏览器

## 8.9 媒体特性 

- width 视口的宽度
- height 视口的高度
- min-width 视口的最小宽度 只要大于500就生效
- max-width 视口的最大宽度

样式切换的分界点我们也称为断点，也就是网页在这个时候发生变化

- 小于 768 超小屏幕 max-width:768
- 大于 768 小屏幕 min-width:768
- 大于 992 中屏幕 min-width: 992
- 大于 1200 大屏幕 min-width: 1200

# 9 字体,图标字体与渐变

## 9.1 字体
字体相关的样式

  - color 用来设置字体颜色的
  - font-size 字体的大小，和font相关的单位  
      - em 相当于当前元素的一个font-size
      - rem 相当于根元素的一个font-size
  - font-family 字体族(字体)
    - 可选值1：字体
    - 可选值2：
        - serif 衬线字体
        - sans-serif 非衬线字体
        - monospace 等宽字体
        - 注意：以上并不是字体，而是字体的分类，如果写了这三个只是告诉浏览器要用这类字体，具体用哪个浏览器自行决定
    - 我们往往可以指定很多值，用,隔开，字体名称有空格分号的要用''包起来

`@font-face` 可以将服务器中的字体直接提供给用户去使用，但是存在问题问题：
  1. 加载速度
  2. 版权

## 8.2 图标字体

在网页中经常使用到一些图标可以通过图片引入图标但是图片本身比较大，但是非常不灵活

  - 所以还可以将图标直接设定字体，然后通过fontface引入
  - 这样就可以通过使用字体图标的形式来使用图标

fontawsome 使用规范

1. 官网下载
2. 解压
3. 将css和webfonts移到目录
4. 将all.css引入网页
5. 使用图标字体
6. 直接通过类名来使用图标字体

使用示例
```html
<!-- 1. -->
li::before{
    content: "\f1b0";
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;           /*fab需要单独设置*/
    color: blue;
    margin-right: 10px;     
}

<!-- 2. -->
<span class="fas">&#xf0f3;</span>

<!-- 3. -->
<i class="fas fa-cat"></i>
```

## 8.3 字体的属性

font: 可以设置字体相关的所有属性

写法一：先写字号在写字体
```css
font: 50px Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
```
写法二：字号/行高在写字体
```css
font: 50px/5 Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
```
省略不是不写是用了默认值

font-weight: 字重

- normal 不加粗
- bold 加测
- 100-900 表示9个加粗的级别,虽然提供了9个级别，但是没什么用,因为电脑上不可能安装这么多字重字体

## 8.4 文本样式

text-align 文本水平对齐

  - left默认值
  - right 右对齐
  - center 居中对齐
  - justify 两端对齐

vertical-align 垂直 对齐 

  - baseline 基线对齐 默认
  - top 顶部对齐，父子顶部对齐
  - bottom 底部对齐
  - middle 居中对齐 一般不用
  - 指定数值调整位置

text-decoration 设置文本修饰

  - none 默认值 什么也没有
  - underline 下划线
  - overline 上划线 
  - linethrough 穿过的线
    后面还可以加颜色，给线改色 但是IE不支持

## 8.5 背景

- background-color 设置背景颜色
- background-image 设置背景图片
    - 可以同时设置背景图片的颜色，这样背景颜色将会成为图片的背景
    - 如果背景图片小于元素，则背景图片会在元素中平铺将元素铺满
    - 如果背景图片大于元素 将会有一部分图片无法显示
    - 如果两者一样大则会正常显示
- background-repeat
    - repeat 默认值，背景会沿着xy轴双方向重复
    - repeat-x 沿着x轴方向重复
    - repeat-y 沿着y轴方向重复
    - no-repeat 不重复
- background-position 用来这只背景图片的位置
    - 通过left...设置图片的位置 例如background-position: left center,使用方位词的时要写两个，如果写一个的话，默认第二个是center
    - 通过偏移量指定图片的位置 水平和垂直
- background-clip 
    - border-box 默认值 背景会出现边框下面
    - padding-box 背景不会出现在边框只出现在内容区和内边距
    - content-box 背景只出现在内容区
- background-origin 背景图片偏移量计算原点
    - padding-box 默认值 background-position 从内边距开始计算
    - content-box background-position 从内容区开始计算
    - border-box  background-position 从边框开始计算
- background-size 设置背景图片的大小
    - 第一个值表示宽度
    - 第二个值表示高度
    - 如果指定一个值，另一个值就是auto，等比例缩放
    - cover 比例不变，将元素铺满
    - content 比例不变 图片完整显示
- background-attachment 背景图片是否跟随元素滚动
    - scroll 背景图片跟随元素移动
    - fixed 背景图片会固定在页面中

background 所有上述相关属性都可以设置 没顺序 但是origin在clip前面,background-size和background-positiom顺序为size/position 没有size不能写position

## 8.6 渐变
通过设置渐变可以实现很多复杂的背景颜色可以从一个颜色向另一个颜色变化

**渐变是图片，通过background-image设置**

**线性渐变**，颜色沿着直线变化
```css
background-image: linear-gradient(red,yellow);
```
红色在开头，黄色在结尾
```css
background-image: linear-gradient(to right,red,yellow);
```
前面加to指定渐变的方向
```css
background-image: linear-gradient(45deg,red,yellow);
```
直接指定旋转度数 例如 25deg 0.2turn(0.25圈)

渐变可以指定多种颜色，每种颜色默认情况下平均分配
```css
background-image: linear-gradient(45deg,red 50px,yellow,#bfa,orange);
```
表示红色是c从50px开始，之前的就是纯红色

**径向渐变**: radial-gradient
    默认情况下径向渐变的形状是根据元素形状变化的

- 正方形->圆
- 长方形->椭圆形
- 可以手动指定圆心的大小与位置
```css
    background-image: radial-gradient(100px 100px,red,yellow);
    background-image: radial-gradient(100px 100px at 0 0,red,yellow);
```
- 可以这只重复
```css
background-image: repeating-radial-gradient(100px 100px,red,yellow);
```
