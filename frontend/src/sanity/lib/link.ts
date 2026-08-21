import type {Link} from '../types'

export function linkResolver(link: Link | undefined | null) {
  if (!link) {
    return null
  }

  const linkType = link.linkType || (link.href ? 'href' : undefined)

  switch (linkType) {
    case 'href':
      return link.href || null
    case 'page':
      if (link.page && typeof link.page === 'string') {
        return `/${link.page}`
      }
      return null
    case 'post':
      if (link.post && typeof link.post === 'string') {
        return `/posts/${link.post}`
      }
      return null
    default:
      return null
  }
}
