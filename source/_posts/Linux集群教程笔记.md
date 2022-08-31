---
title: Linux集群教程笔记
date: 2021-11-1 00:00:01
toc: true
description: 尚硅谷Linux运维集群部分, 包括多个阶段, 集群化阶段，讲解LVS与keepalived结合构建企业级负载调度集群;缓存阶段，由生产环境案例组成;存储阶段，糅合讲解 NFS、MFS、ISCSI 三类企业级存储技术; 监控阶段，包括Cacti、Nagios、Zabbix; 装机阶段，包括PXE、Cobbler,主讲:尚硅谷沈超与王洋,视频来自B站:BV1Db411G7pf
categories:
  - [运维]
tags:
  - 运维
  - Linux
---



# Linux集群

## 集群概述

集群是一组**协同工作**的服务器，**各有分工**，但是对外表现为**一个整体**

单机模式成本低，时间长，效率低下，稳定性低，有性能极限，无法突破

集群模式成本高，效率高(1+1>2)，适合大型业务，单机器宕机业务不中断

普通的单台服务器一般可以承受10万PV(点击量)的并发访问

### 集群分类

- 负载均衡集群LBC：有人负责指挥分配任务，有人负责工作，典型的是Web服务器。负责管理的是负载均衡服务器，可以是一个服务器实体，也可以是一个LVS软件模拟
- 高可用(故障转移)集群HAC：主服务器挂了后，备用服务器会自动切换过来继续承担主服务器的服务。主备服务器会通过keepalive模块进行检测(心跳线)，主挂掉后备自动启动。当备份服务器启动后，如果有自动断电机，会自动切断主服务器电源，防止备份服务器误判，主备同时开启。
- 高性能科学计算集群HPC：整合网络上有空闲资源的计算机，进行科学计算

### 负载均衡集群

#### 负载均衡工作模式

用户访问负载均衡服务器，负载均衡服务器将请求转发到业务服务器

- 常见的负载均衡服务器软件有：LVS(工作在7层模型的传输层),Nginx(工作在7层模型的应用层),Haproxy

- 常见的负载均衡服务器硬件叫：F5(工作在7层模型的数据链路层)

**LVS在网络传输层工作原理**

LVS工作在7层模型的传输层，也就是在五层模型传输而后数据网络层之间

用户与LVS服务器都工作在公网上，Apache服务器工作在内网上

用户发送请求到LVS服务器，LVS收到socket,上面有双方IP，LVS收到请求后使用规则库，将**目标IP**从自己的公网IP改为某个服务器的内网IP进行链接

精度低，负载大，可用于B/S与C/S架构

**Nginx网络应用层工作原理**

用户发起请求到Nginx，Nginx根据用户请求类型，**重新**与服务器建立TCP链接发送请求

相当于LVS是收到一个包裹，直接根据规则修改目的地，继续发送，但是Nginx是收到包裹，拆开，然后重新打单，做一个全新的链接，这是因为Nginx是工作在应用层的，所以LVS的负载均衡能力可能达到Nginx的几百倍，但是得益于此，Nginx可以对不同请求智能判断类型，转发到不同服务器

精度高，负载小，只能应用于B/S服务

**LVS在系统中工作方式**

操作系统可以分为内核空间和用户空间，用户空间安装了用户需要的程序，内核空间只有内核，LVS需要两个部分的程序：IPVS和IPVSadmin，其中IPVS工作在内核空间实现了OSI模型的部分功能，IPVSadmin工作在用户空间，实现了对IPVS的修改，LVS目前在用的有三种模式：NAT,TUN,DR模式，第四种模式目前正在开发

- NAT模式：

  负载均衡服务器和用户在公网，服务器在内网

  用户访问网站时访问到了负载均衡服务器的外网卡，LVS分配服务器，使用DNAT目标地址端口转换，通过内网网卡链接到服务器

  服务器发送对象的时候发**送到负载均衡服务器(否则用户看到源地址不对不收)**，LVS使用SNAT源地址端口转换，修改socket的源地址为自己的外网IP,转发回去

  特点是

  - 来回都要负载均衡服务器
  - 负载均衡服务器一定程度扮演了网关的作用
  - 支持端口映射

- TUN模式：

  服务器，负载均衡服务器，用户都在外网，但是负载均衡服务器和工作服务器不在一个广播域

  用户发送请求到负载均衡服务器，负载均衡服务器不修改目标IP，而是在数据包外面重封装了一个数据包，源IP是用户的，目标IP是真实服务器的

  真实服务器去掉包装，处理数据，使用内层的目标IP(负载均衡服务器IP)作为源IP，使用内层的源IP(用户IP)作为目标IP，发送回应对象

  特定是：

  - 两次借用公网IP，速度慢
  - 压力大

