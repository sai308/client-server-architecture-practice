class ListReceiptsForUserAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IReceiptRepository} dependencies.receiptRepository
   */
  constructor({ receiptRepository }) {
    this.receiptRepository = receiptRepository;
  }

  /**
   * Retrieves all receipts for a user.
   * @param {string} userId
   * @returns {Promise<Entities.Receipt[]>}
   */
  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const receipts = await this.receiptRepository.getByUserId(userId);
    return receipts;
  }
}

module.exports = { ListReceiptsForUserAction };
