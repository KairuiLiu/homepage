---
title: JavaScript变量存储机制
date: 2022-3-1 00:00:01
toc: true
description: 网上说的"对于原始类型, 数据本身是存在栈内, 对于对象类型, 在栈中存的只是一个堆内地址的引用"似乎有些不妥. 我们将讨论什么样的变量有资格存储在栈中, 存储在栈中的元素究竟存的是字面量还是引用.
categories:
  - [前端, JS语法]
tags:
  - 前端
  - JS语法
---

本文分两个部分讨论变量存储模式

- 局部/ 全局/ 闭包变量的存储机制: 在这部分我们讨论什么样的变量有资格存储在栈中
- 不同类型变量的存储机制: 在这部分我们讨论存储在栈中的元素究竟存的是字面量还是引用

先说结论: 万物都存在堆中, 有的变量会在栈上存储引用地址

### 堆与栈

- 堆是一个很大的内存存储空间, 你可以在里面存储任何类型数据. 操作系统不会自动回收. 在栈中存储不了的数据比如对象就会被存储在堆中, 在栈中呢是保留了对象在堆中的地址, 也就是对象的引用.
- 栈是内存中一块用于**存储局部变量和函数参数的线性结构**, 遵循着先进后出的原则. 数据只能顺序的入栈, 顺序的出栈. 内存中栈区的数据, 在函数调用结束后, 就会自动的出栈, 不需要程序进行操作, 操作系统会自动回收

于是出现了一个问题, 在闭包出现时, 函数是如何访问到闭包所在的已经销毁的栈中的变量的呢?

### 局部/全局/闭包变量的存储机制

- 局部变量: 最简单的, 局部变量存储在作用域所在的栈空间中, 例如
  ```js
  function demo() {
    let a = 1;
    let b = '213';
    let c = [213];
    let d = new Object();
  }

  console.dir(demo);
  
  // ƒ demo()
  //   arguments: null
  //   caller: null
  //   length: 0
  //   name: "demo"
  //   prototype:
  //     constructor: ƒ demo()
  //     [[Prototype]]: Object
  //   [[FunctionLocation]]: demo.html:53
  //   [[Prototype]]: ƒ ()
  //   [[Scopes]]: Scopes[1]
  //     0: Global {0: Window, window: Window, self: Window, document: document,
  ```
  在上面我们找不到定义的变量, 在DevTools的内存-堆分析中也找不到他们

- 全局变量
  - 使用`var`声明的全局变量  
    使用`var`声明全局变量其实仅仅是为`global`对象添加了一条属性, 全局变量会被默认添加到函数作用域链的最底端, 也就是`[[Scopes]]`中的最后一个
    ```js
    var aaa = 1;          // 随便var一个变量
    // 等同于 window.aaa = 1;
    console.dir(()=>{})   // 随便打印一个函数看看他的作用域

    // anonymous()
    //   length: 0
    //   name: ""
    //   arguments: (…)
    //   caller: (…)
    //   [[FunctionLocation]]: VM167:1
    //   [[Prototype]]: ƒ ()
    //   [[Scopes]]: Scopes[1]    <- 看到函数的作用域
    //     0: Global              <- 只有global(window)作用域
    //       aaa: 1               <- 看到window上的aaa
    //       alert: ƒ alert()
    //       atob: ƒ atob()
    //       blur: ƒ blur()
    //       btoa: ƒ btoa()
    ```
  - 使用`let`/`const`声明全局变量不会修改`window`对象, 而是将变量的声明放在了一个特殊的对象`Script`下
    ```js
    let t1 = 1;
    const t2 = 2;
    console.dir(()=>{})

    // anonymous()
    //   length: 0
    //   name: ""
    //   arguments: (…)
    //   caller: (…)
    //   [[FunctionLocation]]: VM99:1
    //   [[Prototype]]: ƒ ()
    //   [[Scopes]]: Scopes[2]      <- 查看作用域
    //     0: Script {t1: 1, t2: 2}   <- 看到这些数据被存储到了Script对象中
    //     1: Global {window: Window, self: Window, document: document,...}
    ```