- DR模式[负载能力最高]：

  服务器，负载均衡服务器，用户都在外网，但是负载均衡服务器和工作服务器**在一个广播域**，也就是负载均衡服务器和工作服务器是同级别的

  用户发起请求到负载均衡服务器，负载服务器转发到真实服务器，这次转发与NAT不同的是这次转发没有修改请求的目标IP,而是修改了请求的目标mac,由于负载均衡服务器和工作服务器是字啊一个广播域的，交换机可以通过MAC对请求进行转发，**正常情况下，服务器收到了这个包，发现mac是自己的，但是IP不是自己的，不会收，但是我们在服务器上多设置了一个IP，IP地址与负载均衡服务器是一样的，于是服务器就会收下，但是这个IP是不能暴露的，只能用于通过MAC收到数据包验证用，否则就IP冲突了，于是我们需要把IP隐藏起来**，

  返回文件的时候，服务器**不经过负**载均衡服务器，直接用隐藏的IP发送数据包，客户机看到双方IP与端口都是对的，于是接受。

  特点是：

  - 由于负载均衡服务器转发使用的是MAC,所以必须在一个广播域

  - 真实服务器回应无需负载均衡服务器(高并发原因)
  - 不支持端口映射(根本就没有触碰到传输层)

- TUN和DR的区别就是DR的机器都在一个广播域，可以通过修改MAC的方式实现数据包的转发，但是TUN不再一个广播域，就必须改IP，最后两者返回数据的方式都是将IP改为负载服务器IP返回的



#### 实验环境配置

- 物理机安装**Chrome**，由于浏览器缓存，可能无法明显感知服务器的切换，安装后使用无痕模式可以解决这个问题

- 6台CentOS7 BaseServer 服务器

- 1台CentOS7 GUI 桌面服务器

- 关闭防火墙 SELinux

- 网络选择仅主机(Host-Only)

  配置网卡地址10.10.10.01/24

  关闭DHCP服务器

  虚拟机IP从10.10.10.11开始命名

- 虚拟机配置双网卡 全部是HostOnly==?==

- 1G内存

- 配置6台机器为静态IP

  ```bash
  vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
      # 修改
      BOOTPROTO="static"
      IPADDR=10.10.10.11
      NETMASK=255.255.255.0
  systemctl restart network.service 
  ```

  使用物理机ssh尝试连接

- 配置本地yum源

  ```bash
  mkdir /mnt/cdrom
  mount -t iso9660 /dev/cdrom /mnt/cdrom/
  cd /etc/yum.repos.d/
  mkdir ./CentBak
  mv *.repo CentBak/
  cp ./CentBak/CentOS-Media.repo ./
  vim CentOS-Media.repo
      baseurl=file:///media/CentOS/
              file:///media/cdrom/
              file:///media/cdrecorder/
      gpgcheck=1
      enabled=0
      # 改为
      baseurl=file:///mnt/cdrom	# 改路径
      gpgcheck=0					# 不检查gpg
      enabled=1					# 启动
  yum clean all && yum makecache
  yum install gcc gcc-c++ lrzsz	# 安装编译器 文件上传工具(如果是xshell)
  ```

#### LVS-DR模式构建

需要三台虚拟机：

- 机器C：客户机 物理机 192.168.177.162
- 机器D：负载均衡服务器 虚拟机1 网卡1(enpxxx)：10.10.10.11 网卡1(enpxxx)浮动：10.10.10.100
- 机器RS1：服务器1 虚拟机2 网卡1(enpxxx)：10.10.10.12 网卡0(lo)浮动：10.10.10.100
- 机器RS2：服务器2 虚拟机3 网卡1(enpxxx)10.10.10.13 网卡0(lo)浮动：10.10.10.100

**原理**

- 物理机C访问负载均衡服务器D网卡2 10.10.10.100

- 负载均衡服务器D进行负载均衡计算，修改DMAC，用网卡1 10.10.10.11 发到广播域
- 其他服务器修改lo卡 为10.10.10.100，接受数据报文

**ARP 通讯行为**

ARP响应级别(arp-ignore)：数据报文到达网口后是否响应

- 0级别(默认)：只要收到了本机配置的IP就响应

- 1级别：只有发送到了接受网卡的IP上才响应

  例如负载均衡服务器D有10.10.10.11 和 10.10.10.100 两张卡，10.10.10.11卡收到了一个发给10.10.10.100卡的报文，如果是0级别，发现本机有10.10.10.100 于是会手下，如果是1级别，发现不是本卡IP10.10.10.11就不接受

ARP通告级别：

- 0级别：将本机上的**所有**的网络接口地址都进行通告(例如网卡上电后会向网络中中广播自己的地址)
- 1级别：尽可能避免0的情况，倾向于2,但是不保证，尽量仅向该网卡回应与该网段匹配的ARP报文
- 2级别：只向网络中通告自己的IP，MAC

这样，我们将配置修改为1,2，这样实际服务器的网卡2lo 不会主动接受发给10.10.10.12的消息，也不往外说

**负载均衡服务器操作**

- 关闭所有虚拟机的`NetworkManager`

  ```bash
  [root@C7B1 ~]# systemctl stop NetworkManager
  [root@C7B1 ~]# systemctl disable NetworkManager
  ```

  这个服务主要是负责Linux的无线网络服务和危险网络策略的关闭，我们需要关闭这个服务，注意：服务名区分大小写

