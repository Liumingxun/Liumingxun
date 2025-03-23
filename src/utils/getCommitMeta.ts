import type { CollectionEntry, CollectionKey } from 'astro:content'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

export function getFileCommitDate<T extends CollectionKey>(entry: CollectionEntry<T>, latest?: boolean): Date {
  const filePath = resolve(entry.filePath!)

  // 构造 git 命令
  const command
    = !latest
      ? `git log --reverse --pretty=format:"%ad" --date=short -- ${filePath} | head -n 1`
      : `git log -1 --pretty=format:"%ad" --date=short -- ${filePath}`

  try {
    const result = execSync(command, { encoding: 'utf-8' }).trim()

    if (!result) {
      throw new Error(`未找到文件的提交记录: ${filePath}`)
    }

    // 转换为 Date 对象
    const date = new Date(result)
    return date
  }
  catch (error) {
    throw new Error(`执行命令失败: ${(error as Error).message}`)
  }
}
