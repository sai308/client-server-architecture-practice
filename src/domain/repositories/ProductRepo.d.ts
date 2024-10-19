declare namespace Repositories {
  interface ProductRepository {
    getById(id: string): Promise<Entities.Product | null>;
    save(product: Entities.Product): Promise<void>;
    update(product: Entities.Product): Promise<void>;
    delete(id: string): Promise<void>;
    find(filters: {
      term?: string;
      limit?: number;
      offset?: number;
      sort?: string;
    }): Promise<Entities.Product[]>;
  }
}
