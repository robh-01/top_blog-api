import { Router } from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

// userRouter.get("", userController.getAllUsersHandler);
userRouter.post("", userController.createUserHandler);

export { userRouter };
