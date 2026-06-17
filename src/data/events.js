/* Mock event catalog — same shape as the prototype */

export const EVENTS = [
  { id: 'neo-rave', title: 'Neo Rave: Midnight Bloom', category: 'Concerts', city: 'Mumbai', date: 'Sat, 14 Jun', time: '9:00 PM', price: 1499, organizer: 'Phantom Records', img: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1200&q=80&auto=format&fit=crop', color: '#1E1B4B', trending: true },
  { id: 'stand-up-50', title: 'Stand-Up Saturdays Vol. 50', category: 'Comedy', city: 'Bengaluru', date: 'Sat, 21 Jun', time: '8:00 PM', price: 599, organizer: 'The Open Mic', img: 'https://images.unsplash.com/photo-1525348371953-1c66e6e9c14e?w=1200&q=80&auto=format&fit=crop', color: '#F59E0B' },
  { id: 'supper-club', title: 'Skyline Supper Club', category: 'Food', city: 'Delhi', date: 'Fri, 20 Jun', time: '7:30 PM', price: 2200, organizer: 'Atlas Kitchen', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop', color: '#10B981' },
  { id: 'design-jam', title: 'Founder × Design Jam', category: 'Workshops', city: 'Hyderabad', date: 'Sun, 22 Jun', time: '11:00 AM', price: 0, organizer: 'Make Studio', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80&auto=format&fit=crop', color: '#FF6B6B', free: true },
  { id: 'sundowner', title: 'Sundowner: Vinyl on the Lawn', category: 'Parties', city: 'Goa', date: 'Sat, 14 Jun', time: '5:30 PM', price: 1200, organizer: 'Soft Static', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80&auto=format&fit=crop', color: '#FF6B6B', trending: true },
  { id: 'art-night', title: 'After-Hours: Contemporary Art Walk', category: 'Exhibitions', city: 'Mumbai', date: 'Thu, 19 Jun', time: '7:00 PM', price: 800, organizer: 'Foyer Gallery', img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80&auto=format&fit=crop', color: '#2D2A6B' },
  { id: 'marathon', title: 'Coastline Half-Marathon 2026', category: 'Sports', city: 'Chennai', date: 'Sun, 06 Jul', time: '5:30 AM', price: 1800, organizer: 'Stride Co.', img: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&q=80&auto=format&fit=crop', color: '#10B981' },
  { id: 'tedx-college', title: 'TEDx IIT-B: Soft Power', category: 'College', city: 'Mumbai', date: 'Sat, 28 Jun', time: '10:00 AM', price: 0, organizer: 'TEDx IIT-B', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop', color: '#1E1B4B', free: true },
  { id: 'biryani-fest', title: 'The Great Biryani Festival', category: 'Food', city: 'Hyderabad', date: 'Sat, 12 Jul', time: '12:00 PM', price: 499, organizer: 'Hungry City', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80&auto=format&fit=crop', color: '#F59E0B', trending: true },
  { id: 'saas-summit', title: 'B2B SaaS Summit 2026', category: 'Business', city: 'Bengaluru', date: 'Wed, 23 Jul', time: '9:00 AM', price: 4999, organizer: 'ScaleUp Forum', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&auto=format&fit=crop', color: '#1E1B4B' },
  { id: 'indie-acoustic', title: 'Indie Acoustic Nights', category: 'Concerts', city: 'Pune', date: 'Fri, 11 Jul', time: '9:00 PM', price: 799, organizer: 'Verse & Strum', img: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=1200&q=80&auto=format&fit=crop', color: '#FF6B6B' },
  { id: 'night-bazaar', title: 'Night Bazaar: Pop & Chai', category: 'Night Out', city: 'Jaipur', date: 'Sat, 14 Jun', time: '8:00 PM', price: 250, organizer: 'After Sunset Co.', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80&auto=format&fit=crop', color: '#F59E0B' },
];

export const CATEGORIES = [
  { id: 'concerts', label: 'Concerts', icon: 'music', color: '#FF6B6B' },
  { id: 'comedy', label: 'Comedy Shows', icon: 'mic', color: '#F59E0B' },
  { id: 'night', label: 'Night Outs', icon: 'fire', color: '#1E1B4B' },
  { id: 'parties', label: 'Parties', icon: 'party', color: '#EC4899' },
  { id: 'workshops', label: 'Workshops', icon: 'brief', color: '#10B981' },
  { id: 'exhibitions', label: 'Exhibitions', icon: 'palette', color: '#7C3AED' },
  { id: 'sports', label: 'Sports', icon: 'trophy', color: '#0EA5E9' },
  { id: 'college', label: 'College Events', icon: 'school', color: '#F97316' },
  { id: 'food', label: 'Food Festivals', icon: 'food', color: '#EF4444' },
  { id: 'business', label: 'Business', icon: 'brief', color: '#1E1B4B' },
];

export const CITIES = ['All cities', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Goa', 'Jaipur'];
