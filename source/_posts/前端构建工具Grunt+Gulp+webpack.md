---
title: "前端构建工具Grunt&Gulp&webpack笔记"
date: 2021-9-30 01:00:00
toc: true
description: "包含了前端主要构建工具,主讲:尚硅谷{'张晓飞','熊键'},视频来自B站:{'BV18s411E7gQ', 'BV18s411E7T5', 'BV1e7411j7T5'}"
categories:
  - [前端,构建工具]
tags:
  - 前端
  - 构建工具
  - Grunt
  - Gulp
  - webpack
  - 笔记
---


## Grunt项目构建

### 概述

项目构建就是并编译, 合并, 压缩项目中的JS, SASS, LESS文件; 压缩HTML资源文件; JS语法检查

[Grunt](https://gruntjs.com/)就是用来进行自动化项目构建的, Grunt由一组插件组成, 围绕Grunt工作实现自动化, 常见的功能有

- 合并JS/CSS
- 压缩JS/CSS
- JS语法检查
- LESS/SESS的预编译

**目录结构**
```bash
├── build           // 生成构建文件所在文件夹
├── Gruntfile.js    // grunt配置文件, 首字母大写, 与.bablerc配置差不多
├── index.html
├── package.json
└── src             // 源码文件
    ├── css
    └── js
```

**安装Grunt**
```bash
sudo npm install grunt-cli -g
npm install grunt --include=dev
```

**Geuntrc.js配置**

使用js语法配置, 支持CommonJS规范, 配置方法
```js
module.exports = function(grunt){
    // 初始化配置grunt任务
    grunt.initConfig({

    });
    // grunt执行的时候需要的任务插件(随便写了一个插件)
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 注册Grunt的默认任务, 与执行任务的时候的依赖任务
    grunt.registerTask('default',['uglify']);
}
```

**常用任务插件(先了解下)**

- grunt-contrib-concat——合并多个文件的代码到一个文件中
- grunt-contrib-clean——清除文件(打包处理生成的)
- grunt-contrib-uglify——压缩js文件
- grunt-contrib-jshint——javascript语法错误检查；
- grunt-contrib-cssmin——压缩/合并css文件
- grunt-contrib-htmlmin——压缩html文件
- grunt-contrib-imagemin——压缩图片文件(无损)
- grunt-contrib-copy——复制文件、文件夹
- grunt-contrib-requirejs——合并压缩requirejs管理的所有js模块文件
- grunt-contrib-watch——实时监控文件变化、调用相应的任务重新执行

### 合并JS-concat插件

最好去官网找[说明](https://www.npmjs.com/package/grunt-contrib-concat)

```bash
npm install grunt-contrib-concat --include=dev
```
引入包
```js
grunt.loadNpmTasks('grunt-contrib-concat');
```
在using example中找到配置示例
```js
module.exports = function (grunt) {
    // 初始化配置grunt任务
    grunt.initConfig({
        concat: {
            options: {
                separator: ';', // 链接符号
            },
            dist: {
                src: ['src/js/*.js'], // 合并哪些文件
                dest: 'dist/built.js', // 输出目录
            },
        },
    });
    // grunt执行的时候需要的任务插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 注册Grunt的默认任务, 与执行任务的时候的依赖任务
    grunt.registerTask('default', ['concat']);
}
```

执行命令(当然, 我们注册了默认任务, 可以不写concat)
```npm
grunt concat
```

### 压缩JS-uglify

```js
module.exports = function (grunt) {
    // 初始化配置grunt任务
    grunt.initConfig({
        concat: {
            options: {
                separator: ';', // 链接符号
            },
            dist: {
                src: ['src/js/*.js'], // 合并哪些文件
                dest: 'dist/built.js', // 输出目录
            },
        },

        uglify: {
            my_target: {
                files: {
                    'dist/output.min.js': ['src/js/test1.js']
                }
            }
        }
    });
    // grunt执行的时候需要的任务插件
    grunt.loadNpmTasks('grunt-contrib-concat'); +
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 注册Grunt的默认任务, 与执行任务的时候的依赖任务
    grunt.registerTask('default', ['concat', 'uglify']);        // 注意, 任务应该有序给出, Grunt执行任务是同步的
}
```
```bash
npm install grunt-contrib-uglify 
grunt uglify 
```

### 语法检查-jshint

```bash
npm install grunt-contrib-jshint -dev
```
加载插件
```js
grunt.loadNpmTasks('grunt-contrib-jshint');
```
注册到任务
```js
grunt.registerTask('default', ['concat', 'uglify', 'jshint']);
```
在与`Gruntfile.js`同目录创建配置文件`.jshintrc`, 举例
```js
{
  "curly": true,
  "eqeqeq": true,
  "eqnull": true,
  "expr" : true,
  "immed": true,
  "newcap": true,
  "noempty": true,
  "noarg": true,
  "regexp": true,
  "browser": true,
  "devel": true,
  "node": true,
  "boss": false,
  
  //不能使用未定义的变量
  "undef": true,
  //语句后面必须有分号
  "asi": false,
  //预定义不检查的全局变量
  "predef": [ "define", "BMap", "angular", "BMAP_STATUS_SUCCESS"]
}
```
增加配置内容
```js
jshint : {
  options: {
    jshintrc : '.jshintrc' //指定配置文件
  },
  build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
}
```

### 合并压缩CSS-cssmin

```bash
npm install grunt-contrib-cssmin -dev
```
配置Gruntfile.js
```js
cssmin:{
  options: {                        // 保证结果准确
    shorthandCompacting: false,     // 快速压缩
    roundingPrecision: -1           // 精度-1
  },
  build: {
    files: {
        'build/css/output.min.css': ['src/css/*.css']
    }
  }
}
```
添加与注册插件: 略

### 自动化构建插件-watch

```bash
npm install grunt-contrib-watch -dev
```
**配置任务**:
```bash
watch : {
    scripts : {
        files : ['src/js/*.js', 'src/css/*.css'],           // 需要的文件
        tasks : ['concat', 'jshint', 'uglify', 'cssmin'],   // 执行队列
        options : {spawn : false}                           // 是否全量更新(例如css修改, 是否重新编译js)
    }
}
```
**加载任务**
```js
grunt.loadNpmTasks('grunt-contrib-watch');
```
注册任务:
```js
grunt.registerTask('default', ['concat', 'uglify', 'watch']);
```
命令: 
```bash
grunt   //控制台提示watch已经开始监听, 修改保存后自动编译处理
```
或者

注册任务:
```js
grunt.registerTask('default', ['concat', 'uglify']);
grunt.registerTask('myWatch', ['default','watch']);
```
命令: 
```bash
grunt myWatch
```


### 关于ES6

Grunt插件不支持ES6, 所以处理ES6代码时候应该先使用babel转换, 然后再Grunt



## Gulp项目构建

### 概述

[Gulp](https://gulpjs.com/)是与Grunt功能类似的更加高效的**前端项目构建工具**, 可以基于Node自动的完成代码的检查, 压缩, 合并, 监听, 测试等. 具有如下特点

- 任务化: 所有的事件都有一个统一的接口, 不论做什么都要先去注册一个任务
- 基于流: 基于数据流, Gulp有自己的内存, 在调用Gulp的时候, 程序会将目标文件读入Gulp内存中, 然后通过IO输出数据
- 执行任务可以同步,也可以异步
- **与Grunt一样不支持ES6,如需使用请提前Babel**

**重要API**

- `gulp.src(path)`: 根据路径读取源文件
- `gulp.dest(path)`: 根据路径输出文件
- `gulp.task(name[,deps],fn)`: 调取命令
- `gulp.wartch(glob[,opts],tasks)`或`gulp.wartch(glob[,opts,cb])`: 文件发生变动时修改

**文件结构**
```
├── dist
├── gulpfile.js
├── index.html
├── package.json
└── src
    ├── css
    ├── js
    └── less
```

**全局与局部安装**
```bash
npm install gulp -g
npm install gulp --include=dev
```

**gulpfile.js的配置**

- 任务的创建
  - 注册任务与默认任务  
    任务有公开任务与是有任务, 公开任务中的default可以直接使用glup调用  
    - 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用。
    - 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分。  
    可以使用`tasks`创建任务, 私有任务无法直接被调用, 如果希望直接调用需要`exports`导出  
  - 组合任务  
    Gulp支持与Grunt类似的任务组合, 组合任务有`series(task1, task2...)` 和 `parallel(task1, task2...)`, 两者可以相互嵌套, 区别是`series`是同步的, `parallel`是异步的, 两者无限嵌套就实现了依赖处理, 例如:
    ```js
    const { series } = require('gulp');
    
    // `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
    // 它仍然可以被用在 `series()` 组合中。
    function clean(cb) {
    // body omitted
    cb();
    }
    
    // `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
    // 它也仍然可以被用在 `series()` 组合中。
    function build(cb) {
    // body omitted
    cb();
    }
    
    exports.build = build;
    exports.default = series(clean, build);     // 组合任务输出
    ```

- 常见插件
  - gulp-concat : 合并文件(js/css)
  - gulp-uglify : 压缩js文件
  - gulp-rename : 文件重命名
  - gulp-less : 编译less
  - gulp-clean-css : 压缩css
  - gulp-livereload : 实时自动编译刷新

### 合并压缩JS文件-concat/uglify/rename

安装(注意这里需要对文件进行管道等操作所以要多下载包)
```
npm install gulp-concat gulp-uglify gulp-rename -dev
```
配置文件
```js
var gulp = require('gulp');             // 引入
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); 
var rename = require('gulp-rename'); 

function ChuLiJS() {                  // ! 虽然没有return也可以执行, 但是"玄学上"有return的话执行结束才会释放GULP空间
  return gulp.src('./src/js/*.js')      // 源文件 =管道=>
    .pipe(concat('all.js'))             // 合并成 =管道=>
    .pipe(gulp.dest('./dist/'))         // 输出到 =管道=>
    .pipe(uglify())                     // 压缩文件 =管道=>
    .pipe(rename({suffix: '.min'}))     // 重命名(仅修改后缀, 不动扩展名) =管道=>
    .pipe(gulp.dest('./dist/'))         // 输出到
}

exports.ChuLiJS = ChuLiJS;
```

### 转译Less合并压缩CSS文件-less与clean-css

安装
```npm
npm install gulp-less gulp-clean-css -dev
```
配置文件
```js
var gulp = require('gulp');             // 引入
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');


function ChuLiLess() {
  return gulp.src('./src/less/*.less')    // 源文件 =管道=>
    .pipe(less())                         // 编译成 =管道=>
    .pipe(gulp.dest('./src/css/'))        // 输出到
}

function ChuLiCss() {
  return gulp.src('./src/css/*.css')         // 源文件 =管道=>
    .pipe(concat('build.css'))               // 合并成 =管道=>
    .pipe(cleanCss({compatibility: 'ie8'}))  // 压缩并兼容IE8 =管道=>
    .pipe(gulp.dest('./dist/css/'))          // 输出到

}

exports.ChuLiStyle = gulp.series(ChuLiLess,ChuLiCss);   // 必须同步撒
```

### 压缩HTML文件-thmlmin

安装文件
```npm
npm install gulp-htmlmin -dev
```
配置举例
```js
var gulp = require('gulp');             // 引入
var htmlMin = require('gulp-htmlmin')

function ChuLiHtml(){
  return gulp.src('./index.html')
      .pipe(htmlMin({collapseWhitespace:true}))   // 删除空格
      .pipe(gulp.dest('./dist/'));                // 注意, 此时的引用文件相对路径错了, 所以注意写代码的时候路径地址
}

exports.ChuLiHtml = ChuLiHtml;
```

### 半自动化构建-livereload

安装文件
```npm
npm install gulp-livereload -dev
```
配置举例(监控HTML)
```js
const { series } = require('gulp');
var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var liveReload = require('gulp-livereload');


function ChuLiHtml(){
  return gulp.src('./index.html')
      .pipe(htmlMin({collapseWhitespace:true}))   // 删除空格
      .pipe(gulp.dest('./dist/'))
      .pipe(liveReload())         // [选]也可以添加这么一行手动调用实时刷新
}

function ChuLiLive(){
  // 开启监听
  liveReload.listen();
  gulp.watch(['./index.html'], series('ChuLiHtml'));
  // gulp.watch(['./src/less/*.less', './src/css/*.css'], series('ChuLiLess', 'ChuLiCss'))    // 支持注册多个模块
}

exports.ChuLiHtml = ChuLiHtml;    // 需要开放
exports.default = ChuLiLive;  
```

### 全自动化构建(实时刷新页面)-connect与open

安装
```npm
npm install gulp-connect open -dev
```
配置举例(监控HTML)
```js
const { series } = require('gulp');
var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var open = require('open');

function ChuLiHtml(){
  return gulp.src('./index.html')
      .pipe(htmlMin({collapseWhitespace:true}))   // 删除空格
      .pipe(gulp.dest('./dist/'))
      .pipe(connect.reload())         // ! 添加这么一行手动调用实时刷新
}

function server(){
  // connect 提供了一个微型服务器让浏览器访问, 并刷新
  // 根目录, 实时刷新?, 端口
  connect.server({
    root: './dist',
    livereload: true,
    port: 5000
  });

  open("http://localhost:5000/");       // 打开页面

  gulp.watch(['./index.html'], series('ChuLiHtml'));
  // gulp.watch(['./src/less/*.less', './src/css/*.css'], series('ChuLiLess', 'ChuLiCss'))    // 支持注册多个模块
}

exports.ChuLiHtml = ChuLiHtml;    // 需要开放
exports.default = server;  
```

### 自动引入gulp插件-load-plugins

原来的gulpfile.js文件
```js
const { series } = require('gulp');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

function ChuLiHtml(){
  return gulp.src('./index.html')
      .pipe(htmlmin({collapseWhitespace:true}))   // 删除空格
      .pipe(gulp.dest('./dist/'))
}

exports.ChuLiHtml = ChuLiHtml;    // 需要开放
exports.default = server;  
```
为了减少多次require, 可以使用插件gulp-load-plugins

安装
```npm
npm install gulp-load-plugins -dev
```
使用
```diff
var gulp = require('gulp');
+ var $ = require('gulp-load-plugins')();       // 引入的插件是个方法，必须记住调用。
- var htmlmin = require('gulp-htmlmin');
```
在使用的时候需要将`方法`改为`$.方法`
```diff
function ChuLiHtml(){
  return gulp.src('./index.html')
-      .pipe(htmlmin({collapseWhitespace:true}))   // 删除空格
+      .pipe($.htmlmin({collapseWhitespace:true}))   // 删除空格
      .pipe(gulp.dest('./dist/'))
}
```
对于插件名后缀有`-`的采用驼峰命名, 例如`gulp-load-clean-css`改为`cleanCss`


## webpack

### 简介

webpack是一种前端资源构建工具, 也是一个静态模块打包器

- 构建工具: 我们在写网页的时候需要合并压缩JS, 编译less, 在之前我们一般是单独维护每一个小工具最后实现所有功能, 现在可以使用构建工具整合所有的操作
- 静态模块打包器: 文件在编写的时候可能会应用其他的模块, 文件类型(JS引用CSS), 静态模块打包器可以记录每个模块的依赖, 引入需要的依赖(chunk), 生成文件依赖树, 为我们进行打包

#### webpack的核心概念

- **Entry**入口, 指示webpack从那个文件作为入口开始打包文件, 分析内部依赖图
- **Output**输出, webpack输出的文件如何命名
- **Loader**让webpack识别css/img格式的文件(本体只能处理JS)
- **Pulgins**插件, 可以执行更复杂的任务, 例如打包压缩css/img
- **Mode**有两种对应模式
  - develop开发模式: 配置简单, 保证可以在本地调试运行
  - production生产模式: 启用更多插件, 优化代码运行

### 基本使用

安装
```npm
sudo npm install webpack-cli -g
npm install webpack-cli webpack -dev
echo 'export PATH="./node_modules/.bin:$PATH"' >> ~/.zshrc    # zsh安装
```

运行
```npm
webpack ./src/js -o ./build/ --mode=development     # 开发模式 生成文件不压缩, 显示来自哪个文件
webpack ./src/js -o ./build/ --mode=production      # 生产模式 压缩内容与代码
```

注意

- webpack本体可以处理js/json, 不能处理css/img等
- 可以将ES6自动转换为ES5
- 生产环境没有注释, 自动压缩代码

### 开发环境配置

#### webpack配置文件

webpack的配置文件是`webpack.config.js`, 应该与`node_modules`, `src`同文件夹, 由于使用了NodeJS, 所以采用CommonJS语法规范, 配置文件的格式是

```js
const {resolve} = require('path');      // 使用path调用目录绝对路径

module.exports={
    entry: './src/js/index.js',         // 入口文件地址
    output: {
        filename: "built.js", // string (default)
        path: resolve(__dirname, 'build')   // 保存文件路径, 转换为绝对路径
    },module:{
        rules: []
    },plugins:[],
    mode: 'development'
    // mode: 'production'
} 
```

#### 打包css/less

这里使用了额外的Loader:

- `css-loader`: 将css转化为CommonJS模块, 内容是样式字符串
- `style-loader`: 将JS中的css样式资源创建style插入进去, style指的是`<head></head>`中的`<style></style>`, 不是`<div style=""></div>`

安装npm包
```npm
npm install style-loader css-loader -dev
```
配置文件
```js
const {resolve} = require('path');      // 使用path调用目录绝对路径

module.exports={
    entry: './src/js/index.js',         // 入口文件地址
    output: {
        filename: "built.js", // string (default)
        path: resolve(__dirname, 'build')   // 保存文件路径, 转换为绝对路径
    },module:{
        rules: [{
            // 匹配什么文件(以css结尾)
            test: /\.css$/,
            // css-loader可以将css转化为CommonJS模块, 内容是样式字符串
            // style-loader可以JS中的css样式资源创建style插入进去
            // 注意, 这里是<style></style>不是<div style></div>
            // 注意, use中的执行顺序是自右向左
            use: ['style-loader', 'css-loader'],
        }]
    },plugins:[],
    mode: 'development'
    // mode: 'production'
} 
```
index.js引入文件
```js
import sty from '../css/a.css'
```
直接执行webpack
```npm
webpack
```

如果需要引入less, 需要:

- 安装npm包
  ```npm
  npm install less less-loader -dev
  ```
- 修改配置文件, rules中添加
  ```js 
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader','less-loader'],
  }
  ```
- JS直接引入文件
  ```js
  import styl from '../css/c.less'
  ```

#### 打包html

需要使用额外的plugins
```npm
npm install html-webpack-plugin 
```
作为插件, 在使用的时候需要手动引入, webpack.config.js
```js
const HtmlWebpackPlugin = require ('html-webpack-plugin');
// ...
plugins:[
    new HtmlWebpackPlugin()
]
```
这里直接生成会发现build文件夹中多了一个index.html并且会自动引用所有输出资源, 想要指定压缩的html文件, 只需要
```js
plugins:[
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```
值得注意的是我们不要再次引用js资源了

#### 打包img

==此内容适用于webpack4, 在webpack5中官方引入了4个模块处理资源文件==

安装Loader
```npm
npm install url-loader file-loader -dev
```
配置文件,rules写入
```js
{
  // 输入文件类型
  test: /\.(jpg|png|gif)$/,
  use: [{
    loader: 'url-loader',
    // 配置url-loader, 当文件大小小于8K的时候, 不打包压缩文件, 直接转译为Base64
    options: {
      limit: 8*1024
    }
  }]
}
```

==如果在webpack5中还是想使用url-loader==

在[官方文档](https://webpack.docschina.org/guides/asset-modules/#resource-assets)中写有

> 当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时, 你可能想停止当前 asset 模块的处理, 并再次启动处理, 这可能会导致 asset 重复, 你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。

```diff
{
  test: /\.(jpg|png|gif)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8*1024,
+     esModule:false
    }
  }],
