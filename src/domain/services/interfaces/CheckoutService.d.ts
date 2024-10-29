declare namespace Services {
  export class ICheckoutService {
    constructor(dependencies: {
      cartRepository: Repositories.ICartRepository;
      receiptRepository: Repositories.IReceiptRepository;
      userRepository: Repositories.IUserRepository;
      pricingService: PricingService;
    });

    checkout(userId: string): Promise<Entities.Receipt>;
  }
}
