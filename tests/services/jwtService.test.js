const assert = require('node:assert');
const { describe, it } = require('node:test');
const { jwtService } = require('../../src/domain/services/jwt.service');

// Mock payload data for JWT tests
const payload = { userId: '1', sessionId: 'session123' };

describe('JwtService', () => {
  it('🔐 should generate a valid access token and verify it', () => {
    const token = jwtService.generateAccessToken(payload);
    const decoded = jwtService.verifyAccessToken(token);

    assert.strictEqual(
      // @ts-ignore - userId is a valid property
      decoded.userId,
      payload.userId,
      'Decoded token userId should match payload'
    );
  });

  it('🔄 should generate a valid refresh token and verify it', () => {
    const token = jwtService.generateRefreshToken(payload);
    const decoded = jwtService.verifyRefreshToken(token);

    assert.strictEqual(
      // @ts-ignore - userId is a valid property
      decoded.userId,
      payload.userId,
      'Decoded token userId should match payload'
    );
  });

  it('🚫 should return null for invalid access token', () => {
    const decoded = jwtService.verifyAccessToken('invalidToken');

    assert.strictEqual(decoded, null, 'Invalid token should return null');
  });

  it('🚫 should return null for invalid refresh token', () => {
    const decoded = jwtService.verifyRefreshToken('invalidToken');

    assert.strictEqual(decoded, null, 'Invalid token should return null');
  });
});
