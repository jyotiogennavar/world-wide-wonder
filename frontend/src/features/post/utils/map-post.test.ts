import assert from 'node:assert/strict'
import {describe, it} from 'node:test'

import {mapPostDetail, mapPostSummary} from './map-post.ts'

const sanityPost = {
  _id: 'post-1',
  title: 'Kyoto in winter',
  slug: 'kyoto-in-winter',
  excerpt: 'Quiet streets after rain.',
  date: '2026-01-12',
  category: 'story',
  featured: true,
  coverImage: {
    alt: 'Temple path',
    asset: {_ref: 'image-abc'},
    crop: {top: 0.1, bottom: 0.1, left: 0.05, right: 0.05},
    hotspot: {x: 0.42, y: 0.31, height: 0.4, width: 0.4},
  },
  author: {
    firstName: 'Ada',
    lastName: 'Lovelace',
    picture: {
      alt: 'Ada',
      asset: {_ref: 'image-author'},
    },
  },
  content: [{_type: 'block', _key: 'a', children: [{_type: 'span', text: 'Hello'}]}],
}

describe('mapPostSummary', () => {
  it('maps Sanity fields onto application types', () => {
    assert.deepEqual(mapPostSummary(sanityPost), {
      id: 'post-1',
      title: 'Kyoto in winter',
      slug: 'kyoto-in-winter',
      excerpt: 'Quiet streets after rain.',
      date: '2026-01-12',
      category: 'story',
      featured: true,
      coverImage: sanityPost.coverImage,
      author: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        picture: {
          alt: 'Ada',
          asset: {_ref: 'image-author'},
          crop: null,
          hotspot: null,
        },
      },
    })
  })

  it('uses safe defaults when optional fields are missing', () => {
    assert.deepEqual(mapPostSummary({_id: 'post-2'}), {
      id: 'post-2',
      title: 'Untitled',
      slug: '',
      excerpt: null,
      date: '',
      category: null,
      featured: null,
      coverImage: null,
      author: null,
    })
  })

  it('preserves image crop and hotspot', () => {
    const mapped = mapPostSummary(sanityPost)

    assert.deepEqual(mapped.coverImage?.crop, sanityPost.coverImage.crop)
    assert.deepEqual(mapped.coverImage?.hotspot, sanityPost.coverImage.hotspot)
  })
})

describe('mapPostDetail', () => {
  it('includes portable text content', () => {
    const mapped = mapPostDetail(sanityPost)

    assert.equal(mapped.id, 'post-1')
    assert.deepEqual(mapped.content, sanityPost.content)
  })
})
