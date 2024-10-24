/**
 * @implements {Entities.User}
 */
class User {
  /**
   * @param {EntityFields.User} params
   */
  constructor({ id, cartRef }) {
    this.id = id;
    this.cartRef = cartRef || null;
  }
}

module.exports = { User };
