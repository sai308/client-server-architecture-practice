import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    domainContext: App.DomainContext;
  }
}
