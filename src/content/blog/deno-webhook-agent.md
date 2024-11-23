---
title: 使用 Deno 创建一个 Webhook 代理
description: Strapi 的 webhook 并不支持自定义 payload，不能按照预期触发在 Coding 设置的构建计划，所以使用 Deno 设置一个代理来正确触发。
tags: [deno, webhook, script]
---

# 使用 Deno 创建一个 Webhook 代理

Strapi 的 webhook 并不支持自定义 payload，不能按照预期触发在 Coding
设置的构建计划，所以使用 Deno 设置一个代理来正确触发。

## Webhook

> Webhook
> 允许订阅软件系统中发生的事件，并在发生这些事件时自动接收传送到服务器的数据。

在 Wikipedia 中，Webhook
被描述成`用户定义的 HTTP 回调（Webhooks are "user-defined HTTP callbacks"）`，简单来说，Webhook
可以通过提前配置一个 URL 并在指定事件发生时调用该 URL，这样 URL
的目标服务器收到某事件的通知可以进行后续的处理。

Webhook 可以用于各种应用场景，包括：

- 在外部 CI 服务器上触发 CI（持续集成）
- 向协作平台发送通知：钉钉机器人，微信公众号等
- 部署到生产服务器
- ……

## 配置 Webhook

在 Strapi 管理后台中，设置的 Webhooks
由创建、修改、发布记录（Entry）等操作触发。触发粒度比较粗，不能根据某个集合设定，所属集合、记录内容以及触发事件通过
Payload 携带，且不能自定义 Payload，但是可以自定义 Header。

所以最终的触发流程应该是：`Strapi -> Webhooks Agent -> Coding CI`

### 在 Coding 获取触发 URL 和 token

要获取触发 CI 的 URL，可以在 Coding 项目中**持续集成 > 构建计划 > 触发规则 > API
触发**很容易获取到，通常还需要配合一个 token，可以点击图中标记的按钮生成一段附加
token 的 curl 命令，token 也可以在**开发者选项**中自行配置。

在 Coding 中生成好 token 后，将 token 和 URL 先记下来，我们稍后就会用到。

### 使用 Deno 写一个代理服务

在 Coding 中取到的 URL
类似这样：`https://<your_team>.coding.net/api/cci/job/<job_id>/trigger`，token
是一组 username 和 password。

使用`Deno.serve()` 可以很容易的启动一个 HTTP
服务器，我们只需要监听一个端点（endpoint），所以最简单的 serve 代码是这样的：

```typescript
Deno.serve(_req => new Response('Hello, world'))
```

当服务器收到 Strapi Webhook 触发的请求时，我们再向 Coding
发送请求，这里的请求就可以自定义携带的 Payload 了。在调用 Coding 持续集成 API
时所使用的认证方式为`Basic Auth`，需要携带上方获取到的 token，在 `curl` 中以
`-u login:password` 选项的形式携带，`curl` 会自动通过 base64 编码转换
`login:password` 并添加到 `Authorization: Basic [token]` 请求头中。Strapi
Webhook 可以配置 Header，所以我这里把 token 交给 strapi 管理，通过 Header
传递给代理服务器，然后在代理服务器中通过 `req.headers` 来获取 token。

虽然这里标头使用了"X-"前缀，但是实际上 HTTP
规范建议避免使用"X-"前缀，可以查看[这篇讨论](https://stackoverflow.com/questions/3561381/custom-http-headers-naming-conventions 'Custom HTTP headers : naming conventions')。

现在，URL 和 token 都已经有了，在 Deno 中，我们可以不借助第三方库直接使用 fetch
发送 HTTP 请求。

```typescript
Deno.serve({
  port: 6336,
  hostname: 'localhost',
}, async (req) => {
  const uname = req.headers.get('X-Coding-Uname')
  const token = req.headers.get('X-Coding-Token')

  const coding_res = await fetch(
    'https://yourteam.coding.net/api/cci/job/jobid/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${uname}:${token}`)}`,
      },
      body: JSON.stringify({
        ref: 'master',
      }),
    },
  ).then(res => res.json())

  return new Response(JSON.stringify(coding_res))
})
```

但是正如上文所说，Strapi Webhook 触发粒度有点粗，所属集合、记录内容是通过
Payload 携带的，所以我们可以通过 `req.json()`
读取请求体以获取更多信息。例如，我只想在更新 `post` 集合时触发 Coding
CI，其他情况下不做操作，可以这样做：

```typescript
Deno.serve({
  port: 6336,
  hostname: 'localhost',
}, async (req) => {
  const uname = req.headers.get('X-Coding-Uname')
  const token = req.headers.get('X-Coding-Token')

  const body: EventPayload = await req.json()

  if (body.model !== 'post')
    return new Response()

  const coding_res = await fetch(
    'https://yourteam.coding.net/api/cci/job/jobid/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${uname}:${token}`)}`,
      },
      body: JSON.stringify({
        ref: 'master',
      }),
    },
  ).then(res => res.json())

  return new Response(JSON.stringify(coding_res))
})
```

至此，我们已经实现了我们最开始的需求，接收来自 Strapi 的请求，经过处理后向
Coding 发送请求，最后触发 CI 流程。

### 记录日志

最后，如果你希望的话，我们可以添加一个
[Logger](https://deno.land/x/logger@v1.1.5 'deno-logger') 库用来记录日志。在
Deno 中导入第三方库需要到 [deno.land](https://deno.land/x)
获取他的包链接，随后在代码中引入；如果引用第三方库很多需要集中管理版本等，可以采用
[import maps](https://docs.deno.com/runtime/manual/basics/import_maps 'Import Maps')
这种形式。

```typescript
import { Logger } from 'https://deno.land/x/logger@v1.1.5/mod.ts'
```

安装文档说明，我们可以简单地配置一个滚动文件日志：

```typescript
import { Logger } from 'https://deno.land/x/logger@v1.1.5/mod.ts'

interface EventPayload {
  event: string
  createdAt: string
  model?: string
  entry?: Record<string, unknown>
}

const logger = new Logger()

await logger.initFileLogger('./trigger-log', {
  rotate: true,
  maxBytes: 1024 * 10,
})
// logger.disableConsole()

Deno.serve({
  port: 6336,
  hostname: 'localhost',
}, async (req) => {
  const uname = req.headers.get('X-Coding-Uname')
  const token = req.headers.get('X-Coding-Token')

  const body: EventPayload = await req.json()

  logger.info(body)
  if (body.model !== 'post')
    return new Response()

  const coding_res = await fetch(
    'https://yourteam.coding.net/api/cci/job/jobid/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${uname}:${token}`)}`,
      },
      body: JSON.stringify({
        ref: 'master',
      }),
    },
  ).then(res => res.json())

  logger.info(coding_res)

  return new Response(JSON.stringify(coding_res))
})
```

## Final

这次我们通过 Deno 启动一个 HTTP 服务器，接收 Strapi 的 Webhook
事件，并灵活处理后重新发送给 Coding。Deno
的标准库给的非常丰富，某些逻辑简单的小脚本可以试着使用 Deno 写一写。嗯，就这样！
