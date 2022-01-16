import { Router } from 'express';
import { home } from '../controllers/home.controller.js';
import { validate_token } from '../utils/middlewares/auth.js';

const router = Router();

router.get('/', [ validate_token ], home);
// router.get('/about', about);

// Handle 404
// router.get('*', (req, res) => {
//   res.render('pages/404');
// });

export default router;