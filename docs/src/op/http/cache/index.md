---
title: HTTP缓存机制
date: 2023-11-20
tags:
 - http
 - 缓存
categories:
 - 运维|网络
---
# HTTP缓存机制
> 来源
> - 阿里云：配置缓存过期时间：[https://help.aliyun.com/document_detail/27136.html](https://help.aliyun.com/document_detail/27136.html)
> - web前端性能优化/缓存：[https://jecyu.github.io/Web-Performance-Optimization/cache/](https://jecyu.github.io/Web-Performance-Optimization/cache/)
> 
博客
> - [https://gengxiaofei.com/op/http/cache/](https://gengxiaofei.com/op/http/cache/)


## 一、前言
> 缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。

你知道浏览器缓存是怎么回事吗？它可以带来哪些性能的收益？在 `HTTP` 请求流程中，为什么很多站点第二次打开速度会很快？缓存可以减少网络 `IO` 消耗，提高访问的速度。浏览器缓存是一种操作简单、效果显著的前端性能优化手段。

打开 `chrome network` 面板，并取消禁用勾选 「`Disable cache`」，然后输入 `www.taobao.com`，首次进行资源请求并下载完成后，浏览器会对该资源进行缓存，以便第二次请求相同资源时提升响应的速度。
现在我们刷新页面，发起第二次首页请求。
![image.png](./1716221025714-0.png)
从截图中可以看到，可以看到形如 “`200 from xxx`” 这样的描述——对应的资源，这些资源就是我们通过缓存获取到的。浏览器会根据资源的 HTTP 请求头和响应头等一些信息，对资源进行下载后，会把资源缓存到以下 4 种位置：

- **内存缓存（**`**Memory Cache**`**）** 内存缓存具有两个特点，分别是快速读取和时效性。浏览器自行判断什么进行写入，不受开发者控制。
   - 快速读取：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。
   - 时效性：一旦该进程关闭，则该进程的内存则会清空。关闭 tab 页面后则失效，或者页面占用内存过多，排在前面的缓存先失效
- **磁盘缓存（**`**Disk Cache**`**）** 硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行 I/O 操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。硬盘中的缓存，持久存储，允许跨会话或跨站点。
- `**Service Worker Cache**`**（**`**https**`**）**
   - 开发者进行人为存储的永久性存储，用于离线缓存的处理，可以在 `Application` -> `Cache Storage` 查看。
- **Push Cache（http2）**
   - `Push Cache` 是 `HTTP2` 在` sever push` 阶段存在的缓存。

在浏览器中，大部分情况下浏览器会在` js 和图片`等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中读取(`from memory cache`)；而 `css` 文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存(`from disk cache`)
浏览器获取缓存的顺序为 `Service Worker Cache`、`Memory Cache`、`Disk Cache`、（至于 `Push Cache` 属于 `HTTP2` 待验证）。
除了以上的缓存位置外，浏览器还提供一些本地存储方案，包括 `**Cookie**`、`**IndexedDB**` 和 `**LocalStorage**` 等，这些将在另外一篇文章中：[浏览器之本地存储—Cookie、Web Storage、IndexedDB](https://www.yuque.com/geng.ff/hiur8n/bsghe7) 讲述 。
本章主要讲述常用的 HTTP 的缓存机制，主要讲解如何通过 `**HTTP 请求头与响应头**`来控制资源的缓存与读取。

## 二、HTTP 缓存机制探秘
在具体了解 HTTP 缓存之前，先来明确几个术语：

- **缓存命中率**：从缓存中得到数据的请求数与所有请求数的比率。理想状态是越高越好。
- **过期内容**：超过设置的有效时间，被标记为“陈旧”的内容。通常过期内容不能用于回复客户端的请求，必须重新向**源服务器**请求新的内容或者验证缓存的内容是否仍然有效。
- **验证**：验证缓存中的过期内容是否仍然有效，验证通过的话刷新过期时间。
- **失效**：失效就是把内容从缓存中移除。当内容发生改变时就必须移除失效的内容。

接下来，我们将提出几个问题，希望你看完本部分后，能够找到答案：

1. 浏览器什么时候写缓存？
2. 浏览器什么时候读缓存？从哪里开始读？
3. 浏览器的缓存什么时候会失效，如何更新缓存？

### 2.1、HTTP 标头(header)信息如何指示浏览器进行资源缓存
每个浏览器都自带了 `HTTP` 缓存实现功能。你只需要确保每个服务器响应都提供正确的 `HTTP 标头`（`http header`）指令、以指示浏览器**何时缓存**响应以及**缓存多久**。		
当服务器返回**响应**时，还会发出一组 HTTP 标头（响应头），用于描述响应的内容类型、长度、缓存指令、验证令牌等。
比如，在下图的交互中，服务器返回一个 `1024` 字节的响应，指示客户端将其缓存最多 `120` 秒，并提供一个验证令牌（“x234dff”），可在响应过期后用来检查资源是否被修改。
![image.png](./1716221025714-1.png)
当 Web 缓存发现请求的资源已经被存储，它就会**拦截请求**，返回该资源的副本，而不会去**源服务器**重新下载。接下来以一个简单的例子来说明 HTTP 缓存策略的出现：
比如开发一个简单的页面，这个页面只有 `index.html` 页面和它的样式文件 `a.css`。
![image.png](./1716221025714-2.png)
开发完成后放到服务器上，并进行访问，查看网络请求如下。
![image.png](./1716221025714-3.png)
如果每次都要请求 `a.css`，将会很影响加载性能，每次首屏加载时间都很长，我们希望能如下图这样：
![image.png](./1716221025714-4.png)
可以看到 `a.css` 是**304 条件请求**，让浏览器拦截请求并使用本地缓存，这个也叫做**协商缓存**，告诉浏览器使用本地缓存前会先跟服务器确认，如果没变化就使用本地缓存，服务器只返回一个空的响应体，从而**减少了响应体积**来提升性能。
能不能不再请求服务器，强制浏览器使用本地缓存呢，可以通过「`Cache-Control/Expires`」实现，这也叫做**强缓存**，从**减少请求次数**层面提升性能。
![image.png](./1716221025714-5.png)

`HTTP` 头信息(header)控制缓存分为两种：『**强制缓存』和『协商缓存』**

- 强缓存如果命中，就不需要和服务器端发生交互
- 而协商缓存不管是否命中都要和服务器发生交互

**_强制缓存的优先级高于协商缓存_**。

在浏览器已有缓存的情况下，让我们看看具体的匹配流程：
![](./1716221025714-6.png)
以上就是浏览器的**强缓存**和**协商缓存**两种机制流程图，接下来我们看看用户行为对浏览器的缓存策略的影响。

### 2.2、用户行为对浏览器的缓存策略的影响
常见情况下，资源的缓存策略就是按照上一个小节的匹配流程顺序，**强缓存 -> 协商缓存 -> 重新获取**。但是，缓存策略是与用户的操作相关的，平时在浏览网页时我们常常会用到刷新，因此有必要提前了解刷新做了哪些操作，这样在了解强缓存和协商缓存时知道刷新的影响。
具体用户操作如下图所示：
![image.png](./1716221025714-7.png)
在没有禁用 **「Disable Cache」**的情况下：

1. `F5`（`command + r`） 刷新，则在**_请求头_**添加 `Cache-Control: `
2. （`html` 资源符合，其他资源看具体情况），过期时间为 `0`，不会走强缓存。
3. 在同一个 `tag` 页面下，通过地址栏回车（再次访问），效果跟直接用 F5 刷新一样。
4. 强制刷新（`crtl + f5` 或 `command + shift + r`），会在**_请求头_**添加 `Cache-Control: no-cache`，每次都需要服务器评估是否有效。

![image.png](./1716221025714-8.png)
以上的东西你不必背下来，忘记的时候回到这里看看就行。好了，相信你已经迫不及待想要具体了解强缓存和协商缓存。
## 三、强缓存.详解
强缓存可以理解为无须验证的缓存策略，不会再与服务端发生通信。
可以造成强制缓存的字段是 `**Expires/Cache-Control**`，这些指令控制浏览器和其他中间缓存如何缓存各个响应以及缓存多久。
![image.png](./1716221025714-9.png)
在**_没有禁用缓存_**并且**_没有超过有效时间_**的情况下，再次访问这个资源就命中了缓存，不会向服务器请求资源而是直接从浏览器缓存中取，返回的 HTTP **_状态码为 200_**（如下图）。
![image.png](./1716221025714-10.png)
### 3.1、Expires
`Expires` 指缓存过期的时间，超过了这个时间点就代表资源过期。
![image.png](./1716221025714-11.png)
假如服务器中有一个简单的网页，包括以下资源文件：

- index.html
- logo.png
- style.css
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1 class="foo">Hello, Jecyu.</h1>
    <img src="./logo.png" alt="" />
    <img src="./logo.png" alt="" />
  </body>
</html>

```

1. 不设置设置服务器`强制缓存头`的情况下，首次访问网站首页，`netwokr` 表格图如下：（注意：对于同一页面同时请求重复的资源，浏览器不会再发起该请求） ![image.png](./1716221025714-12.png)![image.png](./1716221025714-13.png)
2. 由于上一次请求没有任何响应缓存头设置，这个时候关闭 Tab 页面，然后再次访问页面，可以看到资源仍然从源服务器中获取。 ![image.png](./1716221025714-14.png)
3. 现在给服务器响应头添加 Expires 设置，并重复 1、2 两个步骤。再次访问时，可以看到资源从 disk cache 获取。 ![image.png](./1716221025714-15.png) ![image.png](./1716221025714-16.png)
4. 如果你在第 2 个步骤不是关闭当前 tab 页面，而是按 `F5`（`Command + R`） 刷新页面，请求 html 资源的请求头自动携带了 `max-age: 0`， 会先跟服务器通信验证，由于不存在协商缓存头。而其他资源 css、图片资源仍然从 `memory cache` 中获取。 ![image.png](./1716221025714-17.png)![image.png](./1716221025714-18.png)如果你按 `Crtl + F5 `(或 `Command + Shift + R)`刷新的话，则所有的资源都会添加` Cache-Control: no-cache` 请求头，因为没有设置协商缓存，因此所有资源都重新从源服务器取。![image.png](./1716221025714-19.png)

**完整测试例子**：[example/cache/http/demo01](https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples/cache/http/demo01/server.js)
现在我们给 Expires 一个特写：
```shell
Expires: Fri, 13 Nov 2020 02:25:55 GMT 
```
`Expires` 其实是一个时间戳，这里只不过是格式化的显示。在我们再次向服务器请求相同的资源时，浏览器就会先对比本地时间和 `Expires` 的时间戳，如果本地时间小于 `Expires` 设定的过期时间，那么就直接去缓存中取这个资源。
由于时间戳是服务器来定义的，而本地时间的取值却来自客户端，因此 `Expires` 的工作机制对客户端时间与服务器时间之间的一致性提出了极高的要求。如果服务器与客户端存在误差（时差、用户修改），将会导致意外的结果，那么 Expires 将无法达到我们的预期。
### 3.2、Cache-Control
`Expires` 允许我们通过**绝对的时间戳**来控制缓存的过期时间，这个设置不准确，因此 HTTP 1.1 新增了 `Cache-Control` 字段来解决 `Expires` 的问题。

#### 3.2.1、`Expire`和`Cache-Control`优先级
这里使用 `Expire` 里提到的例子，主要证明 `Cache-Control` 的优先级更高：

1. 不设置设置服务器强制缓存头的情况下，首次访问网站首页，Network 表格图如下：（注意：对于同一页面同时请求重复的资源，浏览器不会再发起该请求） ![image.png](./1716221025714-20.png)
2. 服务器开启 `Cache-Control` 缓存设置，进入页面后，关闭 `tag` 页面，重新打开，可以看到资源从 `disk cache` 获取。 ![image.png](./1716221025714-21.png)
3. 前面的行为跟单独设置 `Expire` 是一致的，现在给 `Expire` 设置一个较短的过期时间 10 秒。 ![image.png](./1716221025714-22.png)
4. 然后同时开启 `Cache-Control` 的 `max-age`（设置稍长点的时间段比如 2min），经过 10 秒后，关闭 tag 页面，重新打开，还是可以看到资源从 `disk cache` 获取，证明 `Cache-Control` 的优先级更高。 ![image.png](./1716221025714-23.png)

**完整测试例子**：[examples/cache/http/demo02](https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples/http/demo02/server.js)
我们给 `Cache-Control` 一个特写：
```html
Cache-Control: max-age=120
```
#### 
#### 3.2.2、`max-age`和`s-maxage`
在 `Cache-Control` 中的 `max-age` 字段允许我们设定**相对的时间长度**来达到同样的目的（单位：秒，是一个相对时间，优先级高于 Expires）。
![image.png](./1716221025714-24.png)
在 `Cache-Control` 中，我们通过 `max-age` 来控制资源的有效期。`max-age` 不是一个时间戳，而是一个时间段。`max-age=120` 意味着该资源在 120 秒以内都是有效的，完美地规避了时间戳带来的潜在问题。
`Cache-Control `相对于 `expires` 更加准确，它的优先级也更高。当 `Cache-Control` 与 `expires` 同时出现时，我们以 `Cache-Control` 为准。
`Cache-Control` 除了 `max-age`，还有以下用法：
```html
Cache-Control: max-age=120, s-maxage=31536000
```
Web 标准中规定 `max-age` 的值最大不超过一年，所以设成 `max-age=31536000`。对于过期的内容，缓存区会将一段时间没有使用的文件删除掉。
`s-maxage` 优先级高于` max-age`，两者同时出现时，优先考虑 `s-maxage`。如果 `s-maxage` 未过期，则向**代理服务器**请求其缓存内容。
`s-maxage` 仅在**代理服务器**中生效，并只对 `public` 缓存有效，客户端我们只考虑 `max-age`。
![image.png](./1716221025714-25.png)
#### 3.2.3、`public` 与 `private`
`public` 与 `private` 是针对资源**是否能够被代理服务器缓存**而存在的一组对立概念。
`public`：共享缓存，那么它既可以被浏览器缓存，也可以被代理服务器缓存；
`private`：私有缓存，则该资源只能被浏览器缓存。`**private**`** 为默认值**。
大多数情况下，`public`不是必须的，因为明确的缓存信息（例如“`max-age`”）已表示响应是可以缓存的，这样即使只设置 `s-maxage`，`CDN` 也可以缓存这个资源。
#### 3.2.4、`must-revalidate`
如果你配置了 `max-age` 信息，当缓存资源仍然新鲜（小于 `max-age`）时使用缓存，否则需要对资源进行验证。所以 `must-revalidate` 可以和 `max-age` 组合使用` Cache-Control: must-revalidate, max-age=60`
对于验证资源是否还有效，还需要设置协商缓存来辅助。
#### 3.2.5、`no-store` 和 `no-cache`
`no-store` 直接禁止浏览器以及所有中间缓存存储任何版本的返回响应。例如，包含个人隐私数据或银行数据的响应。每次用户请求该资产时，都会向服务器发送请求，并下载完整的响应。
`no-cache` 表示必须先与服务器确认返回的响应是否发生了变化，然后才能使用该响应来满足后续同一网址的请求。因此，如果存在合适的验证令牌（ETag），no-cache 会发起往返通信来验证缓存的响应，但如果资源未发生变化，则可避免下载。
这里使用 `Expire` 里提到的例子，只是服务端配置不同，来说明 `Cache-Control` 的一些特性：
```javascript
// server.js
app.use(
  express.static("public", {
    etag: false, // 关闭 Etag 协商缓存
    lastModified: false, // 关闭 lastModifed 协商缓存
    cacheControl: false, // 关闭默认设置，在下面默认处理
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "no-cahce, max-age=60");
      // res.setHeader("Cache-Control", "no-store, max-age=60");
    },
  })
);
```

1. 设置响应头 `no-cache` 和 `max-age` 的情况下，初次访问页面时： ![image.png](./1716221025714-26.png)
2. 关闭页面或另打开一个 `tag` 页面，再次访问，`no-cache` 会获得如下的判断： ![image.png](./1716221025714-27.png)
3. 现在设置 `no-store` 和 `max-age` ，并重复步骤 1 和步骤 2，发现再次请求相同的资源，无论 max-age 是否过期，都会重新请求服务器。

**完整测试例子**：[examples/cache/http/demo03](https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples/cache/http/demo03/server.js)
### 3.3、其他补充：Pragma 与 Vary
#### 3.3.1、Pragma 头
`Pragma` 是 `HTTP/1.0` 标准中定义的一个 `header` 属性，请求中包含 `Pragma` 的效果跟在头信息中定义 `Cache-Control: no-cache` 相同，但是 `HTTP` 的响应头没有明确定义这个属性，所以它不能拿来完全替代 `HTTP/1.1` 中定义的 `Cache-control` 头。通常定义 `Pragma` 以向后兼容基于 `HTTP/1.0` 的客户端。
#### 3.3.2、`Vary` 响应
HTTP 响应头决定了对于后续的请求头，如何判断是请求一个新的资源还是使用缓存的文件。
当缓存服务器收到一个请求，只有当前的请求和`原始（缓存）的请求头`跟缓存的响应头里的 `Vary` 都匹配，才能使用缓存的响应。
![image.png](./1716221025714-28.png)
## 四、协商缓存.详解
协商缓存依赖于服务端与浏览端之间的通信。
协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求下载完整的响应，还是从本地获取缓存的资源。
如果服务端提示缓存资源未改动（`Not Modified`），请求会被浏览器缓存处理，**这种情况下网络请求对应的状态码是 304。**而「`200 OK（from cache）`」是浏览器没有跟服务器确认，直接用了浏览器缓存。
![image.png](./1716221025714-29.png)
可以看到上图中的 ETag 的值是服务器生成并返回的随机令牌，通常是文件内容的哈希值或某个其他指纹。客户端不需要了解指纹是如何生成的，只需在下一次请求时将其 `If-None-Match` 的值，发送给服务器进行验证。
协商缓存有两对值，分别是

- `Etag/If-None-Match`
- `Last-Modified/If-Modified-Since`

一般会配合使用`Cache-Control: max-age=0`或 `Cache-Control: no-cache`
### 4.1、Last-Modified/If-Modified-Since
`Last-Modified` 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 `Response Headers` 返回：
```html
Last-Modified: Fri, 27 Oct 2017 06:35:57 GMT
```
随后我们每次**请求时**，会带上一个叫`If-Modified-Since` 的时间戳字段，它的值正是上一次 `response` 返回给它的 `Last-modified` 值：
```html
If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
```
服务器接收到这个时间戳后，会比对该时间戳和资源在服务器上的最后修改时间是否一致，并在`Response Headers` 中添加新的 `Last-Modified` 值；
否则，`Response Headers` 不会再添加` Last-Modified` 字段。
**注意**：如果响应头中有 `Last-modified` 而没有 `Expire` 或 `Cache-Control `时，浏览器会有自己的算法来推算出一个时间缓存该文件多久，不同浏览器得出的时间不一样。
还是前面的例子，`index.html` 和 `style.css`、`logo` 图片。
为了说明 `Last—Modified` 的操作，这里的 `server.js` 使用原生的 node 实现：
```javascript
// ...
const app = http.createServer(function(request, response) {
  const ifModifiedSince = request.headers["if-modified-since"];
  
  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        } else {
          const raw = fs.createReadStream(filePath);
          // 获取实际文件的修改时间，进行对比
          const stat = fs.statSync(filePath);
          const lastModified = stat.mtime.toUTCString();
          // 写响应头 Last-Modified
          response.setHeader("Last-Modified", lastModified);
          // 进行时间对比
          if (ifModifiedSince && lastModified === ifModifiedSince) {
            response.writeHead(304, "Not Modified");
            response.end();
          } else {
            // 正常写文件
            response.writeHead(200, {
              "Content-Type": mime.getType(extname),
            });
            raw.pipe(response);
          }
        }
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  });
});
// ...
```

1. 服务器只设置协商缓存` Last-Modified`。访问页面后，进行 F5 刷新页面访问。 ![image.png](./1716221025714-30.png)可以看到 `index.html` 响应代码为 304，而其样式和图片资源则直接通过 `memory cache` 中获取。查看 Node 日志，只看到 index 资源的请求发给服务器：
   - `request url: /`

为什么是这样子的呢？
这是因为 
`<link rel="stylesheet" href="style.css" />` 和
`<img src="./logo.png" alt="" />` 的请求路径均没有变化，Chrome 处理都不会发出请求。这里大家可以想想，假如只有样式变化了，那么不就更新不了文件吗？这个问题后面解答。）

2. 然后更改 `index.html` 文件部分内容，重新访问页面，可以发现 `index.html` 响应状态码为 200，这是因为文件最后修改的时间改变了，协商缓存经过验证文件更新了，因此从服务器中获取。 ![image.png](./1716221025714-31.png)

**完整测试例子**：[cache/http/demo04](https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples/cache/http/demo04/server.js)
### 4.2、`Etag/If-None-Match`
使用 `Last-Modified` 会存在一些弊端，这其中最常见的就有两个场景：

- 当我们编辑了文件，但文件的内容没有变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。因此在这个资源在再次被请求时，会被当作新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。
- 当我们修改文件的速度过快时（比如花了 `100ms` 完成了改动），由于 `If-Modified-Since` 只能检查到以秒为最小计量单位的时间差，所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了。

这两个场景其实指向了同一个 bug —— 服务器并没有正确感知文件的变化。为了解决这样的问题，`Etag` 作为 `Last-Modified` 的补充出现了。
`Etag` 是由服务器为每个资源生产的唯一的_标识字符串_，这个标识字符串是基于文件内容编码的，只要文件内容不同，它们对应的 Etag 就是不同的，反之亦然。因此 **Etag 能够精准地感知文件的变化**。
```shell
ETag: W/"2237-1566200378000"
```
那么下一次请求，**请求头**里就会带上一个值相同的、名为 `if-None-Match` 的值供服务端比对：
```shell
If-None-Match: W/"2237-1566200378000"
```
![image.png](./1716221025714-32.png)
Etag 的生成过程需要服务器额外开销，会影响服务端的性能，这是它的弊端。Etag 在感知文件变化上比 `Last-Modified` 更加准确，优先级也更高。
**当 **`**Etag**`** 和 **`**Last-Modified**`** 同时存在时，以 **`**Etag**`** 为准**。
以前面的例子说明，服务端配置如下：
```javascript
const express = require("express"); 
const app = express(); // 打印请求地址 

