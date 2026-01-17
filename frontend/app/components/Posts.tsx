import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {morePostsQuery, allPostsQuery} from '@/sanity/lib/queries'
import {Post as PostType, AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import Avatar from '@/app/components/Avatar'
import {createDataAttribute} from 'next-sanity'

const Post = ({post}: {post: AllPostsQueryResult[number]}) => {
  const {_id, title, slug, excerpt, date, author} = post

  const attr = createDataAttribute({
    id: _id,
    type: 'post',
    path: 'title',
  })

  return (
    <article
      data-sanity={attr()}
      key={_id}
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

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && (
      <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="font-sans text-stone-500 text-base mb-8">
        {subHeading}
      </p>
    )}
    <div className="grid gap-6 md:grid-cols-2">{children}</div>
  </div>
)

export const MorePosts = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading="More Stories" subHeading="Continue exploring">
      {data?.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async () => {
  const {data} = await sanityFetch({query: allPostsQuery})

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Posts
      heading="Recent Stories"
      subHeading="Personal narratives shaped by memory, emotion, and observation."
    >
      {data.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
