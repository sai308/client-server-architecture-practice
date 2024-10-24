declare namespace Repositories {
  interface IUserRepository {
    getById(id: string): Promise<Entities.User | null>;
    save(user: Entities.User): Promise<Entities.User>;
    // Additional methods as needed.
  }
}
