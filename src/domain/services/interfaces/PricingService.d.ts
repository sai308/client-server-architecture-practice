declare namespace Services {
  export class IPricingService {
    calculateTotal(cart: Entities.Cart): number;
    calculateItemTotal(item: Entities.CartItem): number;
  }
}
