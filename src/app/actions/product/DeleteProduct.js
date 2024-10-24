class DeleteProductAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /**
   * Deletes a product by its ID.
   * @param {string} productId
   * @returns {Promise<void>}
   */
  async execute(productId) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(productId);
  }
}

module.exports = { DeleteProductAction };
