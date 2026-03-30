<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cart = useCartStore();

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// TODO: Connect to cart.removeFromCart(item.id)
function handleRemove(_itemId: string): void {
  // no-op — waiting to be connected to the store
}
</script>

<template>
  <div class="cart-page">
    <header class="cart-header">
      <div class="cart-header-inner">
        <div class="cart-logo">
          <span class="cart-logo-icon">🛒</span>
          <span class="cart-logo-text">ShopCart</span>
        </div>
        <div class="cart-badge">
          <span>{{ cart.itemCount }} item{{ cart.itemCount !== 1 ? 's' : '' }}</span>
        </div>
      </div>
    </header>

    <main class="cart-main">
      <div class="cart-container">
        <h1 class="cart-title">Your Cart</h1>

        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="cart-items-section">
            <div v-if="cart.items.length === 0" class="cart-empty">
              <span class="cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
            </div>

            <div v-else class="cart-items-list">
              <div v-for="item in cart.items" :key="item.id" class="cart-item">
                <div class="cart-item-emoji">{{ item.emoji }}</div>

                <div class="cart-item-info">
                  <h3 class="cart-item-name">{{ item.name }}</h3>
                  <p class="cart-item-desc">{{ item.description }}</p>
                  <span class="cart-item-unit-price">{{ formatPrice(item.price) }} each</span>
                </div>

                <div class="cart-item-controls">
                  <div class="cart-item-quantity">
                    <label class="qty-label">Qty</label>
                    <!--
                      Quantity stepper — rendered but not wired to the store.
                      TODO: Connect to cart.updateQuantity(item.id, newQty)
                    -->
                    <InputNumber
                      :model-value="item.quantity"
                      :min="1"
                      :max="99"
                      :disabled="true"
                      show-buttons
                      button-layout="horizontal"
                      :input-style="{ width: '3rem', textAlign: 'center' }"
                    />
                  </div>

                  <div class="cart-item-subtotal-row">
                    <div class="cart-item-subtotal">
                      {{ formatPrice(item.price * item.quantity) }}
                    </div>

                    <!--
                      Remove button — rendered but click handler is a no-op.
                      TODO: Connect to cart.removeFromCart(item.id)
                    -->
                    <Button
                      label="✕"
                      severity="danger"
                      variant="text"
                      size="small"
                      aria-label="Remove item"
                      @click="handleRemove(item.id)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="cart-summary">
            <div class="cart-summary-card">
              <h2 class="cart-summary-title">Order Summary</h2>

              <div class="cart-summary-row">
                <span>Subtotal</span>
                <span>{{ formatPrice(cart.subtotal) }}</span>
              </div>

              <div class="cart-summary-shipping">
                <div class="cart-summary-row">
                  <span>Shipping</span>
                </div>

                <div class="shipping-selector">
                  <!--
                    Static shipping label — not connected to the store.
                    TODO: Replace with Select component bound to cart.shippingOptions
                    and @update:model-value="cart.setShippingOption($event)"
                  -->
                  <span class="shipping-static">Standard Shipping — $5.99</span>
                </div>
              </div>

              <Divider />

              <div class="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{{ formatPrice(cart.total) }}</span>
              </div>

              <Button
                label="Proceed to Checkout"
                icon="pi pi-arrow-right"
                icon-pos="right"
                class="cart-checkout-btn"
                size="large"
              />

              <p class="cart-summary-note">
                🔒 Secure checkout &nbsp;·&nbsp; Free returns on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: var(--p-surface-950, #09090b);
}

.cart-header {
  border-bottom: 1px solid var(--p-surface-800, #27272a);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
}

.cart-header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-logo-icon {
  font-size: 1.5rem;
}

.cart-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--p-primary-400, #a78bfa);
  letter-spacing: -0.01em;
}

.cart-badge {
  font-size: 0.875rem;
  color: var(--p-surface-400, #a1a1aa);
}

.cart-main {
  padding: 2.5rem 0 4rem;
}

.cart-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cart-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2rem;
  color: var(--p-surface-0, #ffffff);
  letter-spacing: -0.02em;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

/* Cart Items */
.cart-items-section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cart-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--p-surface-500, #71717a);
}

.cart-empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 1rem;
  align-items: center;
  background: var(--p-surface-900, #18181b);
  border: 1px solid var(--p-surface-800, #27272a);
  border-radius: 12px;
  padding: 1.25rem;
  transition: border-color 0.15s;
}

.cart-item:hover {
  border-color: var(--p-surface-700, #3f3f46);
}

.cart-item-emoji {
  font-size: 2.5rem;
  text-align: center;
  line-height: 1;
}

.cart-item-info {
  min-width: 0;
}

.cart-item-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: var(--p-surface-0, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-desc {
  font-size: 0.8125rem;
  color: var(--p-surface-400, #a1a1aa);
  margin: 0 0 0.375rem;
  line-height: 1.4;
}

.cart-item-unit-price {
  font-size: 0.8125rem;
  color: var(--p-surface-500, #71717a);
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.625rem;
}

.cart-item-quantity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.qty-label {
  font-size: 0.75rem;
  color: var(--p-surface-500, #71717a);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.cart-item-subtotal-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-item-subtotal {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-primary-300, #c4b5fd);
}

/* Order Summary */
.cart-summary {
  position: sticky;
  top: 5rem;
}

.cart-summary-card {
  background: var(--p-surface-900, #18181b);
  border: 1px solid var(--p-surface-800, #27272a);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.cart-summary-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: var(--p-surface-0, #ffffff);
}

.cart-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9375rem;
  color: var(--p-surface-300, #d4d4d8);
}

.cart-summary-shipping {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.shipping-selector {
  background: var(--p-surface-800, #27272a);
  border: 1px solid var(--p-surface-700, #3f3f46);
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
}

.shipping-static {
  font-size: 0.875rem;
  color: var(--p-surface-300, #d4d4d8);
}

.cart-summary-total {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--p-surface-0, #ffffff);
  margin-top: 0.25rem;
}

.cart-checkout-btn {
  width: 100%;
  margin-top: 0.5rem;
}

.cart-summary-note {
  font-size: 0.75rem;
  color: var(--p-surface-500, #71717a);
  text-align: center;
  margin: 0;
}
</style>
