export const SITE = {
    title: 'Lime\'s Site - lolo洛明',
    description: '诶嘿！这里是洛明，你也可以叫我 Lime！是前端开发者，对好多新鲜事物感兴趣，站内可能会分享一些技术文章等，希望你能喜欢！',
    image: '/favicon.svg',
    author: '洛明Lime'
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
    {
        path: '/about',
        title: 'about'
    }
]