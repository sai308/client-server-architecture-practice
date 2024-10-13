const { PrismaClient } = require("@prisma/client");

class PostgresAdapter {
  static instance;

  /** @type { import('@prisma/client').PrismaClient} */
  #prisma;

  constructor() {
    if (PostgresAdapter.instance) {
      return PostgresAdapter.instance;
    }

    this.#prisma = new PrismaClient();

    PostgresAdapter.instance = this;
    return this;
  }

  get $prisma() {
    return this.#prisma;
  }

  async query(model, action, params) {
    try {
      return await this.#prisma[model][action](params);
    } catch (error) {
      console.error("Error executing Prisma query:", error);
      throw error;
    }
  }

  async close() {
    await this.#prisma.$disconnect();
  }
}

const postgresAdapter = new PostgresAdapter();
Object.freeze(postgresAdapter);

module.exports = postgresAdapter;
