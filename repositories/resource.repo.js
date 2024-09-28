const { randomUUID } = require("node:crypto");

/**
 * @description A repository for managing resources
 */
class ResourceRepository {
  constructor() {
    this.storage = new Map();
  }

  /**
   * Create a new resource with the given data
   * @param {ResourceShape} data
   * @returns {Promise<ResourceInstance>}
   */
  async create(data) {
    // Generate a random UUID for the new resource
    const id = randomUUID();

    const syncedTimestamp = Date.now();

    // Store the new resource in the storage
    this.storage.set(id, {
      id,
      ...data,
      createdAt: syncedTimestamp,
      updatedAt: syncedTimestamp,
    });

    // Return the newly created resource
    return this.storage.get(id);
  }

  /**
   * @template I
   * Read a resource with the given ID or all resources if no ID is provided
   * @param {I} [id]
   * @returns {Promise< I extends string ? ResourceInstance : ResourceInstance[]>}
   */
  async read(id) {
    // Check if the resource with the given ID exists
    if (id && !this.storage.has(id)) {
      throw new Error("Resource not found");
    }

    // Return the resource with the given ID or all resources
    return id ? this.storage.get(id) : Array.from(this.storage.values());
  }

  /**
   * Update a resource with the given ID using the provided data
   * @param {string} id
   * @param {ResourceShape} data
   * @returns {Promise<ResourceInstance>}
   */
  async update(id, data) {
    if (!this.storage.has(id)) {
      throw new Error("Resource not found");
    }

    // Ensure the ID is not updated
    // @ts-ignore - id is forbidden to be updated in the data but still potentially be provided
    delete data.id;

    // Update the resource with the new data
    this.storage.set(id, {
      ...this.storage.get(id),
      ...data,
      updatedAt: Date.now(),
    });

    // Return the updated resource
    return this.storage.get(id);
  }

  /**
   * Delete a resource with the given ID
   * @param {string} id
   * @returns {Promise<ResourceInstance>}
   */
  async delete(id) {
    if (!this.storage.has(id)) {
      throw new Error("Resource not found");
    }

    // Remove the resource from the storage
    const resource = this.storage.get(id);

    this.storage.delete(id);

    // Return the deleted resource
    return resource;
  }
}

module.exports.resourceRepository = new ResourceRepository();

// Type definitions

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  amount: number,
 *  price: number,
 * }} ResourceShape
 */

/**
 * @typedef { ResourceShape & {
 *  id: string,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} ResourceInstance
 */
