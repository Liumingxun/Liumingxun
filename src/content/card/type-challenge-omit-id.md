---
category: card
title: OmitId
description: 借助条件类型分发，去掉联合类型中每个成员的 id
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type OmitId<T> = T extends any ? Omit<T, 'id'> : never
```
