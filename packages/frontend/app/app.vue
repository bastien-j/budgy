<template>
  <NuxtRouteAnnouncer />
  <UApp :toaster="{ duration: 3000 }">
    <NuxtPage />
  </UApp>
</template>

<style>
@import 'tailwindcss';
@import '@nuxt/ui';
</style>
