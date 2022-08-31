---
title: JavaScript红宝书查漏补缺🔒
date: 2022-3-1 01:00:01
toc: true
hidden: true
description: 你管着叫查漏补缺? 这**叫女娲补天.😭
password: cwl248best
categories:
  - [前端,JS]
tags:
  - 前端
  - JavaScript
---

### JS简介

#### 五大浏览器与四大内核

- IE: Trident 内核 - Chakra JS引擎
- Chrome: Chromium 内核 - Blink 渲染引擎 - V8 JS引擎
- Firefox: GeckoView 内核 - Gecko 渲染引擎 - SpiderMonkey/ TraceMonkey/ JaegerMonkey JS引擎
- Safari: Webkit内核 - SquirrelFish Extreme JS引擎
- Opera: Presto/ Chromium 内核

#### DOM级别(DOM标准)

- DOM1: 包含DOM Core与DOM HTML
  - DOM Core: 如何让将XML文档映射为DOM元素
  - DOM HTML: 定义了针对操作DOM的API
- DOM2: 引入了新类型与接口
  - DOM 视图: 文档视图接口
  - DOM 事件: 事件与事件处理的接口
  - DOM 样式: CSS操作接口
  - DOM 遍历与范围: 遍历与操作文档树接口
- DOM3:
  - 引入文档的统一加载保存模块
  - 支持XML1.0, 引入XPath, XML Infoset, XML Base
- DOM0: 非官方概念, 指的是DOM1之前的DOM

### HTML中使用JS

#### `<script>`标签

- 属性
  | 属性         | 有效 | 作用类型 | 作用                                             |
  | ------------ | ---- | -------- | ------------------------------------------------ |
  | **`async`**    | ✔   | 外部脚本 | 在不暂停页面解析的情况下立即下载脚本并执行           |
  | **`defer`**    | ✔   | 外部脚本 | 表示脚本在执行时不会影响页面构造, 即可以延迟到文档完全被解析和显示之后再执行 |
  | `src`      | ✔   | 外部脚本 | 外部文件位置                                     |
  | `type`     | ✔   | 所有     | 描述脚本MIME类型(非必须)                         |
  | `language` | ✖   | 所有     | 编写脚本的语言(已废弃)                           |
  | `charset`  | ✖   | 所有     | 指定字符集(基本不用了)                           |
- 跨域问题: 与`<img/>`标签一样支持跨域
- 位置:
  - 放在`<head>`中: 传统做法. 但是由于HTML是顺序执行的, 在`<head>`中JS被加载, 解析, 执行前`<body>`中内容是不会被解析的. 这会造成页面白屏
  - 放在`<body>`的尾部:  现代做法
- `async`与`defer`区别
  - 没有这两个属性的时: 浏览器遇到`<script>`后会**停止页面解析**, 请求脚本, 获取并执行脚本, **恢复页面解析**
  - 有`async`时: 浏览器遇到`<script async>`后**继续进行页面解析**, 异步请求脚本, 请求到脚本后**停止页面解析**并执行脚本, 执行结束后**恢复页面解析**
  - 有`defer`时: 浏览器遇到`<script defer>`后**继续进行页面解析**, 异步请求脚本, 请求到脚本后**继续进行页面解析, 在页面解析结束后**执行脚本
  - `async`与`defer`同时出现: `defer`失效

#### `<!DOCTYPE>`标签

- 用于指定文档模式. 由IE5.5引入, 有混杂模式, 准标准模式, 标准模式, 表示浏览器行为是否接近标准.
- 默认开启混杂模式(最不标准)
- 如下标签可以开启准标准模式
  ```html
  <!-- HTML 4.01 过渡型 -->
  <!DOCTYPE HTML PUBLIC
  "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
  <!-- HTML 4.01 框架集型 -->
  <!DOCTYPE HTML PUBLIC
  "-//W3C//DTD HTML 4.01 Frameset//EN"
  "http://www.w3.org/TR/html4/frameset.dtd">
  <!-- XHTML 1.0 过渡型 -->
  <!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <!-- XHTML 1.0 框架集型 -->
  <!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Frameset//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
  ```
- 如下标签可以开启标准模式
  ```html
  <!-- HTML 4.01 严格型 -->
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">
  <!-- XHTML 1.0 严格型 -->
  <!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <!-- HTML 5 -->
  <!DOCTYPE html>
  ```

