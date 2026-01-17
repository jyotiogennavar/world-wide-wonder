import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'
import Link from 'next/link'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import {MorePosts} from '@/app/components/Posts'
import PortableText from '@/app/components/PortableText'
import Navbar from '@/app/components/Navbar'
import {sanityFetch} from '@/sanity/lib/live'
import {postPagesSlugs, postQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: post} = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{name: `${post.author.firstName} ${post.author.lastName}`}]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{data: post}] = await Promise.all([sanityFetch({query: postQuery, params})])

  if (!post?._id) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar title="Journal" />

      {/* Article Header */}
      <article className="px-6 pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/#stories" 
            className="inline-flex items-center gap-2 font-sans text-sm text-stone-400 hover:text-stone-600 transition-colors mb-10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stories
          </Link>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 mb-8">
            {post.title}
          </h1>

          {/* Author & Date */}
          {post.author && post.author.firstName && post.author.lastName && (
            <div className="flex items-center gap-4 pb-10 border-b border-stone-200">
              <Avatar person={post.author} date={post.date} />
            </div>
          )}
        </div>

        {/* Cover Image */}
        {post?.coverImage && (
          <div className="max-w-4xl mx-auto mt-12">
            <CoverImage image={post.coverImage} priority />
          </div>
        )}

        {/* Article Content */}
        {post.content?.length && (
          <div className="max-w-2xl mx-auto mt-12 md:mt-16">
            <PortableText 
              className="font-sans text-stone-700 leading-relaxed" 
              value={post.content as PortableTextBlock[]} 
            />
          </div>
        )}
      </article>

      {/* More Posts Section */}
      <div className="border-t border-stone-200 bg-stone-100/50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Suspense>
            {await MorePosts({skip: post._id, limit: 2})}
          </Suspense>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-16 md:py-20 border-t border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <Link href="/" className="font-serif text-xl text-stone-900 hover:text-stone-600 transition-colors">
              Journal
            </Link>
            <p className="font-sans text-stone-500 leading-relaxed max-w-sm mt-4">
              A personal project exploring travel through stories,
              city guides, and curated inspiration.
            </p>
          </div>
          <p className="font-sans text-sm text-stone-400">
            &copy; World Wide Wanderer
          </p>
        </div>
      </footer>
    </div>
  )
}
