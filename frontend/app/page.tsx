import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/app/components/Navbar'

export default function Page() {
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
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mb-8">
            Featured Story
          </p>
          <Link href="/posts/prague-winter" className="group block">
            <article className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg">
                <Image
                  src="/images/prague.jpg"
                  alt="Snow-dusted streets of Prague"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="py-4">
                <h3 className="font-serif text-3xl md:text-4xl leading-snug text-stone-900 mb-5 group-hover:text-stone-600 transition-colors">
                  A Winter Afternoon in Prague
                </h3>
                <p className="font-sans text-stone-500 leading-relaxed mb-6 text-lg">
                  Walking through snow-dusted streets, finding warmth in bookstores,
                  tram rides, and conversations that linger longer than planned.
                </p>
                <p className="font-sans text-sm text-stone-400">
                  Prague · 6 min read
                </p>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Stories Section */}
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
            <Link href="/posts/lisbon" className="group block">
              <article>
                <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/lisbon.jpg"
                    alt="Tiled walls and steep streets of Lisbon"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  Getting Lost in Lisbon
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  An afternoon without maps, guided only by tiled walls,
                  steep streets, and the smell of fresh bread.
                </p>
              </article>
            </Link>

            <Link href="/posts/kyoto" className="group block">
              <article>
                <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/kyoto.jpg"
                    alt="Temple bells and quiet morning in Kyoto"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  A Quiet Morning in Kyoto
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  Early walks, temple bells, and the beauty of a city
                  before it fully wakes.
                </p>
              </article>
            </Link>

            <Link href="/posts/mumbai" className="group block">
              <article>
                <div className="relative aspect-3/4 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/mumbai.jpg"
                    alt="Quiet moments in Mumbai"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  When Mumbai Slows Down
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  Finding stillness in a city known for movement,
                  noise, and constant urgency.
                </p>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* City Guides Section */}
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
            <Link href="/posts/paris-guide" className="group block">
              <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
                <Image
                  src="/images/paris.jpg"
                  alt="Cafés and bookshops of Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                    Paris: A Slow Weekend Guide
                  </h3>
                  <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md">
                    Cafés, bookshops, riverside walks,
                    and neighborhoods best explored without an agenda.
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/posts/jaipur-guide" className="group block">
              <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
                <Image
                  src="/images/jaipur.jpg"
                  alt="Local streets and craft corners of Jaipur"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                    Jaipur Beyond the Palaces
                  </h3>
                  <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md">
                    Local streets, craft corners,
                    and everyday moments that don't make it to postcards.
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/posts/berlin-guide" className="group block">
              <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
                <Image
                  src="/images/berlin.jpg"
                  alt="Studios and flea markets of Berlin"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                    Berlin for Creative Wanderers
                  </h3>
                  <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md">
                    Studios, flea markets, quiet museums,
                    and spaces that invite lingering.
                  </p>
                </div>
              </article>
            </Link>

            <Link href="/posts/rome-guide" className="group block">
              <article className="relative aspect-16/10 overflow-hidden bg-stone-200 rounded-lg">
                <Image
                  src="/images/rome.jpg"
                  alt="Espressos and evening walks in Rome"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-2 drop-shadow-lg">
                    Rome in Small Moments
                  </h3>
                  <p className="font-sans text-white/90 text-sm leading-relaxed drop-shadow-md">
                    Espressos at the bar, evening walks,
                    and the art of slowing down in a historic city.
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* Curated Lists Section */}
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
            <Link href="/posts/bookstores" className="group block">
              <article>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/bookstore.jpg"
                    alt="Independent bookstores around the world"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  Bookstores I'd Travel For
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  Independent bookstores around the world
                  that invite you to stay longer than planned.
                </p>
              </article>
            </Link>

            <Link href="/posts/writing-cafes" className="group block">
              <article>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/cafe.jpg"
                    alt="Quiet cafés made for writing"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  Cafés Made for Writing
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  Quiet corners, soft light,
                  and tables meant for notebooks and long coffees.
                </p>
              </article>
            </Link>

            <Link href="/posts/evening-walks" className="group block">
              <article>
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200 rounded-lg mb-5">
                  <Image
                    src="/images/walks.jpg"
                    alt="Evening walks in big cities"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2 group-hover:text-stone-600 transition-colors">
                  Evening Walks in Big Cities
                </h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">
                  Routes and neighborhoods best experienced after sunset.
                </p>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Newsletter */}
      <section className="px-6 py-20 md:py-28 border-t border-stone-200 bg-stone-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-6 leading-snug">
            Travel slowly. Save what inspires you.
          </h2>
          <p className="font-sans text-stone-400 leading-relaxed mb-10">
            Bookmark stories, return to guides,
            and revisit places through words and images.
          </p>
          
          {/* Newsletter Form */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 font-sans text-sm focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-stone-900 font-sans text-sm font-medium rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="font-sans text-stone-500 text-xs mt-4">
            Monthly stories and guides. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

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
