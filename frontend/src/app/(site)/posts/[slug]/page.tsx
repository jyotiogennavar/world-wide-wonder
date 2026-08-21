import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'
import Link from 'next/link'

import {Avatar, CoverImage, getPost, getPostForMetadata, getPostSlugs, MorePosts} from '@/features/post'
import {CustomPortableText, resolveOpenGraphImage} from '@/sanity'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  return getPostSlugs()
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const post = await getPostForMetadata(params.slug)
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
  const post = await getPost(params.slug)

  if (!post?.id) {
    return notFound()
  }

  return (
    <>
      <article className="px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-3xl mx-auto">
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

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 mb-8">
            {post.title}
          </h1>

          {post.author && post.author.firstName && post.author.lastName && (
            <div className="flex items-center gap-4 pb-10 border-b border-stone-200">
              <Avatar person={post.author} date={post.date} />
            </div>
          )}
        </div>

        {post.coverImage && (
          <div className="max-w-4xl mx-auto mt-12">
            <CoverImage image={post.coverImage} priority />
          </div>
        )}

        {post.content?.length ? (
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <CustomPortableText
              className="font-sans text-stone-700 leading-relaxed"
              value={post.content as PortableTextBlock[]}
            />
          </div>
        ) : null}
      </article>

      <div className="border-t border-stone-200 bg-stone-100/50">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <Suspense>{await MorePosts({skip: post.id, limit: 2})}</Suspense>
        </div>
      </div>
    </>
  )
}
