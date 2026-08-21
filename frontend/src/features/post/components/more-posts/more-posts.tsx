import Link from 'next/link'

import {Avatar} from '@/features/post/components/avatar'
import {DateComponent} from '@/features/post/components/date'
import {getMorePosts, getPosts} from '@/features/post/queries'
import type {PostSummary} from '@/features/post/types'

function Post({post}: {post: PostSummary}) {
  const {id, title, slug, excerpt, date, author} = post

  return (
    <article
      key={id}
      className="group relative bg-white border border-stone-200 rounded-lg p-6 md:p-8 transition-all duration-300 hover:border-stone-300 hover:shadow-sm"
    >
      <Link className="absolute inset-0 z-10" href={`/posts/${slug}`}>
        <span className="sr-only">Read {title}</span>
      </Link>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-serif text-xl md:text-2xl text-stone-900 mb-3 group-hover:text-stone-600 transition-colors leading-snug">
            {title}
          </h3>
          <p className="font-sans text-stone-500 text-sm leading-relaxed line-clamp-3 max-w-[70ch]">
            {excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-100">
          {author && author.firstName && author.lastName && (
            <Avatar person={author} small={true} />
          )}
          <time className="font-sans text-stone-400 text-xs" dateTime={date}>
            <DateComponent dateString={date} />
          </time>
        </div>
      </div>
    </article>
  )
}

function Posts({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) {
  return (
    <div>
      {heading && (
        <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2">{heading}</h2>
      )}
      {subHeading && <p className="font-sans text-stone-500 text-base mb-8">{subHeading}</p>}
      <div className="grid gap-6 md:grid-cols-2">{children}</div>
    </div>
  )
}

export async function MorePosts({skip, limit}: {skip: string; limit: number}) {
  const posts = await getMorePosts(skip, limit)

  if (!posts.length) {
    return null
  }

  return (
    <Posts heading="More Stories" subHeading="Continue exploring">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Posts>
  )
}

export async function AllPosts() {
  const posts = await getPosts()

  if (!posts.length) {
    return null
  }

  return (
    <Posts
      heading="Recent Stories"
      subHeading="Personal narratives shaped by memory, emotion, and observation."
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Posts>
  )
}
