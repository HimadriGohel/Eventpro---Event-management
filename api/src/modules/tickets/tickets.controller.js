import * as ticketService from './tickets.service.js';

export const getTickets =
  async (req, res) => {
    const tickets =
      await ticketService.getAllTickets();

    res.json(tickets);
  };

export const createTicket =
  async (req, res) => {
    const ticket =
      await ticketService.createTicket(
        req.body
      );

    res.status(201).json(ticket);
  };

export const getTicket =
  async (req, res) => {
    const ticket =
      await ticketService.getTicketById(
        req.params.id
      );

    res.json(ticket);
  };