import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from '../components/nav/TopNav';
import { Footer } from '../components/nav/Footer';
import { OverviewFAB } from '../components/nav/OverviewFAB';

export function PublicLayout() {
  const { pathname } = useLocation();
  const key = pathname;
  return (
    <>
      <TopNav />
      <main key={key}>
        <Outlet />
      </main>
      <Footer />
      <OverviewFAB />
    </>
  );
}
