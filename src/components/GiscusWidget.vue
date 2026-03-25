<script setup lang="ts">
import Giscus from '@giscus/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

type ColorScheme = 'light' | 'dark'

const colorScheme = ref<ColorScheme>('light')
const theme = computed(() =>
  colorScheme.value === 'dark'
    ? 'catppuccin_macchiato'
    : 'catppuccin_latte')

function getSavedTheme() {
  return localStorage.getItem('theme') as ColorScheme ?? 'light'
}

function getSystemTheme(): ColorScheme {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

let observer: MutationObserver | null = null

onMounted(() => {
  const initialTheme = getSavedTheme() || getSystemTheme()
  colorScheme.value = initialTheme

  observer = new MutationObserver(() => {
    colorScheme.value = getSavedTheme()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <Giscus
    repo="Liumingxun/Liumingxun"
    repo-id="R_kgDOJmYzmw"
    category="Announcements"
    category-id="DIC_kwDOJmYzm84Cexv8"
    mapping="og:title"
    strict="0"
    reactions-enabled="1"
    emit-metadata="0"
    loading="eager"
    input-position="top"
    :theme="theme"
    lang="zh-CN"
  />
</template>
