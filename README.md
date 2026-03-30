# ShopCart — Cate Demo App

A Nuxt 3 / Vue 3 / Pinia / PrimeVue 4 shopping cart application used as the demo project during Cate onboarding.

## Purpose

This app is a "prop" — it exists to let Cate's agents look impressive during first-run onboarding. The Pinia store has all business logic pre-built and working. Agents only need to make small wiring changes (connecting a handler, swapping a static element for a component) to complete their assigned issues.

## Intentional Gaps

The cart page has three intentional gaps that demo agents are assigned to fix:

1. **Quantity stepper** (`pages/index.vue`) — rendered with `:disabled="true"`, missing `@update:modelValue` handler
   - TODO: Connect to `cart.updateQuantity(item.id, newQty)`

2. **Remove button** (`pages/index.vue`) — click handler is a no-op function
   - TODO: Connect to `cart.removeFromCart(item.id)`

3. **Shipping selector** (`pages/index.vue`) — static `<span>` instead of a PrimeVue `<Select>`
   - TODO: Replace with `<Select>` bound to `cart.shippingOptions`

## Running Locally

```bash
npm install
npm run dev
```

Requires Node.js >= 18. App runs at http://localhost:3000.

## Tech Stack

- [Nuxt 3](https://nuxt.com) — Vue meta-framework
- [Vue 3](https://vuejs.org) — UI framework
- [Pinia](https://pinia.vuejs.org) — State management
- [PrimeVue 4](https://primevue.org) — UI components (Aura preset, dark mode)
