import Ticket from '../../models/Ticket.js';

export const createTicket = (payload) => {
  return Ticket.create(payload);
};

export const getAllTickets = () => {
  return Ticket.find().populate('eventId');
};

export const getTicketById = (id) => {
  return Ticket.findById(id);
};