const {
  postgresAdapter: { $prisma },
} = require('./../database/postgres');

const { Product } = require('../../domain/entities');

/**
 * @implements {Repositories.IProductRepository}
 */
class ProductRepository {
  #db = $prisma;

  async getById(id) {
    const productData = await this.#db.product.findUnique({
      where: { id },
    });

    if (!productData) return null;

    const product = new Product({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      releaseDate: productData.releaseDate,
    });

    return product;
  }

  async save(product) {
    return await this.#db.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        releaseDate: product.releaseDate,
      },
    });
  }

  async update(product) {
    return await this.#db.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        releaseDate: product.releaseDate,
      },
    });
  }

  async delete(id) {
    await this.#db.product.delete({
      where: { id },
    });
  }

  async find(filters) {
    const { term, limit = 10, offset = 0, sort = 'releaseDate' } = filters;

    /** @type {import('@prisma/client').Prisma.ProductWhereInput} */
    const whereClause = term
      ? { name: { contains: term, mode: 'insensitive' } }
      : {};

    const [products, total] = await Promise.all([
      this.#db.product.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: { [sort]: 'desc' },
      }),
      this.#db.product.count({ where: whereClause }),
    ]);

    return {
      items: products.map((product) => new Product(product)),
      page: Math.ceil(offset / limit) + 1,
      total,
    };
  }
}

module.exports = { productRepository: new ProductRepository() };
