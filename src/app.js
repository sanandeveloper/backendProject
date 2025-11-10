import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import { subsRoute } from "./routes/subscriber.routes.js";

dotenv.config();

const app = express();


connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// ✅ API routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/subscriber", subsRoute);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully on Vercel!");
});

// ✅ Only listen locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 7000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running locally on port ${PORT}\n`);
  });
}

// ✅ Export for Vercel
export const handler = serverless(app);
export default app;
