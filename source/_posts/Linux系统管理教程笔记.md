---
title: Linux系统管理教程笔记
date: 2021-3-3 18:06:00
toc: true
description: 介绍了Linux基础内容,主讲:尚硅谷李明与沈超,视频来自B站:BV1ut411a7ro
categories:
  - [运维]
tags:
  - 运维
  - Linux
---

## Linux简介

**Unix主要发行版**

|操作系统|公司|硬件平台|
|-|-|-|
|AIX|IBM|PowerPC|
|UX|HP|PA-RISC|
|Solaris|SUN|SPARC|
|Linux,BSD|...|IA(Intel、AMD...)|

**常用开源软件**

- Web服务器：Apach/Nginx
- 数据库：MySQL/SQLserver/Oracle/MongoDB
- 脚本语言：PHP/Ruby/Python
- 文件服务器：Samba

支撑互联网的开源技术：LAMP(Linux,Apach,MySQL,PHP)

## Linux的安装

### 虚拟机配置

- CentOS 6 安装最小内存是628MB，实际运行还可以更小，选择1024M 
- 硬盘选择20G
- 处理器数量不超过**线程数**
- 网络配置
  - 桥接：连接了本地真实网卡，可以连接到本机，局域网，公网。注意要手动设置桥接到那块网卡
  - NAT：连接到虚拟网卡，可以连接本机和公网
  - 主机模式：连接到虚拟网卡，可以连接本机

**虚拟机快照**

可以理解为是游戏存档，可用于系统的快速恢复，系统克隆

### 系统分区

为了读取数据方便，我们将硬盘逻辑上的进行了分区

#### 分区的形式

- MBR分区表：主引导记录分区表，最古老的，最大支持2.1T硬盘，最多支持4分区
- GPT分区表：全局唯一标识分区表，最大9.4ZB，无分区限制

#### 分区类型

- 主分区：最多四个
- 扩展分区
  - 最多一个
  - 主+扩最多四个
  - 不能写入数据，只能包括逻辑分区
- 逻辑分区

这里的最多4个指的是MBR分区表

在使用MBR的时候最多4个分区可能不能满足我们使用，所以可以使用扩展分区，但是两者加起来不得超过4个，扩展分区不能写入数据，可以在里面放逻辑分区

#### 分区格式化

格式化又叫逻辑格式化，目的是用于**写入文件系统**，在磁盘特定区域划出一片用于存放文件分配表，目录表等用于文件管理的磁盘空间，Windows下常见的文件系统有FAT16，FAT32，NTFS，Linux下常见的有EXT2，EXT3，EXT4

格式化会将分区划成两部分

- 一部分用来存数据，这部分会将硬盘划成等大的数据块(默认4KB)，一个数据块如果没有写满也不能存别的数据
- 一部分用来索引，将这个索引叫做inode，一个inode为128B，存放文件的位置，时间，权限

#### 设备文件名

Linux下所有设备都有文件名，其中

- /dev/hda1：IDE硬盘接口
- /dev/sda1：SCSI/STAT接口

其中前两个字母(例如：sd)表示设备类型，之后的字母与数字(例如sda1的a1)表示这个类型的第几块硬盘的第几号分区，注意是第几号分区，例如有两种分区方式

1. 三个主分区，分别是sda1-sda3，一个扩展分区是sda4，扩展分区有两个逻辑分区发表是sda5,sda6
2. 一个主分区是sda1，一个扩展分区是sda2，扩展分区有两个逻辑分区发表是sda5,sda6

**注意sda1-sda4永远是主分区或者扩展分区的，逻辑分区一定是sda5+**

 #### 挂载点

使用已经存在的**空目录**作为挂载点

- 必须分区

  - / (根分区)
  - swap分区(交换分区，允许你不分，但是强烈建议)
    - 实际内存小于4G应该是2倍
    - 实际内存大于4G应该与实际一致
    - 实验用虚拟机不大于2G

- 推荐分区

  - /boot (启动分区 1G 强烈建议)

    当系统启动的时候，系统会临时释放很小一点文件用于启动，如果硬盘写满，这点空间都没有就无法启动，于是单独开一个boot用于启动

- 常用分区

  - /home 常用于文件服务器
  - /www 常用于Web服务器

挂载点的位置随意，但是/bin,/lib,/etc必须和/在同目录

### Linux的安装

关于ISO文件中的"dvd1"

虚拟机开机之后会选择第一个安装，之后出现蓝窗口，问你找到硬盘，要不要检测里面有什么，选跳过，检测很慢，之后可能报错，说显卡有问题，此时重启或者换镜像

语言选择简体中文，这里的选择语言不仅仅是安装过程的语言，而是安装的系统的，不选中文就没有中文的编码与字体包

然后选择基本存储，主机名需要修改，否则整个集群都是一个名字，暂时不要修改

选择创建自定义分区

选择空闲-标准分区-挂载点:/home-大小2048M-固定大小-不加密，同理创建

- /boot 200M boot必须是启动分区，有他必须是sda1，不能是sda2
- / 15G

创建交换分区：文件系统类型为swap不需要挂载点

真实的服务器选minimal，此时为了学习选择BasicServer

之后会自动安装

### SSH连接

若是VirtualBox则务必设置为NAT端口转发，在高级中选择端口转发添加规则，客户机端口为22，主机端口选择不用的

开机后`ifconfig`看看有没有检测到非lo的网卡，没有的话

```bash
ip a					# 查看新网卡
cd /etc/sysconfig/network-scripts/
vim ifcfg-eth0			# eth0换成新网卡
# 将ONBOOT改为yes
service network restart # 重启网络服务
```

之后在主机上进行ssh连接，**linux**为

```bash
ssh -l [CentOsUsername] -p 1111 127.0.0.1 # 将1111替换为当时端口转发的主机端口
```

windows直接远程工具

## 初学注意事项

### 与WIndwos的区别

- Linux严格区分大小写，没有大写命令，命令的选项有大写
- Linux一切皆文件，硬件也是文件，永久保存的配置必须写入文件
- Linux不靠扩展名区分文件类型，靠权限标识识别文件类型，但是部分特殊文件还是要求写扩展名以区分类型，有
  - 压缩包：如果压缩包没有扩展名管理员不知道用哪个命令去解压缩压缩包
  - 二进制软件包：redhat下软件包用.rpm，debian下一般是.deb
  - 程序文本：shell的.sh
  - 网页文件：.htlp，.php...是网页服务器要求的
- 所有的存储设备必须挂载后使用

### Linux服务器管理

#### Linux的目录结构

| 目录名     | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| /bin/      | 存放系统命令的目录，所有用户都可以执行，是/usr/bin/的软链接  |
| /sbin/     | 存放系统命令的目录，root可以执行，是/usr/sbin/的软链接       |
| /usr/bin/  | 存放系统命令的目录，所有用户都可以执行                       |
| /usr/sbin/ | 存放系统命令的目录，root可以执行                             |
| /boot/     | 系统启动目录。存放与启动相关文件如内核与启动引导(grub)等文件 |
| /dev/ | 设备文件保存位置(例如分区) |
| /etc/ | 保存配置文件(默认安装的程序的配置文件) |
| /home/ | 普通用户的家目录 |
| /root/ | root用户的家目录 |
| /lib/ | 系统的函数库(频繁调用的程序库，例如C的iostream) |
| /lib64/ | 系统的64位函数库(只要看到.so.数字的都是函数库) |
| /lost+find/ | 当系统意外关机之后产生的碎片文件，再次开机如果可以恢复系统会自动恢复 |
| /media/ | 空目录，事先准备的挂载点，一般用于挂光盘 |
| /misc/ | 空目录，事先准备的挂载点，一般用于挂网络设备 |
| /mnt/ | 空目录，事先准备的挂载点，一般用于挂硬盘 |
| /opt/ | 软件安装位置(用的少，还是习惯在/usr/local) |
| /proc/ | 不是硬盘的挂载点，里面挂载的是内存 |
| /sys/ | 不是硬盘的挂载点，里面挂载的是内存 |
| /net/ | 不是硬盘的挂载点，里面挂载的是内存 |
| /selinux/ | linux的增强安全组件，用来限制root |
| /usr/ | Unix Software Resource系统软件资源目录的缩写，存放系统资源文件的目录 |
| /var/ | 存放动态数据的目录 |
| /tmp/ | 临时文件 |
| /usr/lib/ | 应用程序调用函数库保存位置，和/lib/的不一样 |
| /usr/local/ | 程序安装位置 |
| /usr/share/ | 资源文件保存位置，例如文档，说明文档，字体目录 |
| /usr/src/ | 源码包保存位置，不过一般是放内核源码，建议三方的源码一般放/usr/local/src，内核放在/usr/src/kernels |
| /usr/src/kernels/ | 建议将内核源码放这里 |
| /var/log/ | 系统日至目录 |
| /var/lib/ | 程序运行时数据保存目录 |
| /var/lib/mysql/   | MySQL数据库保存位置 |
| /var/www/html/ | 默认的apach网页目录 |
| /var/run/ | 服务启动后他们的PID的保存位置，是/run/的软链接 |
| /var/spool/ | 放置队列数据的目录，例如邮件队列与打印队列 |
| /var/spool/mail/ | 邮件队列，收到的邮件会保存在此处 |
| /var/spool/cron/ | 系统定时任务队列的存储位置 |

- 有bin的是二进制命令文件是所有人都能执行的，sbin是管理员执行的，bin与/usr/bin目前几乎没有区别
- `*.so.数字`的文件是Linux的重要函数库

- Linux准备了三个点挂载，但是习惯于用/mnt/

 #### 远程服务器注意事项

- 服务器只能重启不能关机
- 重启之前要终止正在执行的任务
- 重启建议选用`shutdown -r now`并且在重启前多次执行`sync`命令，他可以将内存中的数据同步在硬盘上
- 不在访问 高峰进行高负载命令
- 配置防火墙的时候不要把自己踢出服务器，有个笨办法是在每次配置防火墙之前开定时人物没10min删除防火墙配置，确认配置没问题之后再关闭定时人物

## 常用命令

### 命令的基本格式

1. 命令提示符

   ```bash
   [root@bogon ~]# 
   ```

   第一部分是登陆的用户，例如目前是root，@是分隔符无意义，bogon是当前系统的简写主机名，~是当前的路径，之后是命令提示符`#`或`$`,`#`表示是root用户，`$`表示是普通用户

2. 命令的基本格式

   ```bash
   命令 [选项] [参数]
   ```

   []表示可选，选项用于调整命令的功能，参数用来指定操作对象，不写就执行默认参数，例如`ls -l`表示长格式输出

3. `ls -l`的输出解释

   ```bash
   [root@bogon ~]# ls -l
   总用量 44
   -rw-------. 1 root root  1284 1月  22 20:31 anaconda-ks.cfg
   -rw-r--r--. 1 root root 28250 1月  22 20:31 install.log
   -rw-r--r--. 1 root root  7572 1月  22 20:30 install.log.syslog
   ```

   - 第一列表示权限
   - 第二列是引用计数，对于文件表示有多少硬链接的个数，对文件夹表示有多少个一级子目录
   - 第三列表示文件所有者
   - 第四列表示文件所属组，分配所有者与所属组是为了方便赋权限
   - 第五列文件字节(默认Byte)
   - 第六列是文件修改/访问时间

4. `ls`的其他选项

   - `-h` 以易于阅读的格式输出文件大小，例如KB
   - `-a` 显示隐藏文件
   - `-d` 显示目录本身而不是子文件`ls /`与`ls -d /`
   - `-i` 显示文件inode节点号

5. 隐藏文件的作用：告诉你不要动而不是想藏起来

6. Linux中绝大部分选项没有先后顺序，例如`ls -al`与`ls -la`

### 目录操作命令

1. `ls`命令

2. `cd`命令

   用于切换所在的目录，注意区分绝对与相对路径，Linux中特殊路径符号有：`~`家目录`-`上次所在目录`.`当前目录`..`上一级目录

   `pwd`显示当前目录

   `cd`可以直接回到家目录

3. `mkdir`命令

   - `mkdir tmp`建立目录tmp
   - `mkdir -p ./1/2/3` 使用-p选项递归建立目录

4. `rmdir`命令

   - `rmdir`只能删除空目录，所以不推荐使用

5. `rm`命令

   - `rm`删除文件(夹)
   - `-r`递归删除
   - `-f`不提示是否确认，强制删除
   - 防止误删除建议安装`extundelete`

### 文件操作命令

1. `touch`命令

   - 用于创建新文件或者修改文件时间，也就是没有就创建，有就修改文件时间
   - `touch 文件名`就创建了文件

2. `stat`命令

   - 查看文件的基本信息，结果如下

     ```bash
     [root@localhost ~]# stat abc
       File: "abc"
       Size: 0               Blocks: 0          IO Block: 4096   普通空文件
     Device: 802h/2050d      Inode: 393882      Links: 1
     Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
     Access: 2021-01-26 22:13:51.117999672 +0800
     Modify: 2021-01-26 22:13:51.117999672 +0800
     Change: 2021-01-26 22:13:51.117999672 +0800
     ```

     分别是文件名，大小，占用块，每个块的大小，硬件设备标识号，inode，硬链接数目，权限，所有者ID，所属组ID，访问时间，修改时间，状态修改时间(修改权限的时间)

3. `cat`命令

   - 查看文件内容
   - `-n`查看行号
   - `-v`列出特殊字符(例如`\n`显示为`$`)
   - `-A`显示所有的特殊字符
   - `cat`会输出所有内容，但是终端最大行数有限，不建议使用

4. `more`命令

   - 分屏显示文件内容
   - `空格`向下翻页
   - `/字符串`向下搜索字符串
   - `b`向上翻页
   - `回车`向下一行
   - `q` 推出

5. `less`命令

   - 分行显示文件内容
   - `上下键`上下显示

6. `head`命令

   - 显示文件头几行
   - `-数字`显示文件头几行，不写是10行

7. `tail`命令

   - 显示文件头几行

   - `-数字`显示文件头几行，不写是10行
   - `-f`监听文件变化，即当有程序向后面追加内容是自动显示变化，使用`ctrl+C`退出

8. `ln`命令

   - `ln filename ./it/is/path/`实现在`./it/is/path/`下创建`filename`的链接
   - `-s`创建软链接，不写默认硬链接

9. 软链接与硬链接

我们知道block块放的是文件的内容，inode指向了文件的block地址，但是文件名不知道在那里，实际上文件名存在了他的父文件夹的block中，父文件夹的block里面有个文件名-inode的表，就是说查找文件的时候实际上是去文件夹的block中查找，按照这个说法`/`的文件名-inode映射没地方存了，实际上`/`的inode是固定的，是2(1在启动的时候被占用了)

创建硬链接后可以看到

```bash
18 -rw-rw-r--. 2 liukairui liukairui 0 1月  29 22:25 bcd
18 -rw-rw-r--. 2 liukairui liukairui 0 1月  29 22:25 ./bcd_h
```

两个文件的inode号相同，引用系数变为2，删除原文件/硬链接之后另一个文件正常存在，原因是硬链接与原文件同inode，删除文件只是删除了父文件夹的文件名-inode的一个映射，但是另一个映射不变

```bash
[liukairui@10 ~]$ rm ./bcd
[liukairui@10 ~]$ ls -ild  ./bcd_h 
18 -rw-rw-r--. 1 liukairui liukairui 3 1月  29 22:30 ./bcd_h
```

注意的是，不推荐使用硬链接，因为

- 系统不会明显的标注一个链接是硬链接，只能通过同inode与应用系数增加判断是硬链接

- 普通用户不能硬链接目录，见

  ```bash
  [liukairui@10 ~]$ ln -db --help
  	-d, -F, --directory           创建指向目录的硬链接(只适用于超级用户)
  ```

  如果引入了对目录的硬连接就有可能在目录中引入循环，那么在目录遍历的时候系统就会陷入无限循环当中。也许您会说，符号连接不也可以引入循环吗，那么为什么不限制目录的符号连接呢？原因就在于在linux系统中，每个文件(目录也是文件)都对应着一个inode结构，其中inode数据结构中包含了文件类型(目录，普通文件，符号连接文件等等)的信息，也就是说操作系统在遍历目录时可以判断出符号连接，既然可以判断出符号连接当然就可以采取一些措施来防范进入过大的循环了，系统在连续遇到8个符号连接后就停止遍历，这就是为什么对目录符号连接不会进入死循环的原因了。但是对于硬连接，由于操作系统中采用的数据结构和算法限制，目前是不能防范这种死循环的。

  在说明第二个原因之前，我们先来看看文件的dentry结构在系统空间中长什么样子和它们是怎么存放在系统空间的。dentry结构主要包含了文件名，文件的inode 号，指向父目录dentry结构的指针和其他一些与本次讨论无关的指针，这里关键是那个指向父目录的指针；系统中所有的dentry结构都是按杂凑值存放在杂凑表中的，这里的杂凑算法很重要，它是取文件名和文件的父目录dentry结构的地址一起杂凑运算出杂凑值的。现在我们假设有两个目录 /a和/b，其中/b是我们通过ln -d命令建立起来的对/a的硬连接。这个时候内核空间中就会存在一个/a的dentry结构和一个/b的dentry结构，由上面的知识可知，/a和/b 目录下面的每一个文件或目录都各自有对应的dentry结构(因为虽然/a目录下面的文件名没有改变，但是因为dentry结构有指向父目录dentry 的指针和计算杂凑值时考虑了父目录dentry结构的地址，这个时候dentry结构就分身乏术了)，而且这种继承还会影响到所有子目录下面的文件，这样下来就会浪费很多系统空间了，特别是如果被硬连接的目录中存在大量文件和子目录的时候就更加明显了。

- 只能同分区链接

软链接完全可以理解为windows下的快捷方式

- 删除原文件快捷方式就没了

- 在ls软链接的时候会提示原文件位置，例如

  ```bash
  [liukairui@10 ~]$ ln -s bcd bcd_s
  [liukairui@10 ~]$ ls -ild bcd bcd_s
  18 -rw-rw-r--. 1 liukairui liukairui 0 1月  29 22:49 bcd
  19 lrwxrwxrwx. 1 liukairui liukairui 3 1月  29 22:49 bcd_s -> bcd
  ```

  删除原文件之后重新ls会发现bcd链接地址变成黑底白字闪烁

- 软链接的权限是最大的例如上面的`19 lrwxrwxrwx.`，意思是所有人可以访问软链接但是软链接没数据还要访问原文件，权限还要看原文件
- **软链接一定要写绝对路径，否则出去或者拷贝软链接就找不到了**

 ### 文件与目录命令 

- `rm`命令

  - 删除文件或者目录
  - `-f`强制删除
  - `-r`递归删除，目录操作使用
  - `-i`交互删除，在删除之前会询问用户(默认就是交互删除)

- `cp`命令

  - `cp 原文件 新文件的路径`在路径下复制同名新文件
  - `cp 原文件 新文件的路径/新文件名`在路径下复制改名新文件
  - `-r` 复制目录使用
  - `-a`相当于`-dpr`目标与原文件一模一样，包括修改时间等
  - `-i`覆盖同名文件

- `mv`命令

  - 移动文件/重命名

  - `-f`强制覆盖

  - `-i`交互移动，默认就是交互

  - `-v`显示详细信息，例如

    ```bash
    [liukairui@10 ~]$ mv -v ./cp1 ./cp2
    "./cp1" -> "./cp2"
    ```

### 权限命令

#### Linux的基本权限

`ls -l`之后会看到文件的权限，形如：`-rw-rw-r--. `

- 第一位表示文件类型
  - `-`表示**普通文件**
  - `d`表示**目录文件**(目录也是文件)
  - `l`表示**软链接**
  - `b`表示块设备文件，例如`/dev/sda`
  - `c`表示字符设备，例如键盘
  - `p`管道符文件
  - `s`套接字文件，一些服务支持socket访问会产生这样的文件
- 第2-4位表示文件**所有者u**的权限
  - `r`表示有读权限
  - `w`表示有写权限
  - `x`表示有执行权限
- 第5-7位表示文件**所属组g**的权限
- 第9-10位表示文件**其他人x**的权限

- 最后的`.`表示这个文件是被SELinux管理(保护)的

#### 权限基本命令

- `chmod`命令
  - 修改文件的权限模式
  - `chmod [选项] 权限 文件名`
    - 权限可以写`+/-`，写`u+x`表示为u(所有者)添加x(执行)权限
    - 权限可以用`,`连，写`u+x,g-x`表示为u(所有者)添加x(执行)权限,同时为所属组去掉执行权限
    - 权限可以用数字表示，`r=4,w=2,x=1`直接把需要的加起来就可以了，例如`755`表示`rwxr-xr-x`，常见的数字权限有`755`**文件的执行权限与目录的基本权限**`644`**文件的基本权限**`777`最大权限，实际生产中不得赋予
  - `-R`递归设置，给子目录文件设置

- `chown`命令
  - 修改所有者与所属组
  - `chown 新所有者 文件`
  - `chown 新所有者:新所属组 文件`

- `chgrp`命令
  - 修改所属组
  - `chgrp 新所属组 文件`

- 普通用户可以修改自己所有/所属文件权限，但是不能修改任何文件的所有者/所属组

#### 权限的基本作用

**权限对文件的作用**

- r：一旦文件具有的读权限就可以读取数据，例如cat,more,less,head,tail等命令
- w：一旦文件具有写权限就可以修改文件内容使用例如`vim`,`echo >>`写入，**拥有w权限并不能删除文件，想要删除文件必须获得文件父文件夹的w权限**
- x：代表文件有执行的权限，但是到底能不能正确执行或者能不能执行还要看文件本身

**权限对目录的作用**

- r：可以读目录，即可以`ls`
- w：可以修改目录下的数据例如`touch`，`rm`，`cp`，`mv`等等，这是目录的最高权限
- x：目录不能执行，目录拥有x权限就可以对目录进行cd,进入目录
- 当然如果是`rw-`这样没有x不能进去根本没有用，所以目录至少有x

#### umask默认权限

当一个文件新建的时候，会有一个默认的权限，这个权限就是从umask权限获取的，Linux是通过umask得到的一个文件的默认权限，使用`umask`可以获取到系统的umask值。

- 对于系统说文件的默认最大权限是666(系统认为x是危险的，想要作为执行文件必须后期修改)，文件夹是777
- 系统计算权限的方法是进行二进制的与非运算，对于手算可以采用先换成字母然后减去，例如umask是033，创建文件的时候默认是666是rw-rw-rw-减去033是----wx-wx就成了rw-r--r--

可以修改/etc/profile修改umask，这个文件是Linux环境变量

### 帮助命令

- `man`命令

  - `man 指令`

  - 可以使用上下箭头，PgUp/PgDn翻页，g移动到第一页，G文件尾，q退出，/查找，?反向搜索，n/N前后一个

  - 帮助是有级别的，可以在man的左上角看到，其中

    - 1级别表示普通用户可以执行的命令的帮助
    - 2级别表示内核调用函数的帮助
    - 3级别表示C语言的函数和工具的帮助
    - 4级别表示设备和特殊文件的帮助
    - 5级别表示配置文件的帮助
    - 6级别表示游戏的帮助
    - 7级别表示杂项的帮助
    - 8级别表示root可以执行命令的帮助
    - 9级别表示内核的帮助

    可以使用`whatis 命令`/`man -f 命令`查询命令的所有帮助，例如

    ```bash
    [liukairui@10 ~]$ whatis passwd
    passwd               (1)  - update user's authentication tokens
    passwd               (5)  - password file
    passwd [sslpasswd]   (1ssl)  - compute password hashes
    ```

    可以使用`man 级别 命令`打开对应级别的命令，例如`man 5 passwd`

    如果whatis不能用可以执行`makewhatis`来重建whatis

  - `-k`查询所有带有指定关键字的命令

- `info`命令

  - `info 指令`
  - info是一本书，每个命令是一节，其中命令的某些内容又是一个小节，可以用
    - 可以使用上下箭头，PgUp/PgDn翻页
    - 在前有`*`的一行回车进入小节
    - tab在小节之间切换
    - u进入父小节
    - n/p进入下一小节/上一小节
    - ?显示帮助
    - q退出

- `help`命令

  - 获取shell内置指令的帮助

- `--help`选项

  - `大多数指令 --help`可以获取简明帮助

### 搜索命令

- `whereis`命令

  - 直接加命令的名字，只能搜索系统命令，不能搜索文件
  - 显示命令的源文件与帮助文件的位置

