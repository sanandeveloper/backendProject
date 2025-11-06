import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./db/db.js";

import app from "./app.js";

connectDB()
  .then(() => {
   
    console.log("first");
  })
  .catch((err) => {
    console.log("error account while database connect to express", err);
  });
