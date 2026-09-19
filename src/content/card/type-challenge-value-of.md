---
title: ValueOf
description: 提取对象的值类型
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type ValueOf<T> = T[keyof T]
type RecordValueOf<T> = T extends Record<string, infer U> ? U : never
type PagePropertyValue = ValueOf<PageProperties>
```
