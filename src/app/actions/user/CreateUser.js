const { User } = require('../../../domain/entities');

class CreateUserAction {
  /**
   * @param {Object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   * @param {Services.IAuthService} dependencies.authService
   */
  constructor({ userRepository, authService }) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  /**
   * Creates a new user.
   * @param {string} username
   * @param {string} password
   * @returns {Promise<Entities.User>}
   */
  async execute(username, password) {
    const user = new User({
      // Any additional initialization if needed
      username,
      passwordHash: await this.authService.generatePasswordHash(password),
    });

    return await this.userRepository.save(user);
  }
}

module.exports = { CreateUserAction };
