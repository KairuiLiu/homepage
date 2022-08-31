---
title: JavaScript严格模式
date: 2022-3-2 00:00:01
toc: true
description: 严格模式使代码隐式地脱离"马虎模式/稀松模式/懒散模式"(sloppy)模式, 将语法限制在原来语法的子集中. 
categories:
  - [前端, JS语法]
tags:
  - 前端
  - JS语法
---

严格模式使代码隐式地脱离"马虎模式/稀松模式/懒散模式"(sloppy)模式, 将语法限制在原来语法的子集中.

#### 特性

- 通过抛出错误来消除了一些原有静默错误
- 修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候, 相同的代码, 严格模式可以比非严格模式下运行得更快
- 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法

#### 开启严格模式: 

- 在全局或函数首行加入`'use strict';`
- 严格模式下函数内部不能使用剩余操作符、解构操作符和默认参数等
- 类中的代码默认都在严格模式下执行
- ES6模块默认都在严格模式下执行

#### 将过错失误转为异常

- 禁止**意外的**创建全局变量
  ```js
  'use strict';

  demo1 = 1; // ✖: 意外创建的
  var demo2 = 1; // ✔: 不是意外创建的

  (() => {
    demo3 = 1; // ✖: 意外创建的
    var demo4 = 1; // ✔: 不是全局变量
    global.demo5 = 1; // ✔: 不是意外创建的
  })();
  ```
- 禁止引起**静默失败**(不报错也没有任何效果)的赋值操作. 包括
  - 为不可写属性赋值
    ```js
    'use strict';

    // 不可写属性赋值-1

    NaN = 1; // ✖: 在非严格模式下不报错但无效果, 在严格模式下直接报错
    console.log(NaN);

    // 不可写属性赋值-2

    let obj1 = {};
    // 定义不可写属性x(顺便了解一下defineProperty的参数)
    Object.defineProperty(obj1, 'x', {
      configurable: true, // 能否通过delete删除属性从而重新定义属性, 能否修改属性的特性, 能否把属性修改为访问器属性[默认true]
      enumerable: true, // 能否通过for-in返回属性(默认true)
      writable: false, // 能否修改属性值(默认true)
      value: 123,
      // get(){}  // 我们不用这个属性
      // set(){}  // 我们不用这个属性
    });

    obj1.x = 1; // ✖: x属性是不可写的, 在非严格模式下不报错但无效果, 在严格模式下直接报错

    // ✔: 由于configurable=true, 可以重新定义, 严格模式也不报错
    Object.defineProperty(obj1, 'x', {
      value: 12,
    });
    ```
  - 为只读属性赋值
    ```js
    'use strict';

    // 给只读属性赋值

    let obj2 = {
      x: 1,
      get x() {
        // 一旦用了get, 如果不写set, 那么无法设置x(相当于上面x属性直接无效, 因为set x()和x一起存在要爆栈赋值)
        return 2;
      },
    };

    obj2.x = 3; // ✖: 没有set, 在非严格模式下不报错但无效果, 在严格模式下直接报错
    console.log(obj2.x);
    ```
  - 为不可扩展对象扩展
    ```js
    'use strict';

    // 给不可扩展对象的新属性赋值

    var fixed = {};
    Object.preventExtensions(fixed);
    fixed.newProp = 'ohai'; // ✖: 在非严格模式下不报错但无效果, 在严格模式下直接报错
    console.log(fixed);
    ```
- 禁止删除不可删除属性
  ```js
  'use strict';

  const obj = {};
  Object.defineProperty(obj, 'x', {
    configurable: false,
    value: 1,
  });
  // delete obj.x; // ✖: 不可删除
  console.log(obj.x); // 1

  function foo() {}
  delete foo.prototype; // ✖: 不可删除
  ```
- 对象内的所有属性名在对象内必须唯一(该规则在ES6被取消)
  ```js
  'use strict';

  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 3, b: 4 };
  const obj3 = { ...obj1, ...obj2 }; // ✔: 在ES6不报错
  console.log(obj3);

  const obj4 = { a: 1, b: 2, a: 3, b: 4 };  // ✔: 在ES6不报错
  console.log(obj4);
  ```
- 函数参数名必须唯一. 在非严格模式下, 重名参数名会发生覆盖, 但是仍然可以在arguments中读取到原值
  ```js
  // 单独执行这一部分不报错

  function sloppy(a, a, c) {
    console.log([a, a, c]); // [2,2,3]
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
    return a + a + c;
  }
  sloppy(1, 2, 3);

  // 单独执行这一部分, **即使不调用函数都报错**, 在语法检查的时候就炸了

  function strict(a, a, c) {
    'use strict';
    console.log([a, a, c]);
    console.log(arguments);
    return a + a + c;
  }
  strict(1, 2, 3);
  ```
- 禁止使用加前导`0`的方式表示八进制数, 在ES6中允许使用`0o`做前导表示八进制
  ```js
  'use strict';

  const a = 010;  // ✖: 非严格模式: 8, 严格模式: Error
  console.log(a);
  const b = 0o10; // ✔: 8
  console.log(b);
  const c = '010'; // ✔: 10(可不是8)
  console.log(+c);
  const d = '0o10'; // ✔: 8(ES6支持)
  console.log(+d);
  ```
