# 基于vitepress的blog
主页：https://gengxiaofei.com  
github: https://github.com/huanmie913/blog  

### 评论插件：
描述：基于github的giscus应用及仓库的discussions实现  
官网：https://giscus.app/zh-CN  
插件：https://github.com/giscus/giscus-component  

### 搜索引擎.爬虫提交
vitepress的sitemap设置：https://vitepress.dev/guide/sitemap-generation  
必应：https://www.bing.com/webmasters/about  
百度：https://ziyuan.baidu.com/dashboard/  
google: https://search.google.com/search-console/  

### 搜索插件
描述：algolia  
官网：https://algolia.com  
DocSearch申请：https://docsearch.algolia.com/apply/  
dashboard：https://dashboard.algolia.com/  
爬虫设置：https://crawler.algolia.com/  

### 百度统计
观察网站的访问数据，录入：pv、uv、访问路由等  
百度统计：https://tongji.baidu.com/  
统计代码植入方法：https://vitepress.dev/reference/site-config#example-using-google-analytics注意： 
- 使用百度统计需手动开启“单页应用该设置”
- 百度统计帮助文档：https://tongji.baidu.com/web/help/article?id=324&type=0


### vscode中Markdown相关插件  
#### **download-image-in-markdown**
自动下载markdown中的图片，将http(s)的绝对路径转成本地相对路径  
vscode插件：https://marketplace.visualstudio.com/items?itemName=andygee.download-image-in-markdown  

#### Markdown Preview Enhanced  
一款为 Visual Studio Code 编辑器编写的超级强大的 Markdown 插件  
vscode插件：https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced  
github：https://github.com/shd101wyy/vscode-markdown-preview-enhanced  

#### Office Viewer(Markdown Editor)  
集成Vditor, 实现了对markdown的所见即所得编辑  
vscode插件：https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-office  
github：https://github.com/cweijan/vscode-office/blob/HEAD/README-CN.md  

### 文档编写注意事项
#### md文件的yaml头部模板
```
title: 我是标题 
date: 2023-11-11
tags:
	- tag1 
  - tag2 
categories:
  - category1 
  - category2
```
注意事项：
1. “缩进” 仅支持空格，缩进对齐为同一维数组
1. ":" 后需要有一个空格
