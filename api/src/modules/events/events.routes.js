import express from 'express';
import * as eventController from './events.controller.js';
import {
  createEvent,
  getAllEvents,
  getAllTickets,
} from './events.controller.js';

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/trending', eventController.getTrendingEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.get(
  '/tickets',
  getAllTickets
);

router.get('/venues', eventController.getAllVenues);

export default router;