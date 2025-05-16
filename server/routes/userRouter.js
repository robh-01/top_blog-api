import { Router } from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

// jwt authentication middleware
import { authenticateJWT, authorizeAdmin } from "../middleware/authMiddleware.js";

// userRouter.get("", userController.getAllUsersHandler);
userRouter.post("/signup", userController.createUserHandler);
userRouter.post("/login", userController.loginUserHandler);

userRouter.get("/validate/token", authenticateJWT, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Token is valid.",
  });
});

userRouter.get("/validate/author", authenticateJWT, authorizeAdmin, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Token is valid and is of author.",
  });
});

userRouter.get(
  "/:userId",
  authenticateJWT,
  userController.getUserFromIdHandler
);

export { userRouter };
