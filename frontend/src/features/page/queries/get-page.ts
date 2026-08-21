import {defineQuery} from 'next-sanity'

import {linkFields, linkReference} from '@/sanity/queries/fragments'
import {sanityFetch} from '@/sanity/lib/live'

const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export async function getPage(slug: string) {
  const {data} = await sanityFetch({
    query: getPageQuery,
    params: {slug},
  })

  return data
}

export async function getPageForMetadata(slug: string) {
  const {data} = await sanityFetch({
    query: getPageQuery,
    params: {slug},
    stega: false,
  })

  return data
}
