---
title: Html5的音视频标签与新增冷门标签
date: 2020-10-31 00:00:22
toc: true
description: 介绍了HTML5中新增的有趣有没什么用的标签，~~唯一的价值是在面试的时候吹B~~
categories:
  - [前端,HTML]
tags:
  - 前端
  - HTML
  - 笔记
---

似乎csdn的makedown不支持直接渲染html,如果央视不显示请放在自己的编辑器里面运行

# 音视频标签

最H5之前音视频的实现方式是Flash或者是第三方插件例如QuickTime

1. 音视频的容器  
    常见的mp4,avi只是容器的存储容器的格式，而不是容器的内容，就类似与压缩文件的zip和7z, 而被压缩的文件就是音轨和视频等等    
    主流的格式有：  
     - 视频: `MPEG-4`-`.mp4`, `flash`-`.flv`, `Ogg格式`-`.ogv`, `WebM格式`-`webm`, `音视频交错`-`avi`  
     - 音频: `MPRG-3`-`.mp3`, `ACC音频`-`.acc`, `Ogg格式`-``

2. 编码解码器
    音视频的编码解码器是一组算法对文件进行编码解码以便播放, 原始的视频文件是非常大的，如果不进行编码和解码, 在互联网上传播时间是无法忍受的  
    主流格式有:
     - 视频: `H.264`, `VP8`, `Ogg Theora`
     - 音频: `AAC`,`MPEG-3`,`Ogg Vorbis`
    其中: 
      - `H.264` 为了兼容所有的设备，提供了三种配置，提供了三种不同的解码算量的配置
    编码存在无损与有损，项目一般用有损 

- `video` 在不指定的情况下大小与原文件长宽一致(替换标签大都这样例如`img`), 接受指定width与height
- `audio` 不接受宽高的样式

**在本地下，使用Chrome无法拖动进度条**

## 音视频标签的兼容性写法(`type`一定要写)

```html
<video controls width="500" height="500">
    <source src="./B.mp4" type="video/mp4"></source>
    <source src="./B.ogv" type="video/ogg"></source>
    <source src="./B.webm" type="type/webm"></source>
    当前浏览器不支持video直接播放，点击这里下载视频: <a href="B.webm">下载视频</a>
</video>

<audio controls>
    <source src="./A.mp3" type="audio/mpeg"</source>
    <source src="./A.aac" type="audio/ogg"; codecs="aac"></source>
    <source src="./A.oog" type="audio/ogg"; codecs="vorbis"></source>
</audio>
```

值得注意的是`type`只是让浏览器识别这个格式的文件到底支不支持，如果支持浏览器就下载，但是下载之后浏览器会重新识别文件并播放，也就是说你可以写错`type`但是不能写错成浏览器不识别的

` codecs`是编解码器

## Attribute

- video
  - `controls` bool型，写上就有
  - `width`, `height` 不加像素
  - `poster` 海报,可以理解为视频的封面，给一个图片了路径
  - `autoplay` 自动播放
  - `loop` 循环播放
  - `muted` 静音播放
  - `preload` 告诉浏览器最佳播放的用户体验方式是什么
    - `none` 开发者认为用户不会看，所以不必缓存
    - `metadata` 认为不会播放，但是应该先获取视频的元数据例如时长
    - `auto` 优先加载，允许下载整个视频
    - 空字符串 等价于`auto`

- audio
  - `controls` bool型，写上就有
  - `autoplay` 自动播放
  - `muted` 静音播放
  - `loop` 循环播放
  - `preload` 告诉浏览器最佳播放的用户体验方式是什么
    - `none` 开发者认为用户不会看，所以不必缓存
    - `metadata` 认为不会播放，但是应该先获取视频的元数据例如时长
    - `auto` 优先加载，允许下载整个视频
    - 空字符串 等价于`auto` 

## property

在js中查询音视频的元数据(例如长度)
```js
<script type="text/javascript">
    var vid=document.querySelector("video");
    var aud=document.querySelector("audio");
    setTimeout(function(){
        console.log(vid.duration);
        console.log(aud.duration);
    },500);
</script>
```
由于chrome的加载策略必须设置延时，但是firefox不需要，不设置chrome显示`NAN`，类似的还有

- 当前播放时长`.currentTime`(秒)
- 是否静音`.muted`(true/false)
- 获取音量`.volume`(0-1)
- 是否暂停`.paused`(true/false)
- 是否结束`.ended`(true/false)
- 是否出错`.error`(true/false)
- 当前播放文件地址`.currentSrc`(秒)
- 标签的长宽`width`/`height`
- 文件的长宽`videoWidth`/`videoHeight`

**注意：上面的都不是左值 接受修改，例如`vid.volume=0.2;`**  
**注意：`muted`的优先级`volum`高，所以设置muted之后volum无效**  

## 音视频的js函数
- `play()`媒体播放
- `pause()`媒体暂停
- `load()`媒体重新加载 

