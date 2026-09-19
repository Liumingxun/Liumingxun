---
title: git 配置 ssh 代理
type: issue
createAt: 2025-03-25T10:00:00
tags: [git, network]
---

[https://www.seepine.com/git/ssh-proxy/](https://www.seepine.com/git/ssh-proxy/)

**本地防火墙或 ISP 限制**

- 本地 `ufw`、`iptables`、或者你的 ISP/网络环境直接屏蔽了 22。
- 可以先测试下：

```bash
nc -vz github.com 22
nc -vz ssh.github.com 443
```

👉 解决方法：修改 SSH 配置

编辑 `~/.ssh/config`，加上：

```plain text
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
```

然后再试 `ssh -T git@github.com`。
