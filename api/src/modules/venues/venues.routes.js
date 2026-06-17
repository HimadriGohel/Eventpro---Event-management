import express from 'express';
import { getAllVenues } from './venues.controller.js';

const router = express.Router();

router.get('/', getAllVenues);

export default router;