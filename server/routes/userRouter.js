import { Router } from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

// userRouter.get("", userController.getAllUsersHandler);
userRouter.post("", userController.createUserHandler);
userRouter.get("/:userId", userController.getUserFromIdHandler);

export { userRouter };
