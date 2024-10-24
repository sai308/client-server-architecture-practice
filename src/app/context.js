const { CheckoutService } = require('./../domain/services/checkout.service');
const { pricingService } = require('./../domain/services/pricing.service');

const repositories = {
  ...require('./../infra/repositories/user.repo'),
  ...require('./../infra/repositories/cart.repo'),
  ...require('./../infra/repositories/product.repo'),
  ...require('./../infra/repositories/receipt.repo'),
};

const services = {
  pricingService,
  checkoutService: new CheckoutService({
    pricingService,
    ...repositories,
  }),
};

const domainContext = /** @const */ {
  ...repositories,
  ...services,
};

module.exports.domainContext = Object.freeze(
  Object.assign(Object.create(null), domainContext)
);

// ---------------------------------------------------
// Typedefs
// ---------------------------------------------------
/**
 * @typedef {Readonly<domainContext>} DomainContext
 */
