import {FeaturedStory, HeroSection, NewsletterCta, PostCategorySection} from '@/features/home'
import {getFeaturedPost, getPostsByCategory} from '@/features/post'

export default async function Page() {
  const [featuredPost, stories, cityGuides, curatedLists] = await Promise.all([
    getFeaturedPost(),
    getPostsByCategory('story'),
    getPostsByCategory('city-guide'),
    getPostsByCategory('curated-list'),
  ])

  return (
    <>
      <HeroSection />
      <FeaturedStory post={featuredPost} />
      <PostCategorySection
        id="stories"
        title="Stories"
        description="Personal narratives shaped by memory, emotion, and observation."
        posts={stories}
        variant="story"
        excludePostId={featuredPost?.id}
      />
      <PostCategorySection
        id="city-guides"
        title="City Guides"
        description="Thoughtful guides focused on how a city feels, not just what to see."
        posts={cityGuides}
        variant="city-guide"
      />
      <PostCategorySection
        id="curated-lists"
        title="Curated Lists"
        description="Carefully collected places, themes, and experiences worth saving for later."
        posts={curatedLists}
        variant="curated-list"
      />
      <NewsletterCta />
    </>
  )
}
