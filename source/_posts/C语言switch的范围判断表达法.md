---
title: C语言switch的范围判断表达法
date: 2020-10-31 00:00:23
toc: true
description: switch语句可以用…来判断范围，要注意其边界条件(且为包含)
categories:
  - [后端,C/C++]
tags:
  - C/C++语言
---

switch语句可以用…来判断范围，要注意其边界条件(且为包含)，其表达方式如下

```cpp
switch(x)
{
		case 0...99:                      //等价于    0<=x && x<=99;
							xxxxxx;
							xxxxxx;
							break;
		case 100...199：           	      //等价于    100<=x && x<=199;
					     	xxxxxx;
							xxxxxx;
							break;
	 	default:
	 						xxxxxx;
	 						break;
}

```
另一种常用方法是将其“/100取商”常量判断
```cpp
switch(x/100)
{
		case 0:
							xxxxxx;
							xxxxxx;
							break;
		case 1：
					     	xxxxxx;
							xxxxxx;
							break;
	 	default:
	 						xxxxxx;
	 						break;
}
```
