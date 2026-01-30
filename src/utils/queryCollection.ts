import type { CollectionEntry, CollectionKey } from 'astro:content'
import { getCollection } from 'astro:content'

interface CollectionSort<CK extends CollectionKey> {
  by: keyof CollectionEntry<CK>['data']
  order: 'asc' | 'desc'
}

export async function queryCollection<CK extends CollectionKey>(
  collection: CK,
  sort: CollectionSort<CK>,
) {
  const entries = await getCollection<CK>(collection)
  return entries.toSorted((a, b) => {
    const aVal = a.data[sort.by as keyof typeof a.data]
    const bVal = b.data[sort.by as keyof typeof b.data]

    if (!aVal && !bVal)
      return 0
    if (!aVal)
      return 1
    if (!bVal)
      return -1

    const order = sort.order === 'asc' ? 1 : -1
    return aVal < bVal ? -order : aVal > bVal ? order : 0
  })
}
