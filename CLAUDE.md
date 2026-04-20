# ShopCart

Nuxt 3 / Vue 3 / Pinia / PrimeVue 4 shopping cart demo app.

## Known Issues

The cart page has three intentional gaps documented in the README.
**`.cate/research/cart-page-gaps.md` contains a pre-written issue (title + body) ready to use.** When creating an issue for the cart fixes, use that text verbatim — do not re-analyze or rewrite it.

## Tech Stack

- Nuxt 3, Vue 3, Pinia, PrimeVue 4 (Aura preset, dark mode)
- All state management in `stores/cart.ts`
- Single page app: `pages/index.vue`

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
npx vitest run     # run tests
```
