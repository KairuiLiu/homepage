---
title: Canvas学习笔记
date: 2020-10-31 00:00:21
toc: true
description: 讲了HTML中的Canvas，这个虽然建议在HTML&CSS学完马上学，但是用了JS的很多内容，还是JS基础学完在看吧。
categories:
  - [前端,HTML]
tags:
  - 前端
  - HTML
  - Canvas
  - 笔记
---
## HTML5的优势

跨平台:唯一一个通吃PC,Mac,Iphone,Android的跨平台语言

- 快速迭代
- 降低成本
- 导流入口多
- 分发效率高

## Canvas 基本用法
1. 什么是Canvas(画布)
   1. canvas是HTML5中的新增元素,可用于使用JavaScript中的脚本来绘制图形,创建动画,注意的是写Canvas的时候要标签要成对出现,这是为了提高兼容性, 另外Canvas的性能是极高的
   2. Canvas 的默认是透明背景,但是支持设定自己的背景
   3. Canvas 具有默认的宽高

2. 替换内容
    1. Canvas 不兼容IE9- 所以需要定义一个替换内容提示升级浏览器
    ```html
   <canvas id="test">
        <span>您的浏览器不支持画布元素请您换成萌萌哒谷歌浏览器</span>
    </canvas>
   ```
    这样支持Canvas 的浏览器会忽略包含的内容,只会正常渲染Canvas  
    不支持Canvas 的浏览器会现实代替内容

3. Canvas 的两个特殊属性
    - width,height 是Canvas的两个特殊属性, 注意的是当使用这两个属性的时候,只能在html标签上不用`style`写,不能用CSS写
    ```html
    <canvas id="test" width="500" height="500">
        <span>您的浏览器不支持画布元素请您换成萌萌哒谷歌浏览器</span>
    </canvas>
    ```
    但是不能写
    ```css
    #test{
        width: 500px;
        height: 500px;
    }
    ```
    原因是: 使用HTML的写法是扩大了Canvas的大小实现的设定,而CSS是对其直接进行放缩, 可以理解为HTML的写法是修改了`画布大小`, 但是CSS是修改了`图像大小`
    
4. 在Canvas中画图
   1. 取得画布: 方法是在`body`后面写`script`里面写
    ```js
    <script type="text/javascript">
        window.onload=function(){
            var testnode = document.querySelector("#test");
        }
    </script>
    ```
    2. 取得笔 
    ```js
    <script type="text/javascript">
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d");
            }
        }
    </script>
    ```
    先用if看看能不能取得画笔,如果可以就吧画笔给ctx(一般就这样命名) 然后要传一个值表示是在2D上画图(3D叫WebGL)  
    我们也一般称这个画笔为`渲染上下文`  
    Canvas上有一给叫`getContext()`的方法,这个方法可以用来获得渲染上下文和绘画功能,`getcontext`只有一个参数

## 在Canvas 中绘制矩形

**在HTML的Canvas中原生只支持绘制矩形,其他所有的图形都至少要绘制生成一条路径**

1. 绘制基础矩形
   
    Canvas中有三种绘制方法

    - 绘制一个填充的矩形(默认为黑色)
    ```js
    fillRect(x,y,width,height);
    ```
    - 绘制一个矩形边框(边默认为1px 黑色)
    ```js
    strokeRect(x,y,width,height);
    ```
    - 清除制定的矩形区域(清除的地方默认透明)
    ```js
    clearRect(x,y,width,height);
    ```
    例如可以使用如下方式画一个矩形, **一定注意,括号里面不能写px,但是默认px**
    ```js
    <script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
            ctx.fillRect(10,10,100,100);
            ctx.strokeRect(110,110,100,100);
            ctx.strokeRect(110.5,110.5,100,100);
            ctx.clearRect(50,50,100,100)
        }
    }
    </script>
    ```

    - 边框的问题  
        如果在吧上面的代码画出来放在PS中看,会发现其实边框有两个像素,有一个像素与黑块重合, 我们知道110px上是第110个黑块右下角那个分界点  
        想象画笔从哪里落笔,准备画图,一共是1px的边,所以左右都是0.5px, 想的是这么渲染, 但是没有0.5px 于是渲染成了左右1px,最后就是2px  
        如果是是在想画1px可以写成`ctx.strokeRect(110.5,110.5,100,100);` 
    - 清除方法
        实际上相当于覆盖了一个透明矩形,但是不是填充了一个同色的矩形(画个过渡色就看出来了)  
    - 存在的问题
        边框宽度,颜色不能改变,CSS无法直接选择Canvas的元素

