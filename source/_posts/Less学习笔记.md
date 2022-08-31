---
title: Less学习笔记
date: 2020-10-31 00:00:18
toc: true
description: Less是一种动态样式语言，属于css预处理器的范畴，他扩展了CSS语言，增加了变量、mixin、函数的等特性，使css更易于维护和扩展 Less既可以在客户端运行，也可以借助Node.js在服务端运行.主讲:尚硅谷,视频来自B站:BV1YW411T7vd
categories:
  - [前端,CSS]
tags:
  - 前端
  - CSS
  - CSS预处理器
  - Less
  - 笔记
---

Less是一种动态样式语言，属于css预处理器的范畴，他扩展了CSS语言，增加了变量、mixin、函数的等特性，使css更易于维护和扩展  
Less既可以在客户端运行，也可以借助Node.js在服务端运行

## 1. Less的引入

Less官网提供了服务器端的部署方法，我们不需要，因为 1. 这相当于是再服务器端编译，影响运行 2. 我们用本地环境所以只需要一个编译工具把less编译成css

可以去less官网下载less.js，这相当于是用js文件对代码进行编译，所以，js的link要写在less代码后面，但是很明显这样的编译是再运行时编译，影响时间。实际上可以使用IDE插件实时编译，这相当于是开发的时候编译，不影响时间

## 2. Less基础

### Less中的注释

以`//`开头的是单行注释,这种注释在css中没有，所以不会被编译到CSS中

以`/**/`包围的是多行注释，和CSS语法一样，会被编译到CSS中

### Less中的变量

定义变量用`@`开头，例如

```less
@Col:pink;
div{
    background-color:@color;
}
```

以上是将**属性值作为变量**，还可以将**选择器，属性、字符串的一部分作为变量** 但是使用的时候要这么写`@{XXX}`

```less
@Col:pink;
@bgc:background-color;
@sel:div;
@{sel}{
    @{bgc}:@color;
}
```

修改属性值和声明一样

Less中的变量都是延迟加载的，Less中的变量都是块级作用域

例如

```less
@var:0;
div{
    @var:1;
    table{
        @var:2;
        left:@var;
        @var:3;
    }
    right:@var;
}
```

首先变量是**块级作用域**，所以`right`的值是不受`table`内部的修改而影响，为1

然后变量是**延迟加载**的，所以编译器在看到`left:@var;`直接计算替换，而是把一个块跑完得到`@var:3`然后载进行替换的，所以left为3

### Less中的嵌套规则

我们有时需要对变量的某些状态进行设置例如`div:hover` 这个时候根据嵌套的思想，应该写成

```less
div{
    ...
    :hover{
        ...
    }
}
```

但是编译不出来，编译器会认为这里的`:hover`是一个选择器，所以css会显示为

```css
div{
    ...
}

div :hover{
    ...
}
```

多了一个空格导致了编译失败，我们不希望有这个空格，我们不希望他是层级关系，要加上一个`&`

```less
div{
    ...
    &:hover{
        ...
    }
}
```

这样空格就会消失，这里的`&`代表平级

## 3. Less中的混合

当我想为同级元素设置相同的样式的时候我们可以用`,`并集选择器直接选择，但是对于不同级的，我们希望可以像引入代码块一样直接插入相关代码从而减少冗余代码，这时就用到了混合。

### 普通混合

Less中定义混合以点开头，和CSS写类一样，调用直接写上去

```less
.cent{
    left:0;
    right:0;
}

div{
    .inner1{
        .cent;
        ...
    }
    .inner2{
        .cent;
        ...
    }
}
```

这里的原理**相当于编译器进行了字符串替换**，并且上文中`.cent`的内容也被原样编译到了CSS中，这时我们不想看到的

解决方法就是把`.cent`改为`.cent()`，这样CSS就不会编译.cent

- 我们称`.cent`的写法为**普通混合**，混合也会被编译到css文件中

### 不带参数混合

- 我们称`.cent()`的写法为**不带参数混合**，混合不会被编译到css文件中

### 带参数的混合

我们希望我们的混合可以提供一个API,例如我们像做一个居中后偏左x个px的一个混合，我们可以这样定义这个混合

```less
.cont-left(@off-set){
    margin:0 auto;
    transform: translateX(-@off-set);
}

div{
    ...
	.cont-left(10px)    
}
```

这样我们调用混合的时候输入10px就会居中，左移10px,看起来有点像函数，但是就是叫做混合

- 我们称`.cont-left(@off-set)`的写法为**带参数的混合**，混合不会被编译

### 带默认参数的混合

带参数的混合接受默认参数

```less
.my_mixin1(@a,@b,@c){
    
}
div{
	my_mixin1();
    my_mixin1(1px);
}
```

如上，两种调用都是非法的，必须是形残和实参数目相同，当然可以设置默认值

