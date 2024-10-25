declare namespace Services {
  export class CheckoutService {
    constructor(dependencies: {
      cartRepository: Repositories.ICartRepository;
      receiptRepository: Repositories.IReceiptRepository;
      userRepository: Repositories.IUserRepository;
      pricingService: PricingService;
    });

    checkout(userId: string): Promise<Entities.Receipt>;
  }
}
