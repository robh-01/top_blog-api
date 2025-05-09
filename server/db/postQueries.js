import prisma from "./prismaClient.js";

async function createPost(post) {
  const createdPost = await prisma.post.create({
    data: {
      ...post,
    },
  });
  return createdPost;
}

//return all posts
async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export { createPost, getPosts };
