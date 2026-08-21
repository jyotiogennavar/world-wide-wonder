import assert from 'node:assert/strict'
import {describe, it} from 'node:test'

import {linkResolver} from './link.ts'

describe('linkResolver', () => {
  it('returns null for missing links', () => {
    assert.equal(linkResolver(undefined), null)
    assert.equal(linkResolver(null), null)
  })

  it('resolves external href links', () => {
    assert.equal(
      linkResolver({
        _type: 'link',
        linkType: 'href',
        href: 'https://example.com',
      }),
      'https://example.com',
    )
  })

  it('treats a bare href as an external link', () => {
    assert.equal(
      linkResolver({
        _type: 'link',
        href: 'https://example.com/about',
      }),
      'https://example.com/about',
    )
  })

  it('resolves projected page and post slugs', () => {
    assert.equal(
      linkResolver({
        _type: 'link',
        linkType: 'page',
        page: 'about' as never,
      }),
      '/about',
    )

    assert.equal(
      linkResolver({
        _type: 'link',
        linkType: 'post',
        post: 'kyoto-in-winter' as never,
      }),
      '/posts/kyoto-in-winter',
    )
  })

  it('does not fall through from a page link to a post link', () => {
    assert.equal(
      linkResolver({
        _type: 'link',
        linkType: 'page',
        post: 'kyoto-in-winter' as never,
      }),
      null,
    )
  })
})
