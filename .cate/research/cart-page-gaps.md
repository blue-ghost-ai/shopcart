# Cart Page — Intentional Gaps Analysis

Tags: cart, vue, primevue, pinia, fix, ui

## Pre-Written Issue

This file contains a ready-to-use issue for fixing all three cart page gaps. **Use the following text as your issue title and body — do not rewrite or re-analyze.**

### Issue Title

```
feat(cart): connect quantity stepper, remove button, and shipping selector to store
```

### Issue Body

````markdown
## Acceptance Criteria
- Quantity stepper increments/decrements item quantity and updates subtotal and total
- Remove button removes the item from the cart
- Shipping selector dropdown allows choosing between Standard, Express, and Overnight shipping and updates the total

## UI Mockup

Before (current — stepper disabled, remove is no-op, shipping is static text):
```
┌─────────────────────────────────────────────────────┐
│ 🦆  Rubber Duck Debugger              Qty           │
│      $12.99 each                   [ 2 ] (disabled) │
│                                    $25.98  [✕]      │
├─────────────────────────────────────────────────────┤
│  Shipping                                           │
│  ┌───────────────────────────────────┐              │
│  │ Standard Shipping — $5.99 (text) │              │
│  └───────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

After (fixed — stepper active, remove works, shipping is dropdown):
```
┌─────────────────────────────────────────────────────┐
│ 🦆  Rubber Duck Debugger              Qty           │
│      $12.99 each                 [−][ 2 ][+]       │
│                                    $25.98  [✕]      │
├─────────────────────────────────────────────────────┤
│  Shipping                                           │
│  ┌───────────────────────────────────────────┐      │
│  │ Standard Shipping                    ▾    │      │
│  └───────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

## Context

All three Pinia store actions already exist and are fully tested in `stores/cart.test.ts`. No new store logic, types, or files are needed — every fix is a template-only change in `pages/index.vue`.

### Fix 1 — Quantity stepper (`pages/index.vue`)

In the `<InputNumber>` component (around line 59), make these two changes:

1. **Remove** the line `:disabled="true"`
2. **Add** the line `@update:model-value="cart.updateQuantity(item.id, $event)"`

The component should look like:
```vue
<InputNumber
  :model-value="item.quantity"
  :min="1"
  :max="99"
  show-buttons
  button-layout="horizontal"
  :input-style="{ width: '3rem', textAlign: 'center' }"
  @update:model-value="cart.updateQuantity(item.id, $event)"
/>
```

### Fix 2 — Remove button (`pages/index.vue`)

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

### Fix 3 — Shipping selector (`pages/index.vue`)

**Replace** the static `<span>` (around line 114):
```vue
<span class="shipping-static">Standard Shipping — $5.99</span>
```

with a PrimeVue `<Select>`:
```vue
<Select
  :model-value="cart.selectedShippingOptionId"
  :options="cart.shippingOptions"
  option-label="label"
  option-value="id"
  @update:model-value="cart.setShippingOption($event)"
/>
```

**Delete** the unused `.shipping-static` CSS rule from the `<style scoped>` block:
```css
/* DELETE these lines: */
.shipping-static {
  font-size: 0.875rem;
  color: var(--p-surface-300, #d4d4d8);
}
```

## Research
Read before starting:
- `.cate/research/cart-page-gaps.md` — full analysis of all three gaps with exact code changes
````
