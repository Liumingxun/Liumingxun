import { atom, action } from 'nanostores'

export const $theme = atom<'light' | 'dark'>('light')

export const toggleTheme = action($theme, 'toggleTheme', () => {
    $theme.set($theme.get() === 'light' ? 'dark' : 'light')
})