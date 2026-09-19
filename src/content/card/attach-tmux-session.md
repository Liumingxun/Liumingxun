---
type: cheatsheet
createAt: 2025-12-15T14:10:00
title: 回连或新建 Tmux 会话
tags: [tmux, shell]
---

```shell
# 自动启动 tmux
if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [ -z "$TMUX" ]; then
    # 如果已有会话，则附加；否则创建新会话
    exec tmux new-session -A -s main
fi
```

```shell
wsl.exe --distribution-id {531d9010-c5cd-4cbe-8c8f-8119d4a64f5d} -- exec tmux new-session -A -s main
```
