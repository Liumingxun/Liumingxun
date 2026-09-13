---
title: 使用 curl & wget 下载文件
category: card
type: cheatsheet
createAt: 2025-09-22T10:49:00
---

- `wget -qO- https://deno.land/x/install/install.sh | sh`
- `curl -fsSL https://deno.land/x/install/install.sh | sh`
- `curl -OL https://go.dev/dl/go1.23.0.linux-amd64.tar.gz`

**curl 常用选项**

| 选项        | 描述                        |
| ----------- | --------------------------- |
| -L          | 跟随重定向 <br>             |
| -k          | 允许不安全连接              |
| -b <cookie> | 添加cookie                  |
| -d <data>   | 添加POST数据                |
| -x ''       | 设置代理，'' 留空则取消代理 |
| -v          | verbose                     |
| -O          | 按照远程文件名存储          |
| -o          | 指定文件存储                |
