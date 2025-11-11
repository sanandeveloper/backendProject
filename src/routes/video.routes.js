import express, { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteLike,
  getAllvideo,
  getsingleVideo,
  getUserVideoCount,
  getVideoComments,
  likeVideo,
  publishVideo,
} from "../contollers/video.controller.js";

const videoRouter = Router();

// Routes
videoRouter.route("/upload-video").post(
  verifyJwt,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishVideo,
);

videoRouter.route("/:id/comments").post(verifyJwt, addComment);
videoRouter.route("/:id/getcomments").get(verifyJwt,getVideoComments );
videoRouter.route("/get-video").get(getAllvideo);
videoRouter.route("/:id").get(verifyJwt, getsingleVideo);
videoRouter.route("/like/:id").get(verifyJwt, likeVideo);
videoRouter.route("/deletelike/:id").delete(verifyJwt, deleteLike);
videoRouter.route("/countVideo/:id").get(verifyJwt, getUserVideoCount);

export default videoRouter;
