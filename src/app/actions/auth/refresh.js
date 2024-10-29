const { HttpException } = require('../../../presentation/errors/http');

class RefreshAuthAction {
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
   * @param {string} refreshToken
   */
  async execute(refreshToken) {
    if (!refreshToken) {
      throw new HttpException(401, 'Invalid credentials are provided');
    }

    try {
      const sessionData =
        await this.authService.refreshTokensPair(refreshToken);

      return sessionData;
    } catch (error) {
      throw new HttpException(401, undefined, error);
    }
  }
}

module.exports = { RefreshAuthAction };
