class Publisher {
  /**
   * @param {Entities.Publisher} params
   */
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

module.exports = { Publisher };