- 开启网卡的子接口：也就是一块网卡两个IP地址

  ```bash
  [root@C7B1 network-scripts]# cp ifcfg-enp0s3 ifcfg-enp0s3:0
  [root@C7B1 network-scripts]# vim !$						# !$ 上一条命令最后一个参数
  ```

  修改复制过去的配置文件

  ```diff
  - IPADDR=10.10.10.11
  + IPADDR=10.10.10.100
  - DEVICE="enp0s3"
  + DEVICE="enp0s3:0"
  - NAME="enp0s3"
  - UUID="9b24b2da-f8e2-45c9-81dd-e3b364066858"
  ```

  重启网络服务

  ```bash
  [root@C7B1 network-scripts]# systemctl restart network
  ```

  这里复制的接口IP相当于是浮动IP,可以认为原来的IP是绝对IP,浮动IP通常是一个公开的、可以路由到的IP地址，并且不会自动分配给实体设备。项目管理者临时分配动态IP到一个或者多个实体设备。这个实体设备有自动分配的静态IP用于内部网间设备的通讯。这个内部网使用私有地址，这些私有地址不能被路由到。通过浮动IP内网实体的服务才能被外网识别和访问。在一个配置好浮点IP的切换场景是，IP地址飘到网络中的另一台设备。新设备无延迟的接替当掉的设备，并对外提供服务。

- 修改内核文件`/etc/sysctl.conf`设置ARP关闭网卡的广播，这是一个优化功能，不强制要求，追加

  ```bash
  net.ipv4.conf.all.send_redirects = 0 
  net.ipv4.conf.default.send_redirects = 0 
  net.ipv4.conf.enp0s3.send_redirects = 0 
  ```

  `sysctl -p`刷新内核

- 安装ipvsadm

  ```bash
  yum install ipvsadm
  ```

- 将ipvs加入到系统内核

  ```bash
  modprobe ip_vs
  ```

- 配置IPVS

  `ipvsadm`命令用来添加LVS规则

  - `-A`添加一个集群
  - `-a`添加集群的节点
  - `-t` tcp协议
  - `-s`算法

  ```bash
  ipvsadm -A -t 10.10.10.100:80 -s rr			# 轮询
  ipvsadm -a -t 10.10.10.100:80 -r 10.10.10.12:80 -g
  ipvsadm -a -t 10.10.10.100:80 -r 10.10.10.13:80 -g
  ```

  保存配置的规则

  ```bash
  ipvsadm -S > /etc/sysconfig/ipvsadm
  ```

**真实服务器的操作**

- 启动Apache用于测试，写一个网页用来标识

  ```bash
  [root@C7B2 ~]# systemctl start httpd
  [root@C7B2 ~]# echo "S1" > /var/www/html/index.html
  ```

- 设置浮动IP，对lo卡复制接口，因为LVS服务器在广播自己是 10.10.10.100，你不能在一个内网中广播地址中设置同IP了(当然可以通过后面修改启动文件解决)，于是使用了广播地址不同的lo卡

  ```bash
  DEVICE=lo:0
  IPADDR=10.10.10.100
  NETMASK=255.255.255.255			# 修改子网掩码防止和真实IP冲突
  NETWORK=127.0.0.0
  ```

- 设置ARP,`/etc/sysctl.conf`

  ```bash
  net.ipv4.conf.all.arp_ignore = 1
  net.ipv4.conf.all.arp_announce = 2
  net.ipv4.conf.default.arp_ignore = 1
  net.ipv4.conf.default.arp_announce = 2
  net.ipv4.conf.lo.arp_ignore = 1
  net.ipv4.conf.lo.arp_announce = 2
  ```

  重启网络服务

- 当负载均衡服务器转发请求到lo:0的时候需要有网关进行转交

  ```bash
  [root@C7B2 network-scripts]# route add -host 10.10.10.100 dev lo:0
  [root@C7B2 network-scripts]# echo "route add -host 10.10.10.100 dev lo:0" >> /etc/rc.local 		# 添加到自启动
  ```

**在物理机上访问10.10.10.100**

使用`ipvsadm -Ln --stats`查看状态

**关闭DR模式**：

- LVS服务器：移除`/etc/sysctl.conf`
- LVS服务器：关闭LVS`ipvsadm -D -t 10.10.10.100:80`
- LVS服务器：删除LVS服务器配置文件`/etc/sysconfig/ipvsadm`
- LVS服务器：删除浮动IP配置
- 真实服务器：删除浮动IP配置文件
- 真实服务器：删除ARP配置`/etc/sysctl.conf`
- 真实服务器：关闭网关自启`/etc/rc.local`

#### LVS-NAT模式构建

需要三台虚拟机：

- 机器C：客户机 物理机 192.168.177.162
- 机器D：负载均衡服务器 虚拟机1 内网卡1(enpxxx)：10.10.10.11 公网卡2(enpxxx)：20.20.20.11
- 机器RS1：服务器1 虚拟机2 内网卡1(enpxxx)：10.10.10.12
- 机器RS2：服务器2 虚拟机3 内网卡1(enpxxx)10.10.10.13

**负载均衡服务器**

- 关闭NetworkMangaer

