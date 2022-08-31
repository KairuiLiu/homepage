---
title: jQuery笔记
date: 2020-11-24 21:40:50
toc: true
description: jQuery是JS的一个封装的库函数集,用于DOM的CRUD,以查询见长,同时减少了开发者对于浏览器兼容性与变量作用域的考量,主讲:尚硅谷张晓飞,视频来自B站:BV1ts411E7ag
categories:
  - [前端,JS]
tags:
  - 前端
  - JavaScript
  - jQuery
  - 笔记
---

## 了解jQuery

画页面

- HTML
- CSS

交互(动态效果)

- JS基础(ES,语法)
- JS的DOM与BOM

存在的问题

- DOM的语法太麻烦(尤其是插入元素)

界面的操作: CRUD(增删改查),最难的是查询(文档树纷繁复杂)

jQuery是一个优秀的JS函数库(就是封装了DOM与BOM)是中大型开发的首选(当然现在有了React,Vue)

注意第二个字母是大写的

插件:jQuery是DOM的插件,依赖于jQuery的库是jQuery的插件

特性:

- HTML的元素选取(选择器): jQuery扩展了CSS的选择器
- HTML元素操作
- CSS操作
- HTML事件处理(交互)
- JS动画效果
- 链式调用:支持`a().b().c()...`
- 读写合一: 获取元素属性与修改是用的一个函数
- 浏览器兼容
- 插件多
- ajax封装

## jQuery的基本用法

jQuery的不同版本

- 1.x 兼容老IE,文件大
- 2.x 部分IE8以下不支持,文件小,效率高
- 3.x 完全不支持IE8-,完全支持IE9+,提供新API,有不包含ajax,动画API的版本

打开jQuery的源文件可以看到,整个文件就是一个匿名函数自调用,1.10.1的文件9793行是唯一暴露API的地方,`window.jQuery=window.$=jQuery`只暴露了两个对象,在61行定义了jQuery函数

- 引入jQuery库
  - 测试用没压缩的,上线用压缩的
  - 引用在使用之前
  - 测试的时候: 本地引入
  - 项目上线为了减轻服务器负担可以使用CDN远程库,例如`https://www.bootcdn.cn/`

- 使用jQuery的核心函数(`jQuery`/`$`),注意大小写
- 使用jQuery核心对象, `var $tmp=$("tmp")`指的是操作核心函数返回的对象,一般为了标注这个是jQuery写的,变量名前加`$`

输出input的内容,双版本
```html
<!DOCTYPE html>
<html>
<head>
    <script src="./js/jquery-3.5.1.js"></script>
    <script>
        // 原生DOM
        window.onload=function(){
            var btn1=document.querySelector("#btn1");
            btn1.onclick=function(){
                var usrname=document.querySelector("input").value;
                alert(usrname);
            }
        }
    </script>
    <script>
        // 绑定文档加载的监听,虽然不知道为什么有了$就算是文档加载结束了
        $(function(){
            $("#btn2").click(function(){ // 给btn2添加事件
                var username=$("input").val(); //val()就是.value
                alert(username);
            });
        })
    </script>
</head>
<body>
    用户名: <input type="text">
    <button id="btn1">OK 原生</button>
    <button id="btn2">OK jQuery</button>
</body>
</html> 
```

- `$(function(){})`相当于是文档加载完成监听`window.onload=function(){}`
- `$("XXX")`相当于是`document.querySelector("XXX")`
- `.val()`就是获取元素的`.value`

## jQuery的两把利器

- 核心函数: `jQuery`/`$`,两者相同(测试`jQuery===$`)
- 核心对象: 核心函数得到, 也就是一个对象(测试`$() instanceof Object`)

?? 头函数的undefined 

## jQuery函数的使用

不论什么框架,回调函数的this就是出发这个函数的DOM的对象

- 作为一个函数去调用
  - jQuery支持多态,所以存在函数的重载(有argument还能这样搞...)
  - $(Function) 当DOM加载结束后执行回调函数
  - $(选择器字符串) 查找所有匹配对象的标签,将他们封装成jQuery对象,注意此时尝试输出`console.log($("input"));`的结果是`jQuery.fn.init(2) [input, input, prevObject: jQuery.fn.init(1)]`
  - $(DOM对象): 返回将这个参数包装成jQuery对象的对象,从而可以调用jQuery对象的方法
  - $(HTML标签字符串) 创建标签对象,封装成jQUery对象,返回
  - Q:为什么这些函数的返回值都是jQuery对象?
  - A:因为这是jQuery函数的事例,只能构造jQuery对象
- 作为一个对象去调用
  - 可以作为工具对象,内部有工具方法

