import { defineNuxtConfig } from 'nuxt'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src',

  build: {
    transpile: ['@headlessui/vue']
  },

  buildModules: ['@nuxtjs/tailwindcss', 'unplugin-icons/nuxt', 'nuxt-graphql-codegen'],

  modules: ['@nuxtjs/color-mode'],

  publicRuntimeConfig: {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    graphqlApiURL: process.env.GRAFBASE_API_URL,
    graphqlApiKey: process.env.GRAFBASE_API_KEY
  },

  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      })
    ]
  },

  colorMode: {
    classSuffix: ''
  },

  tailwindcss: {
    viewer: false
  },

  typescript: {
    strict: true
  }
})
