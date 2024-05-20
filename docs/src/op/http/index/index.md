---
title: HTTP协议
date: 2024-05-20
tags:
 - http
 - http2
categories:
 - 运维|网络
---
# HTTP协议

建议在学习 `HTTP` 知识的时候，利用 `Chrome` 开发者工具来做实践，这可以帮助你理解得更深刻。

## 一、`HTTP` 概述

`HTTP` 超文本传输协议是位于 `TCP/IP` 体系结构中的应用层协议，它是万维网数据通信的基础。
当我们访问一个网站时，需要通过统一资源定位符（`uniform resource locator`，`URL`）来定位服务器并获取资源。

> <协议>://<域名>:<端口>/<路径>

一个 URL 的一般形式通常如上所示（`http://test.com/index.html` ），现在最常用的协议就是 `HTTP`，`HTTP` 的默认端口是 `80`，通常可以省略。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153650416-ba879ff5-1f6a-4a86-984a-b0358ee959de.png#averageHue=%23e3e3e3&clientId=u00937084-8775-4&from=paste&id=Ut1dY&originHeight=353&originWidth=224&originalType=url&ratio=1&rotation=0&showTitle=false&size=36659&status=done&style=none&taskId=u41f175a2-77c2-4028-8d19-66502c627ff&title=)

### 1.1、`HTTP/1.1`

`HTTP/1.1` 是目前使用最广泛的版本，一般没有特别标明版本都是指 HTTP/1.1。

#### 1.1.1、`HTTP` 连接建立过程

我们来看一下在浏览器输入 `URL` 后获取 `HTML` 页面的过程。

1. 先通过[域名系统（Domain Name System，DNS）](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%25E5%259F%259F%25E5%2590%258D%25E7%25B3%25BB%25E7%25BB%259F%25EF%25BC%2588%25E6%259C%258D%25E5%258A%25A1%25EF%25BC%2589%25E5%258D%258F%25E8%25AE%25AE/15134609%3Ffromtitle%3Ddns%26fromid%3D427444)查询将域名转换为 IP 地址。即将 `test.com` 转换为 `221.239.100.30` 这一过程。
2. 通过三次握手（稍后会讲）建立 `TCP` 连接。
3. 发起 `HTTP` 请求。
4. 目标服务器接收到 `HTTP` 请求并处理。
5. 目标服务器往浏览器发回 `HTTP` 响应。
6. 浏览器解析并渲染页面。

下图中的 `RTT` 为往返时延（`Round-Trip Time`： 往返时延。表示从发送端发送数据开始，到发送端收到来自接收端的确认，总共经历的时延）。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153650990-7d793d62-4c3f-40fd-b6c9-2feb1efc214b.png#averageHue=%23e8e8e8&clientId=u00937084-8775-4&from=paste&id=NQNIb&originHeight=308&originWidth=489&originalType=url&ratio=1&rotation=0&showTitle=false&size=70474&status=done&style=none&taskId=u49c7b1a5-305f-46d3-879e-9adcbc0414c&title=)

#### 1.1.2、`HTTP` 连接拆除过程

所有 `HTTP` 客户端（浏览器）、服务器都可在任意时刻关闭 `TCP` 连接。通常会在一条报文结束时关闭连接，但出错的时候，也可能在首部行的中间或其他任意位置关闭连接。

#### 1.1.3、`TCP` 三次握手和四次挥手

由于 `HTTP` 是基于 `TCP` 的，所以打算在这补充一下 `TCP` 连接建立和拆除的过程。
首先，我们需要了解一些 `TCP` 报文段的字段和标志位：

1. 32 比特的序号字段和确认号字段，TCP 字节流每一个字节都按顺序编号。确认号是接收方期望从对方收到的下一字节的序号。
2. ACK 标志位，用于指示确认字段中的值是有效的 ACK=1 有效，ACK=0 无效。
3. SYN 标志位，用于连接建立，SYN 为 1 时，表明这是一个请求建立连接报文。
4. FIN 标志位，用于连接拆除，FIN 为 1 时，表明发送方数据已发送完毕，并要求释放连接。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153651311-d3b422ea-cd29-462c-b203-cfd02665e3e1.png#averageHue=%23d9d9d9&clientId=u00937084-8775-4&from=paste&id=qDCAo&originHeight=515&originWidth=692&originalType=url&ratio=1&rotation=0&showTitle=false&size=191440&status=done&style=none&taskId=u15f92d41-ef86-426a-a2ad-829fe291fc4&title=)

#### 1.1.4、TCP 三次握手建立连接

TCP 标准规定，ACK 报文段可以携带数据，但不携带数据就不用消耗序号。

1. 客户端发送一个不包含应用层数据的 TCP 报文段，首部的 SYN 置为 1，随机选择一个初始序号（一般为 0）放在 TCP 报文段的序号字段中。（SYN 为 1 的时候，不能携带数据，但要消耗掉一个序号）
2. TCP 报文段到达服务器主机后，服务器提取报文段，并为该 TCP 连接分配缓存和变量。然后向客户端发送允许连接的 ACK 报文段（不包含应用层数据）。这个报文段的首部包含 4 个信息：ACK 置 为 1，SYN 置为 1；确认号字段置为客户端的序号 + 1；随机选择自己的初始序号（一般为 0）。
3. 收到服务器的 TCP 响应报文段后，客户端也要为该 TCP 连接分配缓存和变量，并向服务器发送一个 ACK 报文段。这个报文段将服务器端的序号 + 1 放置在确认号字段中，用来对服务器允许连接的报文段进行响应，因为连接已经建立，所以 SYN 置为 0。最后一个阶段，报文段可以携带客户到服务器的数据。并且以后的每一个报文段，SYN 都置为 0。

下图是一个具体的示例：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153650880-8d7e5c09-d692-4d6f-91d7-c96dc3cab91b.png#averageHue=%23b2a780&clientId=u00937084-8775-4&from=paste&id=sQUd2&originHeight=82&originWidth=1612&originalType=url&ratio=1&rotation=0&showTitle=false&size=23283&status=done&style=none&taskId=ufecf5568-4c6f-4b30-b2f5-736874f4bb9&title=)
（此截图是我使用 Wireshark 抓包工具截取的 TCP 报文段截图）。

#### 1.1.5、TCP 四次挥手拆除连接

FIN 报文段即使不携带数据，也要消耗序号。

1. 客户端发送一个 FIN 置为 1 的报文段。
2. 服务器回送一个确认报文段。
3. 服务器发送 FIN 置为 1 的报文段。
4. 客户端回送一个确认报文段。

#### 1.1.6、TCP 为什么是四次挥手，而不是三次？

1. 当 A 给 B 发送 FIN 报文时，代表 A 不再发送报文，但仍可以接收报文。
2. B 可能还有数据需要发送，因此先发送 ACK 报文，告知 A “我知道你想断开连接的请求了”。这样 A 便不会因为没有收到应答而继续发送断开连接的请求（即 FIN 报文）。
3. B 在处理完数据后，就向 A 发送一个 FIN 报文，然后进入 LAST_ACK 阶段（超时等待）。
4. A 向 B 发送 ACK 报文，双方都断开连接。

参考资料：

