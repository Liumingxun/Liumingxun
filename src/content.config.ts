import { blogSchema } from '@/schemas'
import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

export const collections = {
  blog: defineCollection({
    loader: glob({
      pattern: '*.md',
      base: './src/content/blog',
    }),
    schema: blogSchema,
  }),
}
