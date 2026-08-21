import {createClient} from 'next-sanity'

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
} from '@/config/env'
import {token} from './token'

export const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: 'published',
  token,
  stega: {
    studioUrl: sanityStudioUrl,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})
