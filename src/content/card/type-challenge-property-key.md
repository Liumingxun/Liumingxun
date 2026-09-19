---
category: card
title: PropertyKey
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type PK = keyof any // => string | number | symbol
// Equals to PropertyKey within @types/node
declare type PropertyKey = string | number | symbol
```
