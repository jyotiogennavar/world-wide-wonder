# Next.js + Sanity Project Rules

## Core Principles

* Organize code by scalability needs, not by trends.
* Start simple and evolve the structure only when complexity demands it.
* Prefer clear ownership and boundaries over clever abstractions.
* Keep implementation details private.
* Reusable logic belongs in shared layers.
* Feature-specific logic stays inside the feature.
* Keep external systems isolated from application code.
* Prefer Server Components by default.
* Keep Client Components as small and localized as possible.
* Avoid deep nesting.
* Favor consistency over perfection.
* Do not introduce architectural layers speculatively.
* Optimize for maintainability, discoverability, and clear ownership.

---

# 1. General Folder Structure Philosophy

## Start Small

Small projects can begin with:

```txt
src/
```

or:

```txt
src/app/
```

Do not introduce `features/`, `domains/`, or monorepo structures until the application actually needs them.

Architecture should evolve with complexity.

---

# 2. Recommended Project Layers

A typical Next.js + Sanity application should conceptually follow:

```txt
Next.js Routes
      ↓
Features / Domain
      ↓
Sanity Data Layer
      ↓
Sanity CMS
```

Shared UI and utilities remain independent:

```txt
components/
hooks/
utils/
lib/
```

A practical structure:

```txt
src/
  app/
  components/
  features/
  sanity/
  hooks/
  utils/
  lib/
  providers/
  config/
  types/
```

Not every project needs every folder.

---

# 3. Component Rules

## Single Responsibility

A component should solve one clear UI concern.

Split large components when they:

* become difficult to scan
* contain unrelated responsibilities
* contain independent logic
* are reused
* have independent tests, styles, or types

Do not extract tiny components simply to reduce line count.

Avoid abstractions created only because something *might* be reused later.

---

# 4. Server vs Client Components

## Default to Server Components

Components should remain Server Components unless they require client-side behavior.

Use Client Components only when they require:

* `useState`
* `useEffect`
* event handlers
* browser APIs
* client-side subscriptions
* client-only libraries
* interactive UI state

Avoid adding:

```ts
"use client";
```

unless it is necessary.

## Keep Client Boundaries Small

Prefer:

```txt
Server Component
  ├── Server Component
  ├── Server Component
  └── Client Component
```

over making an entire page a Client Component.

Do not add `"use client"` to a parent merely because one child requires it.

## Data Fetching

Prefer fetching CMS data in Server Components or server-side application code.

Do not fetch public Sanity content in the browser unless there is a specific requirement.

---

# 5. Naming Conventions

## Folder Naming

Use:

```txt
kebab-case
```

Examples:

```txt
project-list/
customer-detail/
portable-text/
blog-post/
```

## File Naming

Use concise descriptive names:

```txt
component.tsx
hooks.ts
utils.ts
constants.ts
types.ts
actions.ts
queries.ts
```

Use explicit names when they improve discoverability:

```txt
project-list.tsx
project-list.test.ts
project-list.module.css
```

## Singular vs Plural

Use singular names for individual features/components:

```txt
feature/project/
feature/customer/
feature/post/
```

Use plural names for collections:

```txt
components/
hooks/
utils/
features/
queries/
```

---

# 6. Component Folder Structure

Preferred structure:

```txt
components/
  button/
    index.ts
    component.tsx
    test.tsx
    style.module.css
```

Optional files should only be added when necessary:

```txt
hooks.ts
stories.ts
constants.ts
utils.ts
types.ts
```

Avoid creating empty or unnecessary files merely to follow a template.

---

# 7. Public API Rules

Meaningful architectural boundaries should expose a public API.

Example:

```ts
export { Button } from "./component";
```

Consumers should use:

```ts
import { Button } from "@/components/button";
```

Avoid:

```ts
import { Button } from "@/components/button/component";
```

Public APIs are particularly important for:

* features
* reusable components
* shared packages
* domain boundaries

They are not mandatory for every tiny folder.

---

# 8. Nesting Rules

Avoid unnecessary nesting.

Preferred:

```txt
features/
  blog/
    components/
```

Avoid excessive structures such as:

```txt
features/
  blog/
    content/
      presentation/
        components/
          cards/
```

Two levels of nesting is a guideline, not a hard restriction.

Exceptions are allowed when the additional structure represents a meaningful architectural boundary.

---

# 9. Shared Technical Folders

