import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { i18n } from './plugins/i18n';
import './assets/styles/main.css';
import App from './App.vue'
import router from './router';
import { useRouteTitle } from './composables/useTitle';
import GlobalComponents from './plugins/global-components'

useRouteTitle(router, { suffix: `- ${i18n.global.t('app.title')}` });

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(GlobalComponents)
  .mount('#app');