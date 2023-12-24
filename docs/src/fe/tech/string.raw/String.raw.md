---
title: String.raw 
date: 2023-12-24
tags:
  - javascript
categories:
	- 前端技术
---
# String.raw使用方法及场景
### 目标
匹配字符串中是否含有`html`标签、以及`latex`公式
### 测试用例说明

- 包含普通的`html`标签，例如：`<p>我是段落</p>`
- 包含非闭合`html`标签，例如：`<img src="[https://gengxiaofei.com/logo.png?v=521](https://gengxiaofei.com/logo.png?v=521)" >`
- 包含自闭和`html`标签，例如：`
`
- `letax`公式中的特殊字符`\underline`，可正常匹配
### 场景1（异常）

- 字符串使用普通的变量表示
- 执行正则匹配时，会遇到异常：`Uncaught SyntaxError: Invalid Unicode escape sequence`
- 原因分析：`\underline` 被识别为异常的 `unicode` 字符，导致程序无法继续
```javascript
var text = `要使856÷<img src="https://gengxiaofei.com/logo.png?v=521" style="vertical-align:middle;" alt="" width="18px" height="20px">7的商是两位数,<img src="https://gengxiaofei.com/logo.png?v=521" style="vertical-align:middle;" alt="" width="24px" height="20px">里最大可填 $$\underline{}$$ ．`;
text.match(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>|<([A-Za-z][A-Za-z0-9]*)\b[^>]*\/?>/imgu)
// 执行结果：Uncaught SyntaxError: Invalid Unicode escape sequence

```
### 场景2（基于场景1优化，结果正常，推荐）
```javascript
var text = String.raw`要使856÷<img src="https://gengxiaofei.com/logo.png?v=521" style="vertical-align:middle;" alt="" width="18px" height="20px">7的商是两位数,<img src="https://gengxiaofei.com/logo.png?v=521" style="vertical-align:middle;" alt="" width="24px" height="20px">里最大可填 $$\underline{}$$ ．`;
text.match(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>|<([A-Za-z][A-Za-z0-9]*)\b[^>]*\/?>/imgu)
// 执行结果如下
// ['<img src="https://gengxiaofei.com/logo.png?v=521" …align:middle;" alt="" width="18px" height="20px">', '<img src="https://gengxiaofei.com/logo.png?v=521" …align:middle;" alt="" width="24px" height="20px">']

```
### 关于`String.raw`的说明
**MDN**传送门：[链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw)
> 以下内容来自于MDN
> **String.raw()** 静态方法是[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)的标签函数。它的作用类似于 Python 中的 r 前缀或 C# 中用于字符串字面量的 @ 前缀。它用于获取模板字符串的原始字符串形式——即，替换表达式（例如 ${foo}）会被替换处理，但转义序列（例如 \n）不会被处理。

基于以上说明和场景2的实例，使用`String.raw`时，`\underline`** **会被识别为普通的字符，而不是`unicode`

**补充说明**
基于场景2，如果想要替换实例中的`\underline`** **，需使用正则匹配，且要转义 `\`, 即使用 `\\`  表示 `\`，示例如下
```javascript
var text = String.raw`\underline`
text = text.replace(/\\underline/g, 'i am ok');
console.log(text)
// 执行结果：i am ok
```
