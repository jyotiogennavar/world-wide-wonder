import {defineQuery} from 'next-sanity'

import {sanityFetch} from '@/sanity/lib/live'

const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export async function getPostSlugs() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })

  return data ?? []
}
