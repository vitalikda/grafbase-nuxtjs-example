<template>
  <Html>
    <Head>
      <Title>Nuxt.js - Todo Example - Grafbase</Title>
      <Meta name="description" content="Todo Example leveraging the Grafbase platform" />
      <Link rel="shortcut icon" href="/favicon.png" />
    </Head>

    <Body class="antialiased text-gray-800 transition-colors duration-300 bg-white dark:text-gray-200 dark:bg-gray-900">
      <NavMenu />
      <main class="relative flex h-screen pt-6 pl-6 pr-12 overflow-x-auto text-black dark:text-white dark:bg-zinc-900">
        <NuxtPage />
      </main>
    </Body>
  </Html>
</template>
