import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import Sitemap from '../pages/Sitemap';

// Public pages
import Home from '../pages/public/Home';
import Explore from '../pages/public/Explore';
import EventDetails from '../pages/public/EventDetails';
import CreateEvent from '../pages/public/CreateEvent';
import Pricing from '../pages/public/Pricing';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Components from '../pages/public/Components';

// Auth pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import AuthIndex from '../pages/auth/AuthIndex';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import OTPVerify from '../pages/auth/OTPVerify';
import PhoneVerify from '../pages/auth/PhoneVerify';
import EmailVerify from '../pages/auth/EmailVerify';
import VerifySuccess from '../pages/auth/VerifySuccess';
import AccountPending from '../pages/auth/AccountPending';
import AccountBlocked from '../pages/auth/AccountBlocked';
import SessionExpired from '../pages/auth/SessionExpired';
import Unauthorized from '../pages/auth/Unauthorized';
import CreatorVerifyRequired from '../pages/auth/CreatorVerifyRequired';
import KYCIntro from '../pages/auth/KYCIntro';
import KYCUpload from '../pages/auth/KYCUpload';
import VerificationReview from '../pages/auth/VerificationReview';
import VerificationRejected from '../pages/auth/VerificationRejected';
import WelcomeActivate from '../pages/auth/WelcomeActivate';
import RoleSelect from '../pages/auth/RoleSelect';
import LogoutConfirm from '../pages/auth/LogoutConfirm';
import MultiDeviceWarning from '../pages/auth/MultiDeviceWarning';
import SecuritySettings from '../pages/auth/SecuritySettings';
import AuthBooking from '../pages/auth/AuthBooking';
import AuthApproved from '../pages/auth/AuthApproved';

// Wizard pages
import EventCreateStart from '../pages/wizard/EventCreateStart';
import EventCreateSchedule from '../pages/wizard/EventCreateSchedule';
import EventCreateVenue from '../pages/wizard/EventCreateVenue';
import EventCreateTickets from '../pages/wizard/EventCreateTickets';
import EventCreatePreview from '../pages/wizard/EventCreatePreview';
import EventCreateSuccess from '../pages/wizard/EventCreateSuccess';

// Dashboard pages
import DashboardEmpty from '../pages/dashboard/Dashboard';
import DashboardEvents from '../pages/dashboard/DashboardEvents';
import DashboardEventDetail from '../pages/dashboard/DashboardEventDetail';
import DashboardVenues from '../pages/dashboard/DashboardVenues';
import DashboardTickets from '../pages/dashboard/DashboardTickets';
// import DashboardPreview from '../pages/dashboard/DashboardPreview';
// import DashboardMobile from '../pages/dashboard/DashboardMobile';
import DashboardScanner from '../pages/dashboard/DashboardScanner';

// State pages
import EventDraft from '../pages/states/EventDraft';
import Event404 from '../pages/states/Event404';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },

  {
    element: <PublicLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/event/:id', element: <EventDetails /> },
      { path: '/create', element: <CreateEvent /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/components', element: <Components /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      // Auth core
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/auth', element: <AuthIndex /> },
      { path: '/auth/forgot', element: <ForgotPassword /> },
      { path: '/auth/reset', element: <ResetPassword /> },
      { path: '/auth/otp', element: <OTPVerify /> },
      { path: '/auth/phone', element: <PhoneVerify /> },
      { path: '/auth/email', element: <EmailVerify /> },
      { path: '/auth/success', element: <VerifySuccess /> },
      { path: '/auth/pending', element: <AccountPending /> },
      { path: '/auth/blocked', element: <AccountBlocked /> },
      { path: '/auth/session', element: <SessionExpired /> },
      { path: '/auth/unauthorized', element: <Unauthorized /> },
      { path: '/auth/creator', element: <CreatorVerifyRequired /> },
      { path: '/auth/kyc', element: <KYCIntro /> },
      { path: '/auth/kyc/upload', element: <KYCUpload /> },
      { path: '/auth/review', element: <VerificationReview /> },
      { path: '/auth/rejected', element: <VerificationRejected /> },
      { path: '/auth/welcome', element: <WelcomeActivate /> },
      { path: '/auth/role', element: <RoleSelect /> },
      { path: '/auth/logout', element: <LogoutConfirm /> },
      { path: '/auth/multidevice', element: <MultiDeviceWarning /> },
      { path: '/auth/security', element: <SecuritySettings /> },
      { path: '/auth/booking', element: <AuthBooking /> },
      { path: '/auth/approved', element: <AuthApproved /> },

      // Wizard (protected)
      { path: '/events/new', element: <ProtectedRoute><EventCreateStart /></ProtectedRoute> },
      { path: '/events/new/schedule', element: <ProtectedRoute><EventCreateSchedule /></ProtectedRoute> },
      { path: '/events/new/venue', element: <ProtectedRoute><EventCreateVenue /></ProtectedRoute> },
      { path: '/events/new/tickets', element: <ProtectedRoute><EventCreateTickets /></ProtectedRoute> },
      { path: '/events/new/preview', element: <ProtectedRoute><EventCreatePreview /></ProtectedRoute> },
      { path: '/events/new/success', element: <ProtectedRoute><EventCreateSuccess /></ProtectedRoute> },
 
      // Dashboard (protected)
      { path: '/dashboard', element: <ProtectedRoute><DashboardEmpty /></ProtectedRoute> },
      { path: '/dashboard/empty', element: <ProtectedRoute><DashboardEmpty /></ProtectedRoute> },
      { path: '/dashboard/events', element: <ProtectedRoute><DashboardEvents /></ProtectedRoute> },
      { path: '/dashboard/events/:id', element: <ProtectedRoute><DashboardEventDetail /></ProtectedRoute> },
      { path: '/dashboard/venues', element: <ProtectedRoute><DashboardVenues /></ProtectedRoute> },
      { path: '/dashboard/tickets', element: <ProtectedRoute><DashboardTickets /></ProtectedRoute> },
      // { path: '/dashboard/preview', element: <ProtectedRoute><DashboardPreview /></ProtectedRoute> },
      // { path: '/dashboard/mobile', element: <ProtectedRoute><DashboardMobile /></ProtectedRoute> },
      {
  path: '/dashboard/scanner',
  element: (
    <ProtectedRoute>
      <DashboardScanner />
    </ProtectedRoute>
  ),
},

      // States
      { path: '/event/draft', element: <EventDraft /> },
      { path: '/event/not-found', element: <Event404 /> },
    ],
  },

  { path: '*', element: <Event404 /> },
]);