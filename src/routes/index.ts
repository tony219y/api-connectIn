import { Router } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import jobRoutes from './job.routes';


const router = Router();

router.use('/auth', authRoutes );

router.use('/posts', postRoutes );

router.use('/job', jobRoutes)


export default router;