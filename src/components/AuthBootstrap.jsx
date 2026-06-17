import { useEffect, useRef } from 'react';
import { api } from '../api/client';
import { useAuthStore } from '../stores/authStore';

/**
 * Fires once on mount — silently attempts a token refresh using the httpOnly
 * cookie so the user's session survives a hard reload.  Sets isBootstrapping
 * to false regardless of outcome so the rest of the app can render.
 */
export function AuthBootstrap() {
  const ran = useRef(false);
  const setSession = useAuthStore((s) => s.setSession);
  const setBootstrapping = useAuthStore((s) => s.setBootstrapping);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    api
      .post('/auth/refresh')
      .then(({ data }) => {
        const { user, accessToken } = data?.data ?? {};
        if (user && accessToken) setSession(user, accessToken);
        else setBootstrapping(false);
      })
      .catch(() => {
        // No valid refresh cookie — clear any stale user from localStorage
        useAuthStore.getState().clearSession();
      });
  }, []);

  return null;
}
