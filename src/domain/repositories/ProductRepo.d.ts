declare namespace Repositories {
  interface IProductRepository {
    getById(id: string): Promise<Entities.Product | null>;
    save(product: Entities.Product): Promise<Entities.Product>;
    update(product: Entities.Product): Promise<Entities.Product>;
    delete(id: string): Promise<void>;
    find(filters: {
      term?: string;
      limit?: number;
      offset?: number;
      sort?: string;
    }): Promise<Entities.Product[]>;
  }
}
