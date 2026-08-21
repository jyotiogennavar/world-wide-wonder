import type {PortableTextBlock} from 'next-sanity'

import type {PostAuthor, PostDetail, PostImage, PostSummary} from '../types'

type SanityImage = {
  alt?: string | null
  asset?: {_ref?: string} | null
  crop?: PostImage['crop']
  hotspot?: PostImage['hotspot']
} | null

type SanityAuthor = {
  firstName?: string | null
  lastName?: string | null
  picture?: SanityImage
} | null

type SanityPost = {
  _id: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  date?: string | null
  category?: string | null
  featured?: boolean | null
  coverImage?: SanityImage
  author?: SanityAuthor
  content?: unknown
}

function mapImage(image: SanityImage): PostImage | null {
  if (!image) {
    return null
  }

  return {
    alt: image.alt ?? null,
    asset: image.asset ?? null,
    crop: image.crop ?? null,
    hotspot: image.hotspot ?? null,
  }
}

function mapAuthor(author: SanityAuthor): PostAuthor | null {
  if (!author) {
    return null
  }

  return {
    firstName: author.firstName ?? null,
    lastName: author.lastName ?? null,
    picture: mapImage(author.picture ?? null),
  }
}

export function mapPostSummary(post: SanityPost): PostSummary {
  return {
    id: post._id,
    title: post.title ?? 'Untitled',
    slug: post.slug ?? '',
    excerpt: post.excerpt ?? null,
    date: post.date ?? '',
    category: post.category ?? null,
    featured: post.featured ?? null,
    coverImage: mapImage(post.coverImage ?? null),
    author: mapAuthor(post.author ?? null),
  }
}

export function mapPostDetail(post: SanityPost): PostDetail {
  return {
    ...mapPostSummary(post),
    content: (post.content as PortableTextBlock[] | null | undefined) ?? null,
  }
}