2. 添加颜色和样式
   
    填充颜色相当于给画笔上颜料
    
    例如
    ```js
    <script type="text/javascript">
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d");
                
                ctx.fillStyle="deeppink";
                ctx.fillRect(10,10,100,100);
                ctx.strokeStyle="red";
                ctx.lineWidth=10;
                ctx.strokeRect(110,110,100,100);
                ctx.clearRect(50,50,100,100)
            }
        }
    </script>
    ```

    -  `.fillstyle` 填充的颜色, 和画边框没关系
    -  `.strokeStyle` 轮廓的颜色
    -  `.linerWidth` 轮廓的宽度,不能带单位(这里线宽度不接受: 0, 负数, Inf, NaN, 默认1.0)

    `Canvas` 绘制没有延迟加载!
3. lineJoin 的轮廓接合处的样式
    - round: 圆角
    - bevel: 斜角
    - mirer: 直角

## 绘制路径

Canvas 的基本元素是路径, 路径是通过不同颜色和宽度的线段和曲线连接形成的不同元素的点的集合

1. 步骤  
   - 确定路径的起始点
   - 使用画图命令画出路径
   - 把路径封闭
   - 路径一旦生成,就可以通过描边或填充路径区域来渲染图形
2. 绘制路径的基本函数
    - `.moveTo(x,y)` 先抬笔,然后将笔触移动到制定的坐标上
    - `.lineTo(x,y)` 先落笔,然后将与指定坐标之间连线
    
    一般情况下,如果只是用以上方法,必须是划线为一个封闭图形,可以通过以下方式简化过程

    - `.closePath()` 与开始点之间自动连接封闭
    - `.beginPath()` 写在路径开始之前 

    还有绘图函数

    - `.fill()` 填充颜色(可以自动闭合路径,也就是自动调用`.closePath`)
    - `.stroke()` 填充轮廓(不自动调用`.closePath`)

    部分实现原理: 应该是遇到画路径的命令之后路径命令会压入到一个存储器中,遇到fill之后就会把所以的路径全部取出,绘制,然后**还要放回**,除非遇到`.beginPath()`会清空

3. 重新绘制矩形

    之前绘制矩形的方式是直接渲染,这里我们采用类封装的方式通过路径实现矩形的绘制

    函数`.rect(x,y,width,height)`

    例如
    ```js
    <script type="text/javascript">
        window.onload = function(){
            testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d");

                ctx.rect(10,10,100,100);
                ctx.fill()
            }
        }
    </script>
    ```

