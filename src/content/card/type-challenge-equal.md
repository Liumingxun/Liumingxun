---
category: card
title: Equal
createAt: 2026-09-06T21:36:32+08:00
type: cheatsheet
tags: [typescript, 类型体操]
---

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
