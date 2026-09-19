---
title: Tuple to Union
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type Every<L extends readonly unknown[]> = L[number]

const tupleNumber = [1, 2, 3, 4] as const
type TupleNumber = [1, 2, 3, 4]
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type s = Every<typeof tupleNumber> // 1 | 2 | 3 | 4
type s2 = Every<typeof tuple> // 'tesla' | 'model 3' | 'model X' | 'model Y'
type s3 = Every<TupleNumber> // 1 | 2 | 3 | 4
```
