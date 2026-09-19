import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { NOTE_KINDS, NOTE_STATUSES } from './utils/note-meta'

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: 'src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    status: z.enum(NOTE_STATUSES).default('evergreen'),
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
    description: z.string().optional(),
    type: z.enum(NOTE_KINDS).default('concept'),
    status: z.enum(NOTE_STATUSES).default('seedling'),
    tags: z.array(z.string()).optional().default([]),
    source: z.string().optional(),
    createAt: z.coerce.date(),
    updateAt: z.coerce.date().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  card: cardCollenction,
}
