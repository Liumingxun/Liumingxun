---
category: card
title: 找到依赖中某个具体文件的绝对路径
createAt: 2026-09-06T21:36:11+08:00
type: cheatsheet
---

```typescript
import { fileURLToPath } from 'node:url'

const absloutePath = fileURLToPath(import.meta.resolve('@notionhq/client/build/src/api-endpoints.d.ts'))
```
