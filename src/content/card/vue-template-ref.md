---
type: tip
createAt: 2026-06-13T16:24:00
title: vue 模板引用
tags: [vue, typescript]
---

`v-for` 中的元素上的 `ref` 在 script 中获取到的类型标注应该是 tuple：`[InstanceType<typeof ExposeOfComponent>]`

```typescript
const basicInfoRef = ref<[InstanceType<typeof BasicInfo>] | null>(null)


const tabData = computed(() => ([
  basicInfoRef.value?.[0].basicModel,
] as [
    basicInfoRefBasicModel: Record<string, string>,
]))
```

```xml
<ATabPane v-for="tab in tabs" :key="tab" :tab="tab">
  <BasicInfo v-if="tab === '基本信息'" ref="basicInfoxRef" :readonly="false" />
</ATabPane>

```
