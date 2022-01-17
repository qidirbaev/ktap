import { Router } from 'express';
import { fast_search } from '../controllers/search.js';

const router = Router();

router.get('/:query', fast_search);

export default router;