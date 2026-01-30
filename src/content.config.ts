import type { Loader } from 'astro/loaders'
import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { blogSchema } from '@/schemas'

void devLoader
function devLoader(opts: Pick<Parameters<typeof glob>[0], 'base' | 'pattern'>) {
  return ({
    name: 'dev-loader',
    load: async (ctx) => {
      ctx.store.clear()
      glob(opts).load(ctx)
    },
  }) satisfies Loader
}

export const collections = {
  blog: defineCollection({
    loader: devLoader({
      pattern: '**/*.md',
      base: 'src/content/blog',
    }),
    schema: blogSchema,
  }),
}