- 安装ipvsadm

- 编辑文件 开启路由转发`/etc/sysctl.conf`

  ```bash
  et.ipv4.ip_forward = 1
  ```

  `sysctl -p`启用

- 开启防火墙SNAT转发(服务器到客户端)

  ```bash
  systemctl start firewalld
  firewall-cmd --zone=trusted --change-interface=enp0s3
  firewall-cmd --zone=trusted --change-interface=enp0s8
  firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.10.10.0/24 -j SNAT --to-source 20.20.20.11
  # 将所有10.10.10.0网段的数据(真实服务器的)使用外网网卡转发
  ```

- 配置ipvs(客户端到服务器)

  ```bash
  ipvsadm -D -t 10.10.10.100:80				# 清除DR模式的规则
  ipvsadm -A -t 20.20.20.11:80 -s rr
  ipvsadm -a -t 20.20.20.11:80 -r 10.10.10.12:80 -m
  ipvsadm -a -t 20.20.20.11:80 -r 10.10.10.13:80 -m
  ipvsadm -S > /etc/sysconfig/ipvsadm
  ipvsadm -Ln
  ```

- 配置网关,就是服务器什么要发的都先发给负载均衡，追加网卡配置文件(服务器到客户端)

  ```bash
  GATEWAY=10.10.10.11
  ```

**关闭NAT模式**：

- LVS服务器：关闭路由转发路由转发`/etc/sysctl.conf`

- LVS服务器：关闭SNAT

  ````bash
  firewall-cmd --permanent --direct --remove-passthrough ipv4 -t nat -A POSTROUTING -s 10.10.10.0/24 -j SNAT --to-source 20.20.20.11
  ````

- 客户服务器：修改网卡网关配置

#### 负载均衡调度算法

有通用算法和LVS持久链接算法，后者是仅对LVS有效

**通用固定算法**：固定算法指的是不考虑服务器的实际状况，直接使用算法产生调度策略

- RR轮询算法：将请求按顺序循环分配给后端服务器
- WRR加权轮询算法：按照一定的权重进行轮询，例如给配置好的服务器大权重，访问次数多一点
- SH源地址散列算法：将来源IP做hash，选定服务器，一个IP每次都链接到了一个服务器，优点就是对cookie优化良好(对不使用分布式存储服务器)
- DH目标地址散列算法：方便用户高概率命中特定类型的缓存

**通用动态算法**：

- LC最少连接算法：将新连接分配给连接数最少的服务器，计算方式是**活动连接数*256+非活动连接**

  活动连接指的是正在传输数据的连接

  非活动连接指的是刚刚握手或者握手结束的连接

- WLC加权最少连接：将新连接分配给加权后连接数最少的服务器，也就是**(活动连接数*256+非活动连接)/权重**

- SED最短期望延时：WLC存在一个问题，当计算结果相同的时候会将连接按照服务器列表顺序分配，可能大权重服务器在后面，我们想将请求分配到大权服务器，但是按照WLC的原理可能会分配给小权服务器，于是有了SED**(活动数+1)*256/权重**，他保证了第二关键字为权重

- NQ永不排队算法：特殊的SED，如果有连接数为0的空闲服务器就直接分配

- LBLC算法：特殊的DH算法，当负载均衡服务器发现某个特定的缓存服务器压力过大的时候会自动再开一个缓存服务器轮询提供缓存服务

- LBRCR算法：支持多缓存服务器数据交互

**LVS持久化连接**

- SSL等协议需要建立消耗资源的握手，但是非SH算法会造成重复多次消耗资源的握手
- LVS引入了持久化连接实现了类似SH和RR的融合使用
- 负载均衡服务器记录了客户端与服务器的连接对应关系，当持久化倒计时结束后会进行轮询

分类：

- PCC持久客户端连接：客户端访问LVS集群的时候，同一个客户端IP会重定向到一个服务器

  ```bash
  ipvsadm -A -t 20.20.20.11:80 -s wlc -p 120
  ```

- PPC持久端口连接：客户端访问LVS集群的时候，同一个客户端的同一个端口会重定向到一个服务器

  ```bash
  ipvsadm -A -t 20.20.20.11:80 -s rr -p 120
  ```

- PFMC持久防火墙标记连接：根据客户端的源地址，端口，数据端属性等对客户进行标记，根据标记分配到不同客户 

- 使用`ipvsadm -Ln --persistent-conn`看到处于可持久化连接

###  高可用集群

通过心跳检测将不可用集群踢出ipvs

#### KeepAlived

KeepAlived是专门为LVS/HA设置的健康检查工具，支持鼓掌自动切换与节点状态检查

KeepAlived使用VRRP虚拟路由冗余协议，这个协议是一个浮动IP的竞争协议，一个节点挂掉之后，其他的节点会竞争浮动IP，选出的服务器会继续使用这个浮动IP

#### LVS-NAT+脚本高可用负载均衡

LVS默认是不支持高可用KeepAlive的，可以用户脚本实现

```bash
mkdir /usr/local/script
cd /usr/local/script
vim kav.sh
chmod 755 kav.sh 
```

