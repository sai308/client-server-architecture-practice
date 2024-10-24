class UpdateProductAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IProductRepository} dependencies.productRepository
   */
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  /**
   * Updates an existing product.
   * @param {string} productId
   * @param {Object} updateData
   * @returns {Promise<Entities.Product>}
   */
  async execute(productId, updateData) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Update product fields
    if (updateData.name !== undefined) {
      product.name = updateData.name;
    }

    if (updateData.description !== undefined) {
      product.description = updateData.description;
    }

    if (updateData.price !== undefined) {
      product.price = updateData.price;
    }

    if (updateData.releaseDate !== undefined) {
      product.releaseDate = updateData.releaseDate;
    }

    // Save the updated product
    await this.productRepository.update(product);

    return product;
  }
}

module.exports = { UpdateProductAction };
