const { HttpException } = require('../../../presentation/errors/http');

class HandleAuthAction {
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
   * @param {string} accessToken
   */
  async execute(accessToken) {
    if (!accessToken) return null;

    try {
      const accessData = await this.authService.checkAccess(accessToken);

      return accessData;
    } catch (error) {
      throw new HttpException(401, undefined, error);
    }
  }
}

module.exports = { HandleAuthAction };
