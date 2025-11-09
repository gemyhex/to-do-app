import { ref, watchEffect } from 'vue';
import { i18n } from '@/plugins/i18n';

type Locale = 'en' | 'ar';
const STORAGE_KEY = 'locale';

const initial =
  (localStorage.getItem(STORAGE_KEY) as Locale) ||
  (navigator.language.startsWith('ar') ? 'ar' : 'en');

const locale = ref<Locale>(initial);

function applyLocale(l: Locale) {
  const root = document.documentElement;
  root.lang = l;
  root.dir = l === 'ar' ? 'rtl' : 'ltr';
  i18n.global.locale.value = l;
  localStorage.setItem(STORAGE_KEY, l);
}

watchEffect(() => applyLocale(locale.value));

export function useLocale() {
  return {
    locale,
    isArabic: () => locale.value === 'ar',
    set: (l: Locale) => (locale.value = l),
    toggle: () => (locale.value = locale.value === 'ar' ? 'en' : 'ar'),
  };
}
