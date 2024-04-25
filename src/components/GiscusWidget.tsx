import { createEffect, createSignal, onCleanup, type Component } from "solid-js";
import Giscus from '@giscus/solid'

function getSavedTheme() {
    return localStorage.getItem('theme')
}

function getSystemTheme() {
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const GiscusWidget: Component = () => {
    const [theme, setTheme] = createSignal('light')

    createEffect(() => {
        const theme = getSavedTheme() || getSystemTheme()
        setTheme(theme)

        const observer = new MutationObserver(() => {
            setTheme(getSavedTheme())
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        })

        onCleanup(() => {
            observer.disconnect()
        })
    })

    return (
        <Giscus
            repo="Liumingxun/Liumingxun"
            repoId="R_kgDOJmYzmw"
            category="Announcements"
            categoryId="DIC_kwDOJmYzm84Cexv8"
            mapping="og:title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            loading="eager"
            inputPosition="top"
            theme={theme()}
            lang="zh-CN"
        ></Giscus>
    )
}

export default GiscusWidget