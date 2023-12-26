export const SITE = {
    title: 'Lime\'s Site',
    author: 'Lime!',
    description: 'FE-Developer! But not only FE!',
    ogImage: '/assets/lime.svg'
}

type NavItem = {
    path: string,
    title: string
}

export const NAV_ITEMS: NavItem[] = [
    {
        path: '/blogs',
        title: 'blogs'
    },
    // {
    //     path: '/tags',
    //     title: 'tags',
    // },
    // {
    //     path: '/tools',
    //     title: 'tools',
    // },
    {
        path: '/about',
        title: 'about'
    }
]