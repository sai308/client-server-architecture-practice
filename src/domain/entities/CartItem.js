class CartItem {
  /**
   * @param {Pick<Entities.CartItem, 'product' | 'quantity'>} params
   */
  constructor({ product, quantity }) {
    this.product = product;
    this.quantity = quantity;
  }

  /**
   * Calculates the total price for this cart item.
   * @returns {number}
   */
  get totalPrice() {
    return this.product.price * this.quantity;
  }
}

module.exports = { CartItem };