app.use(function(req, res, next) {   
  console.log(`request url: ${req.url}`);   
  next(); 
}); 

app.use(express.static("public", {     
    etag: true,     
    lastModified: false,     
    cacheControl: false,   
  }) 
);

const listener = app.listen(process.env.PORT, function() {   
  console.log("Serving files on http://localhost:" + listener.address().port); 
}); 
```

1. `ETag` 的测试效果跟 `Last-Modified` 相似，除了一点，就是无论是 `index.html`、还是样式和图片资源，再次刷新后都响应了 `304`。 ![image.png](./1716221025714-33.png)查看 `Node` 日志，可以看到三个资源的请求都发给服务器了：
   - `request url: /`
   - `request url: /style.css`
   - `request url: /logo.png` `chrome` 对 `ETag` 和 `Last—Modified` 的处理有区别，为了保证设置了协商缓存并起作用的情况下，每个资源向服务器进行验证。因此建议一定要设置 `ETag`。
2. 这个时候对 `css` 进行更改，并刷新页面，会获取到最新的资源。 ![image.png](./1716221025714-34.png)

**完整测试例子**：[cache/http/demo05](https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples/cache/http/demo05/server.js)
## 五、如何废弃和更新缓存的资源
协商缓存可以让浏览器先跟服务器验证，强缓存的作用是为了让浏览器不发送资源请求。如果都不让浏览器发资源请求了，这缓存怎么更新呢？
![image.png](./1716221025714-35.png)
如上图，`index.html` 整个文件都没有更改，但是它引用的 `a.css` 样式文件更新了，如何让浏览器获取最新的样式资源呢？
一种方案是，我们可以通过**更新页面中引用的资源路径**，让浏览器主动放弃缓存，加载新资源。类似这样，每次更改版本号：
![image.png](./1716221025714-36.png)
下次上线，把链接地址改成新的版本，就更新资源了。但是这样问题解决了么？
![image.png](./1716221025714-37.png)
页面引用了 3 个 css，而某次上线只改了其中的 `a.css`，如果所有链接都更新版本，就会导致 `b.css`，`c.css` 也失效。
因此，要解决这个问题，**必须让 url 的修改与文件内容关联，摘要信息与文件内容一一对应**，就需要有一种可以精确到单个文件粒度的缓存控制依据。
![image.png](./1716221025714-38.png)
此时，再用文件修改，就只更新那个文件对应的 url 即可。而现代企业，为了进一步提升网址性能，会把静态资源和动态网页分集群部署，静态资源会被部署到 CDN 解读上，网页上引用的资源也会变成对应的部署路径。
![image.png](./1716221025714-39.png)
![image.png](./1716221025714-40.png)
这次发布，**同时改了页面结构和样式，也更新了静态资源对应的 url 地址**，现在要发布代码上线，我们是先上线页面，还是先上线静态资源？
原版本：

- `index.html`
- `a.css?v=1234`
1. **先部署页面，再部署资源**：在二者部署的时间间隔内，如果有用户访问页面，就会在新的页面结构中加载旧的资源，并且把这个旧版本的资源当做新版本缓存起来，其结果就是：用户访问到了一个样式错乱的页面，除非手动刷新，否则在资源缓存过期之前，页面会一直执行错误。
   - 新的页面：index.html
   - 加载旧的资源：a.css?v=5678（因为新的资源还没部署）
2. **先部署资源，再部署页面**：在部署时间间隔之内，有旧版本资源本地缓存的用户访问网站，由于请求的页面是旧版本的，资源引用没有改变，浏览器将直接使用本地缓存，这种情况下页面展现正常；但没有本地缓存或者缓存过期的用户访问网站，就会出现旧版本页面加载新版本资源的情况，导致页面执行错误，但当页面完成部署，这部分用户再次访问页面又会恢复正常了。
   - 加载旧的页面：index.html（因为新的资源还没部署）
   - 加载新的资源：a.css?v=5678

单独部署下，同时更新静态资源与动态资源不会有问题。如果是使用 CDN 先后发布资源和页面，则会存在上面的**覆盖式发布**的问题，用待发布资源 覆盖 已发布资源，就有这种问题。解决它的方案，就是实现**非覆盖式发布**。

- 覆盖式发布（用待发布资源覆盖已发布资源）
- 非覆盖式发布（采用 hash）

![image.png](./1716221025714-41.png)
看上图，用文件的摘要信息来对资源文件进行重命名，把摘要信息放到资源文件发布路径中，这样，内容有修改的资源就变成了一个新的文件发布到线上，不会覆盖已有的资源文件。上线过程中，**先全量部署静态资源，再灰度部署页面**，整个问题就比较完美的解决了。

- a_5678.css 新资源
- a_1234.css 旧资源

这种情况下，则不会出现这个问题，旧版本的页面依然请求了旧的资源，新版本的页面请求新的资源。在生产环境下，如何进行 hash 处理，可以看 [基于 webpack 的持久化缓存方案](https://github.com/pigcan/blog/issues/9) 这篇文章、[webpack 官方文档 Caching](https://webpack.js.org/guides/caching/#output-filenames)、以及 Vue CLI 官方文档的设置。

## 六、Nginx缓存相关配置
[常用命令+常用配置](https://www.yuque.com/geng.ff/hiur8n/goc31a?view=doc_embed&inner=aZhPY)


## 七、总结
本文从浏览器缓存的位置（`memory cache`、`disk cache`）以及浏览器策略（强缓存、协商缓存）两个方面来说明浏览器的缓存策略，希望看到这里你能够知道 web 应用静态资源什么时候被写入缓存、什么时候进行读取、又如何进行设置失效更新。
对于静态资源的优化方案来说：

- 配置超长时间的本地缓存——节省带宽，提高性能。
- 采用内容摘要作为缓存更新依据 —— 精确的缓存控制
- 静态资源 CDN 部署 —— 优化网络请求
- 更新资源发布路径实现非覆盖式发布 —— 平滑升级

## 八、实战：进行资源更新时，为什么一定要手动清除缓存
### 8.1、分析现有的缓存策略，进行资源的更新与验证。
#### 8.1.1、先回顾浏览器存读缓存完整流程
首次请求：
![image.png](./1716221025714-42.png)
再次请求：
![image.png](./1716221025714-43.png)
#### 8.1.2、整理现有策略
**首次访问时**（记得先禁用 「Disable cache」，避免之前的缓存影响）：
![image.png](./1716221025714-44.png)
HTTP 请求头：

- `Cache-Control：no-cache`（前端编码设置，意味着每次缓存前都需要进行验证，借助 `Etag` 和 `Last-Modified`）
   - `index.html`
   - `css`
   - `js`
   - `图片`
- `"Cache-Control": "no-cache, no-store, must-revalidate"`（前端编码设置）
   - json 文件

HTTP 响应头：

- 协商缓存（所有文件）
   - `Last-Mdified`
   - `Etag`

**再次访问时**：

- 新建 tag，打开页面访问，几乎所有资源都是从 disk cache 获取，除了 json 文件被设置了不使用缓存（请求头设置）。 ![image.png](./1716221025714-45.png)
- 直接刷新访问，请求头携带 Cache-Control: max-age=0，跳过强缓存，使用协商缓存。 ![image.png](./1716221025714-46.png) 首页 index.html 响应为 304，证明协商缓存起作用。

**更新资源，验证现有策略**：分别更新不同类型的静态文件，包括 html、css、js 以及图片、字体文件等。

- 验证正常的行为，资源更新时，重新访问页面还是旧的资源。
- 验证不正常的行为，资源刷新不会更新。
1. 更新 index.html 内容，在 head 标签，添加样式设置
```css
html body {
  /* 可以开启或关闭进行反复测试 */
  padding: 2rem; 
}
```
关闭旧的页面：

- 更新资源，重新访问该页面，还是加载旧的 index.html。 ![image.png](./1716221025714-47.png)
- 然后进行刷新（Cache-Control: max-age=0），则会加载最新的资源。
1. 更新 js、css 文件

给 task-manager.vue 组件，添加边框样式：
```html
<!-- ... -->
<style lang="scss" scoped>
  .manager-container {
    border: 1rem orange solid;
    /* padding: 1rem;
    width: 100%;
    height: 100%; */
  }
