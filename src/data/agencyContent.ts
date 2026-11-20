import type { ServiceDefinition } from '../types/agency';

export const SERVICES_CATALOG: ServiceDefinition[] = [
  {
    slug: 'graphic-design',
    number: '01',
    theme3d: 'branding',
    image: '/src/assets/images/fiverr_gig_branding_1795020798950.jpg',
    title: {
      en: 'Graphic Design & Branding',
      ur: 'گرافک ڈیزائن اور برانڈنگ',
    },
    shortDesc: {
      en: 'Clean logos, packaging, thumbnails, and social posts that make people remember your brand at first glance.',
      ur: 'صاف لوگو، پیکجنگ، تھمب نیلز اور سوشل میڈیا پوسٹس جو آپ کے برانڈ کو فوراً یادگار بنائیں۔',
    },
    heroHeadline: {
      en: 'Stand out with a look people trust right away.',
      ur: 'ایسی شناخت بنائیں جس پر لوگ فوراً بھروسہ کریں۔',
    },
    heroSubheadline: {
      en: 'From your logo and brand colors to packaging, pitch decks, and clickable thumbnails, we keep every visual sharp and consistent.',
      ur: 'لوگو اور رنگوں سے لے کر پیکجنگ، پریزنٹیشنز اور دلکش تھمب نیلز تک، ہر ڈیزائن صاف اور یکساں رکھا جاتا ہے۔',
    },
    problemSolved: {
      en: 'Messy posts and mismatched colors make good businesses look amateur. We give you a clean look and ready-to-use templates your team can reuse easily.',
      ur: 'بے ترتیب پوسٹس اچھے کاروبار کو بھی کمزور دکھاتی ہیں۔ ہم آپ کو ایک صاف انداز اور آسان ٹیمپلیٹس دیتے ہیں جنہیں بار بار استعمال کیا جا سکے۔',
    },
    ctaLabel: { en: 'Build Your Brand', ur: 'اپنا برانڈ بنائیں' },
    includes: {
      en: [
        'Custom logo & simple icon mark',
        'Brand colors, fonts & clear usage guide',
        'Scroll-stopping social posts & ad visuals',
        'Packaging, flyers, business cards & slide decks',
        'High-click YouTube & reel thumbnails',
      ],
      ur: [
        'کسٹم لوگو اور سادہ آئیکن نشان',
        'برانڈ کے رنگ، فونٹس اور آسان گائیڈ',
        'توجہ کھینچنے والی سوشل میڈیا پوسٹس اور اشتہارات',
        'پیکجنگ، بروشرز، وزٹنگ کارڈز اور سلائیڈز',
        'زیادہ کلک لانے والے یوٹیوب تھمب نیلز',
      ],
    },
    deliverables: {
      en: ['Print & vector logo files', 'Color & font cheat sheet', 'Editable social templates', 'Print-ready exports'],
      ur: ['پرنٹ اور ویکٹر لوگو فائلیں', 'رنگ اور فونٹ گائیڈ', 'ایڈٹ ہونے والے ٹیمپلیٹس', 'پرنٹ کے لیے تیار فائلیں'],
    },
    readinessGate: {
      en: 'Checked for sharp text contrast, clean sizing on phones, and full commercial usage rights.',
      ur: 'ڈلیوری سے پہلے فون پر صفائی، واضح رنگوں اور مکمل کمرشل حقوق کی جانچ کی جاتی ہے۔',
    },
  },
  {
    slug: 'web-development',
    number: '02',
    theme3d: 'web',
    image: '/src/assets/images/fiverr_gig_web_1795020798560.jpg',
    title: {
      en: 'Website & E-Commerce Development',
      ur: 'ویب سائٹ اور ای کامرس ڈیولپمنٹ',
    },
    shortDesc: {
      en: 'Fast, mobile-friendly websites and online stores built to turn visitors into real buyers and leads.',
      ur: 'تیز، موبائل فرینڈلی ویب سائٹس اور آن لائن اسٹورز جو وزیٹرز کو حقیقی گاہکوں میں بدلیں۔',
    },
    heroHeadline: {
      en: 'Websites that load fast, explain clearly, and bring in customers.',
      ur: 'تیز رفتار ویب سائٹس جو بات سیدھی سمجھائیں اور گاہک لائیں۔',
    },
    heroSubheadline: {
      en: 'Business websites, landing pages, Shopify and WooCommerce stores, and custom web apps built cleanly for phones and Google search.',
      ur: 'بزنس ویب سائٹس، لینڈنگ پیجز، شاپائف اسٹورز اور کسٹم ویب ایپس جو موبائل اور گوگل سرچ دونوں کے لیے تیار ہوں۔',
    },
    problemSolved: {
      en: 'Slow, confusing websites drive customers away in seconds. We organize your message so anyone understands what you sell right away and knows how to contact or buy.',
      ur: 'سست اور الجھی ویب سائٹس گاہک کو فوراً بھگا دیتی ہیں۔ ہم آپ کا پیغام اتنا واضح بناتے ہیں کہ وزیٹر فوراً رابطہ یا خریداری کرے۔',
    },
    ctaLabel: { en: 'Build Your Website', ur: 'اپنی ویب سائٹ بنائیں' },
    includes: {
      en: [
        'Custom business & portfolio websites',
        'Focused landing pages for ads & launches',
        'Shopify & WooCommerce online stores',
        'Custom web apps, dashboards & booking tools',
        'Backups, security setup & ongoing care',
      ],
      ur: [
        'کاروباری اور پورٹ فولیو ویب سائٹس',
        'اشتہارات کے لیے خاص لینڈنگ پیجز',
        'شاپائف اور ووکامرس آن لائن اسٹورز',
        'کسٹم ویب ایپس اور بکنگ ٹولز',
        'بیک اپ، سیکیورٹی اور دیکھ بھال',
      ],
    },
    deliverables: {
      en: ['Mobile-first website build', 'Google-friendly SEO & sitemap', 'Working contact & WhatsApp forms', 'Simple handover guide'],
      ur: ['موبائل و ڈیسک ٹاپ ویب سائٹ', 'گوگل سرچ اور سائٹ میپ سیٹ اپ', 'محفوظ رابطہ اور واٹس ایپ فارمز', 'آسان ہینڈ اوور گائیڈ'],
    },
    readinessGate: {
      en: 'Tested on phone and desktop screens with working forms, clean speed, and backup handover.',
      ur: 'لانچ سے پہلے موبائل اسکرین، تمام فارمز اور رفتار کی مکمل جانچ کی جاتی ہے۔',
    },
  },
  {
    slug: 'mobile-apps',
    number: '03',
    theme3d: 'mobile',
    image: '/src/assets/images/fiverr_gig_mobile_1795020694718.jpg',
    title: {
      en: 'Mobile Apps & UI/UX Design',
      ur: 'موبائل ایپس اور UI/UX ڈیزائن',
    },
    shortDesc: {
      en: 'Easy-to-use Android and iOS apps and clickable screen previews tested with real users before coding.',
      ur: 'اینڈرائیڈ اور آئی او ایس کے لیے آسان موبائل ایپس اور کلک ایبل اسکرین ڈیزائن۔',
    },
    heroHeadline: {
      en: 'Mobile apps that feel natural on the very first tap.',
      ur: 'موبائل ایپس جو پہلے ہی ٹچ پر آسان اور واضح لگیں۔',
    },
    heroSubheadline: {
      en: 'We map your app screens, build a clickable preview you can test on your phone, and craft clean Android and iOS builds with a clear support plan.',
      ur: 'ہم پہلے ایپ کی اسکرینز اور کلک ایبل ڈیمو بناتے ہیں تاکہ آپ اسے فون پر چیک کر سکیں، پھر مکمل ایپ تیار کی جاتی ہے۔',
    },
    problemSolved: {
      en: 'Jumping straight into coding an app wastes months and money. Testing clickable screens early catches confusing steps before development starts.',
      ur: 'بغیر نقشے کے ایپ بنوانے میں وقت اور پیسہ ضائع ہوتا ہے۔ پہلے کلک ایبل ڈیزائن دیکھ لینے سے ہر خامی وقت پر پکڑی جاتی ہے۔',
    },
    ctaLabel: { en: 'Create Your App', ur: 'اپنی ایپ بنائیں' },
    includes: {
      en: [
        'Simple screen-by-screen user flow map',
        'Clean wireframes & modern app screens',
        'Clickable prototype you can test yourself',
        'Android, iOS & cross-platform app builds',
        'Bug testing, security check & update plan',
      ],
      ur: [
        'آسان اسکرین بائی اسکرین یوزر فلو',
        'جدید اور صاف ایپ اسکرین ڈیزائن',
        'کلک ایبل ڈیمو جو آپ خود چلا کر دیکھیں',
        'اینڈرائیڈ اور آئی او ایس موبائل ایپس',
        'مکمل ٹیسٹنگ اور اپڈیٹ پلان',
      ],
    },
    deliverables: {
      en: ['App flow map', 'Reusable UI screen kit', 'Clickable phone demo link', 'Step-by-step build plan'],
      ur: ['ایپ فلو نقشہ', 'اسکرین ڈیزائن کٹ', 'فون پر چلنے والا ڈیمو لنک', 'مرحلہ وار تیاری کا پلان'],
    },
    readinessGate: {
      en: 'Checked for smooth button taps, screen safety, and a clear post-launch update plan.',
      ur: 'ہر ایپ میں بٹن ٹیسٹنگ، سیکیورٹی اور لانچ کے بعد کی دیکھ بھال کا پلان شامل ہوتا ہے۔',
    },
  },
  {
    slug: 'video-production',
    number: '04',
    theme3d: 'video',
    image: '/src/assets/images/fiverr_gig_video_1795020889663.jpg',
    title: {
      en: 'Video Editing & Production',
      ur: 'ویڈیو ایڈیٹنگ اور پروڈکشن',
    },
    shortDesc: {
      en: 'Sharp Reels, TikToks, YouTube videos, and animated explainers with strong hooks and clean captions.',
      ur: 'جاندار ریلز، ٹک ٹاک، یوٹیوب ویڈیوز اور اینیمیٹڈ ایکسپلینرز صاف آواز اور کیپشنز کے ساتھ۔',
    },
    heroHeadline: {
      en: 'Videos people actually finish watching.',
      ur: 'ایسی ویڈیوز جنہیں لوگ شروع سے آخر تک شوق سے دیکھیں۔',
    },
    heroSubheadline: {
      en: 'We write tight English or Urdu hooks, cut out dead space, balance audio, add clear captions, and deliver files sized for every social platform.',
      ur: 'ہم اردو اور انگریزی میں جاندار آغاز، تیز ایڈیٹنگ، صاف آواز اور واضح سب ٹائٹلز کے ساتھ ہر پلیٹ فارم کے لیے ویڈیو تیار کرتے ہیں۔',
    },
    problemSolved: {
      en: 'Even great footage gets skipped if the first 3 seconds are boring or the audio is messy. We turn raw clips into punchy stories that keep viewers hooked.',
      ur: 'اگر پہلے 3 سیکنڈ کمزور ہوں یا آواز صاف نہ ہو تو اچھی ویڈیو بھی لوگ آگے بڑھا دیتے ہیں۔ ہم کچی ویڈیو کو دلچسپ کہانی بناتے ہیں۔',
    },
    ctaLabel: { en: 'Create Your Video', ur: 'اپنی ویڈیو بنوائیں' },
    includes: {
      en: [
        'Short Reels, TikTok & YouTube Shorts',
        'Full YouTube tutorials & product reviews',
        'Animated & cartoon-style explainer videos',
        'Ad creatives that grab attention fast',
        'Clean captions, sound effects & licensed music',
      ],
      ur: [
        'مختصر ریلز، ٹک ٹاک اور یوٹیوب شارٹس',
        'مکمل یوٹیوب ویڈیوز اور پراڈکٹ ریویوز',
        'کارٹون اور اینیمیٹڈ تعلیمی ویڈیوز',
        'فوری توجہ کھینچنے والے ویڈیو اشتہارات',
        'واضح کیپشنز، ساؤنڈ ایفیکٹس اور لائسنس میوزک',
      ],
    },
    deliverables: {
      en: ['Vertical (9:16) & wide (16:9) exports', 'Synced English/Urdu subtitles', 'Matching thumbnail frame', 'Copyright-safe audio check'],
      ur: ['موبائل اور وائیڈ اسکرین ویڈیوز', 'ہم آہنگ سب ٹائٹلز', 'موزوں تھمب نیل', 'کاپی رائٹ سے پاک آڈیو'],
    },
    readinessGate: {
      en: 'Reviewed for crisp audio levels, accurate spelling in captions, and clean commercial music rights.',
      ur: 'فائنل ویڈیو میں آواز کے توازن، کیپشن کے درست ہجوں اور کاپی رائٹ کی مکمل جانچ کی جاتی ہے۔',
    },
  },
  {
    slug: 'seo-marketing',
    number: '05',
    theme3d: 'seo',
    image: '/src/assets/images/seo_showcase_card_1795021051788.jpg',
    title: {
      en: 'SEO & Digital Marketing',
      ur: 'SEO اور ڈیجیٹل مارکیٹنگ',
    },
    shortDesc: {
      en: 'Help the right buyers find you on Google, Meta, and search without wasting ad money.',
      ur: 'گوگل اور سوشل میڈیا پر صحیح گاہکوں تک پہنچیں اور اشتہاری بجٹ ضائع ہونے سے بچائیں۔',
    },
    heroHeadline: {
      en: 'Show up when customers search—and make every click count.',
      ur: 'جب گاہک تلاش کرے تو آپ سب سے پہلے نظر آئیں۔',
    },
    heroSubheadline: {
      en: 'Clean Google setup, helpful keyword content, focused Google and Meta ads, and simple reports you can actually read.',
      ur: 'درست گوگل سیٹ اپ، مفید مواد، گوگل و میٹا اشتہارات اور آسان زبان میں ماہانہ رپورٹس۔',
    },
    problemSolved: {
      en: 'Paying for ads that send people to slow, unclear pages burns cash fast. We fix your page clarity, tracking, and search setup so clicks turn into real calls.',
      ur: 'کمزور ویب سائٹ پر اشتہارات چلانا پیسے ضائع کرتا ہے۔ ہم پہلے آپ کا صفحہ اور ٹریکنگ بہتر کرتے ہیں تاکہ ہر کلک فائدہ دے۔',
    },
    ctaLabel: { en: 'Grow Your Business', ur: 'کاروبار بڑھائیں' },
    includes: {
      en: [
        'Technical SEO & Google Business setup',
        'Keyword lists matched to real buyer searches',
        'Local Pakistan & global search targeting',
        'Google Ads & Meta Ads campaign setup',
        'Clear click, lead & conversion tracking',
      ],
      ur: [
        'تکنیکی SEO اور گوگل بزنس سیٹ اپ',
        'گاہک کی اصل تلاش کے مطابق کی ورڈ پلان',
        'مقامی اور بین الاقوامی سرچ ٹارگٹنگ',
        'گوگل اور میٹا اشتہارات کا منظم سیٹ اپ',
        'کلکس اور لیڈز کی صاف ٹریکنگ',
      ],
    },
    deliverables: {
      en: ['Plain-English SEO fix list', 'Title tags & sitemap setup', 'Lead tracking setup', 'Clear ad-budget breakdown'],
      ur: ['آسان SEO بہتری لسٹ', 'ٹائٹل ٹیگز اور سائٹ میپ', 'لیڈ ٹریکنگ سیٹ اپ', 'بجٹ کا صاف حساب'],
    },
    readinessGate: {
      en: 'Your ad spend stays separate from service fees, with honest reporting and zero fake ranking promises.',
      ur: 'اشتہاری بجٹ اور فیس ہمیشہ الگ رکھی جاتی ہے اور کبھی جھوٹے وعدے نہیں کیے جاتے۔',
    },
  },
  {
    slug: 'social-media',
    number: '06',
    theme3d: 'social',
    image: '/src/assets/images/fiverr_gig_social_1795020923104.jpg',
    title: {
      en: 'Social Media & Content Production',
      ur: 'سوشل میڈیا اور مواد کی تیاری',
    },
    shortDesc: {
      en: 'Regular, human-sounding posts, reels, and captions tailored for every social platform you use.',
      ur: 'باقاعدہ اور دلچسپ پوسٹس، ریلز اور کیپشنز جو ہر سوشل میڈیا ایپ کے مزاج کے مطابق ہوں۔',
    },
    heroHeadline: {
      en: 'Stay active online with content people actually enjoy.',
      ur: 'آن لائن مستقل نظر آئیں اور ایسا مواد شیئر کریں جو لوگ پسند کریں۔',
    },
    heroSubheadline: {
      en: 'We plan your monthly calendar, write clear English or Urdu captions, resize graphics cleanly, and track real shares and saves.',
      ur: 'ہم ماہانہ پوسٹ کیلنڈر، سادہ اردو و انگریزی کیپشنز اور ہر پلیٹ فارم کے مطابق ڈیزائن تیار کرتے ہیں۔',
    },
    problemSolved: {
      en: 'Posting once a month—or copying the exact same graphic everywhere—kills reach. We run one steady calendar adapted naturally for TikTok, YouTube, Instagram, and Facebook.',
      ur: 'کبھی کبھار پوسٹ کرنے سے لوگوں کی توجہ ختم ہو جاتی ہے۔ ہم ایک منظم کیلنڈر کے تحت تمام پلیٹ فارمز کو تازہ رکھتے ہیں۔',
    },
    ctaLabel: { en: 'Build Your Social Presence', ur: 'سوشل میڈیا مضبوط کریں' },
    includes: {
      en: [
        'Monthly post calendar & easy approval sheet',
        'Custom formatting for Reels, carousels & threads',
        'Friendly English & Urdu copywriting',
        'Comment replies & audience FAQ tracking',
        'Honest tracking of saves, shares & watch time',
      ],
      ur: [
        'ماہانہ پوسٹ کیلنڈر اور آسان منظوری',
        'ریلز، کیروسل اور پوسٹس کے لیے موزوں سائز',
        'سادہ انگریزی اور اردو تحریر',
        'کمنٹس اور سوالات کے بروقت جواب',
        'ویوز سے آگے شیئرز اور دلچسپی کی رپورٹ',
      ],
    },
    deliverables: {
      en: ['Monthly content calendar', 'Ready-to-post visual packs', 'Caption & hashtag bank', 'Monthly progress summary'],
      ur: ['ماہانہ کانٹینٹ کیلنڈر', 'پوسٹ کے لیے تیار ڈیزائن', 'کیپشن اور ہیش ٹیگ لسٹ', 'ماہانہ کارکردگی خلاصہ'],
    },
    readinessGate: {
      en: '100% real organic and paid audience building—never fake followers, bots, or copied posts.',
      ur: 'مکمل طور پر حقیقی ناظرین—کبھی جعلی فالوورز یا کاپی شدہ مواد استعمال نہیں کیا جاتا۔',
    },
  },
  {
    slug: 'ai-automation',
    number: '07',
    theme3d: 'ai',
    image: '/src/assets/images/fiverr_gig_ai_1795020703930.jpg',
    title: {
      en: 'AI, Software & Automation',
      ur: 'AI، سافٹ ویئر اور آٹومیشن',
    },
    shortDesc: {
      en: 'Practical AI helpers and workflow automations that cut boring manual tasks and answer from your own files.',
      ur: 'عملی AI ٹولز اور آٹومیشن جو روزمرہ کے دفتری کام کم کریں اور آپ کی اپنی فائلوں سے درست جواب دیں۔',
    },
    heroHeadline: {
      en: 'Smart tools that take busywork off your plate.',
      ur: 'سمارٹ ٹولز جو بار بار کے بورنگ کام خود سنبھال لیں۔',
    },
    heroSubheadline: {
      en: 'We build private Q&A bots for your PDFs, helpful customer chat assistants, and clean app automations with real humans still in control.',
      ur: 'ہم آپ کے دستاویزات سے جواب دینے والے بوٹس، کسٹمر سپورٹ ٹولز اور محفوظ آٹومیشن بناتے ہیں جن پر آپ کا پورا کنٹرول رہتا ہے۔',
    },
    problemSolved: {
      en: 'Staff waste hours copying data between sheets or digging through old PDFs. We connect your tools cleanly and test every AI answer so it never guesses wildly.',
      ur: 'ٹیم کا قیمتی وقت فائلیں ڈھونڈنے اور ڈیٹا کاپی کرنے میں ضائع ہوتا ہے۔ ہم آپ کے سسٹمز کو جوڑ کر محفوظ آٹومیشن بناتے ہیں۔',
    },
    ctaLabel: { en: 'Explore AI Solutions', ur: 'AI حل دیکھیں' },
    includes: {
      en: [
        'Private Q&A bot grounded in your company docs',
        'Customer support & inquiry sorting chatbots',
        'Auto-sync between forms, WhatsApp, email & CRM',
        'Custom internal dashboards & tool connectors',
        'Safe team setup & hands-on training',
      ],
      ur: [
        'کمپنی فائلوں سے جواب دینے والا پرائیویٹ بوٹ',
        'کسٹمر سپورٹ اور لیڈ چیٹ بوٹس',
        'فارم، واٹس ایپ، ای میل اور CRM کا خودکار ربط',
        'اندرونی ڈیش بورڈز اور سمارٹ ٹولز',
        'ٹیم کے لیے محفوظ سیٹ اپ اور تربیت',
      ],
    },
    deliverables: {
      en: ['Working live demo', 'Clear data access rules', 'Real question test report', 'Human handoff button'],
      ur: ['چلتا ہوا لائیو ڈیمو', 'ڈیٹا حفاظت کے اصول', 'ٹیسٹ سوالات کی رپورٹ', 'انسانی رابطے کا بٹن'],
    },
    readinessGate: {
      en: 'Private API keys stay on the server, answers cite your real files, and edge cases pass to a human.',
      ur: 'تمام خفیہ چابیاں سرور پر محفوظ رہتی ہیں اور مشکل سوال فوراً انسان کو منتقل ہو جاتا ہے۔',
    },
  },
  {
    slug: 'digital-products',
    number: '08',
    theme3d: 'products',
    image: '/src/assets/images/fiverr_gig_products_1795020776045.jpg',
    title: {
      en: 'Digital Products & Tools',
      ur: 'ڈیجیٹل پراڈکٹس اور ٹولز',
    },
    shortDesc: {
      en: 'Ready-to-edit templates, reel kits, step-by-step ebooks, and clean software setups to move faster.',
      ur: 'تیار ٹیمپلیٹس، ریل کٹس، آسان ای بکس اور سافٹ ویئر سیٹ اپ جو آپ کا وقت بچائیں۔',
    },
    heroHeadline: {
      en: 'Ready-made kits so you never start from a blank screen.',
      ur: 'تیار ڈیزائن کٹس تاکہ آپ کو کبھی صفر سے شروع نہ کرنا پڑے۔',
    },
    heroSubheadline: {
      en: 'Editable social bundles, video packs, bilingual how-to guides, and official software setups—always 100% original and licensed.',
      ur: 'ایڈٹ ہونے والے سوشل پیک، ویڈیو ٹیمپلیٹس، اردو و انگریزی رہنما کتب اور قانونی سافٹ ویئر سیٹ اپ۔',
    },
    problemSolved: {
      en: 'Building every graphic, reel, or checklist from scratch slows down small teams. Our ready-to-use packs help you publish like a pro in minutes.',
      ur: 'ہر پوسٹ یا چیک لسٹ صفر سے بنانا بہت وقت لیتا ہے۔ ہمارے تیار پیک آپ کو منٹوں میں معیاری کام کرنے دیتے ہیں۔',
    },
    ctaLabel: { en: 'Explore Digital Products', ur: 'ڈیجیٹل پراڈکٹس دیکھیں' },
    includes: {
      en: [
        'Editable Instagram & LinkedIn carousel kits',
        'Ready-to-use reel & motion graphic packs',
        'Short, practical guides in English & Urdu',
        'Ready checklists & onboarding sheet kits',
        'Official software setup & team training',
      ],
      ur: [
        'ایڈٹ ہونے والی سوشل میڈیا کیروسل کٹس',
        'تیار ریلز اور موشن گرافکس پیک',
        'انگریزی اور اردو میں مختصر عملی کتب',
        'تیار چیک لسٹس اور کلائنٹ فارمیٹس',
        'مستند سافٹ ویئر سیٹ اپ اور تربیت',
      ],
    },
    deliverables: {
      en: ['Organized download folders', 'Commercial usage license', '5-minute setup guide', 'Official tool notes'],
      ur: ['منظم ڈاؤن لوڈ فائلیں', 'کمرشل استعمال کا لائسنس', '5 منٹ میں شروعات کی گائیڈ', 'اصل ٹول تفصیل'],
    },
    readinessGate: {
      en: 'Original files and official software licenses only—never cracked tools or shared logins.',
      ur: 'صرف اصل فائلیں اور قانونی لائسنس—کبھی کریک ٹولز یا غیر قانونی اکاؤنٹس نہیں۔',
    },
  },
];

