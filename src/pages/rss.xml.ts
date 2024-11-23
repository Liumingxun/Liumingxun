import { SITE } from '@/site-config'
import rss, { type RSSFeedItem } from '@astrojs/rss'
import { getOldestCommitDate } from '@it-astro:content/git'
import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
  const blogs = await getCollection('blog')
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: `${context.site?.protocol}//${context.site?.host}`,
    items: await Promise.all(blogs.map(async blog => ({
      title: blog.data.title,
      description: blog.data.description,
      pubDate: await getOldestCommitDate(blog),
      link: `${context.site}blogs/${blog.slug}`,
      author: SITE.author,
      categories: blog.data.tags?.map(v => v),
      content: blog.body.split('\n').slice(0, 20).join('\n'),
    } as RSSFeedItem))),
  })
}
