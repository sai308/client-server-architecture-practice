/**
 * @implements {Entities.ReceiptItem}
 */
class ReceiptItem {
  /**
   * @param {EntityFields.ReceiptItem} params
   */
  constructor({ product, quantity, priceAtPurchase }) {
    this.product = product;
    this.quantity = quantity;
    this.priceAtPurchase = priceAtPurchase;
  }
}

module.exports = { ReceiptItem };
