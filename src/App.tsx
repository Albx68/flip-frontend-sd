import { useState } from 'react'
import './App.css'

type Flashcard = {
  id: number
  question: string
  answer: string
  detailedAns: string
  topic: string
}

type BehavioralCard = {
  id: number
  question: string
  answer: string
  detailedAns: string
}

const behavioralRaw = [
  {
    question: 'Tell me about yourself',
    answer: 'Present → Past → Strength → Why',
    detailedAns:
      'Start with your current role and experience, then briefly mention past work, highlight your strengths (performance, system design, etc.), and end with what you\'re looking for. Keep it concise and impact-driven.',
  },
  {
    question: 'Tell me about a time you took ownership',
    answer: 'Strapi automation story',
    detailedAns:
      'Talk about reducing page creation time from 2+ days to under 2 minutes using Strapi CMS. Emphasize identifying a bottleneck, taking initiative, collaborating with stakeholders, and delivering business impact.',
  },
  {
    question: 'Tell me about your biggest impact',
    answer: 'Performance optimization story',
    detailedAns:
      'Discuss improving Lighthouse scores from 30–40 to 70+ and LPVR from 35–40 to 70+. Highlight leading a team, implementing code splitting, lazy loading, and tying performance improvements to business metrics.',
  },
  {
    question: 'Tell me about a time you handled ambiguity',
    answer: 'Smart ring / offline-first architecture',
    detailedAns:
      'Explain unclear requirements across hardware, firmware, and frontend. Show how you defined architecture, collaborated cross-functionally, and reduced latency from 2–4s to sub-500ms.',
  },
  {
    question: 'Tell me about leadership experience',
    answer: 'Led team of 5 engineers',
    detailedAns:
      'Describe leading a team for the smart ring module, defining architecture, coordinating across teams, and improving development velocity. Focus on enabling others, not just managing tasks.',
  },
  {
    question: 'Tell me about a failure',
    answer: 'Misdiagnosed performance issue',
    detailedAns:
      'Explain how you focused only on bundle size and missed runtime issues. Show how you corrected it using better state management and learned to take a holistic approach.',
  },
  {
    question: 'Tell me about a disagreement',
    answer: 'A/B testing tool story',
    detailedAns:
      'Describe conflict between product (speed) and engineering (stability). Show how you reframed the problem and built a browser-based experimentation tool to satisfy both sides.',
  },
  {
    question: 'Tell me about a tight deadline',
    answer: 'Performance before campaign',
    detailedAns:
      'Talk about improving performance under a business deadline. Highlight prioritization, focusing on high-impact fixes, and balancing speed vs perfection.',
  },
  {
    question: 'Tell me about stakeholder management',
    answer: 'Product vs engineering alignment',
    detailedAns:
      'Explain how you aligned product and engineering teams, communicated tradeoffs, and ensured both speed and stability through system design (e.g., experimentation tool).',
  },
  {
    question: 'Tell me about a technical tradeoff',
    answer: 'Offline-first vs API-driven',
    detailedAns:
      'Explain choosing offline-first architecture over API-driven approach for better latency. Discuss tradeoffs like complexity vs performance and why your decision worked.',
  },
  {
    question: 'What are your strengths?',
    answer: 'Performance + product thinking',
    detailedAns:
      'Highlight your ability to combine frontend performance, system design, and product impact. Mention real examples like improving LPVR and building growth systems.',
  },
  {
    question: 'What is your weakness?',
    answer: 'Over-optimizing technically',
    detailedAns:
      'Explain that you used to focus too much on technical optimization before validating impact. Show how you now balance engineering with product priorities.',
  },
  {
    question: 'Tell me about a time you worked cross-functionally',
    answer: 'Smart ring + hardware teams',
    detailedAns:
      'Describe working with hardware and firmware teams, aligning on data flow, and solving integration challenges.',
  },
  {
    question: 'Tell me about a time you improved a process',
    answer: 'Automation system',
    detailedAns:
      'Explain how you identified inefficiency in page creation and built a system to automate it, improving team productivity and speed.',
  },
  {
    question: 'How do you handle ambiguity?',
    answer: 'Break problem into parts',
    detailedAns:
      'Explain your approach: define constraints, talk to stakeholders, create initial architecture, iterate. Use smart ring example.',
  },
  {
    question: 'How do you prioritize work?',
    answer: 'Impact-driven prioritization',
    detailedAns:
      'Focus on business impact, user experience, and deadlines. Mention performance work where you prioritized high-impact optimizations.',
  },
  {
    question: 'How do you handle pressure?',
    answer: 'Focus on high-impact tasks',
    detailedAns:
      'Explain staying calm, breaking down tasks, and focusing on what moves metrics. Use performance deadline example.',
  },
  {
    question: 'Tell me about a time you learned something quickly',
    answer: 'AI voice prototype',
    detailedAns:
      'Discuss building a voice-based appointment system using Eleven Labs, learning new tools quickly and applying them to a real use case.',
  },
  {
    question: 'Tell me about a time you improved quality',
    answer: 'Testing + monitoring',
    detailedAns:
      'Explain introducing Jest, RTL, Cypress, and Sentry for reliability and production monitoring.',
  },
  {
    question: 'Tell me about a time you drove innovation',
    answer: 'A/B testing platform',
    detailedAns:
      'Show how you built a system enabling non-technical teams to run experiments, increasing velocity and innovation.',
  },
]

