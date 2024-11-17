const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const productCount = 100_000; // Number of products to generate
  const userCount = 1000; // Number of users to generate

  console.log('Seeding Products...');
  const productData = Array.from({ length: productCount }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
    releaseDate: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }),
  }));

  await prisma.product.createMany({
    data: productData,
  });
  console.log(`${productCount} Products seeded.`);

  console.log('Seeding Users...');
  const userData = await Promise.all(
    Array.from({ length: userCount }).map(async () => ({
      username: `${faker.internet.username()}-${faker.git.commitSha()}`,
      passwordHash: await bcrypt.hash(faker.internet.password(), 10), // Replace with a hashed password if needed
      isPrivileged: faker.datatype.boolean(),
      cartRef: null,
    }))
  );

  await prisma.user.createMany({
    data: userData,
  });

  console.log(`${userCount} Users seeded.`);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