- `$obj.html()`方法是一个读写合一的函数
  - `.html()`返回对象的innerHTML
  - `.html(XX)`将对象的innerHTML设置成XX

- `$obj.appendTo(content)`将jQuery对象放在content的里面的尾部,content是css选择器字符串或者是
- `$obj.each(数组,function(index,n){});`遍历数组中每一个元素的函数,回调函数第一个参数是index第二个参数是值
- `$.trim(str)`取出str两边的空格(实际上原生JS的string就有这个功能)

## jQuery对象的使用

- jQuery的核心函数返回的是对象
- jQuery的对象内部是一个包含DOM元素对象的伪数组(即使可能只有一个元素)
- jQuery对象拥有很多的属性和方法,让程序员可以更方便的操作DOM

jQuery对象的基本行为:

  - size()/length 返回的是DOM元素的数目(在jQuery1.8之后size方法已经被废弃)
  - [index]/get(index) 根据下标得到对应的DOM元素,注意这里是位数组,所以调用的实际上是调用属性,但是数组不能作为变量的开头,所以使用了`[1]`获取元素,注意数组里面的元素是DOM,所以
  ```js
  console.log("B2="+$("button")[2].innerHTML);
  console.log("B2="+$($("button")[2]).html());
  ```
  - each() 遍历,与上面的一样,his就是被遍历到的某一个对象
  - index() 获取某个元素是在同标签元素中的第几个,注意与`get(index)`的区别

## jQuery选择器
选择器本身是一个字符串没有作用

基本语法就是CSS选择器的规则

只有调用`$("选择器")`才有作用,作用是在整个文档中查找所有匹配的标签封装成jQuery对象(伪数组)

选择器

- `$("#div1")` id选择器
- `$("div")` 元素选择器
- `$(".box")` 类选择器 
- `$("div,span")`并集选择器
- `$("div.box")`交集选择器
- `$("*")` 任意标签
- `$("ul span")` ul下的所有span
- `$("ul>span")` ul下的子元素span
- `$(".box+li")` .box下面的一个li
- `$(".box~li")` .box后面的所有兄弟li
- `$(".box:first")` 选择第一个class为box的元素
- `$(".box:last")` 选择第一个class为box的元素
- `$("div:not(.box)")` 选择class不是box的div
- `$("li:eq(2)")` li中第二个元素(0开始)
- `$("li:gt(0):lt(3)")`所有li中**下标大于0的元素里面下标小于3**的元素注意是链式调用,不是同时执行
- `$("li:contains('XXX')")`内容包含XXX的li,注意切换`'`,`"`
- `$("li:hidden")` 隐藏了li
- `$("li:visible")` 可见的li
- `$("li[id]")` 有id属性的li
- `$("li[id="hello"]")` id属性为hello的li
- `$("li:odd")` 下标为奇数的选择器
- `$("li:even")` 下标为偶数的选择器
- `$(":input:disabled")` 不可选中的input
- `$(":checkbox:checked")`选择已经选中的checkbox

注意`<select>`的val是val元素

方法

- `.css("属性名",["值"])`也可以封装成对象`.css({'color':'#bfa','color':'#bfa','color':'#bfa'})`

## `$`工具的方法
- `$.each(obj,function(i,n){})` 遍历数组/对象中的对象
  - 调用对象为数组的时候两个参数为index value
  - 调用对象为对象的时候两个参数为属性名 属性值
- `$.trim()`
- `$.type(obj)` 返回boj的类型
- `$.isArray(X)` 判断X是不是数组
- `$.parseJSON(json)`json转js对象

## 多Tab点击切换

- 隐式遍历
  `$("div").click(function(){})`相当于为所有选中元素添加

可以对比一下用不用隐式的区别

没有
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ul{
            overflow: auto;
            margin: 0;
            padding: 0;
        }
        ul>li{
            display: block;
            width: 100px;
            height: 75px;
            float: left;
        }
        .page{
            width: 300px;
            height: 200px;
        }
    </style>
</head>
<body>
    <ul>
        <li>#bfa</li>
        <li>#F00</li>
        <li>#e3e3e3</li>
    </ul>
    <div class="page">1111111111111111111111</div>
    <div class="page">2222222222222222222222</div>
    <div class="page">3333333333333333333333</div>
</body>

<script src="./js/jquery-3.5.1.js"></script>
<script>
    $(function(){
        var index=0;
        var bts=$("ul>li");
        var pgs=$("div[class=page]");
        $.each(bts,function(i,elem){
            $(elem).css("background-color",$(this).html());
            $(pgs[i]).css("background-color",$(this).html());
            $(bts[i]).click(function(){
                index=i;
                $.each(pgs,function(i,elem){
                    if(i===index)
                        $(pgs[i]).css("display","block");
                    else
                        $(pgs[i]).css("display","none");
                });
            });
            $(bts[0]).click();
        });
    })
