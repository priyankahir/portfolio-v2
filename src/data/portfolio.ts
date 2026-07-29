export const about = {
  name: "Priyank Baldaniya",
  role: "Senior Frontend Developer",
  tagline: "Frontend Developer specializing in high-performance web applications with Next.js, React, and TypeScript. Building the future of the web, one commit at a time.",
  bio: [
    {
      _key: "block-1",
      _type: "block",
      children: [
        {
          _key: "span-1",
          _type: "span",
          marks: [],
          text: "Hello! I am a passionate software engineer specializing in frontend architecture. I enjoy building dynamic, creative products from start to finish.",
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  profileImage: "/images/profile.jpeg",
  resumeUrl: "/images/Priyank_Baldaniya_Frontend_CV.pdf",
  location: "AHMEDABAD, IN",
  email: "priyankbaldaniya@gmail.com",
  phone: "+91 9979700935",
  socials: [
    { platform: "GitHub", url: "https://github.com/", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com/", icon: "Twitter" },
  ],
};

export const projects = [
  {
    _id: "p1",
    title: "Vrundavan Buildcon",
    slug: "vrundavan-buildcon",
    subtitle: "Luxury Real Estate Platform",
    status: "ONLINE",
    description: "A premium, fully-responsive real estate platform featuring dynamic 3D layouts, seamless navigation, and highly optimized media loading for prospective buyers.",
    coverImage: "/images/bgGrid.jpg", // Placeholder
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://vrundavanbuildcon.com",
    githubUrl: "",
    featured: true,
  },
  {
    _id: "p2",
    title: "KuberGrow Order Management",
    slug: "kubergrow-order-management",
    subtitle: "Internal Dashboard System",
    status: "BETA",
    description: "A comprehensive internal dashboard built for tracking orders, managing KYC information, and handling employee referrals securely and efficiently.",
    coverImage: "/images/bgGrid.jpg", // Placeholder
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  }
];

export const skills = [
  { _id: "s1", name: "Next.js", category: "Frontend", icon: "Code" },
  { _id: "s2", name: "React", category: "Frontend", icon: "Code" },
  { _id: "s3", name: "TypeScript", category: "Languages", icon: "FileText" },
  { _id: "s4", name: "Tailwind CSS", category: "Styling", icon: "PenTool" },
  { _id: "s5", name: "Node.js", category: "Backend", icon: "Server" },
  { _id: "s6", name: "Express.js", category: "Backend", icon: "Zap" },
  { _id: "s7", name: "MongoDB", category: "Database", icon: "Database" },
  { _id: "s8", name: "AWS", category: "Cloud", icon: "Cloud" },
];

export const experience = [
  {
    _id: "e1",
    role: "Software Engineer",
    company: "Vivanah Infotech",
    location: "Ahmedabad",
    startDate: "2025-04",
    current: true,
    endDate: "",
    description: [
      {
        _key: "block-1",
        _type: "block",
        children: [
          { _key: "span-1", _type: "span", marks: [], text: "Leading the implementation of new web application features and maintaining high code quality standards." }
        ],
        markDefs: [], style: "normal"
      }
    ]
  },
  {
    _id: "e2",
    role: "Software Engineer Intern",
    company: "Vivanah Infotech",
    location: "Ahmedabad",
    startDate: "2025-01",
    current: false,
    endDate: "2025-04",
    description: [
      {
        _key: "block-1",
        _type: "block",
        children: [
          { _key: "span-1", _type: "span", marks: [], text: "Assisted in developing and maintaining scalable frontend interfaces using React.js and Next.js." }
        ],
        markDefs: [], style: "normal"
      }
    ]
  }
];

export const blogs = [
  {
    _id: "b1",
    title: "Mastering UTM Parameters: Tracking Sources and Links",
    slug: "mastering-utm-parameters",
    publishedAt: "2026-07-25T10:00:00Z",
    excerpt: "A quick guide on how to effectively use UTM sources and links to track campaign performance and analyze user traffic.",
    mainImage: "/images/bgGrid.jpg", // Placeholder
    author: "Priyank Baldaniya",
    category: "Analytics",
    readTime: "3 min read",
    body: [
      {
        _key: "block-1",
        _type: "block",
        children: [
          { _key: "span-1", _type: "span", marks: [], text: "UTM (Urchin Tracking Module) parameters are simple tags added to the end of a URL to track the performance of campaigns and content." }
        ],
        markDefs: [], style: "normal"
      }
    ]
  }
];
