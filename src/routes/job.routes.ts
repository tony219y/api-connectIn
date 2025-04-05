import express  from "express";
import { authMiddleware } from '../middlewares/auth.jwt';
import { createNewOfferApply } from "../controllers/job.controllers";




const router = express.Router();

router.post('/offerapply', authMiddleware, createNewOfferApply);

export default router;