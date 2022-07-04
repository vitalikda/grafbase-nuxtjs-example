import { defineNuxtConfig } from 'nuxt'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src',

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-graphql-codegen'],

  colorMode: {
    classSuffix: ''
  },

  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAFBASE_API_URL,
    graphqlApiKey: process.env.GRAFBASE_API_KEY
  },

  build: {
    transpile: ['@headlessui/vue']
  },

  buildModules: ['unplugin-icons/nuxt'],

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

  tailwindcss: {
    viewer: false
  },

  typescript: {
    strict: true
  }
})