</script>
</html>
```

隐式
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ul{
            overflow: auto;
            margin: 0;
            padding: 0;
        }
        ul>li{
            display: block;
            width: 100px;
            height: 75px;
            float: left;
        }
        .page{
            width: 300px;
            height: 200px;
        }
    </style>
</head>
<body>
    <ul>
        <li>#bfa</li>
        <li>#F00</li>
        <li>#e3e3e3</li>
    </ul>
    <div class="page">1111111111111111111111</div>
    <div class="page">2222222222222222222222</div>
    <div class="page">3333333333333333333333</div>
</body>

<script src="./js/jquery-3.5.1.js"></script>
<script>
    $(function(){
        var index=0;
        var bts=$("ul>li");
        var pgs=$("div[class=page]");
        $.each(bts,function(i,n){
            $(this).css("background-color",$(this).html());
            $(pgs[i]).css("background-color",$(this).html());
        })
        bts.click(function(){
            var idx=$(this).index();
            $(this).css("background-color",$(this).html());
            $(pgs[idx]).css("background-color",$(this).html());
            pgs.css("display","none");
            $(pgs[idx]).css("display","block");
        });
        $(bts[0]).click();
    })
</script>
</html>
```

注意,可以使用DOM原生的方法不用jQuery,因为效率会下来,例如`$(btn).css("color","red")`不如`btn.style.color=red`

## jQuery属性

- `$("div:first").attr("title")` 获取第一个div的title属性值,attr:获取属性值
- `$("div:first").attr("title","hahaha")` 设置第一个div的title属性值为hahaha
- `$("div:first").removeattr("title")` 删除第一个div的title属性
- `$("div:first").attr("class","XXX")` 设置class属性为XXX,如果有就直接覆盖
- `$("div:first").addClass("abc")` 为元素添加abc这个类
- `$("div:first").removeClass("abc")` 为元素添加abc这个类
- `$("div:first").html()` 获取元素的innerHTML
- `$("div:first").html("XXX")` 设置元素的innerHTML为XXX
- `$("div:first").text()` 获取元素的innerText(兼容性不好)
- `$("button:first").attr("checked",true)` 设置选中为true
- `$("button:first").prop("checked",true)` 设置选中为true


注意在HTML的表单的时候check的`checked=checked`但是在JS里面写`checked=true`

`prop`仅仅操作属性为bool的元素,`attr`仅仅操作属性为非bool的属性

我们可以使用attr修改css的class这样不用使用css()修改元素的样式,这样提高了效率

更详细的

- 对于 HTML 元素本身就带有的固有属性，或者说 W3C 标准里就包含有这些属性，更直观的说法就是，编辑器里面可以智能提示出来的一些属性，如：src、href、value、class、name、id等。在处理时，使用 prop() 方法。(还有bool的)
- 对于 HTML 元素我们自定义的 DOM 属性，即元素本身是没有这个属性的，如：data-*。在处理时，使用 attr() 方法。

## CSS模块

操作的是style属性

- `$obj.css("color")`obj这个元素的color属性
- `$obj.css("color","red")`设置obj这个元素的color属性为red
- css方法不必驼峰，例如`$("#1").css("border-width")`
- 设置obj这个元素的color属性为red,width为150,height为200
  ```js
    $obj.css(function(){
        color:"#bfa",
        height:"200px",
        width: 100
    });
  ```
  注意,这里的px可以不加

## CSS位置模块

- 获取元素相对于页面左上角的距离
  ```js
    var ost=$obj.offset();
    console.log(ost.left,ost.top)
  ```
- 获取元素相对与父元素的距离
  ```js
    var position=$obj.position();
    console.log(position.left,position.top)
  ```
- offset是读写合一的,修改
  ```js
    $obj.offset({
        left:50,
        top:20
    });
  ```
- 滚动高度:`$Obj.scroolTop()`获取滚动条高度,同时是**读写合一的的函数**,但是全局的滚动条高度存在兼容性问题,IE是document,Chrome是html,兼容方法是`document.scroolTop()+html.scroolTop()`,最好用这个
  ```js
    console.log($(document.documentElement())+$(document.body).scrollTop())
  ```
  效率高一点点,设置滚动兼容性
  ```js
    $('html,body').scrollTop(300);
  ```

## 实现滚动
直接滚动
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html,body{
            background-color: #3e3e3e;
            height: 100000px;
        }
        div{
            position: fixed;
            right: 100px;
            bottom: 100px;
            width: 50px;
            height: 50px;
            background-color: #bfa;
        }
    </style>
</head>
<body>
    <div class="back">回到顶部</div>