写入脚本

```bash
#!/bin/bash
#检测lvs集群节点是否正常，不正常则踢出集群

VIP=20.20.20.11	#集群虚拟IP
CPORT=80	#定义集群端口
FAIL_BACK=127.0.0.1	#本机回环地址
RS=("10.10.10.12" "10.10.10.13")	#编写集群地址
declare -a RSSTATUS  #变量RSSTATUS定义为数组态
RW=("2" "1")
RPORT=80	#定义集群端口
TYPE=g	  #制定LVS工作模式：g=DR m=NAT
CHKLOOP=3
LOG=/var/log/ipvsmonitor.log

#添加RS，添加成功返回0，否则返回1
addrs() {
  ipvsadm -a -t $VIP:$CPORT -r $1:$RPORT -$TYPE -w $2
  [ $? -eq 0 ] && return 0 || return 1
}

#删除RS，删除成功返回0，否则返回1
delrs() {
  ipvsadm -d -t $VIP:$CPORT -r $1:$RPORT
  [ $? -eq 0 ] && return 0 || return 1
}

#检测RS服务是否在线，注意一下这里面指的RS的服务，如果连续三次都监测不通，则返回1，否则返回0
checkrs() {
  local I=1
  while [ $I -le $CHKLOOP ]; do
	if curl --connect-timeout 1 http://$1 &> /dev/null; then
	  return 0
	fi
	let I++
  done
  return 1
}

#初始化RS在线状态，如果在线，设置节点初始化状态为1，否则为0
initstatus() {
  local I
  local COUNT=0;
  for I in ${RS[*]}; do
	if ipvsadm -L -n | grep "$I:$RPORT" && > /dev/null ; then
	  RSSTATUS[$COUNT]=1
	else
	  RSSTATUS[$COUNT]=0
	fi
  let COUNT++
  done
}

#进行初始化
initstatus

#监测rs是否加入到ipvs
	  if [ ${RSSTATUS[$COUNT]} -eq 1 ]; then
		 delrs $I
		 [ $? -eq 0 ] && RSSTATUS[$COUNT]=0 && echo "`date +'%F %H:%M:%S'`, $I is gone." >> $LOG
	  fi
	fi
	let COUNT++
  done
  sleep 5
done
```

运行即可，关闭20.20.20.12的httpd后，查看`ipvsadm -Ln`服务器少了一个

**LVS高可用配置**：在这样的高可用中，如果LVS挂掉，整个服务就挂掉了，所以，还需要配置多个LVS以实现高可用

#### LVS-DR+KeepAlived高可用负载均衡

需要四台虚拟机：

- 机器C：客户机 物理机 192.168.177.162
- 机器LVS-M：主高可用负载均衡服务器1 虚拟机1 网卡1(enpxxx)：10.10.10.11 网卡1(enpxxx)浮动：10.10.10.100
- 机器LVS-S：备份高可用负载均衡服务器2 虚拟机**4** 网卡1(enpxxx)：10.10.10.14 网卡1(enpxxx)浮动：10.10.10.100
- 机器RS1：服务器1 虚拟机2 网卡1(enpxxx)：10.10.10.12 网卡0(lo)浮动：10.10.10.100
- 机器RS2：服务器2 虚拟机3 网卡1(enpxxx)10.10.10.13 网卡0(lo)浮动：10.10.10.100

首先是LVS-M作为主负载均衡服务器运行，心跳检测RS1与RS2，宕机就踢出去，同时LVS-S作为从负载均衡服务器心跳检测LVS-M，如果主负载均衡服务器宕机就立马接替

**LVS-M,RS1,RS2配置**

- 按照普通LVS-DR构建集群，使用虚拟机1,2,3

**主负载均衡心跳检测服务器LVS-M**

- 安装keeplived(光盘源有)

  ```bash
  yum install -y keepalived
  ```

- 启动并设置自启动

  ```bash
  systemctl start keepalived
  systemctl enable keepalived
  ```

