---
title: JavaScript基础版笔记
date: 2020-11-14 00:00:24
toc: true
description: 此版为JavaScript基础版，以实际应用为主,主讲:尚硅谷李立超,视频来自B站:BV1YW411T7GX
categories:
  - [前端,JS]
tags:
  - 前端
  - JavaScript
  - 笔记
---

## 概述
1. ECMAScript与Javascript
    ECMAScript是JavaScript的标准
    
    一个JS包含三个元素:`ECMAScript`,`DOM`(文档对象模型: 如何通过JS操作网页),`BOM`(浏览器对象模型: 如何通过JS操作浏览器)

2. JS是一种解释形语言
3. JS是一种动态语言(和Py一样的一个变量多类型)
4. JS是OOP语言 

## 第一个程序
- JS代码要写在HTML的`script`标签中,`type=text/javascript`(不写也可以，默认就是)
- 代码以分号结尾

1. 在浏览器中弹出一个警告框：
   
   `alert("XXX")`弹出一个通知框，显示XXX内容，只有一个确定 

2. 在页面上输出内容
   
    `document.write("XXX");`直接在网页中显示双引号的HTML代码，例如:`write("1</br>2</br>3")`，值得注意的是显示的文字并不会出现在网页原代码的body部分

3. 向控制台输出某句话

    `console.log("XXX")`向控制台输出一个内容

## JS代码编写的位置

1. 可以将JS代码编写到标签的`onclick`属性中，当我们点击代码的时候JS代码就会执行，例如如下代码会在点击的时候显示"嘿嘿"
```html
<button onclick="alert('嘿嘿')">点我一下</button>
```
**值得注意的是，与py一样，命令外面用`""`围起来了，所以围里面要用`''`**

2. JS代码可以写在超链接的`href`属性中，但是这个时候就有格式要求了,要先谢`javascript:`,效果和之前一样
```html
<a href="javascript:alert('嘿嘿');">点我一下</a>
```

**与CSS一样，这种直接写在标签里面的形式不怎么用**

3. 和CSS一样JS可以写在`script`里面，也可以写在外部文件里面, 外部引用的时候写法是
```html
<script type="text/javascript" src="./xxx"></script>
```

**注意JS代码是按照自上向下的顺序执行的**

## JS的基本用法
1. JS的注释,单行`//`,多航`/**/`，值得注意的是和less不同，两者都会被显示到源代码中
2. HTML不区分大小写但是JS严格区分大小写
3. JS中每一条语句以分号结尾(如果不写，浏览器会自动加，但是消耗内存，且存在分号加错的情况)
4. JS中忽略多的空格与换行，可以利用这个特性进行代码格式化

## 字面量与变量

- 字面量: 可以认为字面量是常量，是一些不可改变的值，例如`1,2,3,4`这些都是不可变的，字面量都是可以直接使用的，但是一般都不会直接使用字面量
- 变量可以用来保存字面量，并且变量是可以变化的，用起来更加的简单，所以在开发的时候很少使用字面量

**感觉很类似于C中的左值与右值**

- 在JS中使用`var`关键字来声明一个变量, 但是刚声明的变量不能直接使用，例如
```js
var a;
console.log(a);
```
会输出`undefined`, 还和没有声明不同，没声明会报错`Uncaught ReferenceError: XXX is not defined at `

声明变量是没有值的，可以用`=`为变量赋值

当然声明赋值接受同时进行

可以通过变量对字面值进行描述

## 标识符

在JS中所有可以自主命名的全部可以叫做标识符，例如: 变量名/函数名/属性名都属于标识符

1. 命名一个标识符的时候我们可以写 字母 数字 下划线 $
2. 不能以数字开头
3. 标识符不能是JS中的关键字的保留字，例如`var`
4. 标识符建议采用驼峰命名法(首字母小写，其余单词开头大写), 当然可以不接受建议

JS在保存标识符的时候采用的是Unicode编码，所以理论上Unicode编码都可以使用，理论上中文可以

**和C语言一模一样**

## 数据类型

数据类型指的是字面量的类型，在JS中一共有6种

- String
- Number
- Boolean
- Null(空值)
- Undefined(未定义)
- Object(对象)

p.s. 动态语言的好处，把很多类型直接整合到一起

其中基本数据类型就是除了Object之外的，Object属于引用数据类型

可以使用运算符号`typeof()`检查变量,例如
```js
var a=123;
var b="123"

console.log(a);
console.log(b);
console.log(typeof(a));
console.log(typeof(b));
```
结果为
```
123
123
number
string
```

- String字符串:
  - JS中字符串需要用引号(单引号或双引号均可)引起来
  - 注意单引号里面用双引号，双引号里面用单引号
  - 如果你就是不想用单引号，那么就要告诉浏览器你这里的双引号是用来干啥的，是框字符串的还是一个普通的双引号，这里我们可以使用`\`作为转意字符，例如`\"`,例如`var str2="我说：\"今天天\'气真不\'错\"";`，转意字符还有`\n`: 换行，`\t`: 制表符,`\\`表示`\`...

    **和C语言完全一样**

- Number数值:
  - 在JS中所有类型的数字全是Number不区分`float`,`int`
  - Number的最大值: 可以输出`Number.MAX_VALUE` 为: 1.7976931348623157e+308, 如果我们要求输出`Number.MAX_VALUE * Number.MAX_VALUE`结果会显示`Infinity`
  - 注意`Infinity`是一个字面量，允许被赋值，值得注意的是一定不能加引号，否则就是字符串了，并且注`Infinity`的typeof是`Number`, 存在`-Infinity`
  - 两个字符串相乘的结果是`NaN` 表示`Not a Number`, 与`Infinity`同理，字面量可以赋值，typeof是`Number`,不要引号!!
  - Number可以表示的最小精度`Number.MAX_VALUE`,也就是最小正值
  - JS的浮点数运算可能不精确，所以千万不要用JS进行高精运算，这些给服务器去算

- Boolean布尔值：

    **与C++完全一样**

- Null空值：
  - 只有一个数据元素就是null
  - 专门用来表示空对象
  - 值得注意的是**用`typeof`看null,视频上说会显示`Object`但是本机上是`null`,null绝对不是一个对象，null有自己的类型，它是一个特殊的类型，至于为什么会null返回object，这是官方承认的错误**

- undefined未定义：
  - 声明变量不给他赋值就输出会显示这个
  - 不声明就输出会报错
  - `typeof()`是`undefined`

## 强制类型转换

- 指的是将一个数据类型转化为`String`,`Number`,`Boolean`

1. 转化为String:
   - 调用被被转化类型的`toString`方法: (`XXX.toString()`),**注意，他不会修改原变量，而是作为返回值返回**，bool的toString是"true"/"false"但是存在问题，Null的toString会报错`Uncaught TypeError: Cannot read property 'toString' of null`,`undefined`同理，因为这两个类型没有`toString`
   - 调用String()函数: 将被转化的数据作为参数传入, 这个支持Null与Undefined,**说白了就是C++的构造函数**
  
2. 转化为Number
    - Number函数: 同上，非数字的字符串转`Number`会`NaN`，空string串(允许包含任意空格)会转化为0, bool=true转为1,false转化为0, null转为0, undefined转为0
    - 专门对付字符串的方式：parseInt()与parseFloat(),可以将字符串中有效的对应内容解析，例如`parseInt("123r456")`会先解析`123`然后遇到`r`直接`break`! , 对非string传入参数，会默认先String
**没有toNumber**

3. 转化为boolean
    - `Boolean`函数 Number 非0true,0false， String 非空true空false， Null 为false， undefined为false, Object为true

## 其他进制的数字:
  - 表示16进制(需要以0x开头)： `var a=0x3f3f3f3f;`, 输出会自动转化为10进制
  - 表示8进制(需要以0开头)： `var a=070;`, 输出会自动转化为10进制
  - 表示2进制(需要以0b开头)： `var a=0b10;`, 输出会自动转化为10进制

  **注意`parseInt("070")`会被不同浏览器解析成10或8进制,只需改为`parseInt("070",8)`即可**

## 算数运算符

运算符也叫操作符，例如:`+`,`typeof()[返回值是string]`

算数运算符:`+`,`-`,`*`,`/`,`%`：
- `+`: 对非Number进行运算的时候遵循上面的规律进行转化运算，NaN参与运算结果一定是NaN，**特殊的，两个字符串`相加`(只有相加)的结果是两个字符串拼接，任何值与字符串相加数字会转化为字符串任何拼接,包括NaN**，利用这个性质可以任意类型+空字符串得到字符串类型，隐式类型转化
  ```
  Infinity+"hello"
  "Infinityhello"
  NaN+"hello"
  "NaNhello"
  ```
运算是**自左向右**的所以`"1"+2+3="123"`,`1+2+"3"="33"`

- `-`/`*`/`/`:对非Number进行运算的时候遵循上面的规律进行转化运算，NaN参与运算结果一定是NaN，**特殊的，字符串相减的时候会转化为Number**，利用这个性质可以做string隐式类型转化为Number

- `%`取模运算

## 一元运算符
一元运算符:`+`,`-`

- `Number`:`+`不会产生影响，`-`会取反
- 非`Number`会先转化再运算,例如`-true=-1`,`-NaN=NaN`
- 利用这个性质`+a`可以吧a转化为`Number`，例如`+"1"+2+3=6`

## 自增自减
- 自增可以使得变量在自身的基础上加1,`a++ <=> a=a+1`,`++a <=> a=a+1`,自带赋值，前后`++`与C语言相同
- 自减可以使得变量在自身的基础上减1,`a-- <=> a=a-1`,`--a <=> a=a-1`,自带赋值，前后`--`与C语言相同
- 唯一的区别是后++是先给值然后马上自增，没有C++所谓的分隔符，例如
  ```js
  var b=10;
  console.log(b++ + ++b + b);
  ```
  结果是
  ```
    10+12+12=34
  ```
  并且注意
  ```js
  var b=10;
  b=b++;
  console.log(b);
  ```
  等价于
  ```
  var b=10;
  var c=b++;
  b=c;
  console.log(b);
  ```
  同样的`--`同理

## 逻辑运算符
三个:非`!`,与`&&`,或`||`

- `!`:对bool进行运算就是取反，对非bool会先转化为bool我们可以利用他将一种类型将其转化为bool,方法是`!!tmp`
```js
var a=false;
console.log(!a);
console.log(!!a);

