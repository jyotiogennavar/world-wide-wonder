export default function Footer() {
  return (
    <footer id="about" className="border-t border-stone-200 scroll-mt-24">
      <div className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-8">
          <div>
            <h2 className="font-serif text-xl text-stone-900 mb-4">About</h2>
            <p className="font-sans text-stone-500 leading-relaxed max-w-sm">
              A personal project exploring travel through stories, city guides, and curated
              inspiration.
            </p>
          </div>
          <p className="font-sans text-sm text-stone-400">&copy; World Wide Wanderer</p>
        </div>
      </div>
      <div
        className="relative w-full max-w-5xl mx-auto overflow-hidden"
        style={{paddingBottom: '12%'}}
      >
        <img
          src="/images/footer-img.png"
          alt="Travel illustrations"
          className="absolute top-0 left-0 w-full h-auto object-contain"
        />
      </div>
    </footer>
  )
}