#### `<noscript>`标签

在浏览器不支持JS脚本/禁用JS脚本时显示的内容, 支持JS的浏览器会忽略标签中内容

### 基本概念

#### 严格模式

[详见此文](/article/JavaScript严格模式/)

#### 数据类型

**`typeof`操作符**

`typeof` 是一个操作符, 所以可以直接写`typeof + 变量/字面量`

返回值: `undefined`, `boolean`, `string`, `number`, **`object`(如果值是Object或null)**, `function`

**`undefined`**

undefined表示未定义, 但是包含undefined的变量与为定义的变量还是不一样的.

```js
const a = undefined;

console.log(typeof a); // undefined
console.log(typeof b); // undefined

console.log(a); // undefined
console.log(b); // ReferenceError
```

**`null`**

- `null`实际上表示的是一个**空对象指针**这也就是`typeof null`为`object`的原因.
- `undefined`值派生自`null`, 这也是`undefined == null`的原因

**boolean**

所有类型都与`Boolean`等价

|类型|为`true`条件|为`false`条件|
|---|-----------|------------|
|String|非空字符串|''|
|Number|非0数字, Infinity|0, NaN|
|Object|非空对象|null|
|Undefined|不存在|undefined|

**number**

支持10进制, 16进制(`0x`前导), 8进制(`0`/`0o`前导)

- 浮点数:
  - 允许省略前导与后缀0(`.213, 123.`), 但是不推荐
  - 如果小数点后无数字, JS会自动将其转换为整数
  - 支持科学记数法(`e`表示, 一般小数大于6位就会自动转换)
  - 最高支持17位小数

- 范围, 精度, `Infinity`
  - JS中的数字均使用IEEE754标准, 这意味着存在最大值与安全最大值两个
  - 可表示的最大值: `Number.MAX_VALUE = +(1.79e+308)`
  - 安全最大值(保证在这个范围内的运算都是正确的, 没有精度损失): `Number.MAX_SAFE_INTEGER = 2**53 - 1 = 9007199254740991`(IEEE754有52个位数位置), `Number.MIN_SAFE_INTEGER = -Number.MAX_SAFE_INTEGER`
    ```js
    var x = 9223372036854775807;
    console.log(x === x + 1);// output: true
    console.log(9223372036854775807 + 1000); //output: 9223372036854776000
    ```
  - 最小精度: `Number.MIN_VALUE = 5e-324`
  - 大于`Number.MAX_VALUE`会被表示为`Infinity`, 反之为`-Infinity`, `非0数/0=Infinity`
  - 可以使用`isFinite()`判断数字是否在`(-Infinity, Infinity)`

- `NaN`
  - `0/0=NaN`
  - 任何与`NaN`相关的操作都返回`NaN`
  - `NaN`与任何值都不想等(包括`NaN`, 请使用`isNaN()`判断是否为`NaN`)

- 数字转换
  - `Number()`: `Number(null)===0`, `Number(undefined)===NaN`, `Number('')===0`, `Number(不合规字符串)===NaN`, `Number(object)`先调用`object.valueOf()`然后`Number()`, 若结果为`NaN`则调用`object.toString()`然后`Number()`
  - `+转换对象`: 效果与Number相同
  - `Number.parseInt(string, base)`: 与`Number`比起来, 忽略前导空格, 遇到字母时停止. 但: `Number.parseInt('')=NaN`, 不默认识别解析八进制
  - `Number.parseFloat(string)`: 与`Number.parseInt(string, 10)`类似, 但: 只支持10进制字符串(遇到16进制返回0), 在遇到第一个非法小数点时停止`Number.parseFloat('12.34.56') === 12.34`

**string**

- 转换
  - `object.toString()`: 除了`null`, `undefined`之外都有, 其中`number.toString(base)`可以指定输出字符串基数
  - `String()`: 若参数有`toString`则返回`toString`, 若是`null`返回`'null'`, `undefined`返回`'undefined'`
  - `''+转换对象`

**object**

- 方法
  - `hasOwnProperty(propertyName)`: 检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在
  - `isPrototypeOf(object)`:用于检查传入的对象是否是传入对象的原型
  - `propertyIsEnumerable(propertyName)`:用于检查给定的属性是否能够使用`for-in`语句来枚举
  - `toLocaleString()`: 返回对象的字符串表示,该字符串与执行环境的地区对应。
  - `toString()`: 返回对象的字符串表示。
  - `valueOf()`: 返回对象的字符串、数值或布尔值表示
  - `constructor`: 构造函数

