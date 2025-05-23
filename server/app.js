import express from "express";
const app = express();

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

//configs
import { configPassport } from "./configs/passport.config.js";

import { indexRouter } from "./routes/index.js";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configPassport();

// index router
app.use("", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