- [知乎网友-魔方的回答](https://www.zhihu.com/question/63264012)

#### 1.1.7、HTTP 报文格式

HTTP 报文由请求行、首部、实体主体组成，它们之间由 CRLF（回车换行符） 分隔开。
**注意：实体包括首部(也称为实体首部)和实体主体，sp 即是空格 space**。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153651176-4d99f534-a02d-4964-9682-b6b915a55391.png#averageHue=%23efdec5&clientId=u00937084-8775-4&from=paste&id=hDQXN&originHeight=323&originWidth=566&originalType=url&ratio=1&rotation=0&showTitle=false&size=47401&status=done&style=none&taskId=u2f058ed6-d177-4fbb-a721-864e0b8d8cb&title=)

请求行和首部是由 ASCII 文本组成的，实体主体是可选的，可以为空也可以是任意二进制数据。
请求报文和响应报文的格式基本相同。
**请求报文格式**：

```
<method> <request-URL> <version>
<headers>
<entity-body>
```

**响应报文格式**：

```
<version> <status> <reason-phrase>
<headers>
<entity-body>
```

**一个请求或响应报文由以下字段组成**：

1. 请求方法，客户端希望服务器对资源执行的动作。
2. 请求 URL，命名了所请求的资源。
3. 协议版本，报文所使用的 HTTP 版本。
4. 状态码，这三位数字描述了请求过程中所发生的情况。
5. 原因短语，数字状态码的可读版本（例如上面的响应示例跟在 200 后面的 OK，一般按规范写最好）。
6. 首部，可以有零或多个首部。
7. 实体的主体部分，可以为空也可以包含任意二进制数据。

**一个 HTTP 请求示例**：

```
GET /2.app.js HTTP/1.1
Host: 118.190.217.8:3389
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
Accept: */*
Referer: http://118.190.217.8:3389/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
```

**一个 HTTP 响应示例**：

```
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 07 Mar 2020 03:52:30 GMT
ETag: W/"253e-170b31f7de7"
Content-Type: application/javascript; charset=UTF-8
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Fri, 15 May 2020 05:38:05 GMT
Connection: keep-alive
Transfer-Encoding: chunked
```

#### 1.1.8、方法

##### 1.1.8.1、GET 和 HEAD

其中 GET 和 HEAD 被称为安全方法，因为它们是幂等的（如果一个请求不管执行多少次，其结果都是一样的，这个请求就是**幂等的**），类似于 POST 就不是幂等的。
HEAD 方法和 GET 方法很类似，但服务器在响应中只返回首部。这就允许客户端在未获取实际资源的情况下，对资源的首部进行检查。使用 HEAD，可以：

1. 在不获取资源的情况下了解资源的情况。
2. 通过查看响应状态码，看看某个对象是否存在。
3. 通过查看首部，了解测试资源是否被修改了。

服务器开发者必须确保返回的首部与 GET 请求所返回的首部完全相同。遵循 HTTP/1.1 规范，就必须实现 HEAD 方法。

##### 1.1.8.2、PUT

与 GET 方法从服务器读取文档相反，PUT 方法会向服务器写入文档。PUT 方法的语义就是让服务器用请求的主体部分来创建一个由所请求的 URL 命名的新文档。 如果那个文档已存在，就覆盖它。

##### 1.1.8.3、POST

POST 方法通常用来向服务器发送表单数据。

##### 1.1.8.4、TRACE

客户端发起一个请求时，这个请求可能要穿过路由器、防火墙、代理、网关等。每个中间节点都可能会修改原始的 HTTP 请求，TRACE 方法允许客户端在最终发起请求时，看看它变成了什么样子。
TRACE 请求会在目的服务器端发起一个“环回”诊断。行程最后一站的服务器会弹回一条 TRACE 响应，并在响应主体中携带它收到的原始请求报文。 这样客户端就可以查看在所有中间 HTTP 应用程序组成的请求/响应链上，原始报文是否被毁坏或修改过。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153652626-60f4ff1e-2449-4879-9e0f-c415912374e6.png#averageHue=%23e9e9e9&clientId=u00937084-8775-4&from=paste&id=kkUOg&originHeight=370&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=184006&status=done&style=none&taskId=u7d0b2f5e-1a0c-42e1-a033-500c0e1d00a&title=)
TRACE 方法主要用于诊断，用于验证请求是否如愿穿过了请求/响应链。它也是一种工具，用来查看代理和其他应用程序对用户请求所产生的效果。 TRACE 请求中不能带有实体的主体部分。TRACE 响应的实体主体部分包含了响应服务器收到的请求的精确副本。

##### 1.1.8.5、OPTIONS

OPTIONS 方法请求 Web 服务器告知其支持的各种功能。

##### 1.1.8.6、DELETE

DELETE 方法就是让服务器删除请求 URL 所指定的资源。

#### 1.1.9、状态码

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153652500-5c0e1143-9925-4506-8771-84246663bc19.png#averageHue=%23e5c086&clientId=u00937084-8775-4&from=paste&id=sx4jl&originHeight=243&originWidth=342&originalType=url&ratio=1&rotation=0&showTitle=false&size=11892&status=done&style=none&taskId=u07470d90-2b19-45d4-bf2a-d72b4d7eaa7&title=)

##### 1.1.9.1、300~399 重定向状态码

重定向状态码要么告诉客户端使用替代位置来访问他们感兴趣的资源，要么提供一个替代的响应而不是资源的内容。 如果资源已被移动，可以发送一个重定向状态码和一个可选的 Location 首部来告知客户端资源已被移走，以及现在在哪里可以找到它。这样，浏览器可以在不打扰使用者的情况下，透明地转入新的位置。

##### 1.1.9.2、400~499 客户端错误状态码

有时客户端会发送一些服务器无法处理的东西，例如格式错误的请求报文、一个不存在的 URL。

##### 1.1.9.3、500~599 服务器错误状态码

有时客户端发送了一条有效请求，服务器自身却出错了。

#### 1.1.10、首部(header)

首部和方法共同配合工作，决定了客户端和服务器能做什么事情。

##### 1.1.10.1、首部分类

1. 通用首部，可以出现在请求或响应报文中。
2. 请求首部，提供更多有关请求的信息。
3. 响应首部，提供更多有关响应的信息。
4. 实体首部，描述主体的长度和内容，或者资源自身。
5. 扩展首部，规范中没有定义的新首部。

##### 1.1.10.2、通用首部

有些首部提供了与报文相关的最基本信息，它们被称为通用首部。以下是一些常见的通用首部：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153653099-2c9e198e-b479-4373-bba0-923bdd4b971c.png#averageHue=%23e7e7e7&clientId=u00937084-8775-4&from=paste&id=BTA4Y&originHeight=296&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=135810&status=done&style=none&taskId=ueb3956f0-e020-4bd8-9132-7810c6a3b12&title=)

##### 1.1.10.3、请求首部

请求首部是只在请求报文中有意义的首部，用于说明请求的详情。以下是一些常见的请求首部：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153653396-e7b3f5f8-84a5-4c30-908e-909103ab0e09.png#averageHue=%23e6e6e6&clientId=u00937084-8775-4&from=paste&id=OeSZh&originHeight=311&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=132311&status=done&style=none&taskId=u8e1705ec-07c3-4b98-a56a-def044b4394&title=)

##### 1.1.10.4、响应首部

响应首部让服务器为客户端提供了一些额外的信息。

##### 1.1.10.5、实体首部

实体首部提供了有关实体及其内容的大量信息，从有关对象类型的信息，到能够对资源使用的各种有效的请求方法。
例如**内容首部**，提供了与实体内容有关的特定信息，说明了其类型、尺寸以及处理它所需的其他有用信息。 另外，通用的缓存首部说明了如何或什么时候进行缓存。**实体的缓存首部**提供了与被缓存实体有关的信息。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153653191-ee305be7-fc24-49c9-91f3-91f73cfb87d8.png#averageHue=%23e1e1e1&clientId=u00937084-8775-4&from=paste&id=wdxT3&originHeight=118&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=50898&status=done&style=none&taskId=u82d67db2-896f-434f-a61a-53dee8e1810&title=)

### 1.2、`HTTP1.0`和 `HTTP1.1`的一些区别

`HTTP1.0`最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，而HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。

主要区别主要体现在：

1. **缓存处理：**

在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，
      	HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。

2. **带宽优化及网络连接的使用：**
   HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功
   HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
3. **错误通知的管理：**
   在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
4. **Host头处理：**
   在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。
   HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
5. **长连接：**
   HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，其中长连接也就是对应在HTTP1.1中的Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

### 1.3、`HTTP1.0/HTTP1.1`的性能优化

#### 1.3.1、减少 HTTP 请求

每发起一个 HTTP 请求，都得经历三次握手建立 TCP 连接，如果连接只用来交换少量数据，这个过程就会严重降低 HTTP 性能。所以我们可以将多个小文件合成一个大文件，从而减少 HTTP 请求次数。
其实由于持久连接（重用 TCP 连接，以消除连接及关闭时延；HTTP/1.1 默认开启持久连接）的存在，每个新请求不一定都需要建立一个新的 TCP 连接。但是，浏览器处理完一个 HTTP 请求才能发起下一个，所以在 TCP 连接数没达到浏览器规定的上限时，还是会建立新的 TCP 连接。从这点来看，减少 HTTP 请求仍然是有必要的。

#### 1.3.2、静态资源使用 CDN

内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。

#### 1.3.3、善用缓存

为了避免用户每次访问网站都得请求文件，我们可以通过添加 Expires 头来控制这一行为。Expires 设置了一个时间，只要在这个时间之前，浏览器都不会请求文件，而是直接使用缓存。
不过这样会产生一个问题，当文件更新了怎么办？怎么通知浏览器重新请求文件？
可以通过更新页面中引用的资源链接地址，让浏览器主动放弃缓存，加载新资源。
具体做法是把资源地址 URL 的修改与文件内容关联起来，也就是说，只有文件内容变化，才会导致相应 URL 的变更，从而实现文件级别的精确缓存控制。什么东西与文件内容相关呢？我们会很自然的联想到利用[数据摘要要算法](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%25E6%25B6%2588%25E6%2581%25AF%25E6%2591%2598%25E8%25A6%2581%25E7%25AE%2597%25E6%25B3%2595/3286770%3Ffromtitle%3D%25E6%2591%2598%25E8%25A6%2581%25E7%25AE%2597%25E6%25B3%2595%26fromid%3D12011257)对文件求摘要信息，摘要信息与文件内容一一对应，就有了一种可以精确到单个文件粒度的缓存控制依据了。
参考资料：

- [张云龙--大公司里怎样开发和部署前端代码？](https://www.zhihu.com/question/20790576/answer/32602154)

#### 1.3.4、压缩文件

压缩文件可以减少文件下载时间，让用户体验性更好。
gzip 是目前最流行和最有效的压缩方法。可以通过向 HTTP 请求头中的 Accept-Encoding 头添加 gzip 标识来开启这一功能。当然，服务器也得支持这一功能。
举个例子，我用 Vue 开发的项目构建后生成的 app.js 文件大小为 1.4MB，使用 gzip 压缩后只有 573KB，体积减少了将近 60%。

#### 1.3.5、通过 max-age 和 no-cache 实现文件精确缓存

通用消息头部 Cache-Control 其中有两个选项：

1. max-age: 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。在这个时间前，浏览器读取文件不会发出新请求，而是直接使用缓存。
2. no-cache: 指定 no-cache 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。

我们可以将那些长期不变的静态资源设置一个非常长的缓存时间，例如设置成缓存一年。
然后将 index.html 文件设置成 no-cache。这样每次访问网站时，浏览器都会询问 index.html 是否有更新，如果没有，就使用旧的 index.html 文件。如果有更新，就读取新的 index.html 文件。当加载新的 index.html 时，也会去加载里面新的 URL 资源。
例如 index.html 原来引用了 a.js 和 b.js，现在更新了变成 a.js 和 c.js。那就只会加载 c.js 文件。
具体请看 [webpack + express 实现文件精确缓存](https://link.zhihu.com/?target=https%3A//github.com/woai3c/node-blog/blob/master/doc/node-blog7.md)。

### 1.4、`HTTP/1.1` 的问题

#### 1.4.1、队头阻塞（Head-of-line blocking, HOL）

在 HTTP 请求应答过程中，如果出现了某种情况，导致响应一直未能完成，那后面所有的请求就会一直阻塞着，这种情况叫队头阻塞。
Chrome浏览器对于同一个域名，同时只能 6 个连接（这个根据浏览器内核不同可能会有所差异），超过浏览器最大连接数限制，后续请求就会被阻塞。

#### 1.4.2、低效的 TCP 利用

由于 [TCP 慢启动机制](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%25E6%2585%25A2%25E5%2590%25AF%25E5%258A%25A8/8242395)，导致每个 TCP 连接在一开始的时候传输速率都不高，在处理多个请求后，才会慢慢达到“合适”的速率。对于请求数据量很小的 HTTP 请求来说，这种情况就是种灾难。

#### 1.4.3、臃肿的消息首部

HTTP/1.1 的首部无法压缩，再加上 cookie 的存在，经常会出现首部大小比请求数据大小还大的情况。

#### 1.4.4、受限的优先级设置

HTTP/1.1 无法为重要的资源指定优先级，每个 HTTP 请求都是一视同仁。
在继续讨论 HTTP/2 的新功能之前，先把 HTTP/1.1 的问题列出来是有意义的。因为 HTTP/2 的某些新功能就是为了解决上述某些问题而产生的。

---

## 二、HTTPS

HTTPS 是最流行的 HTTP 安全形式，由网景公司首创，所有主要的浏览器和服务器都支持此协议。 使用 HTTPS 时，所有的 HTTP 请求和响应数据在发送之前，都要进行加密。加密可以使用 SSL 或 TLS。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153653440-4c872631-c4ff-4456-91e9-4bb2108bf618.png#averageHue=%23ededed&clientId=u00937084-8775-4&from=paste&id=Y6gZ3&originHeight=304&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=128591&status=done&style=none&taskId=u7ac7bb82-6133-4001-8a55-ec3ea9600a7&title=)

SSL/TLS 协议作用在 HTTP 协议之下，对于上层应用来说，原来的发送/接收数据流程不变，这就很好地兼容了老的 HTTP 协议。由于 SSL/TLS 差别不大，下面统一使用 SSL。
要想了解 HTTPS 为何安全，还得继续了解一下这些概念：**加密算法**、**摘要算法**、**数字签名**和**数字证书**。

### 2.1、`HTTPS`详解

#### 加密算法

#### 对称密钥密码体制

对称密钥密码体制，即加密密钥和解密密钥是使用相同的密码体制。对称密钥加密技术的缺点之一就是发送者和接收者在对话之前，一定要有一个共享的密钥，所以不太安全。

#### 公钥密码体制

公钥密码体制使用不同的加密密钥与解密密钥。公钥密码体制产生的主要原因有两个：一是对称密钥密码体制的密钥分配问题，二是对数字签名的需求。
在公钥密码体制中，加密密钥是公开的，解密密钥是需要保密的，加密算法和解密算法也是公开的。
公钥密码体制的加密和解密有如下特点：

1. **密钥对产生器**产生出接收者 B 的一对密钥，即加密密钥 PK 和解密密钥 SK。
2. 发送者 A 用 B 的公钥 PK 作为加密密钥来加密信息，B 接收后用解密密钥 SK 解密。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153653860-b14826ac-80bf-466d-89d1-3f2a1e0bbe54.png#averageHue=%23f0f0f0&clientId=u00937084-8775-4&from=paste&id=FKc0c&originHeight=245&originWidth=671&originalType=url&ratio=1&rotation=0&showTitle=false&size=50590&status=done&style=none&taskId=ub4911a72-f835-4cb8-a6c3-050bd311aa1&title=)
使用对称密钥时，由于双方使用同样的密钥，因此在通信信道上可以进行一对一的双向保密通信，双方都可以用同一个密钥加密解密。
使用公开密钥时，在通信信道上可以是多对一的单向保密信道。即可以有多人持有 B 的公钥，但只有 B 才能解密。

#### 摘要算法

摘要算法的主要特征是加密过程不需要密钥，并且经过加密的数据无法被解密，目前可以被解密逆向的只有CRC32算法，只有输入相同的明文数据经过相同的消息摘要算法才能得到相同的密文。

#### 数字签名

用加密系统对报文进行签名，以说明是谁编写的报文，同时证明报文未被篡改过，这种技术称为**数字签名**。
数字签名是附加在报文上的特殊加密校验码。使用数字签名的好处有：

1. 签名可以证明是作者编写了这条报文。只有作者才会有最机密的私有密钥，因此，只有作者才能计算出这些校验和。
2. 签名可以防止报文被篡改，如果有人在报文传输过程中对其进行了修改，校验和就不再匹配了。

数字签名通常是用非对称公开密钥技术产生的。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153654427-ff875ee0-6e44-40d4-8f0e-5b412c5fe09e.png#averageHue=%23efefef&clientId=u00937084-8775-4&from=paste&id=v3Cum&originHeight=225&originWidth=665&originalType=url&ratio=1&rotation=0&showTitle=false&size=60971&status=done&style=none&taskId=u45a5de3a-61cf-4518-8c15-28948406458&title=)

看上图，任何人都能用 A 的公钥 PK 对密文进行 E 运算后得到 A 发送的明文。可见这种通信并非为了保密，而是为了进行签名和核实签名，即确认此信息是 A 发送的（使用 A 的密钥进行加密的报文，只有使用 A 的公钥才能正确解密）。 但上述过程仅对报文进行了签名，对报文 X 本身却未保密，所以要采用下图的方法，同时实现秘密通信和数字签名。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153654548-c2a79682-167b-47fe-8940-f49b6a7e4fda.png#averageHue=%23ececec&clientId=u00937084-8775-4&from=paste&id=E9EHm&originHeight=294&originWidth=712&originalType=url&ratio=1&rotation=0&showTitle=false&size=102643&status=done&style=none&taskId=ucce86fcd-1dea-466a-aaa0-d6c0dfadab5&title=)

#### 数字证书

假如你想访问一个网站，怎么确保对方给你的公钥是你想访问的网站的公钥，而不是被中间人篡改过的？
数字证书的出现就是为了解决这个问题，它是由数字证书认证机构颁发的，用来证明公钥拥有者的身份。换句话说，数字证书的作用就相当于人的身份证，身份证证明了张三就是张三，而不是别人。
**数字证书一般包含以下内容**：

1. 对象的名称（人、服务器、组织等）；
2. 过期时间；
3. 证书发布者（由谁为证书担保）；
4. 来自证书发布者的数字签名；
5. 对象的公钥；
6. 对象和所用签名算法的描述性信息。

任何人都可以创建一个数字证书，但由谁来担保才是重点。
**数字证书的数字签名计算过程**：

1. 用摘要算法对数字证书的内容计算出摘要；
2. 用数字证书的私钥对摘要进行加密得到数字签名。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153655097-cddd7482-3c9c-4705-8334-b1e37e15b7a0.png#averageHue=%23f5f5f5&clientId=u00937084-8775-4&from=paste&id=NySJJ&originHeight=349&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=99831&status=done&style=none&taskId=u67e431d9-3ac8-4c2e-adb4-67870062a2d&title=)
当浏览器收到证书时，会对签名颁发机构进行验证，如果颁发机构是个很有权威的公共签名机构，浏览器可能就知道其公开密钥了（浏览器会预装很多签名颁发机构的证书）。如果对签名颁发机构一无所知，浏览器通常会向用户显示一个对话框，看看他是否相信这个签名发布者。
因为数字证书的公钥是公开的，任何人都可以用公钥解密出数字证书的数字签名的摘要，然后再用同样的摘要算法对证书内容进行摘要计算，将得出的摘要和解密后的摘要作对比，如果内容一致则说明这个证书没有被篡改过，可以信任。
这个过程是建立在被大家所认可的证书机构之上得到的公钥，所以这是一种安全的方式。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153655122-5cd5ceb1-cca9-4cad-bf43-26465a162922.png#averageHue=%23f5f5f5&clientId=u00937084-8775-4&from=paste&id=AWTQ6&originHeight=428&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=123836&status=done&style=none&taskId=u6d940eda-e0de-4efd-88f1-b2f5a266d1d&title=)

#### HTTPS 连接建立过程

HTTPS 连接建立过程和 HTTP 差不多，区别在于 HTTP（默认端口 80） 请求只要在 TCP 连接建立后就可以发起，而 HTTPS（默认端口 443） 在 TCP 连接建立后，还需要经历 SSL 协议握手，成功后才能发起请求。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153655562-ef0fd0fc-620d-4f0f-8722-d693418638cd.png#averageHue=%23f0f0f0&clientId=u00937084-8775-4&from=paste&id=k5YV4&originHeight=892&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=336699&status=done&style=none&taskId=u3de84d92-2892-48c1-9d95-507e911c0f4&title=)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153655660-0e9d90bb-63ec-41b5-8caf-cf421e515f21.png#averageHue=%23f0f0f0&clientId=u00937084-8775-4&from=paste&id=WfVfU&originHeight=556&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=198905&status=done&style=none&taskId=uec0b86d1-b10a-4747-86f0-e59c1c86525&title=)
我知道肯定会有人不满足于简化版的 SSL 握手过程，所以我找了一篇文章[SSL/TLS 握手过程详解](https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/7158568e4867)，这篇文章非常详细的讲解了 SSL 握手的每一步骤。建议有兴趣的同学看一看。

### 2.2、`HTTPS`与 `HTTP`的一些区别

1. HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。
2. HTTP是超文本传输协议，信息是明文传输，HTTPS则是具有安全性的TLS加密传输协议。
3. HTTP和HTTPS使用的是完全不同的连接方式，用的默认端口也不一样，前者是80，后者是443。
4. HTTPS的连接很简单，HTTPS协议是由TLS+HTTP协议构建的可进行加密传输、身份认证的网络协议，比HTTP协议安全。

### 2.3、`HTTPS`改造

如果一个网站要全站由HTTP替换成HTTPS，可能需要关注以下几点：

1. **安装CA证书：** 一般的证书都是需要收费的，这边推荐一个比较好的购买证书网站： 1)**Let’s Encrypt：** 免费，快捷，支持多域名（不是通配符），三条命令就可以签署+导出证书。缺点是暂时只有三个月有效期，到期需续签。 2)**Comodo PositiveSSL：** 收费，但是比较稳定。
2. **配置WEB服务器：** 在购买证书之后，在证书提供的网站上配置自己的域名，将证书下载下来之后，配置自己的WEB服务器，同时进行代码改造。
3. **HTTPS会降低用户访问速度：** TLS需要握手，HTTPS对速度会有一定程度的降低，但是只要经过合理优化和部署，HTTPS 对速度的影响完全可以接受。在很多场景下，HTTPS 速度完全不逊于 HTTP，如果使用SPDY，HTTPS的速度甚至还要比 HTTP 快。相对于HTTPS降低访问速度，其实更需要关心的是服务器端的CPU压力，HTTPS中大量的密钥算法计算，会消耗大量的CPU资源，只有足够的优化，HTTPS 的机器成本才不会明显增加。

推荐一则[淘宝网改造HTTPS](https://link.juejin.cn?target=http%3A%2F%2Fvelocity.oreilly.com.cn%2F2015%2Fppts%2Flizhenyu.pdf)的文章。

---

## 三、HTTP/2

HTTP/2 是 HTTP/1.x 的扩展，而非替代。所以 HTTP 的语义不变，提供的功能不变，HTTP 方法、状态码、URL 和首部字段等这些核心概念也不变。
之所以要递增一个大版本到 2.0，主要是因为它改变了客户端与服务器之间交换数据的方式。
HTTP 2.0 增加了新的二进制分帧数据层，而这一层并不兼容之前的 HTTP 1.x 服务器及客户端——是谓 2.0。

### 3.1、HTTP1/HTTP2的主要区别

1. H2是一个二进制协议,H1是超文本协议.传输的内容都不是一样的。
2. H2遵循多路复用即,代替同一host下的内容,只建立一次连接. H1不是。
3. H2可以使用HPACK进行头部的压缩,H1则不论什么请求都会发送。
4. H2允许服务器,预先将网页所需要的资源PUSH到浏览器的内存当中。

### 3.2、SPDY

2012年google如一声惊雷提出了SPDY的方案，大家才开始从正面看待和解决老版本HTTP协议本身的问题，SPDY可以说是综合了HTTPS和HTTP两者优点于一体的传输协议，主要解决：

1. **降低延迟** 针对HTTP高延迟的问题，SPDY优雅的采取了多路复用（multiplexing）。多路复用通过多个请求stream共享一个tcp连接的方式，解决了HOL blocking的问题，降低了延迟同时提高了带宽的利用率。
2. **请求优先级（request prioritization）** 多路复用带来一个新的问题是，在连接共享的基础之上有可能会导致关键请求被阻塞。SPDY允许给每个request设置优先级，这样重要的请求就会优先得到响应。比如浏览器加载首页，首页的html内容应该优先展示，之后才是各种静态资源文件，脚本文件等加载，这样可以保证用户能第一时间看到网页内容。
3. **header压缩** 前面提到HTTP1.x的header很多时候都是重复多余的。选择合适的压缩算法可以减小包的大小和数量。
4. **基于HTTPS的加密协议传输** 这大大提高了传输数据的可靠性。
5. **服务端推送（server push）** 采用了SPDY的网页，例如我的网页有一个sytle.css的请求，在客户端收到sytle.css数据的同时，服务端会将sytle.js的文件推送给客户端，当客户端再次尝试获取sytle.js时就可以直接从缓存中获取到，不用再发请求了。

SPDY位于HTTP之下，TCP和SSL之上，这样可以轻松兼容老版本的HTTP协议(将HTTP1.x的内容封装成一种新的frame格式)，同时可以使用已有的SSL功能。

### 3.3、HTTP2的新特性

- **新的二进制格式** （Binary Format），HTTP1.x的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合。基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮。
- **多路复用 （MultiPlexing）** 即连接共享，即每一个request都是是用作连接共享机制的。一个request对应一个id，这样一个连接上可以有多个request，每个连接的request可以随机的混杂在一起，接收方可以根据request的 id将request再归属到各自不同的服务端请求里面。
- **header压缩** HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小。
- **服务端推送 （server push）** 同SPDY一样，HTTP2.0也具有server push功能。目前，有大多数网站已经启用HTTP2.0，例如 YouTuBe，淘宝网等网站，可以利用chrome控制台可以查看是否启用H2

### 3.4、PDY与HTTP2的区别

- 头部压缩算法，SPDY，通用的deflate算法[注1]；HTTP2，专门为压缩头部设计的HPACK算法
- **SPDY必须在TLS上运行，HTTP2可在TCP上直接使用，因为增加了HTTP1.1的Upgrade机制**
- 更加完善的协议商讨和确认流程
- 更加完善的Server Push流程
- 增加控制帧的种类，并对帧的格式考虑的更细致

### 3.5、HTTP2的缺点

1. TCP 以及 TCP+TLS建立连接的延时,HTTP/2使用TCP协议来传输的，而如果使用HTTPS的话，还需要使用TLS协议进行安全传输，而使用TLS也需要一个握手过程,在传输数据之前，导致我们需要花掉 3～4 个 RTT。
2. TCP的队头阻塞并没有彻底解决。在HTTP/2中，多个请求是跑在一个TCP管道中的。但当HTTP/2出现丢包时，整个 TCP 都要开始等待重传，那么就会阻塞该TCP连接中的所有请求。

### 3.6、HTTP2详解

#### 3.6.1、HTTP/2 连接建立过程

现在的主流浏览器 HTTP/2 的实现都是基于 SSL/TLS 的，也就是说使用 HTTP/2 的网站都是 HTTPS 协议的，所以本文只讨论基于 SSL/TLS 的 HTTP/2 连接建立过程。
基于 SSL/TLS 的 HTTP/2 连接建立过程和 HTTPS 差不多。在 SSL/TLS 握手协商过程中，客户端在 ClientHello 消息中设置 ALPN（应用层协议协商）扩展来表明期望使用 HTTP/2 协议，服务器用同样的方式回复。通过这种方式，HTTP/2 在 SSL/TLS 握手协商过程中就建立起来了。

#### 3.6.2、二进制分帧层

HTTP/2 是基于帧的协议。采用分帧是为了将重要信息封装起来，让协议的解析方可以轻松阅读、解析并还原信息。
而 HTTP/1.1 是以文本分隔的。解析 HTTP/1.1 不需要什么高科技，但往往速度慢且容易出错。你需要不断地读入字节，直到遇到分隔符 CRLF 为止，同时还要考虑不守规矩的客户端，它只会发送 LF。
解析 HTTP/1.1 的请求或响应还会遇到以下问题：

1. 一次只能处理一个请求或响应，完成之前不能停止解析。
2. 无法预判解析需要多少内存。

HTTP/2 有了帧，处理协议的程序就能预先知道会收到什么，并且 HTTP/2 有表示帧长度的字段。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153655686-438e3730-6b28-491e-ad27-63c4bbf36f46.png#averageHue=%23e3c8ac&clientId=u00937084-8775-4&from=paste&id=gneRY&originHeight=392&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=129068&status=done&style=none&taskId=u0bf03e45-2275-4737-b3fe-2c44a368174&title=)

#### 3.6.3、帧结构

```
+-----------------------------------------------+
 |                 Length (24)                   |
 +---------------+---------------+---------------+
 |   Type (8)    |   Flags (8)   |
 +-+-------------+---------------+-------------------------------+
 |R|                 Stream Identifier (31)                      |
 +=+=============================================================+
 |                   Frame Payload (0...)                      ...
 +---------------------------------------------------------------+
```

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153656123-8e53fc9b-7277-47b2-af84-4986ea2e3799.png#averageHue=%23f7f5d0&clientId=u00937084-8775-4&from=paste&id=QpZ9r&originHeight=400&originWidth=1031&originalType=url&ratio=1&rotation=0&showTitle=false&size=35581&status=done&style=none&taskId=u4b7146c7-63d2-40e5-a06b-92b1f70d917&title=)
由于 HTTP/2 是分帧的，请求和响应都可以多路复用，有助于解决类似类似队头阻塞的问题。

#### 3.6.4、帧类型

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153656268-bff64a89-5f57-4e90-afe6-7a06ff873a4f.png#averageHue=%23f5f8d4&clientId=u00937084-8775-4&from=paste&id=cGqvz&originHeight=422&originWidth=582&originalType=url&ratio=1&rotation=0&showTitle=false&size=35629&status=done&style=none&taskId=u4a86d95a-f6f0-4b4f-a7be-217a336ff0f&title=)

#### 3.6.5、HTTP2的多路复用

在HTTP1.1的协议中，我们传输的request和response都是基本于文本的，这样就会引发一个问题：所有的数据必须按顺序传输，比如需要传输：hello world，只能从h到d一个一个的传输，不能并行传输，因为接收端并不知道这些字符的顺序，所以并行传输在HTTP1.1是不能实现的。

HTTP/2引入二进制数据**帧和流**的概念，其中帧对数据进行顺序标识，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况。同样是因为有了序列，服务器就可以并行的传输数据，这就是流所做的事情。
HTTP/2对同一域名下所有请求都是基于流，所有的请求和响应都在同一个 TCP 连接上发送。

客户端和服务器把 HTTP 消息分解成多个帧，然后乱序发送，最后在另一端再根据流 ID 重新组合起来。
这个机制为 HTTP 带来了巨大的性能提升，因为：

- 可以并行交错地发送请求，请求之间互不影响；
- 可以并行交错地发送响应，响应之间互不干扰；
- 只使用一个连接即可并行发送多个请求和响应；
- 消除不必要的延迟，从而减少页面加载的时间；
- 不必再为绕过 HTTP 1.x 限制而多做很多工作；

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153656768-f9c47569-8b7a-4cf0-89ac-b3de5338e4c4.png#averageHue=%23f0eeed&clientId=u00937084-8775-4&from=paste&id=p7Yl3&originHeight=246&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=104658&status=done&style=none&taskId=ufd3c7a14-83e0-4a97-84a5-5e3c4a414a2&title=)

#### 3.6.6、流

HTTP/2 规范对流的定义是：HTTP/2 连接上独立的、双向的帧序列交换。如果客户端想要发出请求，它会开启一个新流，然后服务器在这个流上回复。 由于有分帧，所以多个请求和响应可以交错，而不会互相阻塞。流 ID 用来标识帧所属的流。

客户端到服务器的 HTTP/2 连接建立后，通过发送 HEADERS 帧来启动新的流。如果首部需要跨多个帧，可能还会发送 CONTINUATION 帧。该 HEADERS 帧可能来自请求或响应。 后续流启动的时候，会发送一个带有递增流 ID 的新 HEADERS 帧。

#### 3.6.7、消息

HTTP 消息泛指 HTTP 请求或响应，消息由一或多个帧组成，这些帧可以乱序发送，然后再根据每个帧首部的流 ID 重新组装。
一个消息至少由 HEADERS 帧（它初始化流）组成，并且可以另外包含 CONTINUATION 和 DATA 帧，以及其他的 HEADERS 帧。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153656913-850e0b15-c38b-4bd4-bfce-971deae4464d.png#averageHue=%23e5d4c1&clientId=u00937084-8775-4&from=paste&id=LNm7m&originHeight=511&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=174141&status=done&style=none&taskId=uc5c2d8ab-1fb3-4d28-bded-59649409dcf&title=)
HTTP/1.1 的请求和响应部分都分成消息首部和消息体两部分；HTTP/2 的请求和响应分成 HEADERS 帧和 DATA 帧。

#### 3.6.8、优先级

把 HTTP 消息分解为很多独立的帧之后，就可以通过优化这些帧的交错和传输顺序，进一步提升性能。
通过 HEADERS 帧和 PRIORITY 帧，客户端可以明确地和服务器沟通它需要什么，以及它需要这些资源的顺序。具体来讲，服务器可以根据流的优先级，控制资源分配（CPU、内存、带宽），而在响应数据准备好之后，优先将最高优先级的帧发送给客户端。

#### 3.6.9、流量控制

在同一个 TCP 连接上传输多个数据流，就意味着要共享带宽。标定数据流的优先级有助于按序交付，但只有优先级还不足以确定多个数据流或多个连接间的资源分配。
为解决这个问题，HTTP/2 为数据流和连接的流量控制提供了一个简单的机制：

- 流量控制基于每一跳进行，而非端到端的控制；
- 流量控制基于 WINDOW_UPDATE 帧进行，即接收方广播自己准备接收某个数据流的多少字节，以及对整个连接要接收多少字节；
- 流量控制窗口大小通过 WINDOW_UPDATE 帧更新，这个字段指定了流 ID 和窗口大小递增值；
- 流量控制有方向性，即接收方可能根据自己的情况为每个流乃至整个连接设置任意窗口大小；
- 流量控制可以由接收方禁用，包括针对个别的流和针对整个连接。

HTTP/2 连接建立之后，客户端与服务器交换 SETTINGS 帧，目的是设置双向的流量控制窗口大小。除此之外，任何一端都可以选择禁用个别流或整个连接的流量控制。

#### 3.6.10、服务器推送

HTTP/2 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。换句话说，除了对最初请求的响应外，服务器还可以额外向客户端推送资源，而无需客户端明确地请求。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637153657018-e16e0798-13b0-4df0-a2c1-8b5679f76e8c.png#averageHue=%23f3f2f2&clientId=u00937084-8775-4&from=paste&id=zB5Y9&originHeight=311&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&size=124646&status=done&style=none&taskId=u7b546736-c603-493f-9e93-568f27346e6&title=)
为什么需要这样一个机制呢？通常的 Web 应用都由几十个资源组成，客户端需要分析服务器提供的文档才能逐个找到它们。那为什么不让服务器提前就把这些资源推送给客户端，从而减少额外的时间延迟呢？服务器已经知道客户端下一步要请求什么资源了，这时候服务器推送即可派上用场。
另外，客户端也可以拒绝服务器的推送。

#### 3.6.11、首部压缩

> 参考
> HTTP/2 头部压缩技术介绍： [https://imququ.com/post/header-compression-in-http2.html](https://imququ.com/post/header-compression-in-http2.html)

##### 3.6.11.1、为什么要压缩

在 HTTP/1 中，HTTP 请求和响应都是由「状态行、请求 / 响应头部、消息主体」三部分组成。一般而言，消息主体都会经过 gzip 压缩，或者本身传输的就是压缩过后的二进制文件（例如图片、音频），但状态行和头部却没有经过任何压缩，直接以纯文本传输。
随着 Web 功能越来越复杂，每个页面产生的请求数也越来越多，根据 [HTTP Archive](http://httparchive.org/trends.php) 的统计，当前平均每个页面都会产生上百个请求。越来越多的请求导致消耗在头部的流量越来越多，尤其是每次都要传输 UserAgent、Cookie 这类不会频繁变动的内容，完全是一种浪费。
以下是我随手打开的一个页面的抓包结果。可以看到，传输头部的网络开销超过 100kb，比 HTML 还多：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158483672-9466aca9-2e13-49e9-ad59-43bf1bbeb8fa.png#averageHue=%23d8e5e9&clientId=u62627cad-305c-4&from=paste&height=570&id=GLR9n&originHeight=1139&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1756268&status=done&style=none&taskId=u2008615e-65ce-4156-be34-c7a1fcecaa5&title=&width=800)
下面是其中一个请求的明细。可以看到，为了获得 58 字节的数据，在头部传输上花费了好几倍的流量：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158498232-6050de54-e62f-49b3-943b-6e933e83eda4.png#averageHue=%23d8e9ef&clientId=u62627cad-305c-4&from=paste&height=569&id=fSL2p&originHeight=1137&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1911367&status=done&style=none&taskId=u70eeaadb-f5c9-46f3-be78-f90aa59763e&title=&width=800)
HTTP/1 时代，为了减少头部消耗的流量，有很多优化方案可以尝试，例如合并请求、启用 Cookie-Free 域名等等，但是这些方案或多或少会引入一些新的问题，这里不展开讨论。

##### 3.6.11.2、压缩后的效果

接下来我将使用访问本博客的抓包记录来说明 HTTP/2 头部压缩带来的变化。如何使用 Wireshark 对 HTTPS 网站进行抓包并解密，请看我的[这篇文章](https://imququ.com/post/http2-traffic-in-wireshark.html)。
首先直接上图。下图选中的 Stream 是首次访问本站，浏览器发出的请求头：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158508836-f796c056-2fb5-4de9-8b90-d9cbb0881f1b.png#averageHue=%23b1b9bc&clientId=u62627cad-305c-4&from=paste&height=566&id=M1774&originHeight=1132&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1705256&status=done&style=none&taskId=u7a8c1da1-fd9f-4e0d-bc2c-27408031136&title=&width=800)
从图片中可以看到这个 HEADERS 流的长度是 206 个字节，而解码后的头部长度有 451 个字节。由此可见，压缩后的头部大小减少了一半多。
然而这就是全部吗？再上一张图。下图选中的 Stream 是点击本站链接后，浏览器发出的请求头：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158523343-bd6e21f2-9cfc-4d27-af1c-96259c9ec1bf.png#averageHue=%23b2b8bd&clientId=u62627cad-305c-4&from=paste&height=566&id=VidGf&originHeight=1132&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1222553&status=done&style=none&taskId=u223b93d1-3097-45e7-9093-1f30f2f75be&title=&width=800)
可以看到这一次，HEADERS 流的长度只有 49 个字节，但是解码后的头部长度却有 470 个字节。这一次，压缩后的头部大小几乎只有原始大小的 1/10。
为什么前后两次差距这么大呢？我们把两次的头部信息展开，查看同一个字段两次传输所占用的字节数：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158535339-7ca064dd-3f9f-4f54-86e1-48a87c87738f.png#averageHue=%23b9c1c3&clientId=u62627cad-305c-4&from=paste&height=566&id=X2b5s&originHeight=1132&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1544385&status=done&style=none&taskId=u4a36e6e2-eadd-4cf6-8b83-0feceff55fb&title=&width=800)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158542197-199d32d1-1f3f-4d18-9c84-c6668be7d471.png#averageHue=%23c0c5c9&clientId=u62627cad-305c-4&from=paste&height=566&id=AznIk&originHeight=1132&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=972661&status=done&style=none&taskId=uded5caf2-588c-4c88-b515-08959bc3987&title=&width=800)
对比后可以发现，第二次的请求头部之所以非常小，是因为大部分键值对只占用了一个字节。尤其是 UserAgent、Cookie 这样的头部，首次请求中需要占用很多字节，后续请求中都只需要一个字节。

##### 3.6.11.3、技术原理

下面这张截图，取自 Google 的性能专家 Ilya Grigorik 在 Velocity 2015 • SC 会议中分享的「[HTTP/2 is here, let&#39;s optimize!](http://velocityconf.com/devops-web-performance-2015/public/schedule/detail/42385)」，非常直观地描述了 HTTP/2 中头部压缩的原理：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158554533-089d7f18-4232-4467-a883-c36a61e90610.png#averageHue=%236da88e&clientId=u62627cad-305c-4&from=paste&height=475&id=Shjoh&originHeight=949&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=492590&status=done&style=none&taskId=u732048db-a0d3-43d6-aee9-902aa665927&title=&width=800)
我再用通俗的语言解释下，头部压缩需要在支持 HTTP/2 的浏览器和服务端之间：

- 维护一份相同的静态字典（Static Table），包含常见的头部名称，以及特别常见的头部名称与值的组合；
- 维护一份相同的动态字典（Dynamic Table），可以动态地添加内容；
- 支持基于静态哈夫曼码表的哈夫曼编码（Huffman Coding）；

静态字典的作用有两个：1）对于完全匹配的头部键值对，例如 :method: GET，可以直接使用一个字符表示；2）对于头部名称可以匹配的键值对，例如 cookie: xxxxxxx，可以将名称使用一个字符表示。HTTP/2 中的静态字典如下（以下只截取了部分，完整表格在[这里](https://httpwg.github.io/specs/rfc7541.html#static.table.definition)）：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158577686-7be3db53-353f-4f1d-a5f0-53acdf7ff3e8.png#averageHue=%23fafafa&clientId=u62627cad-305c-4&from=paste&height=590&id=nN1jr&originHeight=1180&originWidth=866&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67515&status=done&style=none&taskId=u97fc695f-8f86-4234-a3d0-5f2d2228b48&title=&width=433)
同时，浏览器可以告知服务端，将 cookie: xxxxxxx 添加到动态字典中，这样后续整个键值对就可以使用一个字符表示了。类似的，服务端也可以更新对方的动态字典。需要注意的是，动态字典上下文有关，需要为每个 HTTP/2 连接维护不同的字典。
使用字典可以极大地提升压缩效果，其中静态字典在首次请求中就可以使用。对于静态、动态字典中不存在的内容，还可以使用哈夫曼编码来减小体积。HTTP/2 使用了一份静态哈夫曼码表（[详见](https://httpwg.github.io/specs/rfc7541.html#huffman.code)），也需要内置在客户端和服务端之中。
这里顺便说一下，HTTP/1 的状态行信息（Method、Path、Status 等），在 HTTP/2 中被拆成键值对放入头部（冒号开头的那些），同样可以享受到字典和哈夫曼压缩。另外，HTTP/2 中所有头部名称必须小写。

##### 3.6.11.4、实现细节

了解了 HTTP/2 头部压缩的基本原理，最后我们来看一下具体的实现细节。HTTP/2 的头部键值对有以下这些情况：
**1）整个头部键值对都在字典中**

```
  0   1   2   3   4   5   6   7
+---+---+---+---+---+---+---+---+
| 1 |        Index (7+)         |
+---+---------------------------+
```

这是最简单的情况，使用一个字节就可以表示这个头部了，最左一位固定为 1，之后七位存放键值对在静态或动态字典中的索引。例如下图中，头部索引值为 2（0000010），在静态字典中查询可得 :method: GET。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158629600-9c3cdb53-9b05-4861-8221-05f04d723329.png#averageHue=%23dfe4e2&clientId=u62627cad-305c-4&from=paste&height=423&id=pTw0b&originHeight=846&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1523165&status=done&style=none&taskId=u428df1f8-d2d1-472e-87f7-f4afc80708d&title=&width=650)
**2）头部名称在字典中，更新动态字典**

```
  0   1   2   3   4   5   6   7
+---+---+---+---+---+---+---+---+
| 0 | 1 |      Index (6+)       |
+---+---+-----------------------+
| H |     Value Length (7+)     |
+---+---------------------------+
| Value String (Length octets)  |
+-------------------------------+
```

对于这种情况，首先需要使用一个字节表示头部名称：左两位固定为 01，之后六位存放头部名称在静态或动态字典中的索引。接下来的一个字节第一位 H 表示头部值是否使用了哈夫曼编码，剩余七位表示头部值的长度 L，后续 L 个字节就是头部值的具体内容了。例如下图中索引值为 32（100000），在静态字典中查询可得 cookie；头部值使用了哈夫曼编码（1），长度是 28（0011100）；接下来的 28 个字节是 cookie 的值，将其进行哈夫曼解码就能得到具体内容。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158674876-09902603-04a3-4a88-9559-6e23fb6dd15d.png#averageHue=%23cad8e2&clientId=u62627cad-305c-4&from=paste&height=426&id=i4r3Y&originHeight=851&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1390873&status=done&style=none&taskId=u4eaa525e-6c53-4aa1-9910-add6dd1626e&title=&width=650)
**3）头部名称不在字典中，更新动态字典**

```
  0   1   2   3   4   5   6   7
+---+---+---+---+---+---+---+---+
| 0 | 1 |           0           |
+---+---+-----------------------+
| H |     Name Length (7+)      |
+---+---------------------------+
|  Name String (Length octets)  |
+---+---------------------------+
| H |     Value Length (7+)     |
+---+---------------------------+
| Value String (Length octets)  |
+-------------------------------+
```

这种情况与第 2 种情况类似，只是由于头部名称不在字典中，所以第一个字节固定为 01000000；接着申明名称是否使用哈夫曼编码及长度，并放上名称的具体内容；再申明值是否使用哈夫曼编码及长度，最后放上值的具体内容。例如下图中名称的长度是 5（0000101），值的长度是 6（0000110）。对其具体内容进行哈夫曼解码后，可得 pragma: no-cache。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158780473-6cf5f2f1-8634-45a6-a4fc-527a0c856c67.png#averageHue=%23dee5e7&clientId=u62627cad-305c-4&from=paste&height=426&id=itfVh&originHeight=852&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1439763&status=done&style=none&taskId=udb892e98-122e-4fda-a3a6-db55bf9fc2d&title=&width=650)
客户端或服务端看到这种格式的头部键值对，会将其添加到自己的动态字典中。后续传输这样的内容，就符合第 1 种情况了。
**4）头部名称在字典中，不允许更新动态字典**

```
  0   1   2   3   4   5   6   7
+---+---+---+---+---+---+---+---+
| 0 | 0 | 0 | 1 |  Index (4+)   |
+---+---+-----------------------+
| H |     Value Length (7+)     |
+---+---------------------------+
| Value String (Length octets)  |
+-------------------------------+
```

这种情况与第 2 种情况非常类似，唯一不同之处是：第一个字节左四位固定为 0001，只剩下四位来存放索引了，如下图：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637158830783-90a08970-32bf-4110-92f5-b7bc39bf4ac1.png#averageHue=%23cdd7dd&clientId=u62627cad-305c-4&from=paste&height=426&id=YMmQ7&originHeight=852&originWidth=1300&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1408422&status=done&style=none&taskId=ucef1fa58-de27-4ea6-91ae-c8feebf2ca2&title=&width=650)
这里需要介绍另外一个知识点：对整数的解码。上图中第一个字节为 00011111，并不代表头部名称的索引为 15（1111）。第一个字节去掉固定的 0001，只剩四位可用，将位数用 N 表示，它只能用来表示小于「2 ^ N - 1 = 15」的整数 I。对于 I，需要按照以下规则求值（RFC 7541 中的伪代码，[via](http://http2.github.io/http2-spec/compression.html#integer.representation)）：

```
if I < 2 ^ N - 1, return I         # I 小于 2 ^ N - 1 时，直接返回
else
    M = 0
    repeat
        B = next octet             # 让 B 等于下一个八位
        I = I + (B & 127) * 2 ^ M  # I = I + (B 低七位 * 2 ^ M)
        M = M + 7
    while B & 128 == 128           # B 最高位 = 1 时继续，否则返回 I
    return I
```

对于上图中的数据，按照这个规则算出索引值为 32（00011111 00010001，15 + 17），代表 cookie。需要注意的是，协议中所有写成（N+）的数字，例如 Index (4+)、Name Length (7+)，都需要按照这个规则来编码和解码。
这种格式的头部键值对，不允许被添加到动态字典中（但可以使用哈夫曼编码）。对于一些非常敏感的头部，比如用来认证的 Cookie，这么做可以提高安全性。
**5）头部名称不在字典中，不允许更新动态字典**

```
  0   1   2   3   4   5   6   7
+---+---+---+---+---+---+---+---+
| 0 | 0 | 0 | 1 |       0       |
+---+---+-----------------------+
| H |     Name Length (7+)      |
+---+---------------------------+
|  Name String (Length octets)  |
+---+---------------------------+
| H |     Value Length (7+)     |
+---+---------------------------+
| Value String (Length octets)  |
+-------------------------------+
```

这种情况与第 3 种情况非常类似，唯一不同之处是：第一个字节固定为 00010000。这种情况比较少见，没有截图，各位可以脑补。同样，这种格式的头部键值对，也不允许被添加到动态字典中，只能使用哈夫曼编码来减少体积。
实际上，协议中还规定了与 4、5 非常类似的另外两种格式：将 4、5 格式中的第一个字节第四位由 1 改为 0 即可。它表示「本次不更新动态词典」，而 4、5 表示「绝对不允许更新动态词典」。区别不是很大，这里略过。
明白了头部压缩的技术细节，理论上可以很轻松写出 HTTP/2 头部解码工具了。我比较懒，直接找来 node-http2 中的 [compressor.js](https://github.com/molnarg/node-http2/blob/master/lib/protocol/compressor.js) 验证一下：

```
var Decompressor = require('./compressor').Decompressor;

var testLog = require('bunyan').createLogger({name: 'test'});
var decompressor = new Decompressor(testLog, 'REQUEST');

var buffer = new Buffer('820481634188353daded6ae43d3f877abdd07f66a281b0dae053fad0321aa49d13fda992a49685340c8a6adca7e28102e10fda9677b8d05707f6a62293a9d810020004015309ac2ca7f2c3415c1f53b0497ca589d34d1f43aeba0c41a4c7a98f33a69a3fdf9a68fa1d75d0620d263d4c79a68fbed00177febe58f9fbed00177b518b2d4b70ddf45abefb4005db901f1184ef034eff609cb60725034f48e1561c8469669f081678ae3eb3afba465f7cb234db9f4085aec1cd48ff86a8eb10649cbf', 'hex');

console.log(decompressor.decompress(buffer));

decompressor._table.forEach(function(row, index) {
    console.log(index + 1, row[0], row[1]);
});
```

头部原始数据来自于本文第三张截图，运行结果如下（静态字典只截取了一部分）：

```
{ ':method': 'GET',
  ':path': '/',
  ':authority': 'imququ.com',
  ':scheme': 'https',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.5',
  'accept-encoding': 'gzip, deflate',
  cookie: 'v=47; u=6f048d6e-adc4-4910-8e69-797c399ed456',
  pragma: 'no-cache' }
1 ':authority' ''
2 ':method' 'GET'
3 ':method' 'POST'
4 ':path' '/'
5 ':path' '/index.html'
6 ':scheme' 'http'
7 ':scheme' 'https'
8 ':status' '200'
... ...
32 'cookie' ''
... ...
60 'via' ''
61 'www-authenticate' ''
62 'pragma' 'no-cache'
63 'cookie' 'u=6f048d6e-adc4-4910-8e69-797c399ed456'
64 'accept-language' 'en-US,en;q=0.5'
65 'accept' 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
66 'user-agent' 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0'
67 ':authority' 'imququ.com'
```

##### 3.6.11.5、总结

在进行 HTTP/2 网站性能优化时很重要一点是「使用尽可能少的连接数」，本文提到的头部压缩是其中一个很重要的原因：同一个连接上产生的请求和响应越多，动态字典积累得越全，头部压缩效果也就越好。所以，针对 HTTP/2 网站，最佳实践是不要合并资源，不要散列域名。
默认情况下，浏览器会针对这些情况使用同一个连接：

- 同一域名下的资源；
- 不同域名下的资源，但是满足两个条件：1）解析到同一个 IP；2）使用同一个证书；

上面第一点容易理解，第二点则很容易被忽略。实际上 Google 已经这么做了，Google 一系列网站都共用了同一个证书，可以这样验证：

```
$ openssl s_client -connect google.com:443 |openssl x509 -noout -text | grep DNS

depth=2 C = US, O = GeoTrust Inc., CN = GeoTrust Global CA
verify error:num=20:unable to get local issuer certificate
verify return:0
                DNS:*.google.com, DNS:*.android.com, DNS:*.appengine.google.com, DNS:*.cloud.google.com, DNS:*.google-analytics.com, DNS:*.google.ca, DNS:*.google.cl, DNS:*.google.co.in, DNS:*.google.co.jp, DNS:*.google.co.uk, DNS:*.google.com.ar, DNS:*.google.com.au, DNS:*.google.com.br, DNS:*.google.com.co, DNS:*.google.com.mx, DNS:*.google.com.tr, DNS:*.google.com.vn, DNS:*.google.de, DNS:*.google.es, DNS:*.google.fr, DNS:*.google.hu, DNS:*.google.it, DNS:*.google.nl, DNS:*.google.pl, DNS:*.google.pt, DNS:*.googleadapis.com, DNS:*.googleapis.cn, DNS:*.googlecommerce.com, DNS:*.googlevideo.com, DNS:*.gstatic.cn, DNS:*.gstatic.com, DNS:*.gvt1.com, DNS:*.gvt2.com, DNS:*.metric.gstatic.com, DNS:*.urchin.com, DNS:*.url.google.com, DNS:*.youtube-nocookie.com, DNS:*.youtube.com, DNS:*.youtubeeducation.com, DNS:*.ytimg.com, DNS:android.com, DNS:g.co, DNS:goo.gl, DNS:google-analytics.com, DNS:google.com, DNS:googlecommerce.com, DNS:urchin.com, DNS:youtu.be, DNS:youtube.com, DNS:youtubeeducation.com
```

使用多域名加上相同的 IP 和证书部署 Web 服务有特殊的意义：让支持 HTTP/2 的终端只建立一个连接，用上 HTTP/2 协议带来的各种好处；而只支持 HTTP/1.1 的终端则会建立多个连接，达到同时更多并发请求的目的。这在 HTTP/2 完全普及前也是一个不错的选择。

### 3.7、HTTP2的性能优化

使用 HTTP/2 代替 HTTP/1.1，本身就是一种巨大的性能提升。 这小节要聊的是在 HTTP/1.1 中的某些优化手段，在 HTTP/2 中是不必要的，可以取消的。

#### 3.7.1、取消合并资源

在 HTTP/1.1 中要把多个小资源合并成一个大资源，从而减少请求。而在 HTTP/2 就不需要了，因为 HTTP/2 所有的请求都可以在一个 TCP 连接发送。

#### 3.7.2、取消域名拆分

取消域名拆分的理由同上，再多的 HTTP 请求都可以在一个 TCP 连接上发送，所以不需要采取多个域名来突破浏览器 TCP 连接数限制这一规则了。

### 3.8、升级到HTTP/2

> 参考：
> 怎样把网站升级到http/2: [https://zhuanlan.zhihu.com/p/29609078](https://zhuanlan.zhihu.com/p/29609078)

要求nginx的最低版本是1.10.0，openssl的最低版本是1.0.2，http/2在实现上基本上只支持https。笔者的系统是centos 7，用yum安装的nginx是1.10.2，这个版本是可以的，但是系统的openssl是1.0.1，把系统的openssl update一下，变成1.0.2，但还是不可以。发现是因为nginx在编译的时候指定的openssl是1.0.1的，所以即使升级了系统的openssl也是没有用的，如下图所示：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637160314164-483a930f-45cc-4eb8-b640-6185c4383b00.png#averageHue=%233e3c3a&clientId=uc6a1b6d8-b331-4&from=paste&id=XPObi&originHeight=170&originWidth=1052&originalType=url&ratio=1&rotation=0&showTitle=false&size=36143&status=done&style=none&taskId=uceaa5ebe-7a9f-4075-ad3d-d008fef7c0d&title=)

那怎么升级呢？[nginx官方](https://link.zhihu.com/?target=https%3A//www.nginx.com/blog/supporting-http2-google-chrome-users/)提供了两种方法，第一种是升级操作系统，第二种是从源码编译新版本的nginx，我们用第二种方法。当前nginx最新的稳定版本是1.12.1，在服务器上执行以下命令：

```shell
wget http://nginx.org/download/nginx-1.12.1.tar.gz # 下载
tar -zxvf nginx-1.12.1.tar.gz # 解压
cd nginx-1.12.1
./configure # 确认系统环境，生成make文件
make # 编译
sudo make install #安装
```

configure的时候后面可以带参数，参数可以用原先老版本nginx的参数，包括安装路径之类的，这个可以通过执行nginx -V得到，使得新nginx的配置和老nginx一样。如果configure提示缺一些库的话就相应地做些安装，基本上就是它提示的库后面带上devel，如以下提示：

> ./configure: error: the Google perftools module requires the Google perftools
> library. You can either do not enable the module or install the library.

可安装下面这个库解决：

```shell
sudo yum install gperftools-devel
```

新安装后的nginx的openssl版本就对了：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637160399363-938be521-40fa-4d94-b843-722d7e75c9e9.png#averageHue=%233d3b3a&clientId=uc6a1b6d8-b331-4&from=paste&id=qhbs7&originHeight=172&originWidth=1142&originalType=url&ratio=1&rotation=0&showTitle=false&size=37656&status=done&style=none&taskId=uc2c6de7a-120b-44b0-a5a5-243ede0e64a&title=)
然后添加nginx配置，原本https的listen为：

> **listen** 443 ssl;

现在在后面加上http2：

> **listen** 443 ssl http2;

然后把nginx关了再开一下（因为新安装了一个nginx，要先关一下再开），这个时候再用浏览器访问，原本的http1.1：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637160448315-2feaf1e9-b427-4e34-b7aa-09c2edc7c430.png#averageHue=%23faf9f8&clientId=uc6a1b6d8-b331-4&from=paste&id=ndfnT&originHeight=184&originWidth=542&originalType=url&ratio=1&rotation=0&showTitle=false&size=24404&status=done&style=none&taskId=u9581b852-b1f2-40f5-ab82-d3c78d88695&title=)

就会变成http2：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637160448389-3fff9472-24b9-4723-9c7e-24f3b0231adc.png#averageHue=%23faf9f7&clientId=uc6a1b6d8-b331-4&from=paste&id=jslb2&originHeight=174&originWidth=504&originalType=url&ratio=1&rotation=0&showTitle=false&size=23933&status=done&style=none&taskId=u0bd80a9e-5f32-4532-9e7b-be53768bdea&title=)

有个细节是HTTP/2不叫2.0，这是故意的，因为1.x容易混淆，所以2的时候就不带小版本号了，所以上面firefox的显示其实是不对的。
整个传输模型如下图所示（图片来自[nginx](https://link.zhihu.com/?target=https%3A//www.nginx.com/blog/http2-r7/)）：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637160448473-6eba1754-b601-4a5b-9cbf-eced5d38cbe0.png#averageHue=%23f8f8f8&clientId=uc6a1b6d8-b331-4&from=paste&id=VwFZ6&originHeight=300&originWidth=1024&originalType=url&ratio=1&rotation=0&showTitle=false&size=46590&status=done&style=none&taskId=u3f3ecb75-76b0-4f6a-9f31-576f51a0b6e&title=)

nginx和客户端是HTTP/2，而nginx和业务服务还是HTTP/1.1，因为nginx的服务和业务服务通常是处于同一个内网，速度一般会很快，而nginx和客户端的连接就不太可控了，如果业务服务本身支持HTTP/2，会更好。

---

# 四、HTTP3

Google 在推SPDY的时候就已经意识到了这些问题，于是就另起炉灶搞了一个基于 UDP 协议的“QUIC”协议，让HTTP跑在QUIC上而不是TCP上。主要特性如下：

- 实现了类似TCP的流量控制、传输可靠性的功能。虽然UDP不提供可靠性的传输，但QUIC在UDP的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些TCP中存在的特性。
  以往的TCP丢包重传策略是：在发送端为每一个封包标记一个编号 (sequence number)，接收端在收到封包时，就会回传一个带有对应编号的ACK封包给发送端，告知发送端封包已经确实收到。当发送端在超过一定时间之后还没有收到回传的 ACK，就会认为封包已经丢失，启动重新传送的机制，复用与原来相同的编号重新发送一次封包，确保在接收端这边没有任何封包漏接。
  这样的机制就会带来一些问题，假设发送端总共对同一个封包发送了两次 (初始 + 重传)，使用的都是同一个sequence number：编号N。之后发送端在拿到编号N封包的回传ACK 时，将无法判断这个带有编号N的ACK，是接收端在收到初始封包后回传的ACK。这就会加大后续的重传计算的耗时。QUIC为了避免这个问题，发送端在传送封包时，初始与重传的每一个封包都改用一个新的编号，unique packet number，每一个编号都唯一而且严格递增，这样每次在收到ACK时，就可以依据编号明确的判断这个ACK是来自初始封包或者是重传封包。
- 实现了快速握手功能。
  不管是HTTP1.0/1.1还是 HTTPS，HTTP2.0，都使用了TCP进行传输。HTTPS和HTTP2还需要使用TLS协议来进行安全传输。这就出现了两个握手延迟，而基于UDP协议的QUIC，因为UDP 本身没有连接的概念，连接建立时只需要一次交互，半个握手的时间。区别如下图：
  ![image.png](https://cdn.nlark.com/yuque/0/2021/png/333805/1637157059882-66030476-343d-41c2-a9d6-fe064620c144.png#averageHue=%23f8f8f8&clientId=u62627cad-305c-4&from=paste&height=433&id=ksQzL&originHeight=381&originWidth=600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=95009&status=done&style=none&taskId=u24d9592a-927f-4b8b-abff-64a5d6c8c58&title=&width=682)
- 集成了TLS加密功能。目前QUIC使用的是TLS1.3，相较于早期版本TLS1.3有更多的优点，其中最重要的一点是减少了握手所花费的RTT个数。
- 多路复用，彻底解决TCP中队头阻塞的问题
  QUIC保留了HTTP2.0多路复用的特性，但是即使在多路复用过程中，同一个TCP连接上有多个stream，假如其中一个stream丢包，在重传前后续的stream都会受到影响，而QUIC中一个连接上的多个stream之间没有依赖。所以当发生丢包时，只会影响当前的stream，也就避免了线头阻塞问题
- **流量控制**
  通过流量控制可以限制客户端传输资料量的大小，有了流量控制后，接收端就可以只保留相对应大小的接收 buffer，优化记忆体被占用的空间。但是如果存在一个流量极慢的stream ，光一个stream就有可能佔用掉接收端所有的资源。QUIC为了避免这个潜在的HOL Blocking，采用了连线层 (connection flow control) 和 Stream 层的 (stream flow control) 流量控制，限制单一 Stream 可以占用的最大buffer size。
- **连接迁移：** TCP连接基于四元组（源 IP、源端口、目的 IP、目的端口），切换网络时至少会有一个因素发生变化，导致连接发生变化。当连接发生变化时，如果还使用原来的 TCP 连接，则会导致连接失败，就得等原来的连接超时后重新建立连接，所以我们有时候发现切换到一个新网络时，即使新网络状况良好，但内容还是需要加载很久。如果实现得好，当检测到网络变化时立刻建立新的 TCP 连接，即使这样，建立新的连接还是需要几百毫秒的时间。 QUIC 的连接不受四元组的影响，当这四个元素发生变化时，原连接依然维持。QUIC 连接不以四元组作为标识，而是使用一个 64 位的随机数，这个随机数被称为 Connection ID，对应每个stream，即使 IP 或者端口发生变化，只要 Connection ID 没有变化，那么连接依然可以维持。
