import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "server-state-vs-client-state-react",
    title: "Stop Putting Server Data in Your Global Store",
    excerpt:
      "Most React state bugs come from one mistake: treating data you fetched as if you owned it. Here's the split that fixed it for me — TanStack Query for server state, Zustand for everything else.",
    publishedAt: "2026-06-18T09:00:00.000Z",
    category: "Architecture",
    tags: ["React", "TanStack Query", "Zustand", "State Management"],
    readingMinutes: 7,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "The first dashboard I built had a single global store holding everything: the logged-in user, the sidebar collapse flag, the current filter, and the 400 rows of table data we'd just fetched. It worked until it didn't — stale rows after a mutation, two components fetching the same endpoint, and a `refreshData()` function that nobody could safely delete.",
      },
      {
        type: "paragraph",
        text: "The fix wasn't a better store. It was noticing that those things are not the same kind of state.",
      },
      { type: "heading", level: 2, text: "Two kinds of state" },
      {
        type: "paragraph",
        text: "Client state is state you own. It's created in the browser, it's authoritative, and nobody else can change it behind your back: is the modal open, which tab is active, what's typed in the search box.",
      },
      {
        type: "paragraph",
        text: "Server state is a cached copy of something you don't own. The database is the source of truth. Your copy is stale the moment you receive it, another user can change it, and it needs refetching, deduplication and invalidation. Putting it in a global store means hand-rolling all of that.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Rule of thumb: if the data arrived over the network, it is a cache — treat it like one.",
      },
      { type: "heading", level: 2, text: "What that looks like in practice" },
      {
        type: "paragraph",
        text: "Server state goes to TanStack Query. The query key is the identity of the data, and everything — deduplication, background refetch, garbage collection — follows from getting that key right.",
      },
      {
        type: "code",
        language: "tsx",
        caption: "Server state — the cache owns it",
        code: `export function useIncidents(filters: IncidentFilters) {
  return useQuery({
    queryKey: ["incidents", filters],
    queryFn: () => api.get<Incident[]>("/incidents", { params: filters }),
    staleTime: 30_000,
  });
}`,
      },
      {
        type: "paragraph",
        text: "Client state goes to Zustand — small, flat, and holding only things the browser is authoritative about. Note what is absent here: no `incidents` array, no `isLoading`, no `error`.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Client state — you own it",
        code: `export const useIncidentUi = create<IncidentUiState>((set) => ({
  filters: { status: "open", page: 1 },
  selectedId: null,
  setFilters: (filters) => set({ filters, page: 1 }),
  select: (selectedId) => set({ selectedId }),
}));`,
      },
      {
        type: "paragraph",
        text: "The two connect at exactly one point: client state feeds the query key. Change a filter and the key changes, so the cache serves a different entry — refetching if it doesn't have one. There's no `useEffect` syncing the two, because there's nothing to sync.",
      },
      { type: "heading", level: 2, text: "What this actually buys you" },
      {
        type: "list",
        items: [
          "Deduplication for free — five components calling `useIncidents` with the same filters make one request.",
          "Mutations invalidate instead of manually patching arrays, so the UI can't drift from the server.",
          "`isLoading` and `error` come from the cache, not from three booleans you maintain by hand.",
          "The global store shrinks to the point where you can read it in one screen.",
        ],
      },
      { type: "heading", level: 2, text: "The mistake I still see" },
      {
        type: "paragraph",
        text: "Copying query results into local state on mount. The moment you write `useEffect(() => setRows(data), [data])`, you've made a second source of truth and handed yourself the synchronisation problem you were trying to avoid. If you need a derived shape, derive it during render or with `select` — don't store it.",
      },
      {
        type: "code",
        language: "tsx",
        caption: "Derive, don't duplicate",
        code: `const { data: openCount } = useQuery({
  queryKey: ["incidents", filters],
  queryFn: fetchIncidents,
  select: (rows) => rows.filter((r) => r.status === "open").length,
});`,
      },
      {
        type: "paragraph",
        text: "Draw the line once, and most of the state bugs you were budgeting time for simply stop happening.",
      },
    ],
  },
  {
    slug: "frontend-for-rag-chatbot",
    title: "The Frontend Half of a RAG Chatbot",
    excerpt:
      "Retrieval and prompting get all the attention, but the interface decides whether users trust the answer. Notes from building a Claude-powered assistant inside a compliance platform.",
    publishedAt: "2026-05-27T09:00:00.000Z",
    category: "AI Engineering",
    tags: ["Claude API", "RAG", "React", "Streaming"],
    readingMinutes: 8,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "When we added an AI assistant to an EHS platform, the retrieval pipeline was the part everyone talked about — chunking strategy, embedding model, vector store. The part that decided whether safety officers actually used it was the interface.",
      },
      {
        type: "paragraph",
        text: "In a compliance context, a confident wrong answer is worse than no answer. Every frontend decision below follows from that.",
      },
      { type: "heading", level: 2, text: "Stream, but stream honestly" },
      {
        type: "paragraph",
        text: "A three-second wait with a spinner feels broken. The same three seconds with text arriving feels fast. But streaming introduces its own problem: users start reading before the model finishes, and a partial sentence can say the opposite of the complete one.",
      },
      {
        type: "list",
        items: [
          "Render tokens as they arrive, but hold citations back until the message is complete — a source list that grows mid-read is distracting.",
          "Keep the stop button visible for the whole stream. Being able to cancel is what makes a slow answer tolerable.",
          "Never auto-scroll if the user has scrolled up. Pin to bottom only while they're already at the bottom.",
        ],
      },
      {
        type: "code",
        language: "ts",
        caption: "Only follow the stream when the user hasn't taken over",
        code: `const atBottom =
  el.scrollHeight - el.scrollTop - el.clientHeight < 48;

if (atBottom) {
  el.scrollTop = el.scrollHeight;
}`,
      },
      { type: "heading", level: 2, text: "Show the retrieval, not just the answer" },
      {
        type: "paragraph",
        text: "The single highest-value element we shipped was the source list under each answer: which documents the retrieval step actually pulled, with a link into the exact section. It turns an opaque assertion into something checkable.",
      },
      {
        type: "paragraph",
        text: "It also makes failure legible. When the answer is wrong, users can see that retrieval pulled the wrong policy document — which is a fixable problem — rather than concluding the whole feature is unreliable.",
      },
      {
        type: "callout",
        tone: "info",
        text: "If retrieval returns nothing above your similarity threshold, say so and stop. A grounded assistant that admits it has no source beats one that falls back on general knowledge.",
      },
      { type: "heading", level: 2, text: "Design the exit before the happy path" },
      {
        type: "paragraph",
        text: "Every AI surface needs a way out. Ours was a human handoff: a waiting-room state, then a live agent joining the same conversation with the full transcript already loaded. The user never repeats themselves, and the escalation is one click rather than a support-ticket form.",
      },
      {
        type: "paragraph",
        text: "Building that early changes how the rest of the feature feels. You stop trying to make the model handle every edge case, because there's a defined path for the ones it can't.",
      },
      { type: "heading", level: 2, text: "Capture the signal" },
      {
        type: "paragraph",
        text: "Thumbs up/down and a star rating per answer cost almost nothing to build and are the only structured data you'll get about where the model is weak. Attach the retrieved document ids to each rating — then a bad score tells you whether the failure was retrieval or generation.",
      },
      { type: "heading", level: 2, text: "Latency is a UI problem" },
      {
        type: "list",
        ordered: true,
        items: [
          "Echo the user's message instantly — never wait for the server to confirm it.",
          "Show the retrieval step as its own visible phase, so the pause before tokens has an explanation.",
          "Render skeletons sized to the expected answer so the layout doesn't jump when text arrives.",
          "Keep the composer enabled while streaming; queue the next message rather than blocking input.",
        ],
      },
      {
        type: "paragraph",
        text: "None of this improves the model. All of it improves whether people keep using it.",
      },
    ],
  },
  {
    slug: "json-driven-dynamic-forms-react",
    title: "Rendering Forms from JSON Instead of Writing Them",
    excerpt:
      "When every client wants a different questionnaire, hard-coded forms mean a release per client. Here's how a schema-driven renderer with conditional logic replaced that.",
    publishedAt: "2026-04-14T09:00:00.000Z",
    category: "React",
    tags: ["React", "Forms", "TypeScript", "Architecture"],
    readingMinutes: 6,
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "On an assessment platform, every client wanted a slightly different report and a slightly different questionnaire to feed it. Sections reordered, questions conditional on earlier answers, scoring narratives swapped. Written as components, each variation is a deploy.",
      },
      {
        type: "paragraph",
        text: "Written as data, each variation is a row in a table.",
      },
      { type: "heading", level: 2, text: "The schema is the contract" },
      {
        type: "code",
        language: "ts",
        caption: "A field describes itself, including when it exists",
        code: `type Field = {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "radio" | "date";
  required?: boolean;
  options?: { label: string; value: string }[];
  /** Field renders only when this evaluates true */
  visibleWhen?: Condition;
};

type Condition =
  | { field: string; equals: string | number | boolean }
  | { field: string; oneOf: (string | number)[] }
  | { all: Condition[] }
  | { any: Condition[] };`,
      },
      {
        type: "paragraph",
        text: "Making `visibleWhen` a recursive union rather than a string expression is the decision that matters. It's serialisable, it's type-checked, and you never end up running `eval` on customer-authored data.",
      },
      { type: "heading", level: 2, text: "Evaluating conditions" },
      {
        type: "code",
        language: "ts",
        code: `function matches(cond: Condition, values: FormValues): boolean {
  if ("all" in cond) return cond.all.every((c) => matches(c, values));
  if ("any" in cond) return cond.any.some((c) => matches(c, values));
  if ("oneOf" in cond) return cond.oneOf.includes(values[cond.field]);
  return values[cond.field] === cond.equals;
}`,
      },
      {
        type: "paragraph",
        text: "Twelve lines, no dependencies, fully testable in isolation. Almost every conditional-form requirement I've been handed decomposes into this.",
      },
      { type: "heading", level: 2, text: "The trap: hidden fields keep their values" },
      {
        type: "paragraph",
        text: "The bug that will find you is a field the user filled in, which later became hidden because they changed an earlier answer — and whose value silently submitted anyway. Sometimes that's what you want. Usually it isn't.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Decide explicitly whether hidden fields are pruned before submit, and validate only the visible set. Otherwise a required field the user can't see will block a form with no visible error.",
      },
      {
        type: "code",
        language: "ts",
        caption: "Validate and submit only what's on screen",
        code: `const visible = fields.filter(
  (f) => !f.visibleWhen || matches(f.visibleWhen, values)
);

const payload = Object.fromEntries(
  visible.map((f) => [f.id, values[f.id]])
);

await schemaFor(visible).validate(payload, { abortEarly: false });`,
      },
      { type: "heading", level: 2, text: "Keep the registry boring" },
      {
        type: "paragraph",
        text: "One map from field type to component, and nothing else clever. The temptation is to let the schema pass arbitrary props through to components; resist it. The moment schema authors can reach into component internals, the contract stops being a contract.",
      },
      {
        type: "paragraph",
        text: "The payoff is that new questionnaires stop being engineering tickets. Someone in the product team composes one, and the renderer already knows how to draw it.",
      },
    ],
  },
  {
    slug: "core-web-vitals-for-dashboards",
    title: "Core Web Vitals When Your App Is a Dashboard",
    excerpt:
      "Most performance advice assumes a marketing page. Dashboards fail differently — INP from heavy re-renders, CLS from async widgets, and a bundle nobody audits. What actually moved the numbers.",
    publishedAt: "2026-03-09T09:00:00.000Z",
    category: "Performance",
    tags: ["Performance", "React", "Next.js", "Core Web Vitals"],
    readingMinutes: 7,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "Advice about Core Web Vitals is mostly written for landing pages: compress your hero image, preload your font, defer the analytics script. Useful, and almost irrelevant when your LCP element is a table that renders after three authenticated requests.",
      },
      { type: "heading", level: 2, text: "INP is the one that hurts" },
      {
        type: "paragraph",
        text: "Interaction to Next Paint is where dashboards fail. A user types in a filter box, and a single keystroke triggers a re-render of six hundred table rows because the input's state lives at the page level.",
      },
      {
        type: "list",
        items: [
          "Push input state down to the smallest component that needs it — a controlled input at page level re-renders the page on every keypress.",
          "Debounce the value that feeds the query key, not the value that feeds the input. The field should feel instant even when the fetch doesn't.",
          "Memoise row components and make sure the props are actually stable — an inline arrow in the parent defeats `React.memo` completely.",
          "Virtualise past a few hundred rows. There is no amount of memoisation that beats not rendering.",
        ],
      },
      {
        type: "code",
        language: "tsx",
        caption: "Instant input, debounced fetch",
        code: `const [text, setText] = useState("");
const deferred = useDeferredValue(text);

const { data } = useQuery({
  queryKey: ["rows", deferred],
  queryFn: () => fetchRows(deferred),
  placeholderData: keepPreviousData,
});`,
      },
      {
        type: "paragraph",
        text: "`keepPreviousData` matters more than it looks. Without it, every keystroke empties the table and refills it — which is both a layout shift and a visual stutter.",
      },
      { type: "heading", level: 2, text: "CLS comes from your own widgets" },
      {
        type: "paragraph",
        text: "Dashboard layout shift rarely comes from images. It comes from cards that render at zero height while loading and then push everything down when data lands.",
      },
      {
        type: "paragraph",
        text: "The fix is unglamorous: give every async region a fixed minimum height matching its loaded state, and make skeletons the same size as the real thing rather than a generic grey bar. Reserve space for scrollbars too — a container that gains one on data load shifts everything horizontally.",
      },
      { type: "heading", level: 2, text: "LCP is a data problem, not an image problem" },
      {
        type: "paragraph",
        text: "If the largest element only appears after auth, then a session check, then a fetch, no amount of image optimisation helps. What helped us:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Render the shell — nav, page header, card frames — from a server component immediately, so first paint isn't blocked on data.",
          "Fire independent requests in parallel instead of chaining them; most 'slow API' complaints are actually a client-side waterfall.",
          "Stream the slow region with Suspense rather than holding the whole page for the slowest widget.",
        ],
      },
      { type: "heading", level: 2, text: "Audit the bundle once a quarter" },
      {
        type: "paragraph",
        text: "Dashboards accumulate dependencies quietly — a date library imported for one format call, a chart library loaded on a route that shows no charts, an icon set imported wholesale. Dynamic-import anything below the fold or behind a tab, and check what a route actually ships before assuming it's fine.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Test on a mid-range Android over throttled 4G. A dashboard that feels instant on a MacBook can be several seconds to interactive on the device your users actually have.",
      },
    ],
  },
  {
    slug: "states-designers-dont-mock",
    title: "The Five States Your Figma File Doesn't Have",
    excerpt:
      "Every handoff shows the happy path with perfect data. Production shows everything else. The checklist I run before calling a screen done.",
    publishedAt: "2026-02-02T09:00:00.000Z",
    category: "Craft",
    tags: ["UI", "Figma", "Accessibility", "Frontend"],
    readingMinutes: 5,
    featured: false,
    body: [
      {
        type: "paragraph",
        text: "A Figma file shows a screen at its best: eight rows of clean data, names that fit, avatars that loaded. Production shows zero rows, four hundred rows, a name in Malayalam, and a 502 from the endpoint. The gap between those is most of the work.",
      },
      { type: "heading", level: 2, text: "1. Empty" },
      {
        type: "paragraph",
        text: "Not a blank area — a state that tells the user why it's empty and what to do next. There's a difference between 'no incidents reported yet' and 'no incidents match these filters', and the second one needs a button to clear the filters.",
      },
      { type: "heading", level: 2, text: "2. Loading" },
      {
        type: "paragraph",
        text: "Skeletons shaped like the content, not a centred spinner. A spinner tells you nothing about what's coming and guarantees layout shift when it's replaced. If the region takes the same space loading as loaded, nothing moves.",
      },
      { type: "heading", level: 2, text: "3. Error" },
      {
        type: "paragraph",
        text: "Errors need to be recoverable in place. A toast that vanishes leaves the user staring at a blank card with no idea what happened. Show what failed, keep whatever data you still have, and give them a retry that doesn't reload the page.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Never render a raw API error string. It leaks internals and means nothing to the person reading it.",
      },
      { type: "heading", level: 2, text: "4. Overflow" },
      {
        type: "paragraph",
        text: "Test every text node with content three times longer than the mock. Long names, long email addresses, a job title someone wrote a paragraph into. Decide per field whether it truncates with an accessible tooltip or wraps — but decide, rather than discovering it in a screenshot from a customer.",
      },
      { type: "heading", level: 2, text: "5. 320 pixels" },
      {
        type: "paragraph",
        text: "The narrowest viewport still in real use. Tables need a horizontal scroll container of their own so the page body never scrolls sideways. Modals need to survive a short viewport with a keyboard open. Touch targets need 44px whether or not the design gave them that.",
      },
      { type: "heading", level: 2, text: "The keyboard pass" },
      {
        type: "paragraph",
        text: "Before calling anything done: tab through it. Every interactive element reachable, focus visible at all times, focus trapped inside open modals and returned to the trigger on close, and Escape closing whatever's on top. It takes two minutes and catches more accessibility issues than any automated audit.",
      },
      {
        type: "paragraph",
        text: "None of this shows up in the mock. All of it shows up in support tickets.",
      },
    ],
  },
];

export const featuredPosts = posts.filter((post) => post.featured);

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export const postCategories: string[] = Array.from(
  new Set(posts.map((post) => post.category))
).sort();
