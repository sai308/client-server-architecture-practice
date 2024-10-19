declare namespace Repositories {
  interface ReceiptRepository {
    getById(id: string): Promise<Entities.Receipt | null>;
    save(receipt: Entities.Receipt): Promise<void>;
    getByUserId(userId: string): Promise<Entities.Receipt[]>;
  }
}
