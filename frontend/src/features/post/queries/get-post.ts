import {defineQuery} from 'next-sanity'

import {mapPostDetail} from '@/features/post/utils/map-post'
import {linkReference} from '@/sanity/queries/fragments'
import {sanityFetch} from '@/sanity/lib/live'
import {postFields} from './fragments'

const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
  }
`)

export async function getPost(slug: string) {
  const {data} = await sanityFetch({
    query: postQuery,
    params: {slug},
  })

  return data ? mapPostDetail(data) : null
}

export async function getPostForMetadata(slug: string) {
  const {data} = await sanityFetch({
    query: postQuery,
    params: {slug},
    stega: false,
  })

  return data ? mapPostDetail(data) : null
}
