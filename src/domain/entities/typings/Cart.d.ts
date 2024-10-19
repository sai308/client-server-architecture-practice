declare namespace Entities {
  export type Cart = {
    id: string;
    user: TUser;
    items: TCartItem[];
  };
}
