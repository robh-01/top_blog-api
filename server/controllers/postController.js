import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  togglePublished,
  deletePostById,
} from "../db/postQueries.js";

export async function createPostHandler(req, res, next) {
  // Temporary middleware before routes
  req.user = { id: 1 }; // mock userId

  const { title, content } = req.body;
  const userId = req.user.id;
  const post = { title, content, userId };
  try {
    await createPost(post);
    res
      .status(200)
      .json({ status: "success", message: "Post created successfully" });
  } catch (err) {
    console.log("Error creating post: ", err.message);

    res.status(500).json({
      status: "error",
      message: "Failed to create post. Please try again later.",
    });
  }
}

export async function getPostsHandler(req, res, next) {
  try {
    const posts = await getPosts();
    res.status(200).json({
      status: "success",
      message: "All posts fetched successfully",
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log("Error fetching posts: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch all the posts of the author.",
    });
  }
}

export async function getPostByIdHandler(req, res, next) {
  const { postId } = req.params;
  try {
    const post = await getPostById(parseInt(postId));
    res.status(200).json({
      status: "success",
      message: `Post "${post.title}" fetched successfully.`,
      data: {
        post,
      },
    });
  } catch (err) {
    console.log("Error fetching posts: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch the post",
    });
  }
}

export async function editPostHandler(req, res, next) {
  const { postId } = req.params;
  const postUpdates = req.body;

  try {
    const updatedPost = await editPost(parseInt(postId), postUpdates);
    res.status(200).json({
      status: "success",
      message: `Post with ID ${postId} updated successfully.`,
      data: {
        updatedPost,
      },
    });
  } catch (err) {
    console.log("Error updating post: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to update the post. Please try again later.",
    });
  }
}
