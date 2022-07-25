import type { Plugin } from 'vue';
import { createPinia } from 'pinia';

export const pinia: Plugin = (app) => {
  const pinia = createPinia();

  app.use(pinia);
};
