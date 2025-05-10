import {
  addComment,
  getCommentById,
  editComment,
  deleteComment,
} from "../db/commentQueries.js";

export async function addCommentHandler(req, res, next) {
  const { postId } = req.params;
  // get userId from the logged in user
  const userId = req.user.id;

  const { content } = req.body;

  try {
    const comment = await addComment(parseInt(postId), { content, userId });
    res.status(201).json({
      status: "success",
      message: "Comment added successfully.",
      data: {
        comment,
      },
    });
  } catch (err) {
    console.log("Error adding comment: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to add comment. Please try again later.",
    });
  }
}

export async function getCommentByIdHandler(req, res, next) {
  const { commentId } = req.params;

  try {
    const comment = await getCommentById(parseInt(commentId));
    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: `Comment with ID ${commentId} not found.`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Comment with ID ${commentId} retrieved successfully.`,
      data: {
        comment,
      },
    });
  } catch (err) {
    console.log("Error retrieving comment: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve comment. Please try again later.",
    });
  }
}

export async function editCommentHandler(req, res, next) {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await editComment(parseInt(commentId), { content });
    res.status(200).json({
      status: "success",
      message: `Comment with ID ${commentId} updated successfully.`,
      data: {
        updatedComment,
      },
    });
  } catch (err) {
    console.log("Error editing comment: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to edit comment. Please try again later.",
    });
  }
}

export async function deleteCommentHandler(req, res, next) {
  const { commentId } = req.params;

  try {
    await deleteComment(parseInt(commentId));
    res.status(200).json({
      status: "success",
      message: `Comment with ID ${commentId} deleted successfully.`,
    });
  } catch (err) {
    console.log("Error deleting comment: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to delete comment. Please try again later.",
    });
  }
}
