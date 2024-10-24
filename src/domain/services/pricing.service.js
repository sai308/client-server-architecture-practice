class PricingService {
  /**
   * Calculates the total amount for a cart, applying any discounts or taxes.
   * @param {Entities.Cart} cart
   * @returns {number}
   */
  calculateTotal(cart) {
    let total = 0;

    for (const item of cart.items) {
      total += this.calculateItemTotal(item);
    }
    // Example: Apply a 10% discount if total exceeds $100
    if (total > 100) {
      total *= 0.9; // Apply 10% discount
    }
    // Example: Add 5% tax
    total *= 1.05; // Add 5% tax
    return total;
  }

  /**
   * Calculates the total price for a cart item.
   * @param {Entities.CartItem} item
   * @returns {number}
   */
  calculateItemTotal(item) {
    // Example: Apply bulk discount
    let price = item.product.price * item.quantity;
    if (item.quantity >= 10) {
      price *= 0.95; // Apply 5% discount
    }
    return price;
  }
}

module.exports = { pricingService: new PricingService() };
