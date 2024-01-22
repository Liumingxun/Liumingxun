import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIRoute }  from 'astro'
import { SITE } from '@/site-config'
import fetchApi from '/lib/strapi'
import type Blog from '/interfaces/blog'

export const GET: APIRoute = async (context)  => { 
    const blogs = await fetchApi<Blog[]>({
        endpoint: "posts",
        wrappedByKey: "data",
        query: {
            fields: ["title", "description", "createdAt", "slug"],
            populate: {
                tags: {
                    fields: ["name"],
                },
                content: true,
            }
        }
    })

    return rss({
        title: SITE.title,
        description: SITE.description,
        site: context.site,
        items: blogs.map((blog) => ({
            title: blog.attributes.title,
            description: blog.attributes.description ?? '',
            pubDate: new Date(blog.attributes.createdAt),
            link: `${context.site}blogs/${blog.attributes.slug}`,
            author: SITE.author,
            categories: blog.attributes.tags?.data.map(v => v.attributes.name),
            content: blog.attributes.content.map((content) => {
                switch (content.__component) {
                    case "display.mce":
                        return content.content
                }
            }).join(''),
        } as RSSFeedItem))
    })
}