4. 其他函数
    - `lineCap()`  
    lineCap是Canvas 2D API 指定如何绘制每一条直线的末端属性  
    可选值有三个:
        - butt: 线段末端以方形结尾
        - round: 线段末端与圆形结束
        - square : 线段末端以方形结束,但是结束之后会增加一个宽度与线段相同,高度是线段宽度一半的矩形区域 
    - `.save()`& `restore()`   
        `save()`与`restore()`相当于是一对**堆栈操作**  
        我们可以理解我们一般设置的样式会暂存在样式容器中, 调用`save()`样式容器的内容会作为一个对象去存储到样式栈(**不**清空样式容器, 但是任何向样式容器写入样式都会完全覆盖), 每次调用`restore()`会将样式栈弹出, 覆盖掉原有样式容器的内容  
        例如
        ```js
        <script type="text/javascript">
            window.onload=function(){
                var testnode = document.querySelector("#test")
                if(testnode.getContext){
                    var ctx = testnode.getContext("2d");
                    
                    ctx.save();
                    ctx.fillStyle="pink";
                    ctx.beginPath();
                    ctx.fillRect(50,50,100,100);
                    ctx.restore();

                    ctx.beginPath();
                    ctx.fillRect(150,150,100,100);
                }
            }
        </script> 
        ```

        在代码中, 我们绘制了两个矩形, 但是左上角的是粉色的, 右下角的是黑色的, 很容易理解的思想是**把`.save()`与`.restore()`认为是一个块级作用域, 像一个函数一样, 内部声明不支持外部**, 但是是错的, 应该理解为**第一个 `.save()`将默认样式入栈, 设置了新的样式, `.restore()` 把默认样式弹出放回样式容器**, 虽然效果与块级作用域的理解差不多...  
        所以我们推荐这样写Canvas
        ```js
        <script type="text/javascript">
            window.onload=function(){
                var testnode = document.querySelector("#test")
                if(testnode.getContext){
                    var ctx = testnode.getContext("2d");
                    
                    ctx.save();
                    // 设置样式一
                    ctx.beginPath();
                    // 写路径一
                    ctx.restore();
                
                    ctx.save();
                    // 设置样式二
                    ctx.beginPath();
                    // 写路径二
                    ctx.restore();
                }
            }
        </script> 
        ```
      最开始的那个`.save()`似乎没有用, 实际上是存储了默认样式,防止被覆盖, 栈操作可以嵌套, 就进配对原则(实际上就是栈的FLLF) 切记配对好

## 制作签名版

因为旧版课程找不到了, 只能从代码中理解为什么这样写

```html
<body>
    <canvas id="test" width="500" height="500"></canvas>
</body>
```
```js
<script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }

        if(testnode.setCapture){
            testnode.setCapture();
        }

        testnode.onmousedown = function(ev){
            ev = ev || window.event;
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
            document.onmousemove=function(ev){
                ev=ev||window.event;
                ctx.lineTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
                ctx.stroke();
            }
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                if(testnode.releaseCapture){
                    testnode.releaseCapture();
                }
            }
            ctx.restore();
            return false;
        }
    }
</script>
```

- `window.onload...` 加载窗体
- `var testnode =...` 拿到画布
- `if(testnode.getContext){... ` 拿到笔
- `if(testnode.setCapture){... ` 开启全局捕获(兼容IE)
- `testnode.onmousedown = function(ev){...` 鼠标点击动作 
- `ev = ev ||...` 兼容考虑, 如果浏览器给了ev 根据`||`的短路就是ev, 没给就赋值
- `ctx.moveTo(ev.cli...` 一旦点击就移动画笔
- `document.onmousemove=function(ev)...` 移动划线
- `document.onmouseup=function(){` 结束
- `if(testnode.releaseCapture){` 取消全局捕获

关于全局捕获: 

当我们给一个元素设置全局捕获以后，那么这个元素就会监听后续发生的所有事件，当有事件发生的时候，就会触发当前设置了全局捕获的元素。其他事件就跳过不执行了

- IE: 有setCapture方法，并且有效果
- 火狐: 有setCapture方法，但是没效果
- 谷歌: 没有setCapture方法

请注意, **如果直接在`testnode.onmousedown`里面设置样式是不起效果的**, 和py一样, 在运行的时候会忽略函数往下走, 直接走到`restore`就把数据清楚了, 所以我们要写到`...move`函数里面, 同样设置样式栈, 这样才可以修改笔画

```js
<script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }

        if(testnode.setCapture){
            testnode.setCapture();
        }

        testnode.onmousedown = function(ev){
            ev = ev || window.event;
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
            document.onmousemove=function(ev){
                ev=ev||window.event;
                // HERE
                ctx.save();
                ctx.strokeStyle="red";
                ctx.lineTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
                ctx.stroke();
                ctx.restore();
            }
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                if(testnode.releaseCapture){
                    testnode.releaseCapture();
                }
            }
            ctx.restore();
            return false;
        }
    }
</script>
```

值得注意的是`...move`内部是不能写`beganPath`的, 这样会清除`moveTo`的样式

