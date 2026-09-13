---
category: card
title: WSL 脱机安装
createAt: 2025-08-26T19:04:00
type: cheatsheet
---

若要脱机安装 WSL，需要执行以下步骤：

- 从 [GitHub 发布页](https://github.com/microsoft/wsl/releases)下载并安装最新的 WSL MSI 包
- **使用管理员权限打开 PowerShell 窗口，并运行 **`**dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart**`** 以启用虚拟机平台可选组件。 可能需要重新启动计算机才能生效。**
- 通过 .wsl 文件安装分发版。 可以在所选发行版的 [DistributionInfo.json](https://github.com/microsoft/WSL/blob/master/distributions/DistributionInfo.json) 中找到用于下载这些文件的 URL。
- 可以[直接从 tar 导入](https://learn.microsoft.com/zh-cn/windows/wsl/use-custom-distro)，例如使用 [Alpine Mini Root Filesystem](https://alpinelinux.org/downloads/)

[https://learn.microsoft.com/zh-cn/windows/wsl/use-custom-distro](https://learn.microsoft.com/zh-cn/windows/wsl/use-custom-distro)
