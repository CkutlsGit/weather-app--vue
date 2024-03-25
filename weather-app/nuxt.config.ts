// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  runtimeConfig: {
    APIKey: process.env.RAPID_KEY,
    APIHost: process.env.RAPID_HOST
  }
})