Use shared folders only for genuinely cross-feature functionality:

```txt
components/
hooks/
utils/
lib/
providers/
config/
types/
```

Do not move feature-specific code into these folders merely because the folder already exists.

---

# 10. Feature-Based Architecture

Use feature-based architecture when the application contains meaningful domains.

Example:

```txt
features/
  blog/
    components/
    queries/
    actions/
    hooks/
    utils/
    types.ts
    index.ts

  contact/
    components/
    actions/
    types.ts
    index.ts
```

A feature may own:

* components
* hooks
* queries
* actions
* types
* constants
* utilities
* domain-specific logic

Do not create every subfolder by default.

---

# 11. Feature Ownership

A feature owns its implementation details.

Example:

```txt
features/blog/
  components/
  queries/
  hooks/
  utils/
  types.ts
```

Keep feature-specific logic inside the feature.

If a utility is used only by the blog feature, prefer:

```txt
features/blog/utils/
```

over:

```txt
utils/
```

---

# 12. Reusable UI Components

Only generic UI belongs in:

```txt
components/
```

Examples:

```txt
button/
input/
modal/
card/
dropdown/
container/
```

Generic components should not know about:

* Sanity
* blog-specific data
* business-specific entities
* feature-specific state

Feature-specific UI stays inside the feature.

Good:

```txt
components/button/
```

Good:

```txt
features/blog/components/post-card/
```

Avoid:

```txt
components/blog-post-card/
```

if the component is only meaningful to the blog feature.

---

# 13. Dependency Rules

Dependency direction should generally flow toward higher-level application composition.

```txt
Shared Infrastructure
        ↓
Sanity / External Data
        ↓
Features / Domain
        ↓
Routes / Pages
```

Shared UI must remain independent:

```txt
components/
  ↓
features/
```

A shared component must not import a feature.

Bad:

```txt
components/button/
  ↓
features/blog/
```

Good:

```txt
features/blog/
  ↓
components/button/
```

---

# 14. Feature-to-Feature Dependencies

Features should avoid importing implementation details from other features.

Bad:

```ts
import { InternalHook } from "@/features/blog/hooks/internal";
```

If interaction is required, prefer:

1. a public feature API
2. shared logic moved to an appropriate shared layer
3. composition at the route/application level

Public APIs are allowed:

```ts
import { AuthorAvatar } from "@/features/author";
```

The goal is to prevent hidden implementation coupling, not to prohibit all relationships between features.

---

# 15. Route Rules

Use:

```txt
src/app/
```

for Next.js routes.

Routes should primarily compose application capabilities.

Example:

```txt
app/
  blog/
    page.tsx
    [slug]/
      page.tsx
```

A route can import:

```ts
import { PostList } from "@/features/blog";
```

Avoid burying reusable feature logic inside route-specific folders.

---

# 16. Route-Local Components

Not every route requires a feature.

Simple pages can contain route-local components.

Example:

```txt
app/
  about/
    page.tsx
    about-content.tsx
```

Do not create:

```txt
features/about/
```

unless the page has meaningful reusable logic, domain behavior, or multiple related screens.

---

# 17. Import Rules

Prefer absolute imports:

```ts
import { Button } from "@/components/button";
```

Avoid:

```ts
import { Button } from "../../../components/button";
```

Use the project's configured import alias consistently.

---

# 18. Sanity Architecture

Sanity-specific implementation should remain isolated from the rest of the application.

Recommended:

```txt
src/
  sanity/
    schemas/
    queries/
    lib/
    types/
    components/
    structure.ts
```

Example:

```txt
sanity/
  schemas/
    post.ts
    author.ts
    category.ts

  queries/
    posts.ts
    categories.ts

  lib/
    client.ts
    image.ts
    fetch.ts

  types/
    generated.ts

  components/
    portable-text/
```

The application should not need to know how the Sanity client is configured internally.

---

# 19. Sanity Schemas

Sanity schemas belong exclusively in:

```txt
sanity/schemas/
```

Schemas should describe CMS content models.

Example:

```txt
sanity/schemas/
  post.ts
  author.ts
  category.ts
```

Do not place Sanity schema definitions inside React features.

---

# 20. Sanity Types vs Application Types

Sanity document types and application/domain types are separate concepts.

Sanity types describe the CMS representation.

Application types describe what the application consumes.

Example:

