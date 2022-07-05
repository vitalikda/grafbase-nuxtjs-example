import { defineNuxtConfig } from 'nuxt'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src',

  build: {
    transpile: ['@headlessui/vue']
  },

  buildModules: ['unplugin-icons/nuxt'],

  modules: [
    '@nuxtjs-alt/auth',
    '@nuxtjs-alt/axios',
    '@nuxtjs-alt/pinia',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-graphql-codegen'
  ],

  publicRuntimeConfig: {
    graphqlApiURL: process.env.GRAFBASE_API_URL,
    graphqlApiKey: process.env.GRAFBASE_API_KEY
  },

  auth: {
    strategies: {
      github: {
        clientId: 'a33f073f02cb27cfb288',
        clientSecret: '848f862ad968de4090c8f558cbb1287668faf507',
        scheme: 'oauth2',
        enabled: true,
        name: 'github'
      }
    }
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
