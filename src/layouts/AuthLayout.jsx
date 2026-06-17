import { Outlet, useLocation } from 'react-router-dom';

/* Fullbleed layout — used for auth, wizard, and dashboard "preview" pages
   where TopNav/Footer are intentionally hidden. */
export function AuthLayout() {
  const { pathname } = useLocation();
  return (
    <main key={pathname}>
      <Outlet />
    </main>
  );
}
