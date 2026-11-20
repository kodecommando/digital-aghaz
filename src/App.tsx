import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { AgencyChatbot } from './components/AgencyChatbot';
import { ToastContainer } from './components/ToastContainer';
import { LazySite3D } from './components/LazySite3D';
import { SiteMotionEnhancer } from './components/SiteMotionEnhancer';
import { resolveEngineNodeForRoute } from './lib/engineNodes';
import { HomePage } from './pages/HomePage';

const ServicesOverviewPage = lazy(() =>
  import('./pages/ServicesOverviewPage').then((m) => ({ default: m.ServicesOverviewPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage }))
);
const ArticleDetailPage = lazy(() =>
  import('./pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const PrivacyPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function RouteLoadingFallback() {
  return (
    <div className="min-h-[55vh] flex items-center justify-center px-4">
      <div className="inline-flex items-center gap-2.5 text-xs font-medium text-slate-500 dark:text-neutral-400">
        <span
          className="h-3.5 w-3.5 rounded-full border-2 border-[#EA0400]/30 border-t-[#EA0400] animate-spin"
          aria-hidden="true"
        />
        <span>Loading...</span>
      </div>
    </div>
  );
}

function SiteWideEngineLayer() {
  const { pathname } = useLocation();
  const { theme, activeEngineNode } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setScrollProgress(Math.min(1, window.scrollY / maxScroll));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const nodeForView = resolveEngineNodeForRoute(pathname, activeEngineNode);
  const isHomeHero = pathname === '/' && scrollProgress < 0.14;

  return (
    <LazySite3D
      activeNode={nodeForView}
      scrollProgress={scrollProgress}
      theme={theme}
      isHomeHero={isHomeHero}
    />
  );
}

const ROUTE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }}
    >
      <motion.div
        key={location.pathname}
        data-testid="route-transition-stage"
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 12, scale: 0.985, filter: 'blur(4px)' }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        }
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.96, filter: 'blur(6px)' }
        }
        transition={{
          duration: prefersReducedMotion ? 0.12 : 0.24,
          ease: ROUTE_EASE,
        }}
        style={{ transformOrigin: 'center top', willChange: 'transform, opacity, filter' }}
      >
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesOverviewPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <SiteMotionEnhancer />
        <div
          id="da-app-shell"
          className="relative min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-black dark:text-white"
        >
          <SiteWideEngineLayer />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
          <InquiryModal />
          <AgencyChatbot />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
