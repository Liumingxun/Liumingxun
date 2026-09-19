---
title: nginx 755
type: tip
createAt: 2026-03-11T17:25:00
tags: [nginx, linux]
---

```nginx
server {
    listen 8801;
    server_name localhost;
    root /usr/local/nginx/html;
    index index.html;
}
```

目录需要 755
