import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

/**
 * Wrap any route element with this to require authentication.
 *
 * - While bootstrapping (initial refresh in-flight) → render a blank screen so
 *   we don't flash the login page for users who ARE logged in.
 * - Unauthenticated after bootstrap → redirect to /login, preserving `from`
 *   so Login can send them back.
 * - Authenticated → render children.
 *
 * Usage in routes:
 *   <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
 */
export function ProtectedRoute({ children, redirectTo = '/login' }) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);

  if (isBootstrapping) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--ink-soft)', fontSize: 14,
      }}>
        <span style={{ opacity: 0.5 }}>Loading…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}
