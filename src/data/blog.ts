export interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  slug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Mastering Next.js 16: What's New?",
    excerpt: "Exploring the latest features in Next.js 16, from enhanced server actions to improved performance optimizations for modern web apps.",
    content: `
      <h2>The Future of Web Development with Next.js 16</h2>
      <p>Next.js 16 introduces a suite of features designed to make web applications faster, more reliable, and easier to build. The focus this year has been on developer experience and production performance.</p>
      
      <h3>1. Enhanced Server Actions</h3>
      <p>Server actions have been completely overhauled to support more complex data flows. You can now handle file uploads, multi-step forms, and background processing with even less boilerplate code.</p>
      
      <h3>2. Partial Prerendering (PPR)</h3>
      <p>PPR is now stable! This allows you to combine static and dynamic content in the same route seamlessly. The shell of your page loads instantly from the edge, while dynamic components stream in as they become ready.</p>
      
      <h3>3. Advanced Caching Strategies</h3>
      <p>The new caching API gives you granular control over how your data is stored and revalidated. Say goodbye to unpredictable cache hits and hello to deterministic performance.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Example of new Server Action syntax</p>
        <pre class="text-secondary text-sm">async function updateProfile(formData: FormData) {
  'use server';
  const data = Object.fromEntries(formData);
  // Type-safe processing...
}</pre>
      </div>

      <p>In conclusion, Next.js 16 is not just an incremental update; it's a leap forward in how we think about the full-stack web.</p>
    `,
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Priyank",
    category: "Development",
    slug: "mastering-nextjs-16"
  },
  {
    title: "Modern State Management with Zustand",
    excerpt: "Why Zustand is becoming the go-to choice for React developers looking for a lightweight, scalable state management solution.",
    content: `
      <h2>Why We Switched to Zustand</h2>
      <p>State management in React has always been a hot topic. From Redux to Recoil, the options are endless. But Zustand stands out for its simplicity and power.</p>
      
      <h3>Simplicity First</h3>
      <p>Unlike Redux, Zustand doesn't require reducers, actions, or complicated boilerplate. You just create a hook, define your state and actions, and you're good to go.</p>
      
      <h3>Zero Boilerplate</h3>
      <p>One of the biggest pain points with other libraries is the amount of code you have to write before you even use the state. Zustand eliminates this entirely.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Zustand Store Example</p>
        <pre class="text-secondary text-sm">const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))</pre>
      </div>

      <p>Zustand is small (less than 1kb!), fast, and works perfectly with React's concurrent mode. If you haven't tried it yet, now is the time.</p>
    `,
    date: "Apr 28, 2026",
    readTime: "4 min read",
    author: "Priyank",
    category: "Architecture",
    slug: "state-management-zustand"
  },
  {
    title: "Building Pixel-Perfect UIs with Tailwind CSS",
    excerpt: "A deep dive into advanced Tailwind techniques for creating highly responsive, maintainable, and visually stunning user interfaces.",
    content: `
      <h2>The Art of Utility-First CSS</h2>
      <p>Tailwind CSS has revolutionized how we build UIs. But are you using it to its full potential? Let's explore some advanced patterns.</p>
      
      <h3>1. Design System Alignment</h3>
      <p>Tailwind isn't just about utility classes; it's about building a design system. By customizing your <code>tailwind.config.ts</code>, you ensure consistency across your entire application.</p>
      
      <h3>2. Responsive Everything</h3>
      <p>The mobile-first approach is built into Tailwind. Using prefixes like <code>md:</code> and <code>lg:</code> effectively is the key to building layouts that look great on any device.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Customizing Tailwind Config</p>
        <pre class="text-secondary text-sm">module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#00FF41',
        secondary: '#003B00',
      },
    },
  },
}</pre>
      </div>

      <p>Mastering Tailwind means understanding the constraints it provides and using them to create beautiful, consistent designs quickly.</p>
    `,
    date: "Apr 15, 2026",
    readTime: "6 min read",
    author: "Priyank",
    category: "Design",
    slug: "pixel-perfect-ui-tailwind"
  },
  {
    title: "Mastering Framer Motion for Immersive Web Experiences",
    excerpt: "Learn how to create fluid, high-performance animations that captivate users without compromising on Core Web Vitals.",
    content: `
      <h2>Animations That Feel Natural</h2>
      <p>Animation is the secret sauce that makes a website feel "premium". Framer Motion provides the best developer experience for adding these touches to React apps.</p>
      
      <h3>1. Declarative Animations</h3>
      <p>Instead of managing complex CSS keyframes, you just tell Framer Motion what you want the end state to look like. It handles the interpolation and performance optimizations automatically.</p>
      
      <h3>2. Layout Animations</h3>
      <p>Framer Motion's <code>layout</code> prop is like magic. It automatically animates elements as they move within the DOM tree, making transitions like list reordering or layout changes perfectly smooth.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Framer Motion Reveal</p>
        <pre class="text-secondary text-sm">&lt;motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
&gt;
  Hello World!
&lt;/motion.div&gt;</pre>
      </div>

      <p>Remember: use animations to enhance the experience, not distract from it. Performance should always be your top priority.</p>
    `,
    date: "May 05, 2026",
    readTime: "7 min read",
    author: "Priyank",
    category: "Animation",
    slug: "mastering-framer-motion"
  },
  {
    title: "TypeScript Patterns for Scalable React Applications",
    excerpt: "Advanced TypeScript techniques for building type-safe, maintainable components and hooks in large-scale frontend projects.",
    content: `
      <h2>Type Safety Beyond the Basics</h2>
      <p>TypeScript is more than just adding <code>string</code> or <code>number</code> to your variables. It's about modeling your domain logic accurately.</p>
      
      <h3>1. Discriminated Unions</h3>
      <p>This is the single most powerful feature for handling complex state like API responses. It forces you to handle every possible case, preventing runtime errors.</p>
      
      <h3>2. Generic Components</h3>
      <p>Building reusable components often requires generics. Learn how to create type-safe data tables, form handlers, and list components that adapt to any data structure.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Discriminated Union Example</p>
        <pre class="text-secondary text-sm">type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: Blog[] }
  | { status: 'error', error: string };</pre>
      </div>

      <p>Strong typing leads to fewer bugs and better documentation through code. It's an investment that pays off as your project grows.</p>
    `,
    date: "Apr 22, 2026",
    readTime: "8 min read",
    author: "Priyank",
    category: "Architecture",
    slug: "typescript-patterns-react"
  },
  {
    title: "Optimizing Web Performance: A Deep Dive into Core Web Vitals",
    excerpt: "Practical strategies to achieve perfect Lighthouse scores and improve user experience through performance-first development.",
    content: `
      <h2>Performance is a Feature</h2>
      <p>Users expect websites to load instantly. Core Web Vitals (LCP, FID, CLS) are the metrics Google uses to measure this experience. Let's optimize them.</p>
      
      <h3>1. LCP: Largest Contentful Paint</h3>
      <p>Optimize your images! Use <code>next/image</code>, prioritize the hero image, and ensure your server responds quickly. Modern formats like WebP or AVIF are essential.</p>
      
      <h3>2. CLS: Cumulative Layout Shift</h3>
      <p>Stop the jumpiness! Always reserve space for images and ads. Avoid inserting content above existing content unless it's in response to a user action.</p>
      
      <div class="terminal-panel p-4 my-8 bg-black/40 border border-primary/20">
        <p class="text-primary font-terminal">// Image Optimization with Next.js</p>
        <pre class="text-secondary text-sm">&lt;Image
  src="/hero.png"
  alt="Hero"
  priority
  width={1200}
  height={600}
/&gt;</pre>
      </div>

      <p>Performance isn't a one-time task; it's a continuous process of measurement and improvement. Aim for the green scores!</p>
    `,
    date: "Apr 10, 2026",
    readTime: "6 min read",
    author: "Priyank",
    category: "Performance",
    slug: "optimizing-core-web-vitals"
  }
];
