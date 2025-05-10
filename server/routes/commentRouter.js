import { Router } from "express";
const commentRouter = Router();

import * as commentController from "../controllers/commentController.js";

import {
  authenticateJWT,
  authorizeCommentOwner,
  authorizeCommentOwnerOrAuthor,
} from "../middleware/authMiddleware.js";

commentRouter.post(
  "/:postId",
  authenticateJWT,
  commentController.addCommentHandler
);
commentRouter.get(
  "/:commentId",
  authenticateJWT,
  commentController.getCommentByIdHandler
);
commentRouter.put(
  "/:commentId",
  authenticateJWT,
  authorizeCommentOwner,
  commentController.editCommentHandler
);
commentRouter.delete(
  "/:commentId",
  authenticateJWT,
  authorizeCommentOwnerOrAuthor,
  commentController.deleteCommentHandler
);

export { commentRouter };
