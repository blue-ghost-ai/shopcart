---
name: ShopCart Store and UI Reference
description: Pinia store API and pages/index.vue component map for the three cart gaps — fast lookup before making any fix
type: reference
---

Tags: cart, vue, primevue, pinia, store, ui

## Overview

All three cart gaps are template-only fixes in `pages/index.vue`. The Pinia store actions already exist and are fully tested in `stores/cart.test.ts` — no new store logic, types, or files are needed.

## Store API (`stores/cart.ts`)

| Action / Property | Type | Purpose |
|---|---|---|
| `cart.updateQuantity(id, qty)` | action | Update quantity for a cart item |
| `cart.removeFromCart(id)` | action | Remove an item from the cart |
| `cart.setShippingOption(id)` | action | Set the active shipping option |
| `cart.shippingOptions` | `{ id, label }[]` | Available shipping options |
| `cart.selectedShippingOptionId` | `string` | Currently selected shipping option |

## UI State (`pages/index.vue`)

### Current (broken)

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

### Target (fixed)

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

## Component Locations (`pages/index.vue`)

### Quantity stepper — around line 59

The `<InputNumber>` is disabled and has no change handler. Fix:
1. Remove `:disabled="true"`
2. Add `@update:model-value="cart.updateQuantity(item.id, $event)"`

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

### Remove button — around line 85

The `<Button>` calls a dead `handleRemove` no-op. Fix:
1. Change `@click="handleRemove(item.id)"` → `@click="cart.removeFromCart(item.id)"`
2. Delete the dead function from `<script setup>` (lines 10–13):
   ```ts
   function handleRemove(_itemId: string): void {
     // no-op — waiting to be connected to the store
   }
   ```

### Shipping selector — around line 114

A static `<span>` shows hardcoded text. Fix: replace it with a PrimeVue `<Select>` and delete the dead CSS rule.

Replace:
```vue
<span class="shipping-static">Standard Shipping — $5.99</span>
```

With:
```vue
<Select
  :model-value="cart.selectedShippingOptionId"
  :options="cart.shippingOptions"
  option-label="label"
  option-value="id"
  @update:model-value="cart.setShippingOption($event)"
/>
```

Delete from `<style scoped>`:
```css
.shipping-static {
  font-size: 0.875rem;
  color: var(--p-surface-300, #d4d4d8);
}
```
