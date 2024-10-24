const { User } = require('../../../domain/entities');

class CreateUserAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * Creates a new user.
   * @returns {Promise<Entities.User>}
   */
  async execute() {
    const user = new User({
      // Any additional initialization if needed
    });

    return await this.userRepository.save(user);
  }
}

module.exports = { CreateUserAction };
