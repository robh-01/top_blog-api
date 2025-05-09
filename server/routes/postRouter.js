import { Router } from "express";

const postRouter = Router();

import * as postController from "../controllers/postController.js";

postRouter.post("", postController.createPostHandler);
postRouter.get("", postController.getPostsHandler);

export {postRouter}
