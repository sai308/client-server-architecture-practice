class Receipt {
  /**
   * @param {Entities.Receipt} params
   */
  constructor({ id, user, items, totalAmount, createdAt }) {
    this.id = id;
    this.user = user;
    this.items = items;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = { Receipt };
