---
title: location优先级使用说明
date: 2023-11-11
tags:
  - nginx
categories:
  - 运维|网络
  - nginx
---
# location优先级使用说明

配置项格式为：location [ = | ~ | ~* | ^~ ] /uri/ {...}
### 在nginx配置文件中，location主要有这几种形式：

1. 正则匹配 location ~ /abc { }
2. 不区分大小写的正则匹配 location ~* /abc { }
3. 匹配路径的前缀，如果找到停止搜索 location ^~ /abc { }
4. 精确匹配 location = /abc { }
5. 普通路径前缀匹配 location /abc { }

#### 优先级
4 > 3 > 2 > 1 > 5

### 解释一下各个格式：

```nginx
location = / {
# 精确匹配 / ，主机名后面不能带任何字符串
[ configuration A ]
}
```
```nginx
location / {
# 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
# 但是正则和最长字符串会优先匹配
[ configuration B ]
}
```
```nginx
location /documents/ {
# 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
# 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
[ configuration C ]
}
```
```nginx
location ~ /documents/Abc {
# 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
# 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
[ configuration CC ]
}
```
```nginx
location ^~ /images/ {
# 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
[ configuration D ]
}
```
```nginx
location ~* \.(gif|jpg|jpeg)$ {
# 匹配所有以 gif,jpg或jpeg 结尾的请求
# 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
[ configuration E ]
}
```
```nginx
location /images/ {
# 字符匹配到 /images/，继续往下，会发现 ^~ 存在
[ configuration F ]
}
```
```nginx
location /images/abc {
# 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
# F与G的放置顺序是没有关系的
[ configuration G ]
}
```
```nginx
location ~ /images/abc/ {
# 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
[ configuration H ]
}
```
### 
### 再来分析一下A-H配置的执行顺序。

1. 下面2个配置同时存在时
```nginx
location = / {
[ configuration A ]
}

location / {
[ configuration B ]
}

#此时A生效，因为=/优先级高于/
```

2. 下面3个配置同时存在时:
```nginx
location  /documents/ {
[ configuration C ]
}

location ~ /documents/ {

[configuration CB]

}

location ~ /documents/abc {
[ configuration CC ]
}

#当访问的url为/documents/abc/1.html，此时CC生效，首先CB优先级高于C，而CC更优先于CB
```

3. 下面4个配置同时存在时
```nginx
location ^~ /images/ {
[ configuration D ]
}

location /images/ {
[ configuration F ]
}

location /images/abc {
[ configuration G ]
}

location ~ /images/abc/ {
[ configuration H ]
}

#当访问的链接为/images/abc/123.jpg时，此时D生效。虽然4个规则都能匹配到，但^~优先级是最高的。

#若^~不存在时，H优先，因为~/images/ > /images/

#而/images/和/images/abc同时存在时，/images/abc优先级更高，因为后者更加精准
```

4. 下面两个配置同时存在时
```nginx
location ~* \.(gif|jpg|jpeg)$ {
[ configuration E ]
}

location ~ /images/abc/ {

[ configuration H ]
}

#当访问的链接为/images/abc/123.jpg时，E生效。因为上面的规则更加精准。
```