</style>
```
重新打包，主要关注打包后的 hash 文件名是否变化了，index.html 的外链是否也跟着变了。

- Before ：
   - task-manager.aeb1966b.js.gz
   - task-manager.aeb1966b.js
   - <link href=js/task-manager.aeb1966b.js rel=prefetch>
- After:
   - task-manager.c2553364.js
   - task-manager.c2553364.js.gz
   - <link href=js/task-manager.c2553364.js rel=prefetch>

部署到服务器上，再次访问当前页面，出现与更新 index.html 的效果。
### 8.2、缓存失效复现解决排查
#### 1. 为什么首次设置的响应头为 no-cache，在 index.html 更新后，再次访问的页面却是旧的？
![image.png](./1716221025714-48.png)
**猜想**：no-cache 在之后的资源请求里，都没有发起验证。
可以看到请求头没有携带协商内容需要的信息。因为首次访问时，请求头携带了 `no-cache` 设置有作用，再次请求时就直接从浏览器缓存中获取，不需要访问服务端，请求头也没有携带。
**验证猜想：**经过测试，给前端`**请求头**`设置 "`Cache-control: no-cache`" 是有缺陷的，再次请求时，浏览器并不会去跟服务器验证，但会从缓存中获取。
**解决方案**：_不要在__**请求头**__设置_`_Cache-control: no-cache_`_，应该由服务端在响应头中进行设置_。
#### 2. 更新 css 文件、js 等外链文件
因为 `index.html `文件被存储了，里面的外链请求的都是旧的文件。因此即使更新了 `css`、`js` 资源，而 `index.html` 请求的还是旧的资源。
只需要解决 `index.html` 这个问题，就可以解决。
除了 `html`、`js` 等，其他的 `json`、图片等资源待测试，后续补充到文章里。更多的项目案例问题，大家有遇到的话可以一起研究、探讨。
### 8.3、服务器如何进行配置以符合最佳实践原则
#### 8.3.1、最佳实践
在我们面对一个具体的缓存需求时，到底该怎么决策呢？如何运用好强制缓存和协商缓存武器？
让我们现在一起解读一下这张流程图（来源：Chrome 官网）
![image.png](./1716221025714-49.png)

- 当我们的资源内容不可复用时，直接为 `Cache-Control` 设置 `no-store`，拒绝一切形式的缓存；
- 否则考虑是否每次都需要向服务器进行缓存有效确认，如果需要，那么设 `Cache-Control` 的值为 `no-cache`；
- 否则考虑该资源是否可以被**_代理服务器_**缓存，根据其结果决定为 `private` 还是 `public`；
- 然后考虑资源的过期时间，设置对应的 `max-age` 和 `s-maxage` 值；
- 最后，配置协商缓存需要用到 `Etag`、`Last-Modified `等参数。
- 给一个资源设置强缓存和协商缓存后，再次请求该资源时，会先判断 `max-age` 是否过期，如果不过期就从缓存拿，过期后就直接向服务器请求。这个时候会携带 `Last-Modified` 和 `Etag` 给服务器对比，如果文件改变了就重新发送，否则就返回 `304`，让浏览器继续从本地缓存中取。

1. 对于不常变化的资源，设置一年的 `max-age` 过期时间。

`Cache-Control: max-age=31536000`，比如请求在线提供的类库 (如 `jquery-3.3.1.min.js`, `lodash.min.js` 等) 均采用这个模式。如果配置中还增加 `public` 的话，`CDN` 也可以缓存起来，效果拔群。

2. 对于经常变化的资源，可以设置 `no-cache` 进行验证：

`Cache-Control: no-cache`
这里的资源不单单指静态资源，也可能是网页资源，例如博客文章。这类资源的特点是：URL 不能变化，但内容可以(且经常)变化。我们可以设置 `Cache-Control: no-cache` **_响应头_**来迫使浏览器每次请求都必须找服务器验证资源是否有效。
```javascript
app.use(
  express.static("public", {
    etag: true,
    lastModified: true,
    cacheControl: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp("\\.[0-9a-f]{8}\\.");
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else if (hashRegExp.test(path)) {
        res.setHeader("Cache-Control", "max-age=10");
      }
    },
  })
);
```
既然提到了验证，就必须 `ETag` 或者 `Last-Modified` 出场。这些字段都会由专门处理静态资源的常用类库(例如 koa-static、Express)自动添加，无需开发者过多关心。

1. 所有的资源配置，都添加 hash 根据内容去处理。
#### 8.3.2、以 Tomcat 9.0 设置为例
Tomcat 9.0 默认对所有资源都配置了协商缓存。
我们可以通过以下配置，对 css、js、image 资源设置强缓存，过期时间为5分钟：
而 index.html 还是走的协商缓存，这样的话，只要前端资源打包更新后，用户访问 index.html 都是最新的，如果引用的资源有变化，则会引用最新的资源比如 js，不受缓存影响。
如果没有变化，则会重用之前的缓存。
```xml
<filter>
  <filter-name>ExpiresFilter</filter-name>
  <filter-class>org.apache.catalina.filters.ExpiresFilter</filter-class>
  <init-param>
    <param-name>ExpiresByType image</param-name>
    <param-value>access plus 5 minutes</param-value>
  </init-param>
  <!-- <init-param>
    <param-name>ExpiresByType html</param-name>
    <param-value>access plus 0 minutes</param-value>
 </init-param> -->
  <init-param>
    <param-name>ExpiresByType text/css</param-name>
    <param-value>access plus 5 minutes</param-value>
  </init-param>
  <init-param>
    <param-name>ExpiresByType application/javascript</param-name>
    <param-value>access plus 5 minutes</param-value>
  </init-param>
