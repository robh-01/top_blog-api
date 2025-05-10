import passport from "passport";
import { getUserByCommentId, getAuthor } from "../db/userQueries.js";

// check if valid user is logged in
export const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message:
          "An error occurred during authentication. Please try again later.",
      });
    }
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid or expired token.",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

//check if the logged in user is an admin
export const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAuthor) {
    return res.status(403).json({
      status: "failure",
      message: "You are not authorized to perform this action.",
    });
  }
  next();
};

// check if the logged in user is the owner of the comment
export const authorizeCommentOwner = async (req, res, next) => {
  try {
    const commentOwner = await getUserByCommentId(
      parseInt(req.params.commentId)
    );
    if (!req.user || req.user.id !== commentOwner.id) {
      return res.status(403).json({
        status: "failure",
        message: "You are not authorized to perform this action.",
      });
    }
    next();
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(500).json({
      status: "error",
      message:
        "An error occurred during authorization. Please try again later.",
    });
  }
};

// check if the logged in user is the owner of the comment or the author of the blog
export const authorizeCommentOwnerOrAuthor = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);

    const [commentOwner, author] = await Promise.all([
      getUserByCommentId(commentId),
      getAuthor(),
    ]);

    // Check if the logged-in user is either the comment owner or the blog author
    if (
      !req.user ||
      (req.user.id !== commentOwner.id && req.user.id !== author.id)
    ) {
      return res.status(403).json({
        status: "failure",
        message: "You are not authorized to perform this action.",
      });
    }
    next();
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(500).json({
      status: "error",
      message:
        "An error occurred during authorization. Please try again later.",
    });
  }
};
