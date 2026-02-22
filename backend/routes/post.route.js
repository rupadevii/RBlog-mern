import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createPost, getPostById, getPosts, editPost, deletePost, likePost, getPostsByUserId } from "../controllers/post.controller.js";
import {postUpload} from "../middleware/multer.middleware.js";

const router = Router()

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/user/:userId", getPostsByUserId);
router.post("/", authMiddleware, postUpload.single("post-pic"), createPost);
router.put("/:id", authMiddleware, postUpload.single("post-pic"), editPost);
router.delete("/:id", authMiddleware, deletePost)
router.post("/like/:postId", authMiddleware, likePost)

export default router;