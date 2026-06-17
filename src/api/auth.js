import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import { useAuthStore } from '../stores/authStore';

const authApi = {
  signup: (payload) => api.post('/auth/signup', payload).then((r) => r.data.data),
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data.data),
  logout: () => api.post('/auth/logout').then((r) => r.data.data),
  me: () => api.get('/auth/me').then((r) => r.data.data),
  refresh: () => api.post('/auth/refresh').then((r) => r.data.data),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload).then((r) => r.data.data),
  resetPassword: (payload) => api.post('/auth/reset-password', payload).then((r) => r.data.data),
  verifyEmail: (payload) => api.post('/auth/verify-email', payload).then((r) => r.data.data),
  resendVerification: (payload) => api.post('/auth/resend-verification', payload).then((r) => r.data.data),
};

export const authKeys = {
  me: ['auth', 'me'],
};

export const useSignup = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => setSession(data.user, data.accessToken),
  });
};

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => setSession(data.user, data.accessToken),
  });
};

export const useLogout = () => {
  const clearSession = useAuthStore((s) => s.clearSession);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearSession();
      qc.clear();
    },
  });
};

export const useMe = (opts = {}) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    enabled: !!accessToken,
    ...opts,
  });
};

export const useForgotPassword = () => useMutation({ mutationFn: authApi.forgotPassword });
export const useResetPassword = () => useMutation({ mutationFn: authApi.resetPassword });
export const useVerifyEmail = () => {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: (data) => data?.user && setUser(data.user),
  });
};
export const useResendVerification = () => useMutation({ mutationFn: authApi.resendVerification });

export { authApi };
