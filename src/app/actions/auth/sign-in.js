const { HttpException } = require('../../../presentation/errors/http');

class SignInAction {
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
   * Adds a product to the user's cart.
   * @param {string} username
   * @param {string} password
   */
  async execute(username, password) {
    if (!username || !password) {
      throw new HttpException(401, 'Invalid credentials are provided');
    }

    try {
      const { accessToken, refreshToken, user } = await this.authService.login(
        username,
        password
      );

      return { accessToken, refreshToken, user };
    } catch (error) {
      throw new HttpException(401, 'Invalid credentials are provided', error);
    }
  }
}

module.exports = { SignInAction };