+ type: 'javascript/auto',
}
```

==webpack5中的做法==

源模块类型(asset module type), 通过添加 4 种新的模块类型, 来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader, 并且配置资源体积限制实现。

无需安装npm, 只要在配置rulesrules加入
```js
{
  test: /\.(png|jpg|gif)/,
  type: 'asset/resource'
}
```

以上的方法只能处理css中引入的文件, 对于html中的img文件无法处理, 可以使用html-loader
```npm
npm install html-loader
```
加入rules
```js
{
  test: /\.html$/,
  use: ['html-loader'],{
            test: /\.html$/,
            use: ['html-loader'],
        }
}
```

可以看到, webpack会修改文件名, 修改后名字是图片的Hash, 同时注意到, 虽然我们在html与css中两次对同一文件进行引用, 但是webpack只打包了一次

#### 打包其他资源

还可能打包一些不需要压缩的资源(例如字体文件)

加入rules
```js
{
  exclude: /\.(css|js|html|less)$/,
  use: ['file-loader'],
}
```

#### devserver

我们希望实现webpack自动化构建, 实现自动编译, 自动发开浏览器, 自动刷新浏览器, 需要使用模块`webpack-dev-server`

安装
```
npm i webpack-dev-server 
```
配置JS, 在最外层, 与mode同级, 在mode之后
```js
devServer:{
  compress: true,     // 使用gzip压缩
  port: 3000
}
```
注意, 自动化的构建在内存中进行, 并没有输出
```
npx webpack-dev-server  
```


#### 开发环境配置

```npm
sudo npm install webpack-cli -g
echo 'export PATH="./node_modules/.bin:$PATH"' >> ~/.zshrc
npm install webpack-cli webpack style-loader css-loader less less-loader html-webpack-plugin html-loader --include=dev
```
`webpack.config.js`
```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'build')
    },module:{
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },{
            test: /\.less$/,
            use: ['style-loader', 'css-loader','less-loader'],
        },{
            test: /\.(png|jpg|gif)/,
            type: 'asset/resource',
        },{
            test: /\.html$/,
            use: ['html-loader'],
        },{
            exclude: /\.(css|js|html|less)$/,
            use: ['file-loader'],
        }
    ]
    },plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer:{
        compress: true,     // 使用gzip压缩
        port: 3000,
        open: true
    }
} 
```

### 生产环境配置

与开发环境不同的是, 生产环境要求

- CSS文件从JS文件中分离
- 对代码进行合并压缩
- 样式代码与JS代码进行低版本兼容

#### 提取CSS为单独文件

提取单独文件需要插件: `mini-css-extract-plugin`与对应的Loader: `MiniCssExtractPlugin.loader`
```npm
npm install mini-css-extract-plugin -dev
```
配置文件
```js
const { resolve } = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'built')
    },module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, // JS -> .css
             // 'style-loader',         // JS -> <style></style>
                'css-loader']           // 作用是 CSS -> JS
        }]
    },plugins: [
        new HtmlWebpackPulgin({
            template: './src/index.html'
        }), new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ], mode: 'production'
}
```

#### CSS兼容性处理

需要Loader与插件postcss-loader(转译), postcss-preset-env精确兼容性到浏览器
```npm
npm install postcss-loader postcss-preset-env -d 
```
配置文件

```js
const { resolve } = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = 'development';     // 兼容性模式, 默认是production, 与mode无关

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'built')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', {
                    loader: "postcss-loader",   // 因为需要配置选项, 要写成对象
                    options: {
                        postcssOptions: {       // 内部不用管
                            plugins: [["postcss-preset-env"]]
                        }
                    },
                },
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPulgin({
            template: './src/index.html'
        }), new MiniCssExtractPlugin({
            filename: 'css/built.css'
        })
    ],
    mode: 'production'
}
```
对于浏览器配置, 还需要修改包所在的package.json
```json
{
  "name": "demo2",
  "version": "1.0.0",
  // ...
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.02%",
      "not dead",
      "not op_mini all"
    ]
  }
}
```

分别设置了开发模式兼容性与生产模式兼容性, 其中`"last 1 chrome version"`表示只兼容最新版本Chrome,`">0.02%"`表示兼容99.98%的浏览器, `"not dead"`表示不管已经死的浏览器, `"not op_mini all"`不管欧朋浏览器, 更多配置见[官方文档](https://www.npmjs.com/package/postcss-loader#config), 可以使用`npx browserslist`查看支持的浏览器

#### 压缩CSS

需要插件css-minimizer-webpack-plugin
```
npm install css-minimizer-webpack-plugin -dev
```
配置文件
```diff
+ const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
plugins: [
  new HtmlWebpackPulgin({
    template: './src/index.html'
  }), new MiniCssExtractPlugin({
    filename: 'css/built.css'
  }), 
+ new CssMinimizerWebpackPlugin()
],
```

#### ES语法检查

ESLint可以根据配置纠正JS文件的语法错误与风格不统一的问题(实际上可以直接使用VSCODE的插件实现), 我们采用爱彼迎的JS规范: [英文文档](https://github.com/airbnb/javascript), [中文文档](https://github.com/lin-123/javascript)

```npm
npm install eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -dev
```
修改配置文件(rules中追加)
```js
{
  test: /\.js$/,
  exclude: /node_modules/, // 不修复别人的代码
  loader: 'eslint-loader',
  options: {
    // 自动修复 eslint 的错误
    fix: true,
  },
}
```
修改`package.json`(与version同层)
```json
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
  "browser": true
  }
}
```

#### JS兼容性

兼容JS需要使用Babel
```npm
npm install babel-loader \
@babel/core @babel/preset-env core-js \
@babel/polyfill -dev
```
第一行是Loader, 第二行还是Babel的依赖, 第三行是高级语法预设

新增rules
```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    // 预设:指示 babel 做怎么样的兼容性处理
    presets: [
      [
        '@babel/preset-env',
        {
          // 按需加载
          useBuiltIns: 'usage',
          // 指定 core-js 版本
          corejs: {
            version: 3,
          },
          // 指定兼容性做到哪个版本浏览器
          targets: {
            chrome: '60',
            firefox: '60',
            ie: '9',
            safari: '10',
            edge: '17',
          },
        },
      ],
    ],
  },
}
```

#### JS压缩

修改mode为`production`即可

#### html压缩

修改Plugin
```js
new HtmlWebpackPulgin({
  template: './src/index.html',
  minify: {
    collapseWhitespace: true,
    removeComments: true,
  },
})
```

#### 生产环境配置

安装依赖
```npm
sudo npm install webpack-cli -g
echo 'export PATH="./node_modules/.bin:$PATH"' >> ~/.zshrc
npm install -dev webpack webpack-cli @babel/core @babel/polyfill @babel/preset-env babel-loader core-js css-loader eslint eslint-config-airbnb-base eslint-loader eslint-plugin-import file-loader html-loader html-webpack-plugin less less-loader postcss-loader postcss-preset-env style-loader devDependencies css-minimizer-webpack-plugin mini-css-extract-plugin
```
webpack.config.js文件
```js
const { resolve } = require('path');
const HtmlWebpackPulgin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader', {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['postcss-preset-env'],
        ],
      },
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [...commonCssLoader],
    }, {
      test: /\.less$/,
      use: [...commonCssLoader, 'less-loader'],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {
                version: 3,
              },
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
              },
            },
          ],
        ],
      },
    }, {
      test: /\.(png|jpg|gif)/,
      type: 'asset/resource',
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }, {
      exclude: /\.(js|css|less|html|jpg|png|gif)$/,
      use: ['file-loader'],
    }],
  },
  plugins: [
    new HtmlWebpackPulgin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }), new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }), new CssMinimizerWebpackPlugin(),
  ],
  mode: 'production',
};
```
package.json文件(version同级别)
```json
"browserslist": {
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ],
  "production": [
    ">0.02%",
    "not dead",
    "not op_mini all"
  ]
},
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  }
}
```

### webpack配置优化

- 开发环境性能优化  
  - 优化webpack的打包构建速度(HMR)  
  - 优化代码调试(source map)  
- 生产环境性能功能优化
  - 优化打包速度
  - 优化代码性能

### 开发环境配置优化

#### 模块热替换HMR

存在问题, 当一个文件变化时, 全部文件都会重新打包, 希望与GLUP一样, 实现文件热更新

- `devServer`中添加属性`hot = true`
- 修改入口文件: `entry: ['./src/js/index.js', './src/index.html']`
- 修改JS文件, 在末尾加入:
  ```js
  if(module.hot){     // 如果开启了热加载
      module.hot.accept('test.js',function(){   // 监控test文件, 如果变化不重新编译, 只调用回调函数
          work();
      })
  }
  ```

#### SourceMap

与less编译的时候我们需要map文件确定样式对应到哪里一样, 编译后的JS也应该提供类似的功能方便报错后的调试, 只需要与`devServer`同级别设置
```js
devtool: 'source-map'
```
即可, 其中值可以为`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`, 分别表示

- source-map：外部      
    错误代码准确信息 和 源代码的错误位置      
- inline-source-map：内联      
    只生成一个内联source-map    
    错误代码准确信息 和 源代码的错误位置      
- hidden-source-map：外部      
    错误代码错误原因，但是没有错误位置    
    不能追踪源代码错误，只能提示到构建后代码的错误位置    
- eval-source-map：内联    
    每一个文件都生成对应的source-map，都在eval    
    错误代码准确信息 和 源代码的错误位置    
- nosources-source-map：外部    
    错误代码准确信息, 但是没有任何源代码信息    
- cheap-source-map：外部    
    错误代码准确信息 和 源代码的错误位置     
    只能精确的行    
- cheap-module-source-map：外部    
    错误代码准确信息 和 源代码的错误位置     
    module会将loader的source map加入    
    
- 内联 和 外部的区别：    
    - 外部生成了文件，内联没有     
    - 内联构建速度更快    
    
- 开发环境：速度快，调试更友好    
    - 速度快(eval>inline>cheap>...)    
      eval-cheap-souce-map    
      eval-source-map    
    - 调试更友好      
      souce-map    
      cheap-module-souce-map    
      cheap-souce-map   
    - 最终选择: eval-source-map  / eval-cheap-module-souce-map    
    
- 生产环境：源代码要不要隐藏? 调试要不要更友好    
    内联会让代码体积变大，所以在生产环境不用内联    
    nosources-source-map 全部隐藏    
    hidden-source-map 只隐藏源代码，会提示构建后代码错误信息    
    - 最终选择: source-map / cheap-module-souce-map    

### 生产环境配置优化

#### oneOf

在webpack的时候, 每一个文件都要与所有的规则匹配, 检查后缀是否满足, 造成性能损耗, 可以使用oneOf表示一旦文件成功匹配就不再与之后的规则匹配, 同时要求, 不能有两类rule匹配同一个文件, 使用如下
```js
  module: {
    rules: [{ // 不得有两个文件匹配js, 所以eslint单独拿出来
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    }, {
      oneOf: [{// 加入oneOf
        test: /\.css$/,
        use: [...commonCssLoader],
      }, {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      }, {
        test: /\.(png|jpg|gif)/,
        type: 'asset/resource',
      }, {
        test: /\.html$/,
        use: ['html-loader'],
      }, {
        exclude: /\.(js|css|less|html|jpg|png|gif)$/,
        use: ['file-loader'],
      }],
    }],
  },