- 禁止为基本类型(String, Number, Boolean, Null, Undefined, BitInt, Symbol)设置属性
  ```js
  'use strict';

  const a = 123;
  a.demo = 1; // ✖: 禁止设置属性
  console.log(a, a.demo); // 123 undefined
  ```

#### 简化变量的使用

- 禁用`with`, 在运行之前无法获知`with`中变量的指向, 这回拖慢代码执行速度
- 禁止`eval`为外层作用域set/引入变量
  ```js
  var k = 10;

  var x = 17;
  var evalX = eval("'use strict'; var x = k; x"); // 严格模式下不会污染外层x
  console.log(x); // 17
  console.log(evalX); // 10

  var y = 17;
  var evalY = eval('var y = k; y'); // 非严格模式下会污染外层y
  console.log(y); // 10
  console.log(evalY); // 10
  ```
- 禁止`delete`变量
  ```js
  'use strict';

  let obj1 = { a: 1 }; 
  console.log(obj1); // { a: 1 }
  delete obj1.a; // ✔: 允许删除属性
  console.log(obj1); // {}

  let obj2 = { a: 1 };
  console.log(obj2); // { a: 1 }
  delete obj2; // ✖: 不允许删除属性
  console.log(obj2); 
  ```

#### 简化`eval`与`arguments`的怪异行为

- 禁止`eval`与`arguments`被绑定或赋值
  ```js
  "use strict";
  eval = 17;
  arguments++;
  ++eval;
  var obj = { set p(arguments) { } };
  var eval;
  try { } catch (arguments) { }
  function x(eval) { }
  function arguments() { }
  var y = function eval() { };
  var f = new Function("arguments", "'use strict'; return 17;");
  ```
- 严格模式中`arguments`中的值(指针)不会随`arguments`中对象的变化而变化, 非严格模式中`arguments`会随对象的变化而变化
  ```js
  function demo1(a, b, c) {
    a = 2;
    b.a = 2;
    c = { b: 2 };
    return [a, b, c, arguments];
    // [2, { a: 2 }, { b: 2 }, [Arguments] { '0': 2, '1': { a: 2 }, '2': { b: 2 } }]
  }

  console.log(demo1(1, { a: 1 }, { a: 1 }));

  function demo2(a, b, c) {
    'use strict';
    a = 2;
    b.a = 2;
    c = { b: 2 };
    return [a, b, c, arguments];
    // [ 2, { a: 2 }, { b: 2 }, [Arguments] { '0': 1, '1': { a: 2 }, '2': { a: 1 } }]
    // 注意, 他做不了深层检测
  }

  console.log(demo2(1, { a: 1 }, { a: 1 }));
  ```
- 严格模式不允许使用`arguments.callee`获得正在执行的函数
  ```js
  function demo1() {
    console.log(arguments.callee === demo1);
  }

  function demo2() {
    'use strict';
    console.log(arguments.callee === demo2); // ✖
  }

  demo1();
  demo2();
  ```

#### 提升安全性

- 严格模式下通过`this`传递给一个函数的值不会被强制转换为一个对象. 对一个普通的函数来说, `this`总会是一个对象：不管调用时`this`它本来就是一个对象.还是用布尔值, 字符串或者数字调用函数时函数里面被封装成对象的`this`.还是使用`undefined`或者`null`调用函数式`this`代表的全局对象（使用`call`, `apply`或者`bind`方法来指定一个确定的`this`）. 这种自动转化为对象的过程不仅是一种性能上的损耗, 同时在浏览器中暴露出全局对象也会成为安全隐患, 因为全局对象提供了访问那些所谓安全的JavaScript环境必须限制的功能的途径. 所以对于一个开启严格模式的函数, 指定的`this`不再被封装为对象, 而且如果没有指定`this`的话它值是`undefined`: 
  ```js
  function demo1() {
    return this;
  }
  console.log(demo1()); // <ref *1> Object [global]
  console.log(demo1.call(2)); // [Number: 2] <- 是一个Number对象!
  console.log(demo1.apply(null)); // <ref *1> Object [global]
  console.log(demo1.call(undefined)); // <ref *1> Object [global]
  console.log(demo1.bind(true)()); // [Boolean: true]

  function demo2() {
    'use strict';
    return this;
  }
  console.log(demo2()); // undefined
  console.log(demo2.call(2)); // 2
  console.log(demo2.apply(null)); // null
  console.log(demo2.call(undefined)); // undefined
  console.log(demo2.bind(true)()); // true
  ```
- 禁用`function.caller`/`function.caller`以阻止程序"游走于"JS调用栈
  ```js
  'use strict';

  function fun(a, b) {
    // 非严格模式: true
    // 严格模式  : TypeError
    console.log(fun.caller === prefun);
    // 非严格模式: [Arguments] { '0': 1, '1': 2 }
    // 严格模式  : TypeError
    console.log(fun.arguments);
  }

  function prefun(a, b) {
    fun(a, b);
  }

  prefun(1, 2);
  ```
- 禁止读取`arguments.caller`(这个属性同`function.caller`)出于优化原因, 浏览器并没有实现这个属性, 无论是否使用严格模式都会返回`undefined`

#### 为未来ES铺路

- 增加保留字`implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, `yield`
- 禁止在非全局/函数中声明函数
  ```js
  "use strict";
  if (true) {
    function f() { } // ✖
    f();
  }

  for (var i = 0; i < 5; i++) {
    function f2() { } // ✖
    f2();
  }

  function baz() { // ✔
    function eit() { } // ✔
  }
  ```