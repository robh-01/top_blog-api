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

postRouter.get("", authenticateJWT, postController.getPostsHandler);
postRouter.get("/:postId", authenticateJWT, postController.getPostByIdHandler);

postRouter.put(
  "/:postId",
  authenticateJWT,
  authorizeAdmin,
  postController.editPostHandler
);

postRouter.patch(
  "/:postId/publish",
  authenticateJWT,
  authorizeAdmin,
  postController.togglePublishedHandler
);

postRouter.delete(
  "/:postId",
  authenticateJWT,
  authorizeAdmin,
  postController.deletePostHandler
);

export { postRouter };
