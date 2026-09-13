import type { Loader } from 'astro/loaders'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

function devLoader(opts: Pick<Parameters<typeof glob>[0], 'base' | 'pattern'>) {
  return ({
    name: 'dev-loader',
    load: async (ctx) => {
      ctx.store.clear()
      setTimeout(() => {
        glob(opts).load(ctx)
      }, 0)
    },
  }) satisfies Loader
}

const loader = import.meta.env.DEV ? devLoader : glob

const blogCollection = defineCollection({
  loader: loader({
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
  loader: loader({
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
