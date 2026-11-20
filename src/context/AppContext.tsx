import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Language, ThemeMode, ServiceSlug } from '../types/agency';
import type { EngineNodeKey } from '../lib/engineNodes';
import { TRANSLATIONS, type TranslationBundle } from '../data/translations';
import { applyDocumentLanguage, resolveStoredLanguage } from '../lib/i18n';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationBundle;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  toasts: ToastItem[];
  addToast: (type: ToastItem['type'], message: string) => void;
  dismissToast: (id: string) => void;
  inquiryModalOpen: boolean;
  preselectedService: ServiceSlug | null;
  openInquiryModal: (service?: ServiceSlug) => void;
  closeInquiryModal: () => void;
  chatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  activeEngineNode: EngineNodeKey;
  setActiveEngineNode: (node: EngineNodeKey) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('da_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // ignore storage access issues
  }
  return 'dark';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return resolveStoredLanguage(window.localStorage);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceSlug | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [activeEngineNode, setActiveEngineNodeState] = useState<EngineNodeKey>('ai');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const themeMeta = document.head.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#0A0A0C' : '#F8FAFC');
    }
    try {
      localStorage.setItem('da_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    applyDocumentLanguage(document.documentElement, language, window.localStorage);
  }, [language]);

  const setTheme = useCallback((next: ThemeMode) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    []
  );

  const setLanguage = useCallback((next: Language) => setLanguageState(next), []);
  const toggleLanguage = useCallback(
    () => setLanguageState((prev) => (prev === 'en' ? 'ur' : 'en')),
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastItem['type'], message: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { id, type, message }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4500);
    },
    [dismissToast]
  );

  const openInquiryModal = useCallback((service?: ServiceSlug) => {
    setPreselectedService(service ?? null);
    setInquiryModalOpen(true);
  }, []);

  const closeInquiryModal = useCallback(() => {
    setInquiryModalOpen(false);
  }, []);

  const openChatbot = useCallback(() => {
    setChatbotOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setChatbotOpen(false);
  }, []);

  const setActiveEngineNode = useCallback((node: EngineNodeKey) => {
    setActiveEngineNodeState(node);
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
        theme,
        setTheme,
        toggleTheme,
        toasts,
        addToast,
        dismissToast,
        inquiryModalOpen,
        preselectedService,
        openInquiryModal,
        closeInquiryModal,
        chatbotOpen,
        openChatbot,
        closeChatbot,
        activeEngineNode,
        setActiveEngineNode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider.');
  }
  return ctx;
}
