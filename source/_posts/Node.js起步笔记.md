---
title: Node.js起步笔记
date: 2021-5-18 01:49:56
toc: true
description: Node.JS起步部分笔记,主讲:黑马程序员,视频来自B站:BV1Ns411N7HU
categories:
  - [前端,JS]
tags:
  - 前端
  - JavaScript
  - NodeJS
  - 笔记
---



## Node.js 起步

- Node.js 是一个服务端的语言
- 服务端的语言与前端不一样，前端只有H5,CSS,JS以及以他为基础的其他语言，但是服务端有很多语言都可以实现H5这样最基础的功能，他们之间是并列关系，没有依赖，例如Java,PHP,Python,Ruby,.Net,Nodejs
- 使用Node.js的原因是可以使用js语言，对前端友好
- Node.js是什么
  1. 是一个JS运行时环境(Runtime lib)而不是一个库，不是一个框架，不是一个语言，(可以理解他是和一个浏览器一样的东西,但是有点不一样)
     - 浏览器中的JS是什么
       - 基础语法 ECMAScript
       - DOM
       - BOM

     - Node.js中的JS是什么
       - 没有BOM,DOM(因为服务端不处理页面)
       - 基础语法 ECMAScript
       - 服务器级别的API(文件读写，网络服务构建，http服务...)

  2. 是一个**事件驱动**，**非阻塞IO模型**(异步)，高效轻量
  3. 使用npm生态系统，也是最大的开源生态系统
  4. 构建在v8引擎是上的

- Nodejs可以做什么
  - Web后台
  - 命令行工具(例如: hexo，gulp...)
  - 接口服务器

## 简单程序

直接创建js文件写就可以了，不需要依赖html文件，之后使用`node xx.js`执行文件

写出hello world
```js
var foo='hello world'
console.log(foo);
```

之后尝试服务端的文件读写,注意浏览器的HTML是不支持文件读写的

```js
// fs是file-system的缩写，就是文件系统的意思 
// 在Node中如果想要使用文件io那必须引入fs这个模块
// fs模块为所有的文本操作提供了相关的api
var fs=require("fs");

// 其中的readFile是用来读取文件的，第一个是地址，第二个是回调函数，回调接受两个参数，error和data
//    - error表示文件读取是否有错误，有错是error对象，没错的null
//    - data是读取到的数据，有错是null，没错是16进制结果，需要toString才能看
fs.readFile("./test",function(error,data){
    if(!error)
        console.log(data.toString());
    else
        console.log("ERROR!!\n"+error)
});

// tst文件不存在
fs.readFile("./tst",function(error,data){
    if(!error)
        console.log(data.toString());
    else
        console.log("ERROR!!\n"+error)
});

// 参数为 路径 内容 回调函数(接受error)
fs.writeFile("./out","测试文本",function(error){
    if(error)
        console.log("文件写入失败");
})

// 文件名有非法字符 写入失败
fs.writeFile("./o/*-ut","测试文本",function(error){
    if(error)
        console.log("文件写入失败"+error);
})
```

## 最简单的http服务

### 需要核心模块http
```js
// 加载http核心模块
var http = require('http');

// 使用http.creatServer创建一个web服务器
// 返回一个server实例
var server = http.createServer();

// 发请求 收请求 处理请求 发生相应

// 注册request请求时间，受到request请求之后就会执行回调函数
server.on("request",function(){
    console.log("受到客户端请求");
})

// 绑定3000端口，启动服务器
server.listen(3000,function(){
    console.log("服务器启动成功");
});
```

### 响应请求
```js
var http = require('http');

var server = http.createServer();

//request的回调函数要接受两个函数
//    - Request 请求对象
//      获取客户端的请求信息，例如路径
//    - Reponse 相应对象
//      响应对象可以用来给客户端发送相应消息

server.on("request",function(request,response){
    // 输出访问路径的地址 127.0.0.1:3000/a 得到的是/a
    console.log("受到客户端请求, 请求路径是"+request.url);
    // response.write可以用来发送相应
    // write可以用多次但是一定要用end来结束否则客户端会一直接受，end之后不能再发请求
    response.write("hello");
    response.write("123456");
    response.end();
})

server.listen(3000,function(){
    console.log("服务器启动成功");
});
```

p.s. 浏览器在访问的时候会有一个默认请求favicon.ico，获取图标不用管

### 不同路径不同请求
```js
var http = require('http');

var server = http.createServer();

server.on("request",function(request,response){
    var value=""
    var obj=[{
        title:123,
        name:456,
    },{
        title:45,
        name:45,
    },{
        title:23,
        name:4,
    }];
    switch (request.url) {
        case "/":value="index";break;
        case "/log":value="登陆";break;
        case "/reg":value="注册";break;
        default:value="错误";break;
    }
    response.write("收到请求，进入"+value+"页面");
    // 注意相应内容只能是二进制文件或者是字符串，不支持JSON对象,数组....
    response.write(JSON.stringify(obj));
    response.end();
})

server.listen(3000,function(){
    console.log("服务器启动成功");
});
```

### 获取服务器端口与客户端端口号
```js
server.on("request",function(request,response){
    console.log("服务端口:"+request.socket.localPort+"客户端端口"+request.socket.remotePort);
}
```

### 中文乱码的问题
  node服务器默认是发送utf8的数据，但是浏览器不知道，于是按照操作系统默认编码解析，于是服务器要告诉浏览器是用的utf8，方法是
  ```js
  rep.setHeader('Content-Type',"text/plain;charset=utf-8")
  ```

## Node中的js
- ECMAScript
  - 没有DOM,BOM
- 核心模块
  - Node为JS提供了服务器级别的API，他们都被包装到了一个具名的核心模块中了，例如`fs`文件系统,`http`http模块，`path`路径模块，`os`操作系统模块
  - 以后一说他是核心模块就直接`var XXX=require("YY")`XX命名不强制最好与YY相同
- 第三方模块
- 自定义模块

## 简单模块化
两个方法: `require`用来加载`export`用来导出
require 是一个方法
他的作用是加载模块的
模块有三种  

  - 具名的核心模块，例如 fs, http
  - 用户自己编写的文件模块(require的时候./不能省略否则就成核心模块了，可以不写.js)

1.js
```js
console.log("开始执行1");
var mod2=require("./2.js")
console.log("结束执行1");
```
2.js
```js
console.log("外部文件加载好了")
```

- 在node中，没有全局作用域，只有模块作用域，也就是变量只能在本文件内部使用
- require之后会**自动**执行内部的代码然后获取文件的接口对象
- 如果不仅想要执行子模块代码，还想使用接口对象中的内容需要
  1. 将方法实例化成本模块中的一个对象
  2. 将需要暴露的对象作为接口对象导出

1.js 续
```js
console.log(mod2.foo)
console.log(mod2.plus(1,1.2));
```

2.js 续
```js
exports.foo="hello";
exports.plus=function(a,b){
    return a+b;
}
```

## 响应内容类型Content-Type
```js
rep.setHeader("Content-Type","text/plain;charset=utf-8");
```
注意双引号是引到哪里

### 对与HTML代码的设置

以上是针对纯文本的，尝试以下设置
```js
var http=require("http");
var server=http.createServer();
server.on("request",function(req,rep){
    rep.write("<p>123<a href="javascript:;">456</a></p>");
    rep.write("<p>中文<a href="javascript:;">测试</a></p>");
    rep.end();
})
server.listen(3000,function(){
    console.log("node start...");
})
```

- 发现123456显示正常，并没有显示标签，可以看到network受到的包是有标签的，是浏览器进行了渲染导致用户看不到标签
- 发现中文显示失败，这是因为没有设置utf-8

尝试设置
```js
var http=require("http");
var server=http.createServer();
server.on("request",function(req,rep){
    rep.setHeader("Content-Type","text/plain;charset=utf-8");
    rep.write("<p>123<a href="javascript:;">456</a></p>");
    rep.write("<p>中文<a href="javascript:;">测试</a></p>");
    rep.end();
})
server.listen(3000,function(){
    console.log("node start...");
})
```
发现 中文显示正常，但是标签被显示了，这是因为node明确的告诉了浏览器这是文本，不让浏览器解析，解决方法是把plain改为html
```js
var http=require("http");
var server=http.createServer();
server.on("request",function(req,rep){
    rep.setHeader("Content-Type","text/html;charset=utf-8");
    rep.write("<p>123<a href="javascript:;">456</a></p>");
    rep.write("<p>中文<a href="javascript:;">测试</a></p>");
    rep.end();
})
server.listen(3000,function(){
    console.log("node start...");
})
```
中文与标签正常显示

