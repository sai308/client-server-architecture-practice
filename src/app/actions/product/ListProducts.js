const { HttpException } = require('../../../presentation/errors/http');

const { redisClient } = require('./../../../infra/database/redis');

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
   * @returns {Promise<Entities.ProductsList>}
   */
  async execute(filters) {
    const cacheKey = `Products:${this.normalizeFilters(filters)}`;

    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      const products = JSON.parse(cachedProducts);

      if (products.items.length === 0) {
        throw new HttpException(404, 'No products found');
      }

      return products;
    }

    const products = await this.productRepository.find(filters);

    // Cache the result for 1 hour, to reduce load on the database.
    // don't wait for the cache to be set, return the products immediately
    redisClient.set(cacheKey, JSON.stringify(products), 'EX', 3600);

    if (products.items.length === 0) {
      throw new HttpException(404, 'No products found');
    }

    return products;
  }

  normalizeFilters(filters) {
    // Convert the object into sorted entries
    const sortedEntries = Object.entries(filters).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB)
    ); // Sort by keys alphabetically

    // Convert sorted entries back into an object to ensure JSON.stringify order
    const normalizedObject = Object.fromEntries(sortedEntries);

    // Stringify the normalized object
    return JSON.stringify(normalizedObject);
  }
}

module.exports = { ListProductsAction };
