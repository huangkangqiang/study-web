# AJAX教程

[菜鸟教程：AJAX教程](http://www.runoob.com/ajax/ajax-intro.html)

## AJAX简介

AJAX是一种无需重新加载整个网页的情况下，能够更新部分网页的技术。

### 什么是AJAX？

AJAX=异步JavaScript和XML。

AJAX是一种用于创建快速动态网页的技术。

通过在后台与服务器进行少量数据交换，AJAX可以使网页实现异步更新。这意味着可以在不重新加载整个网页情况下，对网页的某部分进行更新。

传统的网页(不使用AJAX)如果需要更新内容，必需重载整个网页面。

### AJAX工作原理

![AJAX工作原理](./images/1.PNG

## AJAX实例

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script>
function loadXMLDoc()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","http://www.runoob.com/try/ajax/ajax_info.txt",true);
    xmlhttp.send();
}
</script>
</head>
<body>

<div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
<button type="button" onclick="loadXMLDoc()">修改内容</button>

</body>
</html>
```

### AJAX实例解析

上面的AJAX应用程序包含一个div和一个按钮

div部分用于显示来自服务器的信息。当被按钮点击时，它负责调用名为loadXMLDoc()的函数

## XHR创建对象

XMLHttpRequest是AJAX的基础。

### XMLHttpRequest对象

所有现代浏览器都支持XMLHttpRequest对象(IE5和IE6使用ActiveXObject)

XMLHttpRequest用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

### 创建XMLHttpRequest对象

所有现代浏览器均内建XMLHttpRequest对象。

创建XMLHttpRequest对象的语法：

>variable=new XMLHttpRequest();

老版本的IE浏览器使用ActiveX对象：

>variable=new ActiveXObject("Microsoft.XMLHTTP");

为了应对所有的现代浏览器，包括IE5和IE6，请检查浏览器是否支持XMLHttpRequest对象。如果支持，则创建XMLHttpRequest对象。如果不支持，则创建ActiveXObject：

```js
var xmlhttp;
if (window.XMLHttpRequest){
    // IE7+，Firefox。Chrome，Opera，Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
}else{
    // IE6，IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```