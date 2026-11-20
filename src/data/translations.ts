import type { Language } from '../types/agency';

export interface TranslationBundle {
  nav: {
    home: string;
    services: string;
    allServices: string;
    work: string;
    about: string;
    insights: string;
    contact: string;
    startProject: string;
    aiAdvisor: string;
    themeDark: string;
    themeLight: string;
    menuOpen: string;
    menuClose: string;
  };
  trustIndicators: {
    kicker: string;
    headline: string;
    partnersLabel: string;
    badgesLabel: string;
    badges: Array<{ id: string; title: string; detail: string }>;
  };
  hero: {
    kicker: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    engineCaption: string;
  };
  intro: {
    kicker: string;
    headline: string;
    body: string;
    pillars: Array<{ num: string; title: string; desc: string }>;
  };
  servicesSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    exploreLink: string;
    viewAll: string;
  };
  whySection: {
    kicker: string;
    headline: string;
    subheadline: string;
    askAiCta: string;
    points: Array<{ title: string; desc: string }>;
  };
  chartSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    badge: string;
    metrics: Array<{ label: string; value: number; suffix: string; note: string }>;
    stages: string[];
    disclaimer: string;
  };
  workSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    conceptLabel: string;
    viewCase: string;
    allWork: string;
  };
  processSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    steps: Array<{ num: string; title: string; desc: string }>;
  };
  industriesSection: {
    kicker: string;
    headline: string;
    items: Array<{ name: string; offers: string }>;
  };
  insightsSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    readArticle: string;
    exploreInsights: string;
  };
  faqSection: {
    kicker: string;
    headline: string;
    items: Array<{ q: string; a: string }>;
  };
  testimonialsSection: {
    kicker: string;
    headline: string;
    subheadline: string;
    prevLabel: string;
    nextLabel: string;
    outcomeLabel: string;
    exploreService: string;
    disclaimer: string;
    items: Array<{
      id: string;
      shortLabel: string;
      serviceLine: string;
      serviceSlug: string;
      quote: string;
      author: string;
      role: string;
      outcomeHeadline: string;
      outcomeDetail: string;
    }>;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  form: {
    stepLabels: string[];
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    company: string;
    companyPlaceholder: string;
    country: string;
    countryPlaceholder: string;
    servicesLabel: string;
    description: string;
    descriptionPlaceholder: string;
    budget: string;
    timeline: string;
    budgetOptions: string[];
    timelineOptions: string[];
    nextBtn: string;
    backBtn: string;
    submitBtn: string;
    submittingBtn: string;
    sendWhatsappBtn: string;
    whatsappSuccessBtn: string;
    whatsappNote: string;
    successTitle: string;
    successBody: string;
    referenceLabel: string;
    sendAnother: string;
    requiredHint: string;
    errors: {
      fullName: string;
      email: string;
      country: string;
      services: string;
      description: string;
    };
  };
  chatbot: {
    buttonLabel: string;
    title: string;
    subtitle: string;
    deepThinkingLabel: string;
    introPrompt: string;
    placeholder: string;
    send: string;
    thinkingStatus: string;
    quickPrompts: string[];
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    contactNote: string;
    emailPlaceholder: string;
    whatsappPlaceholder: string;
    locationLabel: string;
    privacy: string;
    terms: string;
    adminPortal: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      allServices: 'All Services',
      work: 'Our Work',
      about: 'About',
      insights: 'Articles',
      contact: 'Contact',
      startProject: 'Start a Project',
      aiAdvisor: 'AI Helper',
      themeDark: 'Switch to Dark Mode',
      themeLight: 'Switch to Light Mode',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    trustIndicators: {
      kicker: 'Trusted Stack & Standards',
      headline: 'Built on proven platforms you already trust.',
      partnersLabel: 'Platforms & Engineering Stack',
      badgesLabel: 'Every Project Includes',
      badges: [
        {
          id: 'speed-quality',
          title: 'Fast on Every Device',
          detail: 'Tuned for mobile phones, tablets & laptops before launch',
        },
        {
          id: 'written-plan',
          title: 'Written Plan Up Front',
          detail: 'Clear scope, timeline & honest pricing before we start',
        },
        {
          id: 'official-licenses',
          title: 'Official Licenses Only',
          detail: 'Clean code, licensed fonts & 100% owned files',
        },
        {
          id: 'bilingual-delivery',
          title: 'English & Urdu Support',
          detail: 'Serving clients across Pakistan & worldwide',
        },
      ],
    },
    hero: {
      kicker: 'Digital Aghaz · Design, Web, Video & AI Team',
      headlineStart: 'Your business deserves ',
      headlineHighlight: 'website & brand',
      headlineEnd: ' that actually brings in clients.',
      subheadline:
        'We build fast websites, sharp logos, engaging videos, smart marketing, and helpful AI tools—all from one friendly team.',
      primaryCta: 'Start Your Project',
      secondaryCta: 'See Our Work',
      scrollHint: 'Scroll to see how it works',
      engineCaption: '',
    },
    intro: {
      kicker: 'How We Help',
      headline: 'One small, focused team. Everything under one roof.',
      body: 'Instead of hiring five separate freelancers who never talk to each other, you get one team covering your design, website, videos, and smart tools.',
      pillars: [
        {
          num: '01',
          title: 'Media & Videos',
          desc: 'Short Reels, YouTube guides, and clear stories in both English and Urdu.',
        },
        {
          num: '02',
          title: 'Client Work',
          desc: 'Logos, fast websites, online shops, mobile apps, video edits, and ads.',
        },
        {
          num: '03',
          title: 'Ready Kits',
          desc: 'Templates, reel packs, and short guides you can edit and use right away.',
        },
        {
          num: '04',
          title: 'Smart AI Tools',
          desc: 'Simple chatbots and automations that save hours of boring copy-paste work.',
        },
      ],
    },
    servicesSection: {
      kicker: 'Our Services',
      headline: 'Pick what your business needs next.',
      subheadline:
        'We do eight things really well. Click any card below to see what you get, how we build it, and what comes in the package.',
      exploreLink: 'See details',
      viewAll: 'See All 8 Services',
    },
    whySection: {
      kicker: 'Why People Choose Us',
      headline: 'No buzzwords. Clear plans and honest work.',
      subheadline:
        'Before we design a single screen or write one line of code, we put the exact scope, timeline, and deliverables in plain writing.',
      askAiCta: 'Ask our helper about how we work',
      points: [
        {
          title: 'Design & Code Together',
          desc: 'Our designers, video editors, and coders work off the same plan so everything matches.',
        },
        {
          title: 'Clear Plan Up Front',
          desc: 'Every job starts with a simple written brief, clear price, and fixed steps—no surprises.',
        },
        {
          title: 'Safe, Honest Tools',
          desc: 'We use legal licenses, keep your keys on secure servers, and test every AI answer.',
        },
        {
          title: 'Local & Global Ready',
          desc: 'Proudly serving businesses across Pakistan and around the world in English and Urdu.',
        },
      ],
    },
    chartSection: {
      kicker: 'Simple Numbers',
      headline: 'Good planning saves time and gets you live faster.',
      subheadline:
        'See how our 5-step plan cuts endless back-and-forth edits and gets your project from a rough idea to launch day smoothly.',
      badge: '5-Step Launch Path',
      metrics: [
        { label: 'Core Areas', value: 4, suffix: '', note: 'Media, Client Work, Kits, AI' },
        { label: 'Clear Steps', value: 10, suffix: '', note: 'First Chat to Final Launch' },
        { label: 'Project Docs', value: 5, suffix: '', note: 'Brief, Quote, Deal, List, Files' },
        { label: 'Device Tests', value: 3, suffix: '', note: 'Phone, Tablet & Laptop Ready' },
      ],
      stages: ['Start', 'Plan', 'Build', 'Check', 'Live'],
      disclaimer:
        'Simple example showing how clear step-by-step planning keeps launches smooth.',
    },
    workSection: {
      kicker: 'Sample Work & Demos',
      headline: 'Look at the work before you decide.',
      subheadline:
        'Here are sample builds and demos showing how we design brands, online stores, mobile apps, videos, and smart AI tools.',
      conceptLabel: 'Sample Demo',
      viewCase: 'Read Case Study',
      allWork: 'See All Projects',
    },
    processSection: {
      kicker: '5 Easy Steps',
      headline: 'How we take your idea live.',
      subheadline:
        'No guessing games. Every single project moves smoothly through five clear steps.',
      steps: [
        {
          num: '01',
          title: 'Talk & Listen',
          desc: 'We learn about your business, your buyers, and what you want to fix first.',
        },
        {
          num: '02',
          title: 'Write the Plan',
          desc: 'We put the exact pages, designs, price, and timeline into one simple note.',
        },
        {
          num: '03',
          title: 'Build & Design',
          desc: 'Our team gets to work on your brand, website, video, or tool with steady updates.',
        },
        {
          num: '04',
          title: 'Test & Polish',
          desc: 'We verify mobile, tablet, and laptop screens, links, and load speed before you review.',
        },
        {
          num: '05',
          title: 'Go Live & Help',
          desc: 'We launch your project, hand over your files cleanly, and stay ready if you need help.',
        },
      ],
    },
    industriesSection: {
      kicker: 'Who We Help',
      headline: 'Built for growing businesses ready to stand out.',
      items: [
        {
          name: 'Online Shops',
          offers: 'Product videos, clean store setup on Shopify, and pages built to sell.',
        },
        {
          name: 'Food & Restaurants',
          offers: 'Mouth-watering food Reels, clean menus, and steady local social posts.',
        },
        {
          name: 'Schools & Academies',
          offers: 'Clear intro videos, flyers, social ads, and clean school websites.',
        },
        {
          name: 'Creators & Coaches',
          offers: 'Sharp video editing, bold thumbnails, and daily Reels cut from long videos.',
        },
        {
          name: 'Startups & Tech Teams',
          offers: 'Product websites, clickable app demos, automations, and helpful AI bots.',
        },
        {
          name: 'Local & Global Businesses',
          offers: 'New logos, fast business websites, Google search setup, and WhatsApp leads.',
        },
      ],
    },
    insightsSection: {
      kicker: 'Helpful Articles',
      headline: 'Short guides on websites, design, and AI—in plain English.',
      subheadline:
        'Quick reads for business owners who want practical tips without technical jargon.',
      readArticle: 'Read Guide',
      exploreInsights: 'See All Articles',
    },
    faqSection: {
      kicker: 'Common Questions',
      headline: 'Quick answers before we chat.',
      items: [
        {
          q: 'What kind of work does Digital Aghaz do?',
          a: 'We handle Logo & Brand Design, Websites & Shopify Stores, Mobile Apps & UI/UX, Video Editing, Google SEO & Ads, Social Media, AI Automations, and ready-to-use Digital Kits.',
        },
        {
          q: 'Can you build my business website or online store from scratch?',
          a: 'Yes! We design and launch fast business websites, landing pages, Shopify stores, and custom web apps that look sharp on every phone and connect straight to your email and WhatsApp.',
        },
        {
          q: 'Do you design mobile apps too?',
          a: 'Yes. First we design clickable phone screens so you can tap through and test your app idea early, then build clean Android and iOS apps with support.',
        },
        {
          q: 'How do your AI bots work?',
          a: 'We train private Q&A helpers only on your own approved company docs, test them on real customer questions, and always leave a quick button to reach a real human.',
        },
        {
          q: 'Do you work with clients outside Pakistan?',
          a: 'Yes! We work with clients in Pakistan, the UAE, the UK, Europe, and North America using clear written plans and easy payment methods.',
        },
        {
          q: 'How do I get a price quote or start a project?',
          a: 'Click Start a Project, pick what you need, and submit your form or hit Send via WhatsApp. We read your note and reply quickly with clear next steps.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready to launch something your customers love?',
      subheadline:
        'Tell us what you want to build. We will reply with a simple plan, honest timeline, and zero pressure.',
      primaryBtn: 'Start Your Project',
      secondaryBtn: 'Message Us',
    },
    form: {
      stepLabels: ['Your Info', 'Services', 'Your Idea', 'Budget & Time', 'Send'],
      title: 'Start Your Project',
      subtitle:
        'Tell us a bit about what you want to build. You can skip optional boxes if you are still deciding.',
      fullName: 'Your Name',
      fullNamePlaceholder: 'e.g. Ayesha Tariq',
      email: 'Email Address',
      emailPlaceholder: 'you@company.com',
      company: 'Business Name (Optional)',
      companyPlaceholder: 'e.g. Khyber Roast Coffee',
      country: 'Your Country',
      countryPlaceholder: 'e.g. Pakistan, UAE, UK, USA',
      servicesLabel: 'What do you need help with? (Pick one or more)',
      description: 'Tell us about your project',
      descriptionPlaceholder:
        'What do you want to build, who are your customers, and what problem are we fixing together?',
      budget: 'Rough Budget (Optional)',
      timeline: 'When do you want it? (Optional)',
      budgetOptions: [
        'Not sure yet',
        'Small starter project',
        'Standard business package',
        'Full custom build',
      ],
      timelineOptions: ['Flexible', '2 to 4 weeks', '1 to 2 months', 'Monthly ongoing help'],
      nextBtn: 'Next',
      backBtn: 'Back',
      submitBtn: 'Send Project Details',
      submittingBtn: 'Sending...',
      sendWhatsappBtn: 'Send via WhatsApp',
      whatsappSuccessBtn: 'Send Full Details on WhatsApp',
      whatsappNote: 'Opens WhatsApp with your details neatly filled in—just tap Send to message +92 331 2427903.',
      successTitle: 'Got it! Thank you.',
      successBody:
        'We saved your project details safely. Our team will look them over and reach out soon to set up a quick chat.',
      referenceLabel: 'Your Ticket ID',
      sendAnother: 'Send Another Request',
      requiredHint: 'Required',
      errors: {
        fullName: 'Please type your name (at least 2 letters).',
        email: 'Please enter a valid email address.',
        country: 'Please enter your country.',
        services: 'Please pick at least one service.',
        description: 'Please write at least 15 characters about your project.',
      },
    },
    chatbot: {
      buttonLabel: 'Ask AI Helper',
      title: 'Digital Aghaz AI Helper',
      subtitle: 'Instant answers about our services, pricing steps & timelines',
      deepThinkingLabel: 'Deep Check Mode',
      introPrompt:
        'Ask anything about our services, design & coding tools, or how we take your project live:',
      placeholder: 'Ask about websites, mobile apps, branding, or timelines...',
      send: 'Send',
      thinkingStatus: 'Thinking through your question...',
      quickPrompts: [
        'What services do you offer?',
        'How do your 5 project steps work?',
        'How do you keep business AI bots accurate?',
        'How can I start a website or app project?',
      ],
    },
    footer: {
      tagline:
        'One friendly team for branding, fast websites, mobile apps, video editing, marketing, and helpful AI tools.',
      servicesTitle: 'Services',
      companyTitle: 'Pages',
      contactTitle: 'Say Hello',
      contactNote: 'Direct email & WhatsApp replies available.',
      emailPlaceholder: 'salmancreatorlabs@gmail.com',
      whatsappPlaceholder: '+92 331 2427903',
      locationLabel: 'Serving Pakistan & Clients Worldwide',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      adminPortal: 'Admin Login',
      rights: '© 2026 Digital Aghaz. Simple. Clear. Built to grow.',
    },
    testimonialsSection: {
      kicker: 'How Clients Use Our Work',
      headline: 'Real fixes, clear delivery, zero confusion.',
      subheadline:
        'Sample client stories showing how our team brings design, websites, apps, and AI together simply.',
      prevLabel: 'Previous story',
      nextLabel: 'Next story',
      outcomeLabel: 'What They Got',
      exploreService: 'See this service',
      disclaimer:
        'Sample client stories showing how we deliver projects cleanly.',
      items: [
        {
          id: 'khyber-roast',
          shortLabel: 'Logo & Packaging',
          serviceLine: 'Graphic Design & Branding',
          serviceSlug: 'graphic-design',
          quote:
            'Having one team design our logo, coffee pouches, and Instagram templates meant our brand looked sharp from day one.',
          author: 'Bilal Afridi',
          role: 'Founder, Khyber Roast (Sample Story)',
          outcomeHeadline: 'Full Brand Kit & Print-Ready Bags',
          outcomeDetail:
            'Clean logo files, bilingual coffee pouch artwork, and 18 ready-to-edit social templates.',
        },
        {
          id: 'nordic-craft',
          shortLabel: 'Online Store',
          serviceLine: 'Website & E-Commerce Development',
          serviceSlug: 'web-development',
          quote:
            'No vague talk—we got a clear store plan, fast mobile pages, and a smooth handover we could run ourselves.',
          author: 'Sana Siddiqui',
          role: 'Operations Lead, Nordic Craft (Sample Story)',
          outcomeHeadline: 'Fast Mobile Store & Google Setup',
          outcomeDetail:
            'Built a fast phone-friendly product shop with clean search tags and working order forms.',
        },
        {
          id: 'fieldflow-ui',
          shortLabel: 'Mobile App Screens',
          serviceLine: 'Mobile Apps & UI/UX Design',
          serviceSlug: 'mobile-apps',
          quote:
            'Testing our app screens on a phone first saved weeks of guesswork. Our field team understood every button right away.',
          author: 'Hamza Qureshi',
          role: 'Product Manager, FieldFlow (Sample Story)',
          outcomeHeadline: '24 Clickable App Screens Tested Early',
          outcomeDetail:
            'Caught tricky steps before coding started, with clean screen specs ready for launch.',
        },
        {
          id: 'sop-rag',
          shortLabel: 'Company Q&A Bot',
          serviceLine: 'AI, Software & Automation',
          serviceSlug: 'ai-automation',
          quote:
            'We wanted a helper that quotes our real company handbooks instead of making things up—and hands off to staff when unsure.',
          author: 'Dr. Nadia Farooq',
          role: 'Operations Director, Crescent Health (Sample Story)',
          outcomeHeadline: 'Private Staff Handbook Helper',
          outcomeDetail:
            'Answers strictly from approved manuals with source links and safe server-side login.',
        },
      ],
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      services: 'سروسز',
      allServices: 'تمام سروسز',
      work: 'ہمارا کام',
      about: 'ہمارے بارے میں',
      insights: 'مضامین',
      contact: 'رابطہ',
      startProject: 'پروجیکٹ شروع کریں',
      aiAdvisor: 'AI مددگار',
      themeDark: 'ڈارک موڈ آن کریں',
      themeLight: 'لائٹ موڈ آن کریں',
      menuOpen: 'مینو کھولیں',
      menuClose: 'مینو بند کریں',
    },
    trustIndicators: {
      kicker: 'قابلِ اعتماد پلیٹ فارمز اور معیار',
      headline: 'ان مضبوط ٹولز پر تیار جن پر دنیا بھر میں بھروسہ کیا جاتا ہے۔',
      partnersLabel: 'پلیٹ فارمز اور ٹیکنالوجی اسٹیک',
      badgesLabel: 'ہر پروجیکٹ کی ضمانت',
      badges: [
        {
          id: 'speed-quality',
          title: 'ہر ڈیوائس پر تیز رفتار',
          detail: 'موبائل، ٹیبلٹ اور لیپ ٹاپ پر مکمل ٹیسٹ کے بعد لانچ',
        },
        {
          id: 'written-plan',
          title: 'شروع میں تحریری پلان',
          detail: 'کام شروع کرنے سے پہلے واضح مراحل، وقت اور صاف قیمت',
        },
        {
          id: 'official-licenses',
          title: 'صرف اصل لائسنس',
          detail: 'صاف کوڈ، قانونی فونٹس اور مکمل ملکیت والی فائلیں',
        },
        {
          id: 'bilingual-delivery',
          title: 'انگریزی اور اردو سروس',
          detail: 'پاکستان اور دنیا بھر کے کاروباروں کے لیے آسان رابطہ',
        },
      ],
    },
    hero: {
      kicker: 'ڈیجیٹل آغاز · ڈیزائن، ویب، ویڈیو اور AI ٹیم',
      headlineStart: 'آپ کے کاروبار کو بہترین ',
      headlineHighlight: 'ویب سائٹ اور پہچان',
      headlineEnd: ' چاہیے جو واقعی گاہک لائے۔',
      subheadline:
        'ہم تیز ویب سائٹس، صاف لوگو، دلچسپ ویڈیوز، ہوشیار مارکیٹنگ اور آسان AI ٹولز ایک ہی ٹیم کے ساتھ بناتے ہیں۔',
      primaryCta: 'اپنا پروجیکٹ شروع کریں',
      secondaryCta: 'ہمارا کام دیکھیں',
      scrollHint: 'نیچے دیکھیں ہم کیسے کام کرتے ہیں',
      engineCaption: '',
    },
    intro: {
      kicker: 'ہم کیسے مدد کرتے ہیں',
      headline: 'ایک مربوط ٹیم۔ سب کچھ ایک ہی جگہ۔',
      body: 'پانچ الگ الگ فری لانسرز ڈھونڈنے کے بجائے، آپ کو ایک ہی ٹیم ملتی ہے جو آپ کا ڈیزائن، ویب سائٹ، ویڈیوز اور سمارٹ ٹولز سنبھالتی ہے۔',
      pillars: [
        {
          num: '01',
          title: 'میڈیا اور ویڈیوز',
          desc: 'انگریزی اور اردو میں مختصر ریلز، یوٹیوب ویڈیوز اور آسان کہانیاں۔',
        },
        {
          num: '02',
          title: 'کلائنٹ سروسز',
          desc: 'لوگو، تیز ویب سائٹس، آن لائن اسٹورز، موبائل ایپس، ویڈیو ایڈیٹنگ اور اشتہارات۔',
        },
        {
          num: '03',
          title: 'تیار کٹس',
          desc: 'ایڈٹ ہونے والے ٹیمپلیٹس، ریل پیک اور آسان گائیڈز جو فوراً وقت بچائیں۔',
        },
        {
          num: '04',
          title: 'سمارٹ AI ٹولز',
          desc: 'آسان چیٹ بوٹس اور آٹومیشن جو روزمرہ کے بار بار کے کام ختم کریں۔',
        },
      ],
    },
    servicesSection: {
      kicker: 'ہماری سروسز',
      headline: 'اپنے کاروبار کی اگلی ضرورت منتخب کریں۔',
      subheadline:
        'ہم آٹھ کام پوری توجہ سے کرتے ہیں۔ تفصیل، طریقہ کار اور فائدے دیکھنے کے لیے نیچے کلک کریں۔',
      exploreLink: 'تفصیل دیکھیں',
      viewAll: 'تمام 8 سروسز دیکھیں',
    },
    whySection: {
      kicker: 'لوگ ہمیں کیوں چنتے ہیں',
      headline: 'بھاری الفاظ نہیں۔ صاف پلان اور سچا کام۔',
      subheadline:
        'ڈیزائن یا کوڈ شروع کرنے سے پہلے ہم مکمل کام، وقت اور ڈلیوری کی واضح تفصیل لکھ کر دیتے ہیں۔',
      askAiCta: 'کام کے طریقے کے بارے میں AI مددگار سے پوچھیں',
      points: [
        {
          title: 'ڈیزائن اور کوڈ یکجا',
          desc: 'ہمارے ڈیزائنر، ویڈیو ایڈیٹر اور ڈیولپر ایک ہی منصوبے پر مل کر کام کرتے ہیں۔',
        },
        {
          title: 'شروع میں واضح پلان',
          desc: 'ہر کام تحریری بریف، طے شدہ قیمت اور صاف مراحل سے شروع ہوتا ہے—کوئی الجھن نہیں۔',
        },
        {
          title: 'محفوظ اور سچے ٹولز',
          desc: 'ہم اصل لائسنس استعمال کرتے ہیں، چابیاں سرور پر محفوظ رکھتے ہیں اور ہر AI ٹول چیک کرتے ہیں۔',
        },
        {
          title: 'پاکستان اور عالمی کلائنٹس',
          desc: 'پاکستان اور دنیا بھر کے کاروباروں کے لیے سادہ انگریزی اور آسان اردو میں خدمات۔',
        },
      ],
    },
    chartSection: {
      kicker: 'آسان اعداد و شمار',
      headline: 'صحیح منصوبہ وقت بچاتا ہے اور کام جلدی لائیو کرتا ہے۔',
      subheadline:
        'دیکھیں کیسے ہمارا 5 مراحل والا طریقہ بار بار کی تبدیلیاں کم کر کے آپ کا پروجیکٹ آسانی سے مکمل کرتا ہے۔',
      badge: 'آسان 5 مراحل کا راستہ',
      metrics: [
        { label: 'بنیادی شعبے', value: 4, suffix: '', note: 'میڈیا، سروسز، کٹس، AI' },
        { label: 'کام کے مراحل', value: 10, suffix: '', note: 'پہلی بات سے حتمی لانچ تک' },
        { label: 'آسان دستاویزات', value: 5, suffix: '', note: 'بریف، کوٹ، معاہدہ، لسٹ، فائلیں' },
        { label: 'ڈیوائس ٹیسٹ', value: 3, suffix: '', note: 'موبائل، ٹیبلٹ اور لیپ ٹاپ' },
      ],
      stages: ['شروع', 'منصوبہ', 'تیاری', 'جانچ', 'لائیو'],
      disclaimer:
        'سادہ مثال جو دکھاتی ہے کہ واضح منصوبہ بندی سے کام کتنی آسانی سے مکمل ہوتا ہے۔',
    },
    workSection: {
      kicker: 'نمونہ پروجیکٹس',
      headline: 'فیصلہ کرنے سے پہلے ہمارا کام دیکھیں۔',
      subheadline:
        'یہ نمونہ پروجیکٹس دکھاتے ہیں کہ ہم برانڈنگ، آن لائن اسٹورز، موبائل ایپس، ویڈیوز اور AI ٹولز کیسے بناتے ہیں۔',
      conceptLabel: 'نمونہ پروجیکٹ',
      viewCase: 'مکمل کہانی پڑھیں',
      allWork: 'تمام پروجیکٹس دیکھیں',
    },
    processSection: {
      kicker: '5 آسان مراحل',
      headline: 'آپ کا آئیڈیا لائیو کیسے ہوتا ہے۔',
      subheadline:
        'کوئی اندازہ بازی نہیں۔ ہر پروجیکٹ ان پانچ سادہ مراحل سے گزرتا ہے۔',
      steps: [
        {
          num: '01',
          title: 'بات چیت اور سمجھنا',
          desc: 'ہم آپ کے کاروبار، گاہکوں اور اصل ضرورت کو آرام سے سنتے ہیں۔',
        },
        {
          num: '02',
          title: 'آسان پلان لکھنا',
          desc: 'ہم صفحات، ڈیزائن، قیمت اور وقت ایک صاف نوٹ میں لکھ کر طے کرتے ہیں۔',
        },
        {
          num: '03',
          title: 'ڈیزائن اور تیاری',
          desc: 'ہماری ٹیم باقاعدہ اپڈیٹس کے ساتھ آپ کا برانڈ، ویب سائٹ یا ویڈیو بناتی ہے۔',
        },
        {
          num: '04',
          title: 'ٹیسٹ اور صفائی',
          desc: 'فون اسکرین، لنکس، رفتار اور سیکیورٹی چیک کر کے آپ کو دکھایا جاتا ہے۔',
        },
        {
          num: '05',
          title: 'لائیو اور سپورٹ',
          desc: 'پروجیکٹ لائیو کر کے تمام فائلیں آپ کے حوالے کی جاتی ہیں اور آگے بھی مدد ملتی ہے۔',
        },
      ],
    },
    industriesSection: {
      kicker: 'کن کاروباروں کے لیے',
      headline: 'بڑھتے ہوئے کاروباروں کے لیے سادہ اور عملی حل۔',
      items: [
        {
          name: 'آن لائن اسٹورز',
          offers: 'پراڈکٹ ویڈیوز، صاف شاپائف اسٹور اور فروخت بڑھانے والے صفحات۔',
        },
        {
          name: 'فوڈ اور ریستوران',
          offers: 'دلکش فوڈ ریلز، صاف مینو اور باقاعدہ سوشل پوسٹس۔',
        },
        {
          name: 'اسکول اور اکیڈمیز',
          offers: 'تعارفی ویڈیوز، پوسٹرز، سوشل اشتہارات اور صاف ویب سائٹس۔',
        },
        {
          name: 'کریئیٹرز اور کوچز',
          offers: 'تیز ویڈیو ایڈیٹنگ، واضح تھمب نیلز اور روزانہ ریلز۔',
        },
        {
          name: 'اسٹارٹ اپس اور ٹیک ٹیمیں',
          offers: 'پراڈکٹ ویب سائٹس، کلک ایبل ایپ ڈیمو، آٹومیشن اور مددگار AI بوٹس۔',
        },
        {
          name: 'مقامی اور عالمی کاروبار',
          offers: 'نیا لوگو، تیز ویب سائٹ، گوگل سرچ سیٹ اپ اور واٹس ایپ لیڈز۔',
        },
      ],
    },
    insightsSection: {
      kicker: 'مفید مضامین',
      headline: 'ویب سائٹس، سیکیورٹی اور AI پر سادہ اردو و انگریزی رہنمائی۔',
      subheadline:
        'کاروباری افراد کے لیے آسان زبان میں مختصر اور کام کے مضامین۔',
      readArticle: 'مضمون پڑھیں',
      exploreInsights: 'تمام مضامین دیکھیں',
    },
    faqSection: {
      kicker: 'عام سوالات',
      headline: 'بات کرنے سے پہلے مختصر جوابات۔',
      items: [
        {
          q: 'ڈیجیٹل آغاز کون سے کام کرتا ہے؟',
          a: 'ہم لوگو اور برانڈ ڈیزائن، ویب سائٹس اور شاپائف اسٹورز، موبائل ایپس، ویڈیو ایڈیٹنگ، گوگل SEO و اشتہارات، سوشل میڈیا، AI آٹومیشن اور ڈیجیٹل کٹس بناتے ہیں۔',
        },
        {
          q: 'کیا آپ صفر سے کاروباری ویب سائٹ یا آن لائن اسٹور بنا سکتے ہیں؟',
          a: 'جی ہاں! ہم تیز ویب سائٹس، لینڈنگ پیجز اور شاپائف اسٹورز بناتے ہیں جو فون پر بہترین چلتے ہیں اور سیدھے آپ کے ای میل اور واٹس ایپ سے جڑتے ہیں۔',
        },
        {
          q: 'کیا آپ موبائل ایپس بھی ڈیزائن کرتے ہیں؟',
          a: 'جی ہاں۔ پہلے ہم کلک ایبل فون اسکرینز بناتے ہیں تاکہ آپ ایپ چلا کر دیکھ سکیں، پھر صاف اینڈرائیڈ اور آئی او ایس ایپ تیار کرتے ہیں۔',
        },
        {
          q: 'آپ کے AI چیٹ بوٹس کیسے کام کرتے ہیں؟',
          a: 'ہم پرائیویٹ بوٹ کو صرف آپ کی منظور شدہ فائلوں سے جوڑتے ہیں، حقیقی سوالات پر ٹیسٹ کرتے ہیں اور انسان سے بات کرنے کا آسان بٹن بھی رکھتے ہیں۔',
        },
        {
          q: 'کیا آپ پاکستان سے باہر کے کلائنٹس کے لیے بھی کام کرتے ہیں؟',
          a: 'جی ہاں! ہم پاکستان، یو اے ای، برطانیہ، یورپ اور امریکہ کے کلائنٹس کے ساتھ واضح تحریری منصوبے کے ساتھ کام کرتے ہیں۔',
        },
        {
          q: 'قیمت پوچھنے یا کام شروع کرنے کا طریقہ کیا ہے؟',
          a: 'پروجیکٹ شروع کریں پر کلک کریں، فارم بھریں یا واٹس ایپ پر بھیجیں۔ ہم آپ کی تفصیل پڑھ کر جلد واضح جواب دیتے ہیں۔',
        },
      ],
    },
    finalCta: {
      headline: 'کچھ ایسا لانچ کرنے کے لیے تیار ہیں جو آپ کے گاہک پسند کریں؟',
      subheadline:
        'ہمیں بتائیں آپ کیا بنانا چاہتے ہیں۔ ہم آپ کو ایک سادہ پلان اور ایمانداری سے وقت بتائیں گے۔',
      primaryBtn: 'اپنا پروجیکٹ شروع کریں',
      secondaryBtn: 'ہمیں میسج کریں',
    },
    form: {
      stepLabels: ['آپ کی تفصیل', 'سروسز', 'آپ کا آئیڈیا', 'بجٹ اور وقت', 'بھیجیں'],
      title: 'اپنا پروجیکٹ شروع کریں',
      subtitle:
        'بتائیں آپ کیا بنانا چاہتے ہیں۔ اگر ابھی سوچ رہے ہیں تو اختیاری خانے خالی چھوڑ دیں۔',
      fullName: 'آپ کا نام',
      fullNamePlaceholder: 'مثال: عائشہ طارق',
      email: 'ای میل ایڈریس',
      emailPlaceholder: 'you@company.com',
      company: 'کاروبار کا نام (اختیاری)',
      companyPlaceholder: 'مثال: خیبر روسٹ کافی',
      country: 'آپ کا ملک',
      countryPlaceholder: 'مثال: پاکستان، یو اے ای، برطانیہ',
      servicesLabel: 'آپ کو کس چیز میں مدد چاہیے؟ (ایک یا زیادہ چنیں)',
      description: 'اپنے پروجیکٹ کے بارے میں بتائیں',
      descriptionPlaceholder:
        'آپ کیا بنانا چاہتے ہیں، آپ کے گاہک کون ہیں اور ہم مل کر کون سا مسئلہ حل کریں؟',
      budget: 'اندازاً بجٹ (اختیاری)',
      timeline: 'آپ کو کب تک چاہیے؟ (اختیاری)',
      budgetOptions: [
        'ابھی طے نہیں',
        'چھوٹا ابتدائی پروجیکٹ',
        'معیاری کاروباری پیکج',
        'مکمل کسٹم تیاری',
      ],
      timelineOptions: ['لچکدار وقت', '2 سے 4 ہفتے', '1 سے 2 ماہ', 'ماہانہ مستقل مدد'],
      nextBtn: 'آگے',
      backBtn: 'واپس',
      submitBtn: 'تفصیل بھیجیں',
      submittingBtn: 'بھیجا جا رہا ہے...',
      sendWhatsappBtn: 'واٹس ایپ پر بھیجیں',
      whatsappSuccessBtn: 'مکمل تفصیل واٹس ایپ پر بھیجیں',
      whatsappNote: 'آپ کی پوری تفصیل واٹس ایپ باکس میں خودکار آ جائے گی—بس سینڈ دبائیں (+92 331 2427903)۔',
      successTitle: 'شکریہ! درخواست مل گئی ہے۔',
      successBody:
        'ہم نے آپ کی تفصیل محفوظ کر لی ہے۔ ہماری ٹیم جلد جائزہ لے کر آپ سے رابطہ کرے گی۔',
      referenceLabel: 'ٹکٹ نمبر',
      sendAnother: 'نئی درخواست بھیجیں',
      requiredHint: 'لازمی',
      errors: {
        fullName: 'براہ کرم اپنا نام لکھیں (کم از کم 2 حروف)۔',
        email: 'براہ کرم درست ای میل لکھیں۔',
        country: 'براہ کرم اپنا ملک لکھیں۔',
        services: 'براہ کرم کم از کم ایک سروس چنیں۔',
        description: 'براہ کرم پروجیکٹ کے بارے میں کم از کم 15 حروف لکھیں۔',
      },
    },
    chatbot: {
      buttonLabel: 'AI مددگار',
      title: 'ڈیجیٹل آغاز AI مددگار',
      subtitle: 'ہماری سروسز، کام کے مراحل اور وقت کے فوری جواب',
      deepThinkingLabel: 'گہرا جائزہ موڈ',
      introPrompt:
        'ہماری سروسز، ڈیزائن و کوڈنگ ٹولز یا اپنے پروجیکٹ کے بارے میں کوئی بھی سوال پوچھیں:',
      placeholder: 'ویب سائٹس، موبائل ایپ، برانڈنگ یا وقت کے بارے میں پوچھیں...',
      send: 'بھیجیں',
      thinkingStatus: 'آپ کے سوال کا جائزہ لیا جا رہا ہے...',
      quickPrompts: [
        'آپ کون سی سروسز دیتے ہیں؟',
        'آپ کے 5 کام کے مراحل کیسے کام کرتے ہیں؟',
        'آپ بزنس AI بوٹس کو درست کیسے رکھتے ہیں؟',
        'نئی ویب سائٹ یا ایپ کیسے شروع کریں؟',
      ],
    },
    footer: {
      tagline:
        'برانڈنگ، تیز ویب سائٹس، موبائل ایپس، ویڈیو ایڈیٹنگ، مارکیٹنگ اور آسان AI ٹولز کے لیے ایک دوستانہ ٹیم۔',
      servicesTitle: 'سروسز',
      companyTitle: 'صفحات',
      contactTitle: 'رابطہ کریں',
      contactNote: 'ای میل اور واٹس ایپ پر براہِ راست جواب دستیاب ہے۔',
      emailPlaceholder: 'salmancreatorlabs@gmail.com',
      whatsappPlaceholder: '+92 331 2427903',
      locationLabel: 'پاکستان اور دنیا بھر کے کلائنٹس کے لیے',
      privacy: 'پرائیویسی پالیسی',
      terms: 'شرائط',
      adminPortal: 'ایڈمن لاگ ان',
      rights: '© 2026 ڈیجیٹل آغاز۔ سادہ۔ واضح۔ کاروبار کی ترقی کے لیے۔',
    },
    testimonialsSection: {
      kicker: 'کام کی مثالیں',
      headline: 'اصل مسائل کا حل، صاف ڈلیوری، کوئی الجھن نہیں۔',
      subheadline:
        'مثالی کلائنٹ کہانیاں جو دکھاتی ہیں کہ ہماری ٹیم ڈیزائن، ویب سائٹس، ایپس اور AI کو آسانی سے کیسے جوڑتی ہے۔',
      prevLabel: 'پچھلی کہانی',
      nextLabel: 'اگلی کہانی',
      outcomeLabel: 'انہیں کیا ملا',
      exploreService: 'یہ سروس دیکھیں',
      disclaimer:
        'یہ نمونہ کہانیاں دکھاتی ہیں کہ ہم پروجیکٹس کتنے صاف طریقے سے مکمل کرتے ہیں۔',
      items: [
        {
          id: 'khyber-roast',
          shortLabel: 'لوگو اور پیکجنگ',
          serviceLine: 'گرافک ڈیزائن اور برانڈنگ',
          serviceSlug: 'graphic-design',
          quote:
            'ایک ہی ٹیم سے لوگو، کافی بیگ اور انسٹاگرام ٹیمپلیٹس بنوانے سے پہلے ہی دن ہمارا برانڈ پروفیشنل نظر آیا۔',
          author: 'بلال آفریدی',
          role: 'بانی، خیبر روسٹ (نمونہ کہانی)',
          outcomeHeadline: 'مکمل برانڈ کٹ اور پرنٹ کے لیے تیار پیک',
          outcomeDetail:
            'صاف لوگو فائلیں، دو لسانی کافی پیک ڈیزائن اور 18 آسان سوشل ٹیمپلیٹس۔',
        },
        {
          id: 'nordic-craft',
          shortLabel: 'آن لائن اسٹور',
          serviceLine: 'ویب سائٹ اور ای کامرس ڈیولپمنٹ',
          serviceSlug: 'web-development',
          quote:
            'کوئی گول مول بات نہیں—ہمیں صاف اسٹور پلان، تیز موبائل صفحات اور آسان کنٹرول ملا جسے ہم خود چلا سکتے ہیں۔',
          author: 'ثناء صدیقی',
          role: 'آپریشنز لیڈ، نورڈک کرافٹ (نمونہ کہانی)',
          outcomeHeadline: 'تیز موبائل اسٹور اور گوگل سیٹ اپ',
          outcomeDetail:
            'فون پر تیز کھلنے والا اسٹور، گوگل سرچ ٹیگز اور محفوظ آرڈر فارمز۔',
        },
        {
          id: 'fieldflow-ui',
          shortLabel: 'ایپ اسکرینز',
          serviceLine: 'موبائل ایپس اور UI/UX ڈیزائن',
          serviceSlug: 'mobile-apps',
          quote:
            'پہلے فون پر کلک ایبل اسکرینز چیک کرنے سے کئی ہفتے بچ گئے۔ ہماری فیلڈ ٹیم ہر بٹن فوراً سمجھ گئی۔',
          author: 'حمزہ قریشی',
          role: 'پراڈکٹ مینیجر، فیلڈ فلو (نمونہ کہانی)',
          outcomeHeadline: '24 کلک ایبل ایپ اسکرینز کا ڈیمو',
          outcomeDetail:
            'کوڈنگ شروع ہونے سے پہلے الجھنیں دور ہوئیں اور تمام اسکرینز لانچ کے لیے تیار ہو گئیں۔',
        },
        {
          id: 'sop-rag',
          shortLabel: 'کمپنی Q&A بوٹ',
          serviceLine: 'AI، سافٹ ویئر اور آٹومیشن',
          serviceSlug: 'ai-automation',
          quote:
            'ہمیں ایسا مددگار چاہیے تھا جو اندازوں کے بجائے صرف ہماری اصل کمپنی فائلوں سے جواب دے اور مشکل سوال انسان کو بھیجے۔',
          author: 'ڈاکٹر نادیہ فاروق',
          role: 'ڈائریکٹر آپریشنز، کریسنٹ ہیلتھ (نمونہ کہانی)',
          outcomeHeadline: 'اسٹاف کے لیے پرائیویٹ ہینڈ بک بوٹ',
          outcomeDetail:
            'منظور شدہ فائلوں سے حوالہ جات کے ساتھ درست جوابات اور محفوظ سرور لاگ ان۔',
        },
      ],
    },
  },
};
