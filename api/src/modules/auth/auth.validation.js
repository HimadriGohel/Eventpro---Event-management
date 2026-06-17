import Joi from 'joi';

const password = Joi.string().min(8).max(128).required();
const email = Joi.string().email().lowercase().trim().required();

export const authSchemas = {
  signup: {
    body: Joi.object({
      name: Joi.string().trim().min(2).max(120).required(),
      email,
      password,
      phone: Joi.string().trim().min(7).max(20).optional().allow('', null),
      role: Joi.string().valid('attendee', 'creator').default('attendee'),
    }),
  },
  login: {
    body: Joi.object({
      email,
      password: Joi.string().required(),
    }),
  },
  forgotPassword: {
    body: Joi.object({ email }),
  },
  resetPassword: {
    body: Joi.object({
      token: Joi.string().required(),
      password,
    }),
  },
  verifyEmail: {
    body: Joi.object({
      email,
      code: Joi.string().length(6).pattern(/^\d+$/).required(),
    }),
  },
  resendVerification: {
    body: Joi.object({ email }),
  },
};