var b=10;
console.log(!b);
console.log(!!b);
```
得到结果
```
true
false
false
true
```

- `&&`，`||`与C相同，也有短路，非bool进行运算需要先转换为bool进行运算，然后**返回原值**

  - `&&`两个值都是`true`返回后边的
  - `&&`有`false`，返回`第一个false对应的`
  - `||`有`true`返回`第一个true对应的`
  - 第一个是`false`返回第二个

说白了返回值就是在加入短路原则之后最后判断的那个元素

## 赋值运算符
`+=`,`-=`,`*=`,`/=`,`%=`与C完全相同

## 关系运算符
关系成立返回`true`

`>`，`>=`，`<`，`<=`，`==`,`!=`

- 除了`==`与`!=`符号:

非数值的情况: 转化为Number, 任何值与`NaN`比较都是false

特殊的: 符号两侧都是字符串会分别比较字符的Unicode编码(和C++一样)，前面的一样短的小， 所以谨慎比较两个数字字符串

- 对于`==`与`!=`符号： 类型不同会自动进行类型转化，但是左边转右边还是右边转左边都不一定，注意的是`undefined`==`null`,`任何值`==`NaN`都为false, 包括`NaN`

- `===`,`!==`与`==`,`!=`

简单来说： `==` 代表相同， `===`代表严格相同

这么理解： 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而===比较时， 如果类型不同，直接就是false.

操作数1 == 操作数2，  操作数1 === 操作数2

比较过程：

- 双等号==： 
  1. 如果两个值类型相同，再进行三个等号(===)的比较
  2. 如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：
       - 如果一个是null，一个是undefined，那么相等
       - 如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较
- 三等号===:
  1. 如果类型不同，就一定不相等
  2. 如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）
  3. 如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。
  4. 如果两个值都是true，或是false，那么相等
  5. 如果两个值都引用同一个对象或是函数，那么相等，否则不相等
  6. 如果两个值都是null，或是undefined，那么相等

## `Unicode`编码
使用转义字符`\u+四位编码`在`console`输出Unicode编码：
```
console.log("\u0031");
console.log("\u2620");
```
**注意这个值是16进制的**

使用`&#+CODE+;`在网页输出
```
<h1>&#2620;</h1>
```
**注意这个是十进制的**

## 条件运算符

三元运算符`XX?XX:XX`,与C完全相同，区别是C的第二第三位置只能写表达式，但是这里可以写函数

## 运算符的优先级

- 可以使用`,`同时声明多个变量
- 先乘除后加减
- 同优先级自左向右
- 优先级同C

## 语句

JS的语句是一条一条自上到下顺序执行的，使用`{}`对代码进行分组,`{}`中的语句称作代码块，代码块内部内容对外完全可见

- 流程控制语句
  - 条件判断语句
    - if(条件表达式){语句}，当然单句不需要大括号
    - if(条件){语句1}else{语句2}
    - if(条件){语句1}else if(条件){语句2}... else{语句n}
  - 条件分支语句
    - switch语句, 注意比较方式是**全等**比较，一旦全等从当前开始执行代码，所以和C一样要写`break`
    ```js
      switch(value){
        case X:
          ...
          break;
        case Y:
          ...
          break;
        case Z:
          ...
          break;
        default:
          ...
      }
    ```
    十分先进的是`switch`的`case`支持case为条件，例如
    ```js
    switch(true){
      case a>10:
        ...
        break;
      default:
        ...
    }
    ```
  - 循环语句
    - `while(){}`   
    - `do{} while()`
    - for(;;){}

  - `break`&`continue`
    正常模式下与C一样，但是在C在二重循环中想在内部循环中直接退出两个循环必须写flag然后两次break,JS提供了Label的机制可以直接用break退出指定循环而不是最近的循环，例如：
    ```js
    outer:
    for(var i=0;i<100;i++){
      for(var j=0;j<100;j++){
        if(i==77 && j==11)
          break outer;
      }
    }
    ```
    这样`  break`的就不是最近的循环了

## 输入框

- `prompt()`会弹出一个输入框，需要string作为参数，作为输入的提示, 返回值是输入(和py的input一样)

## 赋值的返回值
  与C++相同，赋值的返回值是这个值本身

  在C语言中如果你把`if(a==5)`写成`if(a=5)`那么一定会得到true,因为相当于是写了`if(5)`，

  在C语言中如果你把`if(a==0)`写成`if(a=0)`那么一定会得到false,因为相当于是写了`if(0)`

  这里也是一样的

## 设置计时器

注意，计时器的不是js里那个多长时间执行一次的计时器，而是个开发者debug的一个普通计时器，写法是
```js
console.time("计时器名称");
...被计时的代码;
console.timeEnd("计时器名称");
```
最后会在浏览器的consol的上显示提示`计时器名称:XXms`

## 对象简介

对象的分类：

  1. 内建对象：在任何的ES标准的实现中都可以实现，例如`Math`
  2. 宿主对象：JS允许环境提供的对象，主要指的是浏览器提供的对象，例如BOM, DOM，注意，这两个不是两个对象，而是两个对象族，包含的对象有例如`document`
  3. 自定义对象：由开发人员自己创建的对象

创建对象

1. 使用new关键字调用的函数是构造函数：`constructor`
   构造函数是专门用来构造对象的
    ```js
      var obj = new Object();
    ```
    上面这条命令就构造了一个Object对象
2. 给对象添加属性
     - 对象.属性名=属性值
       ```js
       obj.name="AAA"
       ```
3. 读取对象中的一个属性
     - 对象.属性
     - 读取对象没有的属性不会报错，会返回`Undefined`
4. 修改对象的属性
     - 对象.属性名=属性值
5. 删除对象的属性
     - `delete 对象.属性名`

注意事项

  - 对象的属性名不强制使用变量规范，例如`var`是接受的，但是不建议，注意的是，如果使用特殊名，要用如写写法增删查改`obj["属性名]="LALALAL"`
  - 受益于动态语言，JS对象的属性值接受任何类型
  - `in`运算符：`属性名` in `对象` 返回对象是否包含属性名的bool类型，属性名加引号
  - 对象类型属于引用数据类型，`类似`于是C++的引用，如果一个对象是通过赋值得到的，元对象变化，被赋值的变量也会变化
  - 注意这里的引用不是C++的引用，每一个对象实际的值是指针，所以可以设置`obj=NULL`取消这种联系，综上，这里的引用实际上相当于是一种指针
  - 当你比较两个对象，他实际上比较的是两个对象的内存地址
  - **一定记住，JS的对象的引用和C++的指针一样**

## 对象字面量
可以通过对象字面量的方式创建对象，例如：
```js
  var obj2={name:"AAA",sex:"BBB"};
```
对象字面量属性名可以加`"`也可以不加，不建议加，使用特殊属性名必须加

最后一个属性后面不要加逗号

## 函数
- 函数也是一个对象
- 函数可以封装一些功能，在执行的时候需要执行这一系列代码
- 声明方法
```js
var fn = new Function();
```

可以将要封装的代码以一种特殊的字符串的方式传递给构造函数

函数中的代码会在函数调用的时候执行

调用的方法是 `函数对象()`,这样函数会按照调用顺序执行

