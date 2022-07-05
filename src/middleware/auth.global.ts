import { useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $auth } = useNuxtApp()
  if (!$auth.loggedIn) {
    if (to.name !== 'login') {
      return navigateTo('/login')
    }
  } else if (to.name === 'login') {
    return abortNavigation()
  }
})
