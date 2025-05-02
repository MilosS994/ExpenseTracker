import express from "express";
import { signin, signup, getUserInfo } from "../controllers/auth.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/user", authenticateUser, getUserInfo);

router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
