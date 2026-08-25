// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  css: [
    'vazirmatn/Vazirmatn-Variable-font-face.css',
    '@fontsource/amiri/arabic-400.css',
    '@fontsource/amiri/arabic-700.css',
    '@fontsource/cinzel/latin-400.css',
    '@fontsource/cinzel/latin-600.css'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      title: 'زیورآلات دست‌ساز',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'فروشگاه زیورآلات دست‌ساز نقره' }
      ]
    }
  },

  typescript: {
    strict: true
  },

  routeRules: {
    '/admin/**': { ssr: false }
  }
})
