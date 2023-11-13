---
title: Nginx的CORS跨域配置
date: 2023-11-13
tags:
 - nginx
 - 跨域
categories:
 - 运维|网络
 - nginx
---
# Nginx的CORS跨域配置

## 一、涉及的基础资料

### 1.1、HTTP Headers

MDN文档：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

### 1.2、Nginx官网配置手册

[http://nginx.org/en/docs/http/ngx_http_headers_module.html](http://nginx.org/en/docs/http/ngx_http_headers_module.html)

## 二、Nginx的跨域设置/常用设置如下

```nginx
# 针对异常接口无法显示错误信息，单独设置options请求，强制返回204状态，便于系统调试
# 例如：接口异常时，如无设置响应头状态码，跨域报错可能为"response to preflight request doesn't pass access control check: it does not have http ok status"

if ($request_method = 'OPTIONS') {
  add_header 'Access-Control-Allow-Origin' '$http_origin' always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
  add_header 'Access-Control-Allow-Headers' 'X-Grade, prelogid,Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin' always;
  # Access-Control-Expose-Headers 非必须
  add_header 'Access-Control-Expose-Headers' 'X-Pagenation-Count' always;
  return 204;
}

add_header 'Access-Control-Allow-Origin' '$http_origin' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
add_header 'Access-Control-Allow-Headers' 'X-Grade, prelogid,Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin' always;
# Access-Control-Expose-Headers 非必须
add_header 'Access-Control-Expose-Headers' 'X-Pagenation-Count' always;
```

## 三、常见问题

### 3.1、报错信息不显示明细

`response to preflight request doesn't pass access control check: it does not have http ok status`
解决方法：需将 `CORS`设置中 `OPTIONS` 方法的响应码设置为 `204`

### 3.2、重复设置跨域响应头

> Access to XMLHttpRequest at 'https://test.com/gateway/admin/robot/getList' from origin 'http://localhost:9200' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains multiple values '*, http://localhost:9200', but only one is allowed.

**解决方法：** 检查后端代码接口的响应头设置、网关设置、服务器设置等所有可以设置请求响应头的地方，CORS的响应头仅可设置一次。

**原因：** 如在多个地方设置响应头字段，后添加的设置不会覆盖先添加的信息，从而导致一个请求的响应头中有多个相同字段，CORS的设置失败

### 3.3、跨域设置仅对部分方法生效

例如：Get生效，Post无效

**解决方案**：每条 `nginx`配置后增加 `always`属性。

---

详情看如下案例

今天debug一跨域问题，本来觉得就一很简单的问题，结果被无情打脸，费了老大劲了，有必要复盘下。
同样的接口Get好使而POST就是不行，前端那里一直报跨域请求失败。

```shell
No 'Access-Control-Allow-Origin' header is present on the requested resource
```

但我明明Nginx已经加上相关配置上了，没道理啊。

```nginx
add_header 'Access-Control-Allow-Origin' $http_origin;
add_header 'Access-Control-Request-Method' 'GET,POST,OPTIONS,DELETE,PUT';
add_header 'Access-Control-Allow-Credentials' 'true';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
```

再三确认配置是没问题后只能求助GG，结果还真有发现，_原来__add_header__不是所有返回都会追加，只限特定状态码的返回才有效，如果想所有返回都生效需要加上__always选项参数_。具体来看下官方的解释:

```nginx
Syntax:	add_header name value [always];
Default:	—
Context:	http, server, location, if in location
```

> Adds the specified field to a response header provided that the response code equals 200, 201 (1.3.10), 204, 206, 301, 302, 303, 304, 307 (1.1.16, 1.0.13), or 308 (1.13.0).

于是修改配置加上always

```nginx
add_header 'Access-Control-Allow-Origin' $http_origin always;
add_header 'Access-Control-Request-Method' 'GET,POST,OPTIONS,DELETE,PUT' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' always;
```

重启 `Nginx`，刷新页面，wow，跨域报错消失了，但是接口 `Post`报500了错误。
此时已经完全明白过来了，正是由于这个接口 `GET`请求返回正常，所以返回的 `header`中会添加上 `Access-Control-Allow-Origin`，而 `POST`时接口返回 `500`，`add_header`不起作用，`Access-Control-Allow-Origin`添加不上所以才有了一直不生效的错觉，好坑~~~。不过还是怪自己没有完全掌握参数的用法，还是要多读文档。


> **参考信息来源**
>
> - Nginx配置跨域不生效可能是这个原å因:[https://blog.dianduidian.com/post/nginx%E9%85%8D%E7%BD%AE%E8%B7%A8%E5%9F%9F%E4%B8%8D%E7%94%9F%E6%95%88%E6%9C%89%E5%8F%AF%E8%83%BD%E6%98%AF%E8%BF%99%E4%B8%AA%E5%8E%9F%E5%9B%A0/](https://blog.dianduidian.com/post/nginx%E9%85%8D%E7%BD%AE%E8%B7%A8%E5%9F%9F%E4%B8%8D%E7%94%9F%E6%95%88%E6%9C%89%E5%8F%AF%E8%83%BD%E6%98%AF%E8%BF%99%E4%B8%AA%E5%8E%9F%E5%9B%A0/)
> - [https://stackoverflow.com/questions/35946006/nginx-cors-doesnt-work-for-post](https://stackoverflow.com/questions/35946006/nginx-cors-doesnt-work-for-post)
> - [http://nginx.org/en/docs/http/ngx_http_headers_module.html](http://nginx.org/en/docs/http/ngx_http_headers_module.html)
