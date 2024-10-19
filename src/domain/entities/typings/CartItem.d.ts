declare namespace Entities {
  export type CartItem = {
    product: Product;
    quantity: number;
    totalPrice?: number;
  };
}
