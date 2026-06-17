import { Router } from 'express';
import { authController } from './auth.controller.js';
import { authSchemas } from './auth.validation.js';
import { validate } from '../../middleware/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { loginLimiter, signupLimiter, otpLimiter } from '../../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/signup',  signupLimiter, validate(authSchemas.signup), asyncHandler(authController.signup));
router.post('/login',   loginLimiter,  validate(authSchemas.login),  asyncHandler(authController.login));
router.post('/refresh', asyncHandler(authController.refresh));
router.post('/logout',  asyncHandler(authController.logout));
router.get('/me',       requireAuth,   asyncHandler(authController.me));

router.post('/verify-email',         otpLimiter, validate(authSchemas.verifyEmail),         asyncHandler(authController.verifyEmail));
router.post('/resend-verification',  otpLimiter, validate(authSchemas.resendVerification),  asyncHandler(authController.resendVerification));

router.post('/forgot-password', otpLimiter, validate(authSchemas.forgotPassword), asyncHandler(authController.forgotPassword));
router.post('/reset-password',  validate(authSchemas.resetPassword),               asyncHandler(authController.resetPassword));

export const authRouter = router;
