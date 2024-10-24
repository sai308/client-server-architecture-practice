declare namespace EntityFields {
  export type ReceiptItem = {
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  };
}

declare namespace Entities {
  export class ReceiptItem {
    public product: Product;
    public quantity: number;
    public priceAtPurchase: number;

    public totalPrice?: number;

    constructor(fields: EntityFields.ReceiptItem) {
      this.product = fields.product;
      this.quantity = fields.quantity;
      this.priceAtPurchase = fields.priceAtPurchase;
    }
  }
}
