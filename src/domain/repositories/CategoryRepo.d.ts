declare namespace Repositories {
  interface CategoryRepository {
    getById(id: string): Promise<Entities.Category | null>;
    save(category: Entities.Category): Promise<void>;
    // Additional methods as needed.
  }
}
