---
type: cheatsheet
createAt: 2025-12-19T09:39:00
category: card
title: xargs curl 并发请求
tags: [curl, shell]
---

```shell
# 显示每个请求的HTTP状态码
seq 1 100 | xargs -I {} -P 10 curl -s -o /dev/null -w "Request {}: %{http_code}\n" "http://example.com"
```
