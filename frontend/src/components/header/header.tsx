'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

type HeaderProps = {
  title?: string
}

const navItems = [
  {href: '/#stories', label: 'Stories'},
  {href: '/#city-guides', label: 'City Guides'},
  {href: '/#curated-lists', label: 'Curated Lists'},
  {href: '/#about', label: 'About'},
]

function LogoPlaceholder() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 text-stone-900" aria-hidden="true">
      <circle cx="11" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Header({title = 'World Wide Wanderer'}: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleHashClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1]

    if (pathname === '/' && hash) {
      const element = document.getElementById(hash)
      if (element) {
        event.preventDefault()
        element.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }

    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="relative z-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
            <Link href="/" className="justify-self-start" aria-label="Home">
              <LogoPlaceholder />
            </Link>

            <Link
              href="/"
              className="font-serif text-xl tracking-tight text-stone-900 transition-colors hover:text-stone-600 md:text-2xl"
            >
              {title}
            </Link>

            <div className="flex items-center justify-end gap-3">
              <Link
                href="/#subscribe"
                onClick={(event) => handleHashClick(event, '/#subscribe')}
                className="hidden rounded-md bg-stone-900 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-stone-800 sm:inline-flex"
              >
                Subscribe
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`block h-0.5 w-6 bg-stone-900 transition-all duration-300 ${
                    mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-stone-900 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-stone-900 transition-all duration-300 ${
                    mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="hidden border-t border-stone-200/60 md:block">
            <div className="flex items-center justify-center gap-10 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleHashClick(event, item.href)}
                  className="font-sans text-sm text-stone-500 transition-colors hover:text-stone-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-stone-50 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleHashClick(event, item.href)}
              className={`font-serif text-3xl text-stone-900 transition-all duration-300 hover:text-stone-500 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#subscribe"
            onClick={(event) => handleHashClick(event, '/#subscribe')}
            className={`mt-4 rounded-md bg-stone-900 px-6 py-3 font-sans text-sm font-medium text-white transition-all duration-300 hover:bg-stone-800 ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{
              transitionDelay: mobileMenuOpen ? `${navItems.length * 75}ms` : '0ms',
            }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </>
  )
}
