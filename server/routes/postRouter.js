import { Router } from "express";

const postRouter = Router();

import * as postController from "../controllers/postController.js";

postRouter.post("", postController.createPostHandler);

export {postRouter}
