const { Product } = require('../../../domain/entities');

class CreateProductAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /**
   * Executes the use case to create a new product.
   * @param {Object} productData
   * @param {string} productData.name
   * @param {string} productData.description
   * @param {number} productData.price
   * @param {Date} productData.releaseDate
   * @returns {Promise<Entities.Product>}
   */
  async execute(productData) {
    const { name, description, price, releaseDate } = productData;

    // Validate input data
    if (!name || Number.isNaN(price)) {
      throw new Error('Missing required product data');
    }

    // Create new product entity
    const product = new Product({
      name,
      description,
      price,
      releaseDate,
    });

    // Save the product
    return await this.productRepository.save(product);
  }
}

module.exports = { CreateProductAction };
