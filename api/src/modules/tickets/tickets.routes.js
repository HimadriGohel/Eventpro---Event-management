import { Router } from 'express';

import {
  getTickets,
  createTicket,
  getTicket,
} from './tickets.controller.js';

const router = Router();

router.get('/', getTickets);

router.post('/', createTicket);

router.get('/:id', getTicket);

export default router;