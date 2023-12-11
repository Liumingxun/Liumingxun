export const SITE = {
    title: 'Lime!',
    name: 'lime site',
    desc: 'FE-Developer! But not only FE!'
}

type NavItem = {
    path: string,
    title: string
}

export const NAV_ITEMS: NavItem[] = [
    {
        path: '/',
        title: 'home',
    },
    {
        path: '/blogs',
        title: 'blogs'
    },
    {
        path: '/tags',
        title: 'tags',
    },
    {
        path: '/tools',
        title: 'tools',
    },
    {
        path: '/about',
        title: 'about'
    }
]