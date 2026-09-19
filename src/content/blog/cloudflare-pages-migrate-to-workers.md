---
tags:
  - 迁移
  - Astro
  - Wrangler
  - Cloudflare
createAt: 2025-08-10T20:16:00
updateAt: 2025-09-12T16:54:00
title: 从 Cloudflare Pages 迁移到 Workers
description: ss
---

## 暴论

我总是觉得应用的依赖版本应该尽量保持最新，也有不少更新依赖版本的工具，但我都没亲自配置过（可能这就是懒吧，不过依然不影响我觉得应该尽量保持依赖版本的及时更新。

## 迁移！

这一次是更新 Astro 的静态资源部署服务，之前是使用 Cloudflare Pages，最终将其迁移到 Cloudflare Workers，涉及到的依赖有 `wrangler`、 Github Action。

这个项目使用了 pnpm 管理依赖，所以我使用 `pnpm upgrade -i` 获取了可升级的依赖，依赖和开发依赖都有不少可以更新的，可能出问题的、值得关注的依赖大概就是 `astro` 和 `wrangler` 。

升级 Astro 的话使用了官方的命令 `pnpm dlx @astrojs/upgrade` ，升级后运行一下，没有问题。

```diff
- "@astrojs/rss": "^4.0.11",
- "@astrojs/sitemap": "^3.2.1",
- "@astrojs/solid-js": "^5.0.5",
- "astro": "^5.5.2",
+ "@astrojs/rss": "^4.0.12",
+ "@astrojs/sitemap": "^3.4.2",
+ "@astrojs/solid-js": "^5.1.0",
+ "astro": "^5.12.9",
```

接下来就是 wrangler，升级完后被提示有 `4.*` 的版本，激动的心颤抖的手，忍不住想要升级了，不过冷静了一下，去翻了一下[迁移指南](https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/)，总的来说完全不影响我，多虑了，那么顺势将其升到 `4.*`。

```diff
- wrangler 3.89.0
+ wrangler 4.28.1
```

随后就是检查一下 wrangler 配置文件 `wrangler.toml` ，继续翻了一下[配置文档](https://developers.cloudflare.com/workers/wrangler/configuration/)，发现配置文件的文件类型也有点改动:

> As of Wrangler v3.91.0 Wrangler supports both JSON (`wrangler.json` or `wrangler.jsonc`) and TOML (`wrangler.toml`) for its configuration file. Prior to that version, only `wrangler.toml` was supported.
> Cloudflare recommends using `wrangler.jsonc` for new projects.

也就是说我应该将其替换为 json，通过转换工具将 toml 转成 json 后测试一下也没有问题。然后看了下 Cloudflare Pages 的项目管理页面，又双叒叕收到了迁移提示：

> [**Cloudflare Workers**](https://developers.cloudflare.com/workers/static-assets/) now supports nearly all of Pages' features — plus extra tools and integrations not found in Pages.
> Check out our [migration guide](https://developers.cloudflare.com/workers/static-assets/migrate-from-pages/) and [compatibility matrix](https://developers.cloudflare.com/workers/static-assets/migrate-from-pages/#compatibility-matrix) to learn how to move to Workers today.

看到这种迁移提示完全走不动，二话不说就准备将 Pages 迁移到 Workers ，大概是因为我的使用场景非常简单，实际上迁移起来非常流畅，一步一步按照文档做就好了。也是迁移升级过后本地跑了一下没有问题，直接一个 PR 就准备合到主分支上了。此时已经幻想着大功告成了，事实证明我忘记了一个事情，也就是前文提到的另一个依赖 Github Action，合并了之后运行了一个 workflow 我才想起还有这么一回事。随即升级 Action……

Astro 使用的是 static 模式，部署起来很简单，将 build 后得到的 dist 使用 wrangler 上传到 Cloudflare 即可，steps 大概是这样：

```yaml
steps:
  - uses: actions/checkout@v4.1.7
    with:
      fetch-depth: 0
      ref: ${{ github.ref }}
  - uses: actions/setup-node@v4
    with:
      node-version: 22.x
  - name: Setup pnpm
    uses: pnpm/action-setup@v4.0.0
    with:
      run_install: true
  - run: pnpm build
  - name: Deploy
    uses: cloudflare/wrangler-action@v3.7.0
    with:
      apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      command: pages deploy
```

需要搭配之前的 `wrangler.toml` ：

```toml
name = "project-name"
compatibility_date = "2024-11-11"
pages_build_output_dir = "dist"

[vars]
PNPM_VERSION = "10.6.5"
NODE_VERSION = "22.14.0"
```

不过因为我迁移到 Workers 后不再使用 `pages_build_output_dir` 这个配置项，所以我的 action 报错了：

```plain text
Must specify a directory of assets to deploy. Please specify the [<directory>] argument in the `pages deploy` command, or configure `pages_build_output_dir` in your wrangler.json file.
```

而我迁移到 Workers 后的配置文件 `wrangler.json` （基本跟着迁移指南做的）：

```json
{
  "name": "limx-site",
  "compatibility_date": "2025-08-07",
  "placement": {
    "mode": "smart"
  },
  "assets": {
    "directory": "dist",
    "not_found_handling": "404-page"
  },
  "vars": {
    "PNPM_VERSION": "10.14.0",
    "NODE_VERSION": "22.14.0"
  }
}
```

回头又翻了一遍[迁移指南的命令部分](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#wrangler-commands)发现貌似部署的命令不再使用 `pages` 子命令而是 `wrangler deploy --assets=dist`，所以更新一下最后的 step 后，这个 Action 就成功了：

```yaml
- name: Deploy
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: deploy --assets=dist
```

## 撒花

啊，到这里就结束了，整体来说还是蛮流畅的，想想这里还有什么需要注意的呢🤔

应该是没什么了。那就这样
