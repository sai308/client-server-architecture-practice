declare namespace Repositories {
  interface ICartRepository {
    getByUserId(userId: string): Promise<Entities.Cart | null>;
    save(cart: Entities.Cart): Promise<Entities.Cart>;
    update(cart: Entities.Cart): Promise<Entities.Cart>;
    deleteByUserId(userId: string): Promise<void>;
  }
}
