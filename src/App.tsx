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

const behavioralFinal = [
  {
    question: "Tell me about yourself",
    answer: "Frontend engineer → impact (performance, offline-first, growth) → metrics → depth focus",
    detailedAns:
      "I’m a frontend-focused software engineer with around 3+ years of experience building scalable web and mobile applications, primarily in healthtech. At 2070Health, I led initiatives across performance, offline-first systems, and growth engineering.\n\nFor example, I led a migration of landing pages from HTML to Next.js, improving Lighthouse scores from 30–40 to 70+ and increasing LPVR from 35–40 to 50–70 depending on campaigns, while reducing code from ~2000 lines per page to under 200 and saving ~8 hours of dev time per page through modularization.\n\nI also designed an offline-first architecture using Realm, reducing latency from 2–4 seconds to under 500ms, and built a GPU-accelerated charting library using React Native Skia for high-performance data visualization.\n\nI enjoy working at the intersection of performance, system design, and product impact, and I’m now looking to go deeper into building and scaling frontend systems."
  },

  {
    question: 'Tell me about a time you took ownership',
    answer: 'Automation + AI → 2 days → 2 hours → <2 minutes, unlocked org velocity',
    detailedAns:
      'Landing page creation took 2+ days and required developer involvement. I built a Strapi-based automation system reducing it to under 2 hours.\n\nThen I identified a higher-leverage opportunity—content already existed in structured Word docs. I built a system using Gemini to convert these directly into components, reducing creation time to under 2 minutes.\n\nThis removed developer dependency, significantly increased experimentation velocity, and improved go-to-market speed.\n\nKey takeaway: focus on 10x improvements, not incremental gains.'
  },

  {
    question: 'Tell me about your biggest impact',
    answer: 'Next.js migration + performance → LPVR growth + dev efficiency',
    detailedAns:
      'I led the migration of landing pages from HTML to Next.js to address poor performance.\n\nWe improved Lighthouse scores from 30–40 to 70+ and increased LPVR from 35–40 to 50–70 depending on campaigns.\n\nWe also reduced code size from ~2000 lines per page to under 200, modularized components, and saved ~8 hours of development time per page.\n\nThis had both user experience and business impact, improving conversions while increasing developer velocity.'
  },

  {
    question: 'Tell me about a time you handled ambiguity',
    answer: 'Smart ring + vendor constraints → defined system + offline-first architecture',
    detailedAns:
      'The smart ring integration involved a third-party firmware team with limited documentation and communication challenges.\n\nI took ownership of defining the system end-to-end, acting across product, engineering, and design to establish data flows and interactions.\n\nI designed an offline-first architecture using Realm, eliminating API dependency and reducing latency from 2–4 seconds to under 500ms.\n\nThis enabled a reliable, high-performance system despite ambiguity.\n\nKey takeaway: create structure and validate assumptions early.'
  },

  {
    question: 'Tell me about leadership experience',
    answer: 'Led team of 5 → enabled RN adoption → architecture + mentorship',
    detailedAns:
      'I led a team of 5 engineers building the smart ring module. Most were new to React Native.\n\nI mentored the team, conducted knowledge-sharing sessions, and established best practices for state management and performance.\n\nI also defined architecture and broke down tasks to reduce ambiguity.\n\nAs a result, the team ramped up quickly and delivered a complex system successfully.\n\nAdditionally, I mentored juniors through code reviews and guidance, improving overall team efficiency.'
  },

  {
    question: 'Tell me about a failure',
    answer: 'Underestimated integration complexity → fixed with structured approach',
    detailedAns:
      'I initially underestimated the complexity of integrating with a third-party hardware vendor and relied too much on their reference app, leading to delays.\n\nI corrected this by breaking the system into smaller components, defining architecture proactively, and improving communication loops.\n\nThis stabilized development and enabled successful delivery.\n\nKey lesson: proactively structure ambiguous problems early.'
  },

  {
    question: 'Tell me about a disagreement',
    answer: 'Standardization vs individual approaches → incremental adoption',
    detailedAns:
      'At Bonatra, engineers used different stacks, leading to inconsistency.\n\nI proposed standardizing on Next.js, TypeScript, React Query, and Zustand.\n\nThere was resistance around refactoring, so I introduced changes incrementally and demonstrated benefits.\n\nThis improved consistency, reduced bugs, and improved developer experience.\n\nKey takeaway: influence through value, not force.'
  },

  {
    question: 'Tell me about a tight deadline',
    answer: 'Live campaign → improved Lighthouse 30–40 → 70–85 in days',
    detailedAns:
      'During a live campaign, landing pages had poor performance (30–40 Lighthouse).\n\nI created a prioritized plan focusing on high-impact fixes and aligned the team to execute in parallel.\n\nWe improved scores to 70–85 within days.\n\nWe couldn’t exceed 85 due to GTM constraints, but optimized everything within control.\n\nKey takeaway: optimize for impact under constraints.'
  },

  {
    question: 'Tell me about stakeholder management',
    answer: 'Balanced engineering vs business constraints',
    detailedAns:
      'While improving performance, marketing required GTM scripts that impacted performance.\n\nInstead of removing them, I worked with stakeholders to defer non-critical scripts and optimize loading.\n\nThis improved performance while preserving business requirements.\n\nKey takeaway: align on goals, not solutions.'
  },

  {
    question: 'Tell me about a technical tradeoff',
    answer: 'Rewrite vs incremental → chose safe, scalable migration',
    detailedAns:
      'I had to decide between rewriting the frontend or incrementally migrating to a better stack.\n\nA full rewrite was cleaner but risky. I chose incremental migration to maintain velocity.\n\nThis allowed continuous delivery while improving architecture.\n\nKey takeaway: balance ideal architecture with business constraints.'
  },

  {
    question: 'What are your strengths?',
    answer: 'Performance + system design + product thinking + data visualization',
    detailedAns:
      'I combine performance, system design, and product thinking to drive impact.\n\nI’ve improved Lighthouse and LPVR significantly and built offline-first systems.\n\nI also built a custom React Native charting library using Skia because no existing solutions supported gradient-based, GPU-accelerated charts, enabling 60fps visualizations.\n\nI focus on building systems that are both technically strong and product-driven.'
  },

  {
    question: 'What is your weakness?',
    answer: 'Over-optimizing technically → now prioritize impact',
    detailedAns:
      'Earlier, I focused too much on technical optimization before validating business impact.\n\nNow, I prioritize high-impact improvements and align with product goals before optimizing deeply.'
  },

  {
    question: 'Tell me about a time you improved a process',
    answer: 'Automation system → 2 days → 2 minutes',
    detailedAns:
      'I identified inefficiencies in page creation and built an automated system using Strapi and AI, reducing time from 2 days to under 2 minutes and unlocking team productivity.'
  },

  {
    question: 'Tell me about a time you improved quality',
    answer: 'Reduced debugging + improved stability',
    detailedAns:
      'I resolved workflow conflicts and improved system stability, reducing debugging effort by ~30 hours per week and eliminating recurring bugs.\n\nThis significantly improved system reliability.'
  },

  {
    question: 'Tell me about a time you drove innovation',
    answer: 'Custom charting + experimentation tools',
    detailedAns:
      'I built a custom charting library for React Native and an A/B experimentation platform, enabling new product capabilities and faster experimentation.\n\nThese solutions addressed gaps not available in existing tools.'
  }
];

