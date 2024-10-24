class RemoveProductFromCartAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.ICartRepository} dependencies.cartRepository
   */
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  }

  /**
   * Removes a product from the user's cart.
   * @param {string} userId
   * @param {string} productId
   * @param {number} quantity
   * @returns {Promise<Entities.Cart>}
   */
  async execute(userId, productId, quantity = -1) {
    if (!userId || !productId) {
      throw new Error('User ID and Product ID are required');
    }

    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.removeItem(productId, quantity);

    await this.cartRepository.update(cart);

    return cart;
  }
}

module.exports = { RemoveProductFromCartAction };