```txt
Sanity document
      ↓
validation / mapping
      ↓
application type
      ↓
UI
```

Do not allow Sanity-specific implementation fields to spread unnecessarily throughout the application.

Examples of CMS-specific fields include:

```txt
_id
_type
_rev
_createdAt
_updatedAt
_key
```

Generated Sanity types should be preferred where practical.

Do not manually duplicate generated CMS types without a reason.

---

# 21. External Data Boundary

External data should not leak throughout the application.

For external data sources:

```txt
External System
      ↓
Fetch
      ↓
Validate
      ↓
Transform
      ↓
Application
      ↓
UI
```

This applies to:

* Sanity
* REST APIs
* databases
* third-party services

Keep external implementation details at the boundary.

---

# 22. GROQ Query Rules

Keep GROQ queries out of UI components.

Prefer:

```txt
sanity/
  queries/
    posts.ts
```

or, when the query is tightly feature-specific:

```txt
features/
  blog/
    queries/
      get-post.ts
```

Rules:

* Keep queries named and discoverable.
* Keep projections explicit.
* Query only fields required by the consumer.
* Avoid large inline GROQ strings inside React components.
* Use parameters instead of interpolating user input.
* Reuse query fragments only when duplication is meaningful.
* Keep Sanity-specific query logic out of generic components.

---

# 23. Query Ownership

Use the following guideline:

### Sanity-wide query

Put it in:

```txt
sanity/queries/
```

when it represents a reusable CMS query.

### Feature-specific query

Put it in:

```txt
features/blog/queries/
```

when it represents application-specific behavior.

Do not create both layers automatically.

Start with one layer and introduce another only when the separation provides value.

---

# 24. Data Fetching Rules

Prefer server-side data fetching for CMS content.

A typical flow:

```txt
Next.js Server Component
        ↓
Feature Query
        ↓
Sanity Query
        ↓
Sanity Client
```

Avoid:

```txt
Client Component
        ↓
Browser
        ↓
Sanity API
```

unless client-side fetching is explicitly required.

---

# 25. Sanity Images

Sanity image handling belongs in the Sanity layer.

Example:

```txt
sanity/
  lib/
    image.ts
```

Rules:

* Use Sanity's image URL builder.
* Do not manually construct Sanity asset URLs in components.
* Use `next/image` where appropriate.
* Request appropriate image dimensions.
* Avoid loading original-resolution images when unnecessary.
* Define cropping and hotspot behavior intentionally.
* Keep image transformation logic out of generic UI components.

---

# 26. Portable Text

Sanity Portable Text rendering is a CMS-specific concern.

Keep it inside:

```txt
sanity/
  components/
    portable-text/
```

Example:

```txt
portable-text/
  portable-text.tsx
  serializers.ts
```

Generic UI components should not depend on Portable Text internals.

---

# 27. CMS Caching and Revalidation

Every CMS query should have an intentional rendering and caching strategy.

Determine whether content should be:

* statically rendered
* cached
* revalidated
* dynamically rendered
* fetched in draft mode

Do not make all Sanity requests dynamic by default.

Typical content:

```txt
Published article
→ cached / revalidated

Blog index
→ cached / revalidated

Draft preview
→ draft / uncached

Studio
→ separate application concern
```

Caching decisions should be documented when they are not obvious.

---

# 28. Draft and Preview Content

Draft content must be explicitly separated from published content.

Rules:

* Published pages should use the published Sanity client.
* Draft/preview content should use an explicitly configured draft client.
* Preview mode must not leak into normal production rendering.
* Preview-specific utilities should remain isolated.
* Draft credentials must never be exposed to browser code.
* Draft content should never accidentally become publicly cacheable.

---

# 29. Sanity Studio

If Sanity Studio is embedded in the Next.js application, treat Studio as infrastructure rather than a normal feature.

Example:

```txt
app/
  studio/
    [[...tool]]/
      page.tsx

sanity/
  schemas/
  structure.ts
  lib/
```

Do not place Studio-specific implementation inside:

```txt
features/
```

unless Studio itself becomes a genuine product domain.

---

# 30. Server-Only Code

Server-only functionality must remain on the server.

Examples:

* Sanity write clients
* Sanity tokens
* database credentials
* private API keys
* server actions
* privileged integrations

Never expose secrets through:

```txt
NEXT_PUBLIC_*
```

