import { create } from 'zustand';

const DEFAULT_DRAFT = {
  name: '',
  category: '',
  visibility: 'public',
  bookingRequired: true,
  banner: '',
  description: '',

  multiDay: false,
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  timezone: 'Asia/Kolkata · IST (UTC+5:30)',

  venueMode: 'saved',

  venue: {
    id: '',
    name: '',
    address: '',
    capacity: '',
    image: '',
    images: [],
    layout: 'Standing only',
    location: {
      lat: 19.076,
      lng: 72.8777,
    },
  },

  newVenue: {
    name: '',
    address: '',
    capacity: '',
    layout: 'Standing only',

    location: {
      lat: 19.076,
      lng: 72.8777,
    },

    images: [],
  },

  onlineEvent: {
    platform: 'Zoom',
    meetingUrl: '',
  },

  tickets: [
    {
      id: 't1',
      name: 'General Admission',
      type: 'paid',
      price: 0,
      qty: 100,
      perOrder: 4,
      fee: 'absorb',
      saleStart: '',
      saleEnd: '',
      description: '',
    },
  ],

  searchable: true,
  marketplaceListing: true,
  publishMode: 'now',

  publishSettings: {
    passwordProtected: false,
    password: '',
    privateEvent: false,
    allowSharing: true,
    showRemainingTickets: true,
  },

  eventDetails: {
    about: '',
    venueInfo: '',
    sponsors: [],
    faqs: [],
    reviews: [],
    schedule: [],
  },
};

export const useWizardStore = create((set) => ({
  draft: DEFAULT_DRAFT,

  step: 1,

  errors: {},

  setErrors: (errors) => set({ errors }),

  clearErrors: () => set({ errors: {} }),

  setField: (key, value) =>
    set((state) => ({
      draft: {
        ...state.draft,
        [key]: value,
      },
    })),

  setDraft: (patch) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...patch,
      },
    })),

  setStep: (step) => set((state) => ({ step: Math.max(state.step, step) })),

  reset: () =>
    set({
      draft: DEFAULT_DRAFT,
      step: 1,
      errors: {},
    }),
}));