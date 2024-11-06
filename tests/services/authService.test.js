const assert = require('assert');
const { randomUUID } = require('node:crypto');
const { describe, it } = require('node:test');
const bcrypt = require('bcrypt');

const { AuthService } = require('../../src/domain/services/auth.service');

// Mock dependencies for AuthService
const mockUserRepository = {
  getByUsername: async (username) => {
    if (username === 'testuser') {
      return {
        id: randomUUID(),
        username,
        passwordHash: await bcrypt.hash('password', 10),
      };
    }
    return null;
  },
  save: async (user) => user,
};
const mockJwtService = {
  generateAccessToken: () => 'accessToken',
  generateRefreshToken: () => 'refreshToken',
};

const authService = new AuthService({
  // @ts-ignore - no need for full implementation
  userRepository: mockUserRepository,
  // @ts-ignore - no need for full implementation
  jwtService: mockJwtService,
});

describe('AuthService', () => {
  it('🔒 should generate a hashed password that does not match the original', async () => {
    const password = 'myPassword123';
    const hash = await authService.generatePasswordHash(password);

    assert.notEqual(
      hash,
      password,
      'Password hash should not match original password'
    );
  });

  it('✅ should return user if credentials are correct', async () => {
    const username = 'testuser';
    const password = 'password';
    const user = await authService.authenticateUser(username, password);

    assert.strictEqual(
      user.username,
      username,
      'Authenticated username should match'
    );
  });

  it('🔑 should return access and refresh tokens upon login', async () => {
    const { accessToken, refreshToken } = await authService.login(
      'testuser',
      'password'
    );

    assert.ok(accessToken, 'Access token should be defined');
    assert.ok(refreshToken, 'Refresh token should be defined');
  });
});
