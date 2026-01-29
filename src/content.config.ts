import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { blogSchema } from '@/schemas'

export const collections = {
  blog: defineCollection({
    loader: glob({
      pattern: '*.{md,mdx}',
      base: './src/content/blog',
    }),
    schema: blogSchema,
  }),
}
