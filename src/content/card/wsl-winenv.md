---
type: tip
createAt: 2026-07-29T18:00:00
title: WSL 访问 Windows 环境变量
tags: [wsl, shell]
---

```shell
# Source - https://superuser.com/a/1340707
# Posted by dualed, modified by community. See post 'Timeline' for change history
# Retrieved 2026-07-29, License - CC BY-SA 4.0

#!/bin/bash
# 'winenv'
cmd.exe /C "echo %$*%" 2>/dev/null | tr -d '\r'

```

```shell
# Source - https://superuser.com/a/1340707
# Posted by dualed, modified by community. See post 'Timeline' for change history
# Retrieved 2026-07-29, License - CC BY-SA 4.0
# Usage

WINHOME=$(wslpath "$(winenv USERPROFILE)")

```

---

```shell
[limx@archwsl ~]$ pwsh.exe -nop -c '$env:USERPROFILE'
C:\Users\Lime
[limx@archwsl ~]$ powershell.exe '$env:USERPROFILE'
C:\Users\Lime
```
