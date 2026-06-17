import { Router } from 'express';

import { authRouter } from '../modules/auth/auth.routes.js';
import eventRoutes from '../modules/events/events.routes.js';
import ticketRoutes from '../modules/tickets/tickets.routes.js';
import venueRoutes from '../modules/venues/venues.routes.js';

const v1 = Router();

v1.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'ok',
    uptime: process.uptime(),
  });
});


v1.use('/auth', authRouter);

v1.use('/events', eventRoutes);

v1.use('/tickets', ticketRoutes);

v1.use('/venues', venueRoutes);

export const v1Router = v1;