- 配置文件：`/etc/keepalived/keepalived.conf`

  ```bash
  ! Configuration File for keepalived
  
  global_defs {
     notification_email 
       ...
     smtp_connect_timeout 30		# 挂掉后邮件通知配置 我们不使用
     router_id LVS_DEVEL			# 当前机器在keepalive的别名
     vrrp_skip_check_adv_addr
     vrrp_strict
     vrrp_garp_interval 0
     vrrp_gna_interval 0
  }
  
  vrrp_instance VI_1 {
      state MASTER				# 这是什么服务器
      interface eth0				# 用哪个网卡检测
      virtual_router_id 51		# 当前高可用ID
      priority 80		 		    # 权重设置 建议主比一级从高50 
      advert_int 1				# 心跳时间
      authentication {			# 身份认证模式
          auth_type PASS			# 密码认证
          auth_pass 1111			# 密码
      }
      virtual_ipaddress {
          192.168.200.16			# 集群LVS的IP地址
          192.168.200.17
          192.168.200.18
      }
  }
  
  virtual_server 192.168.200.100 443 {	# LVS服务器IP 端口
      delay_loop 6				# 检测间隔
      lb_algo rr					# 轮询设置
      lb_kind NAT					# LVS模式
      persistence_timeout 50		# 检测时间
      protocol TCP
  
      real_server 192.168.201.100 443 {	# 真实服务器信息
          weight 1						# 权重
          SSL_GET {
              url {
                path /
                digest ff20ad2481f97b1754ef3e12ecd3a9cc
              }
              url {
                path /mrtg/
                digest 9b3a0c85a887a256d6939da88aabd8cd
              }
              connect_timeout 3
              nb_get_retry 3
              delay_before_retry 3
          }
      }
  }
  ```

  进行配置

  ```bash
  global_defs {
     router_id KPA01
  }
  
  vrrp_instance VI_1 {
      state MASTER
      interface enp0s3
      virtual_router_id 66
      priority 80
      advert_int 1
      authentication {
          auth_type PASS
          auth_pass 1111
      }
      virtual_ipaddress {
  		10.10.10.100
      }
  }
  
  virtual_server 10.10.10.100 80 {
      delay_loop 2					# 监测频率
      lb_algo rr
      lb_kind DR
      protocol TCP
  
      real_server 10.10.10.12 80 {	# 管理的网站节点以及使用端口 
          weight 1
  	TCP_CHECK {
  	    connect_port 80 			# 检查的目标端口 
  	    connect_timeout 3 			# 连接超时（秒） 
  	    nb_get_retry 3 				# 重试次数 
  	    delay_before_retry 4		# 重试间隔（秒）
  	} 
      }
      real_server 10.10.10.13 80 {
          weight 1
          TCP_CHECK {                
              connect_port 80                   
              connect_timeout 3                 
             nb_get_retry 3           
              delay_before_retry 4
          } 
      }
  }
  ```
  

查看状态

  ```bash
  cat /var/log/messages 
  ```

  看到有： `Sending gratuitous ARP on enp0s3 for xxx.xxx.xxx.xxx`

  看到负载均衡允许正常，真实服务器关闭后，`ipvsadm -Ln`自动踢走

**备份负载均衡心跳检测服务器LVS-S**

我们也需要和LVS-M一样复制网络端口，设置10.10.10.100的浮动IP，但是与真实服务器不同的是：这个浮动IP没有设置ARP响应级别，所以会出现一个广播地址中有冲突IP的问题，这个服务器不能和真实服务器一样，说要用浮动IP就用，需要等LVS-M宕机后才可以使用浮动IP，KeepAlived实现了ARP的管理功能解决了这个问题。

- 按照LVS-DR模式的负载均衡服务器配置机器

- 重启网络看到，查看网络状态看到网卡启动失败

  ```bash
  [root@C7B4 network-scripts]# systemctl restart network
  [root@C7B4 network-scripts]# systemctl status network
  ...
  4月 16 09:37:09 C7B4 network[3026]: ERROR     : 4月 16 09:37:09 C7B4 network[3026]: ERROR     : [/etc/sysconfig/network-scripts/ifup-aliases] Error, some other host () already uses address 10.10.10.100.
  ...
  ```

- 修改网卡启动脚本

  ```bash
  vim /etc/sysconfig/network-scripts/ifup-eth 
  ```

  我们需要搜索报错信息，有空格，要这样搜索：`/already\ uses\ address`

  找到如下代码片

  ```bash
  if [ "${REALDEVICE}" != "lo" ] && [ "${arpcheck[$idx]}" != "no" ] ; then
      ARPING=$(/sbin/arping -c 2 -w ${ARPING_WAIT:-3} -D -I ${REALDEVICE} ${ipaddr[$idx]})
      if [ $? = 1 ]; then
          ARPINGMAC=$(echo $ARPING |  sed -ne 's/.*\[\(.*\)\].*/\1/p')
          net_log $"Error, some other host ($ARPINGMAC) already uses address ${ipaddr[$idx]}."
          exit 1
      fi
  fi
  ```

  意思是通过ARP检查是否冲突，冲突就报错终止，解决方法很简单，直接注释掉

  ```bash
  if ! LC_ALL=C ip addr ls ${REALDEVICE} | LC_ALL=C grep -q "${ipaddr[$idx]}/${prefix[$idx]}" ; then
  #    if [ "${REALDEVICE}" != "lo" ] && [ "${arpcheck[$idx]}" != "no" ] ; then
  #    ARPING=$(/sbin/arping -c 2 -w ${ARPING_WAIT:-3} -D -I ${REALDEVICE} ${ipaddr[$idx]})
  #        if [ $? = 1 ]; then
  #            ARPINGMAC=$(echo $ARPING |  sed -ne 's/.*\[\(.*\)\].*/\1/p')
  #            net_log $"Error, some other host ($ARPINGMAC) already uses address ${ipaddr[$idx]}."
  #            exit 1
  #    fi
  #fi
  ...
  ```

  重启网络服务开启网卡

  复制配置文件，修改state为SLAVE，修改权重为80-50=30

  ```bash
  scp root@10.10.10.11:/etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf 
  ```

  **实际上，KeepAlived配置文件里面已经写有集群配置文件，可以不配置ipvsadm**

  **测试**

  ipvs是一个内核服务，不可用的唯一原因是系统崩了，我们关闭主服务器，网页正常负载均衡

