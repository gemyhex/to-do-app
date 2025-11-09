import { ref, watchEffect } from 'vue';

const STORAGE_KEY = 'theme';

const theme = ref<'dark' | 'light'>(
  (localStorage.getItem(STORAGE_KEY) as 'dark' | 'light') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
);

function applyTheme(t: 'dark' | 'light') {
  const root = document.documentElement;
  root.classList.toggle('dark', t === 'dark');
  localStorage.setItem(STORAGE_KEY, t);
}

watchEffect(() => applyTheme(theme.value));

export function useTheme() {
  return {
    theme,
    isDark: () => theme.value === 'dark',
    toggle: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
    set: (t: 'dark' | 'light') => (theme.value = t),
  };
}
