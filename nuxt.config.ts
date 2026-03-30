import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const CateDemoPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
  },
});

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],

  primevue: {
    options: {
      theme: {
        preset: CateDemoPreset,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
    },
  },

  app: {
    head: {
      title: 'ShopCart — Demo',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-01',
});
