import { Router } from 'express'
import { register } from '../controllers/registerController'

const router = Router();

router.post('/signup', register)

export default router;
