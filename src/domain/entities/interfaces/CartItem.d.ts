declare namespace EntityFields {
  export type CartItem = {
    product: Entities.Product;
    quantity: number;
    addedAt?: Date;
  };
}

declare namespace Entities {
  export class CartItem {
    public product: Entities.Product;
    public quantity: number;
    public addedAt?: Date;

    constructor(fields: EntityFields.CartItem) {
      this.product = fields.product;
      this.quantity = fields.quantity;
      this.addedAt = fields.addedAt;
    }
  }
}
