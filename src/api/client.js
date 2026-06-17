import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
const BASE_URL = '/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send refresh-token cookie
  timeout: 15000,
});

/* Attach the in-memory access token to every request. */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 
/* Single-flight refresh: queue concurrent 401s behind one /auth/refresh call. */
let refreshPromise = null;
const ENDPOINTS_THAT_SHOULD_NOT_REFRESH = ['/auth/login', '/auth/signup', '/auth/refresh', '/auth/logout'];

const callRefresh = async () => {
  const { data } = await axios.post(`${BASE_URL}/auth/refresh`, null, { withCredentials: true });
  return data?.data; // { user, accessToken, expiresIn }
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error;
    if (!response || response.status !== 401 || config?._retried) throw error;
    if (ENDPOINTS_THAT_SHOULD_NOT_REFRESH.some((p) => (config.url || '').includes(p))) throw error;

    try {
      refreshPromise = refreshPromise || callRefresh();
      const fresh = await refreshPromise;
      refreshPromise = null;
      useAuthStore.getState().setSession(fresh.user, fresh.accessToken);
      config._retried = true;
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${fresh.accessToken}`;
      return api.request(config);
    } catch (refreshErr) {
      refreshPromise = null;
      useAuthStore.getState().clearSession();
      throw error;
    }
  },
);

/* Normalize axios errors into something the UI can render. */
export const unwrapError = (err) => {
  const msg = err?.response?.data?.message || err?.message || 'Something went wrong';
  const code = err?.response?.data?.code;
  const details = err?.response?.data?.details;
  return { message: msg, code, details, status: err?.response?.status };
};
