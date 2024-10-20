const { CartItem } = require('./CartItem');

class Cart {
  /**
   * @param {Entities.Cart} params
   */
  constructor({ id, user, items = [] }) {
    this.id = id;
    this.user = user;
    this.items = items;
  }

  /**
   * Calculates the total amount for the cart.
   * @returns {number}
   */
  get totalAmount() {
    return this.items.reduce((total, item) => total + item.totalPrice, 0);
  }

  /**
   * Adds an item to the cart.
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
      this.items.push(new CartItem({ product, quantity }));
    }
  }

  /**
   * Removes an item from the cart by product ID.
   * @param {string} productId
   */
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  /**
   * Clears all items from the cart.
   */
  clear() {
    this.items = [];
  }
}

module.exports = { Cart };