Only variables genuinely required by browser code should use the `NEXT_PUBLIC_` prefix.

---

# 31. Environment Variables

Environment access should be centralized where practical.

Example:

```txt
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_VERSION
SANITY_API_TOKEN
```

Rules:

* Validate required environment variables.
* Keep server secrets server-side.
* Never expose API tokens to Client Components.
* Do not scatter environment access throughout unrelated application code.
* Prefer a dedicated environment configuration module.

---

# 32. `lib/` vs `utils/`

Keep these concepts distinct.

## `lib/`

Contains infrastructure and integrations.

Examples:

```txt
lib/
  auth/
  database/
  analytics/
```

## `utils/`

Contains small, reusable, framework-independent functions.

Examples:

```txt
utils/
  format-currency.ts
  format-date.ts
  slugify.ts
```

Do not use either folder as a generic dumping ground.

Sanity-specific infrastructure should preferably remain inside:

```txt
sanity/lib/
```

rather than:

```txt
utils/sanity.ts
```

---

# 33. Hooks

## Local Hooks

Hooks used by one feature/component stay local.

```txt
features/blog/hooks/
```

## Shared Hooks

Hooks used by multiple unrelated features move to:

```txt
src/hooks/
```

Do not promote a hook to the shared layer based only on anticipated reuse.

---

# 34. Utils

## Feature Utils

If one feature uses a utility:

```txt
features/blog/utils/
```

## Shared Utils

If multiple features genuinely use it:

```txt
src/utils/
```

Promotion should happen when reuse is demonstrated.

Demote utilities back into features when they are no longer shared.

---

# 35. Actions and Mutations

Server Actions should be used only when appropriate.

Keep feature-specific mutations inside:

```txt
features/
  blog/
    actions/
```

Examples:

```txt
create-post-action.ts
update-post-action.ts
delete-post-action.ts
```

Sanity-specific mutation implementation should remain behind the Sanity/data boundary where practical.

Do not expose Sanity write clients directly to UI components.

---

# 36. Styling Rules

## Tailwind

If using Tailwind:

* styles may live directly in components
* avoid unnecessary CSS files
* extract repeated patterns only when they represent meaningful reusable UI

## CSS Modules

Use:

```txt
style.module.css
```

when local CSS scoping is required.

Avoid creating separate style files for trivial components without a reason.

---

# 37. Testing Rules

Keep tests close to implementation.

Example:

```txt
button/
  component.tsx
  test.tsx
```

Feature tests:

```txt
features/blog/
  queries/
  utils/
  tests/
```

Shared testing utilities belong in:

```txt
testing/
```

Test:

* business logic
* transformations
* validation
* important data-fetching behavior
* complex UI behavior

Do not write tests solely to increase coverage numbers.

---

# 38. Query and Action Naming

Use descriptive names.

Queries:

```txt
get-post.ts
get-posts.ts
get-featured-posts.ts
```

Actions:

```txt
create-post-action.ts
update-post-action.ts
delete-post-action.ts
```

Avoid generic names such as:

```txt
fetch.ts
data.ts
handler.ts
service.ts
```

when a more specific name is available.

---

# 39. Relations and Cross-Domain Logic

Do not create a `relations/` directory by default.

When features need to interact:

1. compose at the route/application level
2. use a public feature API
3. move genuinely shared logic upward
4. introduce explicit relation modules only when cross-domain complexity justifies them

Avoid creating architecture for relationships that are currently simple.

---

# 40. Domain Layer

For very large applications, introduce domains only when clear business boundaries exist.

Example:

```txt
src/
  domains/
    content/
      features/
        blog/
        author/

    workspace/
      features/
        project/
        customer/
```

Domains should remain isolated.

Cross-domain functionality should move into:

```txt
core/
```

or shared packages only when the dependency is genuinely cross-domain.

Do not introduce `domains/` for a small or medium application without a clear need.

---

# 41. Package Layer

For monorepos:

```txt
packages/
  shared/
  eslint-config/
  typescript-config/
```

Packages should:

* expose stable APIs
* avoid application-specific logic
* avoid depending on applications
* have clear ownership
* contain only code that benefits from package-level reuse

Do not create packages merely to reorganize folders.

---

# 42. Multi-App Monorepo

For multiple applications:

```txt
apps/
  web/
  admin/
  studio/

domains/
packages/
```

Apps may depend on:

```txt
domains/
packages/
```

