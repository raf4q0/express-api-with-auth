import { Router } from 'express'
import { login, logout } from '../controllers/sessionsController'

const router = Router();

router.post('/sessions/login', login)
router.post('/sessions/logout', logout)

export default router;
