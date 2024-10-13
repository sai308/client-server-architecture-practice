const { MongoClient, ObjectId } = require("mongodb");
const { MONGODB_URI, MONGODB_DB } = require("./../config");

class MongoDBAdapter {
  static instance;

  /** @type {MongoClient} */
  #client;

  /** @type {import('mongodb').Db} */
  #database;
  constructor() {
    if (MongoDBAdapter.instance) {
      return MongoDBAdapter.instance;
    }

    this.#client = new MongoClient(MONGODB_URI);
    this.#database = null;

    MongoDBAdapter.instance = this;

    return this;
  }

  async connect() {
    try {
      await this.#client.connect();

      console.log("Connected to MongoDB");

      this.#database = this.#client.db(MONGODB_DB);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  get $db() {
    if (!this.#database) {
      throw new Error(
        "Database connection is not established. Please call connect() first."
      );
    }

    return this.#database;
  }

  async close() {
    await this.#client.close();
  }

  asObjectId(id) {
    // check with regexp
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error("Invalid ID");
    }

    return ObjectId.createFromHexString(id);
  }
}

const mongoDBAdapter = new MongoDBAdapter();
Object.freeze(mongoDBAdapter);

module.exports.mongoDBAdapter = mongoDBAdapter;
