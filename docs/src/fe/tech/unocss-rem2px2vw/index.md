---
title: 使用unocss时，老项目迁移适配方法rem2px2vw
date: 2023-12-17
tags:
  - unocss
  - postcss
  - 兼容
categories:
	- 前端技术
---
# 使用unocss时，老项目迁移适配方法rem2px2vw


## 一、需求描述

新项目设计图使用的适配比例是1280px
老项目设计图使用的适配比例是1024px

## 二、需求目标

1. 迁移老项目到新项目中，使用 `unocss`，在老项目中，可以便捷的使用 `unocss`的各种属性或 `class`
2. `unocss`可以自动处理比例问题，开发人员无需关注转换规则，只需要按原设计使用unocss即可
3. 构建后的 `css`使用 `vw`方案适配

## 三、实现方案

### 3.1、老项目迁移到新项目适配问题解决方法

1. 在老项目中使用到具体数值的时候，不使用别名，且使用特定前缀前缀。例如：`text-base`改为 `oldflag-text-16px`,其中 `oldfalg`为老项目特有标识，`base`是 `16px`的别名
2. 使用 `unocss`**快捷方式**的**动态解析**特性，[官网文档链接](https://alfred-skyblue.github.io/unocss-docs-cn/guide/presets)

例如

```javascript
// uno.config.js
shortcuts: [
  // 新项目使用到的快捷键健，此处可忽略
  {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md'
  },
  // 兼容老项目的动态解析快捷键
  [/^oldflag-(.+)-(.+)px$/, (match => `bg-${match[1}-(${match[2]} * 1280 / 1024)px`]
]
```

### 3.2、构建结果使用vw的方法

**方案如下**
`rem->px->vw`

- `unocss`官网提供了 `rem2px`的方法，[官网文档](https://unocss.dev/presets/rem-to-px)
- 使用 `postcss`的插件 `postcss-px-to-viewport-8-plugin`完成 `px2vw`

`**postcss-px-to-viewport-8-plugin**`

- [NPM地址](https://www.npmjs.com/package/postcss-px-to-viewport-8-plugin)
- [Github地址](https://github.com/lkxian888/postcss-px-to-viewport-8-plugin)

注意：
`**postcss-px-to-viewport-8-plugin**`的 `viewportWidth`支持使用js函数，如官网文档所示

```javascript
çimport { defineConfig } from 'vite';
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: file => {
            let num = 1920;
            if (file.indexOf('m_') !== -1) {
              num = 375;
            }
            return num;
          },
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules\/ant-design-vue/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1024, // 横屏时使用的视口宽度
        }),
      ],
    },
  },
});
```

当 `viewportWidth`使用函数是，参数 `file`仅处理和 `css`相关的文件，即

1. 纯 `css`文件
2. 含有 `style`标签样式设置的vue文件

### 3.3、如需固定最大宽度，兼容PC&移动端的方法

推荐另外一款 `PostCSS` 插件，将固定尺寸的移动端视图转为具有最大宽度的可伸缩的移动端视图

- [NPM地址](https://github.com/wswmsword/postcss-mobile-forever)
- [Github地址](https://github.com/wswmsword/postcss-mobile-forever)
