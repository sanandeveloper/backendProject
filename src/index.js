import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db/db.js";
import app from "./app.js";
import serverless from "serverless-http";

const handler = serverless(app);

export const config = {
  api: {
    bodyParser: false,
  },
};

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

export default handler;
