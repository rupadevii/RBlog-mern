import { Router } from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router()

router.get("/:postId", getComments);
router.post("/", authMiddleware, addComment);
router.delete("/:commentId",authMiddleware, deleteComment)

export default router