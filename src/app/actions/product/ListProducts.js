class ListProductsAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /**
   * Retrieves a list of products based on filters.
   * @param {Object} filters
   * @param {string} [filters.term]
   * @param {number} [filters.limit]
   * @param {number} [filters.offset]
   * @param {string} [filters.sort]
   * @returns {Promise<Entities.Product[]>}
   */
  async execute(filters) {
    const products = await this.productRepository.find(filters);
    return products;
  }
}

module.exports = { ListProductsAction };
