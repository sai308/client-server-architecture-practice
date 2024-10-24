const { HttpException } = require('../../../presentation/errors/http');

class GetUserAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * Retrieves a user by ID.
   * @param {string} userId
   * @returns {Promise<Entities.User>}
   */
  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    return user;
  }
}

module.exports = { GetUserAction };
