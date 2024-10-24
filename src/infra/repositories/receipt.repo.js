const {
  mongoDBAdapter: { $db, asObjectId },
} = require('./../database/mongodb');

const { Receipt, ReceiptItem, Product } = require('../../domain/entities');

/**
 * @implements {Repositories.IReceiptRepository}
 */
class ReceiptRepository {
  #collection = $db.collection('carts');

  /**
   * @param {string} id
   */
  async getById(id) {
    const receiptData = await this.#collection.findOne({ _id: asObjectId(id) });

    if (!receiptData) return null;

    const items = receiptData.items.map(
      (item) =>
        new ReceiptItem({
          product: new Product(item.product),
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
        })
    );

    return new Receipt({
      id: receiptData._id.toString(),
      userId: receiptData.userId,
      items,
      totalAmount: receiptData.totalAmount,
      createdAt: receiptData.createdAt,
    });
  }

  /**
   * @param {Entities.Receipt} receipt
   */
  async save(receipt) {
    const { insertedId } = await this.#collection.insertOne(receipt);

    receipt.id = insertedId.toString();

    return receipt;
  }

  /**
   * @param {string} userId
   */
  async getByUserId(userId) {
    const receiptsData = await this.#collection.find({ userId }).toArray();

    return receiptsData.map((receiptData) => {
      const items = receiptData.items.map(
        (item) =>
          new ReceiptItem({
            product: new Product(item.product),
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          })
      );

      return new Receipt({
        id: receiptData._id.toString(),
        userId: receiptData.userId,
        items,
        totalAmount: receiptData.totalAmount,
        createdAt: receiptData.createdAt,
      });
    });
  }
}

module.exports = { receiptRepository: new ReceiptRepository() };
