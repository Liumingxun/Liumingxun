---
title: Array Element
description: 提取数组的元素类型
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type whichArray<T> = T extends Array<infer A> ? A : never
```
