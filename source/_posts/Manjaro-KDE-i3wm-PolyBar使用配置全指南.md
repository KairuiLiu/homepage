---
title: Manjaro - KDE - i3wm - PolyBar 配置笔记
date: 2020-10-31 00:00:17
toc: true
description: 本文介绍了Manjaro-KDE桌面版的安装，polybar+i3 的配置
categories:
  - [瞎搞,Linux]
tags:
  - Linux
  - Manjaro
  - KDE
  - i3wm
  - PolyBar

---

==本文全部内容几乎没有作者原创，全文为多篇带佬文章拼接而成，作以备份，勿喷!!!==

# 0. 安装之前的准备
需要一个U盘以及一个能制作启动盘的电脑。  
**如果您准备搞双系统或者准备重装双系统，请先阅读最后一节 4. 优雅的清除Manjaro(双系统用户)**

# 1.Manjaro-KDE的安装

> 1.1-1.8的绝大部分内容来自[知乎文章](https://zhuanlan.zhihu.com/p/114296129)

==想要获得更好的阅读体验，可以查看知乎原文，但是在转载的时候进行了修改，建议两边都阅读==

Manjaro是当前Linux发行版排名第一(第二??)的系统，而KDE是一个可玩性比较高的桌面。  
去manjaro官网下载系统，官方提供三种桌面环境，笔者都体验过，目前觉得KDE最合心意，功能最多，用起来也最顺手，对新手也友好，推荐各位使用。  
**Xfce桌面**是最为轻量的官方版本，系统占用很小，你可以尝试给家里面的老电脑装一个xfce，但是缺点也很明显，桌面可定制性最差，一开始我装的就是xfce，然后因为它的环境太简陋了，所以就转向了KDE  
**KDE**是三者之中可玩性最高，功能最强大的桌面环境，系统占用也不大，对于各位的主力机来说，我觉得这个大可不必在意。  
**Gnome**：3.36以后的Gnome功能加了好多，但还是老问题：各种各样的扩展导致桌面不稳定，不建议入手Gnome版本，就算你是Gnome老用户，我还是强烈建议你使用KDE  
**注意**：这里只针对Manjaro定制的Gnome，并不是所有发行版的Gnome都这样  
另外DDE之前我做过推荐，但是DDE对于WiFi的支持太差，不建议使用

## 1.1 下载系统
去[Manjaro官网](https://manjaro.org/)下载系统：选择"Try Manjaro download"，选择橙色按钮 "Get KDE Plasma   20.0.3" 下载即可

## 1.2 制作启动U盘
下载iso文件之后，使用 rufus 将其写入到U盘中，网上比较旧的攻略会有dd模式写入的说法，现在没有这个选项了，直接写入就可以，注意写入之后你的U盘可见空间会变为几MB，莫惊慌  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817164948557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
**关于恢复U盘空间的方法**  
当然这样U盘里的Manjaro安装文件就没了。右键"计算机" - 管理 - 存储磁盘 - 找到你的U盘 - 对所有的分区(方块)右键 - 删除卷 - 最后得到一个叫做为分配的黑色块 - 右键 - 新建简单卷 - 一路下一步即可

## 1.3  安装系统前的BIOS设置
插入U盘 - 重启 - 进入BIOS界面 - 关闭Secure Boot和Lanuch CSM(有选项就关闭，没有就不管) - 选择U盘第一启动顺序

## 1.4 正式安装系统
从U盘启动后会看到如下界面  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817170249466.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

1. 选择lang - 去最下面找中文 - 然后选 zh-cn(简体中文)  
2. 选择driver - 如果你的电脑是Nvida的独显，那么选择nonfree(使用闭源驱动)，其余选择free (如果你确定你选择的是对的还是进不去系统，考虑是主板的ACPI问题，例如神船笔记本的1050系列卡，大厂的一般没问题)  
3. 选择boot然后进入一个临时的桌面，由于国内网络条件不好，请断网，选择安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817170845274.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
在时间设置中选择亚洲 - 上海，键盘默认，到分区之后选择手动分区，如图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817171956901.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817170936704.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)  
- 对于 Windows+Linux 双系统而且双系统共用一个盘，选择Windows的EFI分区(一般是你看到的磁盘列表第一个，FAT分区，100-300MB大小的) - 右键 - ==不要改大小== - ==**内容选择保留**== - **==挂载点选择/boot/EFI==** - ==**标记选择boot**==
- 对于 Windows+Linux 双系统而且双系统分别在两个盘的，选择Windows所在硬盘，选择的EFI分区(一般是你看到的磁盘列表第一个，FAT分区，100-300MB大小的) - 右键 - ==不要改大小== - ==**内容选择保留**== - **==挂载点选择/boot/EFI==** - ==**标记选择boot**==，再切换到装Linux的盘中，选择新建分区表，新建的时候选择gpt分区
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817172049285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
会显示一个空闲分区  
- 对于单系统用户，不用管

之后进行正式分区操作(选择空闲分区 - 创建)

1. boot分区，2G(确实是大了)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817172134433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
2. 创建根分区，10-20G
![](https://img-blog.csdnimg.cn/20200817172210201.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
3. 创建交换分区，如图，挂载点必须是linuxswap
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817172254861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
交换分区大小如下

|物理内存	|交换分区|
|--|--|
|<= 4G|至少4G|
|4~16G	|至少8G|
|16G~64G	|至少16G|
|64G~256G	|至少32G|

4. 创建home，大小就是剩下的全部空间(但是还是建议留下来一点空闲)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817173310231.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
选择下一步，创建用户与密码，下一步，选择第一个，不要预装办公套件 -下一步 - 安装 - 完成后勾选重启 - 重启进入系统

## 1.5 换源
1. 换pacman
 F12 打开下拉终端，复制
```bash
sudo pacman-mirrors -i -c China -m rank
```
用`Ctrl+Shift+V` 粘贴，运行，看到又一个延迟，找到最低的，然后子啊弹出框只勾选哪一个，选多了会降低速度(如果有几个差不多的，优先选稳定的企业源例如huawei的那个)

2. 换ArchLinuxCN源，这里推荐中科大的，清华的翻车过一次
运行
```bash
sudo nano /etc/pacman.conf
```
用键盘向下，在文末添加
    ```bash
    [archlinuxcn]
    SigLevel = Optional TrustedOnly
    Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
    ```
    然后`Ctrl+X`退出，执行

    ```bash
    sudo pacman -Syyu && sudo pacman -S archlinuxcn-keyring
    ```
    更新系统，==**重启**==

## 1.6 安装软件
 安装软件可以使用进入系统后左下角manjaro菜单中的`添加/删除软件`这实际上是Pacman的，但是还是建议再装两个(你可以理解为应用商店)`yay`和`yaourt`

```bash
sudo pacman -S yay
pacman -S yaourt
```

### 1.6.1 中文输入法
尝试过搜狗，百度，谷歌拼音，rime  
前两个严格按照规则安装失败了，于是推荐谷歌拼音和rime  
首先要知道Mangaro下有两个知名的输入法管理工具`fcitx`和`Ibus`，我推荐用`ibus`，但是还是建议配置好`fcitx`作为备用  

1. 安装谷歌拼音
    ```bash
    yay -S fcitx-im kcm-fcitx fcitx-googlepinyin
    ```
    新建文件
    ```bash
    sudo nano ~/.xprofile
    ```
    输入内容：
    ```bash
    export GTK_IM_MODULE=fcitx
    export QT_IM_MODULE=fcitx
    export XMODIFIERS="@im=fcitx"
    ```
2. 使用ibus下的rime
    ```bash
    sudo  pacman -S ibus
    sudo yay -S ibus-qt
    sudo pacman -S  ibus-rime
    ```
    添加配置文件 ~/.xprofile
    ```bash
    export GTK_IM_MODULE=ibus
    export XMODIFIERS=@im=ibus
    export QT_IM_MODULE=ibus
    ibus-daemon -d -x
    ```
    重启 - 右键输入法 - 首选项 - 自己修改快捷键 - 排列选择排列方向:水平 - 选择输入法标签 - 添加 - 中文 - Rime - 添加 - 重启 - 随便找个地方切换到Rime输入，会发现候选词有中文，`Ctrl+~`,选择明月拼音[简化字]
**完事**
3. [Rime 详细配置](https://sspai.com/post/55699)
之后，你可以[为rime导入搜狗词库](https://www.jianshu.com/p/300bbe1602d4)(我准备自己养词库)

### 1.6.2 安装与配置zsh

> zsh原称为Z Shell。也是一种shell，兼容最常用的bash这种shell的命令和操作，并且有很多增强，超强的订制性。查来查去，bash虽然很标准，但是自己日常的话还是不要太偏执，力求简单方便的工具更好，所以就玩弄起了zsh。超漂亮又简单,也很好上手。

#### 安装
```bash
sudo pacman -S zsh
```
切换
```bash
chsh -s /usr/bin/zsh
```
之后因为需要链接github于是先修改hosts  
打开hosts
```bash
sudo nano /etc/hosts
```
把这段话复制到下面
```bash
# GitHub Start
151.101.76.133 raw.githubusercontent.com
# GitHub End
```

#### 安装oh-my-zsh
(失败重新输入命令)
```bash
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

#### 安装插件
安装插件`autojump`
```bash
sudo pacman -S autojump
```
安装`zsh-syntax-highlighting`：提供命令高亮
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
安装autosuggestions：记住你之前使用过的命令
```bash
git clone git://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```
安装incr：再也不用先ls在粘贴文件名了，看下效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817180735670.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
去[incr官方](https://mimosa-pudica.net/zsh-incremental.html)网站下载，假设保存在了~目录下，接着执行：

```bash
mkdir ~/.oh-my-zsh/custom/plugins/incr
mv ~/incr-0.2.zsh ~/.oh-my-zsh/custom/plugins/incr
```

安装thefuck：帮你更加高效地学习linux命令
```bash
pip install --user thefuck
```
输错命令不要慌，输入fuck即可帮你更正
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817180923140.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

如果下载太慢：
```bash
mkdir ~/.pip
nano ~/.pip/pip.conf
```
写入如下内容
```bash
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host=mirrors.aliyun.com
```
这样就永久地修改了用户级别的pip下载源  
**启用所有插件**
```bash
nano ~/.zshrc
```
将`plugins=(git)`改为:
```bash
plugins=(git zsh-syntax-highlighting zsh-autosuggestions sudo extract autojump)
```
这个sudo是oh-my-zsh自带的插件，功能是在你输入的命令的开头添加sudo ，方法是双击Esc  
extract也是自带插件，不用再去记不同文件的解压命令，方法是extract +你要解压的文件名  
在下面那句：
```bash
source $ZSH/oh-my-zsh.sh
```
下面输入：
```bash
source ~/.oh-my-zsh/custom/plugins/incr/incr*.zsh
```
在文件末尾输入：
```bash
eval $(thefuck --alias)
```
打开konsole执行：
```bash
source ~/.zshrc
```

#### 安装主题
有好多主题，但是我懒，用比较优秀的主题,配置结果如图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817181553839.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

1. [点此](https://github.com/romkatv/powerlevel10k#manual-font-installation)进入项目的readme，会自动跳转到字体下载小节，下载安装四个字体，打开Konsle - 设置 - 编辑配置方案 - 外观 - 字体 - 选择 - MesloLGS NF
2. [点此](https://github.com/romkatv/powerlevel10k#oh-my-zsh)进入项目的readme，会自动跳转到安装小节，当然我复制了一份
```bash
git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```
配置
```bash
sudo nano ~/.zshrc
```
找到`Set ZSH_THEME`,修改为
```bash
Set ZSH_THEME="powerlevel10k/powerlevel10k"
```
重启终端会进入配置界面，如果没有进入就或者想重新配置可以输入`p10k configure`
想要半透明？ Konsle - 设置 - 编辑配置方案 - 外观 - 获取新的... - 搜索下载 nordic 应用

### 1.6.3 安装Vim
详见[这篇文章](https://blog.csdn.net/Liukairui/article/details/107392243)，太长了放不下

### 1.6.4 安装Tim(似乎QQ很不好用)
```bash
yay -S deepin-wine-tim
```
安装过程中出现选择输入n就好  
为了让tim能接收到图片，需要禁用ipv6  
手动禁用：
```bash
sudo sh -c 'echo 1 >> /proc/sys/net/ipv6/conf/wlp3s0/disable_ipv6'
```
开机禁用：
```bash
sudo vim /etc/default/grub
```
修改：
```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```
为：
```bash
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1 quiet  splash"
```
自动切换deepin-wine环境
```bash
sh /opt/deepinwine/apps/Deepin-Tim/run.sh -d
```

### 1.6.5 安装微信
```bash
yay -S deepin-wine-wechat
```
### 1.6.6 安装终端文件浏览器Ranger
```bash
yay -S ranger
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817182558374.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

### 1.6.7 wps中文版
想要英文版把后面那个包去掉（不建议用wps，经常性卡死）
```bash
yay -S wps-office wps-office-mui-zh-cn
```

### 1.6.8 libreoffice
如果你安装时没有装的话（建议）
```bash
yay -S libreoffice
```
其下libreoffice-fresh相当于是beta版，libreoffice-still相当于是stable版

### 1.6.9 网易云音乐
```bash
yay -S netease-cloud-music
```

### 1.6.10 chrome
```bash
yay -S google-chrome
```
打开后右键浏览器标签栏，取消选择使用系统栏和边框
### 1.6.11 百度网盘

```bash
yay -S baidunetdisk
```
### 1.6.12 Typora
最舒适的md编辑器
```bash
yay -S typora
```

### 1.6.13 flameshot
最强大的截图工具 当你的tim/微信截图不好用的时候，用这个
```bash
yay -S flameshot
```

### 1.6.14 timeshift
强大好用的备份、回滚系统工具

```bash
yay -S timeshift
```

### 1.6.15 vscode
去`添加/删除应用`找到`code-insiders`,安装

**还有一个软件见原文，不敢转，**[这里](https://zhuanlan.zhihu.com/p/114296129)第9节

## 1.7 安装KDE主题等
如果在安装主题的时候下载**特别慢**，方法是：  
首先换成联通或者电信的网络，  
去`添加/删除应用`找到`ocs-url`,安装  
去[这里](https://store.kde.org/browse)找主题，选择Install而不是Download  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817184318787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
选择Install，会打开ocs-url自动下载  
p.s.还有[一种方法](https://www.reddit.com/r/kde/comments/8g97n7/how_to_add_themes_from_httpsstorekdeorg/)，但是我从来没成功过  

## 1.8 美化桌面
效果如图![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817184655904.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

1. 壁纸自己换
2. 安装latte-dock

```bash
yay -S latte-dock
```
添加一个新空面板，默认会出现在上面，然后删除下面这个面板  
在新面板上添加必要的部件：应用程序面板，数字时钟，托盘图标  
还可以加全局菜单，显示面板等等  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817184812508.png#pic_center)
启动latte-dock，下方就会出现一个dock栏，具体配置看自己爱好  
移除那个时钟的方法：  
右键 配置lattedock 然后右键 那个时钟 移除 就好了  
进入设置-外观中选择你喜欢的主题什么的安装并且应用即可  
设置-工作空间行为-桌面特效 中可以启用一些华丽的特效  
设置-开机和关机 中更改登录屏幕等效果  
在设置-工作空间行为-常规行为-点击行为 中改掉单击打开文件/文件夹的设置  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817184838890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
修改~下的用户文件夹名称为英文：  
先去手动修改文件夹名称，然后在 设置 -> 应用程序 -> 地点 这修改  

## 1.9 KDE下的其他配置
### 1.9.1 遇到 要解锁，请输入默认密钥环的密码 
`添加/删除应用`搜索`seahorse`  
终端输入`seahorse`，选择返回(左上角第二个)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817190919831.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
右键默认密钥环，更改密码，先输入老密码，新密码不写，确认即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817191412589.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
相关阅读：

1. [manjaro pacman及其数字签名问题解决](https://blog.csdn.net/weixin_44405279/article/details/104123282)
2. [“要解锁，请输入默认密钥环的密码”的解决办法](https://www.cnblogs.com/zenPger/archive/2011/05/25/2057188.html)

### 1.9.2 输入密码的时候显示密码
效果  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817193711501.png#pic_center)

```bash
sudo visudo
```

行尾 可添加如下的

```bash
Defaults pwfeedback
```
相关阅读：
[教你在Linux终端中键入密码时显示星号（*）的办法](http://8u.hn.cn/Linuxmingling/13084.html)

### 1.9.3 快速启动器 Albert
本来可以用`Alt+Space`启动但是i3不支持，所以换成这个，`添加/删除应用`搜索即可


### 1.9.4 安装位图图标被禁用
运行

```bash
cd /etc/fonts/conf.d
rm 70-no-bitmaps.conf
ln -s ../conf.avail/70-yes-bitmaps.conf .
fc-cache -f.
```
如果还是不行就这个

> Try linking to 70-force-bitmaps instead. 70-yes-bitmaps doesn't seem
> to have anything in it. (This is taken from your link.) This worked
> for me on Ubuntu 12.04.
> 
> The process is like this (Added by a user on 14.04)

```bash
sudo ln -s /etc/fonts/conf.avail/70-force-bitmaps.conf /etc/fonts/conf.d/
sudo unlink /etc/fonts/conf.d/70-no-bitmaps.conf # For disabling no-bitmap setting
```

> Then do this to update settings

```bash
sudo dpkg-reconfigure fontconfig
```
相关阅读
[How to disable bitmap fonts?](https://askubuntu.com/questions/1039763/how-to-disable-bitmap-fonts)

### 1.9.5 截图工具推荐
深度截图
```bash
yaourt deepin-screenshot
```
如图设置快捷键，快捷键自选
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817210632557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

### 1.9.6 显示本机信息命令
`添加/删除应用`搜索`neofetch `

### 1.9.7 切换ESC与CapsLock
在~/.Xmodmap写入

```bash
! Swap caps lock and escape
remove Lock = Caps_Lock
keysym Escape = Caps_Lock
keysym Caps_Lock = Escape
add Lock = Caps_Lock
```
测试
```bash
exec xmodmap ~/.Xmodmap
```
可以的话还要加入自启动

1. [KDE桌面的方法](https://blog.csdn.net/tmjdone/article/details/5627239)，当然直接autostart加入.sh即可
2. i3wm的方法(后面会用到)
~/.config/i3/config写入
```bash
exec xmodmap ~/.Xmodmap
```

# 2. i3wm配置 + Polybar的配置
## 2.1 i3wm 最基本的使用方法
==想要获得更好的阅读体验，请点击[链接](https://www.jianshu.com/p/b9b644cf528f),我在原文的基础上未做修改==

> 2.1小节内容转自[简书](https://www.jianshu.com/p/b9b644cf528f)
### 2.1.1 默认键位
给那些“太长不看”的人，以下图片是默认热键。
与$mod（Alt）一起按：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220611105.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)


与Shift+$mod一起按：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220621168.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

Alt与Shift+$mod一起按：  
红色按键是你需要按的修饰键（默认配置），蓝色按键是盲打键位。  
要注意的是，若是没有配置文件就启动i3,i3-config-wizard    会帮助你创建一个配置文件，键位位置会跟上图所示一样，不管你是什么键盘布局。  
如果你喜欢上图的设置，可以拒绝 i3-config-wizard的引导，默认以 etc/i3/config 作为配置文件

### 2.1.2 使用i3
贯穿整个使用文档，关键字$mod将当作已配置好的修饰键，修饰键默认为Alt键（Mod1），
windows（Mod4）键也是一个受欢迎的替换方案

#### 2.1.2.1 打开虚拟终端和移动位置
打开一个新的虚拟终端是非常简单的操作，默认情况下，这个操作的组合键是 $ mod+Enter ,默认配置下是Alt+Enter。按下$mod+Enter,将会打开一个新的虚拟终端，它将占满你屏幕的所有空间。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220708270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

如果你现在打开另一个虚拟终端，i3会把屏幕空间一分为二，各占一半。新创建的窗口会被i3放   在已有窗口的旁边（宽屏）或者下面（竖屏）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220719378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)


要在两个终端之间移动焦点，你可以使用vi编辑器风格的方向键。然而，在i3里，盲打键位就是   方向键(vi编辑器里的方向键为了兼容大多数键盘布局，都向左移动了一个键位)。因此，$ mod+j是向左，$ mod+k是向上，$ mod+l是向下，$ mod+;是向右。像上图的情况，用$ mod+k或$ mod+l在两个终端之间切换。当然，你也可以使用箭头方向键。

现在，你的workspace是按特定方向（默认水平方向）划分（容器里包含两个终端）。你可把   每个window都再分离一次（水平或者垂直），就像workspace一样。“window”指一个容器包含   一个X11窗口（如一个浏览器或者一个终端），“split container”指的是容器包含一个或多个窗口。    
垂直分割窗口，在创建新窗口前按$mod+v，水平分割窗口，按 $ mod+h。

#### 2.1.2.2 改变容器布局
一个split container 可以设置成下面所列出的布局之一。  
**splith/splitv**容器里的每个窗口都获得等量大小的空间。splith 控制每个窗口在彼此的左右方。splitv 控制每个窗口在彼此的上下方。  
**stacking**容器里只显示一个正在活动的窗口。在容器上方得到一个窗口的列表。    
**tabbed**与stacking是一个原理，不过tabbed的窗口列表是单行显示的标签页。  
**切换模式**：$ mod+e打开splith/splitv，$ mod+s打开stacking，$ mod+w打开tabbed  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081722074334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

#### 2.1.2.3 把一个窗口切换到全屏模式
把一个窗口全屏显示或者退出全屏，按 $ mod+f。  
在i3里还有全局全屏模式，那么这个窗口将占据所有的显示输出（多屏显示）（配置命令：fullscrren toggle global）

#### 2.1.2.4 打开其他应用程序
除了通过终端打开应用程序，你也可以使用dmenu来打开程序，默认情况下通过$mod+d调 出。只需要输入你要打开的应用的名字（或者是名字的一部分），应用必须在$PATH中才能正常打开。  
另外，如果你有一个需要经常打开的应用，你可以创建一个组合键来直接打开它，细节请看  配置 部分.

#### 2.1.2.5 关闭窗口
如果一个程序未提供一个关闭的机制（很多程序都提供了一个关闭方案，Esc键或者一个快捷键，比如Ctrl+w），你可以按$mod+Shift+q 来杀掉这个窗口。对于支持 WM_DELETE 协议的应用程序，它将正确地关闭（保存任何修改或进行其他清理）。如果程序不支持 WM_DELETE 协议。X server 将杀掉这个程序并且之后的动作取决与此程序。

#### 2.1.2.6 使用WorkSpace
使用工作空间是分组归类一堆窗口的好方法。默认情况下，你处在第一个workspace,就像i3bar    左下角所指示的一样。要切换到其他workspace，按下$mod+数字键（你要切换到的workspace的数字）。如果工作空间不存在，它将被创建。  
一个常见的例子是把网页浏览器放在第一workspace，聊天工具放在另一个workspace，还有另   一个你运行的其他软件放在第三个workspace。当然，你可以不必照着做。  
如果你拥有多个显示屏，在启动时将会在每个屏幕创建一个workspace。如果你打开一个新的workspace，他会绑定到你正在工作的显示屏。当你切换一个在其他  显示屏的workspace时，i3 会把焦点设置到那个显示屏。

#### 2.1.2.7 移动一个window到另一个workspace
移动一个窗口到另一个工作空间，按$mod+Shift+目标工作区数字。跟切换workspaces时一样  的情况，如果目标工作空间不存在，它将被创建。

#### 2.1.2.8 调整容器大小调整容器大小
最简单的办法是用鼠标：拖拽边框到想要的大小。  
你也可以定义快捷键来调整，可以看看这个例子，default config--由i3提供

#### 2.1.2.9 重启
为了重启i3你可以使用$mod+Shift+r(例如当有一个bug时，恢复到正常状态，或者升级到一个新版本i3)。

#### 2.1.2.10 退出i3
不关掉Xserver且利落地退出i3，你可以按$mod+shift+e。通常会有一个对话向你确认是否退出。

#### 2.1.2.11 
浮动模式是相对于平铺模式的。窗口的位置和大小不是由i3自动管理的，而是由你手工调整。   使用这个模式有违于平铺模式，但是他对一些案例如"Save as"对话窗口，或者toolbar窗口（GIMP或类似的）是有用的。这些窗口通常会设置恰当的提示和默认情况下被打开于浮动模式。  
你可以通过按$mod+Shift+space来切换一个窗口的浮动模式。通过鼠标拖动标题栏，你可以移   动这个窗口，通过拖动边框，你可以调整窗口大小。你也可以通过使用floating_modifier来操作。另一个调整浮动窗口大小的方法是鼠标右击标题栏并且拖拽。  
关于用键盘来调整浮动窗口的大小，请看调整大小的绑定模式，由i3提供  
default config  
浮动窗口一直处于平铺窗口的上方

### 2.1.3 树
i3保存着所有关于 X11 output 的数据，workspace和窗口布局在里面是树形图的结构。根节点是X11根窗口，随后是X11 putputs，然后是 dock areas 和一个 content container，随后是workspace，最后是window本身。在旧版本的i3，每个workspace有多个list和table，这个方法   的结果是难以使用（真的难），理解和实现。

#### 2.1.3.1 树是由容器组成的
我们把树的组件叫做Containers。一个容器可以掌控一个窗口（意思是一个X11     window，你可以真正看到的，使用的，比如说一个浏览器）。另外，Containers可以再包含一个或者多个Containers。一个简单的workspace例子是：当你在单个显示器打开i3时，只有一个workspace，你这时打开了两个终端，你最后得到的树是：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220800804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220809719.png#pic_center)


#### 2.1.3.2定位和Split Containers
当以树作为数据结构时，为了构建一个布局，使用所谓的 Split Containers 是很正常的。在i3 里，每个容器都有属于自己的方位（水平，垂直，或者未指定），并且定位取决于上一级容器  的布局（垂直的有splitev和stacking，水平的有splith和tabbed）。所以我们以一个workspace     作为例子，workspace    容器的默认布局是splith(如今很多显示器是宽屏的)。如果你把布局切换成splitv（默认情况下按$mod+v）然后打开两个终端，i3会把你的窗口设置成这个样子：
![在这里插入图片描述](https://img-blog.csdnimg.cn/202008172208200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)


从version 4开始，i3多了一个有趣的新特性，它能够分割任何东西：让我们假设你现在在workspace里打开了两个终端（以splith布局打开，也就是水平定位）焦点处于右边的终端，现  在你想要要在当前终端下面打开另外一个终端。如果你直接打开新终端，它会被放在最右边而  不是下面。解决办法是按$mod+v用splitv布局来分割容器（要打开Horizontal Split Container， 用$mod+h）。现在你可以在当前终端下面打开一个新终端了：

你可能已经猜到了：它能够无限分割到下一层。

#### 2.1.3.3 聚焦于父容器
`$mod+a`![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220834802.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220846341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)



我们继续以上图为例。我们在左边有一个终端，右边有两个垂直分布的终端，焦点处在右下角   的终端。当你又打开一个新终端，他会被放在右下角终端的下面。  
所以说，要怎么把新终端放到右边而不是下面呢，答案是使用focus    parent，它会把焦点转移到当前容器的父容器。在这种情况下，你会把焦点放在水平方向的workspace里的vertical split  
Container。因此，新窗口会被打开在Vertical Split Container的右边：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817220900750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

#### 2.1.3.4 隐式容器
在一些情况下，i3需要隐式地创建一个容器来完成你的命令。  
一个例子如下：你在单个显示器启用i3，在单个workspace打开3个终端。workspace节点在i3 的layout    tree里，这些终端窗口直属于workspace节点。默认workspace节点的方向设置是水平的。  
现在你往下移动其中一个终端（$mod+Shift+k by default）。那么workspace节点会被设置成垂直布局，你移动的这个终端就会出现在屏幕的下面并且直属于workspace。一个新的容器被创建，用于容纳另外两个终端。当你切换到tabbed模式，你会注意到这个情况。你最终会得到一个有标签页容器，里面有两个窗口（比如 "H[urxvt firefox]"），还有一个你刚才移动到下面的终端窗口。  
到这里，真正有趣的事情才刚刚开始;-)。很多东西都非常依赖于你样要的工作环境，所以我们   无法提供一个默认的且合理的配置。  
虽然没有使用编程语言来进行配置，i3在你希望让窗口管理器怎么做的方面依然保持着灵活的   特性。  
例如，你可以配置一个绑定用来跳到指定的窗口，可以设置打开指定的应用程序到指定的  
workspace，可以自动启动某个程序，可以改变i3的配色，还可以设置快捷键来做一些有用的事   情。  
要改变i3的配置，复制 /etc/i3/config 到 ~/.i3/config并且用一个文本编辑器来编辑它（或者是复制到~/.config/i3/config，如果你喜欢XDG目录方案）  
第一次启动i3时，i3会引导你创建一个配置文件，你可以告诉向导程序在配置文件里设置Alt  
（Mod1）或windows（Mod4）键作为辅助按键。当然，创建的配置文件会使用你当前键盘布   局的键盘符号。要启动向导程序，请在终端输入命令i3-config-wizard。  
请确认你当前并没有~/.i3/config/。否则向导程序将会退出。  

### 2.1.4 配置i3
到这里，真正有趣的事情才刚刚开始;-)。很多东西都非常依赖于你样要的工作环境，所以我们   无法提供一个默认的且合理的配置。  
虽然没有使用编程语言来进行配置，i3在你希望让窗口管理器怎么做的方面依然保持着灵活的   特性。  
例如，你可以配置一个绑定用来跳到指定的窗口，可以设置打开指定的应用程序到指定的workspace，可以自动启动某个程序，可以改变i3的配色，还可以设置快捷键来做一些有用的事   情。  
要改变i3的配置，复制 /etc/i3/config 到 ~/.i3/config并且用一个文本编辑器来编辑它（或者是复制到~/.config/i3/config，如果你喜欢XDG目录方案）   
第一次启动i3时，i3会引导你创建一个配置文件，你可以告诉向导程序在配置文件里设置Alt（Mod1）或windows（Mod4）键作为辅助按键。当然，创建的配置文件会使用你当前键盘布   局的键盘符号。要启动向导程序，请在终端输入命令i3-config-wizard。  
请确认你当前并没有~/.i3/config/。否则向导程序将会退出。

#### 2.1.4.1  备注
在配置文件里使用备注是可行的和推荐的，为了以后参考或修改，适当地记录你的配置。备注   以#开始，而且只能用在每行的开头：
例子
```bash
# This is a comment
```

#### 2.1.4.2 字体
i3支持以 X core字体和 FreeType 字体来渲染窗口标题你可以使用xfontsel(1) 生成一个 X core字体类型。你需要使用一个支持ISO-10646编码的字体来显示特殊字符（Unicode）。  
一个FreeType字体类型是由一个字体系列，风格，粗细，便提，伸延组成的，FreeType字体支持从右到左的渲染和往往比 X core字体支持更多的Unicode符号。  
如果i3不能打开配置好的字体，i3会吧错误输出到日志文件，退回到可以工作的字体  
**语法：**
```bash
font <X core font description>
font pango:<family list> [<style options>] <size>
```
**例子：**
```bash
font -misc-fixed-medium-r-normal--13-120-75-75-C-70-iso10646-1
font pango:DejaVu Sans Mono 10
font pango:DejaVu Sans Mono, Terminus Bold Semi-Condensed 11
font pango:Terminus 11px
```

#### 2.1.4.3 键盘绑定
一个键盘绑定会让i3在按下特定的按键后执行一个命令。i3允许以keycode或keysym绑定（你可已随便更改绑定，虽然i3并不会帮你解决键位冲突）Keysym(key symbol)是指键盘上的符号。像是"A"或者"B"，但是像是那些奇怪的"underscore"而不是"_"。这些符号是你们用Xmodmap重新映射的按键。要获得当前键盘的映射，使用命令 xmodmap -pke 。要以交互方式输入一个按键，查看它是被设置成什么keysym，使用命令 xev 。  
Keycode 不需要拥有一个已赋值符号（方便某些笔记本热键），而且他们即使在你换了键盘布局后，也不会改变keycode本身（当使用xmodmap）。  
我的建议是：如果你经常更换键盘布局，但是不想改变绑定键位的物理位置，使用keycodes。如果你不改变键盘布局，而且想要一个简单干净的配置文件，使用keysyms。某些工具（例如import或者xdotool）可能无法运行在一些KeyPress事件，因为键盘/指针被占用了。针对这些情况，可以使用 --release 标记,这将在按键被松开后执行命令。
**语法：**
```bash
bindsym [--release] [<Group>+][<Modifiers>+]<keysym> command
bindcode [--release] [<Group>+][<Modifiers>+]<keycode> command
```
**例子：**
```bash
# Fullscreen
bindsym $mod+f fullscreen toggle

# Restart
bindsym $mod+Shift+r restart

# Notebook-specific hotkeys
bindcode 214 exec --no-startup-id /home/michael/toggle_beamer.sh

# Simulate ctrl+v upon pressing $mod+x
bindsym --release $mod+x exec --no-startup-id xdotool key --clearmodifiers ctrl+v

# Take a screenshot upon pressing $mod+x (select an area)
bindsym --release $mod+x exec --no-startup-id import /tmp/latest-screenshot.png
```
可以使用的修饰键：
```bash
Mod1-mod5，Shift，Control
```
默认修饰请看 xmodmap（1）Group1, Group2, Group3, Group4当使用多个键盘布局（例如setxkbmap -layout us，ru）时，您可以指定哪个XKB组（也称为“布局”）键盘绑定应处于活动状态。默认的，键盘绑定会被转换成Group1并且活跃在所有键盘布局。如果你想为其中一个键盘布局重写键盘绑定，指定到相应的group。为了向后兼容，“Mode_switch” 是Group2的别名。

#### 2.1.4.4 鼠标绑定
在容器范围内按下一个已经绑定的鼠标按键，i3将会执行一个命令。你可以用绑定键盘的方法设置鼠标绑定。

**语法：**
```bash
bindsym [--release] [--border] [--whole-window] [<Modifiers>+]button<n> command
```
默认的，绑定只会在点击到标题栏的时候运行。如果添加了--release标记，它会在按键松开时运行。  
如果添加了--whole-window标记，绑定会在你点击到窗口任何一个部位时运行，但是边框除外。为了让一个绑定在点击到边框时运行，指定一个--border标记。
**例子:**
```bash
# The middle button over a titlebar kills the window
bindsym --release button2 kill

# The middle button and a modifer over any part of the window kills the window
bindsym --whole-window $mod+button2 kill

# The right button toggles floating
bindsym button3 floating toggle
bindsym $mod+button3 floating toggle

# The side buttons move the window around
bindsym button9 move left
bindsym button8 move right
```
**绑定模式**  
你可以拥有多套键位绑定模式，当你切换到其他绑定模式的时候，所有当前键位绑定会被释放，并且只有你新切换的绑定模式生效。唯一的预设的绑定模式是defalut的，他伴随i3的启动，并且没有定义任何指定的绑定模式。  
使用绑定模式有以下两部分组成:定义一个绑定模式和切换到它。为了做到这个，需要一个配置指令和一个命令，他们被称为mode。配置指令被用来定义一组绑定并且把它放到一个绑定模式，而命令是用来切换到一个绑定模式。  
建议与[variables]组合使用绑定模式，以便维护更容易。以下是一个简单案例  
请注意定义一个退回默认模式的绑定键  
注意，可以使用[pango_markup]来设置绑定模式， 但是你需要通过添加 --pango_markup标记给定义模式来明确地开启它。  

**语法**
```bash
# config directive
mode [--pango_markup] <name>

# command
mode <name>
```
**例子**
```bash
# Press $mod+o followed by either f, t, Esc or Return to launch firefox,
# thunderbird or return to the default mode, respectively.
set $mode_launcher Launch: [f]irefox [t]hunderbird
bindsym $mod+o mode "$mode_launcher"

mode "$mode_launcher" {
    bindsym f exec firefox
    bindsym t exec thunderbird

    bindsym Esc mode "default"
    bindsym Return mode "default"
}
```
#### 2.1.4.6 浮动调节
移动浮动窗口。你可以选择其中一个方式，1拖动标题栏，2配置可以通过按键和鼠标点击窗口来移动窗口的浮动调节器。最常见的设置是用与管理窗口相同的按键（例如Mod1）。也就是说，你可以按住Mod1,同时鼠标左键点击拖动动窗口到你想要的方位。
当你按住浮动调节器时（Mod1）,你可以通过按住鼠标右键并拖动，来调整那一个窗口的大小。如果你同时按住了Shift键，窗口将会按比例缩放（宽高比会保留）。
**语法**
```bash
floating_modifier <Modifier>
```
**例子**
```bash
floating_modifier Mod1
```

#### 2.1.4.7 限制浮动窗口的大小
浮动窗口的最大最小面积可以被指定。如果其中的floating_maximum_size被指定为-1，那么对于窗口的最大值将不会被约束。如果其中的floating_maximum_size为定义，或者被制定为0,i3会使用默认值来限制窗口最大值。    floating_minimum_size的处理方法一定程度上与floating_maximum_size的相同。

**语法**
```bash
floating_minimum_size <width> x <height>
floating_maximum_size <width> x <height>
```
**例子**
```bash
floating_minimum_size 75 x 50
floating_maximum_size -1 x -1
```

#### 2.1.4.8 工作区的定位
新工作区有一个默认合适的定位：宽屏用水平定位，竖屏用垂直定位。  
你可以重写default_orientation的行为

**语法**
```bash
default_orientation horizontal|vertical|auto
```
**例子**
```bash
default_orientation vertical
```

#### 2.1.4.9 新容器的布局模式
这个选项决定了工作区级别的容器该用什么布局模式

**语法**
```bash
workspace_layout default|stacking|tabbed
```
**例子**
```bash
workspace_layout tabbed
```

#### 2.1.4.10 新窗口的边框风格
此选项决定新窗口拥有什么样的边框风格。默认是normal。注意，new_float 仅应用于作为浮动窗口呼出的窗口。例如对话窗口，而不是到后来才被设置成浮动窗口的窗口。

**语法**
```bash
new_window normal|none|pixel
new_window normal|pixel <px>
new_float normal|none|pixel
new_float normal|pixel <px>
```
**例子**
```bash
new_window pixel
"normal" 和 "pixel" 边框风格支持设置边框像素大小的可选项。
```
**例子**
```bash
# The same as new_window none
new_window pixel 0

# A 3 px border
new_window pixel 3
```

#### 2.1.4.11 隐藏靠近屏幕边缘的边框
你可以使用hide_edge_borders来隐藏与屏幕边缘靠近的边框。如果你使用滚动条的话这很有用，或者不想浪费甚至两像素的显示空间。"smart"选项是在工作区内只有一个可见窗口时才隐藏边框，而在工作去内有多个窗口，他不会隐藏边框。

**语法**
```bash
hide_edge_borders none|vertical|horizontal|both|smart
```
**例子**
```bash
hide_edge_borders vertical
```

#### 2.1.4.12 指定窗口的任意命令（for window）
使用for_window指令，当i3碰到特定的窗口，你可以让i3执行任何命令。它可以用在让窗口浮动，改变他们的边框的方面，等。

**语法**
```bash
for_window <criteria> <command>
```
**例子**
```bash
# enable floating mode for all XTerm windows
for_window [class="XTerm"] floating enable

# Make all urxvts use a 1-pixel border:
for_window [class="urxvt"] border pixel 1

# A less useful, but rather funny example:
# makes the window floating as soon as I change
# directory to ~/work
for_window [title="x200: ~/work"] floating enable
```
有效的命令请command_criteria

#### 2.1.4.13 不把焦点放在新建窗口
当一个新窗口出现时，焦点会移到它那里。no_focus 指令允许预防这种情况发生，而且它必须与command_criteria一起使用  
注意，他不会在所有情景下生效，例如，当数据正输送给一个运行中的程序，使得焦点必须移到它身上。设置这种情况的行为，参考focus_on_window_activation在工作区的第一个窗口中，no_focus也会被忽略，在这种情况下，没有理由不把焦点放在这个窗口。与workspace_layaout结合使用会有更好是可用性。

**语法**
```bash
no_focus <criteria>
```
**例子**
```bash
no_focus [window_role="pop-up"]
```

#### 2.1.4.14 变量
正如您在有关键盘绑定的章节中了解到的，你将要配置许多包含修饰键的绑定，如果你想要保存一些输入并能够改变你之后要用的修饰键，那么变量就很方便了。

**语法**
```bash
set $<name> <value>
```
**例子**
```bash
set $m Mod1
bindsym $m+Shift+r restart
```
在解释过程中，变量会在文件中被替换。变量扩张不是递归的，所以不可能用一个包含另一个变量的值来定义变量。对于这个没有其他的想法，而且绝对没有改变的计划。如果你需要更多的动态配置，你应该创建一些用来生成配置文件在i3启动之前运行的脚本。

## 2.2 i3wm的配置
==想要获得更好的阅读体验，请点击[链接](https://github.com/Kuari/i3-wm-config),我在原文的基础上未做修改，原配置文件可以直接去github下载==

> 配置改自[github](https://github.com/Kuari/i3-wm-config)

### 安装

>此处默认配置好基础系统和安装好图形化以及i3-wm

#### 需要的软件

* *i3-wm* : 窗口管理器
* *i3gaps* : 设置窗口间距
* *feh* : 设置背景图片
* *compton* : 终端透明
* *xfce4-terminal* : 终端
* *polybar* : 状态栏
* *i3lock-fancy-git* : 锁屏

#### 安装步骤

##### 1.安装字体
```bash
yaourt -S ttf-font-awesome
```
##### 2.安装需要的包
```bash
yaourt -S xfce4-terminal feh compton i3-gaps i3lock-fancy-git polybar-git
```
##### 3.配置
在文件`.xinitrc`加入如下
```bash
exec compton -b &
exec i3 -V >> ~/.config/i3/log/i3log-$(date +'%F-%k-%M-%S') 2>&1
```



#### 遇到的问题

##### 1.依赖
依赖软件包括`alsa`,`MPD`等等,可以去[polybar的Github主页](https://github.com/jaagr/polybar)去查看相关文档。
##### 2.调试
```bash
cd .config/polybar
bash launch.sh
```
运行此命令调试查看其报错。除了此处查看报错,根据以上配置,i3启动之后会输出日志到`~/.config/i3/log/`,可以直接查看日志。
##### 3.显示输出报错
报错内容为
```bash
Monitor 'eDP-1' not found or disconnected
```
这个问题需要看具体的硬件,可以查看[archlinux的xrander](https://wiki.archlinux.org/index.php/Xrandr),通过`xrander`查看自己主要适用的显示设备等等信息,然后修改i3和polybar配置文件内设备信息即可。

### 快捷键

##### 基础

| 功能                           | 按键                     | 备注             |
| ------------------------------ | ------------------------ | ---------------- |
| 向上/下/左/右移动              | $mod+k/j/h/l             |                  |
| 切换分区                       | $mod+1/2/3/4/5/6/7/8/9/0 |                  |
| 移动窗口到目标分区             | $mod+Shift+1/2/3/.../0   |                  |
| 关闭i3-wm                      | $mod+Shift+e             |                  |
| 关闭窗口                       | $mod+q                   |                  |
| 移动窗口到上/下/左/右侧        | $mod+Shift+k/j/h/l       |                  |
| 更改布局为横向/竖向            | $mod+h/v                 |                  |
| 窗口全屏/取消全屏              | $mod+f                   |                  |
| 隐藏窗口                       | $mod+-                   |                  |
| 切换显示隐藏窗口（为浮动状态） | $mod+Shift+-             |                  |
| 浮动窗口取消浮动               | $mod+Shift+space         |
| 调高音量5%                     | $mod+F3                  |                  |
| 调低音量5%                     | $mod+F2                  |                  |
| 打开/关闭声音                  | $mod+F1                  |                  |
| 锁屏                           | $mod+F12                 | 需要安装i3-fancy |

##### 软件

* 此处需要安装相应的软件才可实现

| 功能                      | 按键         | 备注               |
| ------------------------- | ------------ | ------------------ |
| 终端                      | $mod+enter   | 用的xfce4-terminal |
| firefox                   | $mod+Shift+f |                    |
| chromium                  | $mod+Shift+g |                    |
| slack                     | $mod+Shift+k |                    |
| steam                     | $mod+Shift+s |                    |
| thunderbird               | $mod+Ctrl+t  |                    |
| blueberry                 | $mod+Shift+b |                    |
| virtualbox中的win10虚拟机 | $mod+Shift+v |                    |
| ...                       | ...          | ...                |

<br />

### 自定义配置

#### 1. 配置快捷键

```bash
bindsym $mod+<快捷键> exec <shell>
```

* 软件

需要确保软件已安装，且使用软件自带的启动命令

```bash
bindsym $mod+Shift+f exec firefox
```

* 运行脚本

```bash
 bindsym $mod+Shift+s exec bash ~/example.sh
```

* virtualbox虚拟机

此处为直接打开一个名为“win10”的虚拟机

```bash
bindsym $mod+Shift+v exec VBoxManage startvm "win10" --type gui
```

#### 2. 配置背景图

```bash
exec_always --no-startup-id feh --bg-scale "/home/kuari/Picture/girl.png"
```

<br />

### 常用软件

<table>
    <tr>
        <th>功能</th>
        <th>软件</th>
    </tr>
    <tr>
        <th>浏览器</th>
        <th>Firefox, chromium</th>
    </tr>
    <tr>
        <th>输入法</th>
        <th>ibus, ibus-libpinyin</th>
    </tr>
    <tr>
        <th>程序启动</th>
        <th>rofi</th>
    </tr>
    <tr>
        <th>邮件</th>
        <th>thunderbird</th>
    </tr>
    <tr>
        <th>编辑器</th>
        <th>vim</th>
    </tr>
    <tr>
        <th>音频播放</th>
        <th>vlc, mplayer</th>
    </tr>
    <tr>
        <th>office组件</th>
        <th>libreoffice, wps</th>
    </tr>
</table>

**我的配置文件**

```bash
# i3 config file (v4)
#
# Please see https://i3wm.org/docs/userguide.html for a complete reference!
#
# This config file uses keycodes (bindsym) and was written for the QWERTY
# layout.
#
# To get a config file with the same key positions, but for your current
# layout, use the i3-config-wizard
#

# Font for window titles. Will also be used by the bar unless a different font
# is used in the bar {} block below.
font pango:monospace 8

# This font is widely installed, provides lots of unicode glyphs, right-to-left
# text rendering and scalability on retina/hidpi displays (thanks to pango).
#font pango:DejaVu Sans Mono 8

# Before i3 v4.8, we used to recommend this one as the default:
# font -misc-fixed-medium-r-normal--13-120-75-75-C-70-iso10646-1
# The font above is very space-efficient, that is, it looks good, sharp and
# clear in small sizes. However, its unicode glyph coverage is limited, the old
# X core fonts rendering does not support right-to-left and this being a bitmap
# font, it doesn’t scale on retina/hidpi displays.

# use these keys for focus, movement, and resize directions when reaching for
# the arrows is not convenient
set $up k
set $down j
set $left h
set $right l
set $mod Mod4

# use Mouse+$mod to drag floating windows to their wanted position
floating_modifier $mod

# start a terminal
# bindsym $mod+Return exec gnome-terminal
# bindsym $mod+Return exec xfce4-terminal
bindsym $mod+Return exec konsole

# amixer
bindsym $mod+F3 exec amixer set Master 5%+
bindsym $mod+F2 exec amixer set Master 5%-
bindsym $mod+F1 exec amixer set Master toggle

# i3lock
bindsym $mod+F12 exec i3lock-fancy

# start the firefox
bindsym $mod+Shift+f exec firefox

# start the bluetooth
bindsym $mod+Shift+b exec blueberry

# start the rem
bindsym $mod+Control+r exec remarkable

# start slack
bindsym $mod+Control+k exec slack

# start the win10
bindsym $mod+Shift+v exec VBoxManage startvm "win10" --type gui

# start the chromium
bindsym $mod+Shift+g exec chromium

# ss
bindsym $mod+Shift+s exec bash ~/.ss.sh

# wps, et, wpp
bindsym $mod+Control+w exec wps
bindsym $mod+Control+e exec et
bindsym $mod+Control+p exec wpp

# thunderbird
bindsym $mod+Control+t exec thunderbird

# kill focused window
bindsym $mod+Shift+q kill

# steam
bindsym $mod+Control+s exec steam

# start dmenu (a program launcher)
# bindsym $mod+d exec dmenu_run
#
# run rofi
bindsym $mod+d exec rofi -show run

# arandr
bindsym $mod+Shift+n exec arandr
# There also is the (new) i3-dmenu-desktop which only displays applications
# shipping a .desktop file. It is a wrapper around dmenu, so you need that
# installed.
# bindsym $mod+d exec --no-startup-id i3-dmenu-desktop

# change focus
bindsym $mod+$left focus left
bindsym $mod+$down focus down
bindsym $mod+$up focus up
bindsym $mod+$right focus right

# alternatively, you can use the cursor keys:
bindsym $mod+Left focus left
bindsym $mod+Down focus down
bindsym $mod+Up focus up
bindsym $mod+Right focus right

# move focused window
bindsym $mod+Shift+$left move left
bindsym $mod+Shift+$down move down
bindsym $mod+Shift+$up move up
bindsym $mod+Shift+$right move right

# alternatively, you can use the cursor keys:
bindsym $mod+Shift+Left move left
bindsym $mod+Shift+Down move down
bindsym $mod+Shift+Up move up
bindsym $mod+Shift+Right move right

# split in horizontal orientation
bindsym $mod+g split h

# split in vertical orientation
bindsym $mod+v split v

# enter fullscreen mode for the focused container
bindsym $mod+f fullscreen toggle

# change container layout (stacked, tabbed, toggle split)
bindsym $mod+s layout stacking
bindsym $mod+w layout tabbed
bindsym $mod+e layout toggle split

# toggle tiling / floating
bindsym $mod+Shift+space floating toggle

# change focus between tiling / floating windows
bindsym $mod+space focus mode_toggle

# focus the parent container
bindsym $mod+a focus parent

# focus the child container
#bindsym $mod+d focus child

# move the currently focused window to the scratchpad
bindsym $mod+Shift+minus move scratchpad

# Show the next scratchpad window or hide the focused scratchpad window.
# If there are multiple scratchpad windows, this command cycles through them.
bindsym $mod+minus scratchpad show

# use window title, but no border
bindsym $mod+t border normal 0
# use no window title and a thick border
bindsym $mod+y border pixel 3
# use neither window title nor border
bindsym $mod+u border none


# workspace names
set $ws1 1:
set $ws2 2:
set $ws3 3:
set $ws4 4:
set $ws5 5:
set $ws6 6:
set $ws7 7:
set $ws8 8:
set $ws9 9:
set $ws10 0:

# switch to workspace
bindsym $mod+1 workspace $ws1
bindsym $mod+2 workspace $ws2
bindsym $mod+3 workspace $ws3
bindsym $mod+4 workspace $ws4
bindsym $mod+5 workspace $ws5
bindsym $mod+6 workspace $ws6
bindsym $mod+7 workspace $ws7
bindsym $mod+8 workspace $ws8
bindsym $mod+9 workspace $ws9
bindsym $mod+0 workspace $ws10

# move focused container to workspace
bindsym $mod+Shift+1 move container to workspace $ws1
bindsym $mod+Shift+2 move container to workspace $ws2
bindsym $mod+Shift+3 move container to workspace $ws3
bindsym $mod+Shift+4 move container to workspace $ws4
bindsym $mod+Shift+5 move container to workspace $ws5
bindsym $mod+Shift+6 move container to workspace $ws6
bindsym $mod+Shift+7 move container to workspace $ws7
bindsym $mod+Shift+8 move container to workspace $ws8
bindsym $mod+Shift+9 move container to workspace $ws9
bindsym $mod+Shift+0 move container to workspace $ws10

# assign
# assign [class="chromium"] $ws4
# assign [class="arandr"] $ws10
# assign [class="wps"] $ws6
# assign [class="et"] $ws6
# assign [class="wpp"] $ws6
# assign [class="virtualbox"] $ws9
# assign [class="steam"] $ws5
# assign [class="thunderbird"] $ws7
# assign [class="slack"] $ws8
# assign [class="virtualbox"] $ws9

# for_window [instance="Steam"] floating enable
# for_window [instance="Steam"] border none

# reload the configuration file
bindsym $mod+Shift+c reload
# restart i3 inplace (preserves your layout/session, can be used to upgrade i3)
bindsym $mod+Shift+r restart
# exit i3 (logs you out of your X session)
bindsym $mod+Shift+e exec "i3-nagbar -t warning -m 'You pressed the exit shortcut. Do you really want to exit i3? This will end your X session.' -b 'Yes, exit i3' 'i3-msg exit'"

# gaps inner 10
gaps inner 0
# gaps outer 5

# resize window (you can also use the mouse for that)
mode "resize" {
        # These bindings trigger as soon as you enter the resize mode

        # Pressing left will shrink the window’s width.
        # Pressing right will grow the window’s width.
        # Pressing up will shrink the window’s height.
        # Pressing down will grow the window’s height.
        bindsym $left       resize shrink width 10 px or 10 ppt
        bindsym $down       resize grow height 10 px or 10 ppt
        bindsym $up         resize shrink height 10 px or 10 ppt
        bindsym $right      resize grow width 10 px or 10 ppt

        # same bindings, but for the arrow keys
        bindsym Left        resize shrink width 10 px or 10 ppt
        bindsym Down        resize grow height 10 px or 10 ppt
        bindsym Up          resize shrink height 10 px or 10 ppt
        bindsym Right       resize grow width 10 px or 10 ppt

        # back to normal: Enter or Escape
        bindsym Return mode "default"
        bindsym Escape mode "default"
}

bindsym $mod+r mode "resize"

# Start i3bar to display a workspace bar (plus the system information i3status
# finds out, if available)
# i3status
# bar {
    # status_command i3status
# #    status_command py3status -c ~/.i3status.conf
    # strip_workspace_numbers yes
    # separator_symbol " "
    # position top
    # font -misc-fixed-medium-r-normal--13-120-75-75-C-70-iso10646-1
    # font pango:DejaVu Sans Mono 10
    # colors {
        # background #000000
        # statusline #ffffff
        # separator #00E3E3

        # focused_workspace  #4F4F4F #4F4F4F #ffffff
        # active_workspace   #333333 #5f676a #ffffff
        # inactive_workspace #333333 #222222 #888888
        # urgent_workspace   #2f343a #900000 #ffffff
        # binding_mode       #2f343a #900000 #ffffff
    # }
# }

# polybar
# bar {
    # i3bar_command $HOME/.config/polybar/launch.sh
# }
# border
new_window pixel 0

# background
exec_always --no-startup-id feh --bg-scale "/home/kuari/Picture/girl.png"

# screen timeout
exec --no-startup-id xset dpms 600 800 900

# xrandr
exec --no-startup-id xrandr --output eDP1 --mode 1920x1080 --same-as HDMI2

# polybar
# exec_always --no-startup-id $HOME/.config/polybar/launch.sh

#######################################################################
# automatically start i3-config-wizard to offer the user to create a
# keysym-based config which used their favorite modifier (alt or windows)
#
# i3-config-wizard will not launch if there already is a config file
# in ~/.i3/config.
#
# Please remove the following exec line:
#######################################################################
#exec i3-config-wizard
exec_always --no-startup-id feh --bg-scale "/home/liukairui/图片/Sleepy Mountains/sleepy_mountains_light_v06.png"
exec_always albert
exec . ~/.config/polybar/launch.sh
bindsym alt+space exec albert
```
相关阅读：

- [在Archlinux中安装使用i3-gaps和polybar](https://www.jianshu.com/p/fd07c3081493)
- [一份极其优秀的i3配置-github](https://github.com/aeghn/prettyi3)
- [如何配置linux 平铺式窗口管理器i3wm？-知乎](https://www.zhihu.com/question/62251457/answer/200683406)
- [我fork的i3配置-github](https://github.com/Kuari/i3-wm-config)
- [一份解释较为详细的i3配置教程](https://github.com/sainathadapa/i3-wm-config)
- [优秀i3wm配置文件汇总](https://www.deviantart.com/tag/urxvt?offset=0&page=1)

## 2.3 i3wm 联网
当然可以直接往配置里面写密码，也可以在i3键入的终端`nmtui`，图形化配置  
建议还是下载一份network manager

相关阅读

- [nmtui网络配置命令](https://www.cnblogs.com/pipci/p/12571469.html)
- [使用文本用户界面（NMTUI）进行网络配置](https://www.cnblogs.com/dengshihuang/p/8056716.html)

## 2.4 Polybar的安装与尝试使用example配置
**希望您可以吧example试着配置下来，如果可以处理好，使用自定义主题会如鱼得水**
==想要获得更好的阅读体验，请点击[链接](https://blog.csdn.net/qq_33215865/article/details/84720212),我在原文的基础上未做修改==
> 以下内容改自[CSDN](https://blog.csdn.net/qq_33215865/article/details/84720212)

如果不喜欢i3或者其他桌面系统的默认状态栏，polybar还是一个不错的选择。基本上，所有的流行的Linux发行版都可以用包管理器直接进行polybar的安装。ArchLinux可以使用yay或者其他AUR工具安装。

```bash
yay -S polybar-git
```

### Polybar的使用
polybar的启动主要有2个文件，一个启动脚本和一个配置文件。  
配置文件可以使用其他人的配置，也可以使用官方的example示例。  

### Example示例使用
polaybar自带了example示例，让我们可以快速看到polybar的展示，并且可以在其基础上进行修改。exanple的config文件位于/esr/share/doc/polybar，如果是压缩文件我们需要先用bzip2命令进行解压。然后，我们就会获得config文件。

```bash
install -Dm644 /usr/share/doc/polybar/config $HOME/.config/polybar/config
```
之后我们在$HOME/.config/polybar/config目录创建launch.sh文件
```bash
killall -q polybar
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done
polybar example
```
执行launch.sh文件，我们就会看到polybar成功显示在我们上方。  
之后我们需要开机自动启动，在桌面系统的配置文件中上运行launch.sh文件的命令就可以了们，以i3为例。

```bash
exec . ~/.config/polybar/launch.sh
```

我们可以修改config文件进行属性的设定。example的状态栏会有留边，我们可以修改border-size属性来取消。
```bash
border-size = 0
border-color = #00000000
```
遇到模块有问题，请使用[gitgub项目的wiki](https://github.com/polybar/polybar/wiki)，还是不会推荐看[这位Up的视频](https://www.bilibili.com/video/BV17T4y1E7sc?from=search&seid=15772182517967257125)

## 2.5 Polybar的主题配置(polybar-themes)
Polybar的主题可以自己定制，但是我懒，于是在github上找到两个不错的项目

- [一个Nord风格的Polybar](https://github.com/Yucklys/polybar-nord-theme)
- [颇受欢迎的上千款样式大合集](https://github.com/adi1090x/polybar-themes)

我选取了后者(因为多)  
如果你想自己一步一步来，[参见此处](https://guyueshui.github.io/post/polybar-%E7%9A%84%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0/)

### 主题下载
首先，你已经下好了polybar  
然后下载polybar的主题

```bash
cd ~/.config
git clone https://github.com/adi1090x/polybar-themes.git
```

然后在.config目录下就会有一个名为polybar-themes的文件夹

### 配置字体
就会看到一共九个主题，每个主题下都有一个名为fonts的文件夹，想要使用哪个主题，先将主题的字体复制到你系统的字体文件夹下

```bash
cd polybar-themes
ls -l
```
### 字体

我的字体目录是/usr/share/fonts/，我的ttf尾缀的字体在/usr/share/fonts/TTF/下，所以我将ttf字体复制到这里面，然后termsyn是个字体文件夹，直接放在fonts目录下即可，siji放在/usr/share/fonts/misc/下  
最后将原来的~/.config/polybar/这个目录改个名字，如果不需备份的话直接删除就好了

### 以polybar-5为例

```bash
cp -r ~/.config/polybar-themes/polybar-5 ~/.config/polybar
```

接下来运行脚本

```bash
cd ~/.config/polybar/
./launsh.sh
```

### 配置(polybar-5)
如果想更改标题栏顺序，可以在主题中config.ini中修改 建议将[bar/top]下

```bash
modules-left = menu title right-end-top left-end-bottom workspaces right-end-top left-end-bottom colors-switch right-end-top
```

改为

```bash
modules-left = menu workspaces right-end-top left-end-bottom colors-switch right-end-top left-end-bottom title right-end-top
```

用起来感觉好些

如果要更改左上角菜单栏中Files，Terminal等的程序，可以在主题下user_modules.ini中[module/menu]下更改

解决polybar显示不了中文 打开主题目录下config.ini，将

```bash
font-0 = Iosevka Nerd Font:style=Medium:size=14;3
```

改为

```bash
font-0 = unifont:style=Medium:size=14;3
```

当然也可以下载其他支持中文的字体

我用的i3wm所以它的右上角powermenu菜单中logout用不了  
首先下载i3exit

```bash
sudo pacman -S i3exit
```

然后更改主题文件夹下scripts/powermenu，将

```bash
*Logout) openbox --exit ;;
```

改为

```bash
*Logout) i3exit logout ;;
```

## 2.6 应用polybar-themes主题时的一些经验之谈
1. 字体
**siji那个字体一定要用polybar-themes上下载下来的那个版本**  
**要关闭系统对于位图字体的禁止(前文有讲)**  
上文的建议时进行字体拷贝，但是，如果你使用的时KDE桌面，那么可以这样: 设置 -  字体 - 字体管理 - 系统字体 - 从文件安装。这样所有有问题的字体都会弹出错误提示，进而解决
![在这里插入图片描述](https://img-blog.csdnimg.cn/202008172317016.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
2. 调试的方法，直接进i3去修改时很麻烦的，我建议在KDE下操作，找到对应的launch.sh 找到他运行 ploybar的那个命令，在KED的终端运行，这样他不仅会显示报错信息，还可以Ctrl+C停止，改配置，直接重新进入polyvar
3. 模块的问题：
首先建议安装rofi(从添加/删除软件那里就可以找到)
出现Error开头的说明模块有问题，例如
```bash
error: Disabling module "battery" ...
```
我们可以看到是`battery`出了问题，于是去[github-polybar-wiki](https://github.com/polybar/polybar/wiki)找解决方案，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200817233203346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
照猫画虎就可以解决其他的了，实在解决不了，报错信息直接**谷歌**，百 度 太 坑

4. 一定记得吧polybar加入i3自启，然后删除自带状态栏

相关阅读[The Top 26 Polybar Open Source Projects](https://awesomeopensource.com/projects/polybar)

## 2.7 mpd的配置
==想要获得更好的阅读体验，请点击[链接](https://blog.fooleap.org/installation-and-configuration-mpd.html),我在原文的基础上略做修改==
> 以下内容改自[个人博客](https://blog.fooleap.org/installation-and-configuration-mpd.html)

使用 i3 窗口管理器，感觉很舒服，更有帅帅的 i3status 点缀之，在 GitHub 搜了下，发现有个i3status 修改版[1]，可以显示 MPD 的播放状态，于是又用起 MPD。

MPD [2] 是一个实用的音乐播放器，以其独特的 C/S 结构获得人们的喜爱。充其量 MPD 只是作为一个守护进程（或者可以说服务）运行于后台，想要控制它的播放，还需要一个客户端，一般只选用 MPC (Music Player Command)， MPC 虽为命令行客户端，但已够用。

下面一起来安装配置 MPD，获得恰到好处的使用体验
### MPD
安装 MPD, MPC

```bash
# pacman -S mpd mpc
```

创建 MPD 的配置文件~/.config/mpd/.mpdconf

```bash
music_directory         "~/Music/"
playlist_directory      "~/.mpd/playlists"
db_file                 "~/.mpd/database"
log_file                "~/.mpd/log"
pid_file                "~/.mpd/pid"
state_file              "~/.mpd/state"
bind_to_address         "127.0.0.1"
port                    "6600"
audio_output {
	type            "alsa"
	name            "My ALSA Device"
	mixer_control   "Master"
}
```

更多配置可参考 `/usr/share/mpd/mpd.conf.example`

```bash
$ mkdir -p ~/.mpd/playlists
$ touch ~/.mpd/{database,log,pid,state}
```

至此，可直接运行 mpd 命令以启动

通过 systemd 设置自启，默认配置不是普通用户的，遂先修改 mpd.service 文件，指定配置/usr/lib/systemd/system/mpd.service

```bash
...
[Service]
ExecStart=/usr/bin/mpd /home/fooleap/.mpdconf --no-daemon
...
# systemctl enable mpd
```

### 均衡器
播放器是有了，但 MPD 不带均衡器，在此使用 Alsaequal[3] 充当均衡器

安装

```bash
$ yaourt -S alsaequal caps
```

配置~/.asoundrc

```bash
ctl.equal {
 type equal;
}

pcm.plugequal {
  type equal;
  # Modify the line below if you do not
  # want to use sound card 0.
  #slave.pcm "plughw:0,0";
  #by default we want to play from more sources at time:
  slave.pcm "plug:dmix";
}
#pcm.equal {
  # If you don't want the equalizer to be your
  # default soundcard comment the following
  # line and uncomment the above line. (You can
  # choose it as the output device by addressing
  # it with specific apps,eg mpg123 -a equal 06.Back_In_Black.mp3)
pcm.!default {
  type plug;
  slave.pcm plugequal;
}
```

重启 Alsa 后，可调整增益值

```bash
$ alsamixer -D equal
```
~/.mpdconf
```bash
...
audio_output {
  type    "alsa"
  name    "My ALSA Device"
  device  "plug:plugequal"
  mixer_control	"Master"		# optional
}
...
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818002230485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)

### MPC
尝试播放

```bash
$ mpc listall | mpc add
$ mpc play
```

添加所有音乐到当前播放列表

- 播放
- 播放列表

通过 MPC 创建的是 *.m3u 格式的 Playlist

假设 ~/Music 文件夹里有多个文件夹，创建播放列表，包含某目录（或多目录）下所有音乐

```bash
$ mpc clear
$ mpc ls
$ mpc listall FolderName1 FolderName2 .. | mpc add
$ mpc save playlist
$ mpc load playlist
```

清空当前播放列表  
列出文件夹  
显示名字为 FolderName1 FolderName2 文件夹下的所有音乐并添加到当前播放列表  
保存当前播放列表为 playlist  
读取播放列表 playlist   
也可以通过类似下面的命令来创建播放列表，萝卜青菜

```bash
$ cd ~/Music
$ find * -iname "*.mp3" | sort | grep Keyword > ~/.mpd/playlist/playlist.m3u
```

更多使用可以参考 man mpc

### 多媒体键
使用 Thinkpad 多媒体键来代替常用的 mpc 命令再合适不过，这里通过 Xbindkeys[4] 来绑定

安装 Xbindkeys

```bash
# pacman -S xbindkeys
```

配置 Xbindkeys
~/.xbindkeysrc

```bash
"mpc toggle"
XF86AudioPlay

"mpc stop"
XF86AudioStop

"mpc prev"
XF86AudioPrev

"mpc next"
XF86AudioNext

"amixer sset Master 2-"
XF86AudioLowerVolume

"amixer sset Master 2+"
XF86AudioRaiseVolume

"amixer sset Master toggle"
XF86AudioMute
```

将 xbindkeys & 添加到 ~/.xinitrc 使其随 X 启动

### 键映射
在此之前，可能需要通过 Xmodmap[5] 修改键映射

```bash
~/.Xmodmap
!Media
keycode 173 = XF86AudioPrev
keycode 172 = XF86AudioPlay
keycode 171 = XF86AudioNext
keycode 174 = XF86AudioStop

!Volume
keycode 121 = XF86AudioMute
keycode 122 = XF86AudioLowerVolume
keycode 123 = XF86AudioRaiseVolume
```

将 xmodmap ~/.Xmodmap & 添加到 ~/.xinitrc 使其随 X 启动

相关阅读
[Fix MPD on polybar](https://forum.archlabslinux.com/t/fix-mpd-on-polybar/1861/8)

## 2.8 新终端
感觉Konsole挺好的，那天再说

# 3.备份您的文件(dotfile项目)
由于在Linux下大部分文件都是`.XXXrc`,有人叫他`dotfile`  

> 以下转自[简书](https://www.jianshu.com/p/7UJapk)

1. dotfiles是什么？  
  我自己的理解:linux下有各种app，每个人会根据自己的喜好和习惯来设置一些（快捷键，变量等等），而dotfiles就是保存了这些自定义设置的文件，如果换一台电脑，只要你备份了dotfiles文件，一样可以快速回归到自己熟悉的设置。
2. 如何使用dotfiles? 
  我自己的理解：a.在系统中使用一个文件夹，通过ln命令，将不同的app，不同的系统设置文件都指引到这个文件夹，这样就可以在这个文件夹管理所有的系统app setting了？。
3. 进阶
  既然都统一到了一个文件夹，那么，就可以通过git，dropbox来进行备份，分享，也可以clone下其他人的dotfiles。

不知道自己的理解有没有错，话说中文基本没有入门教程，英文也就是github的那个和一些使用dropbox来备份的。
[项目的github地址](https://github.com/zzuse/dotfiles)

# 4. 优雅的清除Manjaro(双系统用户)
当你准备重装或者删除Manjaro的时候您需要进行以下操作以保证没有残留

1. 右击计算机 - 管理 - 存储磁盘 - 选择manjaro分区选择删除卷 - 直到如图删除manjaro全部分区
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020118975.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020039716.png#pic_center)
2. 安装esayuefi(免费软件)用来删除manjaro的启动项![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020231510.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
看到有两个![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020409644.png#pic_center)
找到一个详细信息有manjaro的
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020449746.png#pic_center)
选中 - 禁用 - 删除 - 重启
**如果还是不行**
a. 下载分区助手 - 找到EFI分区 - 分配盘符 - 以管理员方式运行记事本 - 打开文件 - 进入EFI分区 - 选中Manjaro 文件夹 - 删除
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200818020930402.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70#pic_center)
b. 去BIOS设置删除有问题的启动项或者把有问题的启动项放最后

# 优秀的教程网站与视频

- [Manjaro-KDE配置全攻略](https://zhuanlan.zhihu.com/p/114296129)
- [自由输入法RIME简明配置指南](https://sspai.com/post/55699)
- [Rime 导入搜狗词库](https://www.jianshu.com/p/300bbe1602d4)
- [powerlevel10k主题](https://github.com/romkatv/powerlevel10k)
- [手动导入KDE主题](https://www.reddit.com/r/kde/comments/8g97n7/how_to_add_themes_from_httpsstorekdeorg/)
- [“要解锁，请输入默认密钥环的密码”的解决办法](https://www.cnblogs.com/zenPger/archive/2011/05/25/2057188.html)
- [【最全】manjaro pacman及其数字签名问题解决](https://blog.csdn.net/weixin_44405279/article/details/104123282)
- [教你在Linux终端中键入密码时显示星号（*）的办法](http://8u.hn.cn/Linuxmingling/13084.html)
- [i3wm的使用说明](https://www.jianshu.com/p/b9b644cf528f)
- [如何配置linux 平铺式窗口管理器i3wm？-知乎](https://www.zhihu.com/question/62251457/answer/200683406)
- [我fork的i3配置-github](https://github.com/Kuari/i3-wm-config)
- [一份解释较为详细的i3配置教程](https://github.com/sainathadapa/i3-wm-config)
- [优秀i3wm配置汇总网站](https://www.deviantart.com/tag/urxvt?offset=0&page=1)
- [nmtui网络配置命令](https://www.cnblogs.com/pipci/p/12571469.html)
- [使用文本用户界面（NMTUI）进行网络配置](https://www.cnblogs.com/dengshihuang/p/8056716.html)
- [polybar基础使用](https://blog.csdn.net/qq_33215865/article/details/84720212)
- [一个Nord风格的Polybar](https://github.com/Yucklys/polybar-nord-theme)
- [颇受欢迎的上千款样式大合集Polybar主题](https://github.com/adi1090x/polybar-themes)
- [PolyBar手动配置笔记](https://guyueshui.github.io/post/polybar-%E7%9A%84%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0/)
- [The Top 26 Polybar Open Source Projects](https://awesomeopensource.com/projects/polybar)
- [安装和配置 MPD](https://blog.fooleap.org/installation-and-configuration-mpd.html)
- [Fix MPD on polybar](https://forum.archlabslinux.com/t/fix-mpd-on-polybar/1861/8)
- [dotfiles新手教程](https://www.jianshu.com/p/7UJapk)
- [bilibili-66RINGpolybar的简单基本配置和如何使用官方文档](https://www.bilibili.com/video/BV17T4y1E7sc?from=search&seid=15772182517967257125)
- [UP主TheCW](https://space.bilibili.com/13081489?from=search&seid=1960259514159989618)
- [UP主紫色妖姬半岛](https://space.bilibili.com/43806321?from=search&seid=1960259514159989618)

---

完结撒花


