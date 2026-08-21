import 'server-only'

import {sanityApiReadToken} from '@/config/env'

export const token = sanityApiReadToken

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}
