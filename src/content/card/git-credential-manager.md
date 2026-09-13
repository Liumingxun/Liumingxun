---
title: 配置 git credential manager
type: cheatsheet
createAt: 2026-06-02T10:54:00
category: card
---

类比一下应该是 ssh-agent

可以使用 scoop 安装

总之 https://github.com/git-ecosystem/git-credential-manager/blob/main/docs/wsl.md

```shell
git config --global credential.helper "/mnt/c/Program\ Files/Git\ Credential\ Manager/git-credential-manager.exe"
```

虽然文档没提 但是 git credential-manager configure
