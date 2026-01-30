import { z } from 'astro:content'

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  createAt: z.coerce.date().default(new Date()),
  updateAt: z.coerce.date().default(new Date()),
  hash: z.string().optional(),
})

const _blogSchemaPartial = blogSchema.partial({
  createAt: true,
  updateAt: true,
})

export type BlogFrontmatter = z.input<typeof _blogSchemaPartial>
