declare namespace Services {
  export class PricingService {
    calculateTotal(cart: Entities.Cart): number;
    calculateItemTotal(item: Entities.CartItem): number;
  }
}
