import type { Language } from '../types/agency';

export const LANGUAGE_STORAGE_KEY = 'da_lang';

export interface DocumentRootLike {
  lang: string;
  dir: string;
  classList: {
    add: (...tokens: string[]) => void;
    remove: (...tokens: string[]) => void;
  };
}

export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

export function resolveStoredLanguage(storage?: Pick<StorageLike, 'getItem'> | null): Language {
  if (!storage) return 'en';
  try {
    return storage.getItem(LANGUAGE_STORAGE_KEY) === 'ur' ? 'ur' : 'en';
  } catch {
    return 'en';
  }
}

export function applyDocumentLanguage(
  root: DocumentRootLike,
  language: Language,
  storage?: Pick<StorageLike, 'setItem'> | null
): void {
  const isUrdu = language === 'ur';
  root.lang = isUrdu ? 'ur' : 'en';
  root.dir = isUrdu ? 'rtl' : 'ltr';

  if (isUrdu) {
    root.classList.add('rtl');
    root.classList.remove('ltr');
  } else {
    root.classList.add('ltr');
    root.classList.remove('rtl');
  }

  if (storage) {
    try {
      storage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore storage quota/access restrictions
    }
  }
}