#### 操作符

- `++/--`运算
  - 正常理解: 可用于`Number`, `Boolean`.
  - `null`, `undefined`, `string`, `object`: 先调用`valueOf()`方法以取得一个可供操作的数值. 然后`++/--`. 若获取到`NaN`,则调用`toString()`后再`++/--`
  - 特别注意: `'abc'++`得到NaN, 但是`'abc'+1`得到的是`'abc1'`, `'123'++`得到`124`(数值), `'123'+1`得到`'1231'`
- 位运算
  - JS中的数字使用IEEE754的64位格式存储, 但是位操作符不能直接操作64位值, 而是先将64位的值转换成32位的整数,然后执行操作,最后再将结果转换回64位, 这就意味着位运算的最大支持$-2^{31} \sim 2^{31}-1$, 即`1<<31`会出错
  - `NaN`与`Infinity`会被当作0处理
  - 位运算的非是`~`不是`!`
  - 左移: `<<<`, 有符号右移: `>>`, 无符号右移: `>>>`
    ```js
    -2>>1 === -1 // 移动的时候符号位保留
    -2>>>1 === 2147483647 // 移动的时候符号位一起移动
    ```
- 逻辑运算
  - 返回值不一定是`Boolean`, 返回短路运算的结果
  - 对象认为是`true`
  - 若短路到了`null`, `undefined`, `NaN`则返回原值
- 乘除运算
  - `Infinity * 0 === NaN`
  - `Infinity / Infinity === NaN`
  - `0 / 0 === NaN`
  - `非0 / 0 === +/- Infinity`
- 取模
  - `Infinity % 非Infinity === NaN`
  - `Infinity % Infinity === NaN`
  - `非Infinity % Infinity === 非Infinity`
  - `非Infinity % 0 === NaN`
- 加减操作
  - `Infinity - Infinity === NaN`
  - 对于非Number, 非`null`, `undefined`调用`String`并拼串
    - `null + num === num`
    - `undefined + num = NaN`
- 关系运算符
  - 两操作数都是字符串, 则比较两个字符串对应的字符编码值。
  - 一个操作数是数值, 则将另一个操作数转换为一个数值,然后执行数值比较。
  - 一个操作数是对象, 则调用这个对象的`valueOf()`方法, 如果对象没有`valueOf()`方法, 则调用`toString()`方法

#### 语句

- `for-in`: 枚举对象的Key
  - `for-of`循环用来获取一对键值对中的值,而`for-in`获取的是键名. 一个数据结构只要部署了`Symbol.iterator`属性, 就被视为具有`iterator`接口, 就可以使用`for-of`循环.
  - `for-of`不同与`forEach`, 它可以与`break`, `continue`, `return`配合使用
  - `for-in`循环返回的值都是数据结构的键值名, 遍历对象返回的对象的key值, 遍历数组返回的数组的下标(key)
  - `for-in`循环不仅可以遍历数字键名, 还会遍历原型上的值和手动添加的其他键.
- `label`语句: 类似C中`goto`语句的label, 配合`continue`, `break`实现跳出多层循环
  ```js
  var num = 0;
  outermost:
  for (var i=0; i < 10; i++) { //  continue这一层
    for (var j=0; j < 10; j++) { //    ^
      if (i == 5 && j == 5) { //       |
        continue outermost;   // -------
      }
    num++;
    }
  }
  alert(num); //95
  ```
  ```js
  var num = 0;
  outermost:
  for (var i=0; i < 10; i++) { //  break这一层
    for (var j=0; j < 10; j++) { //    ^
      if (i == 5 && j == 5) { //       |
        break outermost;     // -------
      }
    num++;
    }
  }
  alert(num); //55
  ```
- `with`语句: 限定作用域到对象(不建议使用这种语法)
  ```js
  var a = 99;
  var b = 2;
  const obj = {
    a: 1,
  };
  with (obj) {
    var aa = a; // => aa = obj.a
    var bb = b; // => bb = obj.b => global.b
  }
  console.log(aa); // 1
  console.log(bb); // 2
  ```

#### 函数

- `arguments`不是数组!
- 使用默认值参数/解构赋值/rest的ES6特性会引起arguments不跟踪改变


