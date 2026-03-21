import { useState } from 'react'
import './App.css'

type Flashcard = {
  question: string
  answer: string
  detailedAns: string
}

const flashcards: Flashcard[] = [
  {
    question: 'Smart vs Dumb Components?',
    answer: 'Smart = logic/state, Dumb = UI',
    detailedAns:
      'Smart (container) components handle state, API calls, and business logic. Dumb (presentational) components only render UI based on props. Modern React replaces this pattern with hooks.',
  },
  {
    question: 'State colocation vs global state?',
    answer: 'Keep state local unless shared widely',
    detailedAns:
      'State colocation means keeping state close to where it’s used for better performance and simplicity. Global state is used when multiple distant components need access (e.g., auth, cart). Start local, move global only when needed.',
  },
  {
    question: 'When to use local state vs Context vs Redux?',
    answer: 'Local → Context → Redux (increasing scale)',
    detailedAns:
      'Use local state for component-specific logic. Use Context to avoid prop drilling for shared but simple state. Use Redux (or similar) for complex, global, highly interactive state requiring predictability.',
  },
  {
    question: 'What is code splitting?',
    answer: 'Split bundle into smaller chunks loaded on demand',
    detailedAns:
      'Code splitting reduces initial bundle size by loading parts of the app only when needed using dynamic imports. Common strategies include route-based and component-based splitting.',
  },
  {
    question: 'Lazy loading?',
    answer: 'Load resources only when needed',
    detailedAns:
      'Lazy loading defers loading of images or components until they are needed (e.g., in viewport or on interaction). Improves performance and reduces unnecessary data usage.',
  },
  {
    question: 'Debounce vs Throttle?',
    answer: 'Debounce = after pause, Throttle = at intervals',
    detailedAns:
      'Debounce delays execution until user stops triggering events (good for search). Throttle ensures execution at fixed intervals (good for scroll).',
  },
  {
    question: 'What is virtualization?',
    answer: 'Render only visible items in large lists',
    detailedAns:
      'Virtualization (windowing) renders only the visible portion of a large dataset, reducing DOM nodes and improving performance. Common in feeds, chats, and large tables.',
  },
  {
    question: 'Avoiding unnecessary re-renders?',
    answer: 'Memoization + state colocation',
    detailedAns:
      'Use React.memo, useMemo, useCallback, and colocate state to reduce render scope. Avoid passing new object/function references and split components effectively.',
  },
  {
    question: 'REST vs GraphQL?',
    answer: 'REST = multiple endpoints, GraphQL = flexible query',
    detailedAns:
      'REST uses fixed endpoints and responses, often leading to over/under-fetching. GraphQL allows clients to request exactly what they need but adds backend complexity.',
  },
  {
    question: 'What are N+1 queries?',
    answer: '1 query + N additional queries for related data',
    detailedAns:
      'Occurs when fetching a list and then querying related data per item, leading to performance issues. Solved using batching (DataLoader) or joins.',
  },
  {
    question: 'SWR vs React Query?',
    answer: 'SWR = simple stale-while-revalidate, React Query = powerful',
    detailedAns:
      'Both handle server state caching. SWR is lightweight and simple. React Query offers advanced features like cache invalidation, retries, mutations, and devtools.',
  },
  {
    question: 'Pagination vs Infinite Scroll?',
    answer: 'Pagination = pages, Infinite = continuous loading',
    detailedAns:
      'Pagination is structured and SEO-friendly. Infinite scroll improves engagement but needs optimization (virtualization, cursor-based pagination).',
  },
  {
    question: 'Loading, Error, Empty states?',
    answer: 'Handle all 3 for good UX',
    detailedAns:
      'Loading → skeletons/spinners, Error → retry + message, Empty → helpful guidance. These states improve UX and reliability of data-driven apps.',
  },
  {
    question: 'IndexedDB vs LocalStorage?',
    answer: 'IndexedDB = large async DB, LocalStorage = small sync store',
    detailedAns:
      'LocalStorage is synchronous and limited (~5MB). IndexedDB is asynchronous, supports large structured data, and is ideal for offline-first apps.',
  },
  {
    question: 'Service Workers?',
    answer: 'Background scripts for caching and offline support',
    detailedAns:
      'Service workers intercept network requests, enable caching strategies, offline functionality, push notifications, and background sync.',
  },
  {
    question: 'Background Sync?',
    answer: 'Retry failed requests when back online',
    detailedAns:
      'Allows apps to queue failed requests (e.g., messages) and retry them when connectivity is restored, ensuring reliability.',
  },
  {
    question: 'Conflict resolution strategies?',
    answer: 'Resolve offline data conflicts',
    detailedAns:
      'Includes last-write-wins, versioning, merging, or CRDTs. Used in offline-first apps when multiple updates conflict.',
  },
  {
    question: 'JWT vs Session auth?',
    answer: 'JWT = stateless, Session = stateful',
    detailedAns:
      'Sessions store data on server, easy to revoke. JWTs are stateless and scalable but harder to invalidate. Often combined with refresh tokens.',
  },
  {
    question: 'Refresh token flow?',
    answer: 'Short-lived access + long-lived refresh token',
    detailedAns:
      'Access tokens expire quickly. Refresh tokens are used to get new access tokens without forcing re-login, improving UX and security.',
  },
  {
    question: 'Cookies vs LocalStorage (security)?',
    answer: 'Cookies (HTTP-only) are safer',
    detailedAns:
      'LocalStorage is vulnerable to XSS. HTTP-only cookies prevent JS access and are safer for storing tokens, though require CSRF protection.',
  },
  {
    question: 'XSS vs CSRF?',
    answer: 'XSS = inject JS, CSRF = fake requests',
    detailedAns:
      'XSS executes malicious scripts (prevent via sanitization, CSP). CSRF tricks browser into sending requests (prevent via SameSite cookies, CSRF tokens).',
  },
  {
    question: 'CSR vs SSR vs SSG vs ISR?',
    answer: 'Different rendering strategies',
    detailedAns:
      'CSR renders in browser, SSR on server per request, SSG at build time, ISR updates static pages incrementally. Choose based on SEO and data freshness.',
  },
  {
    question: 'Hydration?',
    answer: 'Attach JS to server-rendered HTML',
    detailedAns:
      'Hydration makes static HTML interactive by attaching event listeners. Must avoid mismatches between server and client render.',
  },
  {
    question: 'Webpack vs Vite?',
    answer: 'Webpack bundles, Vite uses native ES modules',
    detailedAns:
      'Webpack builds full bundles upfront. Vite serves modules via native ES modules in dev and bundles for production, resulting in faster dev experience.',
  },
  {
    question: 'Tree shaking?',
    answer: 'Remove unused code from bundle',
    detailedAns:
      'Uses ES module static analysis to eliminate unused exports, reducing bundle size and improving performance.',
  },
  {
    question: 'Asset optimization?',
    answer: 'Optimize images, JS, CSS',
    detailedAns:
      'Includes compression, minification, caching, CDN usage, and using modern formats like WebP/AVIF to improve performance.',
  },
  {
    question: 'WebSockets vs Polling?',
    answer: 'Polling = repeated requests, WebSockets = persistent connection',
    detailedAns:
      'Polling is simple but inefficient. WebSockets allow real-time bidirectional communication and are ideal for chat or live updates.',
  },
  {
    question: 'Event-driven UI?',
    answer: 'UI updates based on events',
    detailedAns:
      'Instead of polling, UI reacts to events (e.g., WebSocket messages), enabling real-time updates and better performance.',
  },
  {
    question: 'Handling reconnections?',
    answer: 'Retry with backoff + sync state',
    detailedAns:
      'Use exponential backoff, heartbeats, message queues, and state resync to handle dropped connections in real-time apps.',
  },
  {
    question: 'Unit vs Integration vs E2E?',
    answer: 'Unit = small, Integration = combined, E2E = full flow',
    detailedAns:
      'Unit tests isolate logic, integration tests verify interactions, and E2E tests simulate real user flows. Follow the testing pyramid.',
  },
  {
    question: 'Jest vs RTL vs Cypress?',
    answer: 'Jest = runner, RTL = component testing, Cypress = E2E',
    detailedAns:
      'Jest runs tests and provides assertions. React Testing Library tests UI behavior. Cypress tests full user journeys in a browser.',
  },
  {
    question: 'Hooks-based abstraction?',
    answer: 'Extract logic into reusable hooks',
    detailedAns:
      'Custom hooks encapsulate logic and replace large container components, improving reusability and code clarity.',
  },
  {
    question: 'Microfrontends?',
    answer: 'Split frontend into independent apps',
    detailedAns:
      'Each team owns a part of the frontend, enabling independent development and deployment. Used in large-scale systems.',
  },
  {
    question: 'Module Federation?',
    answer: 'Load remote code at runtime',
    detailedAns:
      'Webpack feature enabling microfrontends by dynamically loading components from other apps at runtime without redeploying the host.',
  },
]

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [detailsOpen, setDetailsOpen] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  const toggleDetails = (index: number) => {
    setDetailsOpen((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <main className="flashcards-shell">
      <h1>React / Frontend Flashcards</h1>
      <section className="flashcards-container">
        {flashcards.map((card, index) => {
          const cardOpen = openIndex === index
          const cardDetailsOpen = detailsOpen.has(index)

          return (
            <article key={index} className={`flashcard ${cardOpen ? 'open' : ''}`}>
              <button
                className="flashcard-question"
                onClick={() => toggleCard(index)}
                aria-expanded={cardOpen}
              >
                <span>{card.question}</span>
                <span className="arrow">{cardOpen ? '▾' : '▸'}</span>
              </button>

              {cardOpen && (
                <div className="flashcard-answer-area">
                  <p className="flashcard-answer">{card.answer}</p>
                  <button
                    className="details-toggle"
                    onClick={() => toggleDetails(index)}
                    aria-expanded={cardDetailsOpen}
                  >
                    {cardDetailsOpen ? 'Hide details' : 'Show details'}
                  </button>
                  {cardDetailsOpen && (
                    <div className="flashcard-detailed">{card.detailedAns}</div>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}

export default App
