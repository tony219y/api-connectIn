import express  from "express";
import { registerController, loginController, meController } from '../controllers/auth.controllers';
import { authMiddleware } from '../middlewares/auth.jwt';



const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);

router.get('/me', authMiddleware,meController);



export default router;