const behavioralCards: BehavioralCard[] = behavioralFinal.map((item, idx) => ({
  ...item,
  id: idx,
}))

const whyLeaveRaw = [
  {
    question: 'Why did you leave your previous job?',
    answer: '0→1 experience → now looking for depth + scale',
    detailedAns:
      'I had a great experience at 2070Health, where the nature of the work was largely focused on building products from 0 to 1. It gave me strong exposure across areas like performance optimization, offline-first systems, and growth engineering, helping me build solid breadth across the frontend.\n\nOver time, I felt that I wanted to complement that breadth with more depth—especially by working on larger-scale systems and more complex frontend architecture challenges.\n\nSo I\'m now looking for opportunities where I can go deeper into system design, performance, and scalability, and take more ownership over architectural decisions.\n\nThis move is really about evolving from breadth-focused work to more depth and scale.'
  },
  {
    question: 'What were you doing during your career gap?',
    answer: 'Upskilling + building products (portfolio, DSA tool, ADHD app)',
    detailedAns:
      'After my time at 2070Health, I took a short break to focus on upskilling and building a few products. I updated my portfolio website and built a couple of applications—one focused on DSA practice, and another designed for people with ADHD to improve focus and productivity.\n\nAlongside this, I strengthened my system design and frontend architecture skills and explored areas like performance optimization and AI-driven workflows.\n\nOverall, I used this period productively to build, learn, and prepare for roles where I can take on larger-scale challenges and more ownership.\n\nNow, I\'m actively looking for the right opportunity where I can apply these learnings and contribute effectively.'
  },
  {
    question: 'What kind of growth are you looking for?',
    answer: 'Scale + architecture + ownership',
    detailedAns:
      'I\'m looking to work on larger-scale systems where I can contribute to frontend architecture decisions and solve complex performance and system design problems. I also enjoy working close to product and driving measurable impact through engineering.'
  },
  {
    question: 'Why not continue growing at 2070Health?',
    answer: 'Reached strong impact, now seeking larger challenges',
    detailedAns:
      'I had a great experience and delivered strong impact across performance, offline-first systems, and growth tooling. At this point, I felt I had achieved a good level of impact in my current scope and wanted to take on new challenges at a larger scale with more ownership in system-level decisions.'
  },
  {
    question: 'What are you looking for in your next role?',
    answer: 'Large-scale systems + product impact',
    detailedAns:
      'I\'m looking for a role where I can work on large-scale frontend systems, contribute to architecture decisions, and solve performance and user experience challenges. I\'m particularly interested in roles where engineering decisions directly impact product outcomes.'
  },
{
  question: 'Why are you interested in this company?',
  answer: 'Fintech scale + real-world impact + alignment with my system design interests',
  detailedAns:
    'What I find interesting about Digio is the kind of problems you’re solving—things like digital transactions, KYC, and document workflows that are actually used in real-world, high-stakes scenarios.\n\nIn fintech, even small issues in performance or user experience can affect trust, and that makes the problem space much more meaningful to me.\n\nFrom my side, I’ve worked a lot on performance optimization and building reliable frontend systems, so this feels like a natural next step where I can apply that experience at a larger scale.\n\nI’m also at a stage where I want to go deeper into system design and work on systems that need to be both scalable and highly reliable, and Digio seems like a great fit for that.'
},

  {
  question: 'Why didn’t you wait for a new opportunity before leaving your previous job?',
  answer: 'Intentional break to upskill, build, and be deliberate about next role',
  detailedAns:
    'That was an intentional decision. After my time at 2070Health, I wanted to take a short step back to reflect on the kind of problems I wanted to work on next—especially transitioning from 0→1 work to roles focused on scale and deeper system design.\n\nI used that time productively by updating my portfolio and building a couple of applications, including a DSA practice tool and an app for people with ADHD to improve focus and productivity.\n\nAlongside that, I focused on strengthening my system design and frontend architecture skills.\n\nSo rather than immediately jumping into the next role, I chose to be deliberate about the transition and prepare for opportunities that align better with my long-term goals.'
},
  {
    question: 'What didn\'t you like about your previous role?',
    answer: 'Looking for more complex, system-level challenges',
    detailedAns:
      'There wasn\'t anything I particularly disliked, but over time I felt the challenges became more incremental. I\'m someone who enjoys solving complex system-level problems, so I\'m looking for an environment where I can take on larger architectural challenges.'
  },
  {
    question: 'Are you leaving due to team or management issues?',
    answer: 'No, purely growth-driven',
    detailedAns:
      'No, I had a great experience working with my team and leadership. The decision is primarily driven by my desire to grow further and take on larger-scale challenges.'
  },
  {
    question: 'What would have made you stay?',
    answer: 'More opportunities for scale and architectural ownership',
    detailedAns:
      'I was already doing impactful work, but I\'m now looking for opportunities where I can work on larger-scale systems and have more ownership over architecture decisions. That\'s the main reason I\'m exploring new roles.'
  },
  {
    question: 'How does this role align with your goals?',
    answer: 'Direct alignment with scale and architectural growth',
    detailedAns:
      'This role aligns well with my goals because it involves working on larger-scale systems and contributing to frontend architecture, which is exactly the direction I want to grow in.'
  }
]

