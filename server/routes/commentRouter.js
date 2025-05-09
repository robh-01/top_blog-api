import { Router } from "express";
const commentRouter = Router();

import * as commentController from "../controllers/commentController.js";

commentRouter.post("/:postId", commentController.addCommentHandler);
commentRouter.get("/:commentId", commentController.getCommentByIdHandler);
commentRouter.put("/:commentId", commentController.editCommentHandler);
commentRouter.delete("/:commentId", commentController.deleteCommentHandler);

export { commentRouter };