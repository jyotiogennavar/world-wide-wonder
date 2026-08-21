import type {Metadata} from 'next'

import {getPage, getPageForMetadata, getPageSlugs, PageBuilder, PageOnboarding} from '@/features/page'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  return getPageSlugs()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const page = await getPageForMetadata(params.slug)

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const page = await getPage(params.slug)

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              {page.heading}
            </h2>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
              {page.subheading}
            </p>
          </div>
        </div>
      </div>
      <PageBuilder page={page} />
    </div>
  )
}