</body>
<script src="./js/jquery-3.5.1.js"></script>
<script>
    $(function(){
        $("div").click(function(){
            $("body,html").scrollTop(0);
        });
    });
</script>
</html>
```

平滑滚动
```html
<!DOCTYPE html>
<html lang="en">
<head>*
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        html,body{
            background-color: #3d3d3d;
            height: 100000px;
        }
        div{
            position: fixed;
            right: 100px;
            bottom: 100px;
            width: 50px;
            height: 50px;
            background-color: #bfa;
        }
    </style>
</head>
<body>
    <div>Back</div>
</body>

<script src="./js/jquery-3.5.1.js"></script>
<script>
    $(function(){
        var backtot=$($("div")[0]);
        console.log(backtot);
        backtot.click(function(){
            var dis=$("body,html").scrollTop();
            var per=dis/100;
            var inter=setInterval(function(){
                if($("body,html").scrollTop()<=per){
                    $("body,html").scrollTop(0);
                    clearInterval(inter);
                }
                console.log($("body,html").scrollTop());
                $("body,html").scrollTop($("body,html").scrollTop()-per);
            },2);
        });
    });
</script>

</html>
```

## 元素的尺寸

- 内容尺寸
  - height(): height
  - width(): width
- 内部尺寸
  - innerHeight: height+padding
  - innerwidth: width+padding
- 外部尺寸
  - outerHeight(false/true): height+padding+border+参数*margin
  - outerWidth(false/true): width+padding+border+参数*margin

## 对象的筛选

- 过滤: 对jQuery中的元素进行筛选
- 查找: 找元素里面的子孙

- 过滤的结果与原对象是存在关系的
- 查找的结果与源对象之间没有关系

感觉上和CSS选择器类似

- 过滤
  - 在jQuery对象内部的元素中找出部分匹配的元素, 并封装成新的jQuery对象返回
  - first()
  - last()
  - eq(index)
  - filter(selector): 对当前元素提要求
  - not(selector): 对当前元素提要求, 并取反
  - has(selector): 对子孙元素提要求
- 查找
  - 查找jQuery对象内部的元素的子孙/兄弟/父母元素, 并封装成新的jQuery对象返回
  - children(selector): 子元素
  - find(selector): 后代元素
  - preAll(selector): 前的所有兄弟
  - siblings(selector): 所有兄弟
  - parent(): 父元素

## jQuery的文档处理
- 在元素内部插入
  - `$被插入元素.append("HTML代码")` 插入到被插入元素的尾部
  - `要添加的HTML代码的jQuery对象.appendTo("被插入元素选择器/$obj")` 插入到被插入元素的尾部
  - `$被插入元素.prepend("HTML代码")` 插入到被插入元素的首部
  - `要添加的HTML代码的jQuery对象.prependTo("被插入元素选择器/$obj")` 插入到被插入元素的首 部
- 在元素外部(同级)插入
  - `$被参考元素.before("HTML代码")` 在被参考元素前面插入 
  - `$被参考元素.after("HTML代码")` 在被参考元素后面面插入
- 替换 
  - `$被替换元素.replaceWith("HTML代码")` 用HTML代码替换被替换元素
  - `$被替换元素.replaceAll("CSS选择器")`用选择器选中的元素替换$obj
- 删除
  - `$obj.empty()` 清空obj里面的元素
  - `$obj.remove()` 清空obj以及他的子元素

## 事件

- 页面载入:ready(function(){})就是$(function(){})的缩写

**事件的绑定与解邦**

- 点击函数
  - `$obj.click(function(){})`
  - `$obj.on("click",function(){})`
  - 第一个简洁第二个通用(对于没有绑定事件的方法)
- 鼠标移出入
  - `$obj.mouseenter(function(){});&`$obj.mouseleave(function(){});`
  - `$obj.on("mouseenter",function(){});&`$obj.on("mouselive",function(){});`
  - `$obj.hover(function(){},function(){})` 先写入后写出
- 解除某个元素的所有监听
  - `$obj.off()`
- 解除某个元素的指定监听
  - `$obj.off("监听名")`
- 事件坐标
  - 在click等事件内部想获得触发事件元素的坐标可以在回调函数上加入event
  - 元素距离视口左上角坐标:`event.clientX`,`event.clientY`
  - 元素距离页面左上角坐标:`event.pageX`,`event.pageY`
  - 事件元素左上角坐标:`event.offsetX`,`event.offsetY`
- 取消事件冒泡
  - `event.stopPropagation()`取消事件的冒泡行为(指的是冒泡给父元素)
  - `event.preventDefuat()`取消默认行为 

**事件的委托**

- 在append元素之后新的元素不会绑定原有的事件,可以在创建的时候再次绑定,也可以使用事件的委托
- 事件的委托就是将子元素的事件代为父元素处理,用event.target获得子元素 
- 添加事件委托`$受委托.delegate("委托元素选择器","委托事件",回调函数function(){})`
- 移除事件委托`$受委托.undelegate(["委托元素选择器"],["委托事件"],[回调函数function(){}])`不写就是对应项目的全部
  
## 轮播图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/jquery-3.5.1.js"></script>
    <script src="./js/script.js"></script>
</head>
<body>
    <div class="outer">
        <div class="imgs">
            <img src="./img/imgs3.jpg" class="innerimg">
            <img src="./img/imgs0.jpg" class="innerimg">
            <img src="./img/imgs1.jpg" class="innerimg">
            <img src="./img/imgs2.jpg" class="innerimg">
            <img src="./img/imgs3.jpg" class="innerimg">
            <img src="./img/imgs0.jpg" class="innerimg">
        </div>
        <div class="nodes">
        </div>
        <a href="javascript:;" class="btn lst">&lt;</a>
        <a href="javascript:;" class="btn nxt">&gt;</a>
    </div>
</body>
</html>
```

