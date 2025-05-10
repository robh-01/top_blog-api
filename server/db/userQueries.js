import prisma from "./prismaClient.js";

async function createUser(user) {
  const createdUser = await prisma.user.create({
    data: {
      ...user,
    },
  });
  return createdUser;
}

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
  return user;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function getUserByCommentId(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  return comment.user;
}

async function getAuthor() {
  const authors = await prisma.user.findMany({
    where: {
      isAuthor: true,
    },
    select: {
      id: true,
    },
  });

  return authors[0];
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByCommentId,
  getAuthor,
};
