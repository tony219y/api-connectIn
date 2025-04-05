import express  from "express";
import { authMiddleware } from '../middlewares/auth.jwt';
import { createNewPost, getAllPosts } from "../controllers/post.controllers";



const router = express.Router();

router.post('/create', authMiddleware, createNewPost);
router.get('/get-all-post', authMiddleware, getAllPosts)

export default router;