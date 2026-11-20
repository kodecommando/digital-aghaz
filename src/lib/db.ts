import crypto from "node:crypto";
import { Pool } from "@neondatabase/serverless";
import type { LeadRecord } from "./crm.ts";

export interface PortfolioRecord {
  id: string;
  slug: string;
  title: string;
  category:
    | "Branding"
    | "Web Design"
    | "Applications"
    | "Video"
    | "Marketing"
    | "AI Solutions";
  isConceptDemo: boolean;
  summary: string;
  objective: string;
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  services: string[];
  coverImage: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
}

export interface InsightRecord {
  id: string;
  slug: string;
  title: string;
  category:
    | "AI"
    | "Technology"
    | "Digital Marketing"
    | "Web Development"
    | "Branding"
    | "Business Growth"
    | "Tutorials";
  author: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  readMinutes: number;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface MagicTokenRecord {
  tokenHash: string;
  email: string;
  expiresAt: number;
  used: boolean;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  actor: string;
  detail: string;
  createdAt: string;
}

export interface AgencyDatabase {
  leads: LeadRecord[];
  portfolio: PortfolioRecord[];
  insights: InsightRecord[];
  magicTokens: MagicTokenRecord[];
  auditLogs: AuditLogRecord[];
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const SEED_PORTFOLIO: PortfolioRecord[] = [
  {
    id: "demo-brand-system",
    slug: "khyber-roast-brand-system",
    title: "Khyber Roast — Fresh Coffee Brand & Packaging",
    category: "Branding",
    isConceptDemo: true,
    summary:
      "A clean logo, bold cup & pouch packaging, and matching social posts built for a modern coffee brand.",
    objective:
      "Give the coffee house a sharp, recognizable look across coffee bags, cups, menus, and Instagram.",
    challenge:
      "Many new food brands use different fonts and colors on every post, which makes people scroll right past them.",
    strategy:
      "Pick two strong colors, one clean logo style, and build templates anyone on the team can edit in minutes.",
    execution:
      "Created the main logo, coffee pouch wraps, printed menu layout, and a ready-to-use social template pack.",
    deliverables: [
      "Logo pack in print & web sizes",
      "Coffee bag & cup wrap designs",
      "Editable Instagram & TikTok templates",
      "Simple 1-page brand color guide",
    ],
    services: [
      "Graphic Design & Branding",
      "Social Media & Content Production",
    ],
    coverImage: "/src/assets/images/case_khyber_roast_1794997817138.jpg",
    featured: true,
    published: true,
    publishedAt: "2026-11-05",
  },
  {
    id: "demo-commerce-web",
    slug: "nordic-craft-storefront-demo",
    title: "Nordic Craft — Fast Online Store Demo",
    category: "Web Design",
    isConceptDemo: true,
    summary:
      "A clean, fast online shop where customers find products in two taps and check out smoothly on their phones.",
    objective:
      "Show how a store can look clean, load quickly on mobile data, and help shoppers buy without confusion.",
    challenge:
      "Slow pages, messy popups, and hidden shipping info make shoppers close their tabs before buying.",
    strategy:
      "Use bright product photos, clear prices up front, fast category filters, and a simple phone-friendly cart.",
    execution:
      "Built a fast storefront layout with crisp product cards, Google search tags, and tested checkout steps.",
    deliverables: [
      "Mobile & desktop store layout",
      "Easy-to-browse product filters",
      "Google search titles & sitemap",
      "Speed & form test checklist",
    ],
    services: ["Website & E-commerce Development", "SEO & Digital Marketing"],
    coverImage: "/src/assets/images/case_nordic_craft_1794997819400.jpg",
    featured: true,
    published: true,
    publishedAt: "2026-11-06",
  },
  {
    id: "demo-mobile-ops",
    slug: "fieldflow-mobile-companion-concept",
    title: "FieldFlow — Simple Job Tracking App Concept",
    category: "Applications",
    isConceptDemo: true,
    summary:
      "An easy mobile app preview built so field teams can check tasks, send photos, and get approvals fast.",
    objective:
      "Let teams test clickable app screens on a real phone first, saving time and budget before coding.",
    challenge:
      "Important updates get lost in messy WhatsApp groups, leaving managers unsure what work is done.",
    strategy:
      "Put daily jobs, status buttons, and client sign-off into three clean screens anyone can use on the go.",
    execution:
      "Designed clear high-contrast screens with large thumb-friendly buttons in both light and dark modes.",
    deliverables: [
      "Screen-by-screen user flow map",
      "Clickable mobile prototype",
      "Light & dark UI screen kit",
      "Clear step-by-step build plan",
    ],
    services: ["Mobile Applications & UI/UX"],
    coverImage: "/src/assets/images/case_fieldflow_mobile_1794997820131.jpg",
    featured: true,
    published: true,
    publishedAt: "2026-11-08",
  },
  {
    id: "demo-ai-rag",
    slug: "sop-knowledge-assistant-demo",
    title: "Company Handbook Bot — Safe AI Answer Demo",
    category: "AI Solutions",
    isConceptDemo: true,
    summary:
      "A private AI helper that answers staff questions directly from your own company files—no wild guessing.",
    objective:
      "Help teams find exact answers in seconds while keeping private data locked down and easy to double-check.",
    challenge:
      "Staff spend hours hunting through long PDFs, while public chatbots often make up wrong answers.",
    strategy:
      "Connect the bot only to approved company docs, show exact source links under every answer, and pass tricky questions to a human.",
    execution:
      "Built a simple search-and-answer box with strict login rules, tested answers, and instant source cards.",
    deliverables: [
      "Private company file search setup",
      "Staff login & access controls",
      "Tested Q&A accuracy report",
      "One-click human handoff button",
    ],
    services: ["AI, Software & Automation"],
    coverImage: "/src/assets/images/case_sop_assistant_1794997821456.jpg",
    featured: true,
    published: true,
    publishedAt: "2026-11-10",
  },
  {
    id: "demo-video-series",
    slug: "bilingual-tech-explainer-series",
    title: "English & Urdu Tech Videos — Reel & YouTube Pack",
    category: "Video",
    isConceptDemo: true,
    summary:
      "Short Reels and YouTube videos in everyday English and Urdu with bold hooks, clean cuts, and easy-to-read captions.",
    objective:
      "Make tech and AI tips simple so anyone can watch, understand in seconds, and share with friends.",
    challenge:
      "Most tech videos feel too slow or use heavy words, so people swipe away in the first three seconds.",
    strategy:
      "Open with a direct everyday question, cut pauses tightly, use big readable captions, and pair with bold thumbnails.",
    execution:
      "Edited ready-to-post vertical Reels (9:16) and widescreen YouTube videos (16:9) with copyright-safe music.",
    deliverables: [
      "Short English & Urdu video scripts",
      "Reels & YouTube ready video exports",
      "Clean synced captions",
      "High-click thumbnail designs",
    ],
    services: [
      "Video Editing & Production",
      "Social Media & Content Production",
    ],
    coverImage: "/src/assets/images/case_bilingual_video_1794997824444.jpg",
    featured: false,
    published: true,
    publishedAt: "2026-11-12",
  },
  {
    id: "demo-growth-funnel",
    slug: "b2b-lead-discovery-framework",
    title: "Google Search & Lead Plan — Small Business Demo",
    category: "Marketing",
    isConceptDemo: true,
    summary:
      "A clear Google search plan, fast landing page, and quick inquiry form made to bring real local and global leads.",
    objective:
      "Help service businesses stop wasting ad budget and turn search clicks into actual phone calls and messages.",
    challenge:
      "Businesses run ads to slow pages that never clearly explain the service or make it easy to message.",
    strategy:
      "Fix page speed and wording first, target the exact words buyers search, and add one-tap WhatsApp and form contact.",
    execution:
      "Mapped top customer search terms, cleaned up page titles, and connected simple click tracking.",
    deliverables: [
      "Plain-English SEO fix list",
      "Top buyer search keyword map",
      "Clean landing page layout",
      "Simple click & lead tracking",
    ],
    services: ["SEO & Digital Marketing", "Website & E-commerce Development"],
    coverImage: "/src/assets/images/case_b2b_growth_1794997821255.jpg",
    featured: false,
    published: true,
    publishedAt: "2026-11-14",
  },
];

const SEED_INSIGHTS: InsightRecord[] = [
  {
    id: "insight-security-checks",
    slug: "how-fast-mobile-websites-turn-visitors-into-clients",
    title: "How Fast Mobile Websites Turn Visitors Into Real Clients",
    category: "Web Development",
    author: "Digital Aghaz Team",
    excerpt:
      "Why clean mobile layouts, fast image loading, and clear call-to-action buttons keep buyers on your site and boost real inquiries.",
    content: [
      "Most potential clients open your link on a phone while commuting or comparing two agencies side by side. If a page takes five seconds to appear or buttons jump around, they close the tab.",
      "1. Keep above-the-fold messaging sharp: Show what you build, who it helps, and one obvious button to start a conversation within the first screen.",
      "2. Optimize images and layout for every screen: Resize media properly, test tap targets on phones and tablets, and remove heavy scripts that slow down first paint.",
      "3. Make contacting you effortless: Offer both a quick project form and one-tap WhatsApp messaging so buyers can reach you in their preferred way.",
    ],
    coverImage: "/src/assets/images/insight_app_security_1794997822523.jpg",
    readMinutes: 4,
    published: true,
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-15",
  },
  {
    id: "insight-rag-honesty",
    slug: "how-to-build-useful-ai-agents-without-hype",
    title: "How to Use AI for Your Business Without the Hype",
    category: "AI",
    author: "Digital Aghaz Team",
    excerpt:
      "Practical ways to let AI answer customer questions from your real files—while keeping a human in charge when it counts.",
    content: [
      "Almost every business hears they need AI right now, yet many rush to launch chatbots that make up wrong prices or give messy answers.",
      "A helpful business bot only looks inside your approved files—like your price sheet, FAQ, or staff handbook—and refuses to guess when info is missing.",
      "Before going live, test your bot against 20 real questions customers ask every week, show which file each answer came from, and always leave one easy click to talk to a real person.",
    ],
    coverImage: "/src/assets/images/insight_rag_architecture_1794997821391.jpg",
    readMinutes: 3,
    published: true,
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-12",
  },
  {
    id: "insight-conversion-ux",
    slug: "why-clarity-beats-flashy-effects-for-business-websites",
    title: "Why Plain English Beats Fancy Buzzwords on Your Website",
    category: "Business Growth",
    author: "Digital Aghaz Team",
    excerpt:
      "Visitors leave in 5 seconds if they cannot tell what you sell. Simple words, real examples, and an easy contact button win more buyers.",
    content: [
      "Most websites do not lose customers because of ugly fonts—they lose customers because nobody can tell what the company actually does in the first five seconds.",
      "Swap heavy corporate words for plain language your customers use every day. Show what you build, list the exact steps, and put a clear contact or WhatsApp button right where they can see it.",
      "Honest work samples—even clearly labeled demo builds—earn far more trust than fake countdown timers or over-the-top claims.",
    ],
    coverImage: "/src/assets/images/insight_clarity_ux_1794997822322.jpg",
    readMinutes: 3,
    published: true,
    publishedAt: "2026-11-09",
    updatedAt: "2026-11-09",
  },
  {
    id: "insight-urdu-english-content",
    slug: "dual-language-content-systems-for-pakistani-and-global-brands",
    title: "Posting in Both English & Urdu Without Doing Double Work",
    category: "Digital Marketing",
    author: "Digital Aghaz Team",
    excerpt:
      "A simple way for Pakistani and global brands to plan one topic a week and share it naturally in both English and Urdu.",
    content: [
      "Reaching both local Pakistani customers and international buyers does not mean you need two separate teams.",
      "Start with one clear topic each week—a real customer question, quick tip, or short case story—and write it once in simple English, then adapt it in natural everyday Urdu.",
      "With clean templates and clear captions, one small team can keep Instagram, TikTok, YouTube, and LinkedIn active without burning out.",
    ],
    coverImage:
      "/src/assets/images/insight_bilingual_editorial_1794997824379.jpg",
    readMinutes: 3,
    published: true,
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-06",
  },
];

let writeQueue: Promise<unknown> = Promise.resolve();
let initialized = false;
let useLocalFallback = false;
let cachedDb: AgencyDatabase | null = null;

function cloneDb(db: AgencyDatabase): AgencyDatabase {
  return structuredClone(db);
}

function createInitialDb(): AgencyDatabase {
  return {
    leads: [],
    portfolio: SEED_PORTFOLIO,
    insights: SEED_INSIGHTS,
    magicTokens: [],
    auditLogs: [
      {
        id: crypto.randomUUID(),
        action: "SYSTEM_INIT",
        actor: "system",
        detail:
          "Initialized Digital Aghaz datastore with showcase projects and guides.",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

async function initializeDatabase(): Promise<void> {
  if (initialized) return;
  if (!process.env.DATABASE_URL) {
    useLocalFallback = true;
    if (!cachedDb) cachedDb = createInitialDb();
    initialized = true;
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS magic_link_tokens (
      token_hash TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS portfolio (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS insights (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const seedDb = createInitialDb();
  for (const item of seedDb.portfolio) {
    await pool.query(
      `INSERT INTO portfolio (id, data) VALUES ($1, $2::jsonb)
       ON CONFLICT (id) DO NOTHING`,
      [item.id, JSON.stringify(item)],
    );
  }
  for (const item of seedDb.insights) {
    await pool.query(
      `INSERT INTO insights (id, data) VALUES ($1, $2::jsonb)
       ON CONFLICT (id) DO NOTHING`,
      [item.id, JSON.stringify(item)],
    );
  }

  const auditCount = await pool.query<{ count: string }>(
    "SELECT COUNT(*)::text AS count FROM audit_logs",
  );
  if (auditCount.rows[0]?.count === "0") {
    for (const item of seedDb.auditLogs) {
      await pool.query(
        "INSERT INTO audit_logs (id, data) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING",
        [item.id, JSON.stringify(item)],
      );
    }
  }

  initialized = true;
}

export async function readDb(): Promise<AgencyDatabase> {
  await initializeDatabase();

  if (useLocalFallback) {
    if (!cachedDb) cachedDb = createInitialDb();
    return cloneDb(cachedDb);
  }

  const [leadResult, auditResult, tokenResult, portfolioResult, insightResult] =
    await Promise.all([
      pool.query<{ data: LeadRecord }>(
        "SELECT data FROM inquiries ORDER BY created_at DESC",
      ),
      pool.query<{ data: AuditLogRecord }>(
        "SELECT data FROM audit_logs ORDER BY created_at DESC",
      ),
      pool.query<{ data: MagicTokenRecord }>(
        "SELECT data FROM magic_link_tokens",
      ),
      pool.query<{ data: PortfolioRecord }>("SELECT data FROM portfolio"),
      pool.query<{ data: InsightRecord }>("SELECT data FROM insights"),
    ]);

  const storedPortfolio = portfolioResult.rows.map((row) => row.data);
  const seedPortfolioMap = new Map(
    SEED_PORTFOLIO.map((item) => [item.id, item]),
  );
  const portfolio = storedPortfolio.map((item) => {
    const seed = seedPortfolioMap.get(item.id);
    return seed
      ? { ...seed, featured: item.featured, published: item.published }
      : item;
  });

  const storedInsights = insightResult.rows.map((row) => row.data);
  const seedInsightMap = new Map(SEED_INSIGHTS.map((item) => [item.id, item]));
  const insights = storedInsights.map((item) => {
    const seed = seedInsightMap.get(item.id);
    return seed ? { ...seed, published: item.published } : item;
  });

  const hydrated: AgencyDatabase = {
    leads: leadResult.rows.map((row) => row.data),
    portfolio,
    insights,
    magicTokens: tokenResult.rows.map((row) => row.data),
    auditLogs: auditResult.rows.map((row) => row.data),
  };
  cachedDb = hydrated;
  return cloneDb(hydrated);
}

export async function mutateDb<T>(
  fn: (db: AgencyDatabase) => Promise<T> | T,
): Promise<T> {
  const task = writeQueue.then(async () => {
    await initializeDatabase();
    cachedDb = null;
    const db = await readDb();
    const result = await fn(db);

    if (useLocalFallback) {
      cachedDb = cloneDb(db);
      return result;
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query("DELETE FROM inquiries");
      for (const item of db.leads) {
        await client.query(
          "INSERT INTO inquiries (id, data) VALUES ($1, $2::jsonb)",
          [item.id, JSON.stringify(item)],
        );
      }

      await client.query("DELETE FROM audit_logs");
      for (const item of db.auditLogs) {
        await client.query(
          "INSERT INTO audit_logs (id, data) VALUES ($1, $2::jsonb)",
          [item.id, JSON.stringify(item)],
        );
      }

      await client.query("DELETE FROM magic_link_tokens");
      for (const item of db.magicTokens) {
        await client.query(
          "INSERT INTO magic_link_tokens (token_hash, data) VALUES ($1, $2::jsonb)",
          [item.tokenHash, JSON.stringify(item)],
        );
      }

      await client.query("DELETE FROM portfolio");
      for (const item of db.portfolio) {
        await client.query(
          "INSERT INTO portfolio (id, data) VALUES ($1, $2::jsonb)",
          [item.id, JSON.stringify(item)],
        );
      }

      await client.query("DELETE FROM insights");
      for (const item of db.insights) {
        await client.query(
          "INSERT INTO insights (id, data) VALUES ($1, $2::jsonb)",
          [item.id, JSON.stringify(item)],
        );
      }

      await client.query("COMMIT");

      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  });

  writeQueue = task.catch(() => null);
  return task;
}
