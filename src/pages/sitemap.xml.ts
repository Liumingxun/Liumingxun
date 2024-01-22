import type { APIRoute } from 'astro'
import fetchApi from '/lib/strapi'
import type Blog from '/interfaces/blog'

export const GET: APIRoute = async (context) => {
    const blogs = await fetchApi<Blog[]>({
        endpoint: "posts",
        wrappedByKey: "data",
        query: {
            fields: ["updatedAt", "slug"],
            populate: {
                tags: {
                    fields: ["name"],
                },
            }
        }
    })

    const sitemapTmpl = /*html*/`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        #SITEMAP#
        </urlset>`

    return new Response(sitemapTmpl.replace('#SITEMAP#', blogs.map(blog => /*xml*/`
        <url>
            <loc>${context.site}blogs/${blog.attributes.slug}</loc>
            <lastmod>${blog.attributes.updatedAt}</lastmod>
        </url>
    `).join('') + /*xml*/`
        <url>
            <loc>${context.site}about</loc>
        </url>
        <url>
            <loc>${context.site}blogs</loc>
        </url>
    `), {
        headers: {
            'Content-Type': 'application/xml'
        }
    })
}