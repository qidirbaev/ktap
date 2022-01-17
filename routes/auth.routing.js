import { Router } from 'express';
import { check_token } from '../utils/middlewares/auth.js';
import { signin, signup, reset } from '../controllers/auth.controller.js';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/Auth.js';
// import { private } from '../middlewares/private.js';

const router = Router();

router.post('/login', [check_token], signin);
router.post('/register', [check_token], signup);
router.get('/destroy', (req, res) => {
  console.log('[destroy] req.session', req.session);
  const token = req.session?.token;

  if (token) {
    try {
      jwt.verify(token, JWT_PRIVATE_KEY);
    } catch (ex) {
      console.log('Token expired or not valid');
      req.session.destroy();
    }
  }

  console.log('[destroy] req.session', req.session);

  res.send('Cleared');
});


export default router;