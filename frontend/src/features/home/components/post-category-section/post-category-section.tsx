import Link from 'next/link'
import {Image} from 'next-sanity/image'

import type {PostSummary} from '@/features/post'
import {getImageUrl} from '@/sanity'

type SectionVariant = 'story' | 'city-guide' | 'curated-list'

type PostCategorySectionProps = {
  id: string
  title: string
  description: string
  posts: PostSummary[]
  variant: SectionVariant
  excludePostId?: string
}

function sectionClasses(variant: SectionVariant) {
  if (variant === 'city-guide') {
    return 'px-6 py-16 md:py-20 border-t border-stone-200 bg-stone-100/50 scroll-mt-24'
  }
  return 'px-6 py-16 md:py-20 border-t border-stone-200 scroll-mt-24'
}

function StoryCard({post}: {post: PostSummary}) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article>
        <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-t-full rounded-b-md mb-5">
          {post.coverImage?.asset?._ref && (
            <Image
              src={getImageUrl(post.coverImage, 400, 533) || ''}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
        <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-sans text-stone-500 text-sm leading-relaxed mb-3">{post.excerpt}</p>
        )}
        <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
          Read the article &rarr;
        </span>
      </article>
    </Link>
  )
}

function CityGuideCard({post}: {post: PostSummary}) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
        {post.coverImage?.asset?._ref && (
          <Image
            src={getImageUrl(post.coverImage, 600, 375) || ''}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md mb-2">
              {post.excerpt}
            </p>
          )}
          <span className="font-sans text-sm text-amber-300 group-hover:text-amber-200 transition-colors drop-shadow-md">
            Read the article &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}

function CuratedListCard({post}: {post: PostSummary}) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article>
        <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg mb-5">
          {post.coverImage?.asset?._ref && (
            <Image
              src={getImageUrl(post.coverImage, 400, 300) || ''}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
        <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-sans text-stone-500 text-sm leading-relaxed mb-3">{post.excerpt}</p>
        )}
        <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
          Read the article &rarr;
        </span>
      </article>
    </Link>
  )
}

export default function PostCategorySection({
  id,
  title,
  description,
  posts,
  variant,
  excludePostId,
}: PostCategorySectionProps) {
  const filteredPosts =
    variant === 'story' ? posts.filter((post) => post.id !== excludePostId) : posts

  if (!filteredPosts.length) {
    return null
  }

  return (
    <section id={id} className={sectionClasses(variant)}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">{title}</h2>
          <p className="font-sans text-stone-500 text-lg">{description}</p>
        </div>

        {variant === 'story' && (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {variant === 'city-guide' && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <CityGuideCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {variant === 'curated-list' && (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <CuratedListCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