有了这个我们可以轻松改样式, 例如修改笔触粗细
```js

<script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }

        if(testnode.setCapture){
            testnode.setCapture();
        }

        testnode.onmousedown = function(ev){
            ev = ev || window.event;
            ctx.save();
            ctx.beginPath()
            ctx.moveTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
            document.onmousemove=function(ev){
                ev=ev||window.event;
                // HERE
                ctx.save();
                ctx.strokeStyle="green";
                ctx.moveTo(ev.clientX-testnode.offsetLeft, ev.clientY-testnode.offsetTop);
                ctx.lineTo(ev.clientX-testnode.offsetLeft+10, ev.clientY-testnode.offsetTop+10);
                ctx.stroke();
                ctx.restore();
            }
            document.onmouseup=function(){
                document.onmousemove=document.onmouseup=null;
                if(testnode.releaseCapture){
                    testnode.releaseCapture();
                }
            }
            ctx.restore();
            return false;
        }
    }
</script>
```

## 使用Canvas绘制曲线

1. `.arc(Ox,Oy,r,deg_st,deg_ed)`, 参数分别是 原点的X坐标, 原点的y坐标, 圆的半径, 圆弧的起始角度, 圆弧的终止角度, 角度计算方法是: 0弧度在OX正方向, 然后顺时针增加, 单位为**弧度**, 转换角度可以用以下写法(270度为例) **270*Math.PI/180**, 实例:(绘制一个3/4扇形)
    ```js
    <script>
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d")
            }

            ctx.moveTo(50,50);
            ctx.lineTo(100,50);
            ctx.arc(50,50,50,0,270*Math.PI/180);
            ctx.lineTo(50,50);
            ctx.stroke();
        }
    </script>
    ```
2. `.arcTo(x1,y1,x2,y2.r)` 是一种"奇怪"的方式, 他一共有**三个**定位点, **第一个是当前画笔所在的位置**, 第二三的是函数里面的`x1,y1,x2,y2`, 构造方法是连线第一二个点, 连线第二三个点, 之后我们构造一个半径为`r`的, 与两条**线段**相**切**的圆, 得到内部的圆弧,(或者想成圆压到那个角里), 可以构造一样辅助的角与这个圆弧方便理解
    ```js
    <script>
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d")
            }

            // 辅助角
            ctx.beginPath();
            ctx.moveTo(100,100);
            ctx.lineTo(300,0);
            ctx.lineTo(200,200);
            ctx.stroke();

            // 圆弧
            ctx.save();
            ctx.strokeStyle="green";
            ctx.beginPath();
            ctx.moveTo(100,100);
            ctx.arcTo(300,0,200,200,50);
            ctx.stroke();
            ctx.restore();
        }
    </script>
    ```
3. 二次贝塞尔函数绘图 `.quadraticCurveTo(midx,midy,edx,edy)`, 首先有三个控制点: 第一个是当前位置, 中间点,结束点是里面写的两个, 例如
    ```js
    <script>
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d")
            }

            // 辅助边
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0,200);
            ctx.lineTo(200,0);
            ctx.lineTo(400,200)
            ctx.stroke();
            ctx.restore();

            // 绘制曲线
            ctx.save();
            ctx.strokeStyle="red";
            ctx.beginPath();
            ctx.moveTo(0,200);
            ctx.quadraticCurveTo(200,0,400,200);
            ctx.stroke();
            ctx.restore();
        }
    </script>
    ```

4. 三次贝塞尔函数绘图 `.bezierCurveTo(mid1x,mid1y,mid2x,mid2y,edx,edy)`, 首先有四个控制点: 第一个是当前位置, 中间点1, 中间点1, 结束点是里面写的三个, 例如
    ```js
    <script>
        window.onload=function(){
            var testnode = document.querySelector("#test");
            if(testnode.getContext){
                var ctx = testnode.getContext("2d")
            }

            // 辅助直线
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0,400);
            ctx.lineTo(200,600);
            ctx.lineTo(400,400);
            ctx.lineTo(600,600);
            ctx.stroke();
            ctx.restore();

            // 绘制曲线
            ctx.save();
            ctx.strokeStyle="blue";
            ctx.beginPath();
            ctx.moveTo(0,400);
            ctx.bezierCurveTo(200,600,400,400,600,600);
            ctx.stroke();
            ctx.restore();
        }
    </script>
    ```

