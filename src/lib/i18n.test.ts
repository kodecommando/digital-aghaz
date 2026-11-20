import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LANGUAGE_STORAGE_KEY,
  applyDocumentLanguage,
  resolveStoredLanguage,
} from './i18n';

function createMockRoot() {
  const classes = new Set<string>();
  return {
    lang: 'en',
    dir: 'ltr',
    classes,
    classList: {
      add: (...tokens: string[]) => tokens.forEach((t) => classes.add(t)),
      remove: (...tokens: string[]) => tokens.forEach((t) => classes.delete(t)),
    },
  };
}

function createMockStorage(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    store,
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
}

test('resolveStoredLanguage defaults to en and restores saved ur preference', () => {
  assert.equal(resolveStoredLanguage(createMockStorage()), 'en');
  assert.equal(resolveStoredLanguage(createMockStorage({ [LANGUAGE_STORAGE_KEY]: 'ur' })), 'ur');
  assert.equal(resolveStoredLanguage(createMockStorage({ [LANGUAGE_STORAGE_KEY]: 'fr' })), 'en');
});

test('applyDocumentLanguage switches html classList, dir, lang, and localStorage cleanly', () => {
  const root = createMockRoot();
  const storage = createMockStorage();

  applyDocumentLanguage(root, 'ur', storage);
  assert.equal(root.lang, 'ur');
  assert.equal(root.dir, 'rtl');
  assert.equal(root.classes.has('rtl'), true);
  assert.equal(root.classes.has('ltr'), false);
  assert.equal(storage.getItem(LANGUAGE_STORAGE_KEY), 'ur');

  applyDocumentLanguage(root, 'en', storage);
  assert.equal(root.lang, 'en');
  assert.equal(root.dir, 'ltr');
  assert.equal(root.classes.has('ltr'), true);
  assert.equal(root.classes.has('rtl'), false);
  assert.equal(storage.getItem(LANGUAGE_STORAGE_KEY), 'en');
});
