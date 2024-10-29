declare namespace Services {
  export interface IAuthService {
    register(
      user: EntityFields.UserWithoutPassword & { password: string }
    ): Promise<void>;

    generatePasswordHash(password: string): Promise<string>;

    login(
      username: string,
      password: string
    ): Promise<{
      accessToken: string;
      refreshToken: string;
      user: Entities.User;
    }>;

    checkAccess(token: string): Promise<{
      userId: string;
      sessionId: string;
      isPrivileged?: boolean;
    }>;

    refreshTokensPair(token: string): Promise<{
      accessToken: string;
      refreshToken: string;
      user: Entities.User;
    }>;
  }

  export interface ISessionPayload {
    userId: string;
    sessionId: string;
    isPrivileged?: boolean;
  }

  export interface ISessionTokenPayload extends ISessionPayload {
    iat: number;
    exp: number;
  }
}
