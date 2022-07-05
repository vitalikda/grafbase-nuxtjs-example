export default defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp()

  if (!$auth.loggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
  if ($auth.loggedIn && to.path === '/login') {
    return navigateTo('/')
  }
})
