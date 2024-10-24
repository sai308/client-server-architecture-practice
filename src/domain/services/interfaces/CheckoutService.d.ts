declare namespace Services {
  export class CheckoutService {
    constructor(dependencies: {
      cartRepository: Repositories.CartRepository;
      receiptRepository: Repositories.ReceiptRepository;
      userRepository: Repositories.UserRepository;
      pricingService: PricingService;
    });

    checkout(userId: string): Promise<Entities.Receipt>;
  }
}
