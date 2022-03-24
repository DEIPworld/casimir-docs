import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App';
import router from './router';

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app');