const whyLeaveCards: BehavioralCard[] = whyLeaveRaw.map((item, idx) => ({
  ...item,
  id: idx + 100, // offset to avoid id conflicts
}))

const flashcardsRaw= [
  {
    question: 'Smart vs Dumb Components?',
    answer: 'Smart = logic/state, Dumb = UI',
    detailedAns:
      'Smart components handle state, API calls, and business logic. Dumb components render UI based on props. Modern React replaces this with hooks and better composition.'
  },
  {
    question: 'State colocation vs global state?',
    answer: 'Keep state local unless shared widely',
    detailedAns:
      'Colocate state near usage for simplicity and performance. Use global state only when needed across distant components.'
  },
  {
    question: 'Local vs Context vs Redux?',
    answer: 'Local → Context → Redux (increasing complexity)',
    detailedAns:
      'Local for component state, Context for shared simple state, Redux for complex global interactions requiring predictability.'
  },
  {
    question: 'Code splitting?',
    answer: 'Load smaller bundles on demand',
    detailedAns:
      'Split bundles using dynamic imports to reduce initial load time. Common in route-based or component-based splitting.'
  },
  {
    question: 'Lazy loading?',
    answer: 'Load resources only when needed',
    detailedAns:
      'Defer loading of images/components until needed (viewport or interaction), improving performance.'
  },
  {
    question: 'Debounce vs Throttle?',
    answer: 'Debounce = after pause, Throttle = at intervals',
    detailedAns:
      'Debounce waits for user to stop input, throttle limits execution frequency.'
  },
  {
    question: 'Virtualization?',
    answer: 'Render only visible items',
    detailedAns:
      'Render only visible DOM nodes in large lists to improve performance.'
  },
  {
    question: 'Avoid unnecessary re-renders?',
    answer: 'Memoization + state colocation',
    detailedAns:
      'Use React.memo, useMemo, useCallback, and proper component splitting.'
  },
  {
    question: 'REST vs GraphQL?',
    answer: 'REST = fixed, GraphQL = flexible',
    detailedAns:
      'REST uses multiple endpoints, GraphQL fetches exact data needed.'
  },
  {
    question: 'N+1 queries?',
    answer: '1 query + N extra queries',
    detailedAns:
      'Occurs when fetching related data per item. Fix using batching or joins.'
  },
  {
    question: 'SWR vs React Query?',
    answer: 'SWR = simple, React Query = powerful',
    detailedAns:
      'React Query provides caching, retries, mutations, and devtools.'
  },
  {
    question: 'Pagination vs Infinite scroll?',
    answer: 'Pagination = structured, Infinite = engagement',
    detailedAns:
      'Pagination is SEO-friendly, infinite scroll needs virtualization.'
  },
  {
    question: 'Loading/Error/Empty states?',
    answer: 'Handle all 3',
    detailedAns:
      'Use skeletons, retries, and helpful empty states.'
  },
  {
    question: 'IndexedDB vs LocalStorage?',
    answer: 'IndexedDB = large async, LocalStorage = small sync',
    detailedAns:
      'IndexedDB supports structured large data and is ideal for offline-first apps.'
  },
  {
    question: 'Service Workers?',
    answer: 'Enable caching + offline',
    detailedAns:
      'Intercept network requests and enable offline capabilities.'
  },
  {
    question: 'Background Sync?',
    answer: 'Retry when back online',
    detailedAns:
      'Queue failed requests and retry later.'
  },
  {
    question: 'Conflict resolution?',
    answer: 'Handle offline conflicts',
    detailedAns:
      'Use last-write-wins, merging, or CRDTs.'
  },
  {
    question: 'JWT vs Session?',
    answer: 'JWT = stateless, Session = stateful',
    detailedAns:
      'JWT scales better, sessions are easier to revoke.'
  },
  {
    question: 'Refresh token flow?',
    answer: 'Short access + long refresh token',
    detailedAns:
      'Improves UX while maintaining security.'
  },
  {
    question: 'Cookies vs LocalStorage?',
    answer: 'Cookies (HTTP-only) are safer',
    detailedAns:
      'LocalStorage is vulnerable to XSS.'
  },
  {
    question: 'XSS vs CSRF?',
    answer: 'XSS = script injection, CSRF = fake requests',
    detailedAns:
      'Prevent using CSP, sanitization, SameSite cookies.'
  },
  {
    question: 'CSR vs SSR vs SSG vs ISR?',
    answer: 'Different rendering strategies',
    detailedAns:
      'SSR for SEO, SSG for static, ISR for hybrid.'
  },
  {
    question: 'Hydration?',
    answer: 'Attach JS to HTML',
    detailedAns:
      'Makes SSR pages interactive.'
  },
  {
    question: 'Webpack vs Vite?',
    answer: 'Vite is faster in dev',
    detailedAns:
      'Uses native ES modules.'
  },
  {
    question: 'Tree shaking?',
    answer: 'Remove unused code',
    detailedAns:
      'Reduces bundle size.'
  },
  {
    question: 'Asset optimization?',
    answer: 'Optimize images, JS, CSS',
    detailedAns:
      'Use WebP, compression, CDN.'
  },
  {
    question: 'WebSockets vs Polling?',
    answer: 'WebSockets = real-time',
    detailedAns:
      'Polling is inefficient.'
  },
  {
    question: 'Event-driven UI?',
    answer: 'UI reacts to events',
    detailedAns:
      'Used in real-time systems.'
  },
  {
    question: 'Handling reconnections?',
    answer: 'Retry + backoff',
    detailedAns:
      'Use exponential backoff and state sync.'
  },
  {
    question: 'Unit vs Integration vs E2E?',
    answer: 'Different testing levels',
    detailedAns:
      'Unit = small, Integration = combined, E2E = full flow.'
  },
  {
    question: 'Jest vs RTL vs Cypress?',
    answer: 'Jest = runner, RTL = UI, Cypress = E2E',
    detailedAns:
      'Each serves different testing layers.'
  },
  {
    question: 'Hooks abstraction?',
    answer: 'Reusable logic via hooks',
    detailedAns:
      'Replaces container components.'
  },
  {
    question: 'Microfrontends?',
    answer: 'Split frontend apps',
    detailedAns:
      'Independent deployment per team.'
  },
  {
    question: 'Module Federation?',
    answer: 'Load remote code',
    detailedAns:
      'Dynamic runtime integration.'
  },

  // PERFORMANCE SECTION 🔥

  {
    question: 'Core Web Vitals?',
    answer: 'LCP, CLS, INP',
    detailedAns:
      'LCP = loading (<2.5s), CLS = stability (<0.1), INP = responsiveness (<200ms). Key for UX and SEO.'
  },
  {
    question: 'Improve LCP?',
    answer: 'Optimize largest element',
    detailedAns:
      'Use WebP images, preload assets, reduce TTFB, SSR/SSG, CDN.'
  },
  {
    question: 'Reduce CLS?',
    answer: 'Prevent layout shifts',
    detailedAns:
      'Set dimensions, reserve space, avoid dynamic shifts.'
  },
  {
    question: 'Improve INP?',
    answer: 'Reduce main thread work',
    detailedAns:
      'Code split, reduce JS, avoid long tasks, use Web Workers.'
  },
  {
    question: 'Measure performance?',
    answer: 'Lighthouse + Web Vitals',
    detailedAns:
      'Use Lighthouse, DevTools, and RUM tools.'
  },
  {
    question: 'TTFB?',
    answer: 'Server response time',
    detailedAns:
      'Impacts LCP. Improve with CDN and caching.'
  },
  {
    question: 'Next.js performance?',
    answer: 'SSR + image optimization',
    detailedAns:
      'Improves LCP and reduces bundle size.'
  },
  {
    question: 'Render-blocking resources?',
    answer: 'JS/CSS delaying render',
    detailedAns:
      'Fix with async/defer and splitting.'
  }
];

const inferTopic = (question: string) => {
  const q = question.toLowerCase()
  if (q.includes('component')) return 'Components'
  if (q.includes('state')) return 'State'
  if (q.includes('performance') || q.includes('debounce') || q.includes('throttle') || q.includes('virtualization') || q.includes('lazy') || q.includes('code splitting') || q.includes('tree shaking') || q.includes('asset') ||q.includes('improve')||q.includes('reduce')||q.includes('ttfb'))  return 'Performance' 
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
  const [activeTab, setActiveTab] = useState<'technical' | 'behavioral' | 'career'>('technical')

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
        <button
          className={`tab-button ${activeTab === 'career' ? 'active' : ''}`}
          onClick={() => setActiveTab('career')}
        >
          Career Transition
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

      {activeTab === 'career' && (
        <section className="flashcards-container">
          {whyLeaveCards.map((card) => {
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