```

#### 缓存相关

与生产环境HRM类似, 在每次重新构建的时候不希望Babel编译未修改模块, 修改JS文件配置

```diff
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [...],
+   cacheDirectory: true,
  },
}
```
我们还希望用户可以缓存我们的资源文件(在后端路由的时候添加规则), 这是需要修改输出文件名, 方便出现Bug强制清除用户缓存
```diff
output: {
- filename: 'js/built.js',
+ filename: 'js/built.[chunkhash:10].js',
  path: resolve(__dirname, 'built'),
}
//...
new MiniCssExtractPlugin({
- filename: 'css/built.css',
+ filename: 'css/built.[chunkhash:10].css',
})
```

#### tree shaking

剪掉没有被调用的JS/CSS代码, 要求：

1. 必须使用ES6模块化  
2. 开启production环境

部分webpack版本会删除css文件, 需要在package.json中设置`"sideEffects": ["*.css", "*.less"]`(与name同级)

#### code split

我们不希望所有的文件都合并成bindle.js, 希望可以按照我们的要求分成多个js模块, 可以修改入口与输出文件实现

```js
entry: {
  index: './src/js/index.js',     // 多入口文件, 与输出名
  test: './src/js/test.js',
},
output: {
  filename: 'js/[name].[contenthash:10].js',    // 输出文件名要修改成name.hash.js否则会重名
  path: resolve(__dirname, 'built'),
},
// ...
optimization: {     // 将node_modules中模大块单独打包
  splitChunks: {
    chunks: 'all',
  },
},
```

如果我们写的是单页面应用, 只需要一个js文件, 但是我们还是想要实现多输出, 可以通过JS代码实现

```js
entry: './src/js/index.js',       // 单入口输入
output: {
  filename: 'js/[name].[contenthash:10].js',
  path: resolve(__dirname, 'built'),
},
optimization: {     // 将node_modules中模大块单独打包
  splitChunks: {
    chunks: 'all',
  },
},
```

`index.js`文件
```js
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
  注意, 文件名是用注释指定的
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(/*...*/);
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```

#### JS文件的懒加载与预加载

- 懒加载: 在需要的时候再加载JS文件, 例如在调用库中函数的时候再加载, 而不是在import的时候加载
- 预加载: 在懒加载之间, 当浏览器空闲的时候偷偷加载文件  

我们需要修改JS文件实现:

原index.js
```js
import { showMe } from './test';

