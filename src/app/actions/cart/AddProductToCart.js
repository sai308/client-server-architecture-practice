const { Cart } = require('../../../domain/entities');

class AddProductToCartAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.ICartRepository} dependencies.cartRepository
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ cartRepository, productRepository }) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  /**
   * Adds a product to the user's cart.
   * @param {string} userId
   * @param {string} productId
   * @param {number} quantity
   * @returns {Promise<Entities.Cart>}
   */
  async execute(userId, productId, quantity = 1) {
    if (!userId || !productId) {
      throw new Error('User ID and Product ID are required');
    }

    const product = await this.productRepository.getById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await this.cartRepository.getByUserId(userId);

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    cart.addItem(product, quantity);

    await this.cartRepository.update(cart); //

    return cart;
  }
}

module.exports = { AddProductToCartAction };