在开发中很少使用构造函数构造一个函数

可以使用函数声明创建一个函数
```js
function 函数名([形参1,形参2,形参3,...,形参N]){
  ...
}
```

可以在`console.log(函数名)`查看函数内容

调用方法与之前相同

可以不写函数名创建一个匿名函数，例如
```js
  function(){...}
```

可以在函数的括号中指定多个参数，受益于动态语言，不需要写明类型，解析器也不检查调用的时候实参的数量与类型，实参从左向右读，多的不管，如果少给了，没给的全部undefined

函数支持返回值`return val;`,return 之后的语句都不执行

得益于动态语言，可以肆无忌惮的使用一个(非)匿名对象(甚至是函数对象)作为参数

函数内部支持嵌套函数，这个时候要注意`fn4`是函数对象，值是代码的内容，`fn4()`是函数，值是函数的返回值

如果一个函数作为对象赋值给对象的一个属性那么这个函数也被称作`方法`

## 立即执行函数

有点函数我想让他在创建之后立即执行，但是只想让他执行一次，因为执行一次，给他一个对象或者是一个函数名似乎有点浪费，我们可以创建一个立即执行函数，就是在匿名函数的基础上外面加一个`()`, 例如
```js
  (function(){
    ...
  })
```

## 枚举对象中的属性

```js
for (var n in obj){
  consol.log(n)
}
```

注意这个方法会吧对象中每一个**属性的名字**赋值给变量，而不是属性值，可以做如下改进

```js
for (var n in obj){
  consol.log(n+"="+obj[n]+"\n");
}
```

## 全局作用域

在JS中一共有两种作用域：

1. 全局作用域
   - 直接编写在script标签中的js代码都在全局作用域
   - 变量在页面打开时创建，在页面关闭的时候销毁
   - 全局作用域中有一个全局对象`window` 他代表着浏览器窗口，他由浏览器创建可以直接使用，
   - 在全局作用域用所有创建的对象都会作为window对象的属性保存，可以通过如下方式证明:
```js
<script>
  var a = 10;
  console.log(window.a);
</script>
```
   - 考虑到对一个普通变量可以不声明直接定义成员函数，所以window对象理论上可以这么做，于是发现`var a=1`与`a=1`其实都可以声明一个变量
2. 函数作用域
   - 调用函数的时候被创建 函数结束的时候销毁，每一次调用相互独立， 在函数中可以访问到全局变量，变量冲突的时候会保护内部变量， 如果实在是想访问全局变量可以使用`window.XX`

## 声明提前

考虑运行以下代码
```js
<script type="text/javascript">
    console.log("a="+a);
    console.log("b="+b);
    a=1;
    var b=1;
</script>
```
会得到如下结果
```
49 Uncaught ReferenceError: a is not defined
b=undefined
```
可以看到b与a的报错不同，似乎是在说b定义了但是没有初始化，这是因为js在程序运行之前会将所有`var`的变量做提前声明，相当于执行了如下代码
```js
<script type="text/javascript">
    var b;
    console.log("a="+a);
    console.log("b="+b);
    a=1;
    b=1;
</script>
```

理论上，函数也是一个对象，变量是什么样的函数也应该是什么样的, 我们写下如下代码

```js
    fun1();
    fun2();

    function fun1(){
        console.log("1");
    }

    var fun2= function(){
        console.log("2");
    }
```

这相当于是做了函数的不声明就调用，但是fun1()顺利执行了，fun2()报错
```
Uncaught TypeError: fun2 is not a function
```

这是因为我们可以理解变量的`var`相当于就是函数的`function` 所以第一个相当于是直接声明，第二个实际上是声明了一个变量等于这个函数对象，只是提前了变量，没有提前那个等于函数,上述代码相当于:(注意，函数提前声明的时候连值一起提前了)
```js
    function fun1(){
      console.log("1");
    }

    var fun2;

    fun1();
    fun2();

    fun2= function(){
        console.log("2");
    }
```

**注意声明提前是提前到作用域开始时**

**我们说如果不写`var`就声明便来嗯相当于是声明了window的变量，所以在函数作用域内不加`var`声明的变量也相当于是声明了一个全局作用域的变量**

## debug

在要调试的代码前加入`debugger;`或者在浏览器source里面加入断点

## this

JS解析器在每次调用函数的时候都会向函数内部传递一个隐含的参数，这个隐含参数就是`this`

我们可以尝试输出`this`

```js
console.log(this);
```


```js
Window {window: Window, self: Window, document: document, name: "", location: Location, …}
0: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
alert: ƒ alert()
atob: ƒ atob()
blur: ƒ blur()
btoa: ƒ btoa()
caches: CacheStorage {}
cancelAnimationFrame: ƒ cancelAnimationFrame()
......
```

`this`指向的是一个对象，叫做上下文对象，根据函数的调用方式，this会指向不同的对象，我们定义一个对象，里面包含一个函数对象

```js

  function fun(a,b){
        console.log(this);
        //console.log("a= "+a+",b= "+b);
    }

  var obj={
    name:"12",
    hh=fun;
  }

  obj.hh();
  fun();

```

得到如下结果
```js
{name: "12", hh: ƒ}
hh: ƒ fun()
name: "12"
__proto__: Object

Window {window: Window, self: Window, document: document, name: "", location: Location, …}
0: Window {window: Window, self: Window, document: document, name: "", location: Location, …}
alert: ƒ alert()
atob: ƒ atob()
blur: ƒ blur()
btoa: ƒ btoa()
caches: CacheStorage {}
cancelAnimationFrame: ƒ cancelAnimationFrame()
cancelIdleCallback: ƒ cancelIdleCallback()
captureEvents: ƒ captureEvents()
chrome: {loadTimes: ƒ, csi: ƒ}
clearInterval: ƒ clearInterval()
clearTimeout: ƒ clearTimeout()
...
```

根据函数调用方式不同，函数的this不同，注意**是调用方式不同，不是存储地址不同**，以函数的形式调用，永远是`window`如果是对象以方法的形式调用，`this`指向的就是这个对象

## 使用factory创建对象

通过factory可以大批量的创建对象

```js
<script type="text/javascript">
    function creatPeople(name,age,sex){
        var obg=new Object();
        obg.name=name;
        obg.age=age;
        obg.sex=sex;
        obg.sayname=function(){
            console.log(this.name);
        }
        return obg;
    }

    var o1=creatPeople("A",1,"male");
    var o2=creatPeople("B",2,"male");
    var o3=creatPeople("C",3,"female");
    o1.sayname();
</script>
```

有一个缺点是使用这种方式创建的对象全部是Object类的对象，我们无法区分这个对象到底是什么

## 构造函数

我们可以创建一个构造函数，让构造函数帮我们创建对象

构造函数与一般函数没有区别，建议首字母大写

构造函数调用的时候JS解释器：

  1. 立刻创建一个对象
  2. 将this设置为他创建的对象
  3. 逐行执行程序中的代码
  4. 返回对象

我们可以做如下调用

```js
<script type="text/javascript">
    function Person(name,age,sex){
        this.name=name;
        this.age=age;
        this.sex=sex;
    }

    syc=new Person("syc",17,"man");
    console.log(syc);
</script>
```

可以使用 `instanceof` 判断一个对象是不是一个类的实例
```js
console.log(syc instanceof Person);
```
返回`true`

**所有的对象都是`Obejct`的实例**

这样的构造函数存在问题， 如果我的类中有一个成员函数，那么用如上的方式会创建100个对象，那么也会定义100个完全相同但是相互独立的成员函数，这会造成大量的浪费，我们可以在全局定义一个函数，然后声明变量的时候直接等于这个函数，这种方式节约了空间，但是全局函数会造成其他名字冲突与函数被其他对象调用的bug,造成程序不安全

## 原型对象

原型属性: prototype

我们每创建一个函数的时候JS解析器会想函数中添加一个属性prototype

同样的，对象也具有`prototype`属性，但是不能直接访问，可以使用`obj.__proto__`访问，

同一个New函数做出来的对象，他们的原型对象属性都是相同的，这是因为`obj.__proto__`是个指针，指向`prototype`,也就是说同一个类具有相同的原型对象

代码
```js
<script type="text/javascript">
    function fun(){

    }
    console.log("fun.prototype= "+fun.prototype);

    var mc = new fun();
    console.log(mc.__proto__==fun.prototype);

    var mc2 = new fun();
    console.log(mc2   .__proto__==mc.__proto__);
</script>
```
我们可以利用这个原型对象实现构造函数成员重复定义的问题，因为原型对象也是一个对象，把函数写在这个对象里面，实例的对象用的是原型的指针，所以只占用了一个指针空间，因为原型对象是构造函数的对象，别人不好访问，其次，JS有一个特点是对象如果调用自己的元素，如果自己作用域没有，会去原型对象里面找，原型没有才会去全局找，于是我们可以写出以下代码
```js
  function People(...){

  }

  People.prototype.sayname=function(){
    ...
  }

  var a = New People(...)

  a.sayname();
```

