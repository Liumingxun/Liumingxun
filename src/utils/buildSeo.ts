import type Seo from "/interfaces/seo"

interface SeoParams {
    title: string,
    description: string,
    image?: string
    tags?: string[],
    createdAt?: string,
    updatedAt?: string
    publishedAt?: string
    noindex?: boolean
}

export function buildSeo({ title, description, image, tags, createdAt, updatedAt, publishedAt, noindex = false }: SeoParams): Seo {
    const seo: Seo = {
        title,
        description,
        image: image,
        createdAt,
        updatedAt,
        publishedAt,
        tags: tags,
        keywords: tags?.join(","),
        noindex
    }

    return seo
}