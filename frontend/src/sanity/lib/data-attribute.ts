import {createDataAttribute, type CreateDataAttributeProps} from 'next-sanity'

import {sanityDataset, sanityProjectId, sanityStudioUrl} from '@/config/env'

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    baseUrl: sanityStudioUrl,
  }).combine(config)
}