export interface TeamMemberEntry {
  name: string;
  isCeo?: boolean;
  role?: { en: string; ur: string };
}

export const TEAM_STRUCTURE_PLACEHOLDERS: TeamMemberEntry[] = [
  {
    name: 'Muhammad Salman',
    isCeo: true,
    role: { en: 'CEO', ur: 'سی ای او' },
  },
  {
    name: 'Muhammad Khan',
  },
  {
    name: 'Imran Hassan',
  },
  {
    name: 'Altaf',
  },
  {
    name: 'Talib Shigri',
  },
];

export const DIGITAL_PRODUCTS_SHOWCASE = [
  {
    id: 'prod-social-kit',
    category: 'Templates',
    title: { en: 'Clean Social & Carousel Pack', ur: 'صاف سوشل اور کیروسل پیک' },
    desc: {
      en: 'Easy drag-and-drop templates to keep your business page sharp every week.',
      ur: 'ہر ہفتے اپنے پیج کو صاف اور نیا رکھنے کے لیے آسان ٹیمپلیٹس۔',
    },
    format: 'Figma · Canva · PNG Specs',
  },
  {
    id: 'prod-reel-pack',
    category: 'Video Assets',
    title: { en: 'Quick Reel & Subtitle Pack', ur: 'تیز ریل اور سب ٹائٹل پیک' },
    desc: {
      en: 'Clean title cards, captions, and transitions made for English and Urdu videos.',
      ur: 'انگریزی اور اردو ویڈیوز کے لیے صاف سب ٹائٹلز اور موشن ٹیمپلیٹس۔',
    },
    format: 'MP4 Overlays · Project Presets',
  },
  {
    id: 'prod-launch-kit',
    category: 'Guides',
    title: { en: 'Website Launch & Speed Kit', ur: 'ویب سائٹ لانچ اور اسپیڈ کٹ' },
    desc: {
      en: 'A practical launch guide covering mobile responsiveness, fast page load, and SEO tags.',
      ur: 'موبائل فرینڈلی ڈیزائن، تیز رفتار اور SEO ٹیگز کی مکمل لانچ گائیڈ۔',
    },
    format: 'PDF · Interactive Launch Guide',
  },
  {
    id: 'prod-sop-bundle',
    category: 'Agency Systems',
    title: { en: '5-Doc Client Kickoff Kit', ur: 'کلائنٹ شروعات کی 5 دستاویزات' },
    desc: {
      en: 'Ready-to-fill brief, price quote, simple agreement, tracker, and final handover.',
      ur: 'بریف، کوٹیشن، معاہدہ، ٹریکر اور حتمی حوالگی کے آسان فارمیٹس۔',
    },
    format: 'Structured Docs · Sheet Templates',
  },
];
