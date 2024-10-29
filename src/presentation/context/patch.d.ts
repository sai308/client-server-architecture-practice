import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    domainContext: App.DomainContext;
  }
}

declare module '@fastify/request-context' {
  interface RequestContextData {
    sessionData: Partial<Services.ISessionPayload>;
    hasSession: boolean;
  }
}
