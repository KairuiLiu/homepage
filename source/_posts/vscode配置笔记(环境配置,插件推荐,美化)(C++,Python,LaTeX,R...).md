---
title: vscode配置笔记(环境配置,插件推荐,美化)(C++,Python,LaTeX,R...)
date: 2020-10-31 00:00:01
toc: true
description: 记录了我Visual Studio Code的使用与配置经历，前前后后差不多用了一年，对于常用的C++,Python,LaTeX,R语言写的较为详细可行
categories:
  - [瞎搞,vscode]
tags:
  - vscode
---

简介那堆废话就不说了，直接开始！

## 1.安装

打开[官网](https://code.visualstudio.com/)直接下载(推荐测试版insider)，
安装时让有一个界面有好几个打钩的，全打上，一路下一步
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030200150826.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
wow，好用的插件全在图里

## 2.基础的用法

- 第一次打开以后发现这玩意居然是英文的，莫慌，看到左侧有一个这样的工具栏
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200301234640717.png)
  第一个是资源管理器，第二个是git，第三个是调试，第四个是扩展市场
  选择第四个，输入chinese，选择第一个插件，点击install(安装)重启即可使用
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200301234950575.png)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200301235015699.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
 **至此你掌握了插件(扩展)的安装方法**
- Vscode作为一款现代编辑器，不可以直接运行文件，需要有一个工作文件夹，所以请在使用时选择 `文件->选择文件夹`，其实直接把文件夹拖动到vscode的图标上即可qwq
- 新建文件：打开资源管理，就是左边那个栏第一个`(Ctrl+B)`，右键->新建->test.cpp->写代码-> **没高亮?**一般是有的，没有选右下角这里，选择cpp，(其他语言同理)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200301235512748.png)
- 快捷键配置
键盘快捷键的设置也在左下角的设置按钮里。打开之后可以看到上图的界面。
默认的快捷键非常方便，我没有修改快捷键。
这里给出几组最常用的快捷键，可以大幅度提高效率（灵活使用甚至可以丢掉鼠标写代码）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200301235842853.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
- **编辑器与窗口管理**  
  打开 Ctrl+O  
  新窗口 Ctrl+Shift+N  
  新标签页 Ctrl+N  
  关闭整个VSC窗口 Ctrl+Shift+W  
  关闭当前标签页 Ctrl+W  
  重新打开刚刚关闭的标签页 Ctrl+Shift+T  
  切换标签页 Ctrl+Tab  
  创建一个新编辑器并将当前页面复制过去 Ctrl+\\  
  在前三个编辑器之间切换 Ctrl+1 2 3将焦点编辑器移动位置  
  先按下 Ctrl+K 左下角出现提示后用 ← → 移动 或者可以 Ctrl+Alt+←→  
  在标签页之间切换 Alt+1~9  
- **代码编辑**  
  搜索 Ctrl+F  
  替换 Ctrl+H  
  复制光标所在行 只需按下Ctrl+C即可。  
  去掉行尾空格 Ctrl+K 然后 Ctrl+X  
  切换行注释(可多行) Ctrl+/  
  代码缩进 Ctrl+[ 或 Ctrl+]  
  当前行上下移动 Alt+↑↓  
  当前行后插入一行 Ctrl+Enter  
  当前行前插入一行 Ctrl+Shift+Enter  
  选中下一行 Ctrl+i  
  **(神级辅助键) 撤销光标上次移动 Ctrl+U**  
  选中下个高亮的匹配项 Ctrl+D  
  **多光标模式 Atl+鼠标单击即可在单击处创建新的光标  
  (这个模式非常灵活，可以搭配多种操作提高效率)  
  (神级辅助键) 速览定义 Alt+F12**  
  转到定义 F12  
  Zen模式(一个奇怪的类似全屏的模式) Ctrl+K 然后 Z  
  **打开自动保存 Ctrl+Shift+P之后输入AutoSave，选中，按下回车。  
  打开终端 Ctrl+~**  
