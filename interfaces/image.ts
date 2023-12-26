export default interface Image {
    id: number
    attributes: Partial<ImageAttributes>
}

interface ImageAttributes { 
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: ImageFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    providerMetadata: string
    createdAt: string
    updatedAt: string
}

interface ImageFormats { 
    thumbnail: ImageFormat
    large: ImageFormat
    medium: ImageFormat
    small: ImageFormat
}

interface ImageFormat {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: string | null
    url: string
}