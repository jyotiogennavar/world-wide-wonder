export default function NewsletterCta() {
  return (
    <section
      id="subscribe"
      className="px-6 py-20 md:py-28 border-t border-stone-200 bg-stone-100/50 scroll-mt-28"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
          Follow the Journey
        </h2>
        <p className="font-sans text-stone-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Subscribe to receive new stories, city guides, and curated travel inspiration delivered
          to your inbox.
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
  )
}
