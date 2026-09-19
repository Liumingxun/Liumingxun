export const NOTE_STATUSES = ['seedling', 'budding', 'evergreen'] as const

export type NoteStatus = (typeof NOTE_STATUSES)[number]

export interface NoteStatusMeta {
  label: string
  emoji: string
  description: string
}

export const NOTE_STATUS_META: Record<NoteStatus, NoteStatusMeta> = {
  seedling: {
    label: '幼苗',
    emoji: '🌱',
    description: '刚种下，内容还在生长',
  },
  budding: {
    label: '抽枝',
    emoji: '🌿',
    description: '逐渐成形，仍会反复修改',
  },
  evergreen: {
    label: '常青',
    emoji: '🌳',
    description: '相对稳定，但依旧会被修剪',
  },
}

export const NOTE_KINDS = ['cheatsheet', 'concept', 'issue', 'tip'] as const

export type NoteKind = (typeof NOTE_KINDS)[number]

export interface NoteKindMeta {
  label: string
}

export const NOTE_KIND_META: Record<NoteKind, NoteKindMeta> = {
  cheatsheet: { label: '速查表' },
  concept: { label: '概念' },
  issue: { label: '问题' },
  tip: { label: '技巧' },
}
