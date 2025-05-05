import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

app.get("", (req, res) => {
  res.json({ message: "It's working" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
