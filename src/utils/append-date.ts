import type { AstroConfig } from 'astro'
import type { BlogFrontmatter } from '@/schemas'
import { readFile, stat, writeFile } from 'node:fs/promises'
import { dump } from 'js-yaml'
import xxhash from 'xxhash-wasm'

type AstroMarkdownRemarkPlugin = AstroConfig['markdown']['remarkPlugins'][number]

const remarkAppendDate: AstroMarkdownRemarkPlugin = () => {
  const frontmatterRegex = /---\n[\s\S]*?\n---/
  return async (_, file) => {
    if (!file.data.astro?.frontmatter)
      return

    try {
      const data = file.data.astro.frontmatter as BlogFrontmatter
      const bodyContent = file.value.toString()
      const [{ birthtime, mtime }, { h64ToString }] = await Promise.all([
        stat(file.path),
        xxhash(),
      ])

      const currentHash = h64ToString(bodyContent)

      if (!data.createAt) {
        data.createAt = birthtime
        data.hash = currentHash
      }
      else if (data.hash !== currentHash) {
        data.updateAt = mtime
        data.hash = currentHash
      }

      const rawContent = await readFile(file.path, 'utf-8')
      const newContent = rawContent.replace(
        frontmatterRegex,
        `---\n${dump(data, { lineWidth: -1 })}---`,
      )

      await writeFile(file.path, newContent, 'utf-8')
    }
    catch (err) {
      console.error(`Failed to update metadata for ${file.path}:`, err)
    }
  }
}

export default remarkAppendDate
