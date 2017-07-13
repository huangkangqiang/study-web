# Emmet文档

[Emmet文档](http://yanxyz.github.io/emmet-docs/)

## Emmet--网页开发者必备工具

Emmet是一个网页开发者工具，可以大大地提高HTML&CSS开发效率。

基本上当下大多数文本编辑器可以重用常用的代码块，称为代码片段（Snippets）。代码片段是提高生产效率的好办法，不过所有的实现都有共同的缺陷：要先定义代码片段并且不能实时展开。

Emmet将代码片段的思想提升到全新的高度：书写类似于CSS的表达式，然后实时解析展开。Emmet是为了HTML/XML与CSS而开发，也最适用于它们，不过也能与编程语言一块使用。

[Emmet官网](https://emmet.io/)

## 缩写

缩写是Emmet的核心：这些特殊的表达式被实时的解析转化为代码块。缩写的语法类似于CSS选择器。

例如：

>#page>div.logo+ul#navigation>li*5>a{Item $}

按下tab键：

```html
<div id="page">
    <div class="logo"></div>
    <ul id="navigation">
        <li><a href="">Item 1</a></li>
        <li><a href="">Item 2</a></li>
        <li><a href="">Item 3</a></li>
        <li><a href="">Item 4</a></li>
        <li><a href="">Item 5</a></li>
    </ul>
</div>
```

### 语法

#### 缩写语法

Emmet使用过类似于CSS选择器的语法来描述元素的结构与属性。

#### Elements元素

使用元素的名字，比如div、p来生成HTML标签。Emmet没有预定义标签集合，所以可以用任意单词来生成对应的标签：div--<div\><div\>，foo--<foo\></foo\>

#### 嵌套操作符

##### child:> 子元素

>div>ul>li

```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

##### Sibling:+ 兄弟元素

>div+p+bq

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

##### Climb-up:^ 返回上层

\> 操作符加深结构层次

>div+div>p>span+em

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
```

^ 操作符返回上一层

>div+div>p>span+em^bq

```html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```

多个^操作符连写将向上一层层返回：

>div+div>p>span+em^^^bq

```html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

##### Multiplication:* 乘法

>ul>li*5

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

##### Grouping:() 分组

>div>(header>ul>li*2>a)+footer>p

```html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

分组嵌套，并且使用*操作符：

>(div>dl>(dt+dd)*3)+footer>p

```html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