- 闭包中的变量: 闭包中的变量会在子函数调用的时候存储为一个对象(存储在堆中), 并在`[[Scopes]]`的`Closure(闭包)`中体现
  ```js
  function testCatch1 () {
    let a1 = 1;
    var a2 = 'a';
    const a3 = true;
    let a4 = {a: 1};
    return function () {
        console.log(a1, a2, a3, a4)
    }
  }

  function testCatch2 () {
  let a1 = 1;
  var a2 = 'a';
  const a3 = true;
  let a4 = {a: 1};
  return function () {
      console.log(a1, a2, a3, a4)
  }
  }

  console.dir(testCatch1())

  // ƒ anonymous()
  //   arguments: null
  //   caller: null
  //   length: 0
  //   name: ""
  //   prototype: {constructor: ƒ}
  //   [[FunctionLocation]]: VM469:6
  //   [[Prototype]]: ƒ ()
  //   [[Scopes]]: Scopes[2]
  //     0: Closure (testCatch1) {a1: 1, a2: 'a', a3: true, a4: {…}}  <- 可以看到是按照对象存储在堆中的 
  //     1: Global {window: Window, self: Window, document: document, name: '',...} <- global在作用域最后

  console.dir(testCatch2())

  // ƒ anonymous()
  //   arguments: null
  //   caller: null
  //   length: 0
  //   name: ""
  //   prototype: {constructor: ƒ}
  //   [[FunctionLocation]]: VM469:16
  //   [[Prototype]]: ƒ ()
  //   [[Scopes]]: Scopes[2]
  //     0: Closure (testCatch2) {a1: 1, a2: 'a', a3: true, a4: {…}} <- 可以看到是按照对象存储在堆中的, 但是闭包名不同
  //     1: Global {window: Window, self: Window, document: document, name: '',}

  console.dir(testCatch1().a4 === testCatch1().a4)

  // true <- 连引用对象都是相同的
  ```

小结: 除了局部变量, 其他变量都在堆中

那么, 栈中变量是如何存储的呢? 是如开头所说基本数据类型存字面值, 对象存引用地址吗?

### 不同类型变量的存储机制

- 对于对象类型的数据, 毫无疑问: 栈中存储的是对象在堆中的地址
- 对于基础数据类型呢? 他存储的是字面量吗? 首先我们清楚基础类型包括
  - Number & String & Boolean
  - Null & Undefined
  - Symbol & BigInt

#### String类型

- 首先创建两个包含string的对象
  ```js
  const BasicVarGen = function () {
      this.s1 = 'IAmString'
      this.s2 = 'IAmString'
  }

  let a = new BasicVarGen()
  let b = new BasicVarGen()
  ```
  切换到DevTools-内存-堆快照-BasicVarGen
  ```js
  BasicVarGen×2	

    BasicVarGen@47647
      __proto__::Object@52873
      map::system / Map@52877
      s1::"IAmString"@16065🗖
      s2::"IAmString"@16065🗖
      
    BasicVarGen@47649
      __proto__::Object@52873
      map::system / Map@52877
      s1::"IAmString"@16065🗖
      s2::"IAmString"@16065🗖
  ```
  可以看到a, b两个对象的虚拟地址不同, 但是s1与s2指向的虚拟地址都是`@16065`, **四个变量存储的都是引用地址**
- 继续实验, 尝试在新建对象后增加变量, 修改变量值
  ```js
  const BasicVarGen = function () {
    this.s1 = 'IAmstring'
    this.s2 = 'IAmstring'
  }

  let a = new BasicVarGen()
  let b = new BasicVarGen()
  debugger
  a.s0 = 'different string'
  a.s2 = 'IAmstring1'
  b.s1 = 'IAmstring'
  b.s2 = 'IAm' + typeof '111'
  ```
  分别记录debugger前后内存, 比较
  ```diff
  BasicVarGen×2	

    BasicVarGen@64695
      map::system / Map@67337
      __proto__::Object@67331
  +   s0::"different string"@16533🗖    <- 新增的string有自己的地址
      s1::"IAmstring"@64749🗖
  -   s2::"IAmstring"@64749🗖
  +   s2::"IAmstring1"@64745🗖    <- string内容变化会导致地址变化

    BasicVarGen@64697
      map::system / Map@67337
      __proto__::Object@67331
      s1::"IAmstring"@64749🗖    <- 赋相同值不会导致地址变化
  -   s2::"IAmstring"@64749🗖    
  +   s2::"IAmstring"@74797🗖    <- 虽然字面量相同, 但是存储地址不同
  ```


**结论**

当我们声明一个字符串时: 

- v8内部有一个名为stringTable的hashmap缓存了所有字符串, 在V8阅读我们的代码, 转换抽象语法树时, 每遇到一个字符串, 会根据其特征换算为一个hash值, 插入到hashmap中. 在之后如果遇到了hash值一致的字符串, 会优先从里面取出来进行比对, 一致的话就不会生成新字符串类. 
- 缓存字符串时, 根据字符串不同采取不同hash方式. 
- 字符串拼接时如果以传统方式(如SeqString)存储, 拼接操作的时间复杂度为O(n), 采用绳索结构(也就是 ConsString 所采用的数据结构)可以减少拼接所花费的时间, 但是不被hash为同一值. 

#### Number

数字在V8中分为`smi`和`heapNumber`. 

- `smi`直接存进内存, 范围为: $-2^{31}\sim 2^{31}-1$的整数
- `heapNumber`类似字符串, 范围为: 所有非`smi`的数字, 最低位用来表示是否为指针, 最低位为1则是一个指针
  ```js
  const o = {
    x: 42,  // Smi
    y: 4.2, // HeapNumber
  };
  ```
  `o.x`中的`42`会被当成`Smi`直接存储在对象本身, 而`o.y`中的`4.2`需要额外开辟一个内存实体存放, 并将o.y的对象指针指向该内存实体.  

