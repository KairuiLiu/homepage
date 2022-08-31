---
title: JS开发中的小Tips
date: 2021-9-30 00:00:00
toc: true
description: '一些网上看到的女少~的JS技巧,随时补充'
categories:
  - [前端,JS]
tags:
  - 前端
  - JavaScript
---

### const与let

建议优先使用const, 如果发现这个变量可能存在变化的时候再修改为let

### 包引用相关

引用来的包不一定是一个对象, 也有可能是个函数, 例如uniq包
```js
let arr = [2,3,4,1,2,3];
require("uniq")(arr);
```

### Node.JS中的路径通配符

- 通配文件使用`./path/to/file/*.js`
- 通配文件夹使用.`/path/**/file/*.js`, 这里`**`表示通配任意层
