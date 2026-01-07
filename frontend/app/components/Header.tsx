import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import Navbar from './Navbar'

export default async function Header() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <Navbar title={settings?.title || 'Wanderlust Stories'} />
  )
}
