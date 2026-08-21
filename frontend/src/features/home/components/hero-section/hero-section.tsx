export default function HeroSection() {
  return (
    <section className="px-4 pt-8 pb-0 md:pt-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-stone-900 mb-8">
          Stories of places, people, and passing moments
        </h1>
        <p className="font-sans text-lg md:text-xl text-stone-500 leading-relaxed max-w-xl mx-auto">
          A personal travel journal shaped by slow cities, quiet cafés, missed trains, and the
          small details that make a place feel alive.
        </p>
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <img
          src="/images/hero-banner.png"
          alt="Travel illustrations - airplane, luggage, passport, and travel essentials"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  )
}
