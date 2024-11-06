const assert = require('node:assert');
const { describe, it } = require('node:test');
const { pricingService } = require('../../src/domain/services/pricing.service');

describe('PricingService', () => {
  it('💰 should calculate cart total with discounts and tax', () => {
    const cart = { items: [{ product: { price: 100 }, quantity: 2 }] };
    // @ts-ignore - no need for full implementation
    const total = pricingService.calculateTotal(cart);
    assert.strictEqual(total, 189, 'Total should apply discounts and tax');
  });

  it('🛍️  should calculate individual item total', () => {
    const item = { product: { price: 50 }, quantity: 2 };
    // @ts-ignore - no need for full implementation
    const itemTotal = pricingService.calculateItemTotal(item);
    assert.strictEqual(
      itemTotal,
      100,
      'Item total should match price times quantity'
    );
  });
});
