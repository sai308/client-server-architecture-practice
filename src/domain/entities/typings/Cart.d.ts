declare namespace Entities {
  export type Cart = {
    id: string;
    user: User;
    items: CartItem[];
  };
}
