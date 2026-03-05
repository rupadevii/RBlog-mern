import { Router } from "express";
import { getUserInfo, updateProfile, getUserInfoById, followUser, unFollowUser, suggestedFollows } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router()

router.get("/profile", authMiddleware, getUserInfo)
router.post("/profile", authMiddleware, upload.single("profile-pic"), updateProfile)
router.get("/user-profile/:id", getUserInfoById)
router.post("/follow/:id", authMiddleware, followUser)
router.post("/unfollow/:id", authMiddleware, unFollowUser)
router.get("/suggested", authMiddleware, suggestedFollows)

export default router;