如果是32位操作系统, 用32位表示`smi`可以理解, 可是64位操作系统中, 为什么`smi`范围也是$-2^{31}\sim 2^{31}-1$? ECMAScript 标准约定`number`数字需要被当成64位双精度浮点数处理, 但事实上, 一直使用64位去存储任何数字实际是非常低效的(空间低效, 计算时间低效 `smi`大量使用位运算), 所以JavaScript引擎并不总会使用64位去存储数字, 引擎在内部可以采用其他内存表示方式(如32位), 只要保证数字外部所有能被监测到的特性对齐64位的表现就行. 

套用之前的实验

```js
const BasicVarGen = function () {
  this.smi1 = 1
  this.smi2 = 2
  this.heapNumber1 = 1.1
  this.heapNumber2 = 2.1
}

let foo = new BasicVarGen()
let bar = new BasicVarGen()

debugger

bar.heapNumber1 ++
bar.sim1 ++
```

```diff
BasicVarGen×2	

  BasicVarGen@5713
    map::system / Map@59709
    __proto__::Object@59707
-   heapNumber1::heap number@59687
+   heapNumber1::heap number@59701
-   heapNumber2::heap number@59691
+   heapNumber2::heap number@59703
-   heapNumber3::heap number@59697
+   heapNumber3::heap number@59705
-   smi1::smi number@30901🗖
+   sim1::heap number@64357
+   smi1::smi number@64483🗖
-   smi2::smi number@30901🗖
+   smi2::smi number@64483🗖
-   smi3::smi number@34275🗖
+   smi3::smi number@64505🗖

  BasicVarGen@5715
    map::system / Map@59709
    __proto__::Object@59707
-   heapNumber1::heap number@59701
+   heapNumber1::heap number@59687
-   heapNumber2::heap number@59703
+   heapNumber2::heap number@59691
-   heapNumber3::heap number@59705
+   heapNumber3::heap number@59697
-   smi1::smi number@30901🗖
+   smi1::smi number@64483🗖
-   smi2::smi number@30901🗖
+   smi2::smi number@64483🗖
-   smi3::smi number@34275🗖
+   smi3::smi number@64505🗖
```
可以看到在变量修改时, 所有变量都变了

结论: `smi`存储在栈, 其他存储在堆

#### OddBall 类型与 Boolean & Undefined & null

`OddBall`是V8中的一个数据类型, `Oddball`继承于`HeapObject`, 而`HeapObject`继承于`Object`

简单的看下Boolean & Undefined & null

```js
const BasicVarGen = function () {
  this.a = true;
  this.b = false;
  this.c = undefined;
  this.d = null;
}

let foo = new BasicVarGen()
let bar = new BasicVarGen()

debugger

foo.a = false;
foo.b = !(1 <= 0);
foo.c = null;
foo.d = undefined;
```

```diff
BasicVarGen×2	
  BasicVarGen@5713
    map::system / Map@59603
    __proto__::Object@59601
-   d::system / Oddball@69🗖
+   d::system / Oddball@65🗖
-   c::system / Oddball@65🗖
+   c::system / Oddball@69🗖
-   b::system / Oddball@73
+   b::system / Oddball@71
-   a::system / Oddball@71🗖
+   a::system / Oddball@73🗖
  BasicVarGen@5715
    map::system / Map@59603
    __proto__::Object@59601
    d::system / Oddball@69🗖
    c::system / Oddball@65🗖
    b::system / Oddball@73
    a::system / Oddball@71🗖
```

看到了`OddBall`类型, 发现同一值的地址也是相同的. 在赋值时, 也是就地复用. (而且这些拓展自`oddBall`的基本类型, 其地址是固定的, 也就是说, 在V8跑起来的第一时间, 不管我们有没有声明这些基本类型, 他们都已经被创建完毕了. 而我们声明对象时, 赋的是他们的引用. 这也可以解释为什么我们说基本类型是赋到栈中: 在V8中, 存放在`@73`的值, 永远是空字符串, 那么v8就可以等效把这些地址视为值本身. )

**小结**

- 字符串: 存在堆里, 栈中为引用地址, 如果存在相同字符串, 则引用地址相同. 
- 数字:  小整数存在栈中, 其他类型存在堆中. 
- 其他类型: 引擎初始化时分配唯一地址, 栈中的变量存的是唯一的引用. 

### 参考资料

- [zhihu-葡萄zi-JavaScript中变量到底是存储在「栈」还是「堆」上](https://zhuanlan.zhihu.com/p/362219811) [Archive](https://archive.ph/oRv1I) 
- [zhihu-六耳-JavaScript中变量到底是存储在「栈」还是「堆」上](https://www.zhihu.com/question/482433315/answer/2083349992) [Archive](https://archive.ph/aYqlf) 
- [Marco Alka - Does JavaScript use stack or heap for memory allocation or both?](https://hashnode.com/post/does-javascript-use-stack-or-heap-for-memory-allocation-or-both-cj5jl90xl01nh1twuv8ug0bjk)