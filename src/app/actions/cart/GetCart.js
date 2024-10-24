const { HttpException } = require('../../../presentation/errors/http');

class GetCartAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.ICartRepository} dependencies.cartRepository
   */
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  }

  /**
   * Retrieves the user's cart.
   * @param {string} userId
   * @returns {Promise<Entities.Cart>}
   */
  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart) {
      throw new HttpException(404, 'Cart not found');
    }

    return cart;
  }
}

module.exports = { GetCartAction };
