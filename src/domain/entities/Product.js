class Product {
  /**
   * @param {Entities.Product} params
   */
  constructor({
    id,
    name,
    description,
    price,
    releaseDate,
    developer,
    publisher,
    categories,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.releaseDate = releaseDate;
    this.developer = developer;
    this.publisher = publisher;
    this.categories = categories;
  }
}

module.exports = { Product };
