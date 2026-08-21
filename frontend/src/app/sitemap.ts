import {MetadataRoute} from 'next'
import {headers} from 'next/headers'

import {getSitemapEntries} from '@/sanity/queries/sitemap'

function getSiteOrigin(headerList: Headers) {
  const host = headerList.get('host') ?? 'localhost:3000'
  const protocol =
    headerList.get('x-forwarded-proto') ?? (host.includes('localhost') ? 'http' : 'https')

  return `${protocol}://${host}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await getSitemapEntries()
  const origin = getSiteOrigin(await headers())
  const entries: MetadataRoute.Sitemap = []

  entries.push({
    url: origin,
    lastModified: new Date(),
    priority: 1,
    changeFrequency: 'monthly',
  })

  if (allPostsAndPages?.data?.length) {
    for (const page of allPostsAndPages.data) {
      const isPage = page._type === 'page'

      entries.push({
        lastModified: page._updatedAt || new Date(),
        priority: isPage ? 0.8 : 0.5,
        changeFrequency: isPage ? 'monthly' : 'never',
        url: isPage ? `${origin}/${page.slug}` : `${origin}/posts/${page.slug}`,
      })
    }
  }

  return entries
}
