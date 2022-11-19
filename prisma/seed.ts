import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const dummyUser = {
  email: "test@email.com",
  password: "secret-password",
};

async function seed() {
  const email = dummyUser.email;

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash(dummyUser.password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.project.create({
    data: {
      title: "My first project",
      description: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.project.create({
    data: {
      title: "My second project",
      description: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
