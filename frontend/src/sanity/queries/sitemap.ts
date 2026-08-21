import {defineQuery} from 'next-sanity'

import {sanityFetch} from '@/sanity/lib/live'

const sitemapQuery = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export async function getSitemapEntries() {
  return sanityFetch({
    query: sitemapQuery,
  })
}