```less
body,html{
    margin: 0;
    padding: 0;
    background-color: #bfa;
}

.outer{
    position: relative;
    width: 400px;
    height: 300px;
    overflow: hidden;
    margin: 100px auto;
    background-color: #fff;
    .imgs{
        width: 99999px;
        height: 300px;
        position: absolute;
        left: 0;
        top: 0;
        img{
            width: 400px;
            height: 300px;
            float: left;
            text-align: top;
        }
    }
    .nodes{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background-color: #000;
        width: 100px;
        height: 15px;
        bottom: 50px;
        text-align: center;
        a{
            background-clip: content-box;
            display: block;
            float: left;
            border-radius: 50%;
            background-color: rgba(255,255,255,.4);
            width: 8px;
            height: 8px;
            border: 1px rgba(255,255,255,.4) solid;
            margin: 3px 4px 0 0;
            text-align: center;
        }
        .active{
            width: 9px;
            height: 9px;
            margin-top: 0;
            background-color: #fff;
            border: 3px rgba(255,255,255,.4) solid;
        }
        a:hover{
            .active
        }
    }
    .btn{
        color: rgba(255,255,255,.4);
        text-decoration: none;
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 30px;
        background-color: rgba(0,0,0,0.5);
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        font-weight: 1000;
        &.lst{
            left: 0;
            border-radius: 0 15px 15px 0;
        }
        &.nxt{
            right: 0px;
            border-radius: 15px 0 0 15px;
        }
    }
}

```

```js
$(function(){
    // ====== consts ======
    var PIC_WIDTH=400;
    var DOT_SZIE=10;
    var DOT_ACTIVE_SIZE=15;
    var DOT_MARGE=4;
    var PIC_Time=500;
    var PIC_Intr=2000;
    
    // ====== jQuery Object ======
    var $dot;
    var $dotOut=$(".nodes");
    var $btns=$(".btn");
    var $imgOut=$(".imgs");
    var $imgs=$("img");

    // ====== variable ======
    var index=0;
    var pics=$imgs.length-2
    var curGlbInt=-1,curPssInt=-1;

    // ====== resize ======
    for(var i=0;i<pics;i++)
        $dotOut.append('<a class="node" id="'+i+'dotBtn"></a>');
    $dot=$(".node");
    $dotOut.css("width",DOT_SZIE*$dot.length+DOT_MARGE*($dot.length)+2*(DOT_ACTIVE_SIZE-DOT_SZIE));
    $imgOut.css("width",$imgs.length*PIC_WIDTH);
    $imgOut.css("left",-PIC_WIDTH);

    // ====== base fn ======
    function pause(){
        if(curGlbInt+1)clearInterval(curGlbInt);curGlbInt=-1;
        if(curPssInt+1)clearInterval(curPssInt);curPssInt=-1;
    }

    function runPage(global){
        if(curPssInt+1)return;
        $dot.removeClass("active")
        $($dot[global%pics]).addClass("active");
        var L0=$imgOut.position().left;
        var L1=-(global+1)*PIC_WIDTH;
        var speed=(L1-L0)/(PIC_Time/(1000/12));
        curPssInt=setInterval(function(){
            if(($imgOut.position().left-L1)*($imgOut.position().left-L1+speed)<=0){
                if(curPssInt+1)clearInterval(curPssInt);
                curPssInt=-1;
                $imgOut.css("left",L1);
                if(L1==-5*PIC_WIDTH)$imgOut.css("left",-PIC_WIDTH);
                if(L1==0)$imgOut.css("left",-4*PIC_WIDTH);
            }else{
                $imgOut.css("left",$imgOut.position().left+speed);
            }
        },1000/12);
    }

    function glbRun(){
        curGlbInt=setInterval(function(){
            index=index%pics+1;
            runPage(index);
        },PIC_Intr);
    }
    
    function clickRun(step){
        index=index%pics+step
        runPage(index)
        if(index<0)index=pics-1;
    }

    $($btns[0]).click(function(){
        if(curPssInt+1)return;
        pause();
        clickRun(-1);
        glbRun();
    });

    $($btns[1]).click(function(){
        if(curPssInt+1)return;
        pause();
        clickRun(1);
        glbRun();
    });

    $imgOut.hover(function(){
        if(curGlbInt+1)clearInterval(curGlbInt);curGlbInt=-1;
    },glbRun);

    $dot.mouseenter(function(){
        if(curGlbInt+1)clearInterval(curGlbInt);curGlbInt=-1;
        if(curPssInt+1)clearInterval(curPssInt);curPssInt=-1;
        index=parseInt($(this).index());
        runPage(index);
    });

    glbRun();
    $($dot[0]).addClass("active")
});
```

