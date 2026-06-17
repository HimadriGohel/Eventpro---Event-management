import Venue from '../../models/Venue.js';

export const findAllVenues = async () => {
  return Venue.find().sort({
    createdAt: -1,
  });
};