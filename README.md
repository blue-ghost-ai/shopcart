# ShopCart — Cate Demo App

A Nuxt 3 / Vue 3 / Pinia / PrimeVue 4 shopping cart application used as the quickstart for Cate onboarding.

## Intentional Gaps

The cart page has three intentional gaps to fix:

1. **Quantity stepper** (`pages/index.vue`) — rendered with `:disabled="true"`, missing `@update:modelValue` handler
   - TODO: Connect to `cart.updateQuantity(item.id, newQty)`

2. **Remove button** (`pages/index.vue`) — click handler is a no-op function
   - TODO: Connect to `cart.removeFromCart(item.id)`

3. **Shipping selector** (`pages/index.vue`) — static `<span>` instead of a PrimeVue `<Select>`
   - TODO: Replace with `<Select>` bound to `cart.shippingOptions`

## Pre-Seeded Research

`.cate/research/cart-page-gaps.md` contains a pre-written analysis and issue body for the three gaps above. This is the same output a Cate build/plan agent would produce after analyzing the codebase — we've just committed it ahead of time so the quickstart doesn't spend minutes re-deriving what's already known.

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