- 鼠标中键  
  按住鼠标中键并选择=Alt+Shift选择 （既选择矩形区域）
  用鼠标中键关闭编辑器/选项卡/通知：在空编辑器/选项卡/通知条任意位置按下中键即可

---

# 以下内容即使你不用这个语言也要跳过之后往后看完！

---

## C/C++ 配置
1. 你需要安装g++/gcc环境并按好环境变量，这部分自己搜索
2. 搜索安装vscode扩展中的
  `C/C++`插件(必装)  
  `Better C++ Syntax` 选装  
  `coderunner插件`这个可以帮你一键运行插件而不需要配置调试文件，但是第一次使用需要配置下，见下  
  `C++ Intellisense` 代码提示与高亮  
**安装最后面写的通用良心推荐插件**
3. 运行你的代码(不使用vscode的运行方法，直接在终端运行，不能调试)：  
  coderunner 直接运行  
5. 运行你的代码(vscode环境下的可以调试)   
  按下`F5`可以开始调试代码，`Shift+F5`可以直接不调试直接运行  
  emm，当然不能运行hahaha  
  你需要告诉vscode咋运行啊  
  vscode傻吗，他不认识这是这是C++文件吗？？  
  为了高度自定义吧qwq...  
  我们需要手动在工作目录下创建一个文件夹包含配置文件如下  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302002944621.png)
  以`英文点开头的是什么文件`？  
  在Linux下是隐藏文件，所以不建议你在windows资源管理器直接创建，建议直接在vscode中创建  
  文件创建必须一摸一样创建下来，然后把一下内容复制下来  
  **launch.json**  
  其中这一行需要修改为你的gcc路径` "miDebuggerPath": "C:/mingw64/bin/gdb.exe",`  
  ```json
  {
      "version": "0.2.0",
      "configurations": [
          {
              "name": "C/C++",
              "type": "cppdbg",
              "request": "launch",
              "program": "${fileDirname}/${fileBasenameNoExtension}.exe",
              "args": [],
              "stopAtEntry": false,
              "cwd": "${workspaceFolder}",
              "environment": [],
              "externalConsole": true,
              "MIMode": "gdb",
              "miDebuggerPath": "C:/mingw64/bin/gdb.exe",
              "preLaunchTask": "g++",
              "setupCommands": [
                  {
                      "description": "Enable pretty-printing for gdb",
                      "text": "-enable-pretty-printing",
                      "ignoreFailures": true
                  }
              ],
          },
      ]
  }
  ```
  **tasks.json**
  ```json
  {
      "version": "2.0.0",
      "command": "g++",
      "args": [
          "-g",
          "${file}",
          "-o",
          "${fileDirname}/${fileBasenameNoExtension}.exe"
      ],
      "problemMatcher": {
          "owner": "cpp",
          "fileLocation": [
              "relative",
              "${workspaceRoot}"
          ],
          "pattern": {
              "regexp": "^(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$",
              "file": 1,
              "line": 2,
              "column": 3,
              "severity": 4,
              "message": 5
          }
      },
      "group": {
          "kind": "build",
          "isDefault": true
      }
  }
  ```
  于是你就可以愉快的设置断点，监视愉快的编程了  
  **每次都要配置这些，太麻烦了!!!**  
  我的解决方法是在C盘根目录下新建文件夹，名字随意(最好首字母和其他文件夹不一样)，然后把你配置好的tasks和launch文件放在里面，每次新建一个工作文件夹的时候在终端这么写  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302004632766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)  
  我是在C下新建vscodejson文件夹放json配置文件，使用时，输入`C:\vscodejson\`只需要输入`\v`+Tab就可以自动补全了，大写的  

---

## Python配置
1. 你需要安装Python环境并按好环境变量，这部分自己搜索
2. 安装vscode的扩展
	1. `Python` 扩展(必装)
	2. `Anaconda Extension Pack` (用Anaconda装)
	3. `Python Extended` 选装
	4. `Python Extension Pack` 选装
	5. `Python for VSCode` 选装
	6. `coderunner插件`这个可以帮你一键运行插件而不需要配置调试文件，插件配置见下
	7. `MagicPython`
3. 愉快的运行(使用coderunner直接运行)
4. `F5`/`Shift+F5`运行+调试，与c++不同的是.vscode文件夹可以自动生成

---

## $\LaTeX$配置
1. 你需要安装$\TeX$环境并按好环境变量，这部分自己搜索
2. 安装vscode的扩展
	1. `LaTeX language support` 扩展(必装)
	2. `LaTeX Preview`
	3. `LaTeX Workshop` 
	4. `latex-formatter` 选装

3. 完事

当你新建一个 $.\TeX$文件之后，就会发现，一旦你打开这个文件，左栏就会出现一个$\TeX$图标，愉快的写一写之后，单击左栏的 $\TeX$,单击build LaTeX Project然后展开View LaTeX PDF，选择View in VSCode Tab即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302082811105.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
第一个命令会帮助我们编译，然后第二个会帮助我们打开PDF，但是，每次修改都要这么一点着实麻烦  
首先，View in Vscode 可以不点，应为编译出新PDF之后vscode会自动刷新，所以我们每次只需要执行  
然后是build LaTeX Project，我们发现他是有快捷键的，我一般是用coderunner运行文件的，运行时`Ctrl+Alt+N`但是coderunner无法运行Tex(可以修改配置文件运行，我们先不讨论)，所以我们可以设置快捷键，实现在Tex文件下,按`Ctrl+Alt+N`执行build LaTeX Project，这里我们这样写  
首先按'按键录制'，按原快捷键的组合，然后右键，更改键绑定，按压`Ctrl+Alt+N`，对于冲突选择'是',然后同样按键录制，`Ctrl+Alt+N`修改如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302083612869.png)
原coderunner的为
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302083550139.png)
修改'当'内的内容请右键条目，选择修改when表达式
coderunner输入为`-`
LaTeX... 输入为`!config.latex-workshop.bind.altKeymap.enabled && editorLangId == 'latex'`
完成，至此，每次只需按`Ctrl+Alt+N`即可编译，然后点一次View in Vscode 以后每次刷新只需按`ctrl+Alt+N`，如果不信请ctrl+s保存或者用最后的方法自动保存

**UpDate: 这个模块还有很多要调教的地方**

1. 默认编译器
  ```json
  "latex-preview.command": "xelatex",
  ```
2. 取消保存后自动编译
  ```json
  "latex-workshop.latex.autoBuild.run": "never",
  ```
3. 出现`Error Page XXX on XXX not`应添加
  ```json
  "latex-workshop.latex.recipes": [
        {
          "name": "xelatex",
          "tools": [
            "xelatex"
          ]
        },
        {
          "name": "xelatex -> bibtex -> xelatex*2",
          "tools": [
            "xelatex",
            "bibtex",
            "xelatex",
            "xelatex"
          ]
        }
      ],
  ```
4. 我也忘了当时为什么要写的配置
  ```json
      "latex-workshop.latex.tools": [
        {
          "name": "latexmk",
          "command": "latexmk",
          "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "-pdf",
            "%DOC%"
          ]
        },
        {
          "name": "xelatex",
          "command": "xelatex",
          "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "%DOC%"
          ]
        },
        {
          "name": "bibtex",
          "command": "bibtex",
          "args": [
            "%DOCFILE%"
          ]
        }
      ],
  ```
5. 使用bibliography务必使用build project下的最后一项Recipe:XeLaTeX->...

---

## HTML&css&Js

1. 安装扩展
	1. Easy LESS（less必备，但是使用的less核心版本有点老）
	2. HTML Boilerplate
	3. HTML CSS Support
	4. HTML Snippets
	5. JS & CSS Minifier (Minify) 压缩必备
	6. Less IntelliSense
	7. Live Server(**必装**)
	8. Browser Preview（可以在vscode里打开浏览器标签，但是偶尔模糊，没mactype勿用）
2. 作为一个前端工程师，一般我们需要实时预览网页，这需要自动保存，方法在最后面，然后想浏览器预览时选择右下方的live share即可，但是有点麻烦，我想设置一快捷键
我一般是用coderunner运行文件的，运行是`Ctrl+Alt+N`但是coderunner无法运行html，所以我们可以设置快捷键，这里我们这样写
首先按'按键录制'，按原快捷键的组合，然后右键，更改键绑定，按压`Ctrl+Alt+N`，对于冲突选择'是',然后同样按键录制，`Ctrl+Alt+N`修改如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302085817998.png)
修改'当'内的内容请右键条目，选择修改when表达式
LiveShare输入：`editorLangId == 'html'`
Coderunner输入：`-`
完事
3.关于min和less，直接使用即可
**可能还有一些好用的插件，以后更新(挖坑)**

---

## R语言
由于我们学校与奥克兰大学(Home Of R)微妙的关系，要用这个做数据分析，R太小众了，使用特别麻烦  
1. 安装R环境，这个不说了  
2. 安装插件  
  - R（必装）  
  - CodeRunner  
  - R LSP Client  
  - R Tool（选装，扩展要老版本的.Net有点麻烦）  
3. 在R环境中配置以与vscode桥接：R下输入
  ```r
  install.packages("languageserver")
  ```
4. 安装多彩R终端  
  需要python环境，然后
  ```
  pip install -U radian
  ```
5. cmd下输入`which radian`复制返回值  
  vscode设置中输入`Rterm`，选择扩展->r->Rterm:windows  
  输入刚刚复制的内容  
6. cmd下输入`which r`复制返回值  
   vscode下ctrl+shift+P输入json  
   选择`首选项打开设置...`在最后一个`}`**前**写下  
  ```
  "r.rterm.windows": "C:\\Users\\tclkr\\AppData\\Local\\Programs\\Python\\Python37\\Scripts\\radian.exe",
      "r.rterm.option": [
        // "--no-save",
        // "--no-restore",
        "--no-site-file"  
      ],
  ```
  第一行用你复制的地址替换  
  如果出现一个红色波浪线，检查前一行是不是最后忘写`,`了，补上  
7. 使用方法：  
	a. 想直接运行文件：coderunner运行，`Ctrl+Alt+N`，他会调用Rscrip但是运行后就关闭了  
	b. `Ctrl+Enter`下面会有一个radian终端，然后选中要运行的代码`ctrl+enter`发送到终端，或者`source("./文件名")`  
	c. 我正在尝试一种新方法实现使用radian一键运行，具体思路是改coderunner配置为  
  ```
  "r": "-join('source(','\"','$fileName','\"',')') |  radian.exe",
  ```
  radian可以打开，但是无法把管道内容加进去，还望大佬指出

---

## Git
Vscode自带git，只需要终端init一下就可以在左边的git中找到，如果想要更强功能，可以安装插件`GitLens`

---

## 正则
不想写正则了？
有一个插件可以插入常用正则
就是`any-rule`

---

## 开发实用插件
1. Bracket Pair Colorizer 2
直接安装即可使用，可以实现括号多色，放置错误匹配，并且错了的括号会标红，效果图来自官网
![
](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2/raw/master/images/forceUniqueOpeningColorDisabled.png)![
](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2/raw/master/images/forceUniqueOpeningColorEnabled.png)![
](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2/raw/master/images/forceIterationColorCycleEnabled.png)![
](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2/raw/master/images/consecutiveExample.png)

2. Svg Preview
可以打开svg文件，安装即可使用

3. Remote - WSL
直接在WSL下编程

4. Polacode-2019
可以把你的代码转为高B格的图片，安装后，当你在需要时，`Ctrl+shift+p`输入plolacode，点击那个照相机，在你的代码上选中需要转换的部分，选择是否透明(transport)和要不要阴影(shadow)，然后点击下面的快门，即可另存为文件
效果如图(官网)
![
](https://raw.githubusercontent.com/octref/polacode/master/demo/1.png)

5. indent-rainbow
	多彩缩减，安装即可使用，错了会标红，python实用，其余语言也可以整一个(官网图)
![
](https://raw.githubusercontent.com/oderwat/vscode-indent-rainbow/master/assets/example.png)

6. settings Sync
可以把你的配置同步到GitHub上防止丢失
登陆Github>Your profile> settings>Developer settings>personal access tokens>generate new token，输入名称，勾选Gist，提交
保存Github Access Token
安装插件，点击login按钮
输入GitHub账密
设置找到setting sync输入你的gist即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302101238624.png)
需要上传配置就`ctrl+shift+P`输入sync，找到上传，网络不通畅请自行爬一趴
可以看到下方显示进度

7. 待补充(挖坑)

## coderunner用法
设置->扩展->run code config
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302094107398.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
蓝色部分与我一致即可

## 建议开启：自动保存
打开设置，第一项就是
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302095050548.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
第一个四个选项意思是：

 - 关 
 - 延时多少秒存一次 
 - 焦点改变 
 - 窗口改变

选第二个，下一项配置延时时间

## 美化插件
1. 主题美化
  推荐最火的`one dark pro`，安装即可使用
  如果你只用c++可以尝试`Dark C++ Theme`不要2.0，适配不错，但是莫名看多之后眼疼qwq
2. 图标包
  推荐`Material Icon Theme`,安装即可使用
3. 背景
**安装与配置时请`以管理员方式运行`**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030210145071.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
右下角那个东西
设置方法
下载background插件(同名太多了，看清作者)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302101553693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdWthaXJ1aQ==,size_16,color_FFFFFF,t_70)
然后找个地方存下你的背景，复制路径
按下下ctrl+shift+P
输入json，选择`首选项打开设置...`
输入
  ```
  "background.useDefault": false,
      "background.customImages": [
        "file:///C:vscodebg.png",//地址，可以设置三个不同的，在分屏的时候轮流出现三种背景
        "file:///C:vscodebg.png",
        "file:///C:vscodebg.png"
      ],
      "background.style":{
        "content": "''",
        "pointer-events": "none",
        "position": "absolute",
        "right":"10px",			////图片距离右边多少，可以改为right:
        "bottom":"0px",			//图片距离底部多少，可以改为top:
        "z-index": "99999",
        "width": "100%",      "height": "100%",
        "background-repeat": "no-repeat",//是否重复显示，就是现实一个还是多个
        "opacity": 0.2//透明度
      },
  ```
如果出现一个红色波浪线，检查前一行是不是最后忘写`,`了，补上
插件原理是修改的vscode的css文件，所以上面都是css选项
多图片效果如图(官网)
![
](https://user-images.githubusercontent.com/9987486/40583705-7105dda8-61c6-11e8-935a-3c5d475a1eb1.gif)
然后保存
他会提示你重启vscode，选择restart即可
然后会出现
![
](https://user-images.githubusercontent.com/9987486/40583926-b1fb5398-61ca-11e8-8271-4ac650d158d3.png)
这是因为我们修改的vscode的css文件，关闭即可，但是，每次都会提示，标题栏也提示[不受信任]这时候需要安装插件Fix VSCode Checksums
然后ctrl+shift+P，输入fix Checksums Apply 点击，重启即可正常使用
此后，每次更新你都会发现背景没了，插件会自动提示restart来显示，然后选择restart，重启软件后会发现又有不受信任，再次fix即可，每次更新都要来一次
**注意这个插件卸载时要按介绍页提示卸载，直接卸载无法关闭效果**

---

这里大致聊了一下Vscode常用配置，大都没有说明插件的用途，以下是我学习时参考网址，可以再次了解相关原理

- VScode概览
  - https://segmentfault.com/a/1190000017949680  
- C/C++
	- https://www.zhihu.com/question/30315894/answer/154979413  
	- https://www.luogu.com.cn/blog/GNAQ/VSC-guide  
- R语言
	- https://sspai.com/post/47386  
- LaTeX
	- https://blog.csdn.net/qq_28303495/article/details/89848209  
- settings sync
	- https://blog.csdn.net/niexia_/article/details/84063656  
- 美化与插件
	- https://www.luogu.com.cn/blog/crab-in-northeast/great-features-and-plugins-for-vscode

## 附：我的setting.json文件

```javascript
{
  "window.zoomLevel": 0,
    "python.formatting.provider": "yapf",
    "python.linting.flake8Args": ["--max-line-length=248"],
    "python.linting.pylintEnabled": false,
    "python.linting.pylintArgs": [
        "--generate-members"
    ],
    "oneDarkPro.editorTheme": "Onedark Pro",
    "workbench.colorTheme": "One Dark Pro",
    "code-runner.preserveFocus": false,
    "code-runner.runInTerminal": true,
    "code-runner.saveFileBeforeRun": true,
    "editor.renderWhitespace": "all",
    "editor.renderControlCharacters": false,
    "http.proxySupport": "off",
    "editor.fontFamily": "'JetBrains Mono',Consolas, 'Courier New', monospace",
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "[html]": {
        
    },
    "files.associations": {
      "*.html": "html",
      "*.txt": "plaintext",
      "*.rmd": "markdown",
      "array": "cpp",
      "atomic": "cpp",
      "*.tcc": "cpp",
      "cctype": "cpp",
      "clocale": "cpp",
      "cmath": "cpp",
      "cstdarg": "cpp",
      "cstddef": "cpp",
      "cstdint": "cpp",
      "cstdio": "cpp",
      "cstdlib": "cpp",
      "cstring": "cpp",
      "cwchar": "cpp",
      "cwctype": "cpp",
      "deque": "cpp",
      "unordered_map": "cpp",
      "vector": "cpp",
      "exception": "cpp",
      "algorithm": "cpp",
      "memory": "cpp",
      "memory_resource": "cpp",
      "optional": "cpp",
      "string": "cpp",
      "string_view": "cpp",
      "system_error": "cpp",
      "tuple": "cpp",
      "type_traits": "cpp",
      "utility": "cpp",
      "fstream": "cpp",
      "initializer_list": "cpp",
      "iosfwd": "cpp",
      "iostream": "cpp",
      "istream": "cpp",
      "limits": "cpp",
      "new": "cpp",
      "ostream": "cpp",
      "sstream": "cpp",
      "stdexcept": "cpp",
      "streambuf": "cpp",
      "typeinfo": "cpp"
    },
    "python.jediEnabled": false,
    "powermode.enabled": true,
    "powermode.comboTimeout": 1000,
    "powermode.comboThreshold": 3,
    "powermode.shakeIntensity": 0,
    "powermode.explosionOffset": 0.3,
    "tabout.disableByDefault": true,
    "background.useDefault": false,
    "background.customImages": [
      "file:///C:vscodebg.png",//背景图片地址
      "file:///C:vscodebg.png",
      "file:///C:vscodebg.png"
      //如果你很好奇为什么得重复三遍，读者自证（划掉）参见说明
    ],
    "background.style":{
      "content": "''",
      "pointer-events": "none",
      "position": "absolute",
      "right":"10px",
      "bottom":"0px",//-47px",
      "z-index": "99999",
      //熟悉css的同学肯定明白上面是什么意思。这个是不用改的。
      "width": "100%",//背景图片缩放有多宽
      "height": "100%",//背景图片缩放有多高
      "background-repeat": "no-repeat",//这个也不用改
      "opacity": 0.2//透明程度。其实普通的需求改这个就行了qwq
    },
    "powermode.enableShake": false,
    "powermode.enableStatusBarComboCounter": false,
    "powermode.enableStatusBarComboTimer": false,
    "files.autoSave": "afterDelay",
    "polacode.target": "snippet",
    "workbench.iconTheme": "material-icon-theme",
    "sync.gist": "ac3709c566f85d9b6a44ff1dda335967",

    //R Language config @ https://sspai.com/post/47386
    //Pay Attention to config the tenminal
    //pip install -U radian

    "r.rterm.windows": "C:\\Users\\tclkr\\AppData\\Local\\Programs\\Python\\Python37\\Scripts\\radian.exe",
    "r.rterm.option": [
      // "--no-save",
      // "--no-restore",
      "--no-site-file"  
    ],
    "r.rpath.lsp": "C:\\Program Files\\R\\R-3.6.2\\bin\\x64\\R.exe",
    "code-runner.executorMap": {
      "javascript": "node",
      "java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
      "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
      "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
      "objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
      "php": "php",
      "python": "python -u",
      "perl": "perl",
      "perl6": "perl6",
      "ruby": "ruby",
      "go": "go run",
      "lua": "lua",
      "groovy": "groovy",
      "powershell": "powershell -ExecutionPolicy ByPass -File",
      "bat": "cmd /c",
      "shellscript": "bash",
      "fsharp": "fsi",
      "csharp": "scriptcs",
      "vbscript": "cscript //Nologo",
      "typescript": "ts-node",
      "coffeescript": "coffee",
      "scala": "scala",
      "swift": "swift",
      "julia": "julia",
      "crystal": "crystal",
      "ocaml": "ocaml",

      
      "r": "Rscript",
      
      // "r": "-join('source(','\"','$fileName','\"',')') |  r.exe --no-save",
      
      // "r": "-join('source(','\"','$fileName','\"',')') |  radian.exe",
      
      "applescript": "osascript",
      "clojure": "lein exec",
      "haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
      "rust": "cd $dir && rustc $fileName && $dir$fileNameWithoutExt",
      "racket": "racket",
      "scheme": "csi -script",
      "ahk": "autohotkey",
      "autoit": "autoit3",
      "dart": "dart",
      "pascal": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
      "d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
      "haskell": "runhaskell",
      "nim": "nim compile --verbosity:0 --hints:off --run",
      "lisp": "sbcl --script",
      "kit": "kitc --run",
      "v": "v run",
      "sass": "sass --style expanded",
      "scss": "scss --style expa,nded"
    },
    "r.linting.trailingWhitespace": false,
    "r.linting.trailingBlankLines": false,
    "r.linting.trueFalseNames": false,
    "r.lsp.debug": true,
    "editor.wordWrap": "on",
    //LaTeX config from CSDN
    "latex-workshop.latex.recipes": [
      {
        "name": "xelatex",
        "tools": [
          "xelatex"
        ]
      },
      {
        "name": "xelatex -> bibtex -> xelatex*2",
        "tools": [
          "xelatex",
          "bibtex",
          "xelatex",
          "xelatex"
        ]
      }
    ],
    "latex-workshop.latex.tools": [
      {
        "name": "latexmk",
        "command": "latexmk",
        "args": [
          "-synctex=1",
          "-interaction=nonstopmode",
          "-file-line-error",
          "-pdf",
          "%DOC%"
        ]
      },
      {
        "name": "xelatex",
        "command": "xelatex",
        "args": [
          "-synctex=1",
          "-interaction=nonstopmode",
          "-file-line-error",
          "%DOC%"
        ]
      },
      {
        "name": "bibtex",
        "command": "bibtex",
        "args": [
          "%DOCFILE%"
        ]
      }
    ],
    "latex-preview.command": "xelatex",
    //auto compress
    "latex-workshop.latex.autoBuild.run": "never",
    // Error Page XXX on XXX not ...
}
```
## 附：目前在用的扩展
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318002051881.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318002107831.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318002129312.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318002145270.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200318002159268.png)

---
# 完结撒花
