const {
  postgresAdapter: { $prisma },
} = require('./../database/postgres');

const { User } = require('../../domain/entities');

/**
 * @implements {Repositories.IUserRepository}
 */
class UserRepository {
  #db = $prisma;

  async getById(id) {
    const userData = await this.#db.user.findUnique({
      where: { id },
    });

    if (!userData) return null;

    return new User(userData);
  }

  async save(user) {
    return await this.#db.user.create({
      data: {
        id: user.id,
      },
    });
  }
}

module.exports = { userRepository: new UserRepository() };
