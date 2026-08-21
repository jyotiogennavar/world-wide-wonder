import {defineQuery} from 'next-sanity'

import {sanityFetch} from '@/sanity/lib/live'

const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export async function getPageSlugs() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })

  return data
}
