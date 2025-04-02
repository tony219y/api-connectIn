import { Router } from 'express';
import { registerController } from '../controllers/auth.controllers';
// import authRoutes from './auth.routes';
// import userRoutes from './user.routes';

const router = Router();

router.post('/auth/register', registerController );
// router.use('/users', userRoutes);

export default router;