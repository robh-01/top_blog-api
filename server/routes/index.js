import { Router } from "express";
const indexRouter = Router();

import { userRouter } from "./userRouter.js";
import { postRouter } from "./postRouter.js";
import { commentRouter } from "./commentRouter.js";

indexRouter.use("/user", userRouter);
indexRouter.use("/post", postRouter);
indexRouter.use("/comment", commentRouter);

export { indexRouter };
