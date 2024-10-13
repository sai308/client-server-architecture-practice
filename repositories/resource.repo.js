const {
  postgresAdapter: { $prisma },
} = require("./../adapters/postgres");

// ResourceRepository using Prisma

/**
 * @description A repository for managing resources
 */
class ResourceRepository {
  /** @type { import('@prisma/client').PrismaClient} */
  #prisma;

  constructor() {
    this.#prisma = $prisma;
  }

  /**
   * Create a new resource with the given data
   * @param {ResourceShape} data
   * @returns {Promise<TResource>}
   */
  async create(data) {
    return await this.#prisma.resource.create({
      data,
    });
  }

  /**
   * @template  PK
   * Read a resource with the given ID
   * @param {string} [id]
   */
  async findByPK(id) {
    const resource = await this.#prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  }

  /**
   * Find resources using the provided query parameters
   * @param {Object} query
   * @param {string} [query.term]
   * @param {number} [query.limit]
   * @param {number} [query.offset]
   * @param {keyof TResource} [query.sort]
   * @returns {Promise<TResource[]>}
   */
  async find({ term, limit, offset, sort }) {
    const resources = await this.#prisma.resource.findMany({
      where: term ? { name: { contains: term } } : {},
      skip: offset,
      take: limit,
      orderBy: { [sort]: "desc" },
    });

    return resources;
  }

  /**
   * Update a resource with the given ID using the provided data
   * @param {string} id
   * @param {ResourceShape} data
   * @returns {Promise<TResource>}
   */
  async update(id, data) {
    return await this.#prisma.resource.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a resource with the given ID
   * @param {string} id
   * @returns {Promise<TResource>}
   */
  async delete(id) {
    return await this.#prisma.resource.delete({
      where: { id },
    });
  }
}

module.exports.resourceRepository = new ResourceRepository();

// Type definitions

/**
 * @typedef {import("@prisma/client").Resource} TResource
 */

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  amount: number,
 *  price: number,
 * }} ResourceShape
 */
