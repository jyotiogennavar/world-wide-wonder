import type {PortableTextBlock} from 'next-sanity'

export type PostImage = {
  alt?: string | null
  asset?: {_ref?: string} | null
  crop?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  } | null
  hotspot?: {
    x?: number
    y?: number
    height?: number
    width?: number
  } | null
}

export type PostAuthor = {
  firstName: string | null
  lastName: string | null
  picture?: PostImage | null
}

export type PostSummary = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  date: string
  category?: string | null
  featured?: boolean | null
  coverImage?: PostImage | null
  author?: PostAuthor | null
}

export type PostDetail = PostSummary & {
  content?: PortableTextBlock[] | null
}
