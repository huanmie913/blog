---
title: Chrome允许手动设置Cookie的方法
date: 2024-03-16
tags:
	- chrome
  - cookie
categories:
	- 工程化
---
# Chrome允许手动设置Cookie的方法

### 背景
chorme浏览器版本高于91不支持手动设置cookie，手动增加cookie不会保留，会报红

### 解决办法

- 上Chrome中访问地址`chrome://flags/`
- 查找配置项：`Partitioned cookies`将设置项改为`Enabled`即可
- 重启浏览器
