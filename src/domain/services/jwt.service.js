const jwt = require('jsonwebtoken');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require('./../../../config');

/**
 * @implements {Services.IJwtService}
 */
class JwtService {
  #accessTokenSecret;
  #refreshTokenSecret;

  constructor() {
    this.#accessTokenSecret = ACCESS_TOKEN_SECRET;
    this.#refreshTokenSecret = REFRESH_TOKEN_SECRET;
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.#accessTokenSecret, { expiresIn: '15m' });
  }

  generateRefreshToken(payload, expiresAt) {
    const options = expiresAt
      ? { expiresIn: expiresAt - Date.now() } // expiresAt is used to calculate the remaining time
      : { expiresIn: '7d' };

    return jwt.sign(payload, this.#refreshTokenSecret, options);
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.#accessTokenSecret);
    } catch (err) {
      return null;
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.#refreshTokenSecret);
    } catch (err) {
      return null;
    }
  }
}

module.exports = { jwtService: new JwtService() };
