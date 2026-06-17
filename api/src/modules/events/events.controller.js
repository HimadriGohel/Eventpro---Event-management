import * as eventService from './events.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import Event from '../../models/Event.js';

export const createEvent = asyncHandler(async (req, res) => {
  console.log("CREATE EVENT HIT");
  
  const event = await eventService.createEvent(req.body);
  
  return res
    .status(201)
    .json(new ApiResponse(201, event, 'Event created successfully'));
});

export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await eventService.getAllEvents(req.query);
  
  return res
    .status(200)
    .json(new ApiResponse(200, events, 'Events fetched successfully'));
});

export const getTrendingEvents = asyncHandler(async (req, res) => {
  const events = await eventService.getTrendingEvents();
  
  return res
    .status(200)
    .json(new ApiResponse(200, events, 'Trending events fetched'));
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await eventService.getEventById(req.params.id);
  
  return res
    .status(200)
    .json(new ApiResponse(200, event, 'Event fetched successfully'));
});

export const getAllTickets =
  asyncHandler(async (req, res) => {
  
    const events =
      await Event.find();

    const tickets = [];

    events.forEach((event) => {

      event.tickets.forEach((ticket) => {
      
        tickets.push({
          eventId: event._id,

          eventName: event.title,

          startDate:
            event.startDate,

          ...ticket,
        });
      });
    });

    res.status(200).json({
      success: true,
      data: tickets,
    });
  });

export const getAllVenues = asyncHandler(
  async (req, res) => {
    const events = await Event.find();

    const venues = [];

    events.forEach((event) => {
      if (event.venue?.name) {
        venues.push({
          eventId: event._id,
          eventName: event.title,

          name: event.venue.name,
          address: event.venue.address,
          capacity: event.venue.capacity || 0,
          layout: event.venue.layout || '',

          image:
            event.venue.images?.[0] || '',

          upcomingEvents: 1,
          pastEvents: 0,
        });
      }
    });

    res.status(200).json({
      success: true,
      data: venues,
    });
  }
);