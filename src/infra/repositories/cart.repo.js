const {
  mongoDBAdapter: { $db, asObjectId, newObjectId },
} = require('./../database/mongodb');

const { Cart, CartItem, Product } = require('../../domain/entities');

/**
 * @implements {Repositories.ICartRepository}
 */
class CartRepository {
  #collection = $db.collection('carts');

  /**
   * @param {string} userId
   */
  async getByUserId(userId) {
    const cartData = await this.#collection.findOne({ userId });

    if (!cartData) return null;

    const items = cartData.items.map(
      (item) =>
        new CartItem({
          product: new Product(item.product),
          quantity: item.quantity,
        })
    );

    const serializedCartId = cartData._id.toString();

    return new Cart({
      id: serializedCartId,
      userId: cartData.userId,
      items,
    });
  }

  /**
   * @param {Entities.Cart} cart
   */
  async save(cart) {
    const cartData = new Cart({
      userId: cart.userId,
      items: cart.items.map(
        (item) =>
          new CartItem({
            product: {
              id: item.product.id,
              name: item.product.name,
              description: item.product.description,
              price: item.product.price,
              releaseDate: item.product.releaseDate,
            },
            quantity: item.quantity,
          })
      ),
    });

    const { insertedId } = await this.#collection.insertOne(cartData);

    cartData.id = insertedId.toString();

    return cartData;
  }

  /**
   * @param {string} userId
   */
  async deleteByUserId(userId) {
    await this.#collection.deleteOne({ userId });
  }

  /**
   * @param {Entities.Cart} cart
   */
  async update(cart) {
    const updateFields = {
      items: cart.items,
    };

    if (cart.userId) {
      updateFields.userId = cart.userId;
    }

    await this.#collection.updateOne(
      { _id: cart.id ? asObjectId(cart.id) : newObjectId() },
      {
        $set: updateFields,
      },
      { upsert: true }
    );

    return cart;
  }
}

module.exports = { cartRepository: new CartRepository() };
