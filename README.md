# taro-react-router

本项目用于检验 Taro 项目使用 `react-router` 开发多路由页面。

## 如何开发

### Taro 仓库

1. 克隆 Taro 仓库: `git clone https://github.com/AdvancedCat/taro.git` ；

2. 安装依赖 `pnpm i`；

3. 切换至 `feat/history` 分支；

4. 编译包 `pnpm build`；

5. 将 `@tarojs/runtime` `@tarojs/mini-runner` 链接到全局

```bash
$ cd packages/taro-runtime
$ pnpm link --global
$ cd packages/taro-mini-runner
$ pnpm link --global
```


### 本仓库

1. 克隆本仓库：`git clone https://github.com/AdvancedCat/taro-react-router.git`；

2. 安装依赖：`pnpm i`；

3. 链接包 `@tarojs/runtime` `@tarojs/mini-runner`；

```bash
$ pnpm link --global @tarojs/runtime
$ pnpm link --global @tarojs/mini-runner
```

4. 运行 `npm run dev:weapp`，在微信开发者工具中即可预览效果；
