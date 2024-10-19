declare namespace Entities {
  export type ReceiptItem = {
    product: Product;
    quantity: number;
    totalPrice?: number;
    priceAtPurchase: number;
  };
}
