import { defineStore } from 'pinia';
import type { CartItem, ShippingOption } from '~/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      {
        id: 'rubber-duck',
        name: 'Rubber Duck Debugger',
        description: 'Silent listener. Infinite patience. Ships in 1-3 rubber squeaks.',
        price: 12.99,
        quantity: 2,
        emoji: '🦆',
      },
      {
        id: 'usb-pet-rock',
        name: 'USB Pet Rock',
        description: 'Zero CPU usage. Zero memory footprint. 10/10 uptime guaranteed.',
        price: 24.99,
        quantity: 1,
        emoji: '🪨',
      },
      {
        id: 'artisanal-readme',
        name: 'Artisanal README.md',
        description: 'Hand-crafted markdown by a senior developer. Includes a badges section.',
        price: 4.99,
        quantity: 3,
        emoji: '📄',
      },
      {
        id: 'vintage-semicolon',
        name: 'Vintage Semicolon Collection',
        description: 'Rescued from deprecated JavaScript files. Each one has a story.',
        price: 8.49,
        quantity: 1,
        emoji: '；',
      },
    ] as CartItem[],

    shippingOptions: [
      { id: 'standard', label: 'Standard Shipping', price: 5.99 },
      { id: 'express', label: 'Express Shipping', price: 12.99 },
      { id: 'overnight', label: 'Overnight Shipping', price: 24.99 },
    ] as ShippingOption[],

    selectedShippingOptionId: 'standard',
  }),

  getters: {
    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    shippingCost: (state): number => {
      const option = state.shippingOptions.find((o) => o.id === state.selectedShippingOptionId);
      return option?.price ?? 5.99;
    },

    total(): number {
      return this.subtotal + this.shippingCost;
    },

    selectedShippingOption: (state): ShippingOption | undefined => {
      return state.shippingOptions.find((o) => o.id === state.selectedShippingOptionId);
    },

    itemCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },

  actions: {
    updateQuantity(itemId: string, newQty: number): void {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        item.quantity = Math.max(1, Math.floor(newQty));
      }
    },

    removeFromCart(itemId: string): void {
      const index = this.items.findIndex((i) => i.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },

    setShippingOption(optionId: string): void {
      const option = this.shippingOptions.find((o) => o.id === optionId);
      if (option) {
        this.selectedShippingOptionId = optionId;
      }
    },
  },
});
