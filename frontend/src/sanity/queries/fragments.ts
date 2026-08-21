export const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

export const linkFields = /* groq */ `
  link {
    ...,
    ${linkReference}
  }
`
