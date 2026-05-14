import { Router } from 'express';
import { register, login, getMe, logout } from './auth.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { requireAuth } from '../../middlewares/auth.middleware';
import { loginSchema, registerSchema } from '@hospeon/shared';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);

export default router;
