---
type: tip
createAt: 2026-06-13T16:24:00
category: card
title: vue 模板引用
---

v-for 中的元素上的 ref 在 script 中获取到的 ref 是 type 标注应该是 tuple `[Instance]`

```typescript
const basicInfoxRef = ref<[InstanceType<typeof BasicInfo>] | null>(null)
const bankAcctInfoRef = ref<[InstanceType<typeof BankAcctInfo>] | null>(null)
const legalInfoRef = ref<[InstanceType<typeof LegalInfo>] | null>(null)
const controllerInfoRef = ref<[InstanceType<typeof ControllerInfo>] | null>(null)
const authorizeInfoRef = ref<[InstanceType<typeof AuthorizeInfo>] | null>(null)
const beneficiaryInfoRef = ref<[InstanceType<typeof BeneficiaryInfo>] | null>(null)

const tabData = computed(() => ([
  basicInfoxRef.value?.[0].basicModel,
  basicInfoxRef.value?.[0].certInfoList,
  basicInfoxRef.value?.[0].ctactsInfoList,
  basicInfoxRef.value?.[0].ctcMethodList,
  bankAcctInfoRef.value?.[0].tableData,
  legalInfoRef.value?.[0].model,
  controllerInfoRef.value?.[0].tableData,
  authorizeInfoRef.value?.[0].model,
  beneficiaryInfoRef.value?.[0].tableData,
] as [
    basicInfoRefBasicModel: Record<string, string>,
    basicInfoRefCertInfoList: any[],
    basicInfoRefCtactsInfoList: any[],
    basicInfoRefCtcMethodList: any[],
    bankAcctInfoRefTableData: any[],
    legalInfoRefModel: Record<string, string>,
    controllerInfoRefTableData: any[],
    authorizeInfoRefModel: Record<string, string>,
    beneficiaryInfoRefRableData: any[],
]))
```

```xml
<ATabPane v-for="tab in tabs" :key="tab" :tab="tab">
  <BasicInfo v-if="tab === '基本信息'" ref="basicInfoxRef" :readonly="false" />
  <BankAcctInfo v-else-if="tab === '账户信息'" ref="bankAcctInfoRef" :readonly="false" />
  <LegalInfo v-else-if="tab === '法定代表人信息'" ref="legalInfoRef" :readonly="false" />
  <ControllerInfo v-else-if="tab === '实际控制人信息'" ref="controllerInfoRef" :readonly="false" />
  <AuthorizeInfo v-else-if="tab === '授权经办人信息'" ref="authorizeInfoRef" :readonly="false" />
  <BeneficiaryInfo v-else-if="tab === '受益所有人信息'" ref="beneficiaryInfoRef" :readonly="false" />
</ATabPane>

```