用如下方式写成员函数与变量
```js
	function People(name){
		this.name=name;
	}
	
	Person.prototype.toString=function(){
		return "Hello World";
	}

	var mc=new People();

	console.log(mc.toString());
```

检查属性名是否在对象中，还是用`in`,但是如果属性是在prototype中也会产生true，若想区分，可以使用`obj.hasOwnProperty("属性名")`这样的话只有直接定义的会返回true，定义在prototype中的会false

原型对象也是对象，所以原型对象也有原型

当我们使用一个对象或者方法的时候会先使用，没有去原型对象，如果没有就去原型的原型找

```js
console.log(mc.__proto__.__proto__);
console.log(mc.__proto__.__proto__.__proto__);
```

我们发现有原型的原型，没有原型的原型的原型

这是因为我们定义的一个类，那么他的实例的原型是这个构造函数的原型，而这个构造函数的原型指向了他的父类Object的原型,证明如下,在console下

```js
function People(){}
var mc = new People;
var md = new Object
mc.__proto__ == md.__proto__
mc.__proto__.__proto__ == md.__proto__
```
第一个返回false，第二个true，做如下实验
```js
mc.__proto__.__proto__.__proto__
mc.__proto__.__proto__.__proto__.__proto__
md.__proto__.__proto__
md.__proto__.__proto__.__proto__
```
结果是NULL，`Uncaught TypeError: Cannot read property '__proto__' of null`,NULL，`Uncaught TypeError: Cannot read property '__proto__' of null`

三四是等价于一二的，只有我们看`mc.__proto__.__proto__.__proto__`相当于是mc的原型的原型的原型，mc的原型的原型就是md的原型，就是Object的原型对象，这个Object的原型对象也是对象，所以Object的原型对象也有`__proto__`但是他没有父类，相当于他的`__proto__`不指向任何对象，所以是NULL，这样的话如果我们访问`mc.__proto__.__proto__.__proto__.__proto__`相当于是访问`Object.__proto__.__proto__`,相当于是`NULL.__proto__`，所以报错

p.s. 在console下写`New`的时候`N`不能大写！

## toString

我们在打印对象console.log的时候，输出的结果默认是obj.toString()的返回值，如果我们实在是不想看这个数据，可以通过 **重写** toString解决，请注意，是重写不是重载，区别参考C++，我们还要保证重写的函数比原来的toString优先调用，可以发现`mc.__proto__.__proto__.hasOwnProperty("toString")`=true, 也就是说toString是定义在Object里面的函数，所以我们只要定义我们的toString在`mc`或者`mc.__proto__`里面，就会被优先调用，写下函数
```js
	<script type="text/javascript">
	function People(name){
		this.name=name;
	}

	var mc=new People();

	mc.toString=function(){
		return "Hello World";
	}

	console.log(mc);
```

似乎没有正常显示，是因为2020年这个方法挂了

## 垃圾回收(GC)

- 程序在运行过程中会产生垃圾, 会导致程序运行过慢，所以我们需要一个垃圾回收机制

当一个对象没有任何变量指向他/对他引用，这种对象就是垃圾，他会大量占用内存空间，所以必须清理

JS目前有自动的垃圾回收机制，会自动销毁，我们也不能进行人工干预 

如果想让js进行回收可以直接让指向他的对象全部设为NULL，这样会自动回收垃圾，相当于我们只进行了吧对象认到垃圾桶，谁回收，如何销毁不用我们管

## 数组

- 数组也是对象
- 他和普通对象功能类似，也是用来存值
- 不同的时候变量是用字符串做索引的，数组是用索引值访问的

- 创建数组
```js
var arr = new Array();
```

- 添加/读取元素
```js
arr[i]=p;
```

- 读取不存在的索引返回`Undefined`
- 获取**连续**数组数组长度`arr.length`
- 对于**不连续**的数组，会返回元素最大占用索引+1
- 可以用`console.log(arr)`打印数组，但是对于非连续数组会在没定义的地方不显示，于是会出现一堆`,,,`
```js
arr=new Array();
arr[0]=0;
arr[1]=1;
arr[2]=2;
arr[3]=3;
arr.length=10;
console.log(arr);
arr.length=2;
console.log(arr);
```
会输出
```
0,1,2,3,,,,,
0,1
```
可以看到手动修改arr的length会影响输出

- 小技巧，像数组最后元素输出：
```js
arr[arr.length]=1;
arr[arr.length]=2;
arr[arr.length]=3;
arr[arr.length]=4;
```
正好执行一个命令长度也会相应变化  

## 使用字面量创建数组

```js
var arr = [];
```

可以创建的时候初始化

```js
var arr = [1,2,3,4];
```

也可以使用如下方式

```js
var arr = new Array(1,2,3);
```
**注意如上方式的问题**,如果括号里的元素大于一个，没有问题，会作为数组的元素，如果只写一个元素，会被认为是创建了一个大小为那个元素的**空数组**

例如
```js
var arr2 = new Array(10);
```
相当于是`,,,,,,,,,`

因为是动态语言，所以里面可以放任意类型的元素，包括函数，数组

## 数组的常用方法

1. `push` 向数组后面添加一个或多个元素，返回值是push之后的长度
2. `pop` 删除然后返回数组的最后一个元素
3. `unshift` 向数组开头添加一个或多个元素，返回数组长度
4. `shift` 删除第一个元素，返回第一个元素值

## 数组的遍历

除了使用
```js
for (var i=0;i<s.length;i+=1)
  ...
```

还可以使用`forEach()`方法，用法如下

```js
arr.forEach(function(a){
   ...
});
```
JS执行的时候会执行`arr.length`次括号里的函数，程序会依次传递数组中每一个元素的值,下标，完整的数组作为三个参数传过去，程序只要接受他参数，当然，可以不使用匿名函数,可以给一个函数名

**注意，`forEach`在IE9-不支持**

## 数组的其他方法

`arr.slice(begin,end)`获取数组[begin,end)的子数组

该函数是方法，不修改数组，只返回子数组

第二个参数接受省略不写，会截取begin到结尾的子数组

如果索引是负数，就是从后往前走，和python一样

`splice()`删除指定位置的元素，第一参数是要删除的位置(接受负数),第二个参数是删除的个数(如果是0就不删除)，第三个是要添加的元素(可选)

`arr.concat(arr2,arr3,...)`链接多个个数组，然后将结果返回，不会修改原来的数组,当然，数组位置直接放元素也是接受的

`.join()`返回将元素转化为字符串的结果，不影响原数组，同时括号内可以选择拼接元素，例如
```js
<<<a = [1,2,3]
>>>(3) [1, 2, 3]
<<<a.join()
>>>"1,2,3"
<<<a.join(" and ")
>>>"1 and 2 and 3"
```

`reverse()` 反转数组**注意这个方法会直接修改原数组**

`sort()`对数组元素进行排序，**unicode顺序**，即使是对于纯数字也是用unicode排序，例如`2 3 11 8`会变成`11 2 3 8`,因为`1`比`2`大，支持自定义排序方式，自定义与C++不一样，返回正数表示前面的比后面的大，返回负数表示比后面的小，返回0表示相等，所以如果直接`return a<b`会导致`=`与`>`都认为是`=`，不交换顺序，于是有一个简单的写法:
```js
a=[1,5,7,9,11,4,2,3];
a.sort(function(a,b){
  return a-b;
});
```

## 函数对象的方法

函数也是一个对象，所以函数也有方法，注意的是`fun()`不是函数，是调用函数之后的返回值，如果要进行函数对象操作应该去掉`()`做为一个对象进行操作

`call()`和`apply()`两个方法，当使用`fun.call()`与`fun.apply()`都可以实现函数的调用，区别是: 
在调用`call`与`apply`的时候，我们可以即将第一个参数作为调用函数的对象，例如
```js
function fun(){
  console.log(this);
}

var a={};

fun();
fun.call(a);
fun.apply(a);
```
第一个调用输出的是window对象，第二个和第三个输出的是对象a

注意，第一个参数是`obj`必须写上，之后的元素，如果是call直接正常调用即可，如果是apply那么需要将所有实参封装到一个数组中去调用

```js
function fun(a,b){
  console.log(this);
  console.log(a);
  console.log(b);
}
var a={}

fun(1,2);
fun.call(a,1,2);
fun.apply(a,1,2);
fun.call(a,[1,2]);
fun.apply(a,[1,2]);
```

返回值分别是:
```
window... 1 2
{} 1 2
ERROR
{} [1,2] undefined
{} 1 2
```

## 参数列表

