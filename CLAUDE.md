# ShopCart

Nuxt 3 / Vue 3 / Pinia / PrimeVue 4 shopping cart demo app.

## Known Issues

The cart page has three intentional gaps documented in the README.
**A complete analysis with exact fixes is in `.cate/research/cart-page-gaps.md`** — read it before planning or implementing any cart fixes.

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
