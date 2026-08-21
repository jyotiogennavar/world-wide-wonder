import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Outfit, Source_Serif_4} from 'next/font/google'
import {draftMode} from 'next/headers'
import {toPlainText, VisualEditing} from 'next-sanity'
import {Toaster} from 'sonner'

import {DraftModeToast, handleSanityError, resolveOpenGraphImage} from '@/sanity'
import * as demo from '@/sanity/lib/demo'
import {SanityLive} from '@/sanity/lib/live'
import {getSettings} from '@/sanity/queries/settings'

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await getSettings()
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description
  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore invalid metadata base URLs
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const sourceSerif = Source_Serif_4({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en" className={`${sourceSerif.variable} ${outfit.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleSanityError} />
        <main>{children}</main>
        <SpeedInsights />
      </body>
    </html>
  )
}
