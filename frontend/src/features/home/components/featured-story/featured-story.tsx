import Link from 'next/link'
import {Image} from 'next-sanity/image'

import type {PostSummary} from '@/features/post'
import {getImageUrl} from '@/sanity'

type FeaturedStoryProps = {
  post: PostSummary | null
}

export default function FeaturedStory({post}: FeaturedStoryProps) {
  if (!post) {
    return null
  }

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mb-8">
          Featured Story
        </p>
        <Link href={`/posts/${post.slug}`} className="group block">
          <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg">
              {post.coverImage?.asset?._ref && (
                <Image
                  src={getImageUrl(post.coverImage, 800, 600) || ''}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            <div className="py-4">
              <h3 className="font-serif text-3xl md:text-4xl leading-snug text-stone-900 mb-5 group-hover:text-stone-600 transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="font-sans text-stone-500 leading-relaxed mb-6 text-lg">
                  {post.excerpt}
                </p>
              )}
              <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
                Read the article &rarr;
              </span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  )
}
