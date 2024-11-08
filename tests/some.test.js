const { describe, it, mock } = require('node:test');
const assert = require('node:assert/strict');

const { Cart, CartItem, Product } = require('./../src/domain/entities');

const { pricingService } = require('./../src/domain/services/pricing.service');

describe('PricingService functionality', () => {
  it('should calculate total price of CartItems', () => {
    const prices = [100, 200];
    const quantity = [2, 1];

    const cart = new Cart({
      userId: '1',
      items: [
        new CartItem({
          product: new Product({
            id: '1',
            name: 'Product 1',
            price: prices[0],
            description: 'Product 1 description',
            releaseDate: new Date('2021-01-01'),
          }),
          quantity: quantity[0],
        }),
        new CartItem({
          product: new Product({
            id: '2',
            name: 'Product 2',
            price: prices[1],
            description: 'Product 2 description',
            releaseDate: new Date('2021-01-02'),
          }),
          quantity: quantity[1],
        }),
      ],
    });

    const spiedFunction = mock.method(pricingService, 'calculateItemTotal');

    const totalPrice = pricingService.calculateTotal(cart);

    const expectedTotal = prices.reduce((sum, price, index) => {
      const itemTotal = price * quantity[index];

      const currentTotal =
        sum + (quantity[index] >= 10 ? itemTotal * 0.95 : itemTotal);

      if (index === prices.length - 1) {
        const withDiscount =
          currentTotal > 100 ? currentTotal * 0.9 : currentTotal;

        return withDiscount * 1.05; // Add 5% tax
      }

      return currentTotal;
    }, 0);

    assert.strictEqual(spiedFunction.mock.callCount(), cart.items.length);

    assert.strictEqual(totalPrice, expectedTotal);
  });
});
