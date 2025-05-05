import prisma from "./prismaClient.js";

async function createPost(post) {
  const createdPost = await prisma.post.create({
    data: {
      ...post,
    },
  });
  return createdPost;
}

export { createPost };
