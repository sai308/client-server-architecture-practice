class Category {
  /**
   * @param {Entities.Category} params
   */
  constructor({ id, name, itemsCount }) {
    this.id = id;
    this.name = name;
    this.itemsCount = itemsCount;
  }
}

module.exports = { Category };
