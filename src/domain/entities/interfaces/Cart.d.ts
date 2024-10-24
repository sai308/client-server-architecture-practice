declare namespace EntityFields {
  export type Cart = {
    id?: string;
    userId: string;
    items: Array<Entities.CartItem>;
  };
}

declare namespace Entities {
  export class Cart {
    public id?: string;
    public userId: string;
    public items: Entities.CartItem[];

    constructor(fields: EntityFields.Cart) {
      this.id = fields.id;
      this.userId = fields.userId;
      this.items = fields.items;
    }

    /**
     * Adds an item to the cart.
     * @param {Entities.Product} product
     * @param {number} quantity
     */
    addItem(product: Entities.Product, quantity?: number): void;

    /**
     * Removes an item from the cart by product ID.
     * @param {string} productId
     */
    removeItem(productId: string, quantity?: number): void;

    /**
     * Clears all items from the cart.
     */
    clear(): void;
  }
}
