import { Router } from 'express';
import { check_token } from '../utils/middlewares/auth.js';
import { signin, signup, logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', [check_token], signin);
router.post('/register', [check_token], signup);
router.get('/logout', logout);


export default router;