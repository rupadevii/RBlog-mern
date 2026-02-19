import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createPost, getPostById, getPosts, editPost, deletePost, likePost } from "../controllers/post.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router()

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, upload.single("post-pic"), createPost);
router.put("/:id", authMiddleware, upload.single("post-pic"), editPost);
router.delete("/:id", authMiddleware, deletePost)
router.post("/like/:postId", authMiddleware, likePost)

export default router;