---
title: 基于vite5、vue3、CDN实现lottie的配置和发布
date: 2023-12-17
tags:
  - lottie
categories:
	- 前端技术
---
# 基于vite5、vue3、CDN实现lottie的配置和发布

## 一、需求背景描述

**脚手架配置**
vite5、vue3

**lottie导出的静态资源目录,rocket文件夹是该动画资源所在目录的名称**

> .
> └── rocket
> ├── data.json
> └── images
> ├── img_0.png
> ├── img_1.png
> ├── img_2.png
> ├── img_3.png
> └── img_4.png

**lottie配置文件说明**
data.json文件定义了使用图片的相对路径

## 二、需求目标

1. 开发环境和线上环境仅需简单的配置即可完成
2. 如需更新动画，只需进行资源替换，无需修改代码
3. 线上资源支持CDN地址
4. 更新资源时CDN相关的地址可以简单的实现刷新

## 三、实现方案

### 3.1、静态资源目录使用 `public`目录

`vite`的 `public`目录的[文档链接](https://cn.vitejs.dev/guide/assets#the-public-directory)

- 在开发期间，`public` 目录下的文件会被提供为根路径（`/`）。例如，`public/my-image.png` 将可通过 `/my-image.png` 访问。
- 在构建时，`public` 目录下的文件将被复制到 `dist` 目录的根部。这意味着它们将在 `/`下可用。
- 你可以在你的源代码中通过绝对 `URL` 引用这些文件，因为它们将可用于同一公共基础路径。

**动画资源的实际目录结构如下**
**注意：**`**public**`在当前项目的根目录

> public/
> └── lottie
> └── rocket
> ├── data.json
> └── images
> ├── img_0.png
> ├── img_1.png
> ├── img_2.png
> ├── img_3.png
> └── img_4.png

### 3.2、Lottie动画的实现

```javascript
import lottie from 'lottie-web'
import animationData from '/public/lottie/rocket/data.json'
const animation = lottie.loadAnimation({
  container: rocketDom, // Rocket, // document.getElementById('lottie'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  animationData,
  assetsPath: `${import.meta.env.BASE_URL}lottie/rocket/images/`,
})

```

说明

- 在 `Lottie` 中，你可以使用两种方式来加载动画数据：通过 `**animationData**`属性直接传入 JSON 数据，或者通过 `**path**` 属性提供一个指向 JSON 文件的 URL。此处使用 `animationData`方式，只需要关注开发时的 `import`路径即可，上线构建时，`vite`会自动处理依赖资源
- 使用 `assetPath`指定 `Lottie`动画中使用到的图片资源地址
- 其中 `import.meta.env.BASE_URL`（[文档链接](https://cn.vitejs.dev/guide/env-and-mode#env-variables)）为 `vite`的配置信息， 代表的是部署应用时的基本 URL，由[base配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定。只需要在配置项中维护[线上环境、开发环境、测试环境]的地址即可，如线上环境使用CDN，修改线上环境配置中的 `base`参数即可

### 3.3、CDN缓存问题

lottie本身有完善的缓存机制，但如果为了极端情况下，可以更好的加载到最新资源，可以在vite脚本构建之前，将配置文件中的图片路径加上当前时间的时间戳，强制刷新文件缓存
实例如下

```javascript
// vite.config.js
import fs from 'fs';
import path from 'path';

export default {
  plugins: [
    {
      name: 'update-lottie-json',
      apply: 'build',
      buildStart() {
        const dataJsonPath = path.resolve(__dirname, 'public/lottie/rocket/data.json')
        const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'))

        // 获取当前时间戳
        const timestamp = Date.now()

        // 更新data.json中的图片路径
        data.assets.forEach(asset => {
          if (asset.p) {
            asset.p = `${asset.p.split('?')[0]}?v=${timestamp}`
          }
        })

        // 将更新后的数据写回到data.json文件
        fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2))
      }
    }
  ]
}
```
