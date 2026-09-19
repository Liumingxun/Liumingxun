---
title: Array[0]
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

```typescript
type First<T extends any[]> = T extends [] ? never : T[0]

type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never

type First<T extends any[]> = T[number] extends never ? never : T[0]

type First<T extends any[]> = '0' extends keyof T ? T[0] : never
```

> why doesn't this work
>
> ```plain text
> T extends readonly Array<unknown>
> ```
>
> but this works
>
> ```plain text
> T extends readonly unknown[]
> ```
>
> this also works
>
> ```plain text
> T extends Readonly<Array<unknown>>
> ```
>
> Are they not all the same thing?
>
> > `readonly` type modifier is only permitted on array and tuple literal types.
> > `readonly` 类型修饰符仅允许用于 array 或 tuple 字面量类型。

`unknown[]` 是一个具体的字面量类型可以使用 `readonly` 修饰，`Array<>` 表示使用 Array 构造函数构造的数组类型。
