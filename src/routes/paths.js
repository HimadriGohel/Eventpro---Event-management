/* Single source of truth for route paths. Pages call `navigate(id)`
   from the `useGo` hook below; this map translates legacy ids to URLs. */

export const PATHS = {
  // Public
  sitemap: '/',
  home: '/home',
  explore: '/explore',
  event: '/event/neo-rave',
  'event-soldout': '/event/neo-rave?soldout=1',
  create: '/create',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  components: '/components',


  // Auth
  login: '/login',
  signup: '/signup',
  auth: '/auth',
  'auth-forgot': '/auth/forgot',
  'auth-reset': '/auth/reset',
  'auth-otp': '/auth/otp',
  'auth-phone': '/auth/phone',
  'auth-email': '/auth/email',
  'auth-success': '/auth/success',
  'auth-pending': '/auth/pending',
  'auth-blocked': '/auth/blocked',
  'auth-session': '/auth/session',
  'auth-unauthorized': '/auth/unauthorized',
  'auth-creator': '/auth/creator',
  'auth-kyc-intro': '/auth/kyc',
  'auth-kyc-upload': '/auth/kyc/upload',
  'auth-review': '/auth/review',
  'auth-rejected': '/auth/rejected',
  'auth-welcome': '/auth/welcome',
  'auth-role': '/auth/role',
  'auth-logout': '/auth/logout',
  'auth-multidevice': '/auth/multidevice',
  'auth-security': '/auth/security',
  'auth-booking': '/auth/booking',
  'auth-approved': '/auth/approved',

  // Event creation wizard
  'event-create-start': '/events/new',
  'event-create-schedule': '/events/new/schedule',
  'event-create-venue': '/events/new/venue',
  'event-create-tickets': '/events/new/tickets',
  'event-create-preview': '/events/new/preview',
  'event-create-success': '/events/new/success',
   events: '/dashboard/events',
  // States
  'event-draft': '/event/draft',
  'event-404': '/event/not-found',

  // Dashboard
  'dashboard-empty': '/dashboard',
  'dashboard': '/dashboard',
  'dashboard-events': '/dashboard/events',
  'dashboard-event': '/dashboard/events/neo-rave',
  'dashboard-venues': '/dashboard/venues',
  'dashboard-tickets': '/dashboard/tickets',
  'dashboard-preview': '/dashboard/preview',
  'dashboard-mobile': '/dashboard/mobile',
  'dashboard-scanner': '/dashboard/scanner',
};
