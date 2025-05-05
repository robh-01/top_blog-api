import { createUser } from "../db/userQueries.js";

export async function createUserHandler(req, res, next) {
  const { username, email, password } = req.body;
  const user = { username, email, password };
  try {
    await createUser(user);
    res.status(200).json({ message: "user creation successful" });
  } catch (err) {
    res.status(403).json({
      err: err.message,
      message: "user creation unsuccessful",
    });
  }
}
