import * as eventRepository from './events.repository.js';
import { ApiError } from '../../utils/ApiError.js';
   
export const createEvent = async (payload) => {
  return await eventRepository.createEvent(payload);
};

export const getAllEvents = async (filters) => {
  return await eventRepository.getAllEvents(filters);
};

export const getTrendingEvents = async () => {
  return await eventRepository.getTrendingEvents();
};

export const getEventById = async (id) => {
  const event = await eventRepository.getEventById(id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  return event;
}; 