export interface Lesson {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string; // e.g. "18m"
  description: string;
  videoUrl?: string; // sample MP4 or stream
  resources?: { name: string; url: string; type: "pdf" | "code" | "link" }[];
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  learnersCount: number;
  watchTimeHours: number;
  nativeLanguage: string;
  featured?: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  subject: SubjectCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // e.g., "6h 20m"
  episodesCount: number;
  rating: number;
  matchScore: number; // e.g. 98% Match
  originalLanguage: string;
  availableLanguages: string[]; // e.g. ["Deutsch", "English", "Français", "Español", "Kiswahili"]
  hasDubbing: boolean;
  thumbnail: string;
  backdrop: string;
  badge?: "LINGODESK ORIGINAL" | "TRENDING" | "POPULAR" | "NEW";
  whatYouWillLearn: string[];
  lessons: Lesson[];
  isFeaturedHero?: boolean;
}

export type SubjectCategory =
  | "Languages"
  | "Mathematics"
  | "Technology"
  | "Business"
  | "Science"
  | "Cooking"
  | "Finance"
  | "Creative"
  | "History"
  | "Music"
  | "Practical Skills";

export interface UserProgress {
  courseId: string;
  lastEpisodeId: string;
  percentComplete: number;
  lastWatchedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: "learner" | "teacher";
  preferredLanguage: string;
  interests: SubjectCategory[];
  hoursLearned: number;
  completedCoursesCount: number;
  subscriptionPlan: "Free" | "Premium" | "Family";
}

// ==========================================
// SAMPLE TEACHERS
// ==========================================
export const TEACHERS: Teacher[] = [
  {
    id: "teacher-anna-muller",
    name: "Anna Müller",
    title: "German Linguist & Conversational Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    bio: "Passionate German teacher from Berlin with over 10 years of experience making conversational German intuitive, practical, and natural for learners worldwide.",
    rating: 4.9,
    learnersCount: 38400,
    watchTimeHours: 142000,
    nativeLanguage: "Deutsch 🇩🇪",
    featured: true,
  },
  {
    id: "teacher-marcus-vance",
    name: "Prof. Marcus Vance",
    title: "Mathematics & Visual Thinking Chair",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Former Oxford researcher turned educational documentary producer. Marcus transforms complex linear algebra and calculus into intuitive visual stories.",
    rating: 4.95,
    learnersCount: 52100,
    watchTimeHours: 210500,
    nativeLanguage: "English 🇬🇧",
    featured: true,
  },
  {
    id: "teacher-sarah-jenkins",
    name: "Sarah Jenkins",
    title: "Principal Software Engineer & Python Author",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Ex-Google engineer teaching modern software construction, clean code principles, and Python automation with real-world industry projects.",
    rating: 4.88,
    learnersCount: 64200,
    watchTimeHours: 289000,
    nativeLanguage: "English 🇺🇸",
    featured: true,
  },
  {
    id: "teacher-jean-luc",
    name: "Chef Jean-Luc Dubois",
    title: "Master Culinary Artist & Bakery Craftsman",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
    bio: "Parisian chef bringing classic French culinary techniques and sourdough mastery into modern home kitchens step-by-step.",
    rating: 4.92,
    learnersCount: 29800,
    watchTimeHours: 98000,
    nativeLanguage: "Français 🇫🇷",
    featured: true,
  },
  {
    id: "teacher-aris-thorne",
    name: "Dr. Aris Thorne",
    title: "Astrophysicist & Quantum Mechanics Science Communicator",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Demystifying deep physics, relativity, and quantum mechanics through captivating cinematic explanations and high-fidelity simulations.",
    rating: 4.97,
    learnersCount: 41200,
    watchTimeHours: 178000,
    nativeLanguage: "English 🇬🇧",
  },
  {
    id: "teacher-elena-rostova",
    name: "Elena Rostova",
    title: "Venture Builder & Strategic Business Strategist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    bio: "Serial tech founder and mentor sharing actionable playbooks on business strategy, unit economics, and scaling modern startups.",
    rating: 4.86,
    learnersCount: 22400,
    watchTimeHours: 84000,
    nativeLanguage: "English 🇨🇦",
  },
  {
    id: "teacher-david-chen",
    name: "David Chen",
    title: "Quantitative Analyst & Financial Educator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    bio: "Simplifying markets, wealth management, corporate balance sheets, and personal finance without jargon.",
    rating: 4.91,
    learnersCount: 35000,
    watchTimeHours: 112000,
    nativeLanguage: "English 🇺🇸",
  },
  {
    id: "teacher-mateo-silva",
    name: "Mateo Silva",
    title: "Spanish Polyglot & Accent Coach",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    bio: "Native Madrid linguist who breaks down conversational Spanish patterns so you speak fluently in 30 days.",
    rating: 4.89,
    learnersCount: 31200,
    watchTimeHours: 104000,
    nativeLanguage: "Español 🇪🇸",
  }
];

