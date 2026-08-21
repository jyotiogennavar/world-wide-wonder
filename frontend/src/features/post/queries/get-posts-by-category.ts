import {defineQuery} from 'next-sanity'

import {mapPostSummary} from '@/features/post/utils/map-post'
import {sanityFetch} from '@/sanity/lib/live'
import {postFields} from './fragments'

const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && category == $category && defined(slug.current)] | order(date desc) {
    ${postFields}
  }
`)

export async function getPostsByCategory(category: string) {
  const {data} = await sanityFetch({
    query: postsByCategoryQuery,
    params: {category},
  })

  return data?.map(mapPostSummary) ?? []
}
