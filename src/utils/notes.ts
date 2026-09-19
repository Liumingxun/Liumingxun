import type { CollectionEntry } from 'astro:content'
import type { NoteKind, NoteStatus } from './note-meta'
import { getCollection } from 'astro:content'

export type NoteCollection = 'blog' | 'card'

export interface Note {
  collection: NoteCollection
  slug: string
  href: string
  title: string
  description: string
  tags: string[]
  status: NoteStatus
  kind: NoteKind | null
  source: string | null
  createdAt: Date
  updatedAt: Date
}

export interface TagGroup {
  tag: string
  slug: string
  notes: Note[]
}

type NoteEntry = CollectionEntry<'blog'> | CollectionEntry<'card'>

export function excerpt(markdown: string | undefined, length = 140): string {
  if (!markdown)
    return ''

  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*[-*+]\s+/gm, ' ')
    .replace(/^\s*[>#|]+/gm, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text
}

export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-')
}

export function toNote(entry: NoteEntry): Note {
  if (entry.collection === 'blog') {
    const { data } = entry
    return {
      collection: 'blog',
      slug: entry.id,
      href: `/blogs/${entry.id}`,
      title: data.title,
      description: data.description,
      tags: data.tags,
      status: data.status,
      kind: null,
      source: null,
      createdAt: data.createAt,
      updatedAt: data.updateAt,
    }
  }

  const { data } = entry
  return {
    collection: 'card',
    slug: entry.id,
    href: `/cards/${entry.id}`,
    title: data.title,
    description: data.description ?? excerpt(entry.body),
    tags: data.tags,
    status: data.status,
    kind: data.type,
    source: data.source ?? null,
    createdAt: data.createAt,
    updatedAt: data.updateAt ?? data.createAt,
  }
}

export async function getAllNotes(): Promise<Note[]> {
  const [blogs, cards] = await Promise.all([
    getCollection('blog'),
    getCollection('card'),
  ])

  return [...blogs, ...cards].map(toNote)
}

export function byLastTended(notes: Note[]): Note[] {
  return notes.toSorted((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

export function collectTags(notes: Note[]): TagGroup[] {
  const groups = new Map<string, TagGroup>()

  for (const note of notes) {
    for (const tag of note.tags) {
      const slug = tagSlug(tag)
      const group = groups.get(slug)

      if (group)
        group.notes.push(note)
      else
        groups.set(slug, { tag, slug, notes: [note] })
    }
  }

  return [...groups.values()].toSorted(
    (a, b) => b.notes.length - a.notes.length || a.tag.localeCompare(b.tag),
  )
}
