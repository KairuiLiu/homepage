---
title: 解决vim ale clang找不到iostream
date: 2020-10-31 00:00:15
toc: true
description: 转自湾湾一同学博客，百度的那个真的不靠谱 环境：(其他环境应该也可以用类似解法只是路径不同要自己找一下) Cygwin clang++ --version：5.0.1
categories:
  - [瞎搞,Vim]
tags:
  - Vim
---
转自湾湾一同学博客，百度的那个真的不靠谱
环境：(其他环境应该也可以用类似解法只是路径不同要自己找一下)
Cygwin
clang++ --version：5.0.1

主要是要写C++时，ale报错：
([clang] 'iostream' file not found [W ])
感觉是clang的问题，就来解决啦
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052643298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)

ps 图片中的 10055_Hashmat_the_brave_warrior 就自动换成test 啰



首先找不到iostream是因为clang没搜寻到存放的资料夹
(fatal error: 'iostream' file not found)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052656311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)


可以使用加上-v 查看搜寻路径
$ clang++ -c test.cpp -v
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052706806.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)


不过查看其实没啥用，还是会显示没找到iostream
所以要直接加入路径，我是直接使用gcc的路径
$ clang++ -c test.cpp -isystem /lib/gcc/x86_64-pc-cygwin/6.4.0/include/c++

但是会显示另一个错误，就是找不到bits/c++config.h
(fatal error: 'bits/c++config.h' file not found)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042905272147.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)


然后我就发现x86_64-pc-cygwin 资料夹，里面的bits 内有c++config.h !!!!
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052731145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)


所以就把它移到外面的bits里啰
到"cygwin安装路径"\cygwin\lib\gcc\x86_64-pc-cygwin\6.4.0\include\c++
找到x86_64-pc-cygwin资料夹
把里面的bits资料夹内部所有档案复制后贴到与x86_64-pc-cygwin同层的bits资料夹内
同理把所有x86_64-pc-cygwin资料夹内的子资料夹都这样做

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052740597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)


然后刚刚的指令就没有错误了
$ clang++ -c test.cpp -isystem /lib/gcc/x86_64-pc-cygwin/6.4.0/include/c++

接着就设定vim啰
打开设定档eg .vimrc
加入：
let g : ale_cpp_clang_options = '-std=c++14 -Wall -nostdinc++ -isystem /lib/gcc/x86_64-pc-cygwin/6.4.0/include/c++' 解决OuO

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200429052751129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)

