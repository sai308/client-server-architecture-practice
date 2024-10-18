const {
  mongoDBAdapter: { $db, asObjectId },
} = require("./../adapters/mongodb");

/**
 * @description A repository for managing receipts
 */
class ReceiptRepository {
  /** @type {import('mongodb').Db} */
  #db;

  /** @type {import('mongodb').Collection} */
  #collection;

  constructor() {
    this.#db = $db;
    this.#collection = $db.collection("receipts");
  }

  /**
   * Create a new receipt with the given data
   * @param {object} data
   */
  async create(data) {
    const { items } = data;

    const newReceipt = {
      items,
      createdAt: new Date(),
    };

    const result = await this.#collection.insertOne(newReceipt);

    return result.insertedId;
  }

  /**
   * Read a receipt with the given ID or all receipts if no ID is provided
   * @param {string} [id]
   * @returns {Promise<object | object[]>}
   */
  async findById(id) {
    const receipt = await this.#collection.findOne({ _id: asObjectId(id) });

    if (!receipt) {
      throw new Error("Receipt not found");
    }

    return receipt;
  }
}

module.exports.receiptRepository = new ReceiptRepository();
