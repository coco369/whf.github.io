---
title: JavaScript计时器函数用法
layout: post
categories: JavaScript
excerpt: Javascript计时函数的详细介绍
tags: Javascript计时器 setTimeout setInterval
---
Javascript中和大多数语言一样，存在计时函数，使某语句或函数不用立即执行，可以延时设定的时间值之后再执行。

#### setTimeout() 方法

这个函数表示括号中的代码，延时指定时间后再执行，格式为 `setTimeout("function()", time)`，其中 `time` 的单位是**毫秒**。

例如：

```javascript
function fx()
{
	alert();
}
setTimeout("fx()", 2000);
```

也可以写成：

``` js
setTimoeout(function(){
	alert();
}, 2000);
```

结果就是页面加载完 2 秒后弹出提示框。

#### clearTimeout() 方法

clearTimeout() 方法用于结束 setTimeout() 方法的执行，括号中**参数**为 setTimeout() 返回的 **ID 值**。

举例说明：

``` js
var int1 = setTimeout(function(){alert();}, 5000);
clearTimeout(int1);
```

这样就能**终止**代码执行，不会弹出提示框。

#### setInterval() 方法

这个函数表示**每隔**指定时间间隔执行一次括号中的代码，格式为：`setInterval("function()", time)`， `time` 单位依然为毫秒。

例如：

``` js
function fx()
{
	document.write("0");
}
setInterval("fx()", 2000);
```

这里就不要用 `alert()` 做实验了，后果你懂的 -_- .

同样也能写成：

``` js
setInterval(function(){
	document.write("0");
}, 1000);
```

效果就是不断输出字符“0”。

#### clearInterval() 方法

用法与 clearTimeout() 一样，终止 setInterval() 的执行，括号中填 setInterval() 的返回值。

例如：

``` js
var int2 = setInterval(function()[
	document.write("0");
}, 1000);
clearInterval(int2);
```

这样就能终止输出。

#### 注意

有个小问题，用 setTimeout() 举例，假如代码像下面这样写：

``` js 
function fx()
{
	alert();
}
setTimeout(fx(), 3000);
```

相比上面，就是函数第一个参数少了双引号，猜一下后果会怎样……

后果当然是页面加载后立刻弹出提示框，并不会延时 3 秒。下面的写法也是类似的效果：

``` js
setTimeout((function(){
	alert();
})(), 3000);
```

原因都一样，无论是语句块 `fx()` 还是匿名函数 `(function(){})()`，都是会**立刻执行**的语句，而加双引号的 `"fx()"` 和 `function(){}` 就是当成一个**参数**传递给了函数 setTimeout()，然后这个**参数**语句直到 setTimeou() 真正执行时才生效，也就是延时3秒后执行。

函数 setInterval() 的这个性质与 setTimeout() **类似**。