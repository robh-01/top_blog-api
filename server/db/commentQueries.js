import prisma from "./prismaClient.js";

//takes id of a post to add a comment on and comment object with the data of the comment
async function addComment(postId, comment) {
  const addedComment = await prisma.comment.create({
    data: {
      ...comment,
      postId,
    },
  });

  return addedComment;
}

async function getCommentById(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  return comment;
}

// takes id of the post to edit(commentId) with the contents to update(in comment object)
// and updates the comment
async function editComment(commentId, comment) {
  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      ...comment,
    },
  });
  return updatedComment;
}

async function deleteComment(commentId) {
  const deletedComment = prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return deletedComment;
}

export {
  addComment,
  getCommentById,
  editComment,
  deleteComment,
};
