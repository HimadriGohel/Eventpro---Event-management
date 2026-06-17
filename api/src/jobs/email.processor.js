import { logger } from '../utils/logger.js';

const RENDERERS = {
  verifyEmail: ({ to, name, code, ttlMinutes }) => ({
    subject: `Your EventPro verification code: ${code}`,
    body: [
      `Hi ${name || 'there'},`,
      ``,
      `Your verification code is: ${code}`,
      `It expires in ${ttlMinutes} minutes.`,
      ``,
      `— EventPro`,
    ].join('\n'),
    to,
  }),

  resetPassword: ({ to, name, token, ttlMinutes }) => ({
    subject: 'Reset your EventPro password',
    body: [
      `Hi ${name || 'there'},`,
      ``,
      `Use this token to reset your password: ${token}`,
      `It expires in ${ttlMinutes} minutes.`,
      ``,
      `— EventPro`,
    ].join('\n'),
    to,
  }),

  welcome: ({ to, name }) => ({
    subject: 'Welcome to EventPro',
    body: `Hi ${name || 'there'},\n\nWelcome aboard.\n\n— EventPro`,
    to,
  }),
};

/* Pure processor — wired into a BullMQ Worker by email.worker.js.
   Today: console-logs the rendered email. Tomorrow: swap for SES/SendGrid/etc. */
export const emailProcessor = async (job) => {
  const renderer = RENDERERS[job.name];
  if (!renderer) {
    logger.warn(`email.processor: unknown job "${job.name}"`);
    return { skipped: true };
  }
  const { subject, body, to } = renderer(job.data || {});
  logger.info('───── 📧 EMAIL (stub) ─────');
  logger.info(`To:      ${to}`);
  logger.info(`Subject: ${subject}`);
  logger.info(body);
  logger.info('───────────────────────────');
  return { sent: true, to, subject };
};
