import * as venueRepository from './venues.repository.js';

export const getAllVenues = async () => {
  return venueRepository.findAllVenues();
};