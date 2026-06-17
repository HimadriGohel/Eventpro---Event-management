import Event from '../../models/Event.js';

export const createEvent = async (
  payload
) => {
  return await Event.create(
    payload
  );
};

export const getAllEvents =
  async () => {
    return await Event.find().sort({
      createdAt: -1,
    });
  };

export const getTrendingEvents =
  async () => {
    return await Event.find({
      isTrending: true,
    }).sort({
      createdAt: -1,
    });
  };

export const getEventById =
  async (id) => {
    return await Event.findById(
      id
    );
  };