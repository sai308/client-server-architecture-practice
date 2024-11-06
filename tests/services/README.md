# Tests for `services`

This folder contains unit tests for the service layer of the application, specifically targeting the core functionalities of the `AuthService`, `CheckoutService`, `JwtService`, and `PricingService`. Each service has its own dedicated test file with modular, isolated test cases to ensure high accuracy and maintainability.

---

## Table of Contents

1. [Introduction to Unit Testing](#introduction-to-unit-testing)
2. [Principles of Unit Testing](#principles-of-unit-testing)
3. [Service Test Structure](#service-test-structure)
4. [Running the Tests](#running-the-tests)
5. [Detailed Test Explanation](#detailed-test-explanation)

---

## Introduction to Unit Testing

Unit testing is a fundamental practice in software development that focuses on verifying the smallest parts of an application, typically individual functions or methods, in isolation from the rest of the system. By creating tests at this granular level, we can confidently ensure that each component behaves as expected under various conditions.

The **services** in this project's architecture contain the core business logic, making them critical candidates for unit testing. Testing these services helps validate that the logic performs correctly, handles errors, and interacts with dependencies as expected.

---

## Principles of Unit Testing

Before diving into the implementation, let's outline a few core principles of unit testing:

1. **Isolation**: Each unit test should test a single function or method in isolation, without dependencies on other parts of the application. Mocks or stubs are often used to simulate the behavior of external components or services.

2. **Repeatability**: Tests should produce the same result each time they run. They should not depend on any external state or data that could change between test runs.

3. **Simplicity**: Unit tests should be straightforward and focus on testing a single behavior. Complex tests that test multiple behaviors can become difficult to maintain and debug.

4. **Fast Execution**: Since unit tests only test small parts of the application, they should execute quickly. This makes them suitable for running frequently during development to catch issues early.

5. **Clear Naming and Structure**: Each test should have a descriptive name that clearly states what is being tested and the expected outcome. This helps in understanding and maintaining the test suite.

---

## Service Test Structure

Each service is tested independently to verify its primary functionality. Here's an overview of the structure used in each test file:

### 1. **AuthService Tests**

- Tests are structured in `authService.test.js`.
- **Purpose**: Validates core authentication features, such as password hashing, user verification, and token generation.
- **Key Test Cases**:
  - Password hashing to ensure generated hashes do not match the original password.
  - Authentication to confirm that users with valid credentials are correctly identified.
  - Token generation to ensure that access and refresh tokens are provided on successful login.

### 2. **CheckoutService Tests**

- Tests are structured in `checkoutService.test.js`.
- **Purpose**: Ensures the checkout process works as expected, from calculating totals to generating receipts.
- **Key Test Cases**:
  - Verifying that a receipt is generated with the correct user ID, total amount, and item list.
  - Checking that the cart is cleared after a successful checkout.

### 3. **JwtService Tests**

- Tests are structured in `jwtService.test.js`.
- **Purpose**: Validates token generation and verification for access and refresh tokens.
- **Key Test Cases**:
  - Ensuring valid access and refresh tokens are generated and can be verified.
  - Checking that invalid tokens return `null` to avoid unauthorized access.

### 4. **PricingService Tests**

- Tests are structured in `pricingService.test.js`.
- **Purpose**: Confirms accurate calculations for item totals and cart totals.
- **Key Test Cases**:
  - Calculating cart total with discounts and tax to ensure final amounts are accurate.
  - Calculating individual item totals based on price and quantity.

---

## Running the Tests

To run all tests in the `tests/services` folder, use the following command:

```bash
node --test ./tests/services/**/*.test.js
```

Alternatively, if using a test script in `package.json`, you could run:

```bash
pnpm test
```

This will execute each test file, providing output on the results of each unit test.

---

## Detailed Test Explanation

Each test is designed to adhere to the principles of unit testing. Let's look at how we apply these principles in practice:

### Isolation with Mocking

For dependencies that a service relies on (e.g., `UserRepository`, `CartRepository`), we use **mock objects**. Mocking allows us to simulate how dependencies should behave without requiring access to real instances, which could introduce side effects or fail due to external conditions.

Example:

```javascript
const mockUserRepository = {
  getByUsername: async (username) => {
    if (username === 'testuser') {
      return {
        id: '1',
        username,
        passwordHash: await bcrypt.hash('password', 10),
      };
    }
    return null;
  },
};
```

This mock `getByUsername` function returns a simulated user object for a specific username, enabling us to test the `AuthService` functionality without needing access to an actual database.

### Clear Naming and Structure

Each test function follows a naming convention that clearly states the feature being tested and the expected outcome. For example:

```javascript
it('🔒 should generate a hashed password that does not match the original', async () => {
  // Test logic here
});
```

This name explains that we are verifying the hashing function in `AuthService` and that the resulting hash should not equal the original password.

### Simplicity and Repeatability

Each test is designed to be simple, focusing on one assertion at a time. This makes it easier to pinpoint which part of the functionality is failing if a test does not pass.

Example:

```javascript
it('🛒 should generate a receipt and clear the cart upon checkout', async () => {
  const userId = '1';
  const receipt = await checkoutService.checkout(userId);
  assert.strictEqual(
    receipt.userId,
    userId,
    'Receipt userId should match provided userId'
  );
  assert.ok(receipt.totalAmount, 'Receipt should have a total amount');
  assert.ok(receipt.items.length > 0, 'Receipt should have items');
});
```

In this example:

- We only check the receipt generation and cart clearing for the checkout function.
- Each assertion has a specific focus, allowing us to verify that each element (e.g., `userId`, `totalAmount`) behaves as expected.

### Fast Execution

Because each test case is isolated and only tests the behavior of small functions or methods, they execute quickly. This makes the suite suitable for frequent test runs during development, providing early feedback on potential issues.

### Using the `describe` and `it` Syntax

The `describe` and `it` structure groups related tests, making it easier to understand the scope and purpose of each test group.

Example:

```javascript
describe('AuthService', () => {
  it('🔒 should generate a hashed password that does not match the original', async () => {
    // Test logic here
  });

  it('✅ should return user if credentials are correct', async () => {
    // Test logic here
  });
});
```

This layout shows that each `it` block is a single unit test under the `AuthService` test suite, improving readability and organization.

---

## Summary

The `tests/services` folder contains well-organized unit tests for each service in the application. By adhering to core unit testing principles, these tests:

- Isolate functionalities using mocks and simulate dependencies.
- Verify individual behaviors without relying on external systems.
- Provide clear, concise feedback on each tested function.

These unit tests serve as a foundational tool for ensuring that the core business logic in the services functions as expected, ultimately helping maintain the integrity of the application as it evolves.
