import {defineQuery} from 'next-sanity'

import {mapPostSummary} from '@/features/post/utils/map-post'
import {sanityFetch} from '@/sanity/lib/live'
import {postFields} from './fragments'

const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export async function getPosts() {
  const {data} = await sanityFetch({query: allPostsQuery})

  return data?.map(mapPostSummary) ?? []
}