```less
.my_mixin1(@a,@b:1px,@c:2px){
    
}
div{
	my_mixin1();
    my_mixin1(5px);
    my_mixin1(5px,6px);
    my_mixin1(5px,6px,7px);
}
```

我们给`@b`与`@c`默认值为1和2,`@a`没给，所以第一个调用非法，第二个把5给了`@a`,第三个`a=5,b=6,c=2`，第四个直接分配，其冲突处理规则与C语言的默认参数处理规则相同,也可以在调用的时候制定赋值给的参数，与C语言相同

- 以上我们称之为**带默认参数的混合**

### 命名参数匹配

```less
.my_mixin1(@a,@b:1px,@c:2px){
    
}
div{
   my_mixin1(@a:5px,@c:6px);
}
```

得到`a=5,b=1,c=2`

- 以上我们称之为**命名参数匹配**

### 匹配模式

我们希望实现同一个功能，但是有略有差别，我们希望传的参数尽可能少。类似于C++中的多态

```less
mixin_com(){
    ...			// sth common
}
mixin(L,@a,@b){
    .mixin_com();
    ...			// sth special
}
mixin(R,@a,@b){
    .mixin_com();
    ...			// sth special
}
div{
    mixin(L,1,1);
    mixin(R,1,1)
}
```

可以继续优化我们的写法，使用同名无匹配模式开头为`@_`可以实现在调用任何一个多态的时候顺便调用他

```less
mixin(@_){
    ...			// sth common
}
mixin(L,@a,@b){
    ...			// sth special
}
mixin(R,@a,@b){
    ...			// sth special
}
div{
    mixin(L,1,1);
    mixin(R,1,1)
}
```

当然，`@_`后面可以加参数，如下代码，我们可以把`@_`理解为占位符

```less
.mixin(S,@h,@w,@c){
    border:solid;
}

.mixin(D,@h,@w,@c){
    border:double;
}

.mixin(@_,@h,@w,@c){
    width: @w;
    height: @h;
    background-color: @c;
    border-width: 20px;
}

div{
    .mixin(D,100px,100px,#bfa)
}
```

### Arguments变量

类似于Python的列表传参,带白哦全体实参列表

```less
.myb(@1,@2,@3){
    border: @arguments;
}

div{
    .myb(1px,solid,red)
}
```



## 4. Less的计算

```less
div{
	width:(100px+100);
}
```

以上计算是可以的，只需要计算双方一方有单位即可

## 5. Less的继承

在写less过程中，如果写成

```less
.mixin(){
    ...
}

div1{
    .mixin();
    ...
}

div2{
    .mixin();
    ...
}
```

编译的结果将会是

```css
div1{
    ... // .mixin()的全文复制下来
    ...
}

div2{
    ... // .mixin()的全文复制下来
    ...
}
```

这样`.mixin`内容被复制了两次，是一种低效的写法，如果编译为如下就更好了

```css
div1,div2{
    ... // .mixin()的全文复制下来
}

div1{
    ...
}

div2{
    ...
}
```

想要实现如上的效果需要将less写成**继承**的形式

```
.mixin(){
    ...
}

div1:extend(.mixin){
    ...
}

div2:extend(.mixin){
    ...
}
```

明显可以看出**继承**的效率比混合高，但是灵活性差，不能传递参数

在编译过程中，内部处理很简单

- 找到相同`extend`的选择器
- 用`,`隔开，写在一起
- 应用extend的样式

更优秀的代码风格应该是

```less
.mixin(){
    ...
}

div1{
    &:extend(.mixin)
    ...
}

div2{
    &:extend(.mixin)
    ...
}
```

但存在问题，如果代码写成如下

```less
.mixin(){
    ...
}

.mixin:hover(){
    ...
}

div1{
    &:extend(.mixin)
    ...
}

div2{
    &:extend(.mixin)
    ...
}
```

两个div是不继承`hover`的属性的，只需加上一个`all`表示全部继承

```less
.mixin(){
    ...
}

.mixin:hover(){
    ...
}

div1{
    &:extend(.mixin all)
    ...
}

div2{
    &:extend(.mixin all)
    ...
}
```

## 5.避免编译

我们如果写下面的Less代码

```less
*{
    margin: 10*100px;
    padding: cacl(10*100px);
}
```

编译之后是

```css
*{
    margin: 1000px;
    padding: cacl(1000px);
}
```

`cacl()`是css的计算函数，但是被less给算了，我们不想让less做，希望编译成如下样式

```less
*{
    margin: 1000px;
    padding: cacl(10*100px);
}
```

也就是让`10*100px`**避免编译**,要求原样输出，只要把需要的部分加上`～""`,也就是

```less
*{
    margin: 10*100px;
    padding: ~"cacl(10*100px)";
}
```







p.s. IE6有一个与BFC类似的模式，一旦出现兼容性问题首先考虑开启他，放法是`overflow:hidden`






