const behavioralCards: BehavioralCard[] = behavioralRaw.map((item, idx) => ({
  ...item,
  id: idx,
}))

const flashcardsRaw = [
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

const inferTopic = (question: string) => {
  const q = question.toLowerCase()
  if (q.includes('component')) return 'Components'
  if (q.includes('state')) return 'State'
  if (q.includes('performance') || q.includes('debounce') || q.includes('throttle') || q.includes('virtualization') || q.includes('lazy') || q.includes('code splitting') || q.includes('tree shaking') || q.includes('asset')) return 'Performance'
  if (q.includes('rest') || q.includes('graphql') || q.includes('n+1') || q.includes('swr') || q.includes('react query') || q.includes('pagination') || q.includes('infinite') || q.includes('loading') || q.includes('error') || q.includes('empty')) return 'Data'
  if (q.includes('indexeddb') || q.includes('service worker') || q.includes('background sync') || q.includes('conflict') || q.includes('jwt') || q.includes('cookies') || q.includes('xss') || q.includes('csrf')) return 'Security'
  if (q.includes('csr') || q.includes('ssr') || q.includes('ssg') || q.includes('isr') || q.includes('hydration') || q.includes('webpack') || q.includes('vite') || q.includes('microfrontend') || q.includes('module federation')) return 'Architecture'
  if (q.includes('websocket') || q.includes('polling') || q.includes('event-driven') || q.includes('reconnections')) return 'Realtime'
  if (q.includes('unit') || q.includes('integration') || q.includes('e2e') || q.includes('jest') || q.includes('rtl') || q.includes('cypress') || q.includes('hooks')) return 'Testing'
  return 'General'
}

const flashcards: Flashcard[] = flashcardsRaw.map((item, idx) => ({
  ...item,
  id: idx,
  topic: inferTopic(item.question),
}))

function App() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [detailsOpen, setDetailsOpen] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral'>('technical')

  const toggleCard = (id: number) => {
    setOpenIndex((prev) => (prev === id ? null : id))
  }

  const toggleDetails = (id: number) => {
    setDetailsOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const groupedFlashcards = flashcards.reduce<Record<string, Flashcard[]>>((acc, card) => {
    const key = card.topic || 'General'
    if (!acc[key]) acc[key] = []
    acc[key].push(card)
    return acc
  }, {})

  return (
    <main className="flashcards-shell">
      <h1>React / Frontend Flashcards</h1>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          Technical
        </button>
        <button
          className={`tab-button ${activeTab === 'behavioral' ? 'active' : ''}`}
          onClick={() => setActiveTab('behavioral')}
        >
          Behavioral
        </button>
      </div>

      {activeTab === 'technical' && (
        <section className="flashcards-container">
          {Object.entries(groupedFlashcards).map(([topic, cards]) => (
            <div key={topic} className="topic-group">
              <h2>{topic}</h2>
              {cards.map((card) => {
                const cardOpen = openIndex === card.id
                const cardDetailsOpen = detailsOpen.has(card.id)

                return (
                  <article key={card.id} className={`flashcard ${cardOpen ? 'open' : ''}`}>
                    <button
                      className="flashcard-question"
                      onClick={() => toggleCard(card.id)}
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
                          onClick={() => toggleDetails(card.id)}
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
            </div>
          ))}
        </section>
      )}

      {activeTab === 'behavioral' && (
        <section className="flashcards-container">
          {behavioralCards.map((card) => {
            const cardOpen = openIndex === card.id
            const cardDetailsOpen = detailsOpen.has(card.id)

            return (
              <article key={card.id} className={`flashcard ${cardOpen ? 'open' : ''}`}>
                <button
                  className="flashcard-question"
                  onClick={() => toggleCard(card.id)}
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
                      onClick={() => toggleDetails(card.id)}
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
      )}
    </main>
  )
}

export default App
