class GetProductAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /**
   * Retrieves a product by its ID.
   * @param {string} productId
   * @returns {Promise<Entities.Product>}
   */
  async execute(productId) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}

module.exports = { GetProductAction };
