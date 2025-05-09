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

async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: true,
    },
  });

  return post;
}

// takes id of the post to update(postId) with the contents to update(in post object)
// and updates the post
async function editPost(postId, post) {
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      ...post,
    },
  });
  return updatedPost;
}

export { createPost, getPosts, getPostById, editPost };
