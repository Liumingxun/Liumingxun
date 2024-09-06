import { SITE } from '@/site-config'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  const blogs = await getCollection('blog')
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: `${context.site?.protocol}//${context.site?.host}`,
    items: blogs.map(blog => ({
      title: blog.data.title,
      description: blog.data.description,
      pubDate: blog.data.publishedAt,
      link: `${context.site}blogs/${blog.slug}`,
      author: SITE.author,
      categories: blog.data.tags?.map(v => v),
      content: blog.body,
    } as RSSFeedItem)),
  })
}
