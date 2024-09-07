export default interface Seo {
  title: string
  description: string
  image?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  tags?: string[]
  noindex?: boolean
}
