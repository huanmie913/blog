---
title: 缓存CORS的OPTION预检请求
date: 2023-11-12
tags:
 - 跨域
 - 缓存 
categories:
 - 运维|网络
---
# 缓存CORS的OPTION预检请求

> 源文：[https://httptoolkit.com/blog/cache-your-cors/](https://httptoolkit.com/blog/cache-your-cors/)


> 概述：
> - CORS 是跨域 HTTP 请求，实际会发出两个 HTTP 请求（预检请求 + 正式请求）。
> - 很多云服务商按请求数计费，这将大大增加费用，本文介绍如何在客户端缓存 CORS 请求，避免过多的请求。
> - 缓存CORS的OPTION预检请求，以获得更好的性能和收益


正文如下(源文翻译)

`CORS` 是许多 `API` 的必需品，但基本配置可能会产生大量额外的请求，从而减慢每个浏览器 `API` 客户端的速度，并向后端发送不必要的流量。
对于传统 `API` 来说，这可能是一个问题，但对于无服务器平台来说，这是一个更大的问题，_因为在无服务器平台中_，_您的计费通常与收到的请求数量直接相关，因此这很容易使您的 API 成本翻倍_。
所有这些都是不必要的：它之所以发生，是因为你不知道缓存是如何对 CORS 请求工作的。让我们来解决这个问题。
## 什么是`CORS`预检请求
在浏览器发出任何跨越源的请求之前（例如，example.com 到 api.example.com），如果它不是一个[简单的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#simple_requests)，那么浏览器会首先发送预检请求，并等待成功的响应，然后再发送真正的请求。
此预检请求是对服务器的 OPTIONS 请求，描述浏览器想要发送的请求，并首先请求权限。它看起来像这样：
```http
OPTIONS /v1/documents
Host: https://api.example.com
Origin: https://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: origin, x-requested-with
```
服务器必须使用`headers`进行响应，以确认它很乐意接受请求，并且浏览器将等待发送真正的请求，直到这种情况发生。
如果您想确切地检查这些 CORS 规则是如何工作的，以及您应该如何响应，请尝试 [Will it CORS？](https://httptoolkit.com/will-it-cors/)来测试各种可能性。
在实践中，以下几种情况的跨域API请求，需要先发起预检请求：

- 具有 JSON 或 XML 正文的任何请求
- 任何包括凭据的请求，例如：携带cookie
- 任何不是 `GET`、`POST` 或 `HEAD` 的请求
- 任何流式传输请求（request）或响应主体（response body）的交换
- 使用除 `**Accept**` 、 `**Accept-Language**` `**Content-Language**` 和 `**Content-Type**` 以外的任何`headers`
## 为什么这很糟糕
这些请求中的每一个都会阻止您的实际请求，至少在往返到服务器的时间内。默认情况下，`OPTIONS` 请求不可缓存，因此您的 `CDN` 通常不会处理它们，并且每次都必须访问您的服务器。
它们缓存在客户端中，但默认情况下仅缓存 `5` 秒。如果网页轮询您的 `API`，每 `10` 秒发出一次请求，它也会每 `10` 秒重复一次预检检查。
在许多情况下，这实际上使所有浏览器客户端的 API 延迟增加了一倍。从最终用户的角度来看，您的性能减半了！我相信你已经听过一百次了，几百毫秒的延迟会转化为转化率和用户满意度的巨大差异。这是非常糟糕的。
此外，它还可以为您的 `API` 服务器增加有意义的额外负载和成本。这尤其适用于无服务器计费模型。包括 `AWS Lambda`、`Netlify Functions`、`Cloudflare Workers` 和 `Google Cloud Functions` 在内的平台都根据函数调用次数计费，这些`预检请求`与其他任何请求一样计入其中。无服务器在规模较小时可以免费，但一旦大型生产系统投入使用，就会变得更加昂贵，并且可能会使您的成本翻倍，这将是一个巨大的打击！
即使没有无服务器，这仍然会让你陷入困境。如果您希望 CDN 处理很大一部分 API 请求，那么在向浏览器请求添加自定义标头时，可能会为每个客户端请求创建一个额外的请求，直接发送到后端服务器，这可能会是一个重大惊喜。
## 如何缓存预检请求
您应该为这些步骤设置两个缓存步骤：
在浏览器中缓存，因此单个客户端不会不必要地重复相同的`预检请求`。
您应该为以下内容设置两个缓存步骤:

- 在浏览器中缓存，因此单个客户端不会不必要地重复相同的`预检请求`。
- 在可能的情况下，在 `CDN` 层中缓存，将这些视为持续响应，以便后端服务器/函数不必处理它们。
### 浏览器的 `CORS` 缓存
若要在浏览器中缓存 `CORS` 响应，只需将此`header`添加到预检请求的响应头中（response）：
```http
Access-Control-Max-Age: 86400
```
这是以秒为单位的缓存时间。
浏览器限制：`Firefox` 将该值限制为` 86400（24 小时）`，而所有基于 `Chromium` 的浏览器将其限制为 `7200（2 小时）`。不过，每 2 小时发出一次此请求，而不是在每个 API 请求之前发出此请求，可以极大地改善用户体验，并且将值设置得更高以确保在可能的情况下适用更长的生命周期是很容易的。
### CDN 的 CORS 缓存
要在浏览器和 API 服务器之间的 CDN 和其他代理中缓存 CORS 响应，请添加：
```http
Cache-Control: public, max-age=86400
Vary: origin
```
这会将响应缓存在公共缓存（例如 CDN）中 24 小时，这在大多数情况下应该足够了，而不会有缓存失效成为问题的风险。对于初始测试，您可能希望将缓存时间设置得更短，并在您对所有设置都正确感到满意时增加缓存时间。
需要注意的是，这不是标准的（默认情况下，OPTIONS 被定义为不可缓存），但它似乎得到了大多数 CDN 的广泛支持，他们会很乐意缓存像这样明确选择加入的 OPTIONS 响应。有些可能需要手动启用此功能，因此请在配置中进行测试。
在最坏的情况下，如果您的 CDN 不支持此功能，它将被忽略，因此没有真正的缺点。
此处的 `**Vary**` `header`很重要：这告诉缓存除了使用相同的 URL 之外，仅对具有相同 `**Origin**` header的其他请求（来自同一跨域源的请求）使用此响应。
如果不设置 `**Vary**` 标题，可能会遇到大问题。`预检请求`响应通常包括与` **Access-Control-Allow-Origin**` 传入 `**Origin**` 值匹配的标头。如果在未设置 `**Vary**` 的情况下缓存响应，则具有一个源的响应可能会用于具有不同源的请求，这将使 `CORS` 检查失败并完全阻止请求。
如果您使用的是依赖于请求的其他 `CORS` 响应头，您也应该在此处包含它们，例如：
```http
Access-Control-Allow-Headers: my-custom-header
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Vary: Access-Control-Request-Headers, Access-Control-Request-Method
```
如果你现在想测试其中任何一个，请安装 [HTTP Toolkit](https://httptoolkit.com/)，添加一个与你的请求匹配的规则，启动一个被拦截的浏览器，你可以尝试手动将这些标头注入到 API 响应中，以准确查看浏览器如何处理它们。

## 配置实例
如何在实际应用中配置缓存，下面有一些有用的现成示例。在每种情况下，我都假设您已经设置了预检 `CORS` 处理，因此我们只是在考虑如何在此基础上添加缓存。
### 使用 AWS Lambda 缓存 CORS
要使用 AWS Lambda 启用 `CORS`，您可以在 `HTTP` 响应中手动返回上述标头，也可以将 `API Gateway` 配置为为您处理 `CORS`。
如果您使用 API Gateway 的配置，则允许您配置标头，但默认情况下不会设置 `**Cache-Control**` ，因此如果您使用的是 `CloudFront` 或其他 `CDN`，则也应手动配置该 `**Vary**` `**Access-Control-Max-Age**` 标头。
或者，您可以在预检 lambda 处理程序中自行控制这一切，如下所示：
```javascript
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    headers: {
      // Keep your existing CORS headers:
      "Access-Control-Allow-Origin": event.headers['origin'],
      // ...

      // And add these:
      "Access-Control-Max-Age": 86400,
      "Cache-Control": "public, max-age=86400",
      "Vary": "origin"
    }
  };

  return response;
};
```
`CloudFront` 专门包含单独的配置，用于为 `OPTIONS` 响应启用缓存，因此，如果您在此处使用 `**Cache-Control**` ，则应确保启用此功能
如果您使用的是 `Serverless` 框架，则可以 `**serverless.yml** `在
```yaml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
          cors:
            origin: '*'
            maxAge: 86400
            cacheControl: 'public, max-age=86400'
```

### 在 `Node.js` 中缓存 `CORS`
如果您使用的是 `Express`、`Connect` 或基于它们的框架，那么您可能正在使用 cors 模块来处理 CORS。
默认情况下，这根本不会启用任何类型的缓存，但可以通过传递 `**maxAge**` 值进行配置 `**Access-Control-Max-Age**` 。
您无法轻松配置 `**Cache-Control** `，因此，如果您使用的是 `CDN`，则可能需要执行稍微复杂一些操作：
```javascript
app.use(cors({
  // Set the browser cache time for preflight responses
  maxAge: 86400,
  preflightContinue: true // Allow us to manually add to preflights
}));

// Add cache-control to preflight responses in a separate middleware:
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    // No Vary required: cors sets it already set automatically
    res.end();
  } else {
    next();
  }
});
```
### 在 `Python` 中缓存 `CORS`
`Django` 的 `django-cors-headers` 模块包含合理的默认值 `86400` 作为其 `**Access-Control-Max-Age**` 值。
同时，Flask 的 Flask-Cors 模块默认不启用缓存，但可以通过在现有配置中作为选项传递 `**max_age=86400** `来启用它
这样，您可以确保浏览器正确缓存这些响应。如果您也想要 CDN 缓存，则需要手动配置 `**Cache-Control** .`不幸的是，据我所知，这两个模块都不支持自定义配置或简单的解决方法，因此，如果 CDN 缓存对您很重要，那么您可能需要手动处理预检请求，或者自己包装这些模块。
### 使用 `Java Spring` 缓存 `CORS`
在 Spring 中，您可能已经在使用 `**@CrossOrigin** `注解来处理 CORS 请求。
默认情况下，Spring 将设置一个 30 分钟的 `**Access-Control-Max-Age**` 标头，在每个单独的浏览器中添加相对较短的缓存，但不会设置 `**Cache-Control** `标头。
我建议您通过设置 `**maxAge**` 选项将最长期限增加到 `24` 小时（`86400` 秒，任何浏览器使用的最大值），如果您使用的是 `CDN`，还可以添加 `**Cache-Control** `标题。`Spring` 内置的 `CORS` 配置不支持自动执行后者，但您可以使用响应过滤器轻松地自己添加标头：
```java
@Component
public class AddPreflightCacheControlWebFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        if (CorsUtils.isPreFlightRequest(exchange.getRequest())) {
            exchange.getResponse()
            .getHeaders()
            .add("Cache-Control", "public, max-age=86400");
        }
        return chain.filter(exchange);
    }
}
```
我希望这有助于提高您的 `CORS` 性能并减少您的 API 流量！
**调试 API 并希望检查、重写和模拟实时流量？立即试用 **[**HTTP Toolkit**](https://httptoolkit.com/javascript/)**。适用于 Web、Android、服务器等的开源一键式 HTTP（S） 拦截和调试。**
