---
title: Nginx常用命令及配置
date: 2023-11-11
categories:
 - 运维|网络
 - Nginx
tags:
 - nginx
 - 命令
 - 配置
---
# Nginx常用命令及配置

> 官网文档：[http://nginx.org/en/docs/](http://nginx.org/en/docs/)
> 中文文档：[https://www.nginx.cn/doc/](https://www.nginx.cn/doc/)
> 中文文档：[https://wizardforcel.gitbooks.io/nginx-doc/content/Text/7.4_loadbalance.html](https://wizardforcel.gitbooks.io/nginx-doc/content/Text/7.4_loadbalance.html)
> nginx示例： [https://zhuanlan.zhihu.com/p/451825018](https://zhuanlan.zhihu.com/p/451825018)
> 博客地址：

### 常用命令

```shell
# windows启动
start nginx

# linux/mac启动
service nginx start

# 手动指定配置
nginx -c /usr/local/nginx/conf/nginx.conf

# -p指定nginx运行目录(日志存储位置)
nginx -c /path/nginx.conf -p /path/

# 重启
nginx -s reload

# 关闭
nginx -s stop

# 查看端口
netstat -an | grep 端口  # linux/mac系统
netstat -an | findstr 端口  # windows系统

# 测试web服务
curl -i 主机:端口
# 或
telnet 主机 端口

# 查看进程
ps -ef | grep nginx

# 查看错误日志
tail -30 /var/log/nginx/error.log

# 查看nginx版本
nginx -v

```

### 常用配置

```nginx
# HTTP 配置
# 策略说明
# 1. 禁用默认html的的缓存（响应头禁用/同时禁用代理层缓存）
# 2. 禁用非html文件（例如：css，js，字体）的tryfile配置，设置为正常的404响应

http {
  server {
    listen 80;
    server_name 127.0.0.1;
    root /opt/nginx/frontEnd;

    # 压缩配置
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1k;
    gzip_types image/png image/jpeg image/gif image/svg+xml application/javascript;
    gzip_vary on;


    # 静态资源路径通用配置①
    location /static {
      # 关闭自动添加 index.html 的行为
      index off;
      # 禁用 try_files 逻辑
      try_files $uri =404;

      # 缓存配置
      expires max;
      add_header Cache-Control "public";
    }

    # 静态资源路径通用配置②，CSS、JS、字体排除 try_files
    # 通用配置①和②，二选一就好
    # html|htm|gif|jpg|jpeg|bmp|png|ico|js|css|json|md|woff
    location ~* \.(gif|jpeg|bmp|png|ico|json|md|css|js|woff|woff2|ttf|otf)$ {
      # 禁用 try_files 逻辑
      try_files $uri =404;
    
 			# js、css、字体、图片等资源启用强缓存
      # 缓存配置
      expires max;
      add_header Cache-Control "public, max-age=25920000";#非html缓存1个月  
    }  

    # index.html 禁用缓存
    location /index.html {
      # 关闭缓存
      expires off;
      # 禁用缓存
      # add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
      # 启用协商缓存
      add_header Cache-Control "public, no-cache";
      add_header Pragma "no-cache";
    }
  }
}

```
