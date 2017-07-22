# NodeJS基础学习

声明：此为个人笔记，通过网上一位大神做的教程学习，教程链接如下  
[七天学会NodeJS](http://nqdeng.github.io/7-days-nodejs/)  

## 1. NodeJS基础  

### 1.1 什么是NodeJS  

JS是脚本语言，脚本语言都需要一个解析器才能运行。对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，NodeJS就是第一个解析器。

## 2. 代码的组织和部署  

### 2.1 模块路径解析规则

我们已经知道，`require`函数支持斜杠`/`或盘符`C:`开头的绝对路径，也支持`./`开头的相对路径。单这两种路径在模块之间建立强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其他模块的代码也需要跟着调整，变得牵一发动全身。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，知道找到模块位置。

#### 2.1.1 内置模块  

如果传递给`require`函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。  

#### 2.1.2 node_modules目录  

NodeJS定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块的时候，则NodeJS依次尝试使用以下路径。

>/home/user/node_modules/foo/bar  
>/home/node_modules/foo/bar  
>/node_modules/foo/bar

#### 2.1.3 NODE_PATH环境变量  

与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间Linux使用`:`分隔，在Windows下使用`;`分隔。例如定义了NODE_PATH环境变量：

>NODE_PATH=/home/user/lib:/home/lib

当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径：

>/home/user/lib/foo/bar  
>/home/lib/foo/bar  

### 2.2 包

我们已经知道了JS模块的基本单位是单个JS文件，但复杂的模块往往由多个子模块组成。为了便于管理和使用，我们可以把多个子模块组成的大模块称为`包`，并把所有子模块放在同一个目录里。  

在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象。

>- cat/  
>   head.js  
>   body.js
>   main.js

其中 `cat`目录定义了一个包，其中包含了3个子模块。`main.js`作为入口模块，其内容如下

```js
var head = require("./head");
var body = require("./body");

exports.create = function(name) {
    return {
        name: name,
        head: head.crate(),
        body: body.create()
    };
};
```

在其他模块里使用包的时候，需要加载包的入口模块。如上例，使用`require('/cat/main')`能达到目的，但是模块入口名称出现在路径里不合适。因此需要做点额外工作，让包使用起来更像是单个模块。

#### 2.2.1 index.js

当模块的文件名是`index.js`，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。

> var cat = require('/cat');  
> var cat = require('/cat/index');

这样处理后，就只需要把包路径传递给`require`函数，感觉上整个目录被当做单个模块使用，更有整体感。

#### 2.2.2 package.json  

如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个`package.json`文件，并在指定入口模块的路径。上例中的`cat`模块可以重构如下：

```
 - cat/   
   + doc/   
   - lib/    
      head.js  
      body.js  
      main.js  
    + test/  
    package.json  
```

其中`package.json`内容如下

```json
{
    "name": "cat",
    "main": "./lib/main.js"
}
```

如此一来，就同样可以使用`require('/cat')`的方式加载模块。NodeJS会根据包目录下的`package.json`找到入口模块所在位置。

### 2.3 命令行程序  

使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序，而前者最终也会用于开发后者。因此我们在部署代码时需要一些技巧，让用户觉得自己是在使用一个命令行程序。

例如我们NodeJS写了个程序，可以把命令行参数原样打印出来。我们把程序部署在`/bin/node-echo.js`这个位置。为了在任何目录下都能运行该程序，我们需要使用以下终端命令：

> $ node /bin/node-echo.js Hello World  
> Hello World  

这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。

> $ node-echo Hello World  

### 2.4 工程目录  

了解了以上知识后，现在可以来完整规划一个工程目录了。以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模块两种使用方式，并且我们会借助第三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录看起来如下：

```
- /home/user/node-echo/  # 工程目录  
    - bin/               # 存放命令行相关代码
        node-echo.js
    + doc/               # 存放文档  
    - lib/               # 存放API相关代码
        echo.js          
    - node_modules/      # 存放第三方包
        +argv/          
    - tests/             # 存放测试用例
    package.json         # 元数据文件
    README.md            # 说明文件
```

以上例子中分类存放了不同类型的文件，并通过`node_modules`目录直接使用第三方包名加载模块。此外，定义了`package.json`之后，`node-echo`目录也可以被当做一个包使用。

### 2.5 NPM  

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

可以看到，NPM建立了一个NodeJS生态圈，NodeJS开发者和用户在里边互通有无。

#### 2.5.1 下载第三方包  

需要用到第三方包时，首先要知道有哪些包可用。虽然[NPM](https://www.npmjs.com/)可以根据包名来搜索，如果不确定第三方包的名字可以使用[神奇](https://www.baidu.com)。

如果已经确定了包名，比如`argv`，就可以在工程目录下打开终端，使用一下命令来下载第三方包。

```
$ npm install argv
·····
argv@0.0.2 node_modules\argv
```

下载好之后，`argv`包就放在工程目录下的`node_modules`中，因此在代码中只需要通过`require('argv')`的方式就可以使用模块，无需指定第三方包的路径。

如果想要下载指定版本的第三方包，可以在包名下加上`@<version>`，如下

```
$ npm install argv@0.0.1
·····
argv@0.0.1 npde_modules\argv
```

如果使用到的第三方包数量多，可以在`package.json`中配置，允许在其中申明第三方包依赖。因此，上例中的`package.json`可以改成：

```json
{
  "name":"node-echo",
  "main":"./lib/echo.js",
  "dependencies":{
    "argv":"0.0.2"
  }
}
```

这样处理后，在工程目录下就可以使用`npm install`命令批量安装第三方包。更重要的是，当以后`node-echo`也上传到了NPM服务器，别人下载这个包的时候，NPM会根据包中申明的第三方包依赖自动下载进一步依赖的第三方包。例如：使用`npm install node-echo`命令时，NPM会自动创建一下目录结构。

```
 - project/
    - node_modules/
      - node-echo/
        -node_modules/
          +argv/
            ·····
  ·····
```

如此一来，用户只需关心自己使用的第三方包，不需要自己去解决所有包的依赖关系。

告一段落。
