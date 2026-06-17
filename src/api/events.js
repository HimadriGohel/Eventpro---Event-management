import { api } from './client';

export const getAllEvents = async (
  params = {}
) => {
  const response = await api.get(
    '/events',
    {
      params,
    }
  );

  return response.data.data;
};

export const getTrendingEvents =
  async () => {
    const response = await api.get(
      '/events/trending'
    );

    return response.data.data;
  };

export const getEventById = async (
  id
) => {
  const response = await api.get(
    `/events/${id}`
  );

  return response.data.data;
};

export const createEvent = async (
  payload
) => {
  const response = await api.post(
    '/events',
    payload
  );

  return response.data.data;
};

// NEW — update existing event
export const updateEvent = async (
  id,
  payload
) => {
  const response = await api.put(
    `/events/${id}`,
    payload
  );

  return response.data.data;
};

// NEW — get draft event
export const getEventDraft =
  async (id) => {
    const response = await api.get(
      `/events/${id}`
    );

    return response.data.data;
  };