**注意每一次发送响应只能设置一次Content-Type，每次end后不得再次write**

### 其他类型的Content-Type

- html文件
```js
var http=require("http");
var fs=require("fs");
const { report } = require("process");
var server=http.createServer();

server.on("request",function(req,rop){
    rop.setHeader("Content-Type","text/html;charset=utf-8")
    fs.readFile("./index.html",function(error,data){
        if(error)
            rop.write("ERROR");
        else
            rop.write(data);
    });
    rop.write("123");
    rop.end();
})

server.listen(3000,function(){
    console.log("working...");
})
```
**注意**，有问题，只能看到`123`因为**回调函数是异步模块**，当读取到回调函数的时候会将他放到**事件队列等待**，执行主线程，于是就读取了`rop.write("123");`然后马上就是`rop.end`等主代码结束，才打开时间队列循环，发送请求，但是迟了，早就end了!!!，如何验证??换成如下代码，等读到`setTimeout(rop.end,10000);`开始分线程计时，读取事件队列，之后10s后发送end，源文件显示了，同时可以看到是先有123后有HTML代码！！
```js
server.on("request",function(req,rop){ 
    rop.setHeader("Content-Type","text/html;charset=utf-8")
    fs.readFile("./index.html",function(error,data){
        if(error)
            rop.write("ERROR");
        else
            rop.write(data);
    });
    rop.write("123");
    setTimeout(rop.end,10000);
})
```
所以，最好的办法是
```js
var http=require("http");
var fs=require("fs");
const { report } = require("process");
var server=http.createServer();

server.on("request",function(req,rop){
    rop.setHeader("Content-Type","text/html;charset=utf-8")
    fs.readFile("./index.html",function(error,data){
        if(error)
            rop.end("ERROR");
        else
            rop.end(data);
    });
})

server.listen(3000,function(){
    console.log("working...");
})
```
终止必须在异步模块里面

- png
```js
// png 图片就不用指定编码了 一般只有字符数据指定编码
rop.setHeader("Content-Type","image/png");
    fs.readFile("./3.png",function(error,data){
        if(error)
            rop.end("ERROR");
        else
            rop.end(data);
        
    });
```

