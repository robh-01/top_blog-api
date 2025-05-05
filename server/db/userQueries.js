import prisma from "./prismaClient.js";

async function createUser(user) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return createdUser;
}

export { createUser };