- `which`命令

  - 查找系统命令的时候如果有别名也可以查到,例如

  ```bash
  [liukairui@10 ~]$ whereis ls
  ls: /bin/ls /usr/share/man/man1p/ls.1p.gz /usr/share/man/man1/ls.1.gz
  [liukairui@10 ~]$ which ls
  alias ls='ls --color=auto'
          /bin/ls
  ```

  whereis会提示ls的位置在/bin/ls帮助文档在usr/share/man/man1p/ls.1p.gz /usr/share/man/man1/ls.1.gz

  which提示ls是`'ls --color=auto'`的别名，可以使用`alias`查询所有别名

- `locate`命令

  - 可以直接加 文件名搜索普通文件

  - 他是按照数据库搜索的所以速度快，消耗小，数据库位置在`/var/lib/mlocate/mlocate.db`

  - 但是只能按照文件名搜索不能做按照权限、大小、时间等搜索

  - 由于他是按照数据库搜索的，所以新建的文件在升级数据库之间是找不到的，可以使用命令`updatedb`升级数据库

  - 有的时候发现updatedb之后还是搜索不到，这是因为locate配置文件的问题，可以编辑`/etc/updatedb.config`

    ```
    PRUNE_BIND_MOUNTS = "yes"			# 表示文件生效
    PRUNEFS = "9p afs anon_inodefs auto autofs bdev binfmt_misc cgroup cifs coda configfs cpuset debugfs devpts ecryptfs exofs fuse fusectl gfs gfs2 gpfs hugetlbfs inotifyfs iso9660 jffs2 lustre mqueue ncpfs nfs nfs4 nfsd pipefs proc ramfs rootfs rpc_pipefs securityfs selinuxfs sfs sockfs sysfs tmpfs ubifs udf usbfs"		# 不搜索文件类型，例如光驱中的文件
    PRUNENAMES = ".git .hg .svn"		# 不搜索扩展名为这些的文件
    PRUNEPATHS = "/afs /media /net /sfs /tmp /udev /var/cache/ccache /var/spool/cups /var/spool/squid /var/tmp"			# 不搜索这些系统目录
    ```

    

- `find`命令

  - 按照文件名搜索[完全匹配]，格式是`find 搜索范围路径 -name 文件名`

    - 按照文件名不区分大小写，格式是`find 搜索范围路径 -iname 文件名`
    - 按照inode搜索，格式是`find 搜索范围路径 -inum inode号`

  - 可以按照文件大小搜索，格式是`find 范围 -size [+/-]大小 `其中+-分别表示大于或者小于，不写就是等于，大小要写单位，KB是`k`MB是`M`，注意大小写，可以看find的帮助文档

    ```bash
    -size n[cwbkMG]File  uses n units of space, rounding up.  The following suffixes can be
        used:
    
        `b'    for 512-byte blocks (this is the default if no suffix is used)
        单位b表示是512字节，也就是说1b代表512Byte,b是默认呢单位
        `c'    for bytes
        单位c表示是字节Byte
        `w'    for two-byte words
    	单位w是2Byte
        `k'    for kibibytes (KiB, units of 1024 bytes)
        单位k是1024Byte注意小写
        `M'    for mebibytes (MiB, units of 1024 * 1024 = 1048576 bytes)
        单位M是大写
        `G'    for gibibytes (GiB, units of 1024 *  1024  *  1024  =  1073741824bytes)
        单位G是大写
    ```

  - 可以按照文件修改时间搜索，格式是`find 范围 -标签 [+-]时间`

    - `-atime`是按照文件访问时间搜索
    - `-mtime`是按照文件数据修改时间搜索
    - `-ctime`是按照文件状态修改时间搜索
    - 3，-3，+3代表第五天前修改，3天内修改，4天前修改的

  - 按照文件权限搜索

    - `find 范围 -perm xxx`查找权限恰好为那几个数字的文件
    - `find 范围 -perm +xxx`查找文件的三个权限中有任何一个权限比给出的大，例如666可以查到700文件
    - `find 范围 -perm -xxx`查找文件的三个权限都比给出的大，例如666不能查到700文件

  - 按照文件的所有者/所属组查询

    - `find 路径 [选项] 内容`，选项有
    - `-uid`按照用户ID查询
    - `-gid`按照用户组ID查询
    - `-user`按照用户名查询
    - `-group`按照用户组名查询
    - `-nouser`查询没有所有者的文件，只有一种情况没有所有者，当文件来自windows

  - 按照文件类型搜索

    - `find 路径 -type d/f/l`分别表示目录，普通文件，软链接

  - 逻辑运算符

    - `-a` 与运算
    - `-o`或运算
    - `-not`非运算

    例如搜索大于1K的文件夹就是

    ```bash
    find ./ -size +1k -a -type d
    ```

  - `-exec {} \;`选项

    - 将find的结果作为参数执行到吓一个目录
    - `find ... -exec 新命令 {} \;`格式
    - `find ./ -size +1k -exec ls -alh {} \;`就是将find查询到的大于1k的结果放在ls的大括号里面执行，相当于ls了所有大于1k的文件，此时第二个目录不能使用别名

  - `-ok {} \;`选项

    - 与-exec相同，但是在每执行一个文件的时候都会询问是否执行

- `grep`命令

  - `grep [选项] 搜索内容 搜索文件`
  - `-i`忽略大小写
  - `-n`输出行号
  - `-v`反向查找
  - `--color=auto`搜索出的关键字用颜色标注 

- find命令是完全匹配，如需模糊匹配需要使用通配符

  grub是包含匹配。如果需要模糊匹配需要使用正则表达式

  当对文件名使用通配符的时候最好使用双引号包起来

-  通配符表

  | 通配符 | 作用             |
  | ------ | ---------------- |
  | ?      | 匹配任意**一个**字符 |
  |*|匹配任意多个(也可以是0个)字符|
  |[]|匹配[]中的任意一个字符|
  |[-]|匹配[]中的任意一个字符，其中-代表范围，例如[a-z]|
  |[^]|表示匹配不是[^]包裹的字符|
  
- 正则表达式

  | 正则符 | 作用                                             |
| ------ | ------------------------------------------------ |
  | ?      | 匹配前一个字符0/1次                              |
  | *      | 匹配前一个字符0/任意多次                         |
  | []     | 匹配[]中的任意一个字符                           |
  | [-]    | 匹配[]中的任意一个字符，其中-代表范围，例如[a-z] |
  | [^]    | 匹配不是[^]包裹的字符                            |
  | ^      | 匹配行首                                         |
  | $      | 匹配行尾                                         |
  
  其中`?`不属于标准正则而是扩展正则，需要使用`egrep`匹配

### 管道符

- 格式：`命令1 | 命令2`
- 命令1的输出作为命令2的操作对象

### 别名与快捷命令

别名是就是为命令创建小名方便使用

- 可以使用`alias`查看当前的所有别名
- 使用`alias  别名="原命令"`的方式**临时**定义别名，但是别名的优先级高于系统指令所以如果别名和原命令同名就会优先执行别名，原命令就无法执行了
- 可以修改环境变量自定义别名，但是别名应该是一个人的习惯而不是所有人的，所以应该设置为某用户的环境变量，修改`~/.bashrc`即可

Bash下的常用快捷键有

| 快捷键 | 作用                   |
| ------ | ---------------------- |
| Tab    | 补全命令/文件          |
| Ctrl+A | 将光标移动到命令的开头 |
| Ctrl+E | 将光标移动到命令的末尾 |
| Ctrl+C | 强制结束命令           |
| Ctrl+L | 清屏                   |
| Ctrl+U | 剪切光标之前的命令     |
| Ctrl+Y | 粘贴Ctrl+U的命令       |

### 压缩与解压命令

压缩文件有很多种，不同的压缩方式有不同的命令

- `zip`格式 
  - 压缩：`zip 目标压缩包.zip 原文件1 [原文件2...]`
  - 解压：`unzip 压缩包 [解压路径]`不写解压路径默认到当前目录
  - 这个格式在linux中不常用，主要是为了兼容windows，是唯一一个可用的windows压缩格式
- `gz`格式
  - 压缩：`gzip 原文件1 [原文件2...]`
    - 压缩会自动删除原文件，可以使用`-c`选项，他的原意是将压缩得到的二进制结果输出出来(实际上并不压缩)，可以结合管道使用`gzip -c 原文件 >> 压缩包.gz`
    - `-r`压缩目录，注意这个选项的意思，gz是不会将目录压缩成文件，而是将这个文件夹下的所有文件(包括子目录的)全部单个压缩，即**gz不会打包**，例如执行`gzip a b c d`就会得到a.gz,b.gz,c.gz,d.gz，如果不加`-r`gzip会直接提示访问到一个目录直接忽略
  - 解压：`gzip -d 压缩文件`或者`gunzip 压缩文件`
- `bz2`格式
  - 压缩：`bzip2 [选项] 原文件`
    - `-k`保留原文件
    - `-v`显示详细信息
    - 压缩命令**不能打包**，遇到目录直接报错
  - 解压：`bzip2 -d 压缩文件`
- `tar`格式
  - tar是用于打包的目录，**只打包不压缩**
  - 打包：`tar [选项] [-f 压缩包文件名] 源文件或目录`
    - `-c`打包
    - `-v`显示打包过程
    - `-f`指定压缩包的文件名，用于给管理员识别是给打包文件
    - 一般习惯写`-cvf`
  - 解打包：`tar -xvf 打包文件`
- `tar.gz`/`tar.bz2`格式
  - 压缩为`tar.gz`：`tar -zcvf 目标文件 原文件`
  - 解缩`tar.gz`：`tar -zxvf 压缩文件 [-C 解压位置] [要单独解压的文件]`
  - 查看`tar.gz`：`tar -ztvf 压缩文件`
  - 压缩为`tar.bz2`：`tar -jcvf 目标文件 原文件`
  - 解缩`tar.bz2`：`tar -jxvf 压缩文件 [-C 解压位置] [要单独解压的文件]`
  - 查看`tar.bz2`：`tar -jtvf 压缩文件`

### 开关机命令

- `sync`命令
  - 用于数据同步，刷新文件系统缓冲区
- `shutdown`命令
  - shutdown是最安全的
  - `shutdown 选项 时间`
  - `-r`重启
  - `-h`关机
  - `-c`取消已经执行的shutdown命令
  - 时间可以选`now`或者`7:10`这样的时间
- `reboot`命令
  - 重启，也是安全的
- `halt`与`poweroff`
  - 直接关机，都不安全
- `init 0`与`init 6`
  - 关机与重启，都不安全

### 网络命令

- 配置IP地址

  - 配置IP地址

    - `setup`目录图形化实现(redhat专有)
    - `vim /etc/sysconfig/network-script/ifcfg-网卡名`

  - 重启网络服务

    - `service network restart`
    - 如果发现某个网卡重启失败大概率是ip冲突
    - 如果换了很多ip还是提示失败大概率是因为装系统的时候使用的是克隆的方式，导致UUID冲突，解决方法是删除mac与通过mac计算uuid的规则文件，然后重启，系统就会自动重新计算UUID

        ```bash
        [liukairui@10 ~]$ vim /etc/sysconfig/network-scripts/ifcfg-网卡名
        # 删除 HWADDR=XX:XX:XX:XX:XX:XX 一行
        [liukairui@10 ~]$ rm -rf /etc/udev/rules.d/70-persistent-net.rules
        # 删除规则文件
        [liukairui@10 ~]$ reboot
        ```

- `ifconfig`命令

  - 最主要的作用就是查IP，直接输入ifconfig即可

    ```bash
    [liukairui@10 ~]$ ifconfig
    eth0      Link encap:Ethernet  HWaddr 08:00:27:45:12:CA  
              inet addr:10.0.2.15  Bcast:10.0.2.255  Mask:255.255.255.0
            # IP地址				  广播地址			 子网掩码
              inet6 addr: fe80::a00:27ff:fe45:12ca/64 Scope:Link
            # IPv6地址
              UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
              RX packets:1316 errors:0 dropped:0 overruns:0 frame:0
            # 接受数据包的情况
              TX packets:766 errors:0 dropped:0 overruns:0 carrier:0
            # 发送数据包的情况
              collisions:0 txqueuelen:1000 
              RX bytes:109033 (106.4 KiB)  TX bytes:136348 (133.1 KiB)
    ```

- `ping`命令

  - `ping [选项] IP`通过ICMP协议进行网络探测
  - `-b 广播地址`对整个网段进行探测
  - `-c 次数`指定ping的次数
  - `-s 字节数`指定探测包的大小

- `netstat`命令

  - 网络状态查看命令，可以看到本机的端口，也可以看到连接的客户端，centOS 7.x默认没有安装，需要使用则要安装`net-snmp`与`net-tools`

  - `-tuln`查询本机所有开启的端口

    ```
    [liukairui@10 ~]$ netstat -tuln
    Active Internet connections (only servers)
    Proto Recv-Q Send-Q Local Address     Foreign Address             State 
    tcp        0      0 0.0.0.0:40398     0.0.0.0:*                   LISTEN
    协议   接受发送数据包队列  本机IP与端口号    远程主机与端口号              状态
    ```

  - `-tulnp`查询所有开启的端口与那个服务开启了这个端口

  - `-rn`查询网关

- `write`命令

  - Linux是多用户的，一个系统可以多账户同时登陆，可以使用write进行用户之间的交流
  
  - 用户登陆的时候有不同的终端，有**本地文本**终端是从TTY1-6 可以使用Ctrl+Alt+F1-6切换，还有图形界面TTY7，安装图形界面后按Ctrl+Alt+F7三秒切换，**远程终端**pts/0-255
  
  - `write 用户名 回车之后填写要发送的内容`
  
    ```
    [root@10 ~]# w      # 使用w查看当前的用户
     20:39:11 up 23 min,  2 users,  load average: 0.00, 0.01, 0.04
    USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
    liukairu pts/0    10.0.2.2         20:19    2:03   0.01s  0.01s -bash
    root     pts/1    10.0.2.2         20:18    0.00s  0.06s  0.00s w
    [root@10 ~]# write liukairui pts/0    # 写出用户名和登陆的终端
    hello 
    ```
  
    按ctrl+d结束发送
  
- `wall`命令

  - 想包括自己的所有人发送消息
  - `wall 内容`

- 邮件命令

  - 发邮件：`mail 收件人`回车输入标题，回车输入内容
  - 查邮件：`mail`未读邮件前显示N
  - `-s`指定邮件标题

### 系统痕迹命令

系统中有一些日志文件，为了防止用户修改，这些文件都是二进制文件无法使用编辑器打开，只能使用对应命令查询

- `w`命令

  - 显示系统中目前正在登陆的用户信息，文件位于`/var/run/utmp`

    ```bash
    [root@10 ~]# w
     21:43:18 up  1:27,  2 users,  load average: 0.00, 0.01, 0.04
    # 系统时间  系统开机时间 当前用户数目			前1min 5min 15min 的平均负载，一般不超过核心数
    USER     TTY      FROM      LOGIN@   IDLE   JCPU          PCPU          WHAT
    liukairu pts/0    10.0.2.2  20:19    5.00s  0.02s         0.02s         -bash
    root     pts/1    10.0.2.2  20:18    0.00s  0.07s         0.00s         w
    登陆用户   登陆终端  登陆IP     登陆时间  闲置时间 所有进程占CPU时 当前进程占CPU时 用户当前操作
    ```

- `who`命令

  - 与`w`效果相同但是内容简单

- `last`命令

  - 查看系统所有登陆过的用户信息

    ```bash
    [root@10 ~]# last
    liukairu pts/0        10.0.2.2         Mon Feb  1 20:19   still logged in   
    root     pts/1        10.0.2.2         Mon Feb  1 20:18   still logged in   
    root     pts/0        10.0.2.2         Mon Feb  1 20:16 - 20:19  (00:02)    
    reboot   system boot  2.6.32-642.el6.x Mon Feb  1 20:15 - 21:53  (01:37)    
    root     pts/1        10.0.2.2         Mon Feb  1 12:14 - down   (00:17)    
    liukairu pts/0        10.0.2.2         Mon Feb  1 10:49 - 12:31  (01:41)    
    liukairu pts/0        10.0.2.2         Mon Feb  1 10:48 - 10:49  (00:00)    
    liukairu pts/0        10.0.2.2         Mon Feb  1 10:08 - 10:48  (00:40)    
    reboot   system boot  2.6.32-642.el6.x Mon Feb  1 09:51 - 12:31  (02:39)    
    ```

- `lastlog`命令

  - 查询所有用户的最后登陆时间

    ```bash
    [root@10 ~]# lastlog
    用户名           端口     来自             最后登陆时间
    root             pts/1    10.0.2.2         一 2月  1 20:18:56 +0800 2021
    bin                                        **从未登录过**
    daemon                                     **从未登录过**
    adm                                        **从未登录过**
    lp                                         **从未登录过**
    sync                                       **从未登录过**
    shutdown                                   **从未登录过**
    halt                                       **从未登录过**
    mail                                       **从未登录过**
    uucp                                       **从未登录过**
    operator                                   **从未登录过**
    games                                      **从未登录过**
    gopher                                     **从未登录过**
    ftp                                        **从未登录过**
    nobody                                     **从未登录过**
    dbus                                       **从未登录过**
    rpc                                        **从未登录过**
    vcsa                                       **从未登录过**
    abrt                                       **从未登录过**
    rpcuser                                    **从未登录过**
    nfsnobody                                  **从未登录过**
    haldaemon                                  **从未登录过**
    ntp                                        **从未登录过**
    saslauth                                   **从未登录过**
    postfix                                    **从未登录过**
    sshd                                       **从未登录过**
    tcpdump                                    **从未登录过**
    oprofile                                   **从未登录过**
    liukairui        pts/0    10.0.2.2         一 2月  1 20:19:20 +0800 2021
    ```

    注意，这个命令会列出所有的最近登陆记录，可以看到只有第一个和最后一个是实际存在的用户，其余用户是不能登陆的，也不是我们创建的，叫做伪用户，用来启动特殊的服务

- `lastb`查看错误的登陆记录

  ```bash
  [root@10 ~]# lastb
  liukairu ssh:notty    10.0.2.2         Mon Feb  1 21:58 - 21:58  (00:00)    
  liukairu ssh:notty    10.0.2.2         Mon Feb  1 21:58 - 21:58  (00:00)    
  liukairu ssh:notty    10.0.2.2         Mon Feb  1 21:58 - 21:58  (00:00)    
  
  btmp begins Mon Feb  1 21:58:12 2021
  ```

### 挂载命令

挂载是将一个存储设备的设备名与已经存在的空目录连起来的过程

- `mount`挂载命令

  - `mount`直接使用可以查看当前所有挂载的设备

    - `-l`显示卷标
    - `-t 文件系统`指定文件系统
    - `-o`特殊选项，常用的就是remount来修改挂载的权限

  - `mount -a`检查自动挂载文件`etc/farab`，但是这个功能很弱

    Linux支持设备自动挂载，但是光驱等设备不建议自动挂载，否则开机找不到光盘就开不了机，配置文件在`/etc/fstab`系统开机就会从这个文件读取

  - 挂载一个光盘

    - 在CentOS 5.x-光盘是/dev/hdc/

      在CentOS 6.x+光盘是/dev/sr0/

      无论是什么系统，都有一个/dev/cdrom软链接到实际的光盘设备，例如
      ```bash
    	[liukairui@10 ~]$ ll /dev/cdrom 
    	lrwxrwxrwx. 1 root root 3 2月   1 20:15 /dev/cdrom -> sr0
    	```

    - 挂载命令

      ```bash
      [root@10 liukairui]# mkdir /mnt/cdrom
      [root@10 liukairui]# mount -t iso9660 /dev/cdrom /mnt/cdrom/
      ```
    
      其中`-t iso9660`表示指定挂载文件系统为iso9660背下来即可，可以省略
    
      但是可能会提示不识别文件系统或者找不到/dev/sr0这都是因为没放光盘
    
      还可能会报错`mount: block device /dev/sr0 is write-protected, mounting read-only`说系统想挂载光盘为读写但是挂载成了读，因为大部分光盘是只读的，所以这恰好可以认为是光盘正确挂载了
    
    - 卸载命令
    
      ```bash
      [root@10 cdrom]# cd ../
      [root@10 mnt]# umount /dev/sr0
      ```
    
  - 挂载U盘

    - U盘与硬盘在Linux中共享设备名`sdx`所以U盘的设备名是动态的，例如有3个硬盘，那么U盘就是`sdd`所以在挂载之前`fdisk -l`查看所有的U盘 

    - 挂载命令

      ```bash
      mkdir /mnt/usb
      mount -t vfat /dev/sdb4 /mnt/usb		# U盘是FAT32的写vfat
      ```

      注意，进入U盘之后ls可能会出现无法现实中文，修改方式是在挂载的时候指定编码

      ```bash
      mount -t vfat -o iocharset=utf8 /dev/sdb4 /mnt/usb
      ```

      前提是Linux安装的时候选择了中文编码，同时tty支持中文

    - 卸载命令

      ```bash
      umount /dev/sdb4
      ```

- 挂载NTFS分区

  windows下大多数使用的是NTFS分区，但是Linux不识别NTFS分区，可以通过修改实现**只读**

  - Linux的驱动加载顺序是

    - 系统加载必备的驱动会直接放在系统的内核中这这部分数量比较少
    - 驱动以模块的形式放在硬盘中，存放在`/lib/modules/2.6.32-642.el6.x86_64/kernel/`
    - 驱动可以被Linux识别，但是Linux认为不常用，默认不加载，如果需要手动安装那么需要重新编译内核，NTFS属于这个范畴
    - 部分硬件不被Linux识别，那么需要手动安装驱动，甚至是手写

  - 可以使用`ntfs-3G`插件手动安装，然后

    ```bash
    mount -t ntfs-3g /dev/sdb1 /mnt/win
    ```


## Vim编辑器

基础内容略，见[Vim笔记](www.liukairui.cc/Vim使用全指南(环境配置,插件推荐,美化)(C++,Python,MarkDown,R...))

windows文件中的回车会在linux中显示为`^M$`，Linux中的回车会显示成`$`可以使用`dos2unix`，`unix2dos`实现相互转化

## 软件包安装

### 软件包的分类

Windows与Linux的软件是不通用的，windows的软件是经过编译的二进制exe/msi文件，Linux中有软件有**源码包**和**二进制包**文件

- 如果服务是给大量客户端使用的，建议使用源码包，因为源码包效率高
- 如果是给本机使用的建议使用RPM包

#### 二进制包

二进制包的分类

- DPKG包：由Debian Linux开发的包管理机制，主要用于Debian和Ubuntu
- RPM包：有RedHat开发的包管理系统，主要用于Fedora，CentOS,suSE

RPM包依赖

- 树形依赖：a->b->c

- 环形依赖：a->b->c->a

