import { api } from './client';

export const getAllVenues = async () => {
  const response = await api.get(
    '/events/venues'
  );

  return response.data.data;
};