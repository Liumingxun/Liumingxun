import type { AstroConfig } from 'astro'
import type { BlogFrontmatter } from '@/schemas'
import { readFile, stat, writeFile } from 'node:fs/promises'
import { dump } from 'js-yaml'

type AstroMarkdownRemarkPlugin = AstroConfig['markdown']['remarkPlugins'][number]

const remarkAppendDate: AstroMarkdownRemarkPlugin = () => {
  const frontmatterRegex = /---\n[\s\S]*?\n---/
  return (_, file) => {
    Promise.all([readFile(file.path, 'utf-8'), stat(file.path)]).then(([content, stats]) => {
      if (!file.data.astro?.frontmatter)
        return undefined
      const data = file.data.astro.frontmatter as BlogFrontmatter
      if (!data.createAt) {
        data.createAt = stats.birthtime
      }
      else {
        data.updateAt = stats.mtime
      }
      return content.replace(frontmatterRegex, `---\n${dump(data, { lineWidth: -1 })}---`)
    }).then((content) => {
      if (!content)
        return Promise.resolve()
      return writeFile(file.path, content, 'utf-8')
    })
  }
}

export default remarkAppendDate
