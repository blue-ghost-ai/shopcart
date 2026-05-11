# Cart Page — Intentional Gaps Analysis

Tags: cart, vue, primevue, pinia, fix, ui

## Pre-Written Issue

This file contains a ready-to-use issue for fixing the remove button gap. **Use the following text as your issue title and body — do not rewrite or re-analyze.**

### Issue Title

```
feat(cart): connect remove button to store
```

### Issue Body

````markdown
## Acceptance Criteria
- Clicking the remove button removes the item from the cart and updates the totals

## Context

The Pinia store action already exists and is fully tested in `stores/cart.test.ts`. No new store logic, types, or files are needed — the fix is a template-only change in `pages/index.vue`.

### Fix — Remove button (`pages/index.vue`)

1. **Change** the `@click` handler on the `<Button>` (around line 85) from:
   ```vue
   @click="handleRemove(item.id)"
   ```
   to:
   ```vue
   @click="cart.removeFromCart(item.id)"
   ```

2. **Delete** the dead `handleRemove` function from `<script setup>` (lines 10-13):
   ```ts
   // DELETE these lines:
   function handleRemove(_itemId: string): void {
     // no-op — waiting to be connected to the store
   }
   ```

## Research
Read before starting:
- `.cate/research/cart-page-gaps.md` — analysis of the remove button gap with exact code changes
````