// Sample video source for prototype video player
export const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// ==========================================
// SAMPLE COURSES
// ==========================================
export const COURSES: Course[] = [
  {
    id: "course-math-simple",
    title: "Mathematics Made Simple",
    subtitle: "Understand the deep ideas behind mathematics instead of memorizing formulas.",
    description: "Mathematics isn't about rote calculation—it is the language of structure, symmetry, and logic. In this flagship cinematic series, Prof. Marcus Vance reveals how calculus, algebra, and geometry describe our world.",
    teacherId: "teacher-marcus-vance",
    teacherName: "Prof. Marcus Vance",
    teacherAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    subject: "Mathematics",
    level: "Beginner",
    duration: "5h 45m",
    episodesCount: 12,
    rating: 4.96,
    matchScore: 99,
    originalLanguage: "English 🇬🇧",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1600&auto=format&fit=crop",
    badge: "LINGODESK ORIGINAL",
    isFeaturedHero: true,
    whatYouWillLearn: [
      "Grasp the visual intuition behind limits and derivatives without memorization",
      "Understand vectors and matrices through geometrical transformations",
      "Connect abstract algebraic patterns to real-world physical systems",
      "Solve complex everyday logic problems using mathematical reasoning"
    ],
    lessons: [
      {
        id: "mms-1",
        title: "1. What Mathematics Really Is",
        episodeNumber: 1,
        duration: "22m",
        description: "Why we were taught math incorrectly in school, and how viewing math as visual patterns changes everything.",
        videoUrl: SAMPLE_VIDEO_URL,
        resources: [
          { name: "Episode Notes & Visual Cheat Sheet.pdf", url: "#", type: "pdf" }
        ]
      },
      {
        id: "mms-2",
        title: "2. The Visual Geometry of Equations",
        episodeNumber: 2,
        duration: "26m",
        description: "Mapping equations onto physical dimensions to see algebraic balance in real-time.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "mms-3",
        title: "3. Calculus Without Symbols",
        episodeNumber: 3,
        duration: "28m",
        description: "Understanding rates of change through motion and area before introducing notation.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "mms-4",
        title: "4. Linear Algebra & Dimensional Shifts",
        episodeNumber: 4,
        duration: "30m",
        description: "How vector spaces stretch and rotate space in computer graphics and machine learning.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "mms-5",
        title: "5. Infinity and Beyond",
        episodeNumber: 5,
        duration: "25m",
        description: "Exploring different sizes of infinity and how paradoxes shaped modern mathematics.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-german-everyday",
    title: "German for Everyday Life",
    subtitle: "Learn practical, natural German for conversations, work, shopping, and social life.",
    description: "Forget robotic grammar drills. Anna Müller guides you through realistic Berlin dialogues, cultural nuances, and conversational confidence so you can communicate effortlessly.",
    teacherId: "teacher-anna-muller",
    teacherName: "Anna Müller",
    teacherAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    subject: "Languages",
    level: "Beginner",
    duration: "6h 20m",
    episodesCount: 18,
    rating: 4.92,
    matchScore: 97,
    originalLanguage: "Deutsch 🇩🇪",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop",
    badge: "TRENDING",
    whatYouWillLearn: [
      "Introduce yourself and build warm social connections naturally",
      "Order food, coffee, and ask for directions like a Berlin local",
      "Handle bureaucratic meetings and doctor appointments with poise",
      "Master essential conversational sentence frames and German word order"
    ],
    lessons: [
      {
        id: "gfe-1",
        title: "1. Introducing Yourself Naturally",
        episodeNumber: 1,
        duration: "18m",
        description: "How locals introduce themselves, handle polite vs informal greetings, and break the ice.",
        videoUrl: SAMPLE_VIDEO_URL,
        resources: [{ name: "Berlin Dialogue Phrasebook.pdf", url: "#", type: "pdf" }]
      },
      {
        id: "gfe-2",
        title: "2. At the Café & Ordering Food",
        episodeNumber: 2,
        duration: "21m",
        description: "Master ordering, dietary preferences, paying with card or cash, and tipping customs.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "gfe-3",
        title: "3. Shopping & Finding Your Way around Town",
        episodeNumber: 3,
        duration: "24m",
        description: "Asking for prices, finding items in supermarkets, and public transport survival skills.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "gfe-4",
        title: "4. German at Work & Email Etiquette",
        episodeNumber: 4,
        duration: "27m",
        description: "Professional German idioms, formal correspondence, and effective workplace communication.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-python-beginners",
    title: "Python for Beginners",
    subtitle: "Build real applications, scripts, and automations from day one.",
    description: "Start your coding journey with Sarah Jenkins. Learn core programming concepts, data manipulation, web scraping, and automation without overwhelming technical theory.",
    teacherId: "teacher-sarah-jenkins",
    teacherName: "Sarah Jenkins",
    teacherAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    subject: "Technology",
    level: "Beginner",
    duration: "8h 15m",
    episodesCount: 22,
    rating: 4.89,
    matchScore: 98,
    originalLanguage: "English 🇺🇸",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    badge: "POPULAR",
    whatYouWillLearn: [
      "Write clean, readable Python code using variables, functions, and control flow",
      "Automate repetitive daily computer tasks like Excel & PDF processing",
      "Scrape data from real websites and organize structured datasets",
      "Build interactive command-line and web mini-apps"
    ],
    lessons: [
      {
        id: "pyb-1",
        title: "1. Your First Python Script",
        episodeNumber: 1,
        duration: "19m",
        description: "Setting up your environment and executing your first lines of executable code.",
        videoUrl: SAMPLE_VIDEO_URL,
        resources: [{ name: "Python Starter Notebook.zip", url: "#", type: "code" }]
      },
      {
        id: "pyb-2",
        title: "2. Data Types, Variables & Expressions",
        episodeNumber: 2,
        duration: "25m",
        description: "Strings, integers, booleans, and how Python stores values in memory.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "pyb-3",
        title: "3. Making Decisions with Logic",
        episodeNumber: 3,
        duration: "22m",
        description: "Conditionals, boolean logic, and branching program workflows.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-physics-simple",
    title: "Physics Made Simple",
    subtitle: "Explore motion, energy, gravity, and the fundamental laws of nature.",
    description: "Dr. Aris Thorne takes you on a breathtaking visual journey through the physics that shapes our universe, from Newton's laws to energy conservation and thermodynamics.",
    teacherId: "teacher-aris-thorne",
    teacherName: "Dr. Aris Thorne",
    teacherAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    subject: "Science",
    level: "Beginner",
    duration: "7h 10m",
    episodesCount: 16,
    rating: 4.98,
    matchScore: 96,
    originalLanguage: "English 🇬🇧",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    badge: "LINGODESK ORIGINAL",
    whatYouWillLearn: [
      "Understand velocity, acceleration, and forces in intuitive physical scenarios",
      "Grasp the law of conservation of energy and modern power generation",
      "Explore wave mechanics, optics, and quantum phenomena",
      "Appreciate the beauty of gravity and cosmic planetary motion"
    ],
    lessons: [
      {
        id: "pms-1",
        title: "1. The Anatomy of Motion",
        episodeNumber: 1,
        duration: "24m",
        description: "Position, speed, and acceleration explained with physical experiments.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "pms-2",
        title: "2. Forces & Newton's Three Laws",
        episodeNumber: 2,
        duration: "28m",
        description: "Why objects move, stop, and interact under constant force field dynamics.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-french-cooking",
    title: "Italian & French Cooking at Home",
    subtitle: "Master classic techniques, pasta making, sauces, and culinary balance.",
    description: "Transform your home kitchen with Chef Jean-Luc Dubois. Learn foundational French pan sauces, handmade Italian pasta, knife skills, and flavor pairing.",
    teacherId: "teacher-jean-luc",
    teacherName: "Chef Jean-Luc Dubois",
    teacherAvatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
    subject: "Cooking",
    level: "Beginner",
    duration: "4h 50m",
    episodesCount: 10,
    rating: 4.93,
    matchScore: 94,
    originalLanguage: "Français 🇫🇷",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
    badge: "NEW",
    whatYouWillLearn: [
      "Master essential professional chef knife techniques and kitchen safety",
      "Make fresh handmade egg pasta dough and classic sauces from scratch",
      "Emulsify perfect French butter sauces like Beurre Blanc and Hollandaise",
      "Balance acidity, salt, fat, and heat for restaurant-grade flavor balance"
    ],
    lessons: [
      {
        id: "ifc-1",
        title: "1. Knife Precision & Mise en Place",
        episodeNumber: 1,
        duration: "20m",
        description: "Proper grip, dice, julienne, and organizing your workstation like a pro.",
        videoUrl: SAMPLE_VIDEO_URL
      },
      {
        id: "ifc-2",
        title: "2. Fresh Egg Pasta Dough Masterclass",
        episodeNumber: 2,
        duration: "32m",
        description: "Kneading, resting, rolling, and cutting tagliatelle and fettuccine.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-starting-business",
    title: "Starting a Business from Scratch",
    subtitle: "From idea validation to your first paying customer.",
    description: "Elena Rostova breaks down the end-to-end framework for identifying market gaps, testing value propositions, building an MVP, and securing initial traction.",
    teacherId: "teacher-elena-rostova",
    teacherName: "Elena Rostova",
    teacherAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    subject: "Business",
    level: "Intermediate",
    duration: "5h 30m",
    episodesCount: 14,
    rating: 4.88,
    matchScore: 92,
    originalLanguage: "English 🇨🇦",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    badge: "POPULAR",
    whatYouWillLearn: [
      "Validate product ideas with customer interviews before writing code",
      "Structure sustainable unit economics and business models",
      "Execute low-cost growth channels for early user acquisition",
      "Craft compelling investor pitch decks and financial projections"
    ],
    lessons: [
      {
        id: "sbs-1",
        title: "1. Finding High-Leverage Problems",
        episodeNumber: 1,
        duration: "21m",
        description: "How top entrepreneurs spot latent market demands and friction points.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-understanding-money",
    title: "Understanding Money & Finance",
    subtitle: "Master personal wealth, balance sheets, investing, and economic cycles.",
    description: "Financial literacy made crystal clear. David Chen decodes inflation, stock markets, real estate valuation, and portfolio construction for long-term independence.",
    teacherId: "teacher-david-chen",
    teacherName: "David Chen",
    teacherAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    subject: "Finance",
    level: "Beginner",
    duration: "6h 05m",
    episodesCount: 15,
    rating: 4.93,
    matchScore: 95,
    originalLanguage: "English 🇺🇸",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1600&auto=format&fit=crop",
    badge: "TRENDING",
    whatYouWillLearn: [
      "Read income statements and balance sheets with confidence",
      "Understand compound growth, interest rates, and inflation hedges",
      "Build a diversified low-cost global index investment strategy",
      "Manage risk and liquidity across life stages"
    ],
    lessons: [
      {
        id: "umf-1",
        title: "1. The Mechanics of Currency & Banking",
        episodeNumber: 1,
        duration: "25m",
        description: "How money is created, central banks operate, and monetary policy impacts your wallet.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-spanish-30-days",
    title: "Spanish Conversation in 30 Days",
    subtitle: "Speak confidently with native grammar patterns and key vocabulary.",
    description: "Mateo Silva shares the polyglot technique to unlock everyday Spanish conversation rapidly through frequency lists, natural cadence, and contextual stories.",
    teacherId: "teacher-mateo-silva",
    teacherName: "Mateo Silva",
    teacherAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    subject: "Languages",
    level: "Beginner",
    duration: "5h 15m",
    episodesCount: 12,
    rating: 4.91,
    matchScore: 93,
    originalLanguage: "Español 🇪🇸",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&auto=format&fit=crop",
    badge: "NEW",
    whatYouWillLearn: [
      "Master the top 300 Spanish words that cover 65% of daily spoken language",
      "Understand regular and key irregular verbs in present and past tenses",
      "Navigate social gatherings, travel, and cultural exchanges smoothly",
      "Develop natural pronunciation and Madrid/Latin American accent awareness"
    ],
    lessons: [
      {
        id: "s30-1",
        title: "1. The 5 Core Verbs You Need First",
        episodeNumber: 1,
        duration: "23m",
        description: "Estar, Ser, Tener, Querer, and Ir: unlocking 80% of beginner expressions.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-understanding-chemistry",
    title: "Understanding Chemistry",
    subtitle: "Molecules, reactions, bonding, and the atomic foundation of matter.",
    description: "Discover the atomic dance that forms everything around us. From water synthesis to organic chemical structures, chemistry is brought to life with visual physics models.",
    teacherId: "teacher-aris-thorne",
    teacherName: "Dr. Aris Thorne",
    teacherAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    subject: "Science",
    level: "Intermediate",
    duration: "6h 40m",
    episodesCount: 15,
    rating: 4.94,
    matchScore: 91,
    originalLanguage: "English 🇬🇧",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop",
    whatYouWillLearn: [
      "Understand periodic table trends and electron orbital configuration",
      "Predict chemical reaction outcomes and stoichiometry balance",
      "Grasp thermodynamics, enthalpy, and chemical equilibrium",
      "Explore organic chemistry functional groups"
    ],
    lessons: [
      {
        id: "uc-1",
        title: "1. Inside the Atom",
        episodeNumber: 1,
        duration: "25m",
        description: "Protons, neutrons, and quantum electron probability clouds.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-web-dev-fundamentals",
    title: "Web Development Fundamentals",
    subtitle: "Build modern, responsive websites with HTML, CSS, and modern JavaScript.",
    description: "Learn how the internet works under the hood. Sarah Jenkins teaches clean HTML structural semantics, modern Flexbox & Grid layouts, and dynamic DOM manipulation.",
    teacherId: "teacher-sarah-jenkins",
    teacherName: "Sarah Jenkins",
    teacherAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    subject: "Technology",
    level: "Beginner",
    duration: "7h 30m",
    episodesCount: 19,
    rating: 4.91,
    matchScore: 96,
    originalLanguage: "English 🇺🇸",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
    whatYouWillLearn: [
      "Structure semantic HTML pages for accessibility and SEO",
      "Design stunning layouts with modern CSS Grid and Flexbox",
      "Add interactive behavior using vanilla JavaScript DOM methods",
      "Deploy live websites to global edge networks"
    ],
    lessons: [
      {
        id: "wdf-1",
        title: "1. How the Web Works",
        episodeNumber: 1,
        duration: "20m",
        description: "DNS, HTTP requests, browsers, and rendering web pages.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-practical-photography",
    title: "Cinematic Photography & Composition",
    subtitle: "Tell stories with light, camera settings, framing, and color grading.",
    description: "Unlock the visual power of lighting, framing, and color theory. Learn how to transform raw camera captures into compelling artistic imagery.",
    teacherId: "teacher-marcus-vance",
    teacherName: "Prof. Marcus Vance",
    teacherAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    subject: "Creative",
    level: "Beginner",
    duration: "4h 20m",
    episodesCount: 11,
    rating: 4.87,
    matchScore: 90,
    originalLanguage: "English 🇬🇧",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600&auto=format&fit=crop",
    whatYouWillLearn: [
      "Master the exposure triangle: Aperture, Shutter Speed, and ISO",
      "Apply compositional guidelines like rule of thirds and leading lines",
      "Utilize natural golden hour light and studio lighting setups",
      "Color grade photos in Lightroom and Photoshop"
    ],
    lessons: [
      {
        id: "cpc-1",
        title: "1. Controlling Light: The Exposure Triangle",
        episodeNumber: 1,
        duration: "22m",
        description: "Aperture depth-of-field vs shutter speed motion blur.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  },
  {
    id: "course-practical-life-skills",
    title: "Skills for Life: Critical Thinking & Negotiations",
    subtitle: "Navigate difficult conversations, make sound decisions, and negotiate gracefully.",
    description: "Elena Rostova presents practical frameworks for mental models, cognitive bias mitigation, high-stakes negotiation, and clear decision-making under pressure.",
    teacherId: "teacher-elena-rostova",
    teacherName: "Elena Rostova",
    teacherAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    subject: "Practical Skills",
    level: "Beginner",
    duration: "4h 45m",
    episodesCount: 10,
    rating: 4.95,
    matchScore: 97,
    originalLanguage: "English 🇨🇦",
    availableLanguages: ["Deutsch", "English", "Français", "Español", "Kiswahili"],
    hasDubbing: true,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    badge: "TRENDING",
    whatYouWillLearn: [
      "Identify common logical fallacies and mental biases in argument",
      "Prepare for job salary negotiations and contract agreements",
      "De-escalate interpersonal conflicts constructively",
      "Use first-principles thinking to solve stubborn personal problems"
    ],
    lessons: [
      {
        id: "sfl-1",
        title: "1. First Principles Thinking",
        episodeNumber: 1,
        duration: "24m",
        description: "Deconstructing problems down to fundamental truths.",
        videoUrl: SAMPLE_VIDEO_URL
      }
    ]
  }
];

// Initial Continue Learning State for Prototype
export const INITIAL_USER_PROGRESS: UserProgress[] = [
  {
    courseId: "course-german-everyday",
    lastEpisodeId: "gfe-4",
    percentComplete: 82,
    lastWatchedAt: "2 hours ago"
  },
  {
    courseId: "course-python-beginners",
    lastEpisodeId: "pyb-2",
    percentComplete: 51,
    lastWatchedAt: "Yesterday"
  },
  {
    courseId: "course-physics-simple",
    lastEpisodeId: "pms-1",
    percentComplete: 34,
    lastWatchedAt: "3 days ago"
  }
];

// Available Subjects List
export const ALL_SUBJECTS: SubjectCategory[] = [
  "Languages",
  "Mathematics",
  "Technology",
  "Business",
  "Science",
  "Cooking",
  "Finance",
  "Creative",
  "History",
  "Music",
  "Practical Skills"
];

// Default Initial Profile
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "user-alex",
  name: "Alex Vance",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
  role: "learner",
  preferredLanguage: "English (US)",
  interests: ["Languages", "Mathematics", "Technology", "Science"],
  hoursLearned: 48,
  completedCoursesCount: 6,
  subscriptionPlan: "Premium"
};
