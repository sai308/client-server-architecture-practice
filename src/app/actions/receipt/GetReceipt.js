class GetReceiptAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IReceiptRepository} dependencies.receiptRepository
   */
  constructor({ receiptRepository }) {
    this.receiptRepository = receiptRepository;
  }

  /**
   * Retrieves a receipt by its ID.
   * @param {string} receiptId
   * @returns {Promise<Entities.Receipt>}
   */
  async execute(receiptId) {
    if (!receiptId) {
      throw new Error('Receipt ID is required');
    }

    const receipt = await this.receiptRepository.getById(receiptId);
    if (!receipt) {
      throw new Error('Receipt not found');
    }

    return receipt;
  }
}

module.exports = { GetReceiptAction };