- 模块依赖(函数库依赖)，例如

  ```bash
  [root@10 liukairui]# mount /dev/cdrom /mnt/cdrom/
  mount: block device /dev/sr0 is write-protected, mounting read-only
  [root@10 liukairui]# cd /mnt/cdrom/Packages/
  [root@10 Packages]# rpm -ivh mysql-connector-odbc-5.1.5r1144-7.el6.x86_64.rpm 
  warning: mysql-connector-odbc-5.1.5r1144-7.el6.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID c105b9de: NOKEY
  error: Failed dependencies:				# 错误：失败依赖性
          libodbcinst.so.2()(64bit) is needed by mysql-connector-odbc-5.1.5r1144-7.el6.x86_64
          unixODBC is needed by mysql-connector-odbc-5.1.5r1144-7.el6.x86_64
  ```

  可以看到，我们安装的是mysql-connector-odbc-5.1.5r1144-7.el6.x86_64.rpm但是报错提示的是这个包依赖于mysql-connector-odbc-5.1.5r1144-7.el6.x86_64这说明我们看反了...依赖的是libodbcinst.so.2()(64bit)可以看到他依赖的是一个.so.数字，是一个函数库，于是

  ```bash
  rpm -ivh libodbc<Tab>
  ```

  于是tab发现并没有补全，这是因为压根就没有这个软件，我们缺少的是函数库，这个函数库只是某个软件包的一个函数库，需要先安装这个软件才能带出这个软件库，但是这个软件的名字我们不知道，可以去[http://rpmfind.net/](http://rpmfind.net/)查询，打开链接输入`libodbcinst.so.2`看到第三列是系统名字，找到我们的CentOS(如果发现一个CentOS都没有，可以刷新一下...)对应的一行，右边一列就是那个需要安装的软件包

RedHat也认为依赖难以解决于是在手动安装包的基础上开发了yum安装的方式(注意没有yum包，只有源码包或者rpm包)，yum包安装软件的时候会自动链接RedHat的服务器获取依赖信息，下载依赖文件

### 二进制RPM包命令

#### RPM包的命名规则

```
httpd-2.2.15-53.el6.centos.x86_64.rpm 
```

上面是Apache的软件包，有几个部分组成

- httpd：软件包名，注意这是软件包名/进程名，可以不叫Apach

- 2.2.15：软件版本

- 53：发布次数

- e16：软件发行商。e16是RedHat发布的适合于RHEL6.x下使用

- x86_64：适合的硬件平台，RPM包可以在不同硬件平台安装选择适合不同CPU的软件版本所以出现了有

  - `i386`适合386以上平台使用
  - `i686`适合奔腾II以上计算机安装
  - `x86_64`64位CPU均可安装
  - `noarch`没有硬件限制

  等文件名

- rpm：扩展名，用来帮助管理员区分

以上是包全名，还有包名就是第一部分的软件包名，如果是要操作没有安装的软件包就要使用包全名与绝对路径，如果操作已经安装的软件包可以直接使用包名，系统会自动搜索rpm数据库(`/var/lib/rpm`)找到路径

#### RPM包的安装

- 安装命令

  - `rpm -ivh 包全名`
  - `-i`安装
  - `-v`显示详细信息
  - `-h`打印#显示进度
  - `--perfix=`指定路径，如果不指定，软件会安装在开发者指定的安装位置，不建议修改路径，否则不易维护与卸载
  - `--nodeps`不检测依赖安装(但是如果不检测依赖的软件基本不能用，不建议使用)
  - `--replacefiles`如果安装的时候部分文件已存在就会报错，使用这个选项可以强制覆盖
  - `--force`强制安装，相当于`--replacefiles --nodeps`
  - `--test`测试安装，不实际安装，只是检测依赖

- 使用RPM安装Apache

  ```bash
  [root@10 Packages]# rpm -ivh httpd-
  httpd-2.2.15-53.el6.centos.x86_64.rpm         httpd-manual-2.2.15-53.el6.centos.noarch.rpm
  httpd-devel-2.2.15-53.el6.centos.x86_64.rpm   httpd-tools-2.2.15-53.el6.centos.x86_64.rpm
  [root@10 Packages]# rpm -ivh httpd-2.2.15-53.el6.centos.x86_64.rpm 
  warning: httpd-2.2.15-53.el6.centos.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  error: Failed dependencies:
          apr-util-ldap is needed by httpd-2.2.15-53.el6.centos.x86_64
          httpd-tools = 2.2.15-53.el6.centos is needed by httpd-2.2.15-53.el6.centos.x86_64
          libapr-1.so.0()(64bit) is needed by httpd-2.2.15-53.el6.centos.x86_64
          libaprutil-1.so.0()(64bit) is needed by httpd-2.2.15-53.el6.centos.x86_64
  [root@10 Packages]# rpm -ivh apr-devel-1.3.9-5.el6_2.x86_64.rpm 
  warning: apr-devel-1.3.9-5.el6_2.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  error: Failed dependencies:
          apr = 1.3.9-5.el6_2 is needed by apr-devel-1.3.9-5.el6_2.x86_64
          libapr-1.so.0()(64bit) is needed by apr-devel-1.3.9-5.el6_2.x86_64
  [root@10 Packages]# rpm -ivh apr-
  apr-1.3.9-5.el6_2.x86_64.rpm               apr-util-devel-1.3.9-3.el6_0.1.x86_64.rpm
  apr-devel-1.3.9-5.el6_2.x86_64.rpm         apr-util-ldap-1.3.9-3.el6_0.1.x86_64.rpm
  apr-util-1.3.9-3.el6_0.1.x86_64.rpm        
  [root@10 Packages]# rpm -ivh apr-1.3.9-5.el6_2.x86_64.rpm 
  warning: apr-1.3.9-5.el6_2.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:apr                    ########################################### [100%]
  [root@10 Packages]# rpm -ivh apr-devel-1.3.9-5.el6_2.x86_64.rpm 
  warning: apr-devel-1.3.9-5.el6_2.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:apr-devel              ########################################### [100%]
  [root@10 Packages]# rpm -ivh httpd-tools-2.2.15-53.el6.centos.x86_64.rpm 
  warning: httpd-tools-2.2.15-53.el6.centos.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  error: Failed dependencies:
          libaprutil-1.so.0()(64bit) is needed by httpd-tools-2.2.15-53.el6.centos.x86_64
  [root@10 Packages]# rpm -ivh apr-util-
  apr-util-1.3.9-3.el6_0.1.x86_64.rpm        apr-util-ldap-1.3.9-3.el6_0.1.x86_64.rpm
  apr-util-devel-1.3.9-3.el6_0.1.x86_64.rpm  
  [root@10 Packages]# rpm -ivh apr-util-1.3.9-3.el6_0.1.x86_64.rpm 
  ]warning: apr-util-1.3.9-3.el6_0.1.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:apr-util               ########################################### [100%]
  [root@10 Packages]# rpm -ivh httpd-tools-2.2.15-53.el6.centos.x86_64.rpm 
  warning: httpd-tools-2.2.15-53.el6.centos.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:httpd-tools            ########################################### [100%]
  [root@10 Packages]# rpm -ivh httpd-2.2.15-53.el6.centos.x86_64.rpm 
  warning: httpd-2.2.15-53.el6.centos.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  error: Failed dependencies:
          apr-util-ldap is needed by httpd-2.2.15-53.el6.centos.x86_64
  [root@10 Packages]# rpm -ivh apr-util-ldap-1.3.9-3.el6_0.1.x86_64.rpm 
  warning: apr-util-ldap-1.3.9-3.el6_0.1.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:apr-util-ldap          ########################################### [100%]
  [root@10 Packages]# rpm -ivh httpd-
  httpd-2.2.15-53.el6.centos.x86_64.rpm         httpd-manual-2.2.15-53.el6.centos.noarch.rpm
  httpd-devel-2.2.15-53.el6.centos.x86_64.rpm   httpd-tools-2.2.15-53.el6.centos.x86_64.rpm
  [root@10 Packages]# rpm -ivh httpd-2.2.15-53.el6.centos.x86_64.rpm 
  warning: httpd-2.2.15-53.el6.centos.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:httpd                  ########################################### [100%]
  [root@10 Packages]# rpm -ivh httpd-manual-2.2.15-53.el6.centos.noarch.rpm 
  warning: httpd-manual-2.2.15-53.el6.centos.noarch.rpm: Header V3 RSA/SHA1 Signature, key ID c105b9de: NOKEY
  Preparing...                ########################################### [100%]
     1:httpd-manual           ########################################### [100%]
  ```

  启动Apache服务

  ```bash
  [root@10 Packages]# service httpd restart
  停止 httpd：                                               [确定]
  正在启动 httpd：                                           [确定]
  ```

  也可以是

  ```bash
  [root@10 Packages]# /etc/rc.d/init.d/httpd restart
  停止 httpd：                                               [确定]
  正在启动 httpd：                                           [确定]
  ```

  实际上service就是搜索的`/etc/rc.d/init.d/httpd`

  `netstat -tulnp`看到httpd跑在80上

  `setup`关闭防火墙

  `ifconfig`看ip

  网页的位置在`/var/www/html`

  配置文件在`/etc/httpd/conf/httpd.conf`
  

#### RPM包升级

- `rpm -Uvh 全名`：升级安装，没装会直接装，装了会升级
- `rpm -Fvh 全名`：升级安装，只升级不安装

#### RPM包卸载

- `rpm -e 包名`
- `--nodeps`不检查依赖 ，生产不得使用
- 卸载的时候会提示程序有某个依赖还没有卸载，需要卸载依赖才可以卸载他，例如`hpptd->httpd-tools`那么卸载http的时候就会提示还没卸载httpd-tools，比较麻烦，但是不能用yum替代，yum在卸载的时候会自动处理依赖，但是例如有依赖关系`systemXXX->httpd->httptool`某个系统工具依赖httpd,当卸载httpd时候yum认为http-tool没有httpd也可以独立存在没有卸载的必要，但是systemXXX依赖于httpd,没了httpd的话systemXXX也没有必要，于是连带卸载了，但是systemXXX很可能是系统软件直接删了管理员又不知道，系统直接崩

#### RPM包的查询

- `rpm -q 包名`可以查询某个包是否安装，注意yum的查询与之不同，yum的查询是查询RedHat也没有这个包
- `rpm -qa`可以系统中所有的包
- `rpm -qi 包名`可以查询某个包的详细信息
- `rpm -qip 包全名`可以查询某**未安装**包的详细信息
- `rpm -ql 包名`可以查询某包的文件安装位置
- `rpm -qlp 包全名`可以查询某**未安装**包的文件安装位置
- `rpm -qf 某文件名`可以反查这个文件是那个包的文件
- `rpm -qR 包名`查询软件的所有依赖包(注意不管装没装都写)

#### RPM包验证

- `rpm -Va`验证本机所有已经安装的软件包
- `rpm -V 包名`验证某个已经安装的软件包
- `rpm -Vf 文件`验证某个软件包的文件

验证的机制是检查文件与初始安装时发生的变化，例如修改httpd的conf文件

```bash
[root@10 liukairui]# rpm -V httpd
S.5....T.  c /etc/httpd/conf/httpd.conf
```

系统会现实那个包发生了变化，变化的信息卸载前面，分别是

- `S`文件大小发生变化
- `M`文件权限变化
- `5`文件MD5发生变化
- `D`设备主从代码发生改变
- `L`文件路径变化
- `U`文件所有者变化
- `G`文件所属组变化
- `T`文件的修改时间变化
- `c`这个文件是这个软件的配置文件
- `d`这个文件是这个软件的普通文件
- `g`这个文件是这个软件的鬼文件(不是RPM包的文件)
- `l`这个文件是这个软件的授权文件
- `r`这个文件是这个软件的描述文件

这个RPM校验是与RPM记录的原始值进行对比，为了保证原始值有个数字证书的概念

#### 数字证书

数字证书，又称数字签名，由软件开发商直接发布。Linux 系统安装数字证书后，若 RPM 包做了修改，此包携带的数字证书也会改变，将无法与系统成功匹配，软件无法安装。

可以将数字证书想象成自己的签名，是不能被模仿的（厂商的数字证书是唯一的），只有我认可的文件才会签名（只要是厂商发布的软件，都符合数字证书验证）；如果我的文件被人修改了，那么我的签名就会变得不同（如果软件改变，数字证书就会改变，从而通不过验证。当然，现实中人的手工签名不会直接改变，所以数字证书比手工签名还要可靠）。

数字证书是为了保证RPM校验文件没有问题，具有如下特点

- 必须找到原厂的公钥才可以安装
- 再安装PRM包的时候会提取RPM的证书与本机原厂证书对比验证
- 验证通过安装，不通过就报错

数字证书的位置`/mnt/cdrom/RPM-GPG-KEY-CentOS-6`与`/etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`

- 安装数字证书

  ```bash
  [root@localhost ~]# rpm --import /efc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6
  ```

- 验证数字证书

  ```bash
  [root@localhost ~]# rpm -qa | grep gpg-pubkey
  ```

#### RPM包的文件提取命令

在修改软件配置文件但是想恢复的时候会发现覆盖安装只会安装被删除的文件，但是不覆盖存在的文件，所以需要从rpm包中提取文件

- cpio命令

  这个命令本身是用来做复制备份还原的，但是用它备份还原极其不方便，不推荐进行备份还原

  **备份**

  ```bash
  cpio -o[vcB] > [文件|设备]
  ```

  - `-o`备份模式
  - `-v`显示备份过程
  - `-c`使用portable formate存储方式
  - `-B`设定输入输出块为5120Bytes而不是5120butes

  **还原**

  ```bash
  cpio -i[vcdu] < [文件|设备]
  ```

  - `-i`还原模式
  - `-v`显示还原过程
  - `-c`使用portable formate存储方式
  - `-d`还原时自动新建目录
  - `-u`使用较新的文件覆盖旧文件

  **备份**

  ```bash
  cpio -o[vcB] > [文件|设备]
  ```

  - `-o`备份模式
  - `-v`现实备份过程
  - `-c`使用portable formate存储方式
  - `-B`设定输入输出块为5120Bytes而不是5120butes

  举例备份还原`/etc`

  ```bash
  find /etc -print | cpio -ocvB > /root/etc.cpio	# 必须用find与管道找源文件用>方式写入
  cpio -idvcu < /root/etc.cpio				   # 必须这么恢复
  ```

  **提取RMP中文件**

  ```bash
  rpm2cpio 包全名 | cpio -idv ./文件的绝对路径
  ```

  注意，一定要写那个./文件的绝对路径，否则自动覆盖文件，写上之后会拷贝到当前目录，至于那个文件绝对路径只需要写成实际目录地址，例如提取Apach

  ```bash
  [root@10 liukairui]# rpm2cpio /mnt/cdrom/Packages/httpd-2.2.15-53.el6.centos.x86_64.rpm | cpio -idv ./etc/httpd/conf/httpd.conf 
  ./etc/httpd/conf/httpd.conf
  6222 块
  [root@10 liukairui]# ll ./etc/httpd/conf/httpd.conf 
  -rw-r--r--. 1 root root 34419 2月   2 23:43 ./etc/httpd/conf/httpd.conf
  ```

#### RPM包在线安装命令yum

- yum源的文件解析

  yum源配置文件在`/etc/yum.repos.d`目录，扩展名是.repo，也就是说 yum源配置文件只要是.repo就会生效

	```bash
	[root@10 liukairui]# ls /etc/yum.repos.d/
	CentOS-Base.repo  CentOS-Debuginfo.repo  CentOS-fasttrack.repo  CentOS-Media.repo  CentOS-Vault.repo
	```

	默认有5个源，以此是是默认的基础的网络yum，调试的，快速的，光盘的，虚拟的，可以尝试打开base文件

	```bash
	[base]											  # 容器名
	name=CentOS-$releasever - Base						# 容器描述
	mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os&infra=$infra
	#baseurl=http://mirror.centos.org/centos/$releasever/os/$basearch/
	# 镜像地址与原网址，只保留一个生效
	gpgcheck=1										  # 验证证书
	gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6   # 证书位置
	enabled=0										  # 是否启用
	...
	```
	
	网络源在国外很慢可以配置光盘源，方式是将其他的源修改为`.repo.bak`，将光盘源enable，修改地址到光盘挂载地址然后注释后面两个不用的地址
	
- yum命令

  注意在yum中不区分包名和包全名，全部使用包名即可

  - 查询
    - 查询源中的所有包`yum list`
    - 查询源中的某个包`yum list 包名`
    - 模糊查询包`yum search 关键字`
  - 安装
    - `yum -y install 包名`其中`-y`是自动回答yes
  - 升级
    - `yum -y update 包名`其中`-y`是自动回答yes
    - `yum -y update`升级所有软件包括内核
  - 卸载
    - `yum remove 包名`注意依赖关系，不建议使用

- yum组管理

  就像在安装的时候选择BasicSever一样可以安装一系列软件

  - 列出所有组：`rpm grouplist`
  - 查询一个组包括的软件包 `yum groupinfo 组`
  - 安装一个组`yum groupinstall 组`
  - 卸载一个组`yum grouremove 组`

### 源码包的安装

- 源码包必须指定安装位置，否则会到处乱装，还不知道去哪里卸载

- 尝试安装apache-2.2.7 

  版本比较老，但是高版本CentOS6跑不起来，可以在此处下载[http://archive.apache.org/dist/httpd/](http://archive.apache.org/dist/httpd/)然后搜索即可，注意从[https://github.com/apache/httpd/releases/tag/2.2.9](https://github.com/apache/httpd/releases/tag/2.2.9) 下载的缺少文件不要使用，然后使用SCP传输到虚拟机(如果使用的是VirtualBox虚拟机可以使用`scp -P 9000 -r ./download/httpd-2.2.9.tar.bz2  liukairui@127.0.0.1:/home/liukairui`其中-P后面是我们之前配置的转发端口，没有-P则会自动连接22口会显示无法连接)

  - 解压

    ```bash
    [root@10 liukairui]# tar -jxvf httpd-2.2.9.tar.bz2 
    [root@10 liukairui]# cd httpd-2.2.9
    ```

  - `./configure`

    `configure`的作用是

    - 检查系统条件是否符合要求
    - 自定义需要安装的功能，可以查询`./configure --help`查看
    - 将系统环境检测好写入makefile

    ```bash
    [root@10 httpd-2.2.9]# ./configure --prefix=/usr/local/apache2
    ```

  - 安装`gcc`

  - `make`

  以上两条命令只是进行编译而没有安装，不会安装到`/usr/local/http2`所以如果报错只需要`make clean`清空文件即可，不需要删除`usr/local/http2`

  - `make install`

  如果install报错需要`make clean`删除`/usr/local/http2`

  - 验证安装成功`ps aux | grep httpd`

  如果是使用VirtualBox可以将网络设置为桥接网卡，其他默认，开机后`ifconfig`看到ip地址，之后ssh就可以不加-P端口了，同时在外面浏览器直接看ip可以看到网页正常工作

- 打补丁

  生成一个测试补丁

  ````bash
  [root@localhost ~]# mkdir ./test			# 创建一个测试目录
  [root@localhost ~]# cd test/				# 进入目录
  [root@localhost test]# echo AAA >> old		# 创建老文件
  [root@localhost test]# echo ABA >> new		# 创建新文件
  [root@localhost test]# diff -Naur /root/test/old /root/test/new > txt.patch	# 生成补丁必须绝对路径
  ````

  看补丁

  ```bash
  [root@localhost test]# cat txt.patch 
  --- /root/test/old      2021-02-03 23:08:08.635990638 +0800
  +++ /root/test/new      2021-02-03 23:08:18.253998956 +0800
  @@ -1 +1 @@
  -AAA
  +ABA
  ```

  可以看到，这个补丁文件详细的记录了文件的绝对路径和修改信息

  打补丁

  ```bash
  [root@localhost test]# patch -p3 < txt.patch 
  patching file old
  ```

  `-p3`的意思就是将当前pwd的位置退出几层，因为补丁中已经有了路径，如果不写patch会认为是`/root/test/root/test/所以我们要往出退2层写**p3**，p1是当前目录，p2是退一层，p3是退两层

#### 脚本包安装

可能某个包需要大量的rpm和源码包，十分复杂，可以把安装目录写入shell脚本，以后只需要一条目录回车就可以

- 使用脚本包安装Webmin

  Webmin是一个基于Web的Linux系统管理界面

  - 解压
  - `./install.sh`

## 用户管理

### 用户相关文件

- `/tec/passwd`用户信息文件

  打开以后看到很多行，一行是一个用户，但是都不是自己添加的，是系统为了启动服务添加的，不能动，一行都是如下形式，分别是

  ```bash
  root:x:0:0:root:/root:/bin/bash
  ```

  - 用户名
  - 密码位，x代表有密码，具体的密码在`/etc/shadow`,只有有x标记系统才会去shadow里面找密码
  - 用户ID
    - 0：超级用户UID，只要一个用户UID是0，就是超级用户，所以实际上是可以将一个普通用户升级成超级用户，但是不建议，如果这样的话，用提升后的用户执行`whoami`得到的是root,因为UID一样
    - 1-499：系统用户(伪用户)
    - 500-60000：普通用户
  - 用户的初始组ID，其中组ID与组名的对应关系在`/etc/group`
  - 简单解释用户是做什么的(可空)
  - 用户的家目录
  - 登陆之后执行的shell

- `/etc/shadow` 影子文件

  一共9列，分别是

  ```bash
  root:$6$lDwFrlZqSZ/jd7Yu$MSOi/4Tka85amFZyV4mWO0swbLe0zUnuU28bo/v/p2uOs/sCyGFXMAiyJJBen5hxUZ9kn2yA.k6hcZmFJVR650:18655:0:99999:7:::
  ```

  - 用户名
  - 加密后的密码(SHA512)，`*`或者`!!`代表他们是没有密码的，如果我想让一个用户临时无法登陆，约定俗成的是在加密串前面加`!`
  - 上一次设置密码的时间戳
  - 最小的修改密码间隔时间(天)
  - 密码有效期(天)
  - 密码到期前的警告时间
  - 密码到期后的款先天数(默认是-1，表示永久有效)
  - 密码的失效时间
  - 保留列，目前没有意义
  
- `/etc/group`组信息文件

  只有四列

  ```bash
  mail:x:12:mail,postfix
  ```

  - 组名
  - 组密码位(在`/etc/gshadow`)可以给组设置密码，但是不建议，组密码是用来做组管理员的，在默认情况下只有root可以修改用户组，现在可以让root设置组密码，之后普通用户使用组密码对一个组进行修改用户，但是不常用，不建议
  - 组ID
  - 组的附加用户

  初始组和附加组

  - 初始组：每个用户只能有一个，一般就是与用户名同名的组
  - 附加组：用户可以有多个附加组，将用户加入组就是加入附加组

- `/home/[username]/`用户家目录

- `/var/spool/mail/[username]/`是用户邮箱文件

- `/etc/skel`用户目录模板，当新建一个用户的时候用户文件夹下会自动创建的文件就是拷贝至此

### 用户管理命令 

- `useradd`命令

  - `-u XXX` 指定用户UID为XXX

  - `-g` 指定初始组

  - `-G` 指定附加组

  - `-c` 添加说明

  - `-d` 指定目录

  - 以上选项基本不用，不建议使用，最常用的还是`useradd [username]`，默认选项的控制文件在`/etc/default/useradd`和`/etc/login.defs`

  - `/etc/default/useradd`

    ```bash
    # useradd defaults file
    GROUP=100				# 添加用户的默认组id(但是目前不采用)
    HOME=/home				# 默认家位置
    INACTIVE=-1				# 密码过期的宽限天数(-1代表用不过期)
    EXPIRE=					# 密码的失效时间 
    SHELL=/bin/bash			 # shell目录
    SKEL=/etc/skel			 # 模板目录
    CREATE_MAIL_SPOOL=yes	  # 默认创建邮箱
    ```

  - `/etc/login.defs`

    ```bash
    MAIL_DIR	/var/spool/mail			# 邮箱地址
    PASS_MAX_DAYS	99999				# 密码有效期
    PASS_MIN_DAYS	0					# 改密码最小间隔
    PASS_MIN_LEN    5					# 密码最小长度(目前已经无效)
    PASS_WARN_AGE   7					# 到期警告天数
    UID_MIN                   500		 # UID 范围
    UID_MAX                 60000
    GID_MIN                   500		 # GID 范围
    GID_MAX                 60000
    CREATE_HOME     yes					# 自动建立家目录
    UMASK           077					# 家目录权限
    USERGROUPS_ENAB yes					# 使用userdel删除用户的时候是否删除家目录
    ENCRYPT_METHOD SHA512				# 密码存储加密方式
    
    ```

- `passwd` 命令

  - 普通用户修改自己密码直接`passwd`且必须符合密码原则，root使用`passwd [username]`修改别人密码
  - `passwd -l [username]`可以将用户锁起来，原理就是在shadow里面用户密码前面加`!!`

  - `passwd -u [username]`可以将用户解锁，原理就是在shadow里面用户密码前面去掉`!!`
  - `passwd --stdin` 用于管道设置密码，例如`echo "123" | passwd --stdin [username]`这样就不会说什么重复输入密码
  - `chage -d 0 [username]`将用户上次修改日期时间戳设为0(shadow的第三列)，这样系统认为是时间戳异常，在用户登陆后会要求修改密码

- `usermod`命令
  
  - `-c`修改用户帐号的备注文字。
  　- `-d`修改用户登入时的目录。
  　- `-e`修改帐号的有效期限。
  　- `-f`修改在密码过期后多少天即关闭该帐号。
  　- `-g`修改用户所属的群组。
  　- `-G`修改用户所属的附加群组。
  　- `-l`修改用户帐号名称。
  　- `-L`锁定用户密码，使密码无效。
  　- `-s`修改用户登入后所使用的shell。
  　- `-u`修改用户ID。
  　- `-U`解除密码锁定。
  　- 实际上最常用的就是`-G`
  　- 不建议修改用户名，否则只修改用户名，初始组...都不变
  
- `userdel`命令

  - `userdel 用户名`可以删除用户
  - `-r` 同时删除家目录

- `su`命令

  - `su [username]`可以切换到其他用户
  - 存在的小问题是`su [username]`之后home不会切换，方式是加上`-`选项
  - `-c`仅执行一次，不切换用户

### 组管理命令

- `groupadd`命令
  - 用于添加组
  - `-g`指定组的GID
- `groupdel`命令
  - 删除组
- `gpasswd`命令
  - 将用户加入/删除附加组，与`usermod`一样，但是建议用这个
  - `gpasswd -a [username] [groupname]`添加组 
  - `gpasswd -d [username] [groupname]`移出组
- `newgrp`命令
  - 用于修改有效组(当用户新建文件后文件的所属组是有效组，默认是初始组，可以切换到附加组)
  - 在用户登陆后`newgrp 附加组`

 ## 权限管理

Linux中权限一共有6种，有wrx,umask两种常见的，还有四种

### ACL权限

用于解决用户对文件身份不足的问题，例如一个文件夹，所有者A，所属组B，均有7权限，其他人为0权限，现在要有用户C对文件夹有5权限，那么传统的rwx是无法实现的。在windows中我们可以忽略所属组所有者的概念，直接对用户指定权限，ACL与之类似

- 确定开启ACL：`dumpe2fs -h /dev/sad1`，ACL权限是和分区绑定的，使用分区查看工具查看分区是否有ACL，看到`Default mount options`有ACL即可。如果没有挂载可以手动重新挂载`mount -o remount,acl /`，或者修改fstab
- `setfacl`命令
  - `-m`设置ACL
    - `setfacl -m u:用户名:权限 文件名`
    - `setfacl -m g:组名:权限 文件名`
    - `setfacl -m X:XXX:XXX -R 文件名`**对已经存在的子文件**递归生效
    - `setfacl -m d:X:XXX:XXX -R 文件名`**对已经存在和以后创建的子文件**递归生效
    - 设置之后尝试ls文件就会发现文件权限变成了`-rw-rwxr--+ `加号表示有ACL权限
  - `-b`删除ACL
  - `-x 用户`删除单个用户ACL
- `getfacl 文件名`查看ACL

ACL权限最大的问题是权限溢出，一旦使用了递归赋予ACL，对目录一定要给x权限，那么目录里面的子文件也拥有了x权限，这个是十分危险的，所以还需要手动将子文件的x删除，可以写shell解决，所以能用rwx就用rwx，遇到文件身份不足的时候再用ACL

### sudo 授权

sudo可以给普通用户赋予部分管理员的权限，权限划分需要配置文件，执行`visudo`

唯一没有注释的一行，意思分别是

```bash
root    ALL=(ALL)       ALL
```

- 用户名
- 机器所在的ip，例如，可以写123.123.123.123,111.111.111.111表示只有被控制的机器在这两个ip下这行sudo才有效，但是这个限制方式不是很常用了
- 可以临时执行的用户，不写就是root
- 用户可以使用sudo执行哪些命令，必须是命令的绝对路径

例如

```bash
liukairui    192.168.1.3,192.168.1.2=(ALL)     /sbin/shutdown 
```

指的是liukairui可以临时执行/sbin/shutdown命令，只有当被控制机器的ip在192.168.1.3,192.168.1.2刚刚这句话才有效

这里的命令必须是绝对路径，用户在执行的时候也必须是绝对路径，如果想写多个命令可以在一个命令后加上`, `注意，必须是逗号和空格，如果不习惯可以写多行，互不冲突，例如

```bash
liukairui    192.168.1.3,192.168.1.2=(ALL)     /sbin/shutdown
liukairui    192.168.1.3,192.168.1.2=(ALL)     /sbin/reboot
```

但是一般在分配权限的时候还应该细致考虑，例如我只想让liukairui立刻重启服务器，不想让他关机或者延时重启，应该写

```bash
liukairui    ALL=(ALL)     /sbin/shutdown -r now
```

命令越细致越安全，也要注意几个例子

- 让用户可以修改某个文件

  ```bash
  liukairui    ALL=(ALL)     /usr/bin/vim /path/to/file
  ```

  而不能只写

  ```bash
  liukairui    ALL=(ALL)     /usr/bin/vim
  ```

  否则liukairui可以使用vim做所有的事情，这样完全可以修改任意重要的系统文件例如sudoer，相当于给了他服务器所有的控制权

- 让用户为其他用户修改密码

  ```bash
  liukairui    ALL=(ALL)     /usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd "", !/usr/bin/passwd root
  ```

  这里使用正则与!限制用户不会修改了root密码

### 特殊文件权限

特殊文件权限有SetUID，SetGID，StickyBIT，这三个都是Linux为了应对特殊情况设计的，极其危险，极其不推荐自行设置

在普通用户尝试设置密码的时候，密码会存储到`/etc/shadow`中，但是shadow文件是`----------.`明显是无法写入的，但是改密码成功了，原因是passwd命令是特殊的，可以查看

```bash
[liukairui@10 ~]$ ll /usr/bin/passwd
-rwsr-xr-x. 1 root root 30768 11月 24 2015 /usr/bin/passwd
```

passwd的权限是`-rwsr-xr-x`，`rwd`变成了`rws`此时passwd命令具有SetUID，可以修改shadow，所属组是`rws`表示文件具有SetGID权限，如果其他人权限是`rwt`表示其他人具有StickyBIT权限

- SetUID
  - 只有二进制文件才可以设置SUID
  - 命令执行者必须具有执行权限(否则权限会显示`rwS`，S代表报错)
  - 命令的执行者在执行命令文件的时候会临时变为文件的所有者例如passwd会变成root
- SetGID
  - 既可以针对执行文件也可以针对目录
  - 对于文件，与SUID类似，只不过是执行的时候所属组身份会变化，代表指令有locate
  - 对于目录，普通用户必须具有7权限才生效，之后用户进入后有效组会变为所属组，例如user进入了某个`drwxrwsrwx root:root`的文件夹，touch一个文件，文件的所属组会变成root而不是user
- StickyBIT
  - 称为粘着位
  - 只对目录有效
  - 普通用户必须拥有wx权限
  - 当设置了粘着位权限后普通用户只能删除这个文件夹里面自己创建的文件，即使有w也不能删除其他人创建的文件，但是root可以无视

- 设置方法
  - `chmod u+s 文件`设置SUID
  - `chmod g+s 文件`设置SGID
  - `chmod o+t 文件`设置SBIT
  - `chmod XYYY 文件`，其中YYY是原来是三位数字，例如755，X表示特殊权限
    - 4是SUID
    - 2是SGID
    - 1是SBIT

### chattr权限

这个权限没有危险性，还可以假性的限制root

- `chattr`命令
  - 设置chattr权限
  - 只有root可以运行
  - 使用`+-`增减权限
  - `i`权限，文件不可以删除，重命名，修改内容的所有操作
  - `a`权限，文件只能用`echo >>`追加内容，对于文件夹就是只能新建和修改?内部的文件
- `lsattr`命令
  - ls不嫩查看chattr权限，只有lsattr可以查看chattr权限
  - `-d`查询目录的权限
- **注意**：有的时候我们无法删除文件，但是lsattr却没有特殊权限，考虑是文件夹设置了chattr权限

#### SELinux权限

以后再说

## 文件系统管理

### 硬盘结构与接口

略

### 文件系统

#### 文件系统组成

- super block (超级块) 记录了整个分区的block与inode总量，已经使用与没有使用的block与inode,文件系统的挂载时间与最近校验时间，可以使用`dumpe2fs -h /dev/sdax`检查
- data block (数据块) 用于保存数据的块
- inode 用来记录文件的权限，所属组，文件大小...
- 分区的模型
  - 最开始是一个超级块
  - 其余空间由于数量过大，直接做一个inode区不好查，系统还会将剩下的空间分成很多块组(大致200M，使用dumpe2fs /dev/sda1)
  - 一个块组中包含了
    - inode块
    - 数据块

#### 常见的文件系统

ext->ext2->ext3->ext4->xfs

常用的是ext4，文件大小几乎没有限制

从RedHat4(CentOS7)开始就使用了xfs，采用日志形的，丢数据概率低

### 常用硬盘管理命令

- `df`命令
  - 显示硬盘占用率
  - `-h`人性化显示
  - `-a`显示特殊系统文件，例如内存
  - `-T`显示文件系统类型

- `du`命令
  - ls显示文件夹大小的时候只会显示文件夹文件的大小，也就是文件夹记录的文件名-inode表的大小，想要获取实际的大小`du 文件夹`查看
  - `不加选项`显示每个子文件的大小，最后显示文件夹大小
  - `-h`人性化显示
  - `-s`只显示总占用
  -  `-a`显示每个子文件夹的大小

**df是统计空间大小的，包括的临时文件，没有释放的文件，du是只统计文件大小，两者可能不同，重启即可**

- `fsck`命令

  - 用于修复文件系统
  - `fsck -y /dev/sda1`
  - 这个命令在意外重启开机后会自动执行，所以如果能修复，开机就修复了，修复不了，手动执行也没有用

- `dumpe2fs`命令

  - 直接执行

    ```bash
    [root@10 liukairui]# dumpe2fs /dev/sda5
    dumpe2fs 1.41.12 (17-May-2010)
    Filesystem volume name:   <none>			# 卷标
    Last mounted on:          /home				# 挂载点
    Filesystem UUID:          9de2adcf-e7ad-4d49-b032-aadca5924b64	# UUID唯一识别符
    Filesystem magic number:  0xEF53
    Filesystem revision #:    1 (dynamic)
    Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
    Filesystem flags:         signed_directory_hash 
    Default mount options:    user_xattr acl	# 挂载参数 
    Filesystem state:         clean				# 文件系统状态，正常
    Errors behavior:          Continue
    Filesystem OS type:       Linux
    Inode count:              131072			# inode总数
    Block count:              524288			# 块总数
    Reserved block count:     26214
    Free blocks:              386665
    Free inodes:              66943
    First block:              0
    Block size:               4096				# 块大小
    Fragment size:            4096
    Reserved GDT blocks:      127
    Blocks per group:         32768
    Fragments per group:      32768
    Inodes per group:         8192
    Inode blocks per group:   512
    Flex block group size:    16
    Filesystem created:       Thu Jan 28 23:28:02 2021
    Last mount time:          Wed Feb 17 19:39:33 2021
    Last write time:          Wed Feb 17 19:39:33 2021
    Mount count:              25
    Maximum mount count:      -1
    Last checked:             Thu Jan 28 23:28:02 2021
    Check interval:           0 (<none>)
    Lifetime writes:          962 MB
    Reserved blocks uid:      0 (user root)
    Reserved blocks gid:      0 (group root)
    First inode:              11
    Inode size:               256				# inode大小
    Required extra isize:     28
    Desired extra isize:      28
    Journal inode:            8
    Default directory hash:   half_md4
    Directory Hash Seed:      f23ce554-4779-4435-93e1-6048b842d72b
    Journal backup:           inode blocks
    Journal features:         journal_incompat_revoke
    日志大小:             64M
    Journal length:           16384
    Journal sequence:         0x000000f9
    Journal start:            1
    
    Group 0: (Blocks 0-32767) [ITABLE_ZEROED]
      校验和 0x2b5a,0个未使用的inode
      主 superblock at 0, Group descriptors at 1-1
      保留的GDT块位于 2-128
      Block bitmap at 129 (+129), Inode bitmap at 145 (+145)
      Inode表位于 161-672 (+161)
      22319 free blocks, 1 free inodes, 289 directories
      可用块数: 10449-32767
      可用inode数: 18
    ...块信息...
    ```

  - `-h`查看超级块信息(没有后面的Group 0)

- `stat`命令

  - 查看文件的详细信息

    ```bash
    [root@10 liukairui]# stat webmin-1.970
      File: "webmin-1.970"
      Size: 12288           Blocks: 24         IO Block: 4096   目录
      #     文件大小         占用块              分区大小
    Device: 805h/2053d      Inode: 3621        Links: 132
      #     设备inode        inode              硬链接数
    Access: (0755/drwxr-xr-x)  Uid: (    0/    root)   Gid: (    1/     bin)
      #      权限              所有者                    所属组
    Access: 2021-02-16 22:44:31.673999983 +0800
    # 访问时间
    Modify: 2021-01-06 07:42:06.000000000 +0800
    # 修改时间
    Change: 2021-02-03 23:41:33.988999887 +0800
    # 状态修改时间
    ```

- `type`命令

  - 判断命令的类型

    ```bash
    [root@10 liukairui]# type cd
    cd is a shell builtin				# 内建命令
    [root@10 liukairui]# type mkdir
    mkdir is hashed (/bin/mkdir)
    [root@10 liukairui]# type /bin/mkdir
    /bin/mkdir is /bin/mkdir			# 是个命令
    [root@10 liukairui]# type ls
    ls is aliased to `ls --color=auto'	 # 是个别名
    ```

- `file`命令
  - 用于判断文件类型

    ```bash
    [root@10 liukairui]# file httpd-2.2.9.tar.bz2 
    httpd-2.2.9.tar.bz2: bzip2 compressed data, block size = 900k
    [root@10 liukairui]# file demo 
    demo: ASCII text
    [root@10 liukairui]# file /sbin/shutdown 
    /sbin/shutdown: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.18, stripped
    ```

### 手工分区的方法

- `fdisk -l`**查询**分区状态

- `fdisk /dev/sdb`对sdb进行交互式**分区**

  - `m`获取帮助

  - `n`新建

  - `d`删除

  - `p`打印分区

  - `l`列数可识别分区

  - `t`改变系统id

  - `q`不保存退出

  - `w`保存退出

  - 新建一个分区

    ```bash
    Command (m for help): n
    Command action
       e   extended
       p   primary partition (1-4)
    p									# 询问新建一个什么分区，第一个分区当然是主分区
    Partition number (1-4): 1			  # 主分区号，按顺序写，否则以前的难以利用
    First cylinder (1-2610, default 1):    # 起始柱面，直接回车默认
    Using default value 1
    Last cylinder, +cylinders or +size{K,M,G} (1-2610, default 2610): +2G
    # 终止柱面，因为难以计算，可以直接写大小，fdisk自己计算，注意的是因为最小单位是柱面，所以如果容量不能正好分完一个柱面则会选择一个就近的值，所以结果会比指定的大一点或者小一点
    ```

  - 新建一个逻辑分区

    ```bash
    Command (m for help): n
    Command action
       e   extended
       p   primary partition (1-4)
    e								# 新建一个扩展分区
    Partition number (1-4): 2		  # 选择编号2
    First cylinder (263-2610, default 263): 	# 将逻辑分区占满空闲区域
    Using default value 263
    Last cylinder, +cylinders or +size{K,M,G} (263-2610, default 2610): 
    Using default value 2610
    Command (m for help): n       		# 新建逻辑分区
    Command action
       l   logical (5 or over)			# 会自动换成逻辑，同时编号自动变成5+
       p   primary partition (1-4)
    l
    First cylinder (263-2610, default 263): 	# 起始扇区默认
    Using default value 263
    Last cylinder, +cylinders or +size{K,M,G} (263-2610, default 2610): +2G		# 给2G
    ```

  - w推出后可能会报硬盘忙error16，需要重启才可以格式化

- `mkfs -t ext4 /dev/sdb1`对分区**格式化**

  如果想要设置高级的格式化参数可以使用`mke2fs`，但是强烈不推荐

- `mount`**挂载**

- 设置**自动挂载**

  编辑/etc/fstab

  ```bash
  UUID=7413895f-b2f5-4d15-80eb-422af604c847 /                       ext4    defaults        1 1
  UUID=95fb2e8e-3bac-4270-83ff-938368cbfa34 /boot                   ext4    defaults        1 2
  UUID=9de2adcf-e7ad-4d49-b032-aadca5924b64 /home                   ext4    defaults        1 2
  UUID=86b5cdd1-de85-431c-a144-2d0eea95ebb6 swap                    swap    defaults        0 0
  tmpfs                   /dev/shm                tmpfs   defaults        0 0
  devpts                  /dev/pts                devpts  gid=5,mode=620  0 0
  sysfs                   /sys                    sysfs   defaults        0 0
  proc                    /proc                   proc    defaults        0 0
  ```

  - 第一列分区的UUID,这里建议写UUID而不是/dev/sdb1的原因是方式更换硬盘后系统将新盘的第一个分区误认为是sdb1，可以这样查看UUID

      ```bash
      [root@10 liukairui]# ll /dev/disk/by-uuid/
      总用量 0
      lrwxrwxrwx. 1 root root 10 2月  17 23:07 1c974240-05fc-45da-a574-34d62ada86b2 -> ../../sdb5
      lrwxrwxrwx. 1 root root 10 2月  17 23:07 45e3bdda-5297-44bd-950f-c7da1eefaec2 -> ../../sdb1
      lrwxrwxrwx. 1 root root 10 2月  17 22:09 7413895f-b2f5-4d15-80eb-422af604c847 -> ../../sda2
      lrwxrwxrwx. 1 root root 10 2月  17 22:09 86b5cdd1-de85-431c-a144-2d0eea95ebb6 -> ../../sda3
      lrwxrwxrwx. 1 root root 10 2月  17 22:09 95fb2e8e-3bac-4270-83ff-938368cbfa34 -> ../../sda1
      lrwxrwxrwx. 1 root root 10 2月  17 22:09 9de2adcf-e7ad-4d49-b032-aadca5924b64 -> ../../sda5
      ```

  - 第二列是挂载点
  - 第三列是文件系统
  - 第四列是挂载选项
  - 第五列是文件是否可以被备份
    - 0 不备份
    - 1 每天备份(推荐选择)
    - 2 不定期备份
  - 第六列是是否自动使用fsck自动检测
    - 0 不检测
    - 1 启动时检测(/需要)
    - 2 启动后检测(除了/之外的选择这个)

- `/etc/fstab`**文件修复**

  - 一切修复的前提是拿到本机...
  - 按提示登录
  - 重新挂载根分区`mount -o remount,wr /`来修改文件

- `parted`命令

  目前有GPT和MBR，其中fdisk只能做MBR分区，可以使用parted进行GPT分区

  - `print`打印分区，`Partition Table: msdos`说明是MBR

  - `mklabel gpt`修改分区表

  - 建立新分区

    ```
    (parted) mkpart
    分区名称？  []? disk1                                      # 设置一个免得后面麻烦               
    文件系统类型？  [ext2]?                                     # 回车               
    起始点？ 1M                                                # 不能回车，直接写1M                
    结束点？ 2G                                                # 写大小 
    (parted) mkfs                                             # 分区          
    分区编号？ 1                                                              
    文件系统类型？  [ext2]?                                     # 回车              
    (parted) q                                                                
    信息: You may need to update /etc/fstab.                                  
    [root@10 liukairui]# mkfs -t ext4 /dev/sdb1				# 格式化为ext4
    ```

  - 改分区大小

    有很大风险，不建议

    ```bash
    [root@10 liukairui]# parted /dev/sdb
    (parted) resize
    分区编号？ 1                                                              
    起始点？  [1049kB]?                                                       
    结束点？  [2000MB]? 3G              
    ```

- 建立/增加**swap分区**

  ```bash
  [root@10 ~]# fdisk /dev/sdb
  Command (m for help): n
  Command action
     e   extended
     p   primary partition (1-4)
  p
  Partition number (1-4): 1
  First cylinder (1-2610, default 1): 
  Using default value 1
  Last cylinder, +cylinders or +size{K,M,G} (1-2610, default 2610): +8G
  
  Command (m for help): t
  Selected partition 1
  Hex code (type L to list codes): 82			# 修改文件类型，这个可以在l查到
  Changed system type of partition 1 to 82 (Linux swap / Solaris)
  Command (m for help): w
  The partition table has been altered!
  
  [root@10 ~]# mkswap /dev/sdb1				# 格式化
  Setting up swapspace version 1, size = 8393924 KiB
  no label, UUID=a5b2a742-ee50-42f3-aaff-9e4258df52c5
  [root@10 ~]# swapon /dev/sdb1				# 挂载
  [root@10 ~]# free -h
               total       used       free     shared    buffers     cached
  Mem:          996M       279M       717M       184K        24M       112M
  -/+ buffers/cache:       142M       853M
  Swap:          10G         0B        10G	# 已经多了8G
  ```

  永久挂载只需要修改`/etc/fstab`

  ```bash
  UUID=86b5cdd1-de85-431c-a144-2d0eea95ebb6 swap                    swap    defaults        0 0
  ```

## 高级文件系统管理

### 磁盘配额

限制用户存储文件的数目与大小

- 磁盘配额的条件

  - 内核支持磁盘配额

    ```bash
    [root@10 ~]# grep CONFIG_QUOTA /boot/config-2.6.32-642.el6.x86_64 
    CONFIG_QUOTA=y							# 找到了这些项就正常
    CONFIG_QUOTA_NETLINK_INTERFACE=y
    # CONFIG_QUOTA_DEBUG is not set
    CONFIG_QUOTA_TREE=y
    CONFIG_QUOTACTL=y
    ```

  - 检查系统中安装了quota工具

    ```bash
    [root@10 ~]# rpm -qa | grep quota
    quota-3.17-23.el6.x86_64
    ```

- 概念

  - 用户配额和组配额

    组配额用的少，因为组内的配额不是平均分配的，可能一个用户直接写满了配额其他人不能写了

  - 磁盘容量与文件个数限制

    限制文件个数主要是为了防止inode写满

  - 软限制和硬限制

    用户在写入超过软限制后还可以继续写入，但是会被警告，超过硬限制则无法写入

  - 宽限时间

    如果用户处于软硬限制之间，系统会警告用户，如果超过宽限时间用户还是在超过软限制，软限制会升级为硬限制

- 磁盘配额是**普通用户**在使用**分区**的限制，超级用户可以无视

- 在分区中开启配额功能

  临时开启

  ```bash
  [root@10 ~]# mount -o remount,usrquota,grpquota /disk
  ```

  永久开启

  ```bash
  UUID=93aa9645-bdde-4a95-b9cb-29e536711869 /disk ext4 defaults,usrquota,grpquota 1 2
  ```

- 在分区中建立磁盘配额文件

  - 使用`quotacheck`命令
    - `-a` 扫描所有开启磁盘配额的分区
    - `-c` 不管是否有配置文件，出现扫描并建立新配置文件
    - `-u` 建立用户配额文件
    - `-g` 建立组配额文件
    - `-v` 显示扫描过程
    - `-m` 强制读写方式扫描
    - `-f` 强制扫描文件系统
    - 常用命令`quotacheck -avug`
    - 特别的，如果要给`/`开启配额，需要写`quotacheck -avugm`

    使用这个命令必须关闭SELinux

  - 关闭SELinux

  ```bash
  [root@10 ~]# getenforce 		# 查看当前状态
  Enforcing
  [root@10 ~]# setenforce 0		# 临时关闭
  [root@10 ~]# getenforce 		# 查看状态
  Permissive
  [root@10 ~]# vim /etc/selinux/config 	# 永久修改(要重启)
  SELINUX=enforcing -> disabled
  ```

  - 检查开启了磁盘配额

    ```bash
    [root@10 ~]# ll /disk/
    总用量 32
    -rw-------. 1 root root  6144 2月  18 11:17 aquota.group
    -rw-------. 1 root root  6144 2月  18 11:17 aquota.user
    drwx------. 2 root root 16384 2月  18 10:25 lost+found
    ```

    看到了aquota.user/group

- 设置用户和组的配额

  `edquota`命令

  - `-u` 设置用户配额
  - `-g` 设置组配额
  - `-t` 设置宽限时间
  - `-p` 复制配额方案

  例如

  ```bash
  [root@10 ~]# edquota -u user1
  Disk quotas for user user1 (uid 501):		# 为user1 UID=501 配置
    Filesystem                   blocks       soft       hard     inodes     soft     hard
    /dev/sdb1                         0          0          0          0        0        0
  # 分区			    用户已经占用block(KB) block软限制  硬限制   已用inode  软限制    硬限制
  [root@10 disk]# edquota -p user1 -u user2	# 复制配额
  [root@10 disk]# quota -uvs user2
  Disk quotas for user user2 (uid 502): 
       Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
        /dev/sdb1       0   40000   50000               0       8      11        
  [root@10 disk]# edquota -t					# 修改宽限时间
  Grace period before enforcing soft limits for users:
  Time units may be: days, hours, minutes, or seconds
    Filesystem             Block grace period     Inode grace period
    /dev/sdb1                     8days                  7days
  ```

- 启动和关闭配额

  - `quotaon`启动配额
    - `-a` 启动所有配额分区
    - `-u` 启动用户配额
    - `-g` 启动组配额
    - `-v` 显示过程
  - `quotaoff`关闭配额
    - `-a` 启动所有配额分区
    - `-u` 启动用户配额
    - `-g` 启动组配额

- 查询磁盘配额

  - `quota -uvs 用户名`查询用户配额(`-v`:详细信息，`-s`：人性化显示)
  - `quota -gvs 组名`查询组配额
  - `repquota -avus`查询分区配额

- 测试配额

  ```bash
  [user1@10 disk]$ dd if=/dev/zero of=test bs=1M count=60
  sdb1: warning, user block quota exceeded.
  sdb1: write failed, user block limit reached.
  dd: 正在写入"test": 超出磁盘限额
  记录了49+0 的读入
  记录了48+0 的写出
  51195904字节(51 MB)已复制，0.0318794 秒，1.6 GB/秒
  [user1@10 disk]$ touch 1
  [user1@10 disk]$ touch 2
  [user1@10 disk]$ touch 3
  [user1@10 disk]$ touch 4
  [user1@10 disk]$ touch 5
  [user1@10 disk]$ touch 6
  [user1@10 disk]$ touch 7
  [user1@10 disk]$ touch 8
  [user1@10 disk]$ touch 9
  sdb1: write failed, user file limit reached.
  touch: 无法创建"9": 超出磁盘限额
  ```

  dd解释：拷贝文件，来自`/dev/zero`到test,拷贝大小1M,拷贝60次

- `setqupta`命令可以以非交互的形式配置配额

### LVM逻辑卷管理

#### 基本原理

LVM是Logical Volume Manager的简称，就是逻辑卷管理，最大的特征是可以动态调整分区大小

LVM的概念 

- 物理卷PV：真正的无力硬盘或者分区
- 卷组VG：由多个PV合成的一个逻辑上的硬盘
- 逻辑卷LV：是将VG分区得到的，可以想象成将这个逻辑上的硬盘进行了分区
- 物理扩展PE：保存数据的最小单元，默认4M

LVM原理

- 将普通的分区变成PV
- 一个或者多个PV组成一个VG，相当于重组了一个新硬盘，VG可以随时增加PV扩展大小
- 在VG上划分新的LV,相当于在新硬盘上分区，此时的LV可以从VG上扩展分区

LVM，MBR，GPT，ext....的关系

- MBR，GPT是硬盘最基本的内容，是分区表的格式

- 在MBR...的基础上我们会进行分区，这个时候就会有诸如标准分区(sda1,sda2)或者swap分区，或者LVM分区的概念，几者同级(在fdisk 的l可以看到)，不论这个盘是GPT还是MBR都可以创建普通分区或者LVM分区，只不过是分区为MBR分区还是GPT分区

- 得到分区之后我们需要对分区写入文件系统，这个时候就会有ext4,vfat,iso9660,xfs......，对于标准分区我们会直接格式化对于LVM分区我们也要在LV上进行格式化

- 一张图解释

  ```mermaid
  graph LR
  HD(硬盘)
  MBRGPT(MBR/GPT)
  part(一个普通的分区)
  stand(标准分区)
  swap(swap分区)
  PVP1(LVM分区1)
  PVP2(LVM分区2)
  PVP3(LVM分区3)
  stus(可用的ext4标准分区)
  lv1us(可用的ext4LVM分区1)
  lv2us(可用的ext4LVM分区2)
  spus(可用的swap)
  	subgraph LVM
  	PV1(PV1)
  	PV2(PV2)
  	PV3(PV3)
  	VG(VG)
  	LV1(LV1)
  	LV2(LV2)
  	LVMORE(LV...)
  	end
  HD --指定 --> MBRGPT
  MBRGPT --划分出--> part
  part --默认是--> stand
  part --fdisk t --> swap
  part --fdisk t --> PVP1 --创建PV--> PV1
  part --fdisk t --> PVP2 --创建PV--> PV2
  part --fdisk t --> PVP3 --创建PV--> PV3
  PV1 ---> VG
  PV2 ---> VG
  PV3 ---> VG
  VG --分区--> LV1
  VG --分区--> LV2
  VG --分区--> LVMORE
  stand --mkfs ext4写入文件系统--> stus
  LV1 --mkfs ext4写入文件系统--> lv1us
  LV2 --mkfs ext4写入文件系统--> lv2us
  swap --mkswap写入文件系统--> spus
  HD -.逻辑同级.- VG
  swap -.逻辑同级.- LV1 -.逻辑同级.- LV2 -.逻辑同级.- LVMORE
  stand -.同级.- swap -.同级.- PVP1 -.同级.- PVP2 -.同级.- PVP3
  stus -.同级.- spus -.同级.- lv1us -.同级.- lv2us
  
  ```

  

#### 图形界面下分区

可以在CentOS 的安装界面下进行LVM分区，进入到手动分区界面

- 在sda下创建200M的标准分区给/boot(/boot不能用LVM)
- 选空闲，创建，LVM物理卷，这里相当于得到了一个PV，准备一个PV组一个VG，使用全部可用空间，至此得到了一个PV叫做sda2
- 选sda2，创建，LVM卷组，得到VG，此时这个VG是和sda同级的，相当于一个硬盘
- 选空闲，创建，LVM逻辑卷，选择VG，创建，选择文件系统和挂载点即可得到`/`,`/home/`,`swap`

进入系统，我们可以查看

```bash
[root@localhost ~]# fdisk -l

Disk /dev/sda: 21.5 GB, 21474836480 bytes
255 heads, 63 sectors/track, 2610 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x000798de

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           1          26      204800   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/sda2              26        2611    20765696   8e  Linux LVM

Disk /dev/mapper/VolGroup-LogVol01: 2147 MB, 2147483648 bytes
255 heads, 63 sectors/track, 261 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000


Disk /dev/mapper/VolGroup-LogVol00: 10.7 GB, 10737418240 bytes
255 heads, 63 sectors/track, 1305 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000


Disk /dev/mapper/VolGroup-LogVol02: 8376 MB, 8376025088 bytes
255 heads, 63 sectors/track, 1018 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000

[root@localhost ~]# mount
/dev/mapper/VolGroup-LogVol00 on / type ext4 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
tmpfs on /dev/shm type tmpfs (rw,rootcontext="system_u:object_r:tmpfs_t:s0")
/dev/sda1 on /boot type ext4 (rw)
/dev/mapper/VolGroup-LogVol02 on /home type ext4 (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
```

fdisk会方便列出LVM分区的详细信息，mount会直接说

```bash
/dev/mapper/VolGroup-LogVol00 on / type ext4 (rw)
/dev/sda1 on /boot type ext4 (rw)
/dev/mapper/VolGroup-LogVol02 on /home type ext4 (rw)
```

/boot挂载在了sda1上，其他两个直接挂载到了另一个硬件上，这个新硬盘就是我们的VG，当时没有重命名于是给的是默认命名，后面加上1-3就三个LV，可以 查证

```bash
[root@localhost ~]# ll /dev/mapper/
总用量 0
crw-rw----. 1 root root 10, 58 2月  19 01:50 control
lrwxrwxrwx. 1 root root      7 2月  19 01:50 VolGroup-LogVol00 -> ../dm-1
lrwxrwxrwx. 1 root root      7 2月  19 01:50 VolGroup-LogVol01 -> ../dm-0
lrwxrwxrwx. 1 root root      7 2月  19 01:50 VolGroup-LogVol02 -> ../dm-2
```

#### 使用fdisk分区

- 硬盘分区

```bash
[root@10 ~]# fdisk /dev/sdb 
Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 1
First cylinder (1-2610, default 1): 
Using default value 1
Last cylinder, +cylinders or +size{K,M,G} (1-2610, default 2610): +2G

Command (m for help): n        
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 2
First cylinder (263-2610, default 263): 
Using default value 263
Last cylinder, +cylinders or +size{K,M,G} (263-2610, default 2610): +2G

Command (m for help): n
Command action
   e   extended
   p   primary partition (1-4)
p
Partition number (1-4): 3
First cylinder (525-2610, default 525): 
Using default value 525
Last cylinder, +cylinders or +size{K,M,G} (525-2610, default 2610): +2G

Command (m for help): p					# 创建了三个标准分区

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1               1         262     2104483+  83  Linux
/dev/sdb2             263         524     2104515   83  Linux
/dev/sdb3             525         786     2104515   83  Linux

Command (m for help): t					# 修改分区类型
Partition number (1-4): 1
Hex code (type L to list codes): 8e		 # 8e是LVM
Changed system type of partition 1 to 8e (Linux LVM)

Command (m for help): t
Partition number (1-4): 2
Hex code (type L to list codes): 8e
Changed system type of partition 2 to 8e (Linux LVM)

Command (m for help): t
Partition number (1-4): 3
Hex code (type L to list codes): 8e
Changed system type of partition 3 to 8e (Linux LVM)

Command (m for help): p					# 打印可以看到Linux变为了Linux LVM

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1               1         262     2104483+  8e  Linux LVM
/dev/sdb2             263         524     2104515   8e  Linux LVM
/dev/sdb3             525         786     2104515   8e  Linux LVM

Command (m for help): w					# 写入
```

- 建立PV

  `pvcreat`可以建立pv，注意设备名

  ```bash
  [root@10 ~]# pvcreate /dev/sdb1
    Physical volume "/dev/sdb1" successfully created
  [root@10 ~]# pvcreate /dev/sdb2
    Physical volume "/dev/sdb2" successfully created
  [root@10 ~]# pvcreate /dev/sdb3
    Physical volume "/dev/sdb3" successfully created
  ```

- 查看PV

  可以使用`pvscan`,`pvdisplay`查看简略/详细的pv

  ```bash
  [root@10 ~]# pvscan
    PV /dev/sdb1   VG myvg1           lvm2 [2.00 GiB / 2.00 GiB free]
    PV /dev/sdb2   VG myvg1           lvm2 [2.00 GiB / 2.00 GiB free]
    PV /dev/sdb3                      lvm2 [2.01 GiB]
    Total: 3 [6.01 GiB] / in use: 2 [4.01 GiB] / in no VG: 1 [2.01 GiB]
  [root@10 ~]# pvdisplay 
    --- Physical volume ---
    PV Name               /dev/sdb1
    VG Name               myvg1
    PV Size               2.01 GiB / not usable 3.16 MiB
    Allocatable           yes 
    PE Size               4.00 MiB
    Total PE              513
    Free PE               513
    Allocated PE          0
    PV UUID               GdSlLe-Ihf5-JNcy-ODaq-Fy8y-VW8k-Ve7wnd
     
    --- Physical volume ---
    PV Name               /dev/sdb2
    VG Name               myvg1
    PV Size               2.01 GiB / not usable 3.19 MiB
    Allocatable           yes 
    PE Size               4.00 MiB
    Total PE              513
    Free PE               513
    Allocated PE          0
    PV UUID               G5oqcJ-RLNx-yHR2-CB3s-KfSn-ftIP-jI0CvH
     
    "/dev/sdb3" is a new physical volume of "2.01 GiB"
    --- NEW Physical volume ---
    PV Name               /dev/sdb3
    VG Name               
    PV Size               2.01 GiB
    Allocatable           NO
    PE Size               0   
    Total PE              0
    Free PE               0
    Allocated PE          0
    PV UUID               PqTUdA-2VYn-I3wE-rVBY-7Mja-e2GR-sPR3qz
  ```

- 建立VG

  `vgcreat VG名 PV设备们`

  - `-s` 指定PE大小，没人用

  ```bash
  [root@10 ~]# vgcreate myvg1 /dev/sdb1 /dev/sdb2		# 将两个PV加入VG
    Volume group "myvg1" successfully created
  ```

- 查看VG

  可以使用`vgscan`,`vgdisplay`查看简略/详细的vg

  ```bash
  [root@10 ~]# vgscan
    Reading all physical volumes.  This may take a while...
    Found volume group "myvg1" using metadata type lvm2
  [root@10 ~]# vgdisplay 
    --- Volume group ---
    VG Name               myvg1
    System ID             
    Format                lvm2
    Metadata Areas        2
    Metadata Sequence No  1
    VG Access             read/write
    VG Status             resizable
    MAX LV                0
    Cur LV                0
    Open LV               0
    Max PV                0
    Cur PV                2
    Act PV                2
    VG Size               4.01 GiB
    PE Size               4.00 MiB
    Total PE              1026
    Alloc PE / Size       0 / 0   
    Free  PE / Size       1026 / 4.01 GiB
    VG UUID               zn4VDW-Q5nz-ctFv-71E3-m3oo-OIy9-tyyyrE
  ```

- VG扩容

  `vgextend VG名 PV设备`可以扩容

  ```bash
  [root@10 ~]# vgextend myvg1 /dev/sdb3
    Volume group "myvg1" successfully extended
  ```

  扩容无需重挂载，可以在占用的时候扩容

- VG缩容

  禁止操作

- 建立LV

  `lvcreat 卷组名`可以建立LV

  - `-L 容量`：指定LV大小，单位有M**B**，G**B**，T**B**...，注意写GB而非G
  - `-l 个数`：指定LV大小，方式是有多少个PE，不好算，没人用
  - `-n [LVName]`：指定逻辑卷名

  ```bash
  [root@10 ~]# lvcreate -L 1GB -n mylv1 myvg1
    Logical volume "mylv1" created.
  [root@10 ~]# lvcreate -L 2GB -n mylv2 myvg1
    Logical volume "mylv2" created.
  [root@10 ~]# lvcreate -L 3GB -n mylv3 myvg1
    Logical volume "mylv3" created.
  ```

- 查看LV

  可以使用`lvscan`,`lvdisplay`查看简略/详细的lv

  ```bash
  [root@10 ~]# lvscan
    ACTIVE            '/dev/myvg1/mylv1' [1.00 GiB] inherit
    ACTIVE            '/dev/myvg1/mylv2' [2.00 GiB] inherit
    ACTIVE            '/dev/myvg1/mylv3' [3.00 GiB] inherit
  [root@10 ~]# lvdisplay 
    --- Logical volume ---
    LV Path                /dev/myvg1/mylv1
    LV Name                mylv1
    VG Name                myvg1
    LV UUID                DP4H2E-y372-VzQu-KSIE-35tR-ipJT-w5GEqT
    LV Write Access        read/write
    LV Creation host, time 10.0.2.15, 2021-02-19 02:23:04 +0800
    LV Status              available
    # open                 0
    LV Size                1.00 GiB
    Current LE             256
    Segments               1
    Allocation             inherit
    Read ahead sectors     auto
    - currently set to     256
    Block device           253:0
     
    --- Logical volume ---
    LV Path                /dev/myvg1/mylv2
    LV Name                mylv2
    VG Name                myvg1
    LV UUID                khVCFL-addO-mnzy-6CwG-TtKd-T8Nh-kJGdAC
    LV Write Access        read/write
    LV Creation host, time 10.0.2.15, 2021-02-19 02:23:16 +0800
    LV Status              available
    # open                 0
    LV Size                2.00 GiB
    Current LE             512
    Segments               1
    Allocation             inherit
    Read ahead sectors     auto
    - currently set to     256
    Block device           253:1
     
    --- Logical volume ---
    LV Path                /dev/myvg1/mylv3
    LV Name                mylv3
    VG Name                myvg1
    LV UUID                ypbyjM-ClmO-6fzL-oa7e-kREr-qxES-mPQe1N
    LV Write Access        read/write
    LV Creation host, time 10.0.2.15, 2021-02-19 02:23:21 +0800
    LV Status              available
    # open                 0
    LV Size                3.00 GiB
    Current LE             768
    Segments               2
    Allocation             inherit
    Read ahead sectors     auto
    - currently set to     256
    Block device           253:2
  ```

- 格式化LV

  ```bash
  [root@10 ~]# mkfs -t ext4 /dev/myvg1/mylv1
  [root@10 ~]# mkfs -t ext4 /dev/myvg1/mylv2
  [root@10 ~]# mkfs -t ext4 /dev/myvg1/mylv3
  ```

  注意新分区的位置在`dev/[vgname]/[lvname]`，这里的`mylv1`，`mylv2`，`mylv3`只不过是因为当时恰好这么起名的，不必后面是1,2,3

- LV扩容

  `lvresize LV设备名`调整大小

  - `-L 容量`：修改大小，可以接+2GB,-1GB调整增量，也可以直接5GB调整到5GB，单位有M**B**，G**B**，T**B**...，注意写GB而非G
  - `-l 个数`：修改大小，加上调整后的PE数

  `resize2fs LV设备名`刷新大小

  扩容无需卸载，可以在占用的时候扩容

- 挂载

  略

## Shell基础

Shell编程的目的是方便运维人员的工作，为了**自己使用**，对**效率要求不高**，**思路简单**，代码长，不像其他编程语言追求精简的代码，复杂的思路

 ### Shell概述

- Shell是一个命令解释器，将命令翻译成机器可以看懂的二进制指令
- Linux使用的Shell名字叫做Bash，可以在`/etc/shell`查询Linux支持的shell

### Shell的执行方式

- `echo`命令

  输出指定内容

  - 对于没有空格的文本可以直接写

  - 有空格的需要在文本两边加上""

  - `-n`输出后不换行，例如

    ```bash
    [root@10 ~]# echo 123
    123
    [root@10 ~]# echo -n 123
    123[root@10 ~]# 
    ```

  - `-e`支持输出转义字符

  - `echo -e "\e[1;XXmabcd\e[0m"`彩色输出abcd，其中`\e[1;XXm`和`\e[0m`相当于左右括号前后无需空格，XX内填写的数字表示颜色，第一位3表示修改字体颜色，4代表背景色，第二位0黑，1红，2绿，3黄，4蓝，5洋红，6青色，7白色

  - shell想要输出`!`必须写成`!空格`否则报错，显示的时候也会显示空格

- shell脚本最好以.sh结尾
- 第一句必须是`#!/bin/bash`这个不是注释，叫做bashbang，在多语言的脚本中没他跑不起来
- 执行
  - 直接文件名可以执行，但是要赋予执行权限
  - `bash 文件名`可以执行，不需要x权限，但是没人用...

### Shell的基本功能

- 查看历史命令

  - 可以使用上箭头显示历史命令/`history`查询历史命令

  - 系统会将历史命令记录在`~/.bash_history`下，history就是输出的这个文件

  - `~/.bash_history`文件只有在系统关机的时候才会写入，也就是说不会显示本次登陆后写的命令，可以使用`history -w`立刻写入本次登录后的历史命令

  - 在`/etc/profile`修改历史命令记录条数`HISTSIZE=1000`

  - 可以使用`history -c`清除本次登录后和`~/.bash_history`的历史记录，上箭头也失效，一般用于输入明文密码后

  - 可以在`history`之后使用`!数字`执行history显示的第某编号条命令

  - `!!`执行上一条命令

  - `!XXX`执行以XXX开头的最后一条命令

  - `!$`可以被替换为上一个命令的最后一个参数，例如

    ```bash
    [root@10 ~]# touch aaa
    [root@10 ~]# ls
    aaa  anaconda-ks.cfg  install.log  install.log.syslog
    [root@10 ~]# rm -rf aaa
    [root@10 ~]# touch !$
    touch aaa
    [root@10 ~]# ls
    aaa  anaconda-ks.cfg  install.log  install.log.syslog
    ```

- Tab补全

- 别名
  - 使用`alias 新命令="原来命令"`临时生效，注意前面没有""，后面有""
  - 在`~/.bashrc`中直接写下临时命令即可永久生效，重启或者`source ~/.bashrc`即可启用
  - Bash中命令的执行优先级
    - 绝对路径
    - 别名
    - Bash命令
    - 在PATH环境变量中找到的**第一个**命令

- `.`

  - `.`相当于source的别名，但是别名里面查询不到
  - `./`是当前目录
  - `.XXX`是隐藏文件

- 常见快捷键

  - `Ctrl+A`光标移动到开头
  - `Ctrl+E`光标移动到末尾
  - `Ctrl+C`终止
  - `Ctrl+L`清屏
  - `Ctrl+U`剪切光标之前的内容
  - `Ctrl+K`剪切光标之后的命令
  - `Ctrl+Y`粘贴剪切的内容
  - `Ctrl+R`在历史命令中搜索

  - `Ctrl+D`退出终端

  - `Ctrl+Z`将程序暂停然后存入后台(注意不要当成`Ctrl+C`用)
  - `Ctrl+S`暂停屏幕输出
  - `Ctrl+Q`恢复屏幕输出

- IO重定向

  - Bash下的标准IO有

    | 设备   | 文件名      | 文件描述符 | 类型         |
    | ------ | ----------- | ---------- | ------------ |
    | 键盘   | /dev/stdin  | 0          | 标准输入     |
    | 显示器 | /dev/stdout | 1          | 标准输出     |
    | 显示器 | /dev/stderr | 2          | 标准错误输出 |

  - 输出重定向

    命令的输出本来应该输出到标准输出，但是我们改变了输出的方向，输出到了文件

    - 标准输出的重定向

      可以将命令的正确输出输出到指定的文件，方式是`命令 > 文件`，或者`命令 >> 文件`，区别是，前者是覆盖文件内容，后者是追加

    - 标准错误输出重定向

      可以将命令的报错信息重定向到文件，但是正确的输出不会重定向，方法是`错误命令 2> 文件`或者`错误命令 2>> 文件`

    - 同时输出正确与错误的输出

      - `命令 >> 文件1 2>> 文件2`1,2分别存放正确和错误输出
      - `命令 &>> 文件`或者`命令 >> 文件 2>&1`两者全部追加
      - `命令 &> 文件`或者`命令 > 文件 2>&1`两者全部覆盖

  - 输入重定向

    改变输入方式，变为从文件输入

    - `<`是直接文件输入，例如`patch -p3 < txt.patch `

    - `<<`是输入部分内容，当出现与开头相同的内容的时候将中间的内容输入，例如

      ```bash
      [root@10 ~]# cat << Imhead
      > as
      > sd
      > df
      > Imhead
      as
      sd
      df
      ```

- 多命令顺序执行

  可以在一行下写下多个命令，让这些命令顺序执行，同时这几条命令不像管道一样结果传递，命令之间完全平行，中间可以使用不同的符号隔开

  - `;`：命令之间完全无关，一条执行完一条执行，不论前一条是否报错
  - `&&`：只有前一条命令正确才执行后一条
  - `||`：只有前一条错误才执行后一条

  可以理解成C++中的`;`,`&&`,`||`，且存在短路操作

- 管道符

- 同配符

- Bash中的特殊符号
    - `''`：单引号表示其中的特殊内容没有特殊含义，例如‘$name’就表示字符串而不是变量值 
  - `""`：双引号表示其中的特殊内容没有特殊含义，"$","`","\"除外        
  - <code>``</code>：用来**引用系统命令的结果**，括起来的内容是系统命令，Bash会优先执行，与$()一样，但是不推荐，容易看成‘ 
  - `$()`：用来**引用系统命令的结果**，括起来的内容是系统命令，Bash会优先执行，例如`s=$(date)`得到的s就是当前时间的字符串 
  - `()`：括起来的是系统命令，会在**子shell**中执行括起来的命令，命令必须以;结尾，最后一个可以不加
  - `{}`：括起来的是系统命令，会在**父shell**中执行括起来的命令，命令必须以;结尾                                                             
  - `[]`：用于变量测试
  - `#`：注释                                      
  - `$`：调用变量的时候需要，例如$name相当于是name变量，但是name相当于是字符串，在定义的时候不需要$,直接name=1即可 
  - `\`：转义符                                                           

- 父Shell与子Shell

  我们在开一个Shell之后还可以在他的内部再开一个Shell,例如：

  ```bash
  [root@10 ~]# pstree									
  init─┬─省略一些进程
       ├─省略一些进程
       ├─sshd───sshd───bash───pstree
       └─省略一些进程
  [root@10 ~]# bash
  [root@10 ~]# pstree
  init─┬─省略一些进程
       ├─省略一些进程...
       ├─sshd───sshd───bash───bash───pstree
       └─省略一些进程
  ```

  最开始使用pstree查看进程树看到有一个bash下开了一个pstree，在我们输入bash后查进程树看到一个bash下开了一个bash下有个pstree，相当于我们处于资格bash下的bash，这个bash就是原bash的子bash，在这个Bash下原Bash的变量等等都是隔离的，例如

  ```bash
  [root@10 ~]# a=1
  [root@10 ~]# (a=2;echo $a;)
  2
  [root@10 ~]# echo $a
  1
  ```

  这个和C++的变量保护一样，子有用子，子无用父

### Shell的变量和运算符

#### 变量

- 变量规则
  - 命名规则于从C++ 相同 
  - 弱类型，但是特殊规定，默认是字符串型，**如果要进行数值运算必须指定为数值类型**
  - 变量赋值的时候`=`两边左右不得加空格
  - 变量允许叠加，例如

      ```bash
      [root@10 ~]# test=123
      [root@10 ~]# test="$test"456
      [root@10 ~]# echo $test
      123456
      ```
  - 环境变量建议全大写

- 变量分类

  Shell只有字符串和数值类型，这里是按照操作环境分类

  - 用户自定义变量：由用户自定义的
  - 环境变量：保存于系统相关的数据，例如`/etc/profile`的HISTSIZE，可以分成两种，系统自带的环境变量，名字，作用是确定的，值可以自定义，例如分辨率。用户自定义的环境变量最大的作用就是可以跨Shell调用，全局生效。建议将环境变量全大写方便区分
  - 位置参数变量：向脚本传递参数
  - 预定义变量：Bash中定义好的变量

- 用户自定义变量

  - 定义：`name=123`

  - 调用：`echo $name`(echo一个不存在的变量结果是空)

  - 查看所有变量：`set [选项] 后面没有操作对象`

    - `-u` 调用未声明的变量会报错(正常情况为空)
    - `-x` 在执行命令之前会重新输出命令
    - `空` 显示所有变量                            

    ```bash
    [root@10 ~]# a=1					# 在Bash中我只定义了a不定义b
    [root@10 ~]# echo $a				# 正确输出a
    1
    [root@10 ~]# echo $b				# 未知内容和空内容输出相同
    
    [root@10 ~]# echo ""
    
    [root@10 ~]# c="$a"0				# 正常拼接
    [root@10 ~]# echo $c
    10
    [root@10 ~]# c="$b"0				# 未知变量拼接不报错，只不过只有0
    [root@10 ~]# echo $c
    0
    [root@10 ~]# set -u					# 开启-u
    [root@10 ~]# echo $a				# 已经定义的正常
    1
    [root@10 ~]# echo $b				# 未定义的报错
    -bash: b: unbound variable
    [root@10 ~]# c="$a"0				# 已定义的正常
    [root@10 ~]# echo $c
    10
    [root@10 ~]# c="$b"0				# 未定义的报错
    -bash: b: unbound variable
    [root@10 ~]# echo $c				# 还是报错前的状态
    10
    [root@10 ~]# set -x					# 开启-x
    ++ printf '\033]0;%s@%s:%s\007' root 10 '~'
    [root@10 ~]# echo hello
    + echo hello
    hello
    ++ printf '\033]0;%s@%s:%s\007' root 10 '~'
    ```

  - 删除变量

    `unset 变量`不需要加`$`

- 环境变量

  用户可以自定义环境变量，于用户自定义变量不同的是环境变量可以在子shell生效，全局生效

  - 声明：`export name=18`，或者`export name`将已经定义的用户自定义变量提升为环境变量

  - 查询所有环境变量：

    `set`可以看到部分环境变量和用户自定义变量，`env`可以看到部分环境变量，但是都不全，有重叠

  - 删除自定义变量`unset 变量`

  - 重要的系统自带环境变量

    - `$PATH`：用:分割开的路径，是系统查找命令的路径

      我们通过实现“不写路径执行shell”实验证明

      ```bash
      [root@10 ~]# echo $PATH					# 先查询一下PATH
      /usr/lib64/qt-3.3/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
      [root@10 ~]# echo "echo Success" >> ./pathTest.sh	# 随便放个sh
      [root@10 ~]# chmod 777 pathTest.sh 					# 改为可执行
      [root@10 ~]# pathTest.sh							# 试着运行
      -bash: pathTest.sh: command not found
      [root@10 ~]# cp pathTest.sh /bin/					# 放到$PATH的一个路径下
      [root@10 ~]# pathTest.sh							# 试着运行通过
      Success
      [root@10 ~]# rm -rf /bin/pathTest.sh 				# 删除
      [root@10 ~]# pathTest.sh							# 试着运行
      -bash: /bin/pathTest.sh: 没有那个文件或目录
      [root@10 ~]# PATH="$PATH":/root						# 将当前目录加入$PATH
      [root@10 ~]# echo $PATH								# 临时更新成功
      /usr/lib64/qt-3.3/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin:/root
      [root@10 ~]# pathTest.sh							# 试着运行通过
      Success
      
      ```

    - `$PS1`：命令提示符格式

      ```bash
      [root@10 ~]# echo $PS1
      [\u@\h \W]\$
      ```

      其中
      - `\d` ：代表日期，格式为weekday month date，例如："Mon Aug 1" 
      - `\H` ：完整的主机名称。例如：我的机器名称为：fc4.linux，则这个名称就是fc4.linux 
      - `\h` ：仅取主机的第一个名字，如上例，则为fc4，.linux则被省略 
      - `\t` ：显示时间为24小时格式，如：HH：MM：SS 
      - `\T` ：显示时间为12小时格式 
      - `\A` ：显示时间为24小时格式：HH：MM 
      - `\u` ：当前用户的账号名称 
      - `\v` ：BASH的版本信息 
      - `\w` ：完整的工作目录名称。家目录会以 ~代替 
      - `\W` ：利用basename取得工作目录名称，所以只会列出最后一个目录 
      - `\#` ：下达的第几个命令 
      - `\$` ：提示字符，如果是root时，提示符为：# ，普通用户则为：$
      
    - `$LANG`：当前终端上的Linux语系
  
- 位置参数变量

  - `$n`：n是数字，$0是命令本身，$1-9是命令的第1-9个参数，10+要用大括号括起来，例如${22}，这个东西是用在脚本里面的，例如我写一个实现加法功能的脚本plus.sh

    ```bash
    #!/bin/bash
    a=$1			# 将第一个参数赋值到a
    b=$2			# 将第二个参数赋值到b
    echo $(($a+$b))	# 输出a+b 这里要将需要进行数值运算的内容方放入$(())否则会得到字符串拼接的结果
    ```

    执行脚本

    ```bash
    [root@10 ~]# chmod 777 plus.sh 
    [root@10 ~]# ./plus.sh 5 6
    11
    ```

    在Bash中传参的方式有很多，尤其是需要交互的，还有其他方式

  - `$#`参数个数

  - `$*`将参数整体作为一个字符串

  - `$@`将参数分割开传入，相当于`$*`传入了一个python的string，`$@`相当于传入了python的list

    可以验证，写下pro.sh

    ```bash
    #!/bin/bash
    
    echo "\$# is $#"
    echo "\$@ is $@"
    echo "\$* is $*"
    
    echo -e "iterator \$@\n=========="
    for i in "$@"		# for的语法与py类似
            do			# 相当于C的大括号
                    echo $i
            done		# 相当于C的大括号
    
    echo -e "iterator \$*\n=========="
    for j in "$*"							
    # 这里比较奇怪的是如果将$*先赋值后用赋值者迭代会出现$@效果，原因可能是在这里$*被认为是一个字符串了，但是替换后，由于原来就有空格，而Bash只有字符串和数字类型就被直接转化成有空格的字符串，也就是这里语法中的一列东西了
            do
                    echo $j
            done
    ```

    执行

    ```bash
    [root@10 ~]# chmod 777 ./pro.sh
    [root@10 ~]# ./pro.sh aaa bbb ccc ddd eee
    $# is 5
    $@ is aaa bbb ccc ddd eee
    $* is aaa bbb ccc ddd eee
    iterator $@
    ==========
    aaa
    bbb
    ccc
    ddd
    eee
    iterator $*
    ==========
    aaa bbb ccc ddd eee
    ```

- 预定义变量

  - `$?`：上一条命令的返回状态，0是正确执行，非0是错误，例如

    ```bash
    [root@10 ~]# echo 123
    123
    [root@10 ~]# echo $?
    0
    [root@10 ~]# das
    -bash: das: command not found
    [root@10 ~]# echo $?
    127
    ```

  - `$$`当前PID

  - `$!`后台最后一个进程的PID

- 使用`read`接受键盘输入

  read可以以交互的方式输入，`read [选项] 不加$的变量`

  - `-t 秒数` ：超时时间
  - `-p 字符串`：提示信息
  - `-n 字数`：允许输入的字数
  - `-s`：像输入密码一样，不显示内容

  重新实现加法器

  ```bash
  #!/bin/bash
  
  read -t 30 -p "input number 1: " a
  read -t 30 -p "input number 2: " b
  
  echo $(($a+$b))
  ```

  执行

  ```bash
  [root@10 ~]# ./plus.sh 
  input number 1: 222
  input number 2: 333
  555
  ```

- 使用`declear`声明变量类型

  `declear [+/-][选项] 变量名`

  - `+`是去掉某类型，`-`是加上某类型
  - `-a`声明成数组型
  - `-i`声明成整数
  - `-r`声明成常量，变成常量后不可通过`+r`改回，但是只读属性重启自动消失
  - `-x`声明成环境变量
  - `-p`输出变量类型

- 数组

  直接赋值，不要声明，支持跨下标存储，例如

  ```bash
  [root@10 ~]# arr[0]=H
  [root@10 ~]# arr[2]=J
  [root@10 ~]# arr[4]=P
  [root@10 ~]# echo ${arr[2]}		# 引用的时候要括起来否则相当于是$arr和[2]
  J
  [root@10 ~]# echo ${arr[*]}		# 输出数组全部内容
  H J P
  [root@10 ~]# echo $arr			# 只写名字会输出[0]
  H
  ```


#### 运算符

- 数值运算的方法

  - `declear`方法

    ```bash
    [root@10 ~]# a=1
    [root@10 ~]# b=2
    [root@10 ~]# declare -i c=$a+$b
    [root@10 ~]# echo $c
    3
    ```

  - `expr`方法

    ```bash
    [root@10 ~]# expr $a + $b
    3
    ```

    如果需要赋值只需要`$(expr $a + $b)`注意expr的运算符两边**必须加空格**

  - `let`方法

    ```bash
    ll_form=>inputoutput: 打开注册页面，阅读[root@10 ~]# let d=$a+$b
    [root@10 ~]# echo $d
    3
    [root@10 ~]# echo $(let $a+$b)
    
    ```

    这个不支持直接输出结果

  - `$((表达式))`或者`$[表达式]`方法

    ```bash
    [root@10 ~]# echo $(($a+$b))
    3
    ```

    强烈建议用`$((表达式))`，不推荐其他，不推荐`$[]`

- 变量测试与内容置换

  | 变量置换方式 | 变量y没有设置                  | 变量y为空值            | 变量y设置值 |
| ------------ | ------------------------------ | ---------------------- | ----------- |
  | x=${y-新值}  | x= 新值                        | x 为空                 | x=$y        |
  | x=${y:-新值} | x= 新值                        | x= 新值                | x=$y        |
  | x=${y+新值}  | x 为空                         | x= 新值                | x=新值      |
  | x=${y:+新值} | x 为空                         | x 为空                 | x=新值      |
  | x=${y=新值}  | x= 新值                        | x 为空                 | x=$y        |
  | y= 新值      | y 值不变                       | y值不变                |             |
  | x=${y:=新值} | x= 新值                        | X= 新值                | x=$y        |
  | y= 新值      | y= 新值                        | y值不变                |             |
  | x=${y?新值}  | 新值输出到标准错误输出（屏幕） | x 为空                 | x=$y        |
  | x=${y:?新值} | 新值输出到标准错误输出         | 新值输出到标准错误输出 | x=$y        |
  
  这个就是一套语法，一般只有第一个比较常用，用来检测y是不是空，其他的不强制要求记忆(毕竟shell为了方便自己而不是效率)

### 环境变量配置文件

- `source`命令

  `source 配置文件`/`. 配置文件`使配置文件生效

- 常见环境变量配置文件

  - 在登录时候生效的(正常或非正常登录都算)

    - `/etc/profile`
    - `/etc/profile.d/*.sh`
    - `~/.bash_profile`
    - `~/.bashrc`
    - `/etc/bashrc`

    在家目录下的只对当前用户生效

    调用顺序

    ```mermaid
    graph TB
    登录{登录} --读取--> etcprofile(/etc/profile) --里面的脚本调用1--> etcpd(/etc/profile.d/*.sh) --主要是--> etclang(/etc/profile.d/lang.sh) --脚本调用--> etci18n(/etc/sysc.config/i18n) --return0--> etcprofile
    etcprofile(/etc/profile) --里面的脚本调用2--> hpeo($home/.bash_peofile) --里面的脚本调用--> hbrc($HOME/.bashrc) --里面的脚本调用--> ebrc(/etc/bashrc) --里面的脚本调用--> 进入Bash
    非登录{非登录} -.读取.-> ebrc -.里面的脚本调用1.-> etcpd -.主要是.-> etclang -.脚本调用.-> etci18n -.return0.-> ebrc
    ebrc -.里面的脚本调用2.-> 进入Bash
    ```
    - 登录与非登录的区别

      登录指的是输入密码后登录，例如ssh远程到计算机，非登录指的是不需要输入密码的登录，例如在root下`su 其他用户`，在一个Bash里面输入Bash，可以进入子shell,这个时候环境变量生效顺序与父shell的不一样

    - 用户登录后的调用顺序

      1. `/etc/profile`

         ```bash
         pathmunge () {					# 定义了一个函数，后面加载，是用来定义PATH的
             case ":${PATH}:" in
                 *:"$1":*)
                     ;;
                 *)
                     if [ "$2" = "after" ] ; then
                         PATH=$PATH:$1
                     else
                         PATH=$1:$PATH
                     fi
             esac
         }
         if [ -x /usr/bin/id ]; then		# 定义用户相关
             if [ -z "$EUID" ]; then
                         EUID=`id -u`
                 UID=`id -ru`
             fi
             USER="`id -un`"					# 定义USER=当前用户
             LOGNAME=$USER					# 定义LOGNAME=USER
             MAIL="/var/spool/mail/$USER"	# 定义邮箱地址
         fi
         if [ "$EUID" = "0" ]; then			# 如果EUID是0(root)定义PATH(这个文件只加载一部分)
             pathmunge /sbin
             pathmunge /usr/sbin
             pathmunge /usr/local/sbin
         else
             pathmunge /usr/local/sbin after
             pathmunge /usr/sbin after
             pathmunge /sbin after
         fi
         HOSTNAME=`/bin/hostname 2>/dev/null`	# 主机名
         HISTSIZE=10000							# 历史命令条数
         if [ "$HISTCONTROL" = "ignorespace" ] ; then
             export HISTCONTROL=ignoreboth
         else
             export HISTCONTROL=ignoredups
         fi
         export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL
         # 根据ID给umask权限
         if [ $UID -gt 199 ] && [ "`id -gn`" = "`id -un`" ]; then
             umask 002
         else
             umask 022
         fi
         for i in /etc/profile.d/*.sh ; do		# 这里要加载/etc/profile.d/*.sh
             if [ -r "$i" ]; then
                 if [ "${-#*i}" != "$-" ]; then
                     . "$i"
                 else
                     . "$i" >/dev/null 2>&1
                 fi
             fi
         done
         unset i
         unset -f pathmunge
         ```

      2. `/etc/profild.d/*.sh`

         ```bash
         [root@10 ~]# ll /etc/profile.d/*.sh
         -rw-r--r--. 1 root root 1179 4月  12 2016 /etc/profile.d/colorls.sh
         -rw-r--r--. 1 root root   78 11月 22 2013 /etc/profile.d/cvs.sh
         -rw-r--r--. 1 root root  192 1月  21 2016 /etc/profile.d/glib2.sh
         -rw-r--r--. 1 root root 2706 5月  12 2016 /etc/profile.d/lang.sh
         -rw-r--r--. 1 root root  121 6月   4 2014 /etc/profile.d/less.sh
         -rw-r--r--. 1 root root  912 9月  24 2011 /etc/profile.d/qt.sh
         -rw-r--r--. 1 root root  269 7月  24 2015 /etc/profile.d/vim.sh
         -rw-r--r--. 1 root root  169 5月  20 2009 /etc/profile.d/which2.sh
         ```

         很多，但是很多都是三方的，真正有用的是`lang.sh`

      3. `/etc/profile.d/lang.sh`

         ```bash
         # /etc/profile.d/lang.sh - set i18n stuff
         
         sourced=0
         
         if [ -n "$LANG" ]; then
             saved_lang="$LANG"
             [ -f "$HOME/.i18n" ] && . "$HOME/.i18n" && sourced=1
             LANG="$saved_lang"
             unset saved_lang
         else
             for langfile in /etc/sysconfig/i18n "$HOME/.i18n" ; do
             # 主要就是调用了这个 /etc/sysconfig/i18n
                 [ -f $langfile ] && . $langfile && sourced=1
             done
         fi
         
         if [ "$sourced" = 1 ]; then
             [ -n "$LANG" ] && export LANG || unset LANG
             [ -n "$LC_ADDRESS" ] && export LC_ADDRESS || unset LC_ADDRESS
             [ -n "$LC_CTYPE" ] && export LC_CTYPE || unset LC_CTYPE
             [ -n "$LC_COLLATE" ] && export LC_COLLATE || unset LC_COLLATE
             [ -n "$LC_IDENTIFICATION" ] && export LC_IDENTIFICATION || unset LC_IDENTIFICATION
             [ -n "$LC_MEASUREMENT" ] && export LC_MEASUREMENT || unset LC_MEASUREMENT
             [ -n "$LC_MESSAGES" ] && export LC_MESSAGES || unset LC_MESSAGES
             [ -n "$LC_MONETARY" ] && export LC_MONETARY || unset LC_MONETARY
             [ -n "$LC_NAME" ] && export LC_NAME || unset LC_NAME
             [ -n "$LC_NUMERIC" ] && export LC_NUMERIC || unset LC_NUMERIC
             [ -n "$LC_PAPER" ] && export LC_PAPER || unset LC_PAPER
             [ -n "$LC_TELEPHONE" ] && export LC_TELEPHONE || unset LC_TELEPHONE
             [ -n "$LC_TIME" ] && export LC_TIME || unset LC_TIME
             if [ -n "$LC_ALL" ]; then
                if [ "$LC_ALL" != "$LANG" ]; then
                  export LC_ALL
                else
                  unset LC_ALL
                fi
             else
                unset LC_ALL
             fi
             [ -n "$LANGUAGE" ] && export LANGUAGE || unset LANGUAGE
             [ -n "$LINGUAS" ] && export LINGUAS || unset LINGUAS
             [ -n "$_XKB_CHARSET" ] && export _XKB_CHARSET || unset _XKB_CHARSET
             
             consoletype=$CONSOLETYPE
             if [ -z "$consoletype" ]; then
               consoletype=$(/sbin/consoletype stdout)
             fi
         
             if [ -n "$LANG" ]; then
               case $LANG in
             	*.utf8*|*.UTF-8*)
             	if [ "$TERM" = "linux" ]; then
             	    if [ "$consoletype" = "vt" ]; then
             	    	case $LANG in 
             	    		ja*) LANG=en_US.UTF-8 ;;
             	    		ko*) LANG=en_US.UTF-8 ;;
         			si*) LANG=en_US.UTF-8 ;;
             	    		zh*) LANG=en_US.UTF-8 ;;
             	    		ar*) LANG=en_US.UTF-8 ;;
             	    		fa*) LANG=en_US.UTF-8 ;;
             	    		he*) LANG=en_US.UTF-8 ;;
             	    		en_IN*) ;;
             	    		*_IN*) LANG=en_US.UTF-8 ;;
             	    	esac
                     fi
                 fi
         	;;
         	*)
         	if [ "$TERM" = "linux" ]; then
         	    if [ "$consoletype" = "vt" ]; then
             	    	case $LANG in 
             	    		ja*) LANG=en_US ;;
             	    		ko*) LANG=en_US ;;
         			si*) LANG=en_US ;;
             	    		zh*) LANG=en_US ;;
             	    		ar*) LANG=en_US ;;
             	    		fa*) LANG=en_US ;;
             	    		he*) LANG=en_US ;;
             	    		en_IN*) ;;
             	    		*_IN*) LANG=en_US ;;
             	    	esac
         	    fi
         	fi
         	;;
               esac
             fi
         
             unset SYSFONTACM SYSFONT consoletype
         fi
         unset sourced
         unset langfile
         ```

      4. `/etc/sysconfig/i18n`

         ```bash
         LANG="zh_CN.UTF-8"
         ```

         保存的是当前的默认语言

      5. `~/.bashrc`

         ```bash
         # .bash_profile
         if [ -f ~/.bashrc ]; then		# 如果~/.bashrc存在就调用
         	. ~/.bashrc
         fi
         PATH=$PATH:$HOME/bin			# 加上环境变量
         export PATH
         ```

      6. `~/.bashrc`

         这里一般用来放用户自定义的别名和函数

         ```bash
         if [ -f /etc/bashrc ]; then		# 如果~/.bashrc存在就调用
         	. /etc/bashrc
         fi
         ```

      7. `/etc/bashrc`

         ```bash
         # /etc/bashrc
         # 定义了PS1
         if [ "$PS1" ]; then
           if [ -z "$PROMPT_COMMAND" ]; then
             case $TERM in
             xterm*)
                 if [ -e /etc/sysconfig/bash-prompt-xterm ]; then
                     PROMPT_COMMAND=/etc/sysconfig/bash-prompt-xterm
                 else
                     PROMPT_COMMAND='printf "\033]0;%s@%s:%s\007" "${USER}" "${HOSTNAME%%.*}" "${PWD/#$HOME/~}"'
                 fi
                 ;;
             screen)
                 if [ -e /etc/sysconfig/bash-prompt-screen ]; then
                     PROMPT_COMMAND=/etc/sysconfig/bash-prompt-screen
                 else
                     PROMPT_COMMAND='printf "\033]0;%s@%s:%s\033\\" "${USER}" "${HOSTNAME%%.*}" "${PWD/#$HOME/~}"'
                 fi
                 ;;
             *)
                 [ -e /etc/sysconfig/bash-prompt-default ] && PROMPT_COMMAND=/etc/sysconfig/bash-prompt-default
                 ;;
               esac
           fi
           shopt -s checkwinsize
           [ "$PS1" = "\\s-\\v\\\$ " ] && PS1="[\u@\h \W]\\$ "
         fi
         
         # 非登录执行的，见/etc/profile
         if ! shopt -q login_shell ; then
             pathmunge () {
                 case ":${PATH}:" in
                     *:"$1":*)
                         ;;
                     *)
                         if [ "$2" = "after" ] ; then
                             PATH=$PATH:$1
                         else
                             PATH=$1:$PATH
                         fi
                 esac
             }
             if [ $UID -gt 199 ] && [ "`id -gn`" = "`id -un`" ]; then
                umask 002
             else
                umask 022
             fi
             for i in /etc/profile.d/*.sh; do			# 调用/etc/profile.d/*.sh
                 if [ -r "$i" ]; then
                     if [ "$PS1" ]; then
                         . "$i"
                     else
                         . "$i" >/dev/null 2>&1
                     fi
                 fi
             done
             unset i
             unset pathmunge
         fi
         ```

    - 非登录的调用顺序

      略，从`/etc/bashrc`开始

  - 注销时生效的环境变量配置文件

    退出的时候只生效`~/.bash_logout`，这个文件只有在用户执行logout推出的时候生效，shutdown...不生效，文件内部默认没有内容，可以按需写一些

- Shell登录信息

  - `/etc/issue`在登录tty的时候显示欢迎信息，注意：**是tty，只有本地登录才有效！**

    ```bash
    CentOS release 6.8 (Final)
    Kernel \r on an \m
    ```

    转义符的意义
    - `/l`： 显示第几个终端机接口
    - `/m`： 显示硬件的等级（i386/i686...）
    - `/n`： 显示主机的网络名称
    - `/o`： 显示 domain name
    - `/r`： 显示操作系统的版本
    - `/t`： 显示本地端时间的时间
    - `/s`： 显示操作系统的名称
    - `/v`： 显示操作系统的版本
    
    一般就是加个`/l`显示tty几
    
  - `/etc/issue.net` 用于显示远程登录的欢迎信息，`\d`,`\l`转义符不支持，这个文件只是显示的内容，至于是否显示需要显示需要修改`/etc/ssh/sshd_config `，`#Banner none`改成`Banner etc/issue.net`
  
  - `/etc/motd`不论是远程还是本地登录都会显示欢迎信息，区别是这个是在登录后的显示内容，前面的是登录前显示的

- `stty -a`命令：显示所有快捷键

  `stty intr ^p`将ctrl+p快捷键作为intr

## Shell编程

### 正则表达式

- 基础正则：略，见[前端](http://www.liukairui.cc/%E5%B0%9A%E7%A1%85%E8%B0%B7JavaScript%E5%9F%BA%E7%A1%80%E7%89%88%E7%AC%94%E8%AE%B0/#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
- 正则：`grep "模式串" 匹配串/文件``
  - `-v`取反
  - `-E`扩展正则，支持更多符号，同时不需要要将`()`转义为`\(\)`了

### 字符截取和替换

- `cut`**列提取**

  `cut [选项] 文件名`

  - `-f 列号码`提取某一列，提取多列用,隔开即可，列编号从0开始
  - `-d 分隔符`指定分割符号，默认Tab，但是一定不识别空格
  - `-c 数字-数字`提取从第几个字符到第几个字符，从0计数，不写默认行首/尾

- `awk`编程

  这是一面文件文本处理语言，可以在Shell里面做**文本提取**

  awk输出支持`print`和`printf`，后者多个空格，Linux只支持`printf`

  - `printf 输出类型 输出内容`

    - 输出类型有：
      - `%s`字符串，`%ns`**至少**输出n位字符串，空余的在前面不空格
      - `%i`整数，`%ni`**至少**输出n位整数，空余的在前面补空格
      - `%f`浮点，`%n.mf`输出m位小数，有效位数**是**n(包括小数)

    - 转义符同C++

    - 使用printf输出文件：`printf '%s' $(cat ./demo.txt)`但是所有的\t\n都没了，必须手动加上控制符

        ```bash
        [root@10 ~]# cat st
        1       1       3       4
        1       1       3       4
        1       1       3       4
        [root@10 ~]# printf '%s' $(cat ./st)
        113411341134
        [root@10 ~]# printf '%s\t%s\t%s\t%s\n' $(cat ./st)
        1       1       3       4
        1       1       3       4
        1       1       3       4
        ```

        控制符可能不够，printf会循环利用，例如

        ```bash
        [root@10 ~]# printf '%s\t%s\n' $(cat ./st)
        1       1
        3       4
        1       1
        3       4
        1       1
        3       4
        ```


- awk的基本使用

  - `awk '条件1{动作1} 条件2{动作2}...' 文件名`
    
    - 条件有`>`,`==`,`A~B`B是的A子串,`A!~B`B不是A的子串，`/正则/`进行正则匹配，这个被匹配对象是一	行，也就是`$0`
  - 动作有printf，流程控制语句
    - awk一次会读取文件的一行数据，将一行数据放在这样的语句中执行一次，循环执行
  
    例如
    
      ```bash		
      # 提取34列
          [root@10 ~]# awk '{printf $3 "\t" $4 "\n"}' st
          3       4
          3       4
          3       4
      ```
    
  - `BEGIN`和`END`可以占用条件位置，后面写一些动作，告诉awk在程序执行一开始/结尾执行
  
  - 内置变量
  
    - `$0`代表awk读入的整行数据
    - `$n`代表读入的那一行的第n列
    - `NF`当前行的列数目，注意，没有$
    - `NR` 当前行是总的第几行，注意，没有$
    - `FS`指定分隔符，例如`awk 'BEGIN{FS=":"}条件{运行}...'`注意，要写在BEGIN否则在第一行的时候会先读入，按照默认分隔，才设置分隔符，第一行失效
  
- `sed`命令

  主要是用来**修改**文件中的字符串

  `sed [选项] '[]' 文件名`

  选项

  - `-n`：sed默认是将全文输出到屏幕，可以使用这个选项只输出正在处理的这一行
  - `-i`：将修改的结果写入文件，默认不写入、
- `-e`：执行多个动作，例如`sed -ie '2d;3d' ./st`
  - `-r`：支持扩展正则

  动作，注意加''

  - `np`：打印第n行

  - `a,bd`：删除a行到b行，只删除一行就直接写数字了

  - `na 内容\`：在n行后新建一行追加内容，除了最后一行都要写`\`

  -  `ni 内容\`：在n行前新建一行追加内容，除了最后一行都要写`\`
  
    ```bash
    [root@10 ~]# sed '1a lalala' ./st
    nh      jk      jk      l
    lalala
    1       1       3       4
    1       1       3       4
    [root@10 ~]# sed '1a la\la\la' ./st
    nh      jk      jk      l
    lalala
    1       1       3       4
    1       1       3       4
    [root@10 ~]# sed '1a la\
    > la\
    > la' ./st
    nh      jk      jk      l
    la
    la
    la
    1       1       3       4
  1       1       3       4
    ```

    注意，每一行都要`\`
    
  - `a,bc 内容\`将a-b行替换为内容
  
  - `[行范围] s/旧内容/新内容/g`文本替换，不写范围就是全文
  

### 字符处理命令

- `sort`命令

  `sort 文件名`按照文件开头第一个字母排序，排序方法与C++字符串比大小一样

  - `-r`：逆序
  - `-n`：按照数字而非字符串排序
  - `-t ":" -k 3,5`设置:为分隔符，参与排序的内容是第三列的第一个到第五列的最后一个
  - `-u`：删除重复行

- `uniq` 命令

  `uniq 文件名`删除重复行

  `uniq -i 文件名`忽略大小写

- `wc`命令

  `wc 文件名`字数统计，得到的结果分别是有多少行，多少个单词，多少个字符

  - `-l`：只显示有多少行
  - `-w`：只显示有多少单词
  - `-m`：只显示有多少字符

### 条件判断

- 判断文件类型

  - `-b 文件`：判断文件是否存在&&文件是不是块设备文件
  - `-c 文件`：判断文件是否存在&&文件是不是字符设备文件
  - `-d 文件`：判断文件是否存在&&文件是不是目录文件
  - `-e 文件`：判断文件是否存在
  - `-f 文件`：判断文件是否存在&&文件是不是普通文件
  - `-L 文件`：判断文件是否存在&&文件是不是符号链接文件
  - `-p 文件`：判断文件是否存在&&文件是不是管道文件
  - `-s 文件`：判断文件是否存在&&文件是不是空文件
  - `-S 文件`：判断文件是否存在&&文件是不是套接字文件

  使用的方法有几种

  - `test -X 文件`然后`echo $?`，两个命令不能写在一起
  - `[ -X 文件 ]`然后`echo $?`，两个命令不能写在一起
  - ` [ -b ./st ] && echo "T" || echo "F" `

- 判断文件权限

  - `-r`：文件有读权限
  - `-w`：文件有写权限
  - `-x`：文件有执行权限
  - `-u`：文件有SUID权限
  - `-g`：文件有SGID权限
  - `-k`：文件有SBIT权限

  这个不能区分是所属组还是所有者，只要有人有这个权限就是true

- 文件比较

  - `文件1 -ot 文件2`文件1是不是比文件2老
  - `文件1 -nt 文件2`文件1是不是比文件2新
  - `文件1 -ef 文件2`文件1是不是与文件2同inode(是不是硬链接)

- 两个整数之间比较

  - `a -eq b`：判断a和b是否相等，与`==`不同，`==`是字符串比较
  - `a -ne b`：判断a和b是否不相等
  - `a -gt b`：判断a是否大于b
  - `a -lt b`：判断a是否小于b
  - `a -ge b`：判断a是否大于等于b
  - `a -le b`：判断a是否小于等于b

- 字符串判断

  - `-z 字符串`：判断字符串是否为空
  - `-n 字符串`：判断字符串是否非空
  - `字符串1 == 字符串2`：判断字符串相等
  - `字符串1 != 字符串2`：判断字符串不等​

- 逻辑与或非

  - `判断1 -a 判断2`：与
  - `判断1 -o 判断2`：或
  - `!判断`：非

### 流程控制语句

- `if`语句

  ```bash
  if [ 条件判断 ];then
  	程序
  fi
  ```

  语法比较刁钻，条件判断和`[]`中间一定要有空格，如果then和判断式子同行，需要中间写一个`;`然后以`fi`结尾，也可以写成

  ```bash
  if [ 条件判断式 ]
  	then
  		程序
  fi
  ```

  也有双分支

  ```bash
  if [ 条件判断 ]
  	then
  		程序
  	else
  		程序
  fi
  ```

- `case`语句

  ```bash
  case $变量 in
  	"值1")
  		程序
  		;;
  	"值2")
  		程序
  		;;
  	*)
  		如果都没有匹配就执行程序
  		;;
  esac
  ```

- `for`循环

  ```bash
  for 变量 in 值1 值2 值3...
  	do
  		程序
  	done
  ```

  还有传统的写法

  ```bash
  for ((i=0;i<$n;i=i+1))	#先进的shell已经支持i++了
  	do
  		程序
  	done
  ```

  注意这里for里面的i全部没有$，看起来这第二种方法似乎更好用，但是针对实际运维的场景来看，第一个更方便， 原因是运维的for一般是用来处理一系列内容，数目可能是不确定的，但是内容可以直接拿到，于是用第一种方法可以方便的进行迭代

  批量解压缩

  ```bash
  #!/bin/bash
  
  cd /root/sh
  echo "" >> log.txt
  ls -a *.zip >> log.txt 2>> /dev/null
  for filename in $(cat log.txt)
          do
                  unzip $filename &> /dev/null
          done
  echo END
  rm -rf log.txt
  ```

  批量添加用户

  ```bash
  #!/bin/bash
  
  read -p "input username" -t 30 name
  read -p "input PSW" -t 30 psw
  read -p "input num" -t 30 num
  if [ -z name -o -z psw -o -z num -o -z $( echo num | sed 's/[0-9]//g' ) ];then
          exit 1
  fi
  for ((i=1;i<=$num;i++))
          do
                  adduser $name$i &> /dev/null
                  echo $psw | passwd --stdin $name$i &> /dev/null
                  chage -d 0 $name$i &> /dev/null
          done
  echo END
  ```

  删除所有普通用户

  ```bash
  #!/bin/bash
  
  users=$(cat /etc/passwd | grep /bin/bash | grep -v root)
  for user in $users
          do
                  username=$(echo $user | cut -d ":" -f 1)
                  userdel $username
                  rm -rf /home/$username
                  rm -rf /var/spool/mail/$username
                  echo "DEL $username"
          done
  echo END
  ```

- `while`循环

  ```bash
  while [ 条件 ]
  	do
  		程序
  	done
  ```

- `until`循环

  ```bash
  until [ 条件 ]
  	do
  		程序
  	done
  ```

  while是条件真则循环，until是条件假循环

### 特殊流程控制语句

- `exit`语句

  系统有exit指令，可以用来退出当前用户的登录状态，Bash也有exit语句，可以在后面加返回值用来退出程序，后面需要加返回值，可以使用`$?`查询，如果不加返回值，那么会赋予上次返回的返回值

- `continue`与`break`语句

  同C

## 启动引导与修复

### 系统的运行级别

- 运行级别有7个

  | 运行级别 | 含义                                                   |
  | -------- | ------------------------------------------------------ |
  | 0        | 关机                                                   |
  | 1        | 单用户模式，类似于windows的安全模式，用于修复系统      |
  | 2        | 不完全的命令行模式，不包含NFS服务(Linux间文件传输服务) |
  | 3        | 完全命令模式                                           |
  | 4        | 系统保留                                               |
  | 5        | 图像模式                                               |
  | 6        | 重启                                                   |

- 查看运行级别可以使用命令`runlevel`，有两个结果，第一个是在进入这个级别之前上一个级别是多少，没有是N，第二个值是当前运行级别

- 使用`init N`进入N级，不得用于开机或者重启，容易丢数据

- 可以修改`/etc/inittab`修改开机后的默认级别，修改`id:3:initdefault:`中间的数字即可

- `/etc/rc.d/rc.local`中可以写入希望开机后登录前自动执行的命令，也可以修改他的软链接`/etc/rc.local`

### 启动引导程序

早期的启动引导程序是Lilo，现在基本上是Grub，优势有

- 支持多文件系统
- 可以在主程序中查找内核文件
- 可以交互修改启动选项
- 可以动态修改配置

Grub就存放在`/boot/`

```bash
[root@bogon boot]# ll
总用量 31737
-rw-r--r--. 1 root root   108103 5月  11 2016 config-2.6.32-642.el6.x86_64
drwxr-xr-x. 3 root root     1024 3月   1 13:28 efi
drwxr-xr-x. 2 root root     1024 3月   1 13:30 grub
-rw-------. 1 root root 25270392 3月   1 13:30 initramfs-2.6.32-642.el6.x86_64.img
drwx------. 2 root root    12288 3月   1 13:23 lost+found
-rw-r--r--. 1 root root   215559 5月  11 2016 symvers-2.6.32-642.el6.x86_64.gz
-rw-r--r--. 1 root root  2615003 5月  11 2016 System.map-2.6.32-642.el6.x86_64
-rwxr-xr-x. 1 root root  4264528 5月  11 2016 vmlinuz-2.6.32-642.el6.x86_64
```

`symvers-2.6.32-642.el6.x86_64.gz`是编译过的二进制内核，源码在`/usr/src/kernels`，进入Grub看到

```shell
[root@bogon grub]# ll
总用量 274
-rw-r--r--. 1 root root     63 3月   1 13:30 device.map
-rw-r--r--. 1 root root  13428 3月   1 13:30 e2fs_stage1_5
-rw-r--r--. 1 root root  12636 3月   1 13:30 fat_stage1_5
-rw-r--r--. 1 root root  11780 3月   1 13:30 ffs_stage1_5
-rw-------. 1 root root    745 3月   1 13:30 grub.conf
-rw-r--r--. 1 root root  11772 3月   1 13:30 iso9660_stage1_5
-rw-r--r--. 1 root root  13284 3月   1 13:30 jfs_stage1_5
lrwxrwxrwx. 1 root root     11 3月   1 13:30 menu.lst -> ./grub.conf
-rw-r--r--. 1 root root  11972 3月   1 13:30 minix_stage1_5
-rw-r--r--. 1 root root  14428 3月   1 13:30 reiserfs_stage1_5
-rw-r--r--. 1 root root   1341 11月 15 2010 splash.xpm.gz
-rw-r--r--. 1 root root    512 3月   1 13:30 stage1
-rw-r--r--. 1 root root 126148 3月   1 13:30 stage2
-rw-r--r--. 1 root root  12040 3月   1 13:30 ufs2_stage1_5
-rw-r--r--. 1 root root  11380 3月   1 13:30 vstafs_stage1_5
-rw-r--r--. 1 root root  13980 3月   1 13:30 xfs_stage1_5
```

主要文件是`grub.conf`,`menu.lst`,`splash.xpm.gz`，第一个是配置文件，第二个是第一个的软连接，第三个是Grub启动的背景图片，格式略微奇怪

- Grub配置文件

  - 分区表示法：

    `hd(X,Y)`，X表示是第几块硬盘(从0开始)，Y表示是第几个分区(从0开始)，例如sdb1就是`hd(1,0)`

  - Grub配置文件

    ```bash
    #boot=/dev/sda
    default=0
    timeout=5
    splashimage=(hd0,0)/grub/splash.xpm.gz
    hiddenmenu
    ################################################################
    title CentOS 6 (2.6.32-642.el6.x86_64)
            root (hd0,0)
            kernel /vmlinuz-2.6.32-642.el6.x86_64 ro root=UUID=654883f4-8efe-4c7f-b60b-7886a3bf8309 rd_NO_LUKS  KEYBOARDTYPE=pc KEYTABLE=us rd_NO_MD crashkernel=auto LANG=zh_CN.UTF-8 rd_NO_LVM rd_NO_DM rhgb quiet
            initrd /initramfs-2.6.32-642.el6.x86_64.img
    ```

    第一部分是整体配置，分别是默认启动系统，等待时间(s，-1表示一直等待)，背景图像，隐藏菜单界面，只显示Xs后加载CentOS

    第二部分是系统的配置，分别是

    - root位置

    - 内核

      - 内核位置
      - ro：**启动**的时候只读挂载root
      - root盘的UUID
      - rd_NO_LUKS：禁用磁盘加密
      - KEYBOARDTYPE=pc KEYTABLE=us 
      - rd_NO_MD：禁用软RAID
      - crashkernel=auto：自动为crashkernel留内存
      - LANG=zh_CN.UTF-8：语言环境 
      - rd_NO_LVM：禁用LVM
      -  rd_NO_DM：禁用硬RAID
      - rhgb：用图片代替启动过程的文字信息，启动后使用dmesg查看文字信息
      - quiet：隐藏启动信息，只显示重要信息

      注意，这里的禁用RAID，LVM指的是启动的时候禁用，开机后正常使用

    - 虚拟文件系统

  - Grub加密

    忘记root密码后可以在Grub中按e找到密码，但是这样看起来有点不安全，可以加密一下Grub也就是在进入Grub高级菜单的时候要输入密码

    ```bash
    [root@bogon grub]# grub-md5-crypt		# 使用加密命令得到密码的MD5码
    Password:
    Retype password:
    $1$3SGaL1$xbpqvWCli69UbOFIudJ9Y0
    [root@bogon grub]# vim grub.conf		# 进入Grub配置文件
    timeout=5
    password --md5 $1$3SGaL1$xbpqvWCli69UbOFIudJ9Y0		# 写下password --md5 然后粘贴md5码，必须写在timeout与splashimage中间，其他位置无效
    splashimage=(hd0,0)/grub/splash.xpm.gz
    ```

    **注意：必须写在timeout与splashimage中间，其他位置无效**，这个密码只是进入编辑模式才要密码，如果想要开机业需要密码可以在配置文件中

    ```diff
    title CentOS 6 (2.6.32-642.el6.x86_64)
    +		lock
            root (hd0,0)
    ```

    但是不要犯二，这样就没法远程了

### 系统修复模式

有两种修复模式，单用户和光盘修复，单用户可以做密码找回，还原配置文件这样的简单操作，光盘做的比较多

**所有的修复模式都是需要本机的，千万不要依赖这玩意**

- 单用户模式

  进入Grub菜单，选择输入e，选择内核那一条，输入e，在最后加入` 1`空格和1就可以临时修改Grub，按下b可以启动到单用户模式，之后，我们可以不使用用户密码直接登录

  修改root密码

  ```bash
  passwd root
  ```

  就完事

- 光盘修复模式

  修改BIOS顺序进入光盘，选第三个`rescue installed system`模式，选择语言，选英文不要选中文，us美式键盘，选择是否启动网络，弹出警告界面continue，一路OK，选择shell模式，进入shell，此时Shell会显示在/目录，但是这个不是硬盘的根目录而是光盘的，因为你在光盘的系统上，计算机上的硬盘被作为数据盘挂载到了`/mnt/sysimage`，需要chroot将硬盘根目录作为根目录`chroot /mnt/sysimage`，之后直接修改就可以了

## 服务管理

### 服务的简介与分类

服务的分类

- RPM包安装的服务
  - 独立的服务：直接放在内存里面的，可以直接访问
  - 基于xinetd的服务：将xinetd放在内存里面，将服务放在ximetd后面，节约内存，但是慢，无法直接访问
- 源码包安装的服务

区分是独立服务还是xinetd服务的方法是`chkconfig --list`，其中，显示的0-6就是在0-6运行级别下是否开启，这些都是独立服务，xinetd服务会在最后单独列出

### RPM包的启动和自启动

- 独立服务

  - 启动

    `绝对路径 start`例如

    ```bash
    /etc/init.d/httpd start
    ```

    `service 服务名 start|stop|restart|...`

    ```bash
    service httpd start
    ```

  - 自启动

    - `chkconfig`方法

      ```bash
      checkconfig  [--level 运行级别] [独立服务名] [on|off]
      ```

      例如

      ```bash
      chkconfig --level 2345 httpd on
      ```

      虽然4是未分配，但是就是习惯这么写，这个设置的是自启动，所以下次启动生效

    - 修改`/etc/rc.d/rc.local`文件，直接写`绝对路径 start`此处不要写`service 服务名 start`可能数据库还没开

    - `ntsysv`图形化配置，这个开启的只开启了3级别(命令行界面)，开启后chechconfig可查，但是推荐`rc.local`方法

- 基于xinetd服务

  - 启动

    - `vim /etc/xinetd.d/服务名`，修改为`disable:no `，然后重启xinetd`service xinetd restart`

  - 自启动

    xinetd服务无法自启动，需要将xinetd作为自启动，里面的所有`disable:no`是服务就可以自启动，这个是极其不合理的，xinetd也基本被淘汰了

- 源码包的服务

  - 启动：使用的是源码包提供的启动脚本+选项进行管理

  - 自启动： 修改`/etc/rc.d/rc.local`文件

  - 让源码包被service识别

    不推荐这么做!!!

    ```bash
    ln -s 源码启动脚本 /etc/init.d/服务名
    ```

    例如

    ```bash
    ln -s /usr/local/apache2/bin/apachectl /etc/init.d/apache
    service apache restart
    ```

  - 让源码包被chkconfig识别，在/etc/init.d/服务名里加上

    ```bash
    # chkconfig: 运行级别 启动顺序 关闭顺序
    # description: 随便写点描述
    ```

### Linux中常见的服务的作用

| 服务名称        | 功能简介                                                     | 建议 |
| --------------- | ------------------------------------------------------------ | ---- |
| acpid           | 电源管理接口。如果是笔记本电脑用户，则建议开启，可以监听内核层的相关电源事件 | 开启 |
| anacron         | 系统的定时任务程序。是 cron  的一个子系统，如果定时任务错过了执行时间，则可以通过 anacron 继续唤醒执行 | 关闭 |
| alsasound       | alsa 声卡驱动。如果使用 alsa 声卡，则开启                    | 关闭 |
| apmd            | 电源管理模块。如果支持 acpid，就不需要  apmd，可以关闭       | 关闭 |
| atd             | 指定系统在特定时间执行某个任务，只能执行一次。如果需要则开启，但我们一般使用 crond  来执行循环定时任务 | 关闭 |
| auditd          | 审核子系统。如果开启了此服务，那么 SELinux  的审核信息会写入 /var/log/audit/ audit.log 文件；如果不开启，那么审核信息会记录在 syslog 中 | 开启 |
| autofs          | 让服务器可以自动挂载网络中其他服务器的共享数据,一般用来自动挂载 NFS 服务。如果没有 NFS  服务，则建议关闭 | 关闭 |
| avahi-daemon    | avahi 是 zeroconf  协议的实现，它可以在没有 DNS 服务的局域网里发现基于 zeroconf 协议的设备和服务。除非有兼容设备或使用 zeroconf 协议，否则关闭 | 关闭 |
| bluetooth       | 蓝牙设备支持。一般不会在服务器上启用蓝牙设备，关闭它         | 关闭 |
| capi            | 仅对使用 ISND 设备的用户有用                                 | 关闭 |
| chargen-dgram   | 使用 UDP 协议的 chargen server。其主要提供类似远程打字的功能 | 关闭 |
| chargen-stream  | 同上                                                         | 关闭 |
| cpuspeed        | 可以用来调整 CPU 的频率。当闲置时，可以自动降低 CPU 频率来节省电量 | 开启 |
| crond           | 系统的定时任务，一般的 Linux  服务器都需要定时任务来协助系统维护。建议开启 | 开启 |
| cvs             | 一个版本控制系统                                             | 关闭 |
| daytime-dgram   | 使用 TCP 协议的 daytime  守护进程，该协议为客户机实现从远程服务器获取日期和时间的功能 | 关闭 |
| daytime-slream  | 同上                                                         | 关闭 |
| dovecot         | 邮件服务中 POP3/IMAP  服务的守护进程，主要用来接收信件。如果启动了邮件服务则开启：否则关闭 | 关闭 |
| echo-dgram      | 服务器回显客户服务的进程                                     | 关闭 |
| echo-stream     | 同上                                                         | 关闭 |
| firstboot       | 系统安装完成后，有一个欢迎界面，需要对系统进行初始设定，这就是这个服务的作用。既然不是第一次启动了，则建议关闭 | 关闭 |
| gpm             | 在字符终端 (ttyl~tty6)  中可以使用鼠标复制和粘贴，这就是这个服务的功能 | 开启 |
| haldaemon       | 检测和支持 USB 设备。如果是服务器则可以关闭，个人机则建议开启 | 关闭 |
| hidd            | 蓝牙鼠标、键盘等蓝牙设备检测。必须启动  bluetooth 服务       | 关闭 |
| hplip           | HP 打印机支持，如果没有 HP 打印机则关闭                      | 关闭 |
| httpd           | apache 服务的守护进程。如果需要启动  apache，就开启          | 开启 |
| ip6tables       | IPv6 的防火墙。目前 IPv6 协议并没有使用，可以关闭            | 关闭 |
| iptables        | 防火墙功能。Linux  中的防火墙是内核支持功能。这是服务器的主要防护手段，必须开启 | 开启 |
|                 | IrDA 提供红外线设备（笔记本电脑、PDA’s、手机、计算器等）间的通信支持。建议关闭 | 关闭 |
| irqbalance      | 支持多核处理器，让 CPU  可以自动分配系统中断（IRQ)，提高系统性能。目前服务器多是多核 CPU，请开启 | 开启 |
| isdn            | 使用 ISDN 设备连接网络。目前主流的联网方式是光纤接入和 ADSL，ISDN 己经非常少见，请关闭 | 关闭 |
| kudzu           | 该服务可以在开机时进行硬件检测，并会调用相关的设置软件。建议关闭，仅在需要时开启 | 关闭 |
| lvm2-monitor    | 该服务可以让系统支持LVM逻辑卷组，如果分区采用的是LVM方式，那么应该开启。建议开启 | 开启 |
| mcstrans        | SELinux 的支持服务。建议开启                                 | 开启 |
| mdmonitor       | 该服务用来监测 Software RAID 或 LVM 的信息。不是必需服务，建议关闭 | 关闭 |
| mdmpd           | 该服务用来监测 Multi-Path  设备。不是必需服务，建议关闭      | 关闭 |
| messagebus      | 这是 Linux 的 IPC (Interprocess  Communication，进程间通信）服务，用来在各个软件中交换信息。建议关闭 | 关闭 |
| microcode  _ctl | Intel 系列的 CPU  可以通过这个服务支持额外的微指令集。建议关闭 | 关闭 |
| mysqld          | MySQL 数据库服务器。如果需要就开启；否则关闭                 | 开启 |
| named           | DNS 服务的守护进程，用来进行域名解析。如果是  DNS 服务器则开启；否则关闭 | 关闭 |
| netfs           | 该服务用于在系统启动时自动挂载网络中的共享文件空间，比如 NFS、Samba 等。  需要就开启，否则关闭 | 关闭 |
| network         | 提供网络设罝功能。通过这个服务来管理网络，建议开启           | 开启 |
| nfs             | NFS (Network File System) 服务，Linux 与 Linux  之间的文件共享服务。需要就开启，否则关闭 | 关闭 |
| nfslock         | 在 Linux 中如果使用了 NFS  服务，那么，为了避免同一个文件被不同的用户同时编辑，所以有这个锁服务。有 NFS 时开启，否则关闭 | 关闭 |
| ntpd            | 该服务可以通过互联网自动更新系统时间.使系统时间永远准确。需要则开启，但不是必需服务 | 关闭 |
| pcscd           | 智能卡检测服务，可以关闭                                     | 关闭 |
| portmap         | 用在远程过程调用 (RPC) 的服务，如果没有任何 RPC 服务，则可以关闭。主要是 NFS 和  NIS 服务需要 | 关闭 |
| psacct          | 该守护进程支持几个监控进程活动的工具                         | 关闭 |
| rdisc           | 客户端 ICMP 路由协议                                         | 关闭 |
| readahead_early | 在系统开启的时候，先将某些进程加载入内存整理，可以加快启动速度 | 关闭 |
| readahead_later | 同上                                                         | 关闭 |
| restorecond     | 用于给 SELinux  监测和重新加载正确的文件上下文。如果开启 SELinux，则需要开启 | 关闭 |
| rpcgssd         | 与 NFS 有关的客户端功能。如果没有 NFS 就关闭                 | 关闭 |
| rpcidmapd       | 同上                                                         | 关闭 |
| rsync           | 远程数据备份守护进程                                         | 关闭 |
| sendmail        | sendmail  邮件服务的守护进程。如果有邮件服务就开启；否则关闭 | 关闭 |
| setroubleshoot  | 该服务用于将 SELinux 相关信息记录在日志 /var/log/messages 中。建议开启 | 开启 |
| smartd          | 该服务用于自动检测硬盘状态。建议开启                         | 开启 |
| smb             | 网络服务 samba 的守护进程。可以让 Linux 和 Windows 之间共享数据。如果需要则开启 | 关闭 |
| squid           | 代理服务的守护进程。如果需要则开启：否则关闭                 | 关闭 |
| sshd            | ssh 加密远程登录管理的服务。服务器的远程管理必须使用此服务，不要关闭 | 开启 |
| syslog          | 日志的守护进程                                               | 开启 |
| vsftpd          | vsftp 服务的守护进程。如果需要 FTP 服务则开启；否则关闭      | 关闭 |
| xfs             | 这是 X Window  的字体守护进程，为图形界面提供字体服务。如果不启动图形界面，就不用开启 | 关闭 |
| xinetd          | 超级守护进程。如果有依赖 xinetd 的服务，就必须开启           | 开启 |
| ypbind          | 为 NIS (网络信息系统）客户机激活 ypbind  服务进程            | 关闭 |
| yum-updatesd    | yum 的在线升级服务                                           | 关闭 |

## 系统管理

### 进程管理

- 作用

  - 帮助工程师监控服务器状态而不是简单的结束进程，一般判断服务器健康状态有70-90原则，也就是内存占用不超过70%,CPU占用不超过90%
  - 查看系统中所有的进程，查看系统中正在运行的服务
  - 杀死进程，这是最不常用的作用

- 查看进程命令

  - `ps aux`查询系统中所有正在运行的进程，注意没有-

    ```bash
    [root@bogon ~]# ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    root         1  0.0  0.1  19352  1544 ?        Ss   00:08   0:02 /sbin/init
    root         2  0.0  0.0      0     0 ?        S    00:08   0:00 [kthreadd]
    root         3  0.0  0.0      0     0 ?        S    00:08   0:00 [migration/0]
    ```

    每列的意思分别是

    - USER：产生的用户
    - PID：进程ID
    - %CPU：CPU占比
    - %MEM：物理内存占比
    - VSZ：虚拟内存占用大小KB
    - RSS：物理内存占用大小KB
    - TTY：在哪个TTY中运行，tty1-tty7是本地终端，pts/0-255是虚拟终端，?表示由内核直接产生的进程，不需要任何终端
    - STAT：进程状态
      - D: 无法中断的休眠状态 (通常 IO 的进程)
      - R: 正在执行中
      - S: 静止状态
      - T: 暂停执行
      - Z: 不存在但暂时无法消除
      - W: 没有足够的记忆体分页可分配
      - <: 高优先序的行程
      - N: 低优先序的行程
      - L: 有记忆体分页分配并锁在记忆体内 (实时系统或捱A I/O)
    - START：运行时间
    - TIME：当前进程消耗CPU计算时间
    - COMMAND：进程名称

  - `ps le`与`ps aux`一样，但是这个显示的是简写进程

  - `top`命令

    默认输出

    ```bash
    top - 01:15:33 up  1:07,  1 user,  load average: 0.00, 0.01, 0.05
    Tasks:  86 total,   1 running,  85 sleeping,   0 stopped,   0 zombie
    Cpu(s):  0.0%us,  0.3%sy,  0.0%ni, 99.3%id,  0.3%wa,  0.0%hi,  0.0%si,  0.0%st
    Mem:   1020076k total,   188136k used,   831940k free,    11536k buffers
    Swap:  1048572k total,        0k used,  1048572k free,    56896k cached
    
      PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
        7 root      20   0     0    0    0 S  0.3  0.0   0:02.01 events/0
     1774 root      20   0 15032 1204  936 R  0.3  0.1   0:00.01 top
        1 root      20   0 19352 1544 1232 S  0.0  0.2   0:02.42 init
        2 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kthreadd
        3 root      RT   0     0    0    0 S  0.0  0.0   0:00.00 migration/0
    ```

    分别是：

    - 系统时间
    - 登录时间
    - 登录用户个数
    - **在之前1,5,15分钟的平均负载，一般不得超过核心数**
    - 系统中总进程数
    - 正在运行的进程
    - 睡眠的进程
    - 正在停止的进程
    - 僵尸进程数目
    - 用户占用CPU百分比
    - 系统占用CPU百分比
    - 修改过优先级的用户进程占CPU
    - **空闲CPU百分比**
    - 等待IO的进程占用百分比
    - 硬中断请求服务CPU占比
    - 软中断请求服务CPU占比
    - 虚拟时间百分比，虚拟CPU等待实际CPU百分比
    - 内存大小
    - 使用的内存
    - **空闲的内存**
    - 缓冲的内存
    - swap大小
    - 使用的swap
    - 空闲的swap
    - 缓冲的swap

    **top模式下的**交互选项

    - `?/h`显示帮助
    - `P`按照CPU占有率排序
    - `M`按照内存使用占比排序
    - `N`按照PID排序
    - `T`按照CPU累计运算时间排序
    - `k`按照pid号给予信号，一般用于关闭进程
    - `r`按照PID重设优先级
    - `q`退出

    **选项**

    - `-p PID`查看某个PID进程
    - `-b` 将文件保存
    - `-n 1`刷新一次，于是`top -b -n 1 >> res`就是写入进程到文件

  - `pstree`命令

    显示进程树

    `-p`显示进程PID

    `-u`显示进程所述用户

- 杀死进程

  首先需要了解主要的系统信号

  | 信号代号 | 信号名称 | 说明                                                    |
  | -------- | -------- | ------------------------------------------------------- |
  | 1        | SIGHUP   | 关闭进程，重读配置文件重启                              |
  | 2        | SIGINT   | 终止前台，相当于Ctrl+C                                  |
  | 8        | SIGFPE   | 发展致命运算错误，例如除0                               |
  | 9        | SIGKILL  | 立即强制不得阻塞或忽略的结束程序                        |
  | 14       | SIGALRM  | 时钟定时型号，计算实际的时间或者时钟时间，alarm函数使用 |
  | 15       | SIGTERM  | 正常结束进程的信号                                      |
  | 18       | SIGCONT  | 让暂停的进程恢复运行，不可阻断                          |
  | 19       | SIGSTOP  | 暂停前台进程，不可阻断                                  |

  - `kill`命令

    `kill -信号 PID`例如`kill -9 12345`

  - `killall` 命令

    `killall -信号 进程名`例如`kill -9 httpd`

    - `-i`交互式询问是否杀死
    - `-I`忽略大小写

  - `pkill`命令

    - `pkill -信号 进程`关闭进程

    - `pkill -信号 -t 终端`踢出登录这个终端的用户，例如

      ```bash
      [root@bogon ~]# w
       02:06:49 up  1:58,  2 users,  load average: 0.04, 0.04, 0.05
      USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
      root     pts/0    10.0.2.2         00:24    0.00s  0.04s  0.00s w
      liukairu pts/1    10.0.2.2         02:05    1:23   0.02s  0.02s -bash
      [root@bogon ~]# pkill -9 -t pts/1
      [root@bogon ~]# w
       02:06:57 up  1:58,  1 user,  load average: 0.04, 0.04, 0.05
      USER     TTY      FROM              LOGIN@   IDLE   JCPU   PCPU WHAT
      root     pts/0    10.0.2.2         00:24    0.00s  0.04s  0.00s w
      ```

### 工作管理

- 工作管理简介
  - 前台是指当前可以操控和执行命令的这个操作环境，后台是指工作可以自行运行，但是不能直接用ctrl+c来终止它，只能使用fg/bg来调用工作;
  - 当前的登录终端， 只能管理当前终端的工作，而不能管理其他登录终端的工作。如tty1 登录的终端是不能管理tty2终端中的工作的;
  - 放入后台 的命令必须可以持续运行一-段时间，这样我们才能扑捉和操作这个工作。如果把ls命令放入后台执行，它很快就会执行完成，我们很难操作它。
  - 放入后台执行的命令不能和前台用户有交互或需要前台输入，否则放入后台只能暂停，而不能执行。比如vi命令放入后台只能暂停，而不能执行，因为vi需要前台输入信息。top 命令也不能放入后台执行，而只能放入后台暂停，因为top命令需要和前台有交互。

- 将命令放入后台

  - `命令 &`，只需要将命令+空格+&即可
  - 执行命令的时候Ctrl+Z即可，注意这个会暂停进程

- `jobs`查看所有的后台进程，`-l`查看PID

  ```bash
  [root@bogon ~]# jobs
  [1]-  Stopped                 vi
  [2]+  Stopped                 vim
  [3]   Exit 127                tops
  ```

  第一列是工作号，是放入后台的顺序，之后显示状态

- `bg`命令：让已经暂停的命令在后台继续执行

  `bg %工作号`，这个%可以省略

- `fg`命令：让后台的工作在前台执行

  `fg %工作号`，这个%可以省略

- 让程序长期后台脱离终端执行

  - 添加到`/etc/rc.local`

  - 使用定时任务

  - 使用`nohup`命令

    ```bash
    nohup 需要长期执行的命令 &
    ```

### 系统资源查看

- `vmstat [刷新延时] [刷新次数]`命令

  例如`vmstat 2 3`就是每两秒刷新一次，一共刷新三次

  ```bash
  [root@bogon ~]# vmstat 2 4
  procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
   r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
   0  0      0 822476  13412  60888    0    0     9     1   10   10  0  0 100  0  0
   0  0      0 822460  13412  60892    0    0     0     0    8    9  0  0 100  0  0
   0  0      0 822460  13412  60892    0    0     0     0    7    5  0  0 100  0  0
   0  0      0 822460  13412  60892    0    0     0     0    7    5  0  0 100  0  0
  ```

  其中：

  - procs

    - `r`：等待运行的进程数，越大越忙
    - `b`：不可唤醒的进程数，越大越忙

  - memory

    - `swpd`：虚拟内存使用 KB
    - `free`：空闲内存 KB
    - `buff`：缓冲内存 KB，buffer(缓冲)是为了提高内存和硬盘或其他I/0设备之间的数据交换的速度而设计的
    - `chche`：缓存内存 KB，cache(缓存)是为了提高cpu和内存之间的数据交换速度而设计的

  - Swap：

    - si: 每秒从交换区写到内存的大小

    - so: 每秒写入交换区的内存大小，越大性能越差

  - IO：（现在的Linux版本块的大小为1024bytes）

    - bi: 每秒读取的块数

    - bo: 每秒写入的块数，越大越忙

  - 系统：

    - in: 每秒中断数，包括时钟中断

    - cs: 每秒上下文切换数，越大越忙

  - CPU（以百分比表示）：
    - us: 用户进程执行时间(user time)
    - sy: 系统进程执行时间(system time)
    - id: 空闲时间(包括IO等待时间),中央处理器的空闲时间 。以百分比表示。
    - wa: 等待IO时间
    - st: 被虚拟机盗用的CPU比例

- `dmesg`命令

  可以显示开始时内核检测信息，使用grep过滤

- `free -h`空闲内存

  ```
  [root@bogon ~]# free -h
               total       used       free     shared    buffers     cached
  Mem:          996M       193M       802M       200K        13M        59M
  			总内存		使用		空闲			共享		缓冲		缓存
  -/+ buffers/cache:       120M       875M
  			不计缓存缓冲的使用与空闲 
  Swap:         1.0G         0B       1.0G
  ```

- 查看CPU信息：`vim /proc/cpuinfo`

- 查看内存信息：`vim /proc/meminfo`

- 查看本机登录信息：`w`或`who`

- 查看时间，登录时间，用户，负载(就是tops第一行)：`uptime`

- `uname`查询内核相关

  - `-a`显示所有相关信息
  - `-r`显示内核版本
  - `-s`显示内核名称

- 判断系统位数：`uname -a`有显示，也可以用`file /bin/ls`(任意系统命令均可)，也可以用`lsb_release -a`

### 系统定时任务

- at一次性执行的定时任务

  这种定时任务只能执行一次

  at执行任务需要at的守护程序atd，与yum的系统独立服务是一样的启动方式

  at有黑名单和白名单的机制，白名单在/etc/at.allow，黑名单在/etc.at.deny，规则是

  - 如果有白名单，只有写入白名单的用户有写入权利
  - 如果没有白名单只有黑名单那么黑名单用户无法写入，其他可以
  - 如果两个都不存在，只有root可以使用

  - 白名单的权限比黑名单高
  - 一个用户名一行写入即可

  ```bash
  at [选项] 时间 <回车>
  命令
  Ctrl+D保存
  ```

  - 选项 
    - `-m`：在at完成后，不论是否都命令有输出都会使用email通知执行at的用户
    - `-c 工作号`：显示at工作的实际内容
  - 时间
    - HH:AM
    - HH:MM YYYY-MM-DD
    - HH:MM[am|pm] [Month] [date]
    - HH:MM[am|pm] + number [minutes|hours|days|weeks]

  可以使用`atq`查询工作号

  `atrm 工作号`可以删除一个任务

- `crontab`循环执行定时任务

  也需要像独立的yum命令一样进行启动和自启动，名字是crond

  与at的黑白名单机制一样，位置在`/etc/cron.allow`与`/etc/cron.deny`

  选项

  - `-e` 编辑crontab定时任务
  - `-l` 查询crontab任务
  - `-r` 删除用户的所有crontab任务，如果有多个，想要删除一个的话只能`-e`
  - `-u 用户名` 删除或修改其他用户的crontab任务，只有root可用 

  配置方式是：

  ```bash
  MM HH DD MM DY 任务
  ```

  分别是一小时的第几分钟(0-59)，第几小时(0-23)，一个月第几天(1-31)，一年第几个月(1-12)，一周的周几(0-7，0和7都是日)，需要的地方写数字，不需要的地方写*，例如

  ```bash
  10 * * * * 命令
  ```

  相当于**每小时10分**的时候运行

  - 需要每隔多长时间运行可以写`*/时间`

    ```bash
    */10 * * * * 命令
    ```

    每隔10min运行

  - 需要连续不相同的时间执行可以用`,`隔开

    ```bash
    2,3,4,5 * * * * 命令
    ```

    每小时2,3,4,5运行

  - 连续时间范围

    ```bash
    0 5 1-5 * * 命令
    ```

    相当于每个月1-5号早上五点执行

  - 星期和日期最好不要写在一起，这个是或的关系

  - 重启这些服务最好管理员介入，否则恐怕起不来

  - 定时任务一定要使用绝对路径

  - 可以`* * * * * 用户名 命令`指定运行者

  - 系统也在使用cron，系统的配置文件在`/etc/crontab`系统将自己准备执行的命令都放在了`/etc/cron.daily`，cron.weekly......，这都是文件夹，里面的shell就会每天每周...执行

- anacron

  corn固然好用，但是如果发生宕机，或者该运行的时候电脑关机了，anacron可以在开机的时候检查是都有被错过的命令

  在`/var/spool/anacron`中保存着`cron.daily|weekly...`都保存着anacron上次执行的时间

  配置文件在`/etc/anacrontab`

  ```bash
  SHELL=/bin/sh
  PATH=/sbin:/bin:/usr/sbin:/usr/bin
  MAILTO=root
  RANDOM_DELAY=45			# 最大随机延迟
  START_HOURS_RANGE=3-22	# 执行的时间范围是0300-2200
  
  #period in days   delay in minutes   job-identifier   command
  1       5       cron.daily              nice run-parts /etc/cron.daily
  7       25      cron.weekly             nice run-parts /etc/cron.weekly
  @monthly 45     cron.monthly            nice run-parts /etc/cron.monthly
  ```

## 日志管理

### 日志

备份的时候一定要保存日志，日志保存半年以上，日志服务是

| 日志文件          | 说 明                                                        |
| ----------------- | ------------------------------------------------------------ |
| /var/log/cron     | 记录与系统定时任务相关的曰志                                 |
| /var/log/cups/    | 记录打印信息的曰志                                           |
| /var/log/dmesg    | 记录了系统在开机时内核自检的信总。也可以使用dmesg命令直接查看内核自检信息 |
| /var/log/btmp     | 记录错误登陆的日志。这个文件是二进制文件，不能直接用Vi查看，而要使用lastb命令查看。命令如下： [root@localhost log]#lastb root tty1 Tue Jun 4 22:38 - 22:38 (00:00) #有人在6月4 日 22:38便用root用户在本地终端 1 登陆错误 |
| /var/log/lasllog  | 记录系统中所有用户最后一次的登录时间的曰志。这个文件也是二进制文件.不能直接用Vi 查看。而要使用lastlog命令查看 |
| /var/Iog/mailog   | 记录邮件信息的曰志                                           |
| /var/log/messages | 它是核心系统日志文件，其中包含了系统启动时的引导信息，以及系统运行时的其他状态消息。I/O 错误、网络错误和其他系统错误都会记录到此文件中。其他信息，比如某个人的身份切换为 root，已经用户自定义安装软件的日志，也会在这里列出。 |
| /var/log/secure   | 记录验证和授权方面的倍息，只要涉及账户和密码的程序都会记录，比如系统的登录、ssh的登录、su切换用户，sudo授权，甚至添加用户和修改用户密码都会记录在这个日志文件中 |
| /var/log/wtmp     | 永久记录所有用户的登陆、注销信息，同时记录系统的后动、重启、关机事件。同样，这个文件也是二进制文件.不能直接用Vi查看，而要使用last命令查看 |
| /var/tun/ulmp     | 记录当前已经登录的用户的信息。这个文件会随着用户的登录和注销而不断变化，只记录当前登录用户的信息。同样，这个文件不能直接用Vi查看，而要使用w、who、users等命令查看 |

 

除系统默认的日志之外，采用 RPM 包方式安装的系统服务也会默认把日志记录在 /var/log/ 目录中（源码包安装的服务日志存放在源码包指定的目录中）。不过这些日志不是由 rsyslogd 服务来记录和管理的，而是各个服务使用自己的日志管理文档来记录自身的日志。以下介绍的日志目录在你的 Linux 上不一定存在，只有安装了相应的服务，日志才会出现。服务日志如表 2 所示。


| 日志文件        | 说明                                |
| --------------- | ----------------------------------- |
| /var/log/httpd/ | RPM包安装的apache取务的默认日志目录 |
| /var/log/mail/  | RPM包安装的邮件服务的额外日志因录   |
| /var/log/samba/ | RPM色安装的Samba服务的日志目录      |
| /var/log/sssd/  | 守护进程安全服务目录                |

### 日志服务

Linux有rsyslog日志服务，配置文件在`/etc/rsyslog.d`，里面有诸如此类的内容

```bash
authpriv.*                  /var/log/secure
#日志.要被记录的等级链接符号	位置
```

日志服务连接日志等级的格式如下：

日志服务[连接符号]日志等级 日志记录位置

在这里，连接符号可以被识别为以下三种。

1. “.”代表只要比后面的等级高的（包含该等级）日志都记录。比如，“cron.info”代表cron服务产生的日志，只要日志等级大于等于info级别，就记录。
2. “.=”代表只记录所需等级的日志，其他等级的日志都不记录。比如，“*.=emerg”代表人和日志服务产生的日志，只要等级是emerg等级，就记录。这种用法极少见，了解就好。
3. “.！”代表不等于，也就是除该等级的日志外，其他等级的日志都记录。

| 等级名称             | 说 明                                                        |
| -------------------- | ------------------------------------------------------------ |
| debug (LOG_DEBUG)    | 一般的调试信息说明                                           |
| info (LOG_INFO)      | 基本的通知信息                                               |
| nolice (LOG_NOTICE)  | 普通信息，但是有一定的重要性                                 |
| warning(LOG_WARNING) | 警吿信息，但是还不会影响到服务或系统的运行                   |
| err(LOG_ERR)         | 错误信息, 一般达到err等级的信息已经可以影响到服务成系统的运行了 |
| crit (LOG_CRIT)      | 临界状况信思，比err等级还要严®                               |
| alert (LOG_ALERT)    | 状态信息，比crit等级还要严重，必须立即采取行动               |
| emerg (LOG_EMERG)    | 疼痛等级信息，系统已经无法使用了                             |
| *                    | 代表所有日志等级。比如，“authpriv.*”代表amhpriv认证信息服务产生的日志，所有的日志等级都记录 |

等级debug->emerg从低到高

### 日志轮替

系统提供了将日志按天分割的功能，但是分开的日志越积越多于是有了轮替功能，可以保留指定天数的日志，RPM包可以被系统识别自动切割，可以修改配置文件支持自己创建的日志，配置文件在`/etc/logrotate.conf`

```bash
# 以下定义的日志每周轮替一次(后面服务没有指定的时候才生效)
weekly
# 文件轮替四次
rotate 4
# 轮替的时候新建新日志
create
# 文件名命名的时候加上日期
dateext
# 压缩配置
#compress
# 加载其他的日志配置文件
include /etc/logrotate.d
# 轮替信息
/var/log/wtmp {
    monthly					# 每个月轮替一次{daily|weekly|monthly}
    create 0664 root utmp	 # 创建新的日志和权限
	minsize 1M				# 如果小于1M即使超过限制也不轮替
    rotate 1				# 轮替一次
    # mail adress			# 生成是时候发邮件
    # missingok				# 日志不存在忽略而不警告
    # notifempty			# 空日志不轮替
    # size 100k			   # 当文件大于100k自动轮替，而不是按照时间
    sharedscripts			# 想要写一些生成日志前后要运行命令需要先写这个
    postrotate				# 日志轮替结束后执行以下脚本，想要轮提前执行可以使用命令prerotate
    	service network restart		# 要执行的命令
    	# 这里一般是重启服务器服务，尝试使用平滑重启
    endscript
}
```

---

**完结撒花**