import {Footer} from '@/components/footer'
import {Header} from '@/components/header'

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
