import { Router } from "express";

const postRouter = Router();

import * as postController from "../controllers/postController.js";

import {
  authenticateJWT,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

postRouter.post(
  "",
  authenticateJWT,
  authorizeAdmin,
  postController.createPostHandler
);
postRouter.get("", postController.getPostsHandler);
postRouter.get("/:postId", postController.getPostByIdHandler);
postRouter.put("/:postId", postController.editPostHandler);
postRouter.patch("/:postId/publish", postController.togglePublishedHandler);
postRouter.delete("/:postId", postController.deletePostHandler);

export { postRouter };