#### Nginx+HeartBeat实现高可用

HeartBeat是Linux-HA(HighAvailability)的一个组件

需要两台虚拟机：

- 机器C：客户机 物理机 192.168.177.162
- 机器SR1：Nginx服务器1 虚拟机1 网卡1(enpxxx)：10.10.10.11 网卡1(enpxxx)浮动：10.10.10.100 主机名C7B1
- 机器SR2：Nginx服务器2 虚拟机2 网卡1(enpxxx)：10.10.10.12 网卡1(enpxxx)浮动：10.10.10.100 主机名C7B2

没有负载均衡服务器，两台服务器全跑在公网上，浮动一个10.10.10.100，互相心跳检测，不必担心公网IP上能否浮动IP，修改网卡配置文件后出现冲突IP相当于是进行了一次ARP攻击

**双虚拟机配置**

- 配置yum 163-Base与epel源`yum -y install epel-release`

- 双机器 联网 安装Nginx 修改index页面

- 在HeartBeat3中，一个项目被拆解成三个子项目了，要去[官网](http://www.linux-ha.org/wiki/Download)下载三个包：Heartbeat，Cluster Glue，Resource Agents

  安装Cluster Glue

  ```bash
  yum install -y libxml2-devel.i686 docbook-style-xsl asciidoc gcc gcc-c++ autoconf automake libnet  libtool glib2-devel libxml2-devel bzip2-devel e2fsprogs-devel libxslt-devel libtool-ltdl-devel docbook-dtds docboot-style-xsl libtool-ltdl-devel
  tar -xf 0a7add1d9996.tar.bz2 
  cd Reusable-Cluster-Components-glue--0a7add1d9996/
  ./autogen.sh
  ./configure \
  --prefix=/opt/heartbeat/ \
  --sysconfdir=/etc/heartbeat \
  libdir=/opt/heartbeat/lib64 \
  LIBS='/usr/lib64/libuuid.so.1'
  make
  make install
  ```

  安装resource-agents

  ```bash
  yum -y install libnet* glib2-devel libtool-ltdl-devel net-snmp-devel bzip2-devel ncurses-devel openssl-devel libtool libxml2-devel gettext gettext-devel bison flex zlib-devel mailx which libxslt-devel docbook-dtds docbook-style-xsl PyXML shadow-utils opensp e2fsprogs-devel autoconf automake libuuid-devel instltool libaio-devel libxslt-devel gcc make pkgconfig libxml2 libuuid-devel
  tar -xf resource-agents-3.9.6.tar.gz 
  cd resource-agents-3.9.6/
  ./autogen.sh 
  ./configure \
  --prefix=/opt/heartbeat/ \
  --sysconfdir=/etc/heartbeat \
  libdir=/opt/heartbeat/lib64 \
  CFLAGS=-I/opt/heartbeat/include \
  LDFLAGS=-I/opt/heartbeat/lib64 \
  LIBS='/usr/lib64/libuuid.so.1'
  ln -s /opt/heartbeat/lib64/* /usr/lib64 
  make
  make install
  ```

  安装Heartbeat

  ```bash
  tar -xvf 958e11be8686.tar.bz2 
  cd Heartbeat-3-0-958e11be8686/
  ./bootstrap
  ./configure \
  --prefix=/opt/heartbeat \
  --sysconfdir=/etc/heartbeat \
  CFLAGS=-I/opt/heartbeat/include \
  LDFLAGS=-L/opt/heartbeat/lib64 \
  LIBS='/usr/lib64/libuuid.so.1'
  #修改源码文件，否则会make报错
  vim /opt/heartbeat/include/heartbeat/glue_config.h # 注释或者删除最后一行内容
  vim lib/hbclient/Makefile #删掉-Werror字段
  make
  make install
  ```

- 开启时间同步服务：一台服务器安装ntp服务

  ```bash
  yum install -y ntp
  ```

  配置`/etc/ntp.conf`

  ```bash
  restrict 10.10.10.0 mask 255.255.255.0 nomodify notrap
  # 上面修改为当前网段 掩码
  restrict ::1
  
  # Hosts on local network are less restricted.
  #restrict 192.168.1.0 mask 255.255.255.0 nomodify notrap
  
  # Use public servers from the pool.ntp.org project.
  # Please consider joining the pool (http://www.pool.ntp.org/join.html).
  # server 0.centos.pool.ntp.org iburst	# 注释掉预设的时间服务器
  # server 1.centos.pool.ntp.org iburst
  # server 2.centos.pool.ntp.org iburst
  # server 3.centos.pool.ntp.org iburst
  server 127.127.1.0						
  # 设置时间服务器为本机(本地回环地址:127.0.0.1->127.255.255.254) 必须这样写 
  fudge 127.127.1.0 stratum 10
  # 时间服务器的层次 配置为局域网级别10
  ```

  启动服务`systemctl start ntpd`

- 开启时间同步服务：另一台机器安装时间同步客户端

  ```bash
  yum install -y ntpdate
  ntpdate -u 10.10.10.11		# 进行同步
  ```

- 双机器 配置主机名，节点之间是通过主机名heartbeat检测的，不能相同

- 双机器 开启主机名解析(正常使用DNS，直接改`/etc/hosts`也可以)

  ```bash
  10.10.10.11 C7B1
  10.10.10.12 C7B2
  ```

- 拷贝配置文件

  ```bash
  cd /opt/heartbeat/share/doc/heartbeat/
  cp ha.cf authkeys haresources /etc/heartbeat/		# 配置文件目录默认是/etc/ha.d 我在编译的时候指定了，所以变了
  ```

- 配置认证文件`authkeys`

  `dd if=/dev/random bs=512 count=1 | openssl md5`配置文件需要一个md5码作为密钥，我们可以使用dd随机生成一个，将文件修改为

  ```bash
  auth 3				# 选择第三个认证方式
  1 crc
  2 sha1 HI!
  3 md5  3a987d0f396bb9e29606148a8c1eb99f		# 使用md5
  ```

  修改配置文件权限600，否则和vsftp一样会报错安全性

- 配置主配置文件`ha.cf`

  ```diff
  - #bcast  eth0             # Linux
  + bcast  enp0s3            # 使用哪张网卡做心跳检测
  - #node   ken3
  - #node   kathy
  + node    C7B1
  + node    C7B2				# 所有主机名
  ```

- 配置脚本文件`haresources`：Heartbeat默认提供了很多的配置文件，我们选的这个是用来做IP切换的

  ```diff
  - #node1  10.0.0.170 Filesystem::/dev/sda1::/data1::ext2
  + C7B1 IPaddr::10.10.10.100/24/enp0s3:0		# 注意修改主机名
  ```

  这个脚本的作用相当于为我们配置了网卡接口，同时还做好了防止冲突，正确切换的操作

- 测试：正常可以访问，关掉一个机器可以访问另一个，注意，这个与之前修改网卡配置不同，这个是哪个服务器工作，哪个服务器才复制端口，非主机是不复制网卡的

**注意，heartBeat是检测网络是否可用判断是否宕机，如果网络正常Nginx宕机，是不会切换的**

修复思路是：循环检测，如果发现Nginx宕机，立刻关闭heartBeat

```bash
[root@localhost ~]$ mkdir /usr/local/script
[root@localhost ~]$ vim 80.sh
#!/bin/bash

PWD=/usr/local/script/

URL="http://10.10.10.11/index.html"

HTTP_CODE=`curl -o /dev/null -s -w "%{http_code}" "${URL}"` 


if [ $HTTP_CODE != 200 ]
    then
	service heartbeat stop
fi
[root@localhost ~]$ crontab -e
*/1 * * * * bash /usr/local/script/80.sh
```

### 多级负载

X层负载：服务运行在OSI七层的哪一层，例如七层负载的Nginx，四层负载的LVS

Nginx负载均衡支持虚拟主机，LVS支持高负载，考虑只有一个公网IP，想要做虚拟主机到两个网站，但是需要LVS高负载，可以使用多级负载，原理是：客户访问到LVS服务器，LVS负责了多个Nginx的负载均衡(一个Nginx的话LVS就没有意义了)，Nginx做虚拟主机负载均衡到Apache

需要六台虚拟机：

- 机器C：客户机 物理机 192.168.177.162
- 机器LVS-DR：LVS负载均衡服务器 虚拟机1 网卡1(enpxxx)：10.10.10.11 网卡1(enpxxx)浮动：10.10.10.100
- 机器Ngx1：Nginx虚拟主机负载均衡服务器1 虚拟机2 网卡1(enpxxx)：10.10.10.12  网卡1(enpxxx)浮动：10.10.10.100
- 机器Ngx2：Nginx虚拟主机负载均衡服务器2 虚拟机3 网卡1(enpxxx)：10.10.10.13  网卡1(enpxxx)浮动：10.10.10.100
- 机器RS1：Apache服务器1-1 虚拟机1 网卡1(enpxxx)：10.10.10.14 
- 机器RS2：Apache服务器1-2 虚拟机2 网卡1(enpxxx)：10.10.10.15 
- 机器RS3：Apache服务器2-1 虚拟机3 网卡1(enpxxx)：10.10.10.16 

**机器RS1,2,3**

- 开启Apache，分别写入页面

**机器Ngx1,2**

- 安装Nginx

- 配置文件

  ```bash
      upstream demo1.com{
          server 10.10.10.14:80;
          server 10.10.10.15:80;
      }
  
      upstream demo2.com{
          server 10.10.10.16:80;
      }
  
      server {
          listen       80;
          server_name  www.demo1.com;
          location / {
              proxy_pass http://demo1.com;
          }
      }
  
      server {
          listen       80;
          server_name  www.demo2.com;
          location / {
              proxy_pass http://demo2.com;
          }
      }
  ```

- 物理机修改Host文件测试

**LVS-DR配置**

按照LVS-DR配置LVS服务器，Nginx作为“真实服务器”

**测试**

物理机修改host测试































