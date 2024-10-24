declare namespace Repositories {
  interface IReceiptRepository {
    getById(id: string): Promise<Entities.Receipt | null>;
    save(receipt: Entities.Receipt): Promise<Entities.Receipt>;
    getByUserId(userId: string): Promise<Entities.Receipt[]>;
  }
}