## 效果
- 淡入淡出
  - `$obj.fadeOut()` 本质上是修改了元素的透明度实现淡出
  - `$obj.fadeOut(["slow"/"normal"/"fase"/ms数值])` 本质上是修改了元素的透明度实现淡出,加入了执行时间
  - `$obj.fadeOut()`淡入,同上
  - `$obj.fadeToggle()`切换淡出淡入
  - 可以在上面函数中加入一个回调函数,会在动画执行结束后运行`$obj.fadeOut(1000,function(){})`

- 滑动
  - 滑动动画: 不断改变元素的高度实现
  - slideDown(): 带动画的展开
  - slideUp(): 带动画的收slideToggle(): 带动画的切换展开/收缩
- 显示隐藏，默认没有动画, 动画(opacity/height/width)
  - show(): (不)带动画的显示
  - hide(): (不)带动画的隐藏
  - toggle(): (不)带动画的切换显示/隐藏
- 自定义动画
  - `$obj.animate({css样式对象},执行时间)`同时将多个动画完成
  - `$obj.animate({css样式对象1}).animate({CSS对象样式2})...`一步步执行
  - 好用的东西,移动指定的增量
    ```js
      $obj.animate({
          left: "+=100",2
          top:  "-=50"
      })
    ```

## 多库共存
- 如果引用的两个库同时调用了`$`属性那么会发生冲突
- 这个时候我们希望jQuery会自动放弃`$`的使用权,开发者只可以使用jQuery函数
- 只需要在jQuery正式使用前调用`jQuery.noConflict();`

## `$(fun(){})`与`window.onload=function(){}`的区别
有三种方法定义加载完成函数

- `window.onload=function(){}`
- `$obj.on("load",function(){})`
- `$(function(){})`
- `$(document).ready(function(){})`

其中

- 第三个和第四个函数是等价的
- 第一个是文档加载完成的回调函数
- 第二个是元素加载完成之后的回调函数
- 第一个是在文档加载结束(图片视频等加载结束之后)
- 第二个是在选中资源(图像等)完全加载结束回调
- 第三四是在文档加载完成,不管图像怎么样,相当于文档解析完成执行
- jQuery的多个函数可以同时绑定到一个元素,但是window.onload不可以,存在覆盖,只能使用append添加

## jQuery插件

- `jQuery.fn.extend([fun1:function(){},fun2:function(){},...])`他可以扩展jQuery对象的方法,调用之后我们可以使用`$obj.fun1()`
- `jQuery.extend([fun1:function(){},fun2:function(){},...])`他可以扩展jQuery函数的方法,调用之后我们可以使用`$.fun1()`

常见插件

- jQuery-validation:一个表单验证的插件

可以实现浏览器端**同步**的简单表单验证,举例
```html
<form id="myForm" action="xxx">
    <p>用户名(必须的, 最小2位): <input name="name" type="text" required minlength="2"></p>
    <p>密码(必须的, 6到8位): <input id="password" name="pwd" type="password" required minlength="6" maxlength="8"></p>
    <p>确认密码(与密码相同): <input name="pwd2" type="password" equalTo="#password"></p>
    <input class="submit" type="submit" value="提交">
</form>
```
执行发现似乎前两个可以验证,但是第三个挂了,提示的样式感觉是chrome原生的提醒,没错,其实插件并没有允许,只不过chrome恰好有相同的命令所以是直接由浏览器接管的,想要使用插件还需要告诉插件那个表单需要进行验证,只需要自己在后面写下js
```js
<script>
    $("#myForm").validate();
</script>
```

