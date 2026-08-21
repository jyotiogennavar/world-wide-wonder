import createImageUrlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'

import {sanityDataset, sanityProjectId} from '@/config/env'

type ImageCrop = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type ImageSource = {
  asset?: {_ref?: string} | null
  crop?: ImageCrop | null
  alt?: string | null
}

const imageBuilder = createImageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
})

export function urlForImage(source: ImageSource | null | undefined) {
  if (!source?.asset?._ref) {
    return undefined
  }

  const imageRef = source.asset._ref
  const crop = source.crop
  const {width, height} = getImageDimensions(imageRef)

  if (crop) {
    const croppedWidth = Math.floor(width * (1 - ((crop.right ?? 0) + (crop.left ?? 0))))
    const croppedHeight = Math.floor(height * (1 - ((crop.top ?? 0) + (crop.bottom ?? 0))))
    const left = Math.floor(width * (crop.left ?? 0))
    const top = Math.floor(height * (crop.top ?? 0))

    return imageBuilder.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format')
  }

  return imageBuilder.image(source).auto('format')
}

export function getImageUrl(
  source: ImageSource | null | undefined,
  width?: number,
  height?: number,
) {
  let builder = urlForImage(source)

  if (width) {
    builder = builder?.width(width)
  }

  if (height) {
    builder = builder?.height(height)
  }

  return builder?.url()
}

export function resolveOpenGraphImage(
  image: ImageSource | null | undefined,
  width = 1200,
  height = 627,
) {
  if (!image) {
    return undefined
  }

  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()

  if (!url) {
    return undefined
  }

  return {url, alt: image.alt ?? undefined, width, height}
}
