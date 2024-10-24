/**
 * @implements {Entities.Receipt}
 */
class Receipt {
  /**
   * @param {EntityFields.Receipt} params
   */
  constructor({ id, userId, items, totalAmount, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = { Receipt };
