import NextLink from 'next/link'

import {linkResolver} from '@/sanity/lib/link'
import type {Link} from '@/sanity/types'

type ResolvedLinkProps = {
  link?: Link | null
  children: React.ReactNode
  className?: string
}

export default function ResolvedLink({link, children, className}: ResolvedLinkProps) {
  const resolvedLink = linkResolver(link)

  if (typeof resolvedLink === 'string') {
    return (
      <NextLink
        href={resolvedLink}
        target={link?.openInNewTab ? '_blank' : undefined}
        rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </NextLink>
    )
  }

  return <>{children}</>
}