console.log('INDEX-load');

document.querySelector('#btn').onclick = ()=>{
  showMe();
};
```
原test.js
```js
console.log('TEST-load');

export function showMe() {
    console.log("TEST-OK");
}
```
在浏览器点击按键前会输出两个`XXX-load`, 点击按键之后输出`XX-OK`  
我们希望实现的效果是, 点击按钮前出现`INDEX-load`, 点击按钮后出现`TEST-load`, `TEST-ok`

修改index.js
```js
console.log('INDEX-load');

document.querySelector('#btn').onclick = ()=>{
  import('./test').then(({ showMe }) => {
    showMe();
  })
};
```
直接打包即可

注意到, 在第一次使用showMe的时候, test文件会被懒加载进来, 但是在第二次使用的时候, 由于test已经被加入缓存, 所以不会重复请求test文件

默认情况下test文件会被打上id作为输出文件名, 可以指定输出文件名, 并设置预加载
```js
console.log('INDEX-load');

document.querySelector('#btn').onclick = ()=>{
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ showMe }) => {
    showMe();
  })
};
```

这样设置后, 在打开浏览器我们可以看到`INDEX-load`, 没有`TEST-load`, 但是在网络选项卡中可以看到`test.[hash].js`已经被加载了, 点击按钮, 没有重复请求, 同时输出`TEST-load`与`TEST-ok`

注意, 预加载可能存在兼容性问题

#### 渐进式网页应用PWA(离线可访问)

我们希望实现离线仍然可以尽力访问大部分内容, 典型的页面有[Vue](https://v3.cn.vuejs.org/)(一大特点是地址栏旁边有一个安装XXX)

使用workbox实现
```npm
npm install -dev workbox-webpack-plugin
```
修改配置文件
```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// ...
plugins: [
  // ...
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true, // 使用最新的service worker
    skipWaiting: true, // 快速启动
  }),
]
```
index.js后追加
```js
if ('serviceWorker' in navigator) {
  // 是否支持Service-worker
  window.addEventListener('load', () => {
    // 有的话在全局加载结束后注册事件
    navigator.serviceWorker.register('./service-worker.js') // 注册一个serviceworker, 这个JS文件会在webpack的时候自动生成
      .then(() => {
      // 加载成功...
        console.log('SW-On');
      }).catch(() => {
        console.log('SW-Err');
      });
  });
}
```
如果开启了ESLint的话, 还需要在package.json中配置以支持全局变量(与name同级)
```json
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  }
}
```

#### 多进程打包

安装依赖
```npm
npm install --save-dev thread-loader
```
比较耗时的是babel, 我们为Babel添加, 在`Babel-loader`前面添加`thread-loader`

```js
{
test: /\.js$/,
exclude: /node_modules/,
use: [{
  loader: 'thread-loader',
  options: {
    workers: 2, // 使用双进程(不写就是满进程运行)
  },
}, {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: {
            version: 3,
          },
          targets: {
            chrome: '60',
            firefox: '60',
            ie: '9',
            safari: '10',
            edge: '17',
          },
        },
      ],
    ],
  },
}],
},
```

还是注意, JS是单进程, 开启多进程后需要占用额外的时间, 所以只有工作消耗时间长的时候我们才开启多进程(例如Babel)

#### externals禁止打包

一部分包(例如jQuery)我们可能希望在本地使用npm引入, 但是上线后使用CDN引入, 可以将这些包写入排除打包列表, 然后在html文件中手动引入CDN

与mode同级追加
```js
externals: {
  // 忽略库名 npm包名
  jquery: 'jQuery'
},
```

#### ddl动态链接库

与external类似, 指示webpack哪些库不需要打包, 同时dll支持将指定多个第三方库打包成一个js, 创建新的配置文件用于打包

与`webpack.config.js`同级创建`webpack.dll.js`
```js
const { resolve } = require('path');
const webpack = require('webpack')

