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

  /**
   * @param {string} username
   */
  async getByUsername(username) {
    const userData = await this.#db.user.findFirst({
      where: { username },
    });

    if (!userData) return null;

    return new User(userData);
  }

  /**
   * Create a new user in the database
   * @param {EntityFields.User} user
   */
  async save(user) {
    return await this.#db.user.create({
      data: {
        id: user.id,
        username: user.username,
        passwordHash: user.passwordHash,
        cartRef: user.cartRef,
      },
    });
  }
}

module.exports = { userRepository: new UserRepository() };
