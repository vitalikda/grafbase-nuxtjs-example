import { useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $auth } = useNuxtApp()
  if (!$auth.loggedIn) {
    if (to.name !== 'sign-in') {
      return navigateTo('/sign-in')
    }
  } else if (to.name === 'sign-in') {
    return abortNavigation()
  }
})
