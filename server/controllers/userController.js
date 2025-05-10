import { createUser, getUserById } from "../db/userQueries.js";
import { Prisma } from "../generated/prisma/client.js";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../db/userQueries.js";
import jwt from "jsonwebtoken";

export async function createUserHandler(req, res, next) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, email, password: hashedPassword };
  try {
    await createUser(user);
    res.status(201).json({
      status: "success",
      message: `User ${username} created successfully.`,
    });
  } catch (err) {
    console.log("Error creating user: ", err.message);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      res.status(500).json({
        status: "error",
        message:
          "Failed to create user. There is a unique constraint violation",
        violatedField: err.meta.target,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to create user. Please try again later.",
      });
    }
  }
}

export async function loginUserHandler(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid credentials.",
      });
    }

    const payload = {
      sub: user.id,
    };
    const opts = {
      expiresIn: "1h",
      algorithm: "HS256",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, opts);
    res.status(200).json({
      status: "success",
      message: `User ${user.username} logged in successfully`,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "failure",
      message: "Unable to login at the moment. Please try again later",
    });
  }
}

export async function getUserFromIdHandler(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await getUserById(parseInt(userId));
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${userId} not found.`,
      });
    }
    res.status(200).json({
      status: "success",
      message: `User with ID ${userId} retrieved successfully`,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log("Error retrieving user: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve user. Please try again later.",
    });
  }
}
