class CheckoutCartAction {
  /**
   * @param {Object} dependencies
   * @param {Services.CheckoutService} dependencies.checkoutService
   * @param {Repositories.ICartRepository} dependencies.cartRepository
   */
  constructor({ checkoutService, cartRepository }) {
    this.checkoutService = checkoutService;
    this.cartRepository = cartRepository;
  }

  /**
   * Executes the use case to process the user's cart and generate a receipt.
   * @param {string} userId
   * @returns {Promise<Entities.Receipt>}
   */
  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Use the CheckoutService to handle the checkout process
    const receipt = await this.checkoutService.checkout(userId);

    await this.cartRepository.deleteByUserId(userId);

    return receipt;
  }
}

module.exports = { CheckoutCartAction };
