<template>
  <div class="p-dark">
    <NuxtPage />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--p-surface-950, #09090b);
  color: var(--p-surface-0, #ffffff);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.p-dark {
  min-height: 100vh;
}
</style>
