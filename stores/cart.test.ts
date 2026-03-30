import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from './cart';

describe('useCartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('initial state', () => {
    it('has four items in the cart', () => {
      const cart = useCartStore();
      expect(cart.items).toHaveLength(4);
    });

    it('defaults to standard shipping', () => {
      const cart = useCartStore();
      expect(cart.selectedShippingOptionId).toBe('standard');
    });
  });

  describe('subtotal', () => {
    it('sums price * quantity for all items', () => {
      const cart = useCartStore();
      const expected = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      expect(cart.subtotal).toBeCloseTo(expected);
    });
  });

  describe('shippingCost', () => {
    it('returns the price of the selected shipping option', () => {
      const cart = useCartStore();
      expect(cart.shippingCost).toBe(5.99);
    });

    it('updates when shipping option changes', () => {
      const cart = useCartStore();
      cart.setShippingOption('express');
      expect(cart.shippingCost).toBe(12.99);
    });
  });

  describe('total', () => {
    it('equals subtotal plus shipping cost', () => {
      const cart = useCartStore();
      expect(cart.total).toBeCloseTo(cart.subtotal + cart.shippingCost);
    });
  });

  describe('itemCount', () => {
    it('sums quantities across all items', () => {
      const cart = useCartStore();
      const expected = cart.items.reduce((sum, i) => sum + i.quantity, 0);
      expect(cart.itemCount).toBe(expected);
    });
  });

  describe('updateQuantity', () => {
    it('changes the quantity of an existing item', () => {
      const cart = useCartStore();
      cart.updateQuantity('rubber-duck', 5);
      expect(cart.items.find((i) => i.id === 'rubber-duck')!.quantity).toBe(5);
    });

    it('clamps quantity to a minimum of 1', () => {
      const cart = useCartStore();
      cart.updateQuantity('rubber-duck', 0);
      expect(cart.items.find((i) => i.id === 'rubber-duck')!.quantity).toBe(1);
    });

    it('floors fractional quantities', () => {
      const cart = useCartStore();
      cart.updateQuantity('rubber-duck', 3.7);
      expect(cart.items.find((i) => i.id === 'rubber-duck')!.quantity).toBe(3);
    });

    it('does nothing for a non-existent item', () => {
      const cart = useCartStore();
      const before = cart.items.length;
      cart.updateQuantity('nope', 10);
      expect(cart.items.length).toBe(before);
    });
  });

  describe('removeFromCart', () => {
    it('removes the item with the given id', () => {
      const cart = useCartStore();
      cart.removeFromCart('usb-pet-rock');
      expect(cart.items.find((i) => i.id === 'usb-pet-rock')).toBeUndefined();
      expect(cart.items).toHaveLength(3);
    });

    it('does nothing for a non-existent item', () => {
      const cart = useCartStore();
      cart.removeFromCart('nope');
      expect(cart.items).toHaveLength(4);
    });
  });

  describe('setShippingOption', () => {
    it('sets the selected shipping option', () => {
      const cart = useCartStore();
      cart.setShippingOption('overnight');
      expect(cart.selectedShippingOptionId).toBe('overnight');
    });

    it('ignores an invalid option id', () => {
      const cart = useCartStore();
      cart.setShippingOption('teleportation');
      expect(cart.selectedShippingOptionId).toBe('standard');
    });
  });
});
