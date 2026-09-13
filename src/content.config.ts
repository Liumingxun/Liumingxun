import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: 'src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(true),
    createAt: z.coerce.date().default(new Date()),
    updateAt: z.coerce.date().default(new Date()),
    hash: z.string().optional(),
  }),
})

const cardCollenction = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: 'src/content/card',
  }),
  schema: z.object({
    title: z.string(),
    createAt: z.coerce.date(),
  // type: z.enum(['cheatsheet', 'issue', 'tip', 'concept']),
  }),
})

export const collections = {
  blog: blogCollection,
  card: cardCollenction,
}
