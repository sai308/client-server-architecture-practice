class ReceiptItem {
  /**
   * @param {Entities.ReceiptItem} params
   */
  constructor({ product, quantity, priceAtPurchase }) {
    this.product = product;
    this.quantity = quantity;
    this.priceAtPurchase = priceAtPurchase;
  }

  /**
   * Calculates the total price for this receipt item.
   * @returns {number}
   */
  get totalPrice() {
    return this.priceAtPurchase * this.quantity;
  }
}

module.exports = { ReceiptItem };
