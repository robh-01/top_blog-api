import { Router } from "express";
const indexRouter = Router();

import { userRouter } from "./userRouter.js";
import { postRouter } from "./postRouter.js";

indexRouter.use("/user", userRouter);
indexRouter.use("/post", postRouter);

export { indexRouter };
