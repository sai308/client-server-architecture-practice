/**
 * @implements {Entities.Product}
 */
class Product {
  /**
   * @param {EntityFields.Product} params
   */
  constructor({ id, name, description, price, releaseDate }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.releaseDate = releaseDate || new Date();
  }
}

module.exports = { Product };
