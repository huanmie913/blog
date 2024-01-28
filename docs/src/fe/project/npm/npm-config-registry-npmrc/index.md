---
title: npm config registry 优先级、npm镜像源、npmrc 
date: 2024-01-28
tags:
 - unocss
categories:
 - 前端技术
 - 工程化
---

# npm config registry 优先级、npm镜像源、npmrc

## 一、关于`npm config registry`

- `npm` 可以通过“**命令行**，**环境变量**、**npmrc**”文件设置或获取`registry`的配置信息
- `npm config` 命令可以更新并修改用户环境变量和全局环境变量
- `config`的配置项列表：[https://docs.npmjs.com/cli/v8/using-npm/config](https://docs.npmjs.com/cli/v8/using-npm/config)
## 二、`npmrc`
### 1.1、说明
`npmrc`文档官网地址：[https://docs.npmjs.com/cli/v8/configuring-npm/npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)
### 2.2、`.npmrc `配置方法
在项目的根目录下新建`.npmrc` 文件，在里面以`**key=value**`的格式进行配置。比如要把`npm`的源配置为私有源，可以参考一下代码：
```shell
registry=https://npm.xesv5.com/
```

## 三、`npm config`命令
### 3.1、常用命令
```shell
npm config set <key> <value> [-g|--global]  //给配置参数key设置值为value；
npm config get <key>          //获取配置参数key的值；
npm config delete <key>       //删除置参数key及其值；
npm config list [-l]      //显示npm的所有配置参数的信息；
npm config edit     //编辑配置文件
npm get <key>     //获取配置参数key的值；
npm set <key> <value> [-g|--global]    //给配置参数key设置值为value；
```
### 3.2、常用NPM镜像源
```shell

# 默认源
# 设置为全局默认
npm config set registry https://npmmirror.com/
# 使用nrm增加镜像源
nrm add taobao https://npmmirror.com/

# npmjs
# 设置为全局默认
npm config set registry https://registry.npmjs.org/
# 使用nrm增加镜像源
nrm add npmjs https://registry.npmjs.org/

# 淘宝
# 设置为全局默认
npm config set registry https://registry.npmmirror.com/
# 使用nrm增加镜像源
nrm add taobao https://registry.npmmirror.com/

# 腾讯云
# 设置为全局默认
npm config set registry https://mirrors.cloud.tencent.com/npm/
# 使用nrm增加镜像源
nrm add tencent https://mirrors.cloud.tencent.com/npm/

# 华为云 
# 设置为全局默认
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
# 使用nrm增加镜像源
nrm add huawei https://mirrors.huaweicloud.com/repository/npm/

# yarn 
# 设置为全局默认
npm config set registry https://registry.yarnpkg.com/
# 使用nrm增加镜像源
nrm add yarn https://registry.yarnpkg.com/

```

## 四、`npm config registry`的配置信息及优先级（由高到低）
### 4.1、优先级

1. 命令行
例如：`npm config set registry https://npm.xesv5.com/`
npm Config文档官网地址：[https://docs.npmjs.com/cli/v8/using-npm/config](https://docs.npmjs.com/cli/v8/using-npm/config)
2. 环境变量
以 `npm_config_ `为前缀的环境变量会被识别为 npm 的配置属性。
` npm_config_proxy=https://npm.xesv5.com `
3. `.npmrc`文件
注意：如使用 [nrm](https://www.npmjs.com/package/nrm) 作为多源切换的命令工具，此项配置【（项目/工程）根目录下的`.npmrc` 文件】会导致`nrm`失效。原因：`nrm` 的命令修改的是 用户目录的 `.npmrc` 配置文件，优先级低于 项目工程目录的配置文件

`.npmrc`  文件执行优先级如下（逐次降低）
   1. 项目/工程的 `.npmrc` 文件
   2. 用户目录默认的配置文件 `$HOME/.npmrc`
`CLI option` ： `-- userconfig ` 
环境变量 `$NPM_CONFIG_USERCONFIG`
   3. 全局配置文件
默认值为`：$PREFIX/etc/npmrc`
`CLI option` ： `-- globalconfig ` 
环境变量 `$NPM_CONFIG_GLOBALCONFIG`
   4. `NPM` 内置的 `.npmrc` 文件
存在于 npm 包的内置` .npmrc` 文件`/path/to/npm/.npmrc`。
4. `npm` 的默认配置
可使用命令 `npm config ls -l` 查看一系列的默认配置的内置参数 
### 4.2、备注：发包时指定registry地址publishConfig
[https://docs.npmjs.com/cli/v8/configuring-npm/package-json#publishconfig](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#publishconfig)
## 五、参考资料
> - NPM Config的文档：[https://docs.npmjs.com/cli/v8/using-npm/config](https://docs.npmjs.com/cli/v8/using-npm/config)
> - npmrc: [https://docs.npmjs.com/cli/v8/configuring-npm/npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)
> - NPM package.json : [https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files)


