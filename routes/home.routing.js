import { Router } from 'express';
import { home } from '../controllers/home.controller.js';
import { validate_token } from '../utils/middlewares/auth.js';

const router = Router();

router.get('/', [ validate_token ], home);

export default router;