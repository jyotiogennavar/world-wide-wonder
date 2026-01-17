import Link from 'next/link'
import {Image} from 'next-sanity/image'
import Navbar from '@/app/components/Navbar'
import VintagePostcardCTA from '@/app/components/VintagePostcardCTA'
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
      <Navbar title="Journal" />
      
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 mb-8">
            Stories of places, people, and passing moments
          </h1>
          <p className="font-sans text-lg md:text-xl text-stone-500 leading-relaxed max-w-xl mx-auto">
            A personal travel journal shaped by slow cities, quiet cafés, missed trains,
            and the small details that make a place feel alive.
          </p>
        </div>
      </section>

      {/* Featured Story Section */}
      {featuredPost && (
        <section className="px-6 py-16 md:py-24">
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
                  <p className="font-sans text-sm text-stone-400">
                    {featuredPost.category === 'story' ? 'Story' : featuredPost.category === 'city-guide' ? 'City Guide' : 'Curated List'}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Stories Section */}
      {stories && stories.length > 0 && (
        <section id="stories" className="px-6 py-16 md:py-24 border-t border-stone-200 scroll-mt-24">
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
              {stories.map((post) => (
                <Link key={post._id} href={`/posts/${post.slug}`} className="group block">
                  <article>
                    <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-lg mb-5">
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
                      <p className="font-sans text-stone-500 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* City Guides Section */}
      {cityGuides && cityGuides.length > 0 && (
        <section id="city-guides" className="px-6 py-16 md:py-24 border-t border-stone-200 bg-stone-100/50 scroll-mt-24">
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
                        <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md">
                          {post.excerpt}
                        </p>
                      )}
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
        <section id="curated-lists" className="px-6 py-16 md:py-24 border-t border-stone-200 scroll-mt-24">
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
                      <p className="font-sans text-stone-500 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vintage Postcard CTA */}
      <VintagePostcardCTA />

      {/* Footer */}
      <footer id="about" className="px-6 py-16 md:py-20 border-t border-stone-200 scroll-mt-24">
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
      </footer>
    </div>
  )
}