在js中当我们去调用函数的时候，js解释器会想函数传递两个隐含的参数，(原来说只有以后是this)，其实还有一个叫，`arguments`，里面的内容就是程序调用的时候的实参列表,注意，你可以这样理解，实参调用的时候会先传递到arguments里面，然后一个一个在赋值给函数定义的形参，所以，理论上我们可以不写形参，例如
```js
function fun(a,b,c){
  console.log(a);
  console.log(b);
  console.log(c);
}

function fun2(){
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

fun(1,2,3);
fun2(1,2,3);
```
注意，不管你定义不定义形参，获取的arguments长度就是实参的个数

注意从0开始

两个调用结果相同(动态语言太香了)，

`argument.callee`是argument的一个对象，内容是被调用函数的对象(相当于双向可以知道对方全部内容，(不安全？))

## date对象
在JS中使用date表示时间
```js
var d = new Data();
console.log(d);
```
直接使用构造函数声明会显示当前代码执行的时间

```js
var d2 = new Date("12/03/2020 11:12:3");
```
格式是:`月/日/年 小时:分:秒`,注意，年写YYYY,如果只写YY会被IE识别为19YY

- `.getDate()` 是几号
- `.getDay()` 是一周中年那一天,注意，周日是`0`,周一是`1`，以此类推
- `.getMonth()` 当前对象是第几月 1月是0
- `.getFullYear()` 返回YYYY
- `.getYear()` 废除
- `.getTime()` 输出时间戳(从1970.1.1 0:0:0 花费的**ms**数，注意与C++不同，没有系统时钟)，如果你有兴趣输出
```js
var mydate = new Date("1/1/1970 0:0:0");
console.log(mydate.getTime());
```
返回的不是0 ，而是`-28800000`,因为浏览器认为你输入的是中国(东八区)时间
- 获取当前时间戳`mydate=Date.now();`


## Math

虽然M是大写的，但是不是构造函数，是一个工具对象，拿开直接用

- `.PI` 表示圆周率，一般全大写的表示常量
- `.abs(n)` n的绝对值
- `.cos(x)/.tan(x)/.sin(x)` 三角运算
- `.ceil(x)/.floor(x)` 向上向下取整
- `.round()` 四舍五入取整
- `.random()` 生成(0,1)的随机数
- `.max()/.min()` 最大最小值，参数数目不限
- `.pow(x,y)` 返回x^y
- `.sqrt(x)` 开方运算

## 包装类

JS中的数据类型有:

- 基本数据类型: `Number` `String` `Boolean` `Null` `Undefined`
- 引用数据类型: `Object`

在JS中提供了三个包装类，我们可以通过这三个包装类将基本数据类型转化为对象，有`Number`,`Boolean`,`String`

例如:
```js
var a = new Number(10);
var b = 12
console.log(typeof a);
console.log(typeof b);
```
为
```
object
number
```

使用包装类的优点是: 可以为这个新的包装类`a`设置很多自定义的方法，但是`b`不可以

但是，存在一个问题，两个对象即使内容相同，用来做`==`还是不同，因为对象的值是对象的`地址`，不是值，但是，时候解释器又会将Object转化为基本数据类型进行比较，这个时候`==`为true`===`为false

可见，在比较的时候，这个包装类存在诸多问题，不建议使用， 在开发的时候千万不要用

这个东西的作用是给JS底层用的，我们发现与C++不同，C++的string是一个类，自带了很多方法，但是JS不是，基本数据类型只存储数据，那么需要方法的时候怎么处理呢? JS会自动**临时**将基本数据类型转化为**包装类**，调用，然后在转换回来

## String

在底层，字符串是以字符数组的方式保存的，所以可以使用[]访问元素

- `str.charAt()`指定位置的元素，与`[]`方式获取的结果一样
- `str.charCodeAt()`获取指定位置元素的unicode
- `String.fromCharCode(X)`注意前面两个函数是字符串的函数，这个函数是**字符串构造函数**的，作用是Unicode转文字(支持0x的16进制)
- `str1.concat(str2,str3...)`连接字符串
- `str1.indexOf(str2)`检索字符串str1中是否包含指定内容str2，返回第一次出现的位置，找不到返回`-1`
- `str1.indexOf(str2,i)`从第i位开始检索字符串中是否包含指定内容，返回第一次出现的位置，找不到返回`-1`
- `str1.lastIndexOf(str2,i)`与`indexOf`相同，是从后往前找，注意同样可选i,表示从正数第几个开始往前找
- `slice()`截取字符串
- `substring()` 截取字符串，与`slice`不同的是不接受负数，遇到负数自动换成0,遇到前大于后会自动调整参数位置
- `str1.split(str2)`用str2为标记拆分str1,返回字符串数组
- `str.toUpperCase()` 字符串转全大写
- `str.toLowerCase()` 字符串转全小写

## 正则表达式

正则表达式用来定义字符串的某些规则，计算机可以根据正则表达式判断一个字符串是否符合规则，将合法字符串提取出来

写法：`var reg = new RegExp("正则表达式","匹配模式")`

正则有一个方法`test(str)`判断str是否符合正则

```js
var reg = new RegExp("a");
var str = "a";
console.log(reg.test(str));
```

正则表达式:

  - "a"： 这个正则表示字符串中是否包含"a"
  - "a|b" 使用`|`表示或者的意思，也就是匹配a或b
  - "[ab]" 匹配a或b
  - "[a-z]" 匹配a到z，相当于匹配所有小写字母
  - "[A-Z]" 匹配A到Z，相当于匹配所有小写字母
  - "[A-z]" 匹配A到Z，相当于匹配所有字母
  - "a[bde]c" 第一个是a,最后是c,中间bcd随意
  - "[^ab]" 匹配除了ab以外的
  - "[0-9]" 匹配任意数字 
  - "a{3}" 连续出现三次a的字符串
  - "(ab){3}" ab连续出现3次
  - "(ab){1,3}" ab连续出现1-3次(1或2或3)
  - "(ab){3,}" ab连续出现三次以上
  - "(ab)+" 至少出现一次，·相当于{1,}
  - "(ab)*" 有没有都可以, 相当于{0，}
  - "(ab)?" 0或1个,相当于{0,1}
  - "^a" 以a开头的，注意于[^a]不同`/[(^a)(^b)(^c)]ba{3}/.test("abaaa")`区分
  - "a$" 以a结尾
  - "^a$" a即使开头也是结尾，注意相当于只能匹配"a"不能是"aaa"
  - "." 除了"\n","\r"的任意字符，如果想表示单纯的`.`可以使用转移`\.`，同理\\表示\
  - "\d" 匹配0-9
  - "\D" 匹配非数字
  - "\s" 匹配空格
  - "\S" 匹配非空格
  - "\b" 匹配单词边界，就是这个字符是两个单词的分界点
  - "\B" 匹配非单词边界
  - "[(^\s)(\s$)]*"开头或者结尾的空格 
匹配模式：
  - "i": 忽略大小写
  - "g": 将所有符合题意的全找到
  - 接受连写


可以使用 `var reg = /a/i`创建正则表达式，第一个参数是表达式，第二个是匹配模式，注意，这里不能写双引号，这个形式的表达式里面不能写变量

将正则表达式应用到字符串中

- `str.split()`还是原来的正则拆分函数，应用如下
  ```js
  "a1b2c3d4e5".split(/[A-z]/);
  ```
  得到
  ```
  (6) ["", "1", "2", "3", "4", "5"]
  ```
- `.search()`搜索字符串中是否含有指定内容，搜索到内容返回指定索引与`indexOf`类似，只找第一个，即使开了全局也不可以 
- `.match()`从一个字符串中将符合条件的提取出来
  ```js
  "a1b2c3d4e5".match(/[A-z]/);
  "a1b2c3d4e5".match(/[A-z]/g);
  ```
  结果
  ```
  ["a", ...]
  (5) ["a", "b", "c", "d", "e"]
  ```
  注意这个方法匹配的结果数组

- `replace()`两个参数，被替换的正则表达式，替换之后的内容，默认只替换第一个，需要开启全局模式，第二个参数不写相当于就是删除

**UPD 20201201**

尝试在浏览器运行以下代码
```js
var reg=new RegExp("^\/file\/","ig");
reg.test("\/file\/123")
reg.test("\/file\/123")
reg.test("\/file\/123")
reg.test("\/file\/123")
```
得到了一个交替出现的true&false,这是因为  
正则.test()等几乎所有正则对象的方法都会记忆上次正则到的位置，在下次匹配同一个对象(同一个静态值有可能会被视为同一个对象)时，会从这个位置开始向后继续查找，如：  
正则匹配全局后 lastIndex会加1，下一次匹配会变成从前一个匹配到的位置开始，所以匹配失败，匹配失败后lastIndex会变成0，再下一次匹配从第一位开始，匹配成功
  
解决:

