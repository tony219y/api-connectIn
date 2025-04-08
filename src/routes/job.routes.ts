import express  from "express";
import { authMiddleware } from '../middlewares/auth.jwt';
import { createNewOfferApply, seekerOffer, seekerPending } from "../controllers/job.controllers";




const router = express.Router();

router.post('/offerapply', authMiddleware, createNewOfferApply);

router.get('/seeker-offer/:username', authMiddleware, seekerOffer)
router.get('/seeker-pending/:username', authMiddleware, seekerPending)

export default router;