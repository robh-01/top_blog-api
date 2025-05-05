import { createPost } from "../db/postQueries.js";

export async function createPostHandler(req, res, next) {
  // Temporary middleware before routes
    req.user = { id: 1}; // mock userId

  const { title, content } = req.body;
  const userId = req.user.id;
  const post = { title, content, userId };
  try {
    await createPost(post);
    res.status(200).json({ message: "post creation successful" });
  } catch (err) {
    res.status(403).json({
      error: err.message,
      message: "post creation unsuccessful",
    });
  }
}
