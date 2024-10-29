declare namespace Services {
  export interface IJwtService {
    generateAccessToken(payload: string | object | Buffer): string;
    generateRefreshToken(
      payload: string | object | Buffer,
      expiresAt?: number
    ): string;

    verifyAccessToken(
      token: string
    ): import('jsonwebtoken').JwtPayload | string | null;

    verifyRefreshToken(
      token: string
    ): import('jsonwebtoken').JwtPayload | string | null;
  }
}