# 状态标签
- `meter` 用来显示(已知范围的标量值)或(分数值) 注意断句，效果就是现实一个进度条,如图例如`<meter value="0.3"></meter>`就是这样的<meter value="0.3"></meter>(markdown支持Html是真的方便)参数有：
  - `value`当前值
  - `min` 下边界，默认0, `max` 上边界，默认1
  - `low`,`heigh`表示正常值范围，低于`low`会有特殊样式,高于也会，例如`<meter value="0.3" low="0.4" high="0.8"></meter>`<meter value="0.3" low="0.4" high="0.8"></meter>和`<meter value="0.9" low="0.4" high="0.8"></meter>`<meter value="0.9" low="0.4" high="0.8"></meter>
  - `optimum` 最优值`<meter value="0.5" low="0.4" high="0.8" optimum="0.5"></meter>`<meter value="0.5" low="0.4" high="0.8" optimum="0.5"></meter>
  - 值得注意的是`min`<`low`<`height`<`max`,`min`<`value`<`heigh`,`optimum`不受限制

-  `process`描述一个工作完成的进度
    - `value` 当前值(不写表示当前任务无法估量，是一个正在进行中的条)
    - `max` 总任务量

```html
<progress value="20" max=100></progress>
<progress max=100></progress>
```
<progress value="20" max=100></progress>
<br>
<progress max=100></progress>

# 结构化标签

- `datalist` 包含一族`option`元素,这些元素表达表单的可选值元素,内容写在datalist里面，可用于表单选择，例如
  ```html
  <p>普通版</p>
  <input type="text" placeholder="123"></input>
  <p>新版</p>
  <input type="text" placeholder="123" list="tmp"></input>
    <datalist id="tmp">
        <option value="A">好好</option>
        <option value="B">哈哈</option>
        <option value="1">嘿嘿</option>
        <option value="12">呵呵</option>
    </datalist>
  ```
    <p>普通版</p>
  <input type="text" placeholder="123"></input>
  <p>新版</p>
  <input type="text" placeholder="123" list="tmp"></input>
    <datalist id="tmp">
        <option value="A">好好</option>
        <option value="B">哈哈</option>
        <option value="1">嘿嘿</option>
        <option value="12">呵呵</option>
    </datalist>

- `detail`&`summary`标签，组合使用，现实详情，相当于是做了一个js封装，但是交互太差没人用

    ```html
    <details>
            <summary>这是第一个summary</summary>
            <p>这是一个解释</p>
            <p>这是一个解释</p>
            <p>这是一个解释</p>
            <p>这是一个解释</p>        
        </details>
    ```
    <details>
        <summary>这是第一个summary</summary>
        <p>这是一个解释</p>
        <p>这是一个解释</p>
        <p>这是一个解释</p>
        <p>这是一个解释</p>        
    </details>

- 注释标签
    更像是注音标签，`ruby`里面写被标注的部分，标注的部分写在被标注的旁边，用`rt`包起来，例如`<p><ruby>凎<rt>gan</rt></ruby></p>`会得到
    
    <p><ruby>凎<rt>gan</rt></ruby></p>

# 语义标签

- mark(语义化标签)，着重
    突出某内容的行内元素`<mark>这是一个mark</mark>`<mark>这是一个mark</mark>

# 新表单

仍然使用form标签 

新增选项

- input:type="email" 输入会检查邮件格式，有问题会报错
- input:type="tel" 移动端会自动切换到数字键盘
- input:type="url" 输入会检查url格式，有问题会报错(必须有http,www)
- input:type="search" 搜索狂，输入后显示清空的叉
- input:type="range" 滑块，可以设置`min`,`max`,`step`
- input:type="number" 移动端显示数字键盘
- input:type="color" 颜色选择器
- input:type="datetime" 输入有时区的日期时间
- input:type="datetime-local" 输入没有时区的日期时间
- input:type="time" 输入时间
- input:type="date" 输入日期
- input:type="week" 输入周
- input:type="month" 输入月份

新增属性

- `placeholder`输入框的默认提示信息  
  选中placeholder(搜索框的默认值): `::-webkit-input-placeholder`
- `autoforce`自动获取焦点，多个元素同时自动获取焦点只有第一个有效
- `require` 要求必填
- `formaction` 特殊定义提交的地址

新增js

表单验证

validity对象，通过下面的valid可以查看验证是否通过，如果八种验证都通过返回true，一种验证失败返回false  
node.addEventListener("invalid",fn1,false);

- valueMissing  	 :  输入值为空时返回true
- typeMismatch 	 :  控件值与预期类型不匹配返回true
- patternMismatch  :  输入值不满足pattern正则返回true
- tooLong  		 :  超过maxLength最大限制返回true
- rangeUnderflow   :  验证的range最小值返回true
- rangeOverflow    :  验证的range最大值返回true
- stepMismatch     :  验证range 的当前值 是否符合min、max及step的规则返回true
- customError 不符合自定义验证返回true
- setCustomValidity : 关闭验证
- formnovalidate : 属性
		
		

​		
