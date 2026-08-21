import {defineQuery} from 'next-sanity'

import {sanityFetch} from '@/sanity/lib/live'

const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export async function getSettings() {
  return sanityFetch({
    query: settingsQuery,
    stega: false,
  })
}