全部的方法有:
```
required: "This field is required.",
remote: "Please fix this field.",
email: "Please enter a valid email address.",
url: "Please enter a valid URL.",
date: "Please enter a valid date.",
dateISO: "Please enter a valid date ( ISO ).",
number: "Please enter a valid number.",
digits: "Please enter only digits.",
equalTo: "Please enter the same value again.",
maxlength: $.validator.format( "Please enter no more than {0} characters." ),
minlength: $.validator.format( "Please enter at least {0} characters." ),
rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
range: $.validator.format( "Please enter a value between {0} and {1}." ),
max: $.validator.format( "Please enter a value less than or equal to {0}." ),
min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
step: $.validator.format( "Please enter a multiple of {0}." )
```

之后我们需要进行中文化处理,修改刚刚的js代码
```js
<script>
    $("#myForm").validate({
        messages:{
            要修改标签的name:{
                标记的属性1:"提示信息1", 
                标记的属性2:"提示信息2"
            },
            pwd:{
                minlength: "输入的是什么玩意(手动狗头)"
            }
        }
    });
</script>
```

可以修改提示信息的css样式(上面有class)

- jQuery UI

是jquery的一个插件,在下载之后看demo.html的样式自取,注意

- 需要引用的文件有
    - 在`<head></head>`里面写`<link rel="stylesheet" href="./js/UIforUse/jquery-ui.css">`
    - 在引入`jQuery`与`jquery-ui.js`两个js文件,jQuery优先,这是因为第二个库是依赖jQuery运行的,而不想less是后面的库要编译我们写的less文件
    - 只需要复制给出了html代码然后记得把对应的js粘贴上,实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./js/UIforUse/jquery-ui.css">
</head>
<body>
    <!-- 1. 手风琴 -->
    <h2 class="demoHeaders">Accordion</h2>
    <div id="accordion">
        <h3>First</h3>
        <div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
        <h3>Second</h3>
        <div>Phasellus mattis tincidunt nibh.</div>
        <h3>Third</h3>
        <div>Nam dui erat, auctor a, dignissim quis.</div>
    </div>

    <!-- 2. 自动补全 -->
    <h2 class="demoHeaders">Autocomplete</h2>
    <div>
        <input id="autocomplete" title="type &quot;a&quot;">
    </div>

    <!-- 3. 选项卡 -->
    <h2 class="demoHeaders">Tabs</h2>
    <div id="tabs">
        <ul>
            <li><a href="#tabs-1">First</a></li>
            <li><a href="#tabs-2">Second</a></li>
            <li><a href="#tabs-3">Third</a></li>
        </ul>
        <div id="tabs-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div id="tabs-2">Phasellus mattis tincidunt nibh. Cras orci urna, blandit id, pretium vel, aliquet ornare, felis. Maecenas scelerisque sem non nisl. Fusce sed lorem in enim dictum bibendum.</div>
        <div id="tabs-3">Nam dui erat, auctor a, dignissim quis, sollicitudin eu, felis. Pellentesque nisi urna, interdum eget, sagittis et, consequat vestibulum, lacus. Mauris porttitor ullamcorper augue.</div>
    </div>

</body>
<script src="./js/jquery-3.5.1.js"></script>
<script src="./js/UIforUse/jquery-ui.js"></script>
<script>
    // for 1
    $("#accordion").accordion()

    // for2
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $( "#autocomplete" ).autocomplete({
        source: availableTags
    });

    // for 3
    $( "#tabs" ).tabs();    

    