module.exports = {
  entry: {
    jquery: ['jquery'], // 要打包的是生成一个jquery, 这个jquery包含的包有(数组里指定的)jquery
  },
  output: {
    filename: '[name].js', // 输出就是名字.js
    path: resolve(__dirname, 'dll'), // 输出路径
    library: '[name]_[hash]', // 别人在调用我的时候使用的包名叫什么
  },
  plugins: [
    // 创建一个manifest.json告诉webpack上面打包的文件不需要打包, 已经被dll打包到哪里了
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
};
```

```npm
webpack --config webpack.dll.js 
```

此时, 我们完成了第三方库的自定义打包

之后, 我们还要告诉webpack

```js
// 告诉 webpack 哪些库不参与打包, 虽然在JS中import了jquery, webpack也是会忽略
new webpack.DllReferencePlugin({
  manifest: resolve(__dirname, 'dll/manifest.json'),
}),
// 设置哪些包应该在html中自动引入
new AddAssetHtmlWebpackPlugin({
  filepath: resolve(__dirname, 'dll/jquery.js'),
}),
```
最后webpack源文件
```
webpack
```

### 基本属性详细配置

#### Entry

entry键有几种值

- String: './src/js/index.js'指定一个输入文件, 打包生成一个chunk, 输出一个文件(默认main.js)
- Array: `['./src/js/index.js', './src/js/test.js']` 指定多个输入文件, 但是只会有一个输出文件, **一般只用于HMR的HTML热更新生效**
- Object: `{index: './src/js/index.js', add: './src/js/add.js'}` 指定多个输出文件, 输出文件名就是键名
- Object混合: `{index: ['./src/js/index.js', './src/js/test.js'], add: ['./src/js/add.js', './src/js/test.js']}` 指定多个输出文件, 输出文件名就是键名, 一个文件可能包含多个包

#### output

常见形式
```js
output: {
  // 输出文件名
  filename: 'js/built.js',
  // 输出文件目录
  path: resolve(__dirname, 'build'),
  // 输出公共路径
  publicPath: '/'
}
```
最后的输出路径就是`path+filename`, `publicPath`一般用于生产环境, 加上`publicPath: '/path/'`, 在请求的时候会进行请求路径`yourdomain.com/path/...`

```js
output: {
  // 输出文件名
  filename: 'js/built.js',
  path: resolve(__dirname, 'build'),
  chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
  library: '[name]', // 整个库向外暴露的变量名
  // libraryTarget: 'window' // 将整个库向外暴露变量, 添加到哪个上, 用于 browser 
  // libraryTarget: 'global' // 将整个库向外暴露变量, 添加到哪个上, 用于 node
  // libraryTarget: 'commonjs' // 使用模块规范进行暴露
}
```

### module

```js
module:{
  rules: [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],// 多Loader
  },{
    test: /\.html$/,                    // 使用文件
    loader: 'html-loader',              // 单个Loader
  },{
    exclude: /\.(css|js|html|less)$/,   // 排除文件
    enforce: true,                      // 优先执行
    enforce: false,                     // 不优先执行
    loader: 'file-loader',
  },{
    oneOf: []                           // 只出现一次
  }]
}
```

### resolve

用于配置解析模块的规则(在mode后)

```js
// 解析模块的规则
resolve: {
  // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
  alias: {
    $css: resolve(__dirname, 'src/css')
    // 以后在引用css的时候只需要`import $css/style.css`
  },
  // 配置省略文件路径的后缀名
  extensions: ['.js', '.json', '.jsx', '.css'],
  // 告诉 webpack 解析模块是去找哪个目录(默认是node_modules, ../node_modules, ../../node_modules, ...)
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
}
```

### devServer

注意是用于开发环境哈

```js
devServer: {
  // 运行代码的目录
  contentBase: resolve(__dirname, 'build'),
  // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
  watchContentBase: true,
  watchOptions: {
    // 不监视的文件(支持正则)
    ignored: /node_modules/
  },
  // 启动gzip压缩
  compress: true,
  // 端口号
  port: 5000,
  // 域名
  host: 'localhost',
  // 自动打开浏览器
  open: true,
  // 开启HMR功能
  hot: true,
  // 不要显示启动服务器日志信息
  clientLogLevel: 'none',
  // 除了一些基本启动信息以外，其他内容都不要显示
  quiet: true,
  // 如果出错了，不要在控制台提示
  overlay: false,
  // 服务器代理 --> 解决开发环境跨域问题
  proxy: {
    // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
    '/api': {
      target: 'http://localhost:3000',
      // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

### optimization

用于分割生成多JS文件

```js
optimization: {
  splitChunks: {
    chunks: 'all'
    // 默认值，可以不写~
    /* minSize: 30 * 1024, // 分割的chunk最小为30kb
    maxSiza: 0, // 最大没有限制
    minChunks: 1, // 要提取的chunk最少被引用1次
    maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
    maxInitialRequests: 3, // 入口js文件最大并行请求数量
    automaticNameDelimiter: '~', // 名称连接符
    name: true, // 可以使用命名规则
    cacheGroups: {
      // 分割chunk的组
      // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
      // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        // 优先级
        priority: -10
      },
      default: {
        // 要提取的chunk最少被引用2次
        minChunks: 2,
        // 优先级
        priority: -20,
        // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
        reuseExistingChunk: true
      } 
    }*/
  },
  // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
  // 解决：修改a文件导致b文件的contenthash变化
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`
  },
  minimizer: [
    // 配置生产环境的压缩方案：js和css
    new TerserWebpackPlugin({
      // 开启缓存
      cache: true,
      // 开启多进程打包
      parallel: true,
      // 启动source-map
      sourceMap: true
    })
  ]
}
```

### webpack5的变化

#### 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

#### Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

#### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

#### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

#### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

#### SplitChunk

```js
// webpack4
minSize: 30000;
```

```js
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

#### Caching

```js
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

#### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

#### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

 
