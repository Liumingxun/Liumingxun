export default interface Tag {
    id: number,
    attributes: Partial<TagAttributes>,
}


interface TagAttributes {
    name: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
}