</script>
</html>
```

- laydate
  - 目前已经更新,教程失效,直接看[官方文档](https://www.layui.com/laydate/?alone)

## 京东商品页

除了js之外其他都是模板没动(引用了jquery和自定义js),笔记在js里面

```js
$(function(){       // 写的是js文件,所以最好封装起来
    // 鼠标移动
    function hoverShowItem(){
        $('[name="show_hide"]').hover(
            function(){
                // $(this).find("#"+this.id+"_items").css("display","block");
                $("#"+this.id+"_items").show();
            },function(){
                // $(this).find("#"+this.id+"_items").css("display","none");
                $("#"+this.id+"_items").hide();
            }
        );
    }
    // subsubshow
    function subsubshow(){
        $('.cate_item').hover(
            function(){
                // $(this).find(".sub_cate_box").show()
                $(this).children(":last").show()
            },function(){
                // $(this).find(".sub_cate_box").hide()
                $(this).children(":last").hide()
            }
        );
    }

    function inputShow(){
        $("#txtSearch")
            .on("keyup force",function(){
                if($(this).val().trim)
                    $(this).parent().prevAll("#search_helper").show();
            })
            .blur(function(){
                $(this).parent().prevAll("#search_helper").hide();
            });
    };

    function sharemore(){
        // 注意数组顺序!!!
        $("#shareMore").click(function(){
            if($(this).prevAll("a").filter(":first").css("display")=="block"){
                $(this).prevAll("a").filter(":lt(2)").hide();
                $(this).parent().css({"width":"-="+parseInt($(this).css("width"))*2});
                $(this).children("b").css("backgroundPositionX",'-271px')
            }else{
                $(this).prevAll("a").show();
                $(this).parent().css({"width":"+="+parseInt($(this).css("width"))*2});
                $(this).children("b").css("backgroundPositionX",'-263px')
            }
        });
    }

    function selAddr(){
        var menus=$("#store_select").children(".text").nextAll();
        $("#store_select").hover(function(){
            menus.show();
        },function(){
            menus.hide();
        });

        $("#store_close").click(function(){
            if($(this).css("display")=="block")
                menus.hide();
        });

        $("#store_items>li>a").click(function(){
            $("#store_tabs>li")[0].innerHTML=$(this).html()+"<b></b>"
        });
    }

    function chgPage(){
        $("#product_detail>ul>li").click(function(){
            $(this).parent().children().removeClass("current");
            $(this).addClass("current");
            $(this).parent().nextAll("div:gt(0)").hide();
            $($(this).parent().nextAll("div:gt(0)")[$(this).index()]).show();
        })
    }

    function minicar(){
        $("#minicart>p>a").hover(
            function(){
                $(this).parent().parent().children("div").show()
            },function(){
                $(this).parent().parent().children("div").hide()
            }
        )
    }

    function prew(){
        var curPic=0;
        function check(){
            if(curPic==0){
                $("#preview>h1>a").filter("[class^=backward]").addClass("backward_disabled");
                $("#preview>h1>a").filter("[class^=backward]").removeClass("backward");
            }else{
                $("#preview>h1>a").filter("[class^=backward]").addClass("backward");
                $("#preview>h1>a").filter("[class^=backward]").removeClass("backward_disabled");                
            }
            if(curPic==$("#icon_list>li").length-1){
                $("#preview>h1>a").filter("[class^=forward]").addClass("forward_disabled");
                $("#preview>h1>a").filter("[class^=forward]").removeClass("forward")
            }else{
                $("#preview>h1>a").filter("[class^=forward]").addClass("forward");
                $("#preview>h1>a").filter("[class^=forward]").removeClass("forward_disabled")
            }
        }

        $("#icon_list>li").click(function(){
            $(this).parent().find("li>img").css({
                border:"none"
            });
            $(this).children("img").css({
                border:"1px red solid"
            });
            $(this).show();
            $("#mediumImg").attr("src",$(this).find("img").attr("src").replace(".jpg","-m.jpg"));
            if($(this).nextAll().length>=4)
                $(this).prevAll().hide();
            curPic=$(this).index();
            check()
        });

        $(".forward").click(function(){
            $($("#icon_list>li")[curPic+1]).click();
        });

        $("#preview>h1>a").click(function(){
            if($(this).hasClass("backward"))
                $($("#icon_list>li")[curPic-1]).click();
            else if($(this).hasClass("forward"))
                $($("#icon_list>li")[curPic+1]).click();
        });

        $("#icon_list>li")[0].click();
    }

    function mymousemove(){
        $("#maskTop").hover(showIMG,hideIMG);
        $("#maskTop").on("mousemove",function(e){
            var x=e.offsetX,y=e.offsetY;
            var seqX,seqY;
            seqX=x-$("#mask").width()/2;
            seqY=y-$("#mask").height()/2;
            seqX=Math.max(Math.min(seqX,$(this).width()-$("#mask").width()),0);
            seqY=Math.max(Math.min(seqY,$(this).height()-$("#mask").height()),0);
            $("#mask").css({
                top:seqY,
                left:seqX,
            });
            $("#largeImg").css({
                left: -$("#mask").position().left/$(this).width()*$("#largeImg").width(),
                top: -$("#mask").position().top/$(this).height()*$("#largeImg").height()
            })
        });
        function showIMG(){
            $("#mask").css("display","block");
            $("#largeImg").attr("src",$("#mediumImg").attr("src").replace("-m.jpg","-l.jpg"));
            $("#largeImg").css("display","block");
            $("#largeImgContainer").show();
        }
        function hideIMG(){
            $("#mask").hide();
            $("#largeImg").css({display:"none",position:"absolute"});
            $("#largeImgContainer").hide();
        }
    }

    hoverShowItem();
    subsubshow();
    inputShow();
    sharemore();
    selAddr();
    chgPage();
    minicar();
    prew();
    mymousemove();
});
```