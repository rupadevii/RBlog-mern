import { Router } from "express";
import { getUserInfo, updateProfile } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router()

router.get("/profile", getUserInfo)
router.post("/profile", upload.single("profile-pic"), updateProfile)

export default router;