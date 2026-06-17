import Ticket from '../../models/Ticket.js';

export const getAllTickets = async () => {
  return Ticket.find().sort({
    createdAt: -1,
  });
};

export const createTicket = async (
  data
) => {
  return Ticket.create(data);
};

export const getTicketById = async (
  id
) => {
  return Ticket.findById(id);
};