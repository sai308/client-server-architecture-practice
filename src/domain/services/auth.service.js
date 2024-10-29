const bcrypt = require('bcrypt');

const { User } = require('../entities/User');

/**
 * @implements {Services.IAuthService}
 */
class AuthService {
  /**
   * @param {object} dependencies
   * @param {Repositories.IUserRepository} dependencies.userRepository
   * @param {Services.IJwtService} dependencies.jwtService
   */
  constructor({ userRepository, jwtService }) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  /**
   * Authorize a user and generate access and refresh tokens
   * @param {Entities.User} user
   */
  async #authorizeUser(user) {
    const sessionId = require('crypto').randomBytes(6).toString('hex');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken({
        isPrivileged: user.isPrivileged,
        userId: user.id,
        sessionId,
      }),
      this.jwtService.generateRefreshToken({
        userId: user.id,
        sessionId,
      }),
    ]);

    return { accessToken, refreshToken, user };
  }

  /**
   * Generate a password hash and salt
   * @param {string} password
   */
  async generatePasswordHash(password) {
    const passwordHash = await bcrypt.hash(password, 10);

    return passwordHash;
  }

  /**
   * Authenticate a user with a username and password
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   */
  async authenticateUser(username, password) {
    const user = await this.userRepository.getByUsername(username);

    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) throw new Error('Invalid credentials');

    // Remove sensitive data after successful authentication
    user.passwordHash = null;

    return user;
  }

  /**
   * Register a new user in the system with a hashed password
   * @param {EntityFields.UserWithoutPassword & { password: string }} user
   */
  async register(user) {
    const { password } = user;

    const newUser = new User({
      username: user.username,
      passwordHash: await this.generatePasswordHash(password),
    });

    await this.userRepository.save(newUser);
  }

  /**
   * Authenticate a user with a username and password and generate tokens
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   */
  async login(username, password) {
    const user = await this.authenticateUser(username, password);

    return this.#authorizeUser(user);
  }

  /**
   * Check if the access token is valid and return the user data
   * @param {string} token - access token
   */
  async checkAccess(token) {
    const payload = /** @type {Services.ISessionTokenPayload | null} */ (
      this.jwtService.verifyAccessToken(token)
    );

    if (!payload) throw new Error('Invalid access token');

    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
      isPrivileged: payload.isPrivileged,
    };
  }

  /**
   * Refresh the access and refresh tokens pair
   * @param {string} token
   */
  async refreshTokensPair(token) {
    const payload = /** @type {Services.ISessionTokenPayload | null} */ (
      this.jwtService.verifyRefreshToken(token)
    );

    if (!payload) throw new Error('Invalid refresh token');

    const user = await this.userRepository.getById(payload.userId);

    user.passwordHash = null;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken({
        isPrivileged: user.isPrivileged,
        sessionId: payload.sessionId,
        userId: user.id,
      }),
      this.jwtService.generateRefreshToken(
        {
          sessionId: payload.sessionId,
          userId: user.id,
        },
        payload.exp
      ),
    ]);

    return { accessToken, refreshToken, user };
  }
}

module.exports = { AuthService };
