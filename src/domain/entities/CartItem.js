/**
 * @implements {Entities.CartItem}
 */
class CartItem {
  /**
   * @param {EntityFields.CartItem} params
   */
  constructor({ product, quantity, addedAt }) {
    this.product = product;
    this.quantity = quantity;
    this.addedAt = addedAt || new Date();
  }
}

module.exports = { CartItem };
