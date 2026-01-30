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
      setTimeout(() => {
        glob(opts).load(ctx)
      }, 0)
    },
  }) satisfies Loader
}

const loader = import.meta.env.DEV ? devLoader : glob

export const collections = {
  blog: defineCollection({
    loader: loader({
      pattern: '**/*.md',
      base: 'src/content/blog',
    }),
    schema: blogSchema,
  }),
}
