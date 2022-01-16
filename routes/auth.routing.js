import { Router } from 'express';
import { check_token } from '../utils/middlewares/auth.js';
import { signin, signup } from '../controllers/auth.controller.js';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/Auth.js';
// import { private } from '../middlewares/private.js';

const router = Router();

// router.get('/', [ check_token ], home);
// router.get('/restricted', [ restrict ], restricted);
// router.get('/logout', logout);
// router.get('/register', register);
// router.get('/signup', signup_get);
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
// router.get('/homer', homer);
// router.get('/social', social);
// router.get('/private', private, (req, res) => {
//     res.send('Wahoo! restricted area, click to <a href="/auth/logout">logout</a>');
// });
// router.get('/login', login);

export default router;