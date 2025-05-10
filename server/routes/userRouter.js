import { Router } from "express";
const userRouter = Router();

import * as userController from "../controllers/userController.js";

// jwt authentication middleware usage demo
// import { authenticateJWT } from "../middleware/authMiddleware.js";

// userRouter.get("", userController.getAllUsersHandler);
userRouter.post("/signup", userController.createUserHandler);
userRouter.post("/login", userController.loginUserHandler);

// jwt authentication middleware usage demo
// userRouter.get("/protected", authenticateJWT, (req, res, next) => {
//   res.status(400).json({
//     status: "success",
//     message: "You are in a protected route",
//   });
// });

userRouter.get("/:userId", userController.getUserFromIdHandler);

export { userRouter };