1. 定义变量接收let bool=reg.test(str),后面用bool判断
2. 去掉/g
3. 手动把reg.lastIndex=0

## DOM
DOM是文档对象模型的简称，JS中可以通过DOM对HTML文档进行操作

- 文档: 指的是整个HTML页面
- 对象: 表示将文档的每一个部分都转化为了一个对象
- 模型: 表示对象之间的关系，方便我们获取对象
- 节点: 是我们网页的基本组成部分，是文档最基本的单元，大致可以分成四种
  - 文档节点: 整个HTML文档
  - 元素节点: HTML中的标签
  - 属性节点: 元素的属性
  - 文本节点: HTML标签中的文字内容
- 节点的属性:
  
|          | nodeName  | nodeType | nodeValue |
| -------- | --------- | -------- | --------- |
| 文档节点 | #documrnt | 9        | null      |
| 元素节点 | 标签名    | 1        | null      |
| 属性节点 | 属性名    | 2        | 属性值    |
| 文本节点 | #text     | 3        | 文本内容  |

上述东西都是用来操作网页的

例如我们可以使用如下代码操作网页
```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <button id="btm">我是一个按钮</button>
    <script>
        // 浏览器已经为我们提供了文档节点，代表整个网页
        var btn = document.getElementById("btm");  // 绑定对象
        btn.innerHTML="123";   // 修改文字
    </script>
</body>
</html>
```

## DOM中的事件

事件是浏览器和文档窗口之间发生的交互瞬间,比如鼠标移动，点击按钮，关闭页面...

我们可以在事件对应的属性中设置一下代码，时间被触发的时候执行
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btm">我是一个按钮</button>
    <script>
        //获取按钮
        var btn = document.getElementById("btm");
        // 为单击时间绑定一个函数
        btn.onclick = function(){alert("123");};
    </script>
</body>
</html>
```

浏览器在家在一个页面的时候是自上向下家在的,读一行运行一行那个,如果script太靠上会导致先加载代码后显示网页

如果执意想写上面的话,要加入命令告诉浏览器加载完成之后在执行,命令是`onload`
```js
window.onload=function(){
  alert("123");
}
```

如果想追求性能写下面

去生产环境其实那里都有

## 获取元素节点对象

- `document.getElementById()`通过ID获取一个元素节点的对象,注意是Element不是Elements所以必须是一个元素
- `document.getElementsByTagName()`注意这里是Elements,所以是返回一组对象 通过节点标签获取
- `document.getElementsByName()`注意这里是Elements,所以是返回一组对象 通过Name属性获取

注意: `getElementsByTagName()`等elements函数返回的都是一个类数组对象,查询到的元素都会封装到类数组中,即使查询到的元素只有一个也会被封装到一个数组中 

对于自结束标签,innerHtml无意义

如果需要读取元素节点的属性直接就是`元素.属性名`,只有class不可以用这个方式读取, 因为class是js的保留字,相当于HTML用了,但是在JS中不可以使用,JS中HTML被占用了, 方法很简单,换一个元素即可,换成`className` 

例如如下代码实现了一个轮播图的效果
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        img{
            width: 100%;
            margin: 50px auto;
        }
    </style>
</head>
<body>
    <img src="./img/imgs1.jpg" alt="">
    <button id="next">下一张图片</button>
    <button id="last">上一张图片</button>
</body>

<script>
    var pic=document.getElementsByTagName("img")[0];
    var lst=document.getElementById("last");
    var nxt=document.getElementById("next");
    var idx=0;
    nxt.onclick = function(){
        pic.src="./img/imgs"+(++idx)%4+".jpg";
    }
    lst.onclick = function(){
        pic.src="./img/imgs"+(idx=(idx-1+4))%4+".jpg";
    }
</script>
</html>
```

## 获取元素的子节点

- `Elem.getElementsByTagName()`在Elem元素的子节点中搜索
- `Elem.childNodes`当前元素的所有子节点
- `Elem.firstChild`当前节点的第一个子节点
- `Elem.lastChild`当前节点的最后一个子节点

注意,childNodes会获取文本节点在内的所有节点,包括文本,例如
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
如果尝试查询ul的childNodes会发现有9个,1个是: `ul`后面的那个回车与空格,4个是: `li`后面的那个回车与空格,4个是`li`标签

确实不当人,你可以删除空白减少数目

**注意,IE8及一下不会将空格当成子节点**

可以使用children属性,没有兼容性问题

first,lastChild也获取空白 

## 获取父元素与兄弟节点
- `Elem.parentNode`获取父元素,是**属性**
- `Elem.previousElementSibling()`获取前一个兄弟元素(IE8- 不支持)
- `Elem.NextElementSibling()`获取后一个兄弟元素(IE8- 不支持)

- `.innerText()` 与`innerHTML()`唯一的不同就是去除了HTML标签
- `.previousSibling` 获取前一个兄弟**节点**,有可能是文本节点
- `.previousElementSibling` 获取前一个兄弟**元素**，一定是元素，**IE8不支持**
- 获取文本节点的文本内容: 见前表，使用nodeValue
- 为了防止重定义： body使用document.body
- 为了防止重定义： body使用document.documentElement
- `document.all` 选中所有元素

- `getElementsByClassName()` 获取指定类的元素序列(IE8及以下不支持)
- `querySelect()` 可以根据CSS选择器获取节点(IE7及以下不支持)
- `querySelectAll()` 可以根据CSS选择器获取节点**类数组**(IE7及以下不支持)

## a标签点击点击的默认行为

如果写`<a>`标签的onclick,在点击结束,执行完JS代码后,会执行a的链接地址,会跳转到位置页面,可以在onclick函数写完返回false禁止这种行为

例如,删除自己所在的tr:
```js
window.onload=function(){
  var allA = doctment.getElementByTagName("a");
  for(var i=0;i<allA.length;i++){
    allA[i].onclick=function(){
      var tr = this.parentNode.parentNode;
      //alert("确认删除")
      var tgname = tr.getElementsByTagName("tr")[0].innerHTML;
      if confirme("确认"+tgname+"删除")
        var.parentNode.removeChild(tr);
    }
  }
}
```

## table使用的注意事项
即使你在HTML中没有写tbody,浏览器也会自动加上,所以选择元素的时候注意加上`tbody`等元素 

## js中索索引变化的问题

有如下代码

```js
window.onload(){
  var s = querySelectAll(XXX);
  for(var i=0;i<s.length;i++){
    s[i].onclick=function(){
      alert(i);
    }
  }
}
```

之后,我们发现点击s[i]都会输出`s.length`,这是因为JS虽然语法规则与C++出奇类似,但是是一门**解释型语言**,不妨模拟一下运行流程(假设长度为3)

