import { preHandlerAsyncHookHandler } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider,
  > {
    authPipeFactory<
      Request extends FastifyRequest = FastifyRequest,
      Reply extends FastifyReply = FastifyReply,
    >(config?: {
      isPassive?: boolean;
    }): preHandlerAsyncHookHandler<
      RawServer,
      RawRequest,
      RawReply,
      RouteGenericInterface,
      ContextConfigDefault,
      FastifySchema,
      TypeProvider,
      Logger
    >;

    authGuardFactory<
      Request extends FastifyRequest = FastifyRequest,
      Reply extends FastifyReply = FastifyReply,
    >(config?: {
      isPrivilegeRequired?: boolean;
    }): preHandlerAsyncHookHandler<
      RawServer,
      RawRequest,
      RawReply,
      RouteGenericInterface,
      ContextConfigDefault,
      FastifySchema,
      TypeProvider,
      Logger
    >;
  }
}