Domains may depend on:

```txt
packages/
core/
```

Packages must not depend on applications.

Only introduce this structure when multiple applications actually exist.

---

# 43. Dependency Boundaries

The most important rule is:

> Depend on public interfaces, not implementation details.

Good:

```ts
import { PostCard } from "@/features/blog";
```

Avoid:

```ts
import { PostCard } from "@/features/blog/components/post-card/internal";
```

Good:

```ts
import { Button } from "@/components/button";
```

Avoid:

```ts
import { Button } from "@/components/button/component";
```

Good:

```txt
Feature
  ↓
Sanity abstraction
```

Avoid:

```txt
UI component
  ↓
Sanity client
```

---

# 44. Feature Deletion Test

A feature should be removable with minimal unrelated breakage.

If deleting:

```txt
features/blog/
```

breaks unrelated UI, utilities, or infrastructure, investigate the dependency boundary.

Some intentional application-level composition is acceptable.

The goal is to detect accidental coupling.

---

# 45. Architecture Evolution

Use this growth path as a guideline.

## Small App

```txt
src/
  app/
  components/
  sanity/
  lib/
```

## Medium App

```txt
src/
  app/
  components/
  features/
  sanity/
  hooks/
  utils/
  lib/
```

## Large App

```txt
src/
  app/
  features/
  domains/
  sanity/
  components/
  lib/
```

## Enterprise / Monorepo

```txt
apps/
domains/
packages/
```

Do not jump directly to enterprise architecture.

---

# 46. Decision Guidelines

## Put Code in Shared Layers When

* multiple features use it
* behavior is stable
* it is genuinely generic
* ownership is obvious
* moving it reduces duplication

## Keep Code Local When

* only one feature uses it
* requirements are still evolving
* behavior is domain-specific
* reuse is speculative
* moving it would make ownership less obvious

---

# 47. Avoid Premature Abstraction

Do not create abstractions solely because:

* two components look similar
* code could theoretically be reused
* a folder structure appears more "enterprise"
* a pattern is popular
* a library recommends it

Prefer duplication over the wrong abstraction when requirements are still evolving.

Refactor when the shared behavior becomes clear.

---

# 48. Consistency Rules

* Keep naming conventions consistent.
* Keep folder structures predictable.
* Avoid mixing architectural styles randomly.
* Keep external integrations behind clear boundaries.
* Prefer Server Components.
* Keep Client Components focused.
* Keep Sanity-specific code inside the Sanity layer.
* Keep feature-specific code inside features.
* Keep generic UI independent of business domains.
* Avoid unnecessary architectural layers.
* Optimize for discoverability and maintainability.
* Prefer boring consistency over creative structure.

---

# 49. Recommended Default Structure

For a typical Next.js + Sanity application:

```txt
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   │
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx
│
├── components/
│   ├── button/
│   ├── card/
│   ├── container/
│   ├── header/
│   └── footer/
│
├── features/
│   └── blog/
│       ├── components/
│       ├── queries/
│       ├── actions/
│       ├── hooks/
│       ├── utils/
│       ├── types.ts
│       └── index.ts
│
├── sanity/
│   ├── schemas/
│   │   ├── post.ts
│   │   ├── author.ts
│   │   └── category.ts
│   │
│   ├── queries/
│   │   ├── posts.ts
│   │   └── categories.ts
│   │
│   ├── lib/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── fetch.ts
│   │
│   ├── types/
│   │   └── generated.ts
│   │
│   ├── components/
│   │   └── portable-text/
│   │
│   └── structure.ts
│
├── hooks/
├── utils/
├── lib/
├── providers/
├── config/
└── types/
```

For a smaller project, simplify this rather than creating empty directories.

---

# 50. Final Rule

The architecture should evolve naturally with project complexity.

A good Next.js + Sanity architecture should:

* make ownership obvious
* isolate Sanity from application code
* keep CMS schemas separate from application concerns
* keep external data behind clear boundaries
* prefer Server Components
* minimize Client Component boundaries
* keep reusable UI generic
* keep feature logic isolated
* make caching and preview behavior intentional
* support testing and refactoring
* avoid premature abstractions
* allow the project to scale without requiring a complete rewrite

The goal is not to have the most sophisticated folder structure.

The goal is to make it immediately obvious:

**where code belongs, who owns it, what it can depend on, and what should remain private.**
