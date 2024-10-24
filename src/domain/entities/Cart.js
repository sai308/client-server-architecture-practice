const { CartItem } = require('./CartItem');

/**
 * @type {Entities.Cart}
 */
class Cart {
  /**
   * @param {EntityFields.Cart} params
   */
  constructor({ id, userId, items = [] }) {
    this.id = id;
    this.items = items;
    this.userId = userId;
  }

  /**
   * Adds a product to the cart or increases its quantity.
   * @param {Entities.Product} product
   * @param {number} quantity
   */
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(
        new CartItem({
          product,
          quantity,
        })
      );
    }
  }

  /**
   * Decreases the quantity of a product or removes it if quantity reaches zero.
   * @param {string} productId
   * @param {number} quantity
   */
  removeItem(productId, quantity = 1) {
    const itemIndex = this.items.findIndex(
      (item) => item.product.id === productId
    );

    if (itemIndex === -1) {
      throw new Error('Product not found in cart');
    }

    const item = this.items[itemIndex];
    item.quantity -= quantity;

    if (item.quantity <= 0) {
      this.items.splice(itemIndex, 1); // Remove item from cart
    }
  }

  /**
   * Clears all items from the cart.
   */
  clear() {
    this.items = [];
  }
}

module.exports = { Cart };
