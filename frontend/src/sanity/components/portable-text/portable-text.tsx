import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'

import {ResolvedLink} from '@/sanity/components/resolved-link'

type PortableTextProps = {
  className?: string
  value: PortableTextBlock[]
}

export default function CustomPortableText({className, value}: PortableTextProps) {
  const components: PortableTextComponents = {
    block: {
      h1: ({children, value: block}) => (
        <h1
          id={block?._key}
          className="font-serif text-3xl md:text-4xl text-stone-900 mt-12 mb-6 leading-snug group relative"
        >
          {children}
          <a
            href={`#${block?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Link to this section"
          >
            <HeadingAnchorIcon />
          </a>
        </h1>
      ),
      h2: ({children, value: block}) => (
        <h2
          id={block?._key}
          className="font-serif text-2xl md:text-3xl text-stone-900 mt-10 mb-5 leading-snug group relative"
        >
          {children}
          <a
            href={`#${block?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Link to this section"
          >
            <HeadingAnchorIcon />
          </a>
        </h2>
      ),
      h3: ({children}) => (
        <h3 className="font-serif text-xl md:text-2xl text-stone-900 mt-8 mb-4 leading-snug">
          {children}
        </h3>
      ),
      normal: ({children}) => (
        <p className="font-sans text-stone-700 leading-[1.8] mb-6 text-base md:text-lg">
          {children}
        </p>
      ),
      blockquote: ({children}) => (
        <blockquote className="border-l-2 border-stone-300 pl-6 my-8 italic text-stone-600 font-serif text-lg md:text-xl leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul className="font-sans text-stone-700 leading-[1.8] mb-6 text-base md:text-lg list-disc pl-6 space-y-2">
          {children}
        </ul>
      ),
      number: ({children}) => (
        <ol className="font-sans text-stone-700 leading-[1.8] mb-6 text-base md:text-lg list-decimal pl-6 space-y-2">
          {children}
        </ol>
      ),
    },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
      strong: ({children}) => (
        <strong className="font-semibold text-stone-900">{children}</strong>
      ),
      em: ({children}) => <em className="italic">{children}</em>,
    },
  }

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  )
}

function HeadingAnchorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-stone-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  )
}
