declare namespace Repositories {
  interface CartRepository {
    getByUserId(userId: string): Promise<Entities.Cart | null>;
    save(cart: Entities.Cart): Promise<void>;
    update(cart: Entities.Cart): Promise<void>;
    deleteByUserId(userId: string): Promise<void>;
  }
}
