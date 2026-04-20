# Cart Page — Intentional Gaps Analysis

Tags: cart, vue, primevue, pinia, fix, ui

## Overview

The cart page (`pages/index.vue`) has three intentional gaps where UI components are rendered but not connected to the Pinia store. All three store actions (`updateQuantity`, `removeFromCart`, `setShippingOption`) already exist and are fully tested in `stores/cart.test.ts`. The fixes are template-only changes in `pages/index.vue` — no new store logic, no new types, no new files.

## Gap 1: Quantity Stepper (disabled, not wired)

**File:** `pages/index.vue`, lines 59-67
**Problem:** The `<InputNumber>` has `:disabled="true"` and no `@update:modelValue` handler.
**Fix:**
- Remove `:disabled="true"`
- Add `@update:model-value="cart.updateQuantity(item.id, $event)"`

**Store action:** `cart.updateQuantity(itemId: string, newQty: number)` — clamps to min 1, floors fractional values.

## Gap 2: Remove Button (no-op click handler)

**File:** `pages/index.vue`, lines 79-86 (button), lines 10-13 (handler)
**Problem:** `handleRemove()` is a no-op function. The button calls it but nothing happens.
**Fix:**
- Replace `@click="handleRemove(item.id)"` with `@click="cart.removeFromCart(item.id)"`
- Delete the `handleRemove` function from `<script setup>` (lines 10-13)

**Store action:** `cart.removeFromCart(itemId: string)` — splices the item from the array.

## Gap 3: Shipping Selector (static text instead of dropdown)

**File:** `pages/index.vue`, lines 108-115
**Problem:** A static `<span class="shipping-static">Standard Shipping — $5.99</span>` instead of a PrimeVue `<Select>` component.
**Fix:** Replace the `<span>` with:
```vue
<Select
  :model-value="cart.selectedShippingOptionId"
  :options="cart.shippingOptions"
  option-label="label"
  option-value="id"
  @update:model-value="cart.setShippingOption($event)"
/>
```
Remove the `.shipping-static` CSS rule (line ~372) since it's no longer used.

**Store action:** `cart.setShippingOption(optionId: string)` — validates the option exists before setting.
**Store getter:** `cart.shippingOptions` — array of `{ id, label, price }`.
**Store state:** `cart.selectedShippingOptionId` — defaults to `'standard'`.

## Key Files

| File | Role |
|---|---|
| `pages/index.vue` | All three fixes happen here (template + script) |
| `stores/cart.ts` | Store with existing actions — no changes needed |
| `stores/cart.test.ts` | Existing tests for all three actions — all pass |
| `types/index.ts` | `CartItem` and `ShippingOption` types — no changes needed |

## Testing

The store actions are already fully tested. The fixes are wiring-only (connecting existing UI to existing store methods), so no new unit tests are strictly required. A manual smoke test confirms:
1. Quantity stepper increments/decrements and updates subtotal
2. Remove button removes the item from the list
3. Shipping dropdown changes the shipping cost and total