</filter>



<!-- ==================== Built In Filter Mappings ====================== -->

<filter-mapping>
  <filter-name>ExpiresFilter</filter-name>
  <url-pattern>/*</url-pattern>
  <dispatcher>REQUEST</dispatcher>
</filter-mapping>
```
![image.png](./1716221025714-50.png)
再次访问，从 dist cache 中获取：
![image.png](./1716221025714-51.png)

## 九、实例：阿里云CDN缓存规则及优先级
CDN节点在收到源站响应的静态文件资源的时候，会按照以下的缓存规则来执行（数值越小，优先级越高）：![image.png](./1716221025714-52.png)

1. 源站响应`**pragma:no-cache**`、`**cache-control:no-cache**`（或者`**no-store**`，或者`**max-age=0**`）时，不缓存。
2. CDN控制台设置的缓存过期时间或者状态码过期时间。**说明**若CDN请求同时命中多条规则，有且仅有一条规则会生效，优先级为：权重>规则创建时间。
   - 有多条缓存规则的情况下，建议每条缓存规则都设置不同的权重（权重越大优先级越高），通过权重来控制规则执行优先级。
   - 权重相同的规则生效优先级：先创建的＞后创建的，与规则类型无关。
3. 源站配置其他缓存规则，优先级由高至低为：`cache-control>expires>last-modified>etag`。
   1. 源站响应中使用`**cache-control**`设置过期时间，取值为`**max-age**`，并且`**max-age**`大于0，例如：`cache-control:max-age=3600`。
   2. 源站响应中使用`**expires**`设置过期时间，例如：`expires:Tue, 25 Nov 2031 17:25:43 GMT`。
   3. 源站响应中携带了`**ETag**`或`**last-modified**`，则使用以下规则来计算缓存时间：
      1. 有`**last-modified**`，使用公式（当前时间-last_modified）* 0.1，计算结果在10秒~3600秒及之间的，取计算结果时间；小于10秒的，按照10秒处理；大于3600秒的，按照3600秒处理。
      2. 只有**ETag**，缓存10秒。
4. 源站返回的数据中`**ETag**`、`**last-modified**`、`**cache-control**`和`**expires**`这些缓存相关的响应头都没有携带，则默认不缓存。