```
JS解释器读取到`window.onload(){`
JS解释器等待到页面加载完成...
JS解释器定义s,获取s`var s = querySelectAll(XXX);`
JS解释器执行for
  i=0:
    s[0].onclick=function(){
      alert(i);
    }
    // 注意此时内部只是一个字符串,这是一个对象,里面的i替换
  i=1:
    s[1].onclick=function(){
      alert(i);
    }
    // 注意此时内部只是一个字符串,这是一个对象,里面的i替换
  i=2:
    s[2].onclick=function(){
      alert(i);
    }
    // 注意此时内部只是一个字符串,这是一个对象,里面的i替换
  i=3:
    JS解释器退出循环
JS解释器等待其他操作

JS解释器发现s[1]的按钮被按下
JS执行函数`function(){alert(i);}
JS进入函数,发现i找不到,去更大作用域找,发现在for里面有一个i=3
JS输出i=3
```

如果是编译型语言就会在生成的时候直接 替换内部,没有这个问题,我们可以写下以下代码来验证上述过程的正确性

```html
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <a href="123">1</a>
    <a href="123">2</a>
    <a href="123">3</a>
</body>

<script>
    window.onload=function(){
        var allA=document.querySelectorAll("a");
        var i;
        for(i=0;i<allA.length;i++)
            allA[i].onclick=function(){
                alert(i);
                return false;
            }
        i+=100;
    }
</script>
</html>
```
任意一个输出103

在实际使用中注意
```js
window.onload(){
  var s = querySelectAll(XXX);
  for(var i=0;i<s.length;i++){
    s[i].onclick=function(){
      this.XXX=XXX;
      ...
    }
  }
}
```
没问题,click里面没有用i,用的是this,可以正常调用
```js
window.onload(){
  var s = querySelectAll(XXX);
  for(var i=0;i<s.length;i++){
    s[i].onclick=function(){
      s[i].XXX=XXX;
      ...
    }
  }
}
```
会炸,因为s[i]永远是那个s[s.length]

## 操作内联样式

因为之前的JS都是操作HTML(结构),现在想操作CSS(表现)

可以使用`elem.style.样式名=样式值`

**注意,样式值必须加引号,如下**

注意,样式名带`-`的在JS中会认为是减号,不合法,需要去掉`-`,后一位大写,如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .box{
            width: 200px;
            height: 200px;
            background-color: #bfa;
        }
    </style>
</head>
<body>
    <div class="box"></div>
    <button value="按钮">按钮</button>
</body>
<script>
    window.onload=function(){
        var box=document.querySelector(".box");
        var btn=document.querySelector("button");
        btn.onclick=function(){
            box.style.backgroundColor="#000";
            box.style.width="100px";
            box.style.height="100px";
        }
    }
</script>
</html>
```

注意,如果原来样式加入了`!import`,JS就废了

不加="XXX"的话就可以读取样式了,但是注意,读取的结果都是有单位的字符串,有px,不要随便相加

**通过style属性写入与读取的都是内联样式,样式表设置的读取不了!!!**

## 获取元素的其他样式

上述的style仅仅可以获取内联样式的值,可以将style换成`currentStyle`获取**当前正在生效的值**,不是一定是内联还是样式表,还是JS文件

但是有的时候我们不需要这样,例如定义了一个div,宽度默认是auto,那么获取的结果也是auto,并不是实际显示的宽度 

**currentStyle只有IE支持**

在其他浏览器中我们可以使用`getComputedStyle()`这个**window的方法**来获取样式

字面意可以这个是直接获取了具体的值(浏览器开发者工具那个computed)

IE8及以下不支持

用法为:`getComputedStyle(元素,伪元素)`,没有伪元素的写null,返回值是元素的CSS属性类,例如

```js
var box=document.queryS...;
var boxStyle=getComputedStyle(box,null);
alert(boxStyle.width);
```

问题在于我们的项目如果需要兼容IE8应该如何处理呢?
- 用`currentStyle`chrome报错
- 用`getComputedStyle`IE8报错
- 可以自己封装一个函数解决问题
```js
function getStyle(elem,name){
  if(window.getComputedStyle)
    return getComputedStyle(elem,null)[name];
  return elem.currentStyle[name];
}
```
也可以写作
```js
function getStyle(elem,name){
  if("getComputedStyle" in window)
    return getComputedStyle(elem,null)[name];
  return elem.currentStyle[name];
}
```
都可以改成三目运算符

不用`if(getComputedStyle in window)`是因为`in`前面应该是变量名,如果不加`""`会认为是变量值(也就是getComputedStyle的函数定义语句作为变量名)是不会是一个属性值

注意:通过`getComputedStyle`,`getCurrentStyle`获取的属性全部是只读的,不可修改

## 其余的样式方法
- `elem.clientHeight` 获取元素可见高度的属性 无单位 只读
- `elem.clientWidth` 获取元素可见宽度的属性 无单位 只读

例如一个div是padding:10px,width=100px,heigh=100px;那么这个可见宽度是120,但是上一节的结果查出来是100px

- `elem.offsetHeight` 获取元素可见高度(包括边框)的属性 无单位 只读
- `elem.offsetWidth` 获取元素可见宽度(包括边框)的属性 无单位 只读
- `offsetParent` 定位父元素:获取最近的包含块
- `offsetParent` 相对于定位父元素左偏移量:获取最近的包含块左偏移量
- `offsetParent` 相对于定位父元素右偏移量:获取最近的包含块右偏移量
- `scrollWidth` 元素在滚动的时候最大宽度
- `scrollHeight` 元素在滚动的时候最大高度
- `scrollLeft` 水平滚动条滚动的距离
- `scrollTop` 垂直滚动条滚动的距离
- **注意一个元素如果有滚动条,那么clientHeight会加上滚动条的宽度**

- `onscroll`当元素滚动条在被调用
- `onmousemove`当元素**上**有鼠标
- `event.clientX`鼠标在可视区域的左偏移
- `event.clientY`鼠标在可视区域的上偏移
- `event.pageX`鼠标在整个页面的左偏移 IE8及以下不兼容
- `event.pageY`鼠标在整个页面的上偏移 IE8及以下不兼容

注意,对于全页面的滚动条,chrome认为是body的,但是firefox认为是html的,所以如果想要获取全页面的滚动条可以
```js
var scr = document.body.XXX || document.documentElement.XXX
```

## 事件对象
希望做一个实时显示鼠标坐标的功能

**事件**应该是`onmousemove`,在移动的时候被出发

- 当事件对象被触发的时候,浏览器会对每一个事件进行实参传入,我们可以定义一个随便起个名字接受他, 这个事件会封装事件相关的细节变量,但是IE8不支持,在IE8中浏览器不会传递实参,而是将事件对象作为window的属性保存的,于是我们写下
```js
elem.onmousemove=function(event){
  event=event||window.event;
  console.log(event.cilentX);
  console.log(event.cilentY);
}
```

## 事件的冒泡

冒泡指的是事件的向上传导,当后代元素的某个事件被触发,他的祖先元素如果拥有相同的事件那么也将会被触发,子元素优先执行

注意,冒泡对于一般的开发是好的,但是如果想要取消冒泡也很简单,如果原函数没有event就添加event,然后写程序结束的时候写下`event.cancelBubble=true`着冒泡至此停止,全浏览器支持

## 事件的委派

当我们尝试添加一个对象的时候可以直接创建对象,对象的innerHTML设置为HTML代码,这样可以免去创建与连接节点的步骤,但是这样会导致之前的节点失效,解决方法是吧所有对于该节点所有相同的方法全部设置到节点的公共父元素上,这样由于事件的冒泡,后面的子节点事件发生他的公共祖先元素也会被调用,这就叫事件的委派

值得注意的是,如果我们想对指定的某一部分元素进行委派可以为准备委派的元素设定特定的class等标签实现,这里需要用到`event.target`属性,他的值是事件叶子节点的元素,我们可以通过`event.target.class`判断是否之指定的元素,如果元素绑定了多个class则需要使用正则

## 事件的绑定

- 使用`对象.事件=function(){}`的方法绑定元素之可以绑定一个事件,如果绑定多个会导致后面的函数覆盖前面的的函数
- 使用`addEventListener("事件字符串去掉on",回调函数,是否在捕获阶段触发事件一般false)`通过这个方法也可以为元素绑定响应函数. 注意,如果事件字符串有on一定要删除,例如
```js
box.addEventListener("click",function(){
  //...
},false);
```
本来是要绑定`onclick`但是现在换成了`click`,**绑定的事件是先绑定先执行**,函数的this是调用元素

- IE8及以下不支持,IE5-10提供了:`.attachEvent()`,用法是`.attachEvent("事件字符串不能删去on",函数)`,不需要第三个参数,有on的事件的on不能删除,**绑定的事件是后绑定先执行**,其中的this是`window`
- 要解决兼容性还想需要我们自己抽象函数
```js
function bind(obj,eventstr,callback){
  if(obj.addEventListener)
    obj.addEventListener(eventstr,callback,false);
  else
    obj.attachEvent("on"+eventstr,function(){
      // 解决IE this为window的问题
      callback.call(obj);
    });
}
```

## 事件的传播

对于事件的传播网景与微软有着不同的理解,微软认为元素的事件应该是由内而外的传播,应该先触发当前元素上的事件,然后传播到祖先元素

- 事件的冒泡: 触发事件的时候应该先触发内部的元素,然后传递到祖先元素
- 事件的捕获: 触发时间后先触发事件的祖先元素,之后传递到叶子节点
- W3C综合了两方观点,将事件分成了单个阶段:
  - 捕获阶段: 捕获阶段从最外层祖先元素开始,想目标元素进行捕获,凡是此时默认不触发事件
  - 目标阶段: 捕获的目标元素
  - 冒泡阶段: 事件从祖先目标元素开始传递,依次触发祖先元素
  - 

## 全选问题
有点时候我们想拖动元素,但是如果选中了其他文字会导致文字被移动进入搜索模式,解决方法如下

- 非IE: 拖动函数`return false;`取消默认操作
- IE: 设置全局捕获,此时在任何元素上的对应操作都会被绑定到被设置的元素,甚至在浏览器之外的地方进行操作都会"重定向"到被设置元素,取消捕获可以使用`releaseCapture();`,chrome不认,写成`this.setCapture && this.setCapture();`例子见拖动

## 拖动
实现一个鼠标拖动
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        html {
            height: 2000px2;
        }
        
        .box1,
        .box2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 200px;
            height: 200px;
            background-color: #bfa;
            z-index: 9;
        }
    </style>
</head>
<body>
    <p>123</p>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box2" style="z-index:999;background-color: bisque;left:200px;top:200px"></div>
