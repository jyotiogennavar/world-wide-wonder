import {defineQuery} from 'next-sanity'

import {mapPostSummary} from '@/features/post/utils/map-post'
import {sanityFetch} from '@/sanity/lib/live'
import {postFields} from './fragments'

const featuredPostQuery = defineQuery(`
  *[_type == "post" && featured == true && defined(slug.current)][0] {
    ${postFields}
  }
`)

export async function getFeaturedPost() {
  const {data} = await sanityFetch({query: featuredPostQuery})

  return data ? mapPostSummary(data) : null
}
