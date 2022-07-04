import urql, { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from '@urql/vue'
import { devtoolsExchange } from '@urql/devtools'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { graphqlApiURL, graphqlApiKey } = useRuntimeConfig()

  // Create SSR exchange
  const ssr = ssrExchange({
    isClient: process.client
  })

  // Extract SSR payload once app is rendered on the server
  if (process.server) {
    nuxtApp.hook('app:rendered', () => {
      if (nuxtApp.payload?.data) {
        nuxtApp.payload.data.urql = ssr.extractData()
      }
    })
  }

  // Restore SSR payload once app is created on the client
  if (process.client) {
    nuxtApp.hook('app:created', () => {
      if (nuxtApp.payload?.data) {
        ssr.restoreData(nuxtApp.payload.data.urql)
      }
    })
  }

  // Custom exchanges
  const exchanges = [dedupExchange, cacheExchange, ssr, fetchExchange]

  // Devtools exchange
  if (nuxtApp._legacyContext?.isDev) {
    exchanges.unshift(devtoolsExchange)
  }

  // Instantiate urql client
  const client = createClient({
    url: graphqlApiURL,
    requestPolicy: 'cache-and-network',
    fetchOptions: () => {
      return {
        headers: { authorization: `Bearer ${graphqlApiKey}` }
      }
    },
    exchanges
  })

  nuxtApp.vueApp.use(urql, client)
})