</body>
<script type="text/javascript">
    window.onload = function() {
        var box = document.querySelector(".box1");
        var box2 = document.querySelector(".box2");
        box.onmousedown = function(event) {
            event = event || window.event;
            this.setCapture && this.setCapture();
            var obj = this;
            var boxstyle = getComputedStyle(this, null);
            var offsetX = event.clientX - parseInt(boxstyle.left);
            var offsetY = event.clientY - parseInt(boxstyle.top);
            var zidx = parseInt(boxstyle.zIndex);
            window.onmousemove = function(event) {
                event = event || window.event;
                var X = event.clientX;
                var Y = event.clientY;
                obj.style.left = X - offsetX + "px";
                obj.style.top = Y - offsetY + "px";
                obj.style.zIndex = 2147483647;
            };
            window.onmouseup = function(event) {
                obj.releaseCapture && obj.releaseCapture();
                event = event || window.event;
                obj.style.zIndex = zidx;
                window.onmousemove = null;
                this.onmouseup = null;
            };
            return false; // 取消全选
        }
        box2.onmousedown = box.onmousedown;
    }
</script>
</html>
```

## 滚轮事件
- chrome,IE的鼠标滚动事件是:`onmousewheel`
- 火狐是`DOMMouseScroll`并且不接受直接定义,必须是`addEventListerer`绑定

判断滚动方向需要event

- 对于chrome,IE,使用`event.wheelDelta`正数是向上,向下是负,数值大小没有意义
- 对于火狐,使用`event.detail`负数是向上,正数向下,数值大小没有意义

取消默认行为

滚动的时候会冒泡的全局拖动滚动条,所以要关闭

- chrome与IE: `return false;`
- 火狐:`event.preventDefault()`

例子
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box1{
            height: 100px;
            width: 100px;
            background-color: #bfa;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
</body>
<script>
    window.onload=function(){
        var box=document.querySelector(".box1");
        box.onmousewheel=function(event){
            event=event||window.event;
            var boxstyle = getComputedStyle(this, null);
            box.style.height=(Math.max(10,parseInt(boxstyle.height)+(event.wheelDelta/Math.abs(event.wheelDelta))))+"px";
            event.preventDefault||event.preventDefault();
            return false;
        }
    }
</script>
</html>
```

## 键盘事件
- `onkeydown` 按键被按下
- `onkeyup` 键盘被松开

键盘事件一般被绑定给可以获取焦点的对象(光标可以闪的对象),实际上都可以绑定

注意,`onkeydown`如果按下一个按键不松开会连续触发,但是第一次触发后稍微卡一下,这是浏览器设计的时候为了防止误触

- 可以使用`.keyCode`获取按下的按键的unicode编码
- 判`Ctrl+W`是否被按下:ctrl的ASCII为17,W的unicode为87,但是不能写
```js
event.keyCode==17&&event.keyCode==87
```
这明显是假的,我们可以用特殊的键判断:
```js
event.ctrlKey&&event.KeyCode==87
```
类似还有`altKey`,`ctrlKey`,`shiftKey`按下返回`true`

- 在文本框中输入内容属于文本框的默认行为可以使用`return false;`禁用显示输入

## BOM
BOM 浏览器对象模型

BOM可以通过JS操作浏览器, JS为我们提供了一族对象实现了对浏览器的操作,有

- window
  - 代表整个浏览器的窗口,也是window是全局对象
- navigator
  - 代表了当前浏览器的信息,通过这个对象可以识别浏览器
- location
  - 代表当前浏览器的地址栏信息
- history
  - 代表浏览器的历史记录,可以通过这个对象操作历史记录
  - 由于隐私的原因,不能获取具体的历史记录,只能向前后翻页
  - 该操作只能在当次访问有效
- screen
  - 代表用户的屏幕信息,这个对象可以获取显示器的相关信息   
- 以上出来window之外的都是window的元素

## Navigator
- `appName`返回浏览器名称
  - 由于历史原因,Navigator大部分属性都不能帮助我们识别浏览器了
  - 这个属性出来IE9及以下显示MS IE,其他都是网景,一般用一下方式判断浏览器信息
- `userAgent`描述浏览器信息的内容
  - `chrome`:"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
  - ...
  - 通过看这个字符串里面有没有firefox,chrome,MSIE(IE10-),什么都没有(IE11)
  - IE11啥都没有可以用IE特有的属性确定是否存在例如`ActiveXObject`,但是这个属性被用的太多了,所以微软吧这个属性的bool转化为了false我们可以改为`ActiveXObject in window `

获取元素到底转化为bool的什么了可以使用`!!XXX`

## history
- `length` 历史记录长度
- `back()` 回到上一个页面,与浏览器的回退一样
- `forward()` 去下一个页面,与浏览器的前进一样
- `go()` 使用整数作为操作数,正数表示向前,负数向后,绝对值表示跳转页面数

## loacation
直接打印location就可以获得当前页面的完整路径,如果修改了路径值,浏览器会自动刷新到修改的路径,同时生成历史记录

- window.location.href 返回当前页面的 href (URL)
- window.location.hostname 返回 web 主机的域名
- window.location.pathname 返回当前页面的路径或文件名
- window.location.protocol 返回使用的 web 协议（http: 或 https:）
- window.location.assign 加载新文档和直接修改值一样
- window.location.reload() 重新加载文档(保存表单等缓存)
- window.location.reload(true) 重新加载文档(强制清空缓存)
- window.location.replace() 跳转链接(不保存历史记录)

## window

- alert 只有确定的警告框
- confirm 有确定和取消的警告框
- prompt 可以输入数据的警告框
- setInterval(回调函数,时间ms);开启定时器，window的方法，将一个函数每隔一段时间执行一次, 返回number类型的数据，作为定时器的id
- clearInterval(n);关闭标识为n的定时器，n为undefined不报错
- 注意 setInterval 调用多次会调用多个计时器，在开的时候注意要不要清除以前的
- setTimeout(function(){},时间ms);定时之后执行一次

## 类的操作
代码与笔记
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
      
      .b1{
        width: 100px;
        height: 100px;
        background-color: red;
      }
      
      .b2{
        height: 300px;
        background-color: yellow;
      }
      
    </style>
    
    <script type="text/javascript">
      
      window.onload = function(){
        //获取box
        var box = document.getElementById("box");
        //获取btn01
        var btn01 = document.getElementById("btn01");
        
        //为btn01绑定单击响应函数
        btn01.onclick = function(){
          //修改box的样式
          /*
           * 通过style属性来修改元素的样式，每修改一个样式，浏览器就需要重新渲染一次页面
           *  这样的执行的性能是比较差的，而且这种形式当我们要修改多个样式时，也不太方便
           */
          /*box.style.width = "200px";
          box.style.height = "200px";
          box.style.backgroundColor = "yellow";*/
          
          /*
           * 我希望一行代码，可以同时修改多个样式
           */
          
          //修改box的class属性
          /*
           * 我们可以通过修改元素的class属性来间接的修改样式
           * 这样一来，我们只需要修改一次，即可同时修改多个样式，
           *  浏览器只需要重新渲染页面一次，性能比较好，
           *  并且这种方式，可以使表现和行为进一步的分离
           */
          //box.className += " b2";
          //addClass(box,"b2");
          
          //alert(hasClass(box,"hello"));
          
          //removeClass(box,"b2");
          
          toggleClass(box,"b2");
        };
        
      };
      
      //定义一个函数，用来向一个元素中添加指定的class属性值
      /*
       * 参数:
       *  obj 要添加class属性的元素
       *  cn 要添加的class值
       *  
       */
      function addClass(obj , cn){
        
        //检查obj中是否含有cn
        if(!hasClass(obj , cn)){
          obj.className += " "+cn;
        }
        
      }
      
      /*
       * 判断一个元素中是否含有指定的class属性值
       *  如果有该class，则返回true，没有则返回false
       *  
       */
      function hasClass(obj , cn){
        
        //判断obj中有没有cn class
        //创建一个正则表达式
        //var reg = /\bb2\b/;
        var reg = new RegExp("\\b"+cn+"\\b");
        
        return reg.test(obj.className);
        
      }
      
      /*
       * 删除一个元素中的指定的class属性
       */
      function removeClass(obj , cn){
        //创建一个正则表达式
        var reg = new RegExp("\\b"+cn+"\\b");
        
        //删除class
        obj.className = obj.className.replace(reg , "");
        
      }
      
      /*
       * toggleClass可以用来切换一个类
       *  如果元素中具有该类，则删除
       *  如果元素中没有该类，则添加
       */
      function toggleClass(obj , cn){
        
        //判断obj中是否含有cn
        if(hasClass(obj , cn)){
          //有，则删除
          removeClass(obj , cn);
        }else{
          //没有，则添加
          addClass(obj , cn);
        }
        
      }
      
    </script>
  </head>
  <body>
    
    <button id="btn01">点击按钮以后修改box的样式</button>
    
    <br /><br />
    
    <div id="box" class="b1 b2"></div>
  </body>
</html>

```
