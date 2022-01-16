import { Router } from 'express';
import search from '../controllers/search.js';

const router = Router();

router.get('/search/:query', search);

export default router;