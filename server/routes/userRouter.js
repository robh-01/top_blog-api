import { Router } from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

// jwt authentication middleware
import { authenticateJWT } from "../middleware/authMiddleware.js";

// userRouter.get("", userController.getAllUsersHandler);
userRouter.post("/signup", userController.createUserHandler);
userRouter.post("/login", userController.loginUserHandler);

userRouter.get(
  "/:userId",
  authenticateJWT,
  userController.getUserFromIdHandler
);

export { userRouter };
