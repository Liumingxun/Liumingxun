import { z } from 'astro:content'

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
  tags: z.array(z.string()).optional(),
})
