import {stegaClean} from '@sanity/client/stega'
import {getImageDimensions} from '@sanity/asset-utils'
import {Image} from 'next-sanity/image'

import type {PostImage} from '@/features/post/types'
import {urlForImage} from '@/sanity'

type CoverImageProps = {
  image: PostImage
  priority?: boolean
}

export default function CoverImage({image: source, priority}: CoverImageProps) {
  const image = source?.asset?._ref ? (
    <Image
      className="object-cover w-full h-full"
      width={getImageDimensions(source.asset._ref).width}
      height={getImageDimensions(source.asset._ref).height}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.width(1600).url() as string}
      priority={priority}
    />
  ) : null

  return <div className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">{image}</div>
}