- 其他类型的Content-Type
  - 媒体格式
    - text/html ： HTML格式
    - text/plain ：纯文本格式      
    - text/xml ：  XML格式
    - image/gif ：gif图片格式    
    - image/jpeg ：jpg图片格式 
    - image/png：png图片格式
  - 以application开头的媒体格式类型：
    - application/xhtml+xml ：XHTML格式
    - application/xml     ： XML数据格式
    - application/atom+xml  ：Atom XML聚合格式    
    - application/json    ： JSON数据格式
    - application/pdf       ：pdf格式  
    - application/msword  ： Word文档格式
    - application/octet-stream ： 二进制流数据（如常见的文件下载）
    - application/x-www-form-urlencoded ： `<form encType=””>`中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
  - 更多(https://tool.oschina.net/commons)[https://tool.oschina.net/commons]

## 实现一些apach功能

### 实现目录浏览功能

- 输入地址访问部分文件
```js
var http=require("http");
var fs=require("fs");
var server=http.createServer();

server.on("request",function(req,res){
    rep.setHeader("Content-Type","text/plain;charset=utf-8")
    var reg=new RegExp("^\/file\/","i");
    if(reg.test(req.url)){
        fs.readFile(req.url.replace(reg,".\/"),function(error,data){
            if(error){
                res.end("ERROR REQ");
                console.log(error);
            }else{
                res.end(data);
            }
        });
    }else{
        res.end("welcom");
    }
});

server.listen(3000,function(){ 
    console.log("working...");
})
```

### 输入网址访问文件目录

**需求1 显示指定文件夹下文件目录**  
需要使用文件目录那一定是fs模块，查API得到`fs.readdir("PATH",function(error,files))`files是文件名数组(注意两个d都没大写)  
```js
var fs=require("fs");

fs.readdir("../01/",function(error,files){
    if(error)
        console.log(error);
    else
        console.log(files);
});
```

**需求2 动态显示**  
当然我们可以使用字符串替换暴力实现
```html
<!DOCTYPE html>
<html dir="ltr" lang="zh">
<head>
    <meta charset="utf-8">
    <style>
        h1 {
            border-bottom: 1px solid #c0c0c0;
            margin-bottom: 10px;
            padding-bottom: 10px;
            white-space: nowrap;
        }
        table {
            border-collapse: collapse;
        }
        th {
            cursor: pointer;
        }
        td.detailsColumn {
            -webkit-padding-start: 2em;
            text-align: end;
            white-space: nowrap;
        }
        a.icon {
            -webkit-padding-start: 1.5em;
            text-decoration: none;
            user-select: auto;
        }
        a.icon:hover {
            text-decoration: underline;
        }
        a.file {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMAAAAAAABupgeRAAABHUlEQVR42o2RMW7DIBiF3498iHRJD5JKHurL+CRVBp+i2T16tTynF2gO0KSb5ZrBBl4HHDBuK/WXACH4eO9/CAAAbdvijzLGNE1TVZXfZuHg6XCAQESAZXbOKaXO57eiKG6ft9PrKQIkCQqFoIiQFBGlFIB5nvM8t9aOX2Nd18oDzjnPgCDpn/BH4zh2XZdlWVmWiUK4IgCBoFMUz9eP6zRN75cLgEQhcmTQIbl72O0f9865qLAAsURAAgKBJKEtgLXWvyjLuFsThCSstb8rBCaAQhDYWgIZ7myM+TUBjDHrHlZcbMYYk34cN0YSLcgS+wL0fe9TXDMbY33fR2AYBvyQ8L0Gk8MwREBrTfKe4TpTzwhArXWi8HI84h/1DfwI5mhxJamFAAAAAElFTkSuQmCC ") left top no-repeat;
        }
        a.dir {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAd5JREFUeNqMU79rFUEQ/vbuodFEEkzAImBpkUabFP4ldpaJhZXYm/RiZWsv/hkWFglBUyTIgyAIIfgIRjHv3r39MePM7N3LcbxAFvZ2b2bn22/mm3XMjF+HL3YW7q28YSIw8mBKoBihhhgCsoORot9d3/ywg3YowMXwNde/PzGnk2vn6PitrT+/PGeNaecg4+qNY3D43vy16A5wDDd4Aqg/ngmrjl/GoN0U5V1QquHQG3q+TPDVhVwyBffcmQGJmSVfyZk7R3SngI4JKfwDJ2+05zIg8gbiereTZRHhJ5KCMOwDFLjhoBTn2g0ghagfKeIYJDPFyibJVBtTREwq60SpYvh5++PpwatHsxSm9QRLSQpEVSd7/TYJUb49TX7gztpjjEffnoVw66+Ytovs14Yp7HaKmUXeX9rKUoMoLNW3srqI5fWn8JejrVkK0QcrkFLOgS39yoKUQe292WJ1guUHG8K2o8K00oO1BTvXoW4yasclUTgZYJY9aFNfAThX5CZRmczAV52oAPoupHhWRIUUAOoyUIlYVaAa/VbLbyiZUiyFbjQFNwiZQSGl4IDy9sO5Wrty0QLKhdZPxmgGcDo8ejn+c/6eiK9poz15Kw7Dr/vN/z6W7q++091/AQYA5mZ8GYJ9K0AAAAAASUVORK5CYII= ") left top no-repeat;
        }
        a.up {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmlJREFUeNpsU0toU0EUPfPysx/tTxuDH9SCWhUDooIbd7oRUUTMouqi2iIoCO6lceHWhegy4EJFinWjrlQUpVm0IIoFpVDEIthm0dpikpf3ZuZ6Z94nrXhhMjM3c8895977BBHB2PznK8WPtDgyWH5q77cPH8PpdXuhpQT4ifR9u5sfJb1bmw6VivahATDrxcRZ2njfoaMv+2j7mLDn93MPiNRMvGbL18L9IpF8h9/TN+EYkMffSiOXJ5+hkD+PdqcLpICWHOHc2CC+LEyA/K+cKQMnlQHJX8wqYG3MAJy88Wa4OLDvEqAEOpJd0LxHIMdHBziowSwVlF8D6QaicK01krw/JynwcKoEwZczewroTvZirlKJs5CqQ5CG8pb57FnJUA0LYCXMX5fibd+p8LWDDemcPZbzQyjvH+Ki1TlIciElA7ghwLKV4kRZstt2sANWRjYTAGzuP2hXZFpJ/GsxgGJ0ox1aoFWsDXyyxqCs26+ydmagFN/rRjymJ1898bzGzmQE0HCZpmk5A0RFIv8Pn0WYPsiu6t/Rsj6PauVTwffTSzGAGZhUG2F06hEc9ibS7OPMNp6ErYFlKavo7MkhmTqCxZ/jwzGA9Hx82H2BZSw1NTN9Gx8ycHkajU/7M+jInsDC7DiaEmo1bNl1AMr9ASFgqVu9MCTIzoGUimXVAnnaN0PdBBDCCYbEtMk6wkpQwIG0sn0PQIUF4GsTwLSIFKNqF6DVrQq+IWVrQDxAYQC/1SsYOI4pOxKZrfifiUSbDUisif7XlpGIPufXd/uvdvZm760M0no1FZcnrzUdjw7au3vu/BVgAFLXeuTxhTXVAAAAAElFTkSuQmCC ") left top no-repeat;
        }
        html[dir=rtl] a {
            background-position-x: right;
        }
        #parentDirLinkBox {
            margin-bottom: 10px;
            padding-bottom: 10px;
        }
        #listingParsingErrorBox {
            border: 1px solid black;
            background: #fae691;
            padding: 10px;
            display: none;
        }
    </style>
    <title id="title">/home/liukairui/CODE/ 的索引</title>
</head>

<body>
    <div id="listingParsingErrorBox">糟糕！Google Chrome无法解读服务器所发送的数据。请<a
            href="http://code.google.com/p/chromium/issues/entry">报告错误</a>，并附上<a href="LOCATION">原始列表</a>。</div>
    <h1 id="header">/home/liukairui/CODE/ 的索引</h1>
    <div id="parentDirLinkBox" style="display: block;">
        <a id="parentDirLink" class="icon up" href="/home/liukairui/CODE/..">
            <span id="parentDirText">[上级目录]</span>
        </a>
    </div>
    <table>
        <thead>
            <tr class="header" id="theader">
                <th id="nameColumnHeader" tabindex="0" role="button">名称</th>
                <th id="sizeColumnHeader" class="detailsColumn" tabindex="0" role="button">
                    大小
                </th>
                <th id="dateColumnHeader" class="detailsColumn" tabindex="0" role="button">
                    修改日期
                </th>
            </tr>
        </thead>
        <tbody id="tbody">
            {{HERETOREPLACE}}
        </tbody>
    </table>
</body>
</html>
```

```js
var fs=require("fs");
var http=require("http");

var server=http.createServer();
server.on("request",function(req,res){
    var content="";
    res.setHeader("Content-Type","text/html;charset=utf-8")
    fs.readdir("./",function(error,files){
        if(error){
            res.end("404 Not Find");
            return;
        }else{
            files.forEach(function(FILENAME){
                content+=`<tr><td data-value="${FILENAME}/"><a class="icon dir" href="/home/liukairui/CODE/${FILENAME}/">${FILENAME}/</a></td><td class="detailsColumn" data-value="0"></td><td class="detailsColumn" data-value="1602264292">2020/10/10 上午1:24:52</td></tr>`
            })
        }
    });
    fs.readFile("./index.html",function(error,file){
        if(error)   
            res.end("404 Not Find");
        else{
            // 暴力使用字符串替换实现
            res.end(file.toString().replace("{{HERETOREPLACE}}",content));
        }
    });
});

server.listen(3000,function(){
    console.log("working...");
})
```
其中对于要插入的HTML代码，可以把准备拼接的内容使用` `` `反引号包起来，这样就生成了模板字符串，特点是保留了空格回车等原样输出，可以实现替换指定内容，方法是  
```js
var arry=["BOB","KARRY"];
arry.forEach(function(username){
    console.log(`123${username}123`);
})
```
模板不能提前定义，否则报错找不到变量 

对于比较复杂的网页需要模板引擎(类似于angular的模板)此处使用art-template  
此类模板的原理比较简单，就是在给定板子中找特定变量，然后替换，支持类似`*ng-for`这样的循环构造操作  
常见的模板引擎有两种形式 在客户端完成渲染 在服务端完成渲染    


- 在客户端渲染  
    将准备被替换的内容写在`<script text/template></script>`中,在script中写替换变量，详见[中文翻译文档](http://aui.github.io/art-template/zh-cn/docs/index.html)

- 在服务端渲染
    选择npm在对应目录安装
    ```shell
    npm install art-template --save
    ```
    HTML文件中的变量使用`{{variable}}`括起来  
    HTML中循环构造使用`{{each array}}{{$value}}{{/each}}`相当于`*ngFor="let value in array`注意的是每次遍历的值写成`{{$value}}`不变  
    ...
    获取HTML文件，之后使用render命令替换
    ```js
    var template=require("art-template");
    
    fs.readFile("./XXX.html",function(error,data){
        if(error){
            res.end("404");
            return;
        }
        var htmls = template.render(data.toString(),{
            // datas JSON Obj
        });
        res.end(htmls);
    });
    ```

这个项目中我们需要获取目录信息所以选择了服务端渲染  

- 服务端渲染与客户端渲染的区别
  - 服务端渲染
    - 是通过服务器获取模板文件然后在服务端完成页面的替换，直接将成品HTML代码发送到客户端
    - 服务端只进行一次请求就可以获取全部文件
    - ctrl+u查看网页源代码/F12都可以直接看到
  - 客户端渲染
    - 服务端发送模板文件到客户端，客户端浏览器发现还有变量没有替换将需要的变量请求发送到服务端，服务端返回变量值，客户端渲染结果
    - 服务端需要发送至少两次请求(模板+变量)才可以渲染页面
    - ctrl+u看不到内容,F12可以看到元素
  - 优缺点
    - 服务端的需要发送的内容是一次性，而且量大所以速度慢，客户端的多次小量所以速度快
    - 在项目中我们一般采用客户端与服务端结合的渲染方式，这是因为SEO只能爬到服务端渲染的网页，没法发送AJAX所以无法获取客户端渲染页面，客户端渲染的加载快，所以要两者结合。不需要SEO的还想要用户体验好的用客户端，需要SEO的用服务端口

## 实现留言版功能

- 在实际搭建网页的时候我们最好将用于服务的文件与网页的html,css,js分离，一般做如下分块
  - `./app.js` 服务端文件
  - `./views` 放置HTML文件
  - `./public` 放置可能被浏览器访问的文件，css,js,img,lib...文件夹分别存储css,js,img,第三方文件(例如jQuery,bootstrap)

这样做的目的是设置权限让浏览器可以访问部分文件，例如在某次请求中浏览器直接返回了HTML原文，浏览器解析的时候发现要link一下style.css 那么浏览器会再次向服务器发送请求，这个时候服务器要可以返回这个css文件，但是又不能说浏览器像访问什么就给什么，于是将可能会被浏览器请求的文件(css,js,img,video...标签中有href,link的)放在一个文件夹下面

当然一个一个文件判断太麻烦了，可以在`if(url==='/')else if`的最后一个else写下
```js
var url=req.url;
var reg=new RegExp("^\/public\/","i");
else if(reg.test(url)){
    fs.readFile("."+url,function(error,data){
        if(error){
        res.end("404");
        return;
        }
        res.end(data);
    })
}
```
对于判断是不是`/public/`开头的还可以写成`req.indexOf("/public/")===0`  
值得注意的是访问的时候要在用户访问的url前面加上`.`否则直接访问到根目录了  
之后同理写出404页面  
```js
if(error){
    fs.readFile("./views/404.html",function(err,dat){
        if(err)
        res.end("404 Not Find.")
        else
        res.end(dat);
    });
    return;
}
```
还要注意就是不要写`res.setHeader("Content-Type","text/html;charset=utf-8")`否则传css直接炸了，所以不要写就完事，那么HTML的utf8也没了，直接在HTML文件写下`<meta charset="UTF-8">`这个和前面`res.setHeader("Content-Type","text/html;charset=utf-8")`是一样的，但是只对HTML有效，比较方便 

美化url: 现在很多网站都是`www.XXX.com/xxx/xxx/`而不是`www.XXX.com/xxx/xxx/YYY.html`了，我们也可以实现这个美化功能，很简单，就是在所有的html的a标签中全不屑.html,然后改下node的判断就完事

表单提交页面的验证

姓名验证 最短2个最长10个，提示信息，设置name否则无法提交
```html
<input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
```
内容验证 最短5个最长20个，提示信息，设置name否则无法提交
```html
<textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
```

表单提交有两种

  - 默认的同步提交行为
  - 异步提交

将get请求解析成对象: node中有一个url模块，可以使用`url.parse(req.url,true)`返回一个Url对象，里面包含pathname为请求地址(没有get信息)，query是请求字符串的对象形式

将提交成功的页面重定向到首页

  - 将状态码设置到302代表临时重定向
  - 在响应头中告诉客户端重定向到那里，一旦受到302就会发起新请求
```js
res.statusCode=302;
res.setHeader("Location","/");
res.end();
```
永久重定向和临时重定向的区别是

  - 永久301 临时302
  - 永久重定向浏览器收到一次以后就会记住，之后访问就不请求直接跳转
  - 临时重定向不记忆

成品

html文件
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/public/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1><a href="/">首页</a> <small>发表评论</small></h1>
    </div>
  </div>
  <div class="comments container">
    <!-- 
      以前表单是如何提交的？
      表单中需要提交的表单控件元素必须具有 name 属性
      表单提交分为：
        1. 默认的提交行为
        2. 表单异步提交

        action 就是表单提交的地址，说白了就是请求的 url 地址
        method 请求方法
            get
            post
     -->
    <form action="/commit" method="get">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
      </div>
      <div class="form-group" >
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
    </form>
  </div>
</body>

</html>
```

js文件
```js
var http=require("http");
var fs=require("fs");
var template=require("art-template")
var urlM=require("url");
var server=http.createServer();
var comments=[
  {name:"LiuKairui",message:"Test1",dateTime:"20200101"}
]

server.on("request",function(req,res){
  var url=req.url;
  var reg=new RegExp("^\/public\/","i");
  if(url==='/'){
    fs.readFile("./views/index.html",function(error,data){
      if(error){
        fs.readFile("./views/404.html",function(err,dat){
          if(err)
            res.end("404 Not Find.")
          else
            res.end(dat);
        });
        return;
      }
      var htmls=template.render(data.toString(),{
        comments:comments
      });
      res.end(htmls);
    })
  }else if(url==="/post"){
    console.log("WORK POST");
    fs.readFile("./views/post.html",function(error,data){
      if(error){
        fs.readFile("./views/404.html",function(err,dat){
          if(err)
            res.end("404 Not Find.")
          else
            res.end(dat);
        });
        return;
      }
      res.end(data);
    })
  }else if(reg.test(url)){
    fs.readFile("."+url,function(error,data){
      if(error){
        fs.readFile("./views/404.html",function(err,dat){
          if(err)
            res.end("404 Not Find.")
          else
            res.end(dat);
        });
        return;
      }
      res.end(data);
    })
  }else if(urlM.parse(url,true).pathname=="/commit"){
    comments.push({name:urlM.parse(url,true).query.name,message:urlM.parse(url,true).query.message,dateTime:new Date().toDateString()})
    res.statusCode=302;
    res.setHeader("Location","/");
    res.end();  
  }else{
    fs.readFile("./views/404.html",function(err,dat){
      if(err)
        res.end("404 Not Find.")
      else
        res.end(dat);
    });
  }
});

server.listen(3000,function(){
  console.log("working...");
})
```

## [杂]几种遍历元素内容的方法

1. JS原生的for
2. ES5开始支持的遍历 `obj.forEach(function(item[,index,array]){})` IE8+
3. jQuery**函数**的方法`$.each(obj,function(i,item)`注意这个obj是普通js数组
4. jQuery**实例**的方法`$obj.each(function(index,element))`
5. jQuery数组可以转化成一般的js数组，方法是`[].slice.call($arry)`原理是  

slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。你只需将该方法绑定到这个对象上。 一个函数中的 arguments 就是一个类数组对象的例子。
```
function list() {
  return Array.prototype.slice.call(arguments);
}
```
因为[]是继承自Array，所以[].slice跟Array.protptype.slice都是指向同一个方法
```
[].slice === Array.prototype.slice; // true
```
于是我们就多了一种转化数组的方法  
对于可遍历的对象，可以通过Array.from()来转化  
对于类数组(有length属性的)，就可以用[].slice.call()或者Array.prototype.call()来转化   

call($arr)相当于是$arr是函数中的this,然后这个this被切割开做成数组，切割是函数是`Array.prototype.clice()`函数，也就是`[].clice()`  
clice的功能是，有一个参数的时候返回数组的第一个参数位置到最后，两个就是遍历一个左闭右开的数组，不写就是从头到尾

## node的console
在浏览器中我们可以使用console进行简单的小测试，在node中也可以，在cmd下输入node,回车，就进入了node的console,与python和浏览器不同的是他在使用核心模块的时候可以直接调用不需要require

## 模块系统

- 在node中编写应用程序主要就是在使用
  - ECMAScript
  - 核心模块
  - 第三方模块
  - 自定义模块
- 核心模块主要是
  - 文件系统`fs`
  - http服务`http`
  - url路径解析`url`
  - path路径处理`path`
  - 操作系统`os`
- 第三方模块有
  - art-template
  - 通过npm下载使用

### 什么是模块化

如果一个平台具有

- 文件作用域
- 通信规则  
  - 加载 require
  - 导出 
  就可以说他具有模块化

### CommonJS模块规范
JS本身是不支持模块化的，在Node中的JS有模块系统

- 有模块作用域
- 使用require来加载模块
- 使用exports导出模块
  - 使用exports.XX=XX导出XX变量或方法
  - 使用exports导出的是整个模块，需要使用实例去接受这个模块然后用实例.变量的方法获取元素
  - 如果只是需要一个变量或者方法的时候可以在模块中写`module.exports=对象`，之后require得到的就是具体的变量/方法

### 加载require
语法:
```js
var 自定义的实例=require("模块")
```
作用是
- 执行模块中的所有代码
- 将模块中要到导出的元素赋值给自定义实例

### 导出exports
- node是模块作用域，默认文件中的所有成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，就需要吧变量赋值到exports中
- 如果要导出多个成员
```js
exports.XX=XX;
```
- 如果要导出单个成员
```js
module.exports=XX;
```
别这样写多了否则覆盖了之前的了

**原理**  
在node中，每个模块都有一个module对象，在这个module中还有一个exports对象，这个对象默认是空对象，默认node会在代码的最后写一句`return module.exports`谁来require这个模块，谁就得到了`module.exports`, 我们发现每次导出的时候都要`module.exports.XXX=XXX`很麻烦，node又在前面补了一句，成了
```js
var exports=module.exports;

// 你写的代码

return module.exports;
```
一个是module的一个是全局的，注意module不是全局  
结果你上来就让exports=function直接修改了exports的指针，之后挂载的也直接挂载到函数上了，和原来的module没关系了

如果真的要纠结语法确实可以写成`module.export={obj1,obj2,obj3,obj4...}`

### require的加载规则
尝试案例
A.js
```js
require('./B');
require('./C');
```
B.js
```js
console.log("B加载成功");
require('./C');
```
C.js
```js
console.log("C加载成功");
```
执行A.js发现结果是
```
B加载成功
C加载成功
```
原因是A先执行，然后进入B中，B输出之后直接require进入C中,C执行结束，B执行结束，A执行下一行，发现C已经require过了，于是不执行代码，只获取接口对象  
这是require缓存优先加载的原则，不会重复加载，只获取接口  
我们将require()中的内容叫做模块标识符

- .js后缀可以省略
- 如果标识符没有路径标识会被认为是核心模块/第三方模块(所以至少个`./`)
- 核心模块的本质是文件，但是他已经被二进制编译，所以直接写名字就可以了
- 如果写的标识符没有路径，也没有模块名，那么找的就是./node_modules/三方模块名，之后找package.json文件的main的模块入口，如果找不到文件或者main就会自动找indexd.js，如果还是没有就去上级目录找，以此类推，还是找不到就报错，其中node可以通过./package-lock.json文件查询是不是已经安装的包。
- 保证一个项目最多有一个node_modules/文件夹

综上，node对于一个模块的加载顺序是

- 优先缓存加载
- 核心模块加载
- 路径形式的文件夹加载
- 第三方模块

更多底层细节见[https://blog.csdn.net/zhangyuan19880606/article/details/51508699](https://blog.csdn.net/zhangyuan19880606/article/details/51508699)

## npm

npm是node-package-manager

./node_module显示了所有node安装的三方包，但是这个文件夹的内容似乎比自己install的多，原因是install的时候某一个包可能会依赖多个包，那么所有的包都会被下载，所以从node_module文件夹很难看出来安装了那些包，我们希望在目录下有一个"说明书"告诉我们安装了什么包，方法是在创建项目文件夹后`npm init`按照提示输入
```bash
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (XX) # 此处填写项目名称，按回车就默认括号里的
version: (1.0.0) # 此处写版本号
description: # 此处写项目描述
entry point: (index.js) # 此处写入口js文件
test command: # 包发布相关 直接回车
git repository:  # github仓库地址 直接回车
keywords: # 关键字 直接回车
author: # 项目作者
license: (ISC) # 开源协议
About to write to /.../package.json:

{
  ...
}


Is this OK? (yes)
```
成功创建`package.json`
之后安装的包就会将相关信息写入
```
"dependencies": {
  "art-template": "^4.13.2",
  "jquery": "^3.5.1"
}
```

在install的时候还会创建一个`package-lock.json`文件，这里面会显示所有的包与文件依赖，在npm-install的时候加上`--save`就会把依赖写入文件(5.0+之后可以不写)，例如
```bash
npm install jquery
nom install art-template --save
```
```json
"jquery": {
  "version": "3.5.1",
  "resolved": "https://registry.npm.taobao.org/jquery/download/jquery-3.5.1.tgz",
  "integrity": "sha1-17TQjhv9uGrS8aPQOeoXMEcXq7U="
},

"art-template": {
  "version": "4.13.2",
  "resolved": "https://registry.npm.taobao.org/art-template/download/art-template-4.13.2.tgz",
  "integrity": "sha1-TEy9RN4IqtAxZgJAhx9Fx9c3z8E=",
  "requires": {
    "acorn": "^5.0.3",
    "escodegen": "^1.8.1",
    "estraverse": "^4.2.0",
    "html-minifier": "^3.4.3",
    "is-keyword-js": "^1.0.3",
    "js-tokens": "^3.0.1",
    "merge-source-map": "^1.0.3",
    "source-map": "^0.5.6"
  }
},
```

我们在一个没有node_module的环境下只需要`npm install`node就可以自动通过两个json文件下载依赖

**package.json与package-lock.json的区别**:  
package.json里面定义的是版本范围（比如^1.0.0），具体跑npm install的时候安的什么版本，要解析后才能决定，这里面定义的依赖关系树，可以称之为逻辑树（logical tree）。node_modules文件夹下才是npm实际安装的确定版本的东西，这里面的文件夹结构我们可以称之为物理树（physical tree）。安装过程中有一些去重算法，所以你会发现逻辑树结构和物理树结构不完全一样。package-lock.json可以理解成对结合了逻辑树和物理树的一个快照（snapshot），里面有明确的各依赖版本号，实际安装的结构，也有逻辑树的结构。其最大的好处就是能获得可重复的构建（repeatable build），当你在CI（持续集成）上重复build的时候，得到的artifact是一样的，因为依赖的版本都被锁住了。在npm5以后，其内容和npm-shrinkwrap.json一模一样。  
package-lock.json 是生成的系统当前安装的库的具体来源和版本号，锁定版本。  
当你执行npm install的时候， node会先从package.json文件中读取所有dependencies信息，然后根据dependencies中的信息与node_modules中的模块进行对比，没有的直接下载，node是从package.json文件读取模块名称，从package-lock.json文件中获取版本号，然后进行下载或者更新。  
当package.json与package-lock.json都不存在，执行"npm install XXXX"时，node会重新生成package-lock.json文件，然后把node_modules中的模块信息全部记入package-lock.json文件。但不会生成package.json文件。但是，你可以通过"npm init --yes"来生成package.json文件

**综上**，package.json要自己在创建项目的时候init一下，install的时候一定要--save，package-lock.json自动生成，两个都要留下就可以帮助我们构建相同的node_module环境

以上简述了npm的命令，同时nom也是一个命令行工具  
查看版本
```bash
npm --version
```

升级npm  
```bash
npm install --global npm
```
跳过向导init
```bash
npm init -y
```
下载包(i是instal缩写 -S是--save缩写)
```
npm i -S <name>
```
删除包不删除依赖
```
npm unstall <name>
```
删除包删除依赖
```
npm unstall --save <name>
```
帮助
```
npm --help
```
XXX命令的帮助
```
npm XXX --help
```
[还有很多命令](https://www.runoob.com/nodejs/nodejs-npm.html)

同时npm还是一个网站名，所有的三方包全是从npm网站下下来的

## 使用npm
众所周知，npm服务器在国外，所以网速慢，可以只用国内的淘宝的镜像站的cnpm，淘宝站每10min更新一次  
安装方法比较简单
```shell
npm install --global cnpm
```
--global意思是为所有的文件夹安装cnpm  
之后只需要吧所有的npm换成cnpm就可以了，不过cnpm的安装提示和npm不一样，没有进度条，但是不影响，之后使用cnpm，都会直接从淘宝下载文件

如果不想安装cnpm可以直接
```bash
npm install XXXX -g --registry=https://registry.npm.taobao.org
```
XXXX是要安装的包名
如果不想安装cnpm也不想写网址可以
```
npm config set register https://registry.npm.taobao.org
```

## 文件操作路径与模块标识
文件操作中的`./`路径可以省略例如`./tmp/a.cc`可以写成`tmp/a.cc`  
模块操作中的`./`不可以省略,但是`.js`可以省略
`/`表示的是磁盘根目录


## Express 起步

原生node的HTTP在某些方面不足以应对我们的开发需求，所以我们需要一些框架来加快我们的开发效率，这就是框架的目的  
在node中有很多框架，我们选择[express](https://www.expressjs.com.cn/)这是一个快速，开放轻量的的Node.js框架

### 简单使用
安装方法是
```bash
npm install express --save
```
简单上手,对比之前写的  
引包
```js
var express = require("express");
```

创建服务程序(和http.creatServer)
```js
var app=express();
```

当服务器收到get请求且url为`/'的时候的回调函数
```js
app.get("/",function(req,res){
    // send返回信息 但是以前的什么res.write-res.end还是可以用
    res.send("Hello")
})
```
请求剥离
```js
// 注意此时可以接受/submits /submits?123=456&789=456...
app.get("/submits",function(req,res){
    // 直接和url模块true的query一样
    console.log(req.query);
    res.send("Hello")
})
```
当服务器收到get请求且url为`/about'的时候的回调函数,注意此时我们不需要写文件头
```js
app.get("/about",function(req,res){
    // send返回信息
    // 这里不需要utf8，你也看不到浏览器受到的资源中有charset，可以看到Accept-language有zh-cn，而有的时候发送网页的时候又可以看到那个charset
    res.send("about关于")
})
```
公开指定目录 前面是url 后面是文件夹 直接实现了之前那个公开文件的功能
```js
app.use('/public/',express.static('./public/'));
// 浏览器直接访问 http://127.0.0.1:3000/public/demo.css
```
加载监听
```js
app.listen(3000,function(){
    console.log("working");
})
```
把前面的代码自己顺序组合就是之前写的开放文件夹项目

还可以在express中使用[art-template](http://aui.github.io/art-template/zh-cn/express/index.html)

### Express 自动重启服务

实现了修改完代码自动重启express与node服务器,名字叫nodemon  
安装方法:
```shell
sudo npm install --global nodemon
```
之后启动node服务的时候需要把`node app.js`换成`nodemon app.js`

### 路由
可以联想到路由器,路由就是`app.get("/")`这个过程,为这个页面开启了允许访问的路径,路由的作用就是告知“路在何方”,或者说路由是一组映射关系，分析URL将访问的内容映射到实际的action或者controller上。  
也就是话`app.get("/",function(){})`就是要服务器得到/请求就执行对应的回调函数  
`app.get("/",function(){})`只能获取get的请求,`app.post("/",function(){})`可以获取post请求

### 公开文件夹
公开指定目录 前面是url 后面是文件夹 直接实现了之前那个公开文件与加文件头的功能,例如
```js
app.use("/public/",express.static("./public"));
```
用户可以做如下访问
- public下的demo.html`http://127.0.0.1:3000/public/demo.html`
- public/demo2/demo3.txt`http://127.0.0.1:3000/public/demo2/demo3.txt`

省略第一个参数的时候可以直接访问,例如
```js
app.use(express.static("./public"));
```
用户可以做如下访问
- public下的demo.html`127.0.0.1:3000/demo.html`
- public/demo2/demo3.txt`http://127.0.0.1:3000/demo2/demo3.txt`

两个方法都是可以接受的不过第一种方法更常用,因为有一个极端的例子
```js
app.get("/demo",function(req,res){
    res.send("???")
})

app.use(express.static("./public"));
```
在./public/下面也有一个demo文件,那么页面会显示???
```js
app.use(express.static("./public"));

app.get("/demo",function(req,res){
    res.send("???")
})
```
在./public/下面也有一个demo文件,那么页面会显示public/demo的文件内容

最后请注意,第一个参数是url的前几个字符,第二个参数是物理路径,不要求他们相同

最后还有一种写法
```js
app.use('./static',express.static(path.join(__dirname,"public")))
```
express文档是这么说的  
然而，您提供给express.static函数的路径是相对于您**启动节点进程的目录**的。 如果您从**另一个目录运行**Express App，则使用要**提供服务的目录的绝对路径**更为安全,可以这样理解，第一个是相对路径写法，而第二个是绝对路径写法。

- __dirname为绝对路径
- path.join()为拼接路径语法
- 需要`var path=require("path")`(核心模块)

## express重写留言是显示,把data换成data.toString()会有所改进,但是还是有概率下文件  版
### 如何发送一个纯静态网页?  
  如果使用之前的方式
  ```js
  app.get("/post",function(req,res){
      fs.readFile("./views/post.html",function(error,data){
          if(error){
              res.render("404.html");
              return;
          }
          res.send(data);
      })
  })
  ```
  会莫名出现网站文件被直接下载而不
  可以使用这种方式
  ```js
  app.get("/post",function(req,res){
    fs.readFile("./views/post.html",function(error,data){
        if(error){
            res.render("404.html");
            return;
        }
        res.sendFile(__dirname+"/views/post.html");
    })
  })
  ```
  注意改正后如果还是直接下载文件,f12-network-disableCharge  
  但是这个办法要求路径要写全,比较麻烦,可以使用模板引擎的API

### express的模板引擎  
  **注意**在原生http中是没有模板引擎这个概念的,需要使用例如art-template来加载模板引擎,使用`template.render`进行渲染  
  express为所有的模板引擎提供了接口,只要吧模板引擎接口和模板引擎连起来就可以直接用express方法工作了  
  所以,注意,在express中我们是使用express的方法进行渲染,只不过这些方法是实现是由模板引擎实现的

### 使用art-template模板引擎  
1. 安装art-template的express版本
```shell
npm install --save art-template
npm install --save express-art-template
```
2. 将express模板引擎的接口与art-template模板引擎实现链接起来(激活express定义的模板引擎接口)
```js
app.engine('art', require('express-art-template'));
```
这句话的意思是,一旦express的模板引擎接口遇到art结尾的文件就使用art的模板引擎,但是我不喜欢用art后缀,因为这样高亮都没了(send-file不是模板引擎接口,他就是个普通传网页的)
```js
app.engine('html', require('express-art-template'));
```
上面的代码中的express-art-template是art-template的express整合版,运行的时候依赖art-template包  

3. 发送渲染文件  
在原生http中我们是
```js
var htmls=template.render(data.toString(),{
  comments:comments
});
res.end(htmls);
```
先渲染文件,之后吧渲染结果发送回去
```js
res.render('index.html',{comments:comments});
```
现在我们是直接调用了express的res的render方法(res变量接受的是来自于express.get的元素,所以是express元素,而不是和元素一样是template的元素)这个方法看到有`app.engine('art', require('express-art-template'));`于是激活,并且看到index.html是前面说的html格式结尾的,所以直接按照前面声明的使用art进行渲染,之后将渲染结果发送回去

可以发现,我并没有指定index.html的具体路径这是因为**express的作者**(因为render是express方法)约定将静态页面文件全部存储到`./views`下面,所以程序就直接去文件夹下面找了,如果是在要改,使用这个命令
```js
app.set("views","默认路径")
```

- 借用这个api发送纯静态页面  
  现在我们知道了,我们可以使用这个express的render进行页面渲染,使用render方法进行页面渲染的前提是,提前指定了`app.engine('html', require('express-art-template'));`告诉了express当有html文件调用这个渲染命令的时候直接将原生的渲染接口链接到art进行渲染  
  于是页面得以渲染和发送,前前后后都是express的方法在处理,只不过调用了art的实现,所以我们也可以将一个没有任何art命令的html文件放进去渲染,不写第二个参数,这样render一看是html文件,符合要求,直接扔给art,art一看没有需要处理的,于是直接返回,render看到了art的返回直接输出

**注意,一切的接口定义都是express的而不是art的,你可以修改engine的requeire使用别的引擎,但是后面的语法不变(因为这不依赖于引擎),甚至你可以自己写给引擎**

4. 完善事件处理函数

之前的元素http是统一使用了`on("quest",function(){})`  
但是在express中,分开了get与post,在HTML中的区别是

在客户机和服务器之间进行请求-响应时，两种最常被用到的方法是：GET 和 POST。

- GET - 从指定的资源请求数据。
- POST - 向指定的资源提交要被处理的数据  

明显,我们这个用post最好,于是我们写
```js
app.post("/hahaha",function(req,res){
    console.log("OK")
})
```
意思是当`127.0.0.1/hahaha`收到post数据之后的操作是在console下输出OK,我们需要修改HTML为
```diff
- <form action="/commit" method="get">
+ <form action="/hahaha" method="post">
```
注意要让/hahaha对上,不过我们可以吧hahaha改成网页的路径/post,这样更加统一,同时,前面的页面加载函数是`get("/post",...)`和这个`post("/post",...)`不冲突

之后完善post里面的内容,因为两个请求方式不一样,分别是
```
Get : 127.0.0.1:3000/commit/?name1=value1&name2=value2
Post: 127.0.0.1:3000/commit
```
post的内容不显示,所以不能用`req.query()`获取内容,我们需要express插件(人家叫中间件)实现获取post的内容,使用npm安装
```shell
npm install body-parser
```
文件头写这三行,req就会多出一个.body属性获取post数据的Object
```js
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//...
app.post("/post",function(req,res){
  console.log(req.body)
})
```

对get修改
```diff
- app.get("/commit",function(req,res){
+ app.post("/post",function(req,res){
-   var datas=req.query;
+   var datas=req.body;
    datas.dateTime=new Date().toString();
    comments.push(datas);
    res.redirect('/')
})
```

得到最后结果
views下只修改了post.html文件23行
```html
<form action="/post" method="post">
```
public文件没有修改
```js
var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var app=express();
// 当渲染以art结尾的文件的时候使用art-template 模板引擎,express-art-template是art-template的express整合版,依赖art-template包
app.engine('html', require('express-art-template'));
// app.set("views","默认路径")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var comments=[{name:"origin",message:"ORIGIN",dateTime:"2020-02-02"}]

app.get("/",function(req,res){
    fs.readFile("./views/index.html",function(error,data){
        if(error){
            res.render("404.html");
            return;
        }
        // 第一个参数不能写路径,默认会去viewers里面找,express约定将html放到view文件夹里面
        res.render('index.html',{comments:comments});
    })
})

app.get("/post",function(req,res){
    fs.readFile("./views/post.html",function(error,data){
        if(error){
            res.render("404.html");
            return;
        }
        res.render("post.html")
        // res.send(data.toString())
    })
})

// app.get("/commit",function(req,res){
//     var datas=req.query;
//     datas.dateTime=new Date().toString();
//     comments.push(datas);
//     res.redirect('/')
// })

// 两个都是post,只不过是网站恰好是post而已,同时前面的是get(post)与这个`post(post)`不重名
app.post("/post",function(req,res){
    var datas=req.body;
    datas.dateTime=new Date().toString();
    comments.push(datas);
    res.redirect('/')
})

app.use("/public/",express.static("./public"));

app.listen(3000,function(){
    console.log("Working...");
})
```

## CRUD起步

### 把页面画出来
1. 去BootStrap[下载一个模板](https://v3.bootcss.com/examples/dashboard/)用
2. 绑定数据
```js
var fs=require("fs");
var express=require("express");
var app=express();
// 加载渲染引擎
app.engine("html",require("express-art-template"))

// 这是定义在js中传统的对象
var titleArry=[
    {lab:"苹果",cont:"不好吃"},
    {lab:"香蕉",cont:"不好吃"},
    {lab:"矿泉水",cont:"好吃"},
    {lab:"花生",cont:"好吃"}
]

// 访问根元素
app.get("/",function(req,res){
    // readfile的时候加上utf-8这样就可以不用写data.toString,这样data直接就是字符串
    fs.readFile("./db.json","utf8",function(err,dat){
        if(err)
            return res.status(500).send("server error");
            // 读取错误返回500状态码,之后发送服务器错误
        res.render("index.html",{
            // 返回第一个就是对象:对象,第二个是对象:字符串转JSON对象然后到student
            titleArry:titleArry,
            stus:JSON.parse(dat).student
        });
    })
    
});

// 公开文件
app.use("/public/",express.static("./public/"))

app.listen(3000,function(){
    console.log("liuzihao shabi")
})
```
JSON文件如下
```json
{
    "student":[
        {"id":1, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":2, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":3, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":4, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":5, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":6, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"},
        {"id":7, "name":"张三", "gender":0, "age":18, "hobbits":"吃饭,睡觉,打豆豆"}
    ]
}
```
html的86-121行
```html
<div class="row placeholders">
  {{each titleArry}}
  <div class="col-xs-6 col-sm-3 placeholder">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
    <h4>{{$value.lab}}</h4>
    <span class="text-muted">{{$value.cont}}</span>
  </div>
  {{/each}}
</div>

<h2 class="sub-header">Section title</h2>

<a type="button" class="btn btn-success">添加学生</a>

<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>爱好</th>
      </tr>
    </thead>
    <tbody>
      {{each stus item}}
      <tr>
        {{each item item1}}
          <td>{{item1}}</td>
        {{/each}}
      </tr>
      {{/each}}
    </tbody>
  </table>
</div>
```

- 注意html文件中的双重循环嵌套命名变量的方法  
一重直接用$value $index
```html
{{each titleArry}}
<div class="col-xs-6 col-sm-3 placeholder">
  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
  <h4>{{$value.lab}}</h4>
  <span class="text-muted">{{$value.cont}}</span>
</div>
{{/each}}
```
二重指定变量名
```html
{{each stus item}}
<tr>
  {{each item item1}}
    <td>{{item1}}</td>
  {{/each}}
</tr>
{{/each}}
```

### 路由设计

|请求方法|路径|get参数|post参数|备注|
|-|-|-|-|-|
|GET|/student|-| |渲染首页|
|GET|/student/new|-||添加学生页面|
|POST|/student||表单数据|添加学生请求|
|GET|/student/edit|id||修改学生页面|
|POST|/student/edit||表单数据|修改学生请求|
|POST|/student/delete|-||删除学生页面|

### 创建路由表

我们希望将所有的路由文件全部放在一个文件夹方便我们的管理,但是我们仍然希望将原来的app.js作为主程序的入口,做法是
router.js
```js
module.exports=function(app){
  app.get("/student/new",function(req,res){
    ...
  });
  ...
}
```
app.js
```js
vat router=require("./router");
router(app);
```
这种方式固然可以,但是express提供了一种更简单的方法实现路由的封装操作(主要是有高亮和代码提示)

正常在router中写文件,在文件头正常声明,加入
```js
var router=express.Router();
```
这样就创建了一个路由容器  
之后,我们将需要进行路由的函数挂载到路由容器上面,也就是将原来的app.get/post换成router.gey/post
```js
router.get("/student/new",function(req,res){
  ...
});
```
最后需要将容器导出
```js
module.exports=router;
```
在app.js中执行
```js
app.use(router)
```

此时app.js代码变成
```js
var fs=require("fs");
var router=require("./router.js");
var express=require("express");
var app=express();
app.engine("html",require('express-art-template'));

app.use("/public/",express.static("./public/"))
app.use(router)

app.listen(3000,function(){
    console.log("liuzihao shabi")
})
```
router.js
```js
var fs=require("fs");
var express=require("express");
// 创建一个路由容器
var router=express.Router();
// 将路由挂载到router上面
router.get("/student",function(req,res){
    // 除了data.toString 的方法
    fs.readFile("./db.json","utf8",function(err,dat){
        if(err)
            return res.status(500).send("server error");
        res.render("index.html",{
            titleArry:titleArry,
            stus:JSON.parse(dat).student
        });
    })
    
});
// 将router导出
module.exports=router;
```
于是我们实现了模块化

- app.js的任务就变成了
  - 启动服务
  - 配置服务
    - 模板引擎
    - body-parser 解析的配置
    - 设置静态资源
    - 挂载路由
    - 监听
- router.js任务就变成了
  - 处理路由
  - 根据不同的请求设置路径

### 封装RUID函数

凡是想要得到一个异步函数的计算结果那么也需要一个异步的回调函数
```js
function fn(){
  var data;
  setTimeOut(function(){
    var data=0;
  },1000)
  return data;
}

console.log(fn())
```

我们希望获取data=0这个返回值,但是这样是得不到的,因为在执行fn()的时候先定义了data,之后执行定时器,定时器是一个异步函数,他被直接扔到事件队列中了,之后直接return,等console.log之后data才会变化  
所以,要用异步函数打败异步函数,我们可以定义一个远程的异步函数,让他在修改之后再执行异步函数

一般用传入的回调函数获取异步函数的内容
```js
function fn(callback){
  var data;
  setTimeOut(function(){
    var data=0;
    callback(data);
  },1000)
  return data;
}

fn(function(data){console.log(data)});
```
可能会担心闭包的问题,例如
```js
var item=150

function fn(callback){
    var item=50;
    setTimeout(function(){
        callback()
    },1000);
}

fn(function(){
    console.log("VAL ",item);
})
```
放心,因为函数是对象,所以传递函数就是传递地址,所以执行函数的时候还是在fn里面执行,上面这个结果就是`VAL 150`,或者可以`console.log(this)`看到的是global

根据这个方法我们就可以实现查找所有数据的功能了
```js
router.get("/student",function(req,res){
    ruid.FindAll(function(error,students){
        if(error)
            return res.status(500).send("SERVER ERROR");
        res.render("index.html",{
            students:students
        });
    })
})
```

```js
module.exports.Add=function(stu,feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        var stus=JSON.parse(dat).student;
        stus.push(stu);
        fs.writeFile("./DB.json",JSON.stringify({student:stus}),function(error){
            if(error){feedbback(error);return;}
            feedbback(null)
        })
    })
}
```
同理可以实现其余的请求,值得注意的是

- object没有foreach函数,只有in
- 可以用
```js
res=arry.find(function(item){
  return item.xx===xx
})
```
find的结果是对象,res就是当arry中的item元素的xx满足xxx的时候的对象,注意,对象是指针,可以直接对arry操作.别忘了写return  
同理还有findIndex获得下标
- 有的时候我们想post一个网页中有的但是用户不能修改的元素可以使用隐藏表单元素,例如
```js
<input type="hidden" name="id" value="{{student.id}}">
```
- 传入的数字什么的看看是不是字符串,防止出现string===number

全部代码

index.js
```js
var fs=require("fs");
var express=require("express");
var bodyParser=require("body-parser");
var router=require("./router")
var app=express();
app.engine("html",require("express-art-template"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/public/",express.static("./public"));
app.use(router)

app.listen(3000,function(){
    console.log("Working...")
})
```
router.js
```js
var fs=require("fs");
var express=require("express");
var bodyPares=require("body-parser");
var ruid=require("./ruid")
var router=express.Router();

/** Router
 *  Get   /student        index.html
 *  Get   /student/new    new.html
 *  Post  /student/new    id name sex age hobby
 *  Get   /student/edit   id
 *  post  /student/edit   student
 *  Get   /student/delete id
 */

/** RUID
 *  Add(student)
 *  Del(id)
 *  FindAll()
 *  FindID(id)
 *  Upd(stu)
 */

var nowID = 3;

router.get("/",function(req,res){
    res.send("Welcom");
});

router.get("/student",function(req,res){
    ruid.FindAll(function(error,students){
        if(error)
            return res.status(500).send("SERVER ERROR");
        res.render("index.html",{
            students:students
        });
    })
})

router.get("/student/new",function(req,res){
    res.render("new.html");
})

router.post("/student/new",function(req,res){
    var studnet = req.body;
    studnet.id=++nowID;
    ruid.Add(studnet,function(error){
        if(error)
            return res.status(500).send("SERVER ERROR");
        res.redirect("/student");
    })
})

router.get("/student/edit",function(req,res){
    var id=req.query.id;
    ruid.FindID(id,function(error,dat){
        if(error)
            return res.status(500).send("SERVER ERROR")
        res.render("edit.html",{
            student:dat
        });
    });
})

router.post("/student/edit",function(req,res){
    var stu=req.body;
    ruid.Upd(stu,function(error){
        if(error)
            return res.status(500).send("SERVER ERROR")
        res.redirect("/student")
    });
})

router.get("/student/delete",function(req,res){
    var id=req.query.id;
    ruid.Del(parseInt(id),function(error){
        if(error)
            return res.status(500).send("SERVER ERROR")
        res.redirect("/student")
    });
})

module.exports=router;
```

ruid.js
```js
const { ifError } = require("assert");
var fs=require("fs");

module.exports.Add=function(stu,feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        var stus=JSON.parse(dat).student;
        stus.push(stu);
        fs.writeFile("./DB.json",JSON.stringify({student:stus}),function(error){
            if(error){feedbback(error);return;}
            feedbback(null)
        })
    })
}

module.exports.Del=function(id,feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        id=parseInt(id);
        var stus=JSON.parse(dat).student;
        var delstu=stus.findIndex(function(item){
            return item.id===id;
        })
        stus.splice(delstu,1);
        fs.writeFile("./DB.json",JSON.stringify({student:stus}),function(error){
            if(error){feedbback(error);return;}
            feedbback(null)
        })
    })
}

module.exports.FindAll=function(feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        var stus=JSON.parse(dat).student;
        feedbback(null,stus);
    })
}

module.exports.FindID=function(id,feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        var stus=JSON.parse(dat).student;
        var fdstu=stus.find(function(item){
            return item.id===parseInt(id)
        })
        feedbback(null,fdstu);
    })
}

module.exports.Upd=function(student,feedbback){
    fs.readFile("./DB.json","utf8",function(err,dat){
        if(err){feedbback(err);return;}
        student.id=parseInt(student.id);
        student.sex=parseInt(student.sex);
        var stus=JSON.parse(dat).student;
        var upstu=stus.find(function(item){
            return item.id===student.id
        })
        for(key in student){
            upstu[key]=student[key]
        }
        fs.writeFile("./DB.json",JSON.stringify({student:stus}),function(error){
            if(error){feedbback(error);return;}
            feedbback(null)
        })
    })
}
```

index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学生管理系统</title>
    <link href="/public/lib/bootstrap.min.css" rel="stylesheet">
    <link href="/public/css/dashboard.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <form class="navbar-form navbar-right">
                    <input type="text" class="form-control" placeholder="Search...">
                </form>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Analytics</a></li>
                    <li><a href="#">Export</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item</a></li>
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                    <li><a href="">More navigation</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                </ul>
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h2 class="sub-header">学生管理系统</h2>
                <a type="button" class="btn btn-success" href="/student/new">添加学生</a>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Sex</th>
                                <th>Age</th>
                                <th>Hobby</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{each students student}}
                            <tr>
                                <td>{{student.id}}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.sex}}</td>
                                <td>{{student.age}}</td>
                                <td>{{student.hobby}}</td>
                                <td>
                                    <a href="/student/edit?id={{student.id}}">Edit</a>&nbsp;|&nbsp;
                                    <a href="/student/delete?id={{student.id}}">Delete</a>
                                </td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')
    </script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
```
edit.html
```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学生管理系统</title>
    <link href="/public/lib/bootstrap.min.css" rel="stylesheet">
    <link href="/public/css/dashboard.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <form class="navbar-form navbar-right">
                    <input type="text" class="form-control" placeholder="Search...">
                </form>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Analytics</a></li>
                    <li><a href="#">Export</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item</a></li>
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                    <li><a href="">More navigation</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                </ul>
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h2 class="sub-header"></h2>
                <form action="/student/edit" method="POST">
                    <input type="hidden" name="id" value="{{student.id}}">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" name="name" placeholder="name" value="{{student.name}}">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Age</label>
                        <input type="text" class="form-control" name="age" placeholder="age" value="{{student.age}}">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Sex</label>
                        <label class="radio-inline">
                            <input type="radio" name="sex" id="inlineRadio1" value="0" checked="{{!student.sex}}"> 男
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="sex" id="inlineRadio2" value="1" checked="{{student.sex}}"> 女
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Hobby</label>
                        <input type="text" class="form-control" name="hobby" placeholder="hobby" value="{{student.hobby}}">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')
    </script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
</body>

</html>
```
new.html
```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学生管理系统</title>
    <link href="/public/lib/bootstrap.min.css" rel="stylesheet">
    <link href="/public/css/dashboard.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <form class="navbar-form navbar-right">
                    <input type="text" class="form-control" placeholder="Search...">
                </form>
            </div>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Analytics</a></li>
                    <li><a href="#">Export</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item</a></li>
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                    <li><a href="">More navigation</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                </ul>
            </div>
            <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h2 class="sub-header"></h2>
                <form action="/student/new" method="POST">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" name="name" placeholder="name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Age</label>
                        <input type="text" class="form-control" name="age" placeholder="age">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Sex</label>
                        <label class="radio-inline">
                            <input type="radio" name="sex" id="inlineRadio1" value="0"> 男
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="sex" id="inlineRadio2" value="1"> 女
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Hobby</label>
                        <input type="text" class="form-control" name="hobby" placeholder="hobby">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <script>
        window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')
    </script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../../assets/js/vendor/holder.min.js"></script>
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
</body>

</html>
```
DB.json
```json
{
    "student": [{
        "id": 2,
        "name": "张三",
        "sex": 0,
        "age": 18,
        "hobby": "吃饭,睡觉,打豆豆"
    }, {
        "id": 3,
        "name": "张三",
        "sex": 1,
        "age": "18",
        "hobby": "吃饭,睡觉,打豆豆"
    }, {
        "name": "刘锴睿",
        "age": "19",
        "sex": 0,
        "hobby": "M",
        "id": 4
    }]
}
```

注意其中的异步编程思想

---

之后的内容

- Node与MongoDB
- Node与MySQL
- Node的AJAX
- Node的Promise/async
- ES与规范化