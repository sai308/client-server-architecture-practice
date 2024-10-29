declare namespace Repositories {
  interface IUserRepository {
    getByUsername(username: string): Promise<Entities.User | null>;
    getById(id: string): Promise<Entities.User | null>;
    save(user: Entities.User): Promise<Entities.User>;
    // Additional methods as needed.
  }
}
