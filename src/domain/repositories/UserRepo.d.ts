declare namespace Repositories {
  interface UserRepository {
    getById(id: string): Promise<Entities.User | null>;
    save(user: Entities.User): Promise<void>;
    // Additional methods as needed.
  }
}
