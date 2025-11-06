import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import { subsRoute } from "./routes/subscriber.routes.js";
const PORT = process.env.PORT || 7000;

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
  }),
);
app.use(
  express.json({
    limit: "16kb",
  }),
);
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/subscriber", subsRoute);
app.get("/", (req, res) => {
  res.send("API is running....");
});

 app.listen(PORT, () => {
      console.log(`\n Server is running on PORT ${PORT} \n`);
    });



export default app;
