---
title: VOLTA之node、npm、pnpm版本管理
date: 2024-03-13
tags:
 - 版本
 - node
 - pnpm
categories:
 - 工程化
 - 前端
---
# VOLTA之node、npm、pnpm版本管理

## 一、简介

Volta 是一个 `JavaScript` 工具链版本管理器，它能够让开发者轻松切换 `Node.js` 和 `npm` 包的版本，确保项目间的依赖一致性，支持多个包管理器（目前支持 `npm`、`pnpm`、`yarn`）以及为协作者提供可复制的环境。
`Volta` 安装速度快、易用，能够**自动探测和使用项目指定的工具版本**，从而简化了多个项目间的版本管理。

- 官网地址：[Volta Official Website](https://volta.sh/)
- 官网文档地址：[Volta Official Documentation](https://volta.sh/)

## 二、用途

1. 版本管理：`Volta` 允许在项目之间切换不同版本的 `Node.js` 和 `npm`，而不需要重新配置环境。
2. 工具安装：它可以帮助安装、配置和管理 `JavaScript` 工具和包，确保你的项目中使用的工具版本是一致的。
3. 自动化：`Volta` 可以自动检测项目所需的工具版本，并确保使用正确的版本运行这些工具。

## 三、优势

1. 用户友好：`Volta` 的用户界面简单直观，易于上手。
2. 性能：`Volta` 旨在尽可能地减少运行工具时的开销，提供更快的启动时间和更高效的性能。
3. 一致性：通过锁定项目所需的工具版本，`Volta` 确保了在不同环境中的一致性，有助于减少“在我的机器上可以运行”的问题。
4. 跨平台：`Volta` 支持多个平台，包括 `Windows`、`macOS` 和 `Linux`。

## 四、同类型工具对比

1. `nvm`  (**`Node Version Manager`**)：
   `nvm` 也是一个流行的 `Node` 版本管理器，允许你在不同的项目中切换 `Node` 版本。
   与 `Volta` 相比，`nvm` 在使用时需要运行特定的命令来切换版本，而 `Volta` 则可以自动检测和切换。
2. `n` (**`Node Version Manager`**)：`n` 是另一个 `Node` 版本管理工具，它通过简单的命令行界面来管理不同的 `Node` 版本。相比之下，`Volta` 提供了自动版本控制和更细粒度的工具管理功能。
3. `asdf`：`asdf` 是一个多语言版本管理器，支持 `Node.js` 以及其他许多语言和工具。`Volta` 专注于 `JavaScript` 生态，而 `asdf` 提供了更广泛的语言支持。

## 五、安装方法

- 对于 ` Mac / Linux`（包括 `WSL`）用户，可以使用以下命令安装：
  `curl https://get.volta.sh | bash`
- 对于 `Windows` 用户，需要下载Volta安装包并按照提示进行安装。

## 六、管理工具链.概述

`Volta` 的工具链管理功能允许你维护项目所需的所有工具及其版本。当你在项目中运行 `volta pin` 命令时，`Volta` 会将工具的版本记录到 `package.json` 中，这样任何使用该项目的人都会使用相同的工具链。
你可以通过以下步骤管理工具链：

1. **全局安装工具**：使用 `volta install 工具名` 全局安装工具。
2. **项目固定工具版本**：在项目目录中使用 `volta pin 工具名` 固定工具版本。
3. **查看工具链**：使用 `volta list` 查看当前环境中的工具链。
4. **自动使用正确的工具版本**：只要 `package.json` 中有 `volta` 字段，每当你在项目中运行工具时，Volta 会自动使用正确的版本。

## 七、管理工具链.方法.详解

### 7.1、切换 Node 版本

要切换 Node 版本，你可以使用以下命令：

```bash
volta install node@版本号
```

这将全局安装并使用指定的 Node 版本。

### 7.2、为项目指定Node版本

可以在项目目录中使用，这会在你的项目中创建或更新一个 `package.json` 文件，其中包含了 `volta` 字段，指定了项目应使用的 `Node` 版本。

```bash
volta pin node@版本号
```

### 7.3、切换 `pnpm` 或其他工具的版本

对于 `pnpm` 或其他 `JavaScript` 工具，切换版本的过程类似：

```bash
volta install pnpm@版本号
```

这将全局安装指定版本的 `pnpm`。如果你想为项目固定 `pnpm` 的版本，可以使用：

```bash
volta pin pnpm@版本号
```

这同样会更新项目的 `package.json` 文件，以保证项目使用指定版本的 `pnpm`。

### 7.4、版本管理

`Volta` 允许你管理多个不同版本的工具，你可以轻松地安装、切换和使用不同版本的 `Node.js`、`npm`、`Yarn`、`pnpm` 等工具。通过 `volta list` 命令，你可以查看当前安装的工具及其版本：

```bash
volta list
```

### 7.5、使用 `volta run` 命令

`volta run` 命令允许你在指定版本的工具下运行一次性命令，而不需要更改全局或项目级的设置。这对于测试代码在不同版本下的行为非常有用。例如：

```bash
volta run --node 12 node script.js
```

上述命令会在 `Node.js` 版本 `12` 的环境中运行 `script.js` 文件。
此命令会在[***运行时***]更改 `node`版本，如需要在一个脚本中启动多个项目，且不同项目依赖的 `node`版本不一样，在项目启动时，可以使用此命令
