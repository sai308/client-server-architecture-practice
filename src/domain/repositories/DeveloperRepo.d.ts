declare namespace Repositories {
  interface DeveloperRepository {
    getById(id: string): Promise<Entities.Developer | null>;
    save(developer: Entities.Developer): Promise<void>;
    // Additional methods as needed.
  }
}
