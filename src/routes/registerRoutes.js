import { Router } from 'express'
import { register } from '../controllers/registerController'

const router = Router();

router.post('/register/signup', register)

export default router;
