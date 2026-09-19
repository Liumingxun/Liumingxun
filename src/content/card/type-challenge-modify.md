---
title: Modify
description: 用新类型覆盖原类型
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type Modify<T, R> = Omit<T, keyof R> & R
```
