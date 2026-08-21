import {defineQuery} from 'next-sanity'

import {mapPostSummary} from '@/features/post/utils/map-post'
import {sanityFetch} from '@/sanity/lib/live'
import {postFields} from './fragments'

const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export async function getMorePosts(skip: string, limit: number) {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })

  return data?.map(mapPostSummary) ?? []
}
