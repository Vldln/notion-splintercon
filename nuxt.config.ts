// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devServer: {
    port: 5000,
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"]
})