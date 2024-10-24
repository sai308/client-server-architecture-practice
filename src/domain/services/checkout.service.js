const { Receipt, ReceiptItem } = require('../entities');

class CheckoutService {
  /**
   * @param {Object} dependencies
   * @param {Repositories.ICartRepository} dependencies.cartRepository
   * @param {Repositories.IReceiptRepository} dependencies.receiptRepository
   * @param {Repositories.IUserRepository} dependencies.userRepository
   * @param {Services.PricingService} dependencies.pricingService
   */
  constructor({
    cartRepository,
    receiptRepository,
    userRepository,
    pricingService,
  }) {
    this.cartRepository = cartRepository;
    this.receiptRepository = receiptRepository;
    this.userRepository = userRepository;
    this.pricingService = pricingService;
  }

  /**
   * Handles the checkout process for a user's cart.
   * @param {string} userId
   * @returns {Promise<Entities.Receipt>}
   */
  async checkout(userId) {
    const cart = await this.cartRepository.getByUserId(userId);
    if (!cart) throw new Error('Cart not found');

    const user = await this.userRepository.getById(userId);
    if (!user) throw new Error('User not found');

    // Calculate total amount
    const totalAmount = this.pricingService.calculateTotal(cart);

    // Create ReceiptItems from CartItems
    const receiptItems = cart.items.map(
      (cartItem) =>
        new ReceiptItem({
          product: cartItem.product,
          quantity: cartItem.quantity,
          priceAtPurchase: cartItem.product.price,
        })
    );

    // Create Receipt
    const receipt = new Receipt({
      userId: user.id,
      items: receiptItems,
      totalAmount,
      createdAt: new Date(),
    });

    // Save Receipt
    await this.receiptRepository.save(receipt);

    // Clear Cart
    await this.cartRepository.deleteByUserId(userId);

    return receipt;
  }
}

module.exports = { CheckoutService };
