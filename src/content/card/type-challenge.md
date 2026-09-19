---
category: card
title: 类型体操
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript]
---

```typescript
type PK = keyof any // => string | number | symbol
// Equals to PropertyKey within @types/node
declare type PropertyKey = string | number | symbol
```

遍历数组：

```typescript
type Every<L extends readonly unknown[]> = L[number]

const tupleNumber = [1, 2, 3, 4] as const
type TupleNumber = [1, 2, 3, 4]
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type s = Every<typeof tupleNumber> // 1 | 2 | 3 | 4
type s2 = Every<typeof tuple> // 'tesla' | 'model 3' | 'model X' | 'model Y'
type s3 = Every<TupleNumber> // 1 | 2 | 3 | 4
```

First:

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

easyEqual:

[TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAogjgVwIYBsA8ANANFAmgPigF4oAKNAcX1IEpjCKoIAPYCAOwBMBnKDKAPxQAjFABcUAEx0WbLtwBQUMpWp0iDJqw488gkeKk0l+4ACcEEExIBmqbhADcChaEhQzokvGToA3lBIEgDkAILBUAC+OAFmEEicAPbsKCCBIeFRhAD02fRQdigOruDQZpLEsIioaLHxSSlpQVBhEdFQAc2tWVC5+YXFJe4wSNwgPjXYeIQkANpTuAC6WnK6s7g4GMtC5paGA04ubmUAzJUjYxP+6S2Z7XUJyak33ZE5eRpQu1bHHgAs51G42q1zij0aLzuMUhbXe+W+CiAA)

```typescript
type Equal<X, Y> = (<G>() => G extends X ? 1 : 2) extends
(<G>() => G extends Y ? 1 : 2)
  ? true
  : false

type r1 = Equal<{ a: 'A' }, { readonly a: 'A' }> // => false
type r2 = Equal<{ readonly a: 'A' }, { a: 'A' }> // => false

type EasyEqual<X, Y> = [X, Y] extends [Y, X] ? true : false

type r3 = EasyEqual<{ a: 'A' }, { readonly a: 'A' }> // => true
type r4 = EasyEqual<{ readonly a: 'A' }, { a: 'A' }> // => true
```

[Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

[Documentation - More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

[Documentation - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

提取类型

```typescript
type whichArray<T> = T extends Array<infer A> ? A : never
```

提取对象的值类型

```typescript
type ValueOf<T> = T[keyof T]
type RecordValueOf<T> = T extends Record<string, infer U> ? U : never
type PagePropertyValue = ValueOf<PageProperties>
```

覆盖原类型

```typescript
type Modify<T, R> = Omit<T, keyof R> & R
```

类型分发

```typescript
type OmitId<T> = T extends any ? Omit<T, 'id'> : never
```
