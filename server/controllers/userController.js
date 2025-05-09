import { createUser, getUserFromId } from "../db/userQueries.js";

export async function createUserHandler(req, res, next) {
  const { username, email, password } = req.body;
  const user = { username, email, password };
  try {
    await createUser(user);
    res.status(201).json({
      status: "success",
      message: `User ${username} created successfully.`,
    });
  } catch (err) {
    console.log("Error creating user: ", err.message);

    res.status(500).json({
      status: "error",
      message: "Failed to create user. Please try again later.",
    });
  }
}

export async function getUserFromIdHandler(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await getUserFromId(parseInt(userId));
    if(!user) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${userId} not found.`,
      });
    }
    res.status(200).json({ 
      status: "success",
      message: `User with ID ${userId} retrieved successfully`,
      data: user });
  } catch (err) {
    console.log("Error retrieving user: ", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve user. Please try again later.",
    });
  }
}
