import Link from 'next/link'
import {Image} from 'next-sanity/image'
import Navbar from '@/app/components/Navbar'
import {sanityFetch} from '@/sanity/lib/live'
import {featuredPostQuery, postsByCategoryQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import type {PostsByCategoryQueryResult} from '@/sanity.types'

// Post type extracted from the query result
type PostItem = NonNullable<PostsByCategoryQueryResult>[number]

// Featured post has the same shape as a regular post item
type FeaturedPost = PostItem | null

function getImageUrl(coverImage: PostItem['coverImage'], width?: number, height?: number) {
  if (!coverImage?.asset?._ref) return undefined
  let builder = urlForImage(coverImage)
  if (width) builder = builder?.width(width)
  if (height) builder = builder?.height(height)
  return builder?.url()
}

export default async function Page() {
  // Fetch all data in parallel
  const [featuredResult, storiesResult, cityGuidesResult, curatedListsResult] = await Promise.all([
    sanityFetch({query: featuredPostQuery}),
    sanityFetch({query: postsByCategoryQuery, params: {category: 'story'}}),
    sanityFetch({query: postsByCategoryQuery, params: {category: 'city-guide'}}),
    sanityFetch({query: postsByCategoryQuery, params: {category: 'curated-list'}}),
  ])

  const featuredPost = featuredResult.data as FeaturedPost
  const stories = storiesResult.data
  const cityGuides = cityGuidesResult.data
  const curatedLists = curatedListsResult.data

  return (
    <div className="min-h-screen">
      <Navbar title="World Wide Wanderer" />
      
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-0 md:pt-44 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 mb-8">
            Stories of places, people, and passing moments
          </h1>
          <p className="font-sans text-lg md:text-xl text-stone-500 leading-relaxed max-w-xl mx-auto">
            A personal travel journal shaped by slow cities, quiet cafés, missed trains,
            and the small details that make a place feel alive.
          </p>
        </div>
        {/* Hero Banner Image */}
        <div className="w-full max-w-5xl mx-auto">
          <img
            src="/images/hero-banner.png"
            alt="Travel illustrations - airplane, luggage, passport, and travel essentials"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Featured Story Section */}
      {featuredPost && (
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mb-8">
              Featured Story
            </p>
            <Link href={`/posts/${featuredPost.slug}`} className="group block">
              <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg">
                  {featuredPost.coverImage?.asset?._ref && (
                    <Image
                      src={getImageUrl(featuredPost.coverImage, 800, 600) || ''}
                      alt={featuredPost.coverImage?.alt || featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>
                <div className="py-4">
                  <h3 className="font-serif text-3xl md:text-4xl leading-snug text-stone-900 mb-5 group-hover:text-stone-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.excerpt && (
                    <p className="font-sans text-stone-500 leading-relaxed mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
                    Read the article &rarr;
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Stories Section */}
      {stories && stories.length > 0 && (
        <section id="stories" className="px-6 py-16 md:py-20 border-t border-stone-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl mb-14">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                Stories
              </h2>
              <p className="font-sans text-stone-500 text-lg">
                Personal narratives shaped by memory, emotion, and observation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {stories.filter((post) => post._id !== featuredPost?._id).map((post) => (
                <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-t-full rounded-b-md mb-5">
                      {post.coverImage?.asset?._ref && (
                        <Image
                          src={getImageUrl(post.coverImage, 400, 533) || ''}
                          alt={post.coverImage?.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-sans text-stone-500 text-sm leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
                      Read the article &rarr;
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* City Guides Section */}
      {cityGuides && cityGuides.length > 0 && (
        <section id="city-guides" className="px-6 py-16 md:py-20 border-t border-stone-200 bg-stone-100/50 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl mb-14">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                City Guides
              </h2>
              <p className="font-sans text-stone-500 text-lg">
                Thoughtful guides focused on how a city feels,
                not just what to see.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cityGuides.map((post) => (
                <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
                  <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
                    {post.coverImage?.asset?._ref && (
                      <Image
                        src={getImageUrl(post.coverImage, 600, 375) || ''}
                        alt={post.coverImage?.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md mb-2">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="font-sans text-sm text-amber-300 group-hover:text-amber-200 transition-colors drop-shadow-md">
                        Read the article &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curated Lists Section */}
      {curatedLists && curatedLists.length > 0 && (
        <section id="curated-lists" className="px-6 py-16 md:py-20 border-t border-stone-200 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl mb-14">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                Curated Lists
              </h2>
              <p className="font-sans text-stone-500 text-lg">
                Carefully collected places, themes,
                and experiences worth saving for later.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {curatedLists.map((post) => (
                <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg mb-5">
                      {post.coverImage?.asset?._ref && (
                        <Image
                          src={getImageUrl(post.coverImage, 400, 300) || ''}
                          alt={post.coverImage?.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-sans text-stone-500 text-sm leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="font-sans text-sm text-amber-700 group-hover:text-amber-800 transition-colors">
                      Read the article &rarr;
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="px-6 py-20 md:py-28 border-t border-stone-200 bg-stone-100/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
            Follow the Journey
          </h2>
          <p className="font-sans text-stone-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Subscribe to receive new stories, city guides, and curated travel inspiration 
            delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 font-sans text-stone-900 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-colors placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="px-6 py-3 font-sans text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="font-sans text-xs text-stone-400 mt-4">
            No spam, just meaningful travel stories.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-stone-200 scroll-mt-24">
        <div className="px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div>
              <h2 className="font-serif text-xl text-stone-900 mb-4">
                About
              </h2>
              <p className="font-sans text-stone-500 leading-relaxed max-w-sm">
                A personal project exploring travel through stories,
                city guides, and curated inspiration.
              </p>
            </div>
            <p className="font-sans text-sm text-stone-400">
              &copy; World Wide Wanderer
            </p>
          </div>
        </div>
        {/* Footer Image */}
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden" style={{ paddingBottom: '12%' }}>
          <img
            src="/images/footer-img.png"
            alt="Travel illustrations"
            className="absolute top-0 left-0 w-full h-auto object-contain"
          />
        </div>
      </footer>
    </div>
  )
}
