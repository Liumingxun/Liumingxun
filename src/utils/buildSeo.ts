import type Image from "/interfaces/image"
import type Seo from "/interfaces/seo"
import type Tag from "/interfaces/tag"

interface SeoParams {
    title: string,
    description: string,
    image?: Image | string
    tags?: Tag[],
    createdAt?: string,
    updatedAt?: string
    publishedAt?: string
}

const isImage = (image: Image | string): image is Image => {
    return typeof image !== "string"
}

export function buildSeo({ title, description, image, tags, createdAt, updatedAt, publishedAt }: SeoParams): Seo {    
    if (image && isImage(image)) {
        image = image.attributes.url
    }

    const seo: Seo = {
        title: title,
        description: description,
        image: image as string,
        createdAt: createdAt,
        updatedAt: updatedAt,
        publishedAt: publishedAt,
        tags: tags?.map(tag => tag.attributes.name),
        keywords: tags?.map(tag => tag.attributes.name).join(","),
    }

    return seo
}