全部代码, 跑起来效果可能好点:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #bfa;
        }

        canvas{
            background-color: white;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="test" width="800" height="800"></canvas>
</body>
<script>
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d")
        }

        ctx.moveTo(50,50);
        ctx.lineTo(100,50);
        ctx.arc(50,50,50,0,270*Math.PI/180);
        ctx.lineTo(50,50);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(300,0);
        ctx.lineTo(200,200);
        ctx.stroke();

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle="green";
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.arcTo(300,0,200,200,50);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0,200);
        ctx.lineTo(200,0);
        ctx.lineTo(400,200)
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.moveTo(0,200);
        ctx.quadraticCurveTo(200,0,400,200);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0,400);
        ctx.lineTo(200,600);
        ctx.lineTo(400,400);
        ctx.lineTo(600,600);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle="blue";
        ctx.beginPath();
        ctx.moveTo(0,400);
        ctx.bezierCurveTo(200,600,400,400,600,600);
        ctx.stroke();
        ctx.restore();

    }
</script>
</html>
```

## Canvas的变换

CSS中已经有一套变换了, 可以直接使用吗? 不可以, 因为CSS选择器只能选中`Canvas画布`作为整体进行变化, 但是无法对元素进行操作, 所以还是需要Canvas自己的一套API对元素操作

1. `translate(x,y)`: 用来移动`Canvas`**原点**位置的方法,分别是目标原点的x,y**增量**, 注意`translate(x,y)`的效果是叠加的,例如
```js
ctx.translate(50,50);
ctx.translate(50,50);
```
与
```js
ctx.translate(100,100);
```
是等价的.

2. `rotate(angle)`: 以**Canvas的原点**为中心进行顺时针旋转, 单位为弧度, 所以经常搭配`translate(x,y)`使用, **注意rotate的效果是叠加的**

3. `scale(x,y)`: 以原点为中心分别向`ox`,`oy`方向放缩`x`,`y`倍, 注意scale的效果仍然是累加的. 值得注意的是`scale`的原理是放缩了css像素与实际像素的比例  
之后可以很容易的得到一个旋转放缩正方形, 如下
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #bfa;
        }

        canvas{
            background-color: white;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="test" width="400" height="400"></canvas>
</body>
<script type="text/javascript">
    window.onload = function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }
        var scstep = 1;
        var scval=20;
        var rotval = 0;

        ctx.save();

        setInterval(function(){
            ctx.save();
            ctx.clearRect(0,0,testnode.width,testnode.height);
            ctx.translate(200,200);
            if(scval>=100){
                scstep=-1;
            }else if(scval<=20){
                scstep=1;
            }
            scval += scstep;
            rotval++;
            ctx.scale(scval/100,scval/100);
            ctx.rotate(rotval*Math.PI/180);
            ctx.beginPath();
            ctx.fillRect(-100,-100,200,200);
            ctx.restore();

        },1000/60);

        ctx.restore();
    }

</script>
</html>
```

## 使用Canvas绘制表

我们的思想: 由于`Canvas`的效率极高, 并且没有CSS中的动画效果, 所以我们的思路是构建关键帧, 也就是一秒种刷新一下整个`Canvas`画面, 对于三种表针, 我们使用叠加的思想绘制到一个关键帧上, 而叠加的重点在于绘制好每一个表针, 并且让他们的样式互相分离.

将表分成4块

