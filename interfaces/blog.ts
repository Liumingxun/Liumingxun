import type Tag from './tag';
import type Image from './image';
import type { Wrapped } from './response';

export default interface Blog {
    id: number,
    attributes: Partial<BlogAttributes>,
}

interface BlogAttributes {
    title: string,
    slug: string,
    hero_image: Wrapped<Image>,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    description: string,
    locale: string,
    read: number,
    tags: Wrapped<Tag[]>,
    content: Array<DisplayContent>,
}

interface DisplayContent {
    id: number,
    __component: string,
    content: string,
}
