import {MetadataRoute} from 'next'
import {headers} from 'next/headers'

import {getSitemapEntries} from '@/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await getSitemapEntries()
  const headersList = await headers()
  const entries: MetadataRoute.Sitemap = []
  const domain = headersList.get('host') as string

  entries.push({
    url: domain,
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
        url: isPage ? `${domain}/${page.slug}` : `${domain}/posts/${page.slug}`,
      })
    }
  }

  return entries
}