1. 基本框架: 就是一个普通的canvas框架  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #bfa;
        }
        canvas{
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="clock" width="400" height="400"></canvas>
</body>
<script type="text/javascript">
    ...
</script>
</html>
```

2. 绘制表面  
    - 获取画笔之后先压入canvas的默认样式, 设置我们的Canvas默认样式, 然后进入计时器函数
    - 由于每秒钟都要刷新页面, 所以要在函数进入的时候加入清空页面的函数
    - 设置表的默认样式
    - 将表的坐标原点居中, 旋转坐标轴方便计算
    - 画圆

    ```js
        window.onload=function(){
            var clock = document.querySelector("#clock");
            if(clock.getContext){
                ctx = clock.getContext("2d");
            }

            // defit
            ctx.save();

            setInterval(function(){
                ctx.clearRect(0,0,1000,1000);
                // bgi
                ctx.save();
                ctx.lineWidth=10;
                ctx.strokeStyle="blue";
                ctx.beginPath();
                ctx.translate(200,200);
                ctx.rotate(-90*Math.PI/180);
                ctx.arc(0,0,150,0,360*Math.PI/180);
                ctx.stroke();

                ....

                ctx.restore();
            },1000);
            ctx.restore();
        }
    ```

3. 绘制表的刻度  
   - 进去一个循环绘制每一个刻度
   - 先设置刻度的默认样式
   - 提前做好刻度画出来之后旋转的操作(后面写也可以)
   - 分开判断刻度样式, 设置对应样式, 画线

    ```js
            for(var i=0;i<60;i++){
                ctx.save();
                ctx.strokeStyle="black";
                ctx.lineWidth=3;
                ctx.rotate(i*6*Math.PI/180);
                ctx.beginPath();
                if(i%5==0){
                    ctx.save();
                    ctx.lineWidth=5;
                    ctx.strokeStyle="green";
                    ctx.beginPath();
                    ctx.moveTo(110,0);
                    ctx.lineTo(140,0);
                    ctx.stroke();
                    ctx.restore();
                }else{
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(120,0);
                    ctx.lineTo(140,0);
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.restore();
            }
            ...
    ```

4. 绘制表针  
   - 选使用js获取时间, 然后分配给小时,分,秒, 最好除以前一项算出精确值
   - 画针之前先把样式压栈
   - 旋转对应角度
   - 画线 

    ```js
            var cur_date = new Date();
            var s = cur_date.getSeconds();
            var m = cur_date.getMinutes()+s/60;
            var h = cur_date.getHours()%12+m/60;
            if(h>12)h=h-12;

            ctx.save();
            ctx.strokeStyle="black";
            ctx.rotate(h/12*2*Math.PI);
            ctx.beginPath();
            ctx.moveTo(-10,0);
            ctx.lineTo(60,0);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle="black";
            ctx.rotate(m/60*2*Math.PI);
            ctx.lineWidth=7;
            ctx.beginPath();
            ctx.moveTo(-15,0);
            ctx.lineTo(85,0);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle="red";
            ctx.rotate(s/60*2*Math.PI);
            ctx.lineWidth=5;
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(105,0);
            ctx.moveTo(0,0);
            ctx.arc(0,0,5,0,2*Math.PI)
            ctx.stroke();
            ctx.restore();
    ```

完整代码如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #bfa;
        }
        canvas{
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="clock" width="400" height="400"></canvas>
</body>
<script type="text/javascript">

    window.onload=function(){
        var clock = document.querySelector("#clock");
        if(clock.getContext){
            ctx = clock.getContext("2d");
        }

        // defit
        ctx.save();

        setInterval(function(){
            ctx.clearRect(0,0,1000,1000);
            // bgi
            ctx.save();
            ctx.lineWidth=10;
            ctx.strokeStyle="blue";
            ctx.beginPath();
            ctx.translate(200,200);
            ctx.rotate(-90*Math.PI/180);
            ctx.arc(0,0,150,0,360*Math.PI/180);
            ctx.stroke();

            for(var i=0;i<60;i++){
                ctx.save();
                ctx.strokeStyle="black";
                ctx.lineWidth=3;
                ctx.rotate(i*6*Math.PI/180);
                ctx.beginPath();
                if(i%5==0){
                    ctx.save();
                    ctx.lineWidth=5;
                    ctx.strokeStyle="green";
                    ctx.beginPath();
                    ctx.moveTo(110,0);
                    ctx.lineTo(140,0);
                    ctx.stroke();
                    ctx.restore();
                }else{
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(120,0);
                    ctx.lineTo(140,0);
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.restore();
            }


            var cur_date = new Date();
            var s = cur_date.getSeconds();
            var m = cur_date.getMinutes()+s/60;
            var h = cur_date.getHours()%12+m/60;
            if(h>12)h=h-12;

            ctx.save();
            ctx.strokeStyle="black";
            ctx.rotate(h/12*2*Math.PI);
            ctx.beginPath();
            ctx.moveTo(-10,0);
            ctx.lineTo(60,0);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle="black";
            ctx.rotate(m/60*2*Math.PI);
            ctx.lineWidth=7;
            ctx.beginPath();
            ctx.moveTo(-15,0);
            ctx.lineTo(85,0);
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.strokeStyle="red";
            ctx.rotate(s/60*2*Math.PI);
            ctx.lineWidth=5;
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(105,0);
            ctx.moveTo(0,0);
            ctx.arc(0,0,5,0,2*Math.PI)
            ctx.stroke();
            ctx.restore();

            ctx.restore();
        },1000);
        ctx.restore();
    }

</script>
</html>
```

## 使用图片

1. `Canvas`操作图像的时候需要图片加载全部完成之后才能才可以操作
2. 方法: `drawImage(img,x,y,width,height)` 参数应该分别是Canvas或图片对象, 起始点X, 起始点Y, 插入图像的宽度和高度

使用实例

- 首先给了一个Image对象, 然后指定路径拿到图片
- 进入背景调用的函数, 选择绘制图像, 给出图像与大小

```js
<script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }
        var img = new Image();
        img.src="blue.png";
        img.onload=function(){
            ctx.drawImage(img,0,0,img.width,img.height);
        }
    }
</script>
```

## 使用图片作为背景

思想是绘制一个足够大的矩形作为背景, 其中最重要的就是将原来的图片对象转化为背景样式的对象, 方法是, `ctx.createPattern(img,"repeat")`, 后一个选项是重复方式, 有:

- `repeat`(平铺)
- `repeat-x`(x平铺)
- `repeat-y`(y平铺)
- `no-repeat`

使用实例: 

- 同样的取得图片
- 转化为背景图片类(使用`.createPattern`)
- 填充到矩形

```js
<script type="text/javascript">
    window.onload=function(){
        var testnode = document.querySelector("#test");
        if(testnode.getContext){
            var ctx = testnode.getContext("2d");
        }

        var img = new Image();
        img.src="blue.png";
        img.onload=function(){
            var pattern = ctx.createPattern(img,"repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(0,0,200,200);
        }
    }
</script>
```

## 使用渐变

从CSS中类比我们可以知道渐变起始是一种背景图片

所以实现上就是将原来的pattern换成渐变, 线性渐变是`createLinearGradient(x1,y1,x2,y2)`指的是渐变开始与结束的左上角与右下角, 放射性渐变是`createRadialGradient(x1,y1,r1,z2,y2,r2)`分别是渐变开始的圆的圆心, 半径, 渐变结束的圆心与半径

但是一张只是指定了放射的`画布`, 还要指定渐变的颜色,需要使用`addColorStop(k,color)`, 指的是在渐变开始的那一段设置什么颜色, 例如 

```js
img.onload=function(){
    var gradient = ctx.createLinearGradient(0,0,400,400);
    gradient.addColorStop(0,"red");
    gradient.addColorStop(0.5,"green");
    gradient.addColorStop(1,"blue");
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,400,400);
}
```

```js
img.onload=function(){
    var gradient = ctx.createRadialGradient(200,200,20,200,200,150);
    gradient.addColorStop(0,"red");
    gradient.addColorStop(0.5,"green");
    gradient.addColorStop(1,"blue");
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,400,400);
}
```

## 文本操作

`Canvas` 提供了两种绘制文本的方法:

- `fillText(text,x,y)` 在指定位置填充文本内容
- `strokeText(text,x,y)` 在指定位置绘制文本边框

`Canvas` 提供了修改文字样式的方法

- `font="20px sans-serif"` 是设置字体的方法,因为Canvas只支持非称线字体,所以后一个属性可以随便写,但是都是默认`sans-serif`, 但是还不能少, 前面是设置字号的
- `ctx.textAlign="left/right/center"` 首先描点到文字预设的`x,y`,默认将此点作为文字输出的左下角,可以设置这个角为文字的中间下角,或者右下角
- `ctx.textBaseline = "top/middle/buttom"` 同`textAlign` 不过这个是垂直方向的


## 像素操作

- `getImageData(x,y,w,h)`可以将指定区域的像素的颜色RGBA值写入数组, 参数分别为左上角坐标 宽度 高度
- 值得注意的是这里的`A`lpha 最大为255而不是CSS中的1.

- `putImageData(imgdata,x,y)`可以将元素放到xy处
- `createImageData(width,height)`创建一个长宽的元素默认rgba(0,0,0,0)

## 制作马赛克

- `getPxInfo(img,x,y)`获取Image的(x,y)的颜色信息

不用这个的代码, 原理是算均值(加了个动画)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #bfa;
            padding: 0;
            margin: 0;
        }
        canvas{
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="test"></canvas>
</body>
<script type="text/javascript">
    window.onload=function(){
        oc=document.querySelector("#test");
        if(oc.getContext){
            var ctx=oc.getContext("2d");
            var img1=new Image();
            img1.src="./blue.jpeg";
            img1.onload=function(){
                var msksize=0;
                setInterval(function(){
                    msksize+=4;
                    oc.width=img1.width*2;
                    oc.height=img1.height
                    ctx.drawImage(img1,0,0);
                    var img2=ctx.createImageData(img1.width,img1.height);
                    var img3=ctx.getImageData(0,0,img1.width,img1.height);
                    for(var i=0;i<img1.height;i+=msksize){
                        for(var j=0;j<img1.height;j+=msksize){
                            var r=0,g=0,b=0,oi,oj;
                            for(oi=0;(oi<msksize)&&(oi+i<img1.height);oi++){
                                for(oj=0;(oj<msksize)&&(j+oj<img1.width);oj++){
                                    r+=img3.data[((i+oi)*img1.width+(j+oj))*4];
                                    g+=img3.data[((i+oi)*img1.width+(j+oj))*4+1];
                                    b+=img3.data[((i+oi)*img1.width+(j+oj))*4+2];
                                }
                            }
                            r/=oi*oj;
                            g/=oi*oj;
                            b/=oi*oj;
                            for(var pi=0;pi<oi;pi++){
                                for(var pj=0;pj<oj;pj++){
                                    img2.data[((i+pi)*img1.width+(j+pj))*4]=r;
                                    img2.data[((i+pi)*img1.width+(j+pj))*4+1]=g;
                                    img2.data[((i+pi)*img1.width+(j+pj))*4+2]=b;
                                    img2.data[((i+pi)*img1.width+(j+pj))*4+3]=255;
                                }
                            }
                        }
                    }
                    img2.height=img1.height;
                    img2.width=img1.width;
                    ctx.putImageData(img2,img1.width,0);
                },10);
            }
        }
    }
</script>
</html>
```

## 全局透明度的设置
- `globalAlpha = value` 对这个命令之后的元素设置透明度

## 覆盖合成
- source:新的图像(源)
- destination:已经绘制过的图形(目标)
   - globalCompositeOperation
	- source-over(默认值):源在上面,新的图像层级比较高
	- source-in  :只留下源与目标的重叠部分(源的那一部分)
	- source-out :只留下源超过目标的部分
	- source-atop:砍掉源溢出的部分
	- 
	- destination-over:目标在上面,旧的图像层级比较高
	- destination-in:只留下源与目标的重叠部分(目标的那一部分)
	- destination-out:只留下目标超过源的部分
	- destination-atop:砍掉目标溢出的部分

## 将画布导出为图像
- toDataURL(注意是canvas元素接口上的方法),只导出画布
	
## 事件操作
- ctx.isPointInPath(x, y)判断在当前最新beginPath之后的路径中是否包含检测点
       - x:检测点的X坐标
       - y:检测点的Y坐标
   **注意，此方法只作用于最新画出的canvas图像**
