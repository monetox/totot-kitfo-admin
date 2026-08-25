import { MenuItem, Reservation, SiteSettings, MediaItem } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Totot Special Kitfo',
    description: 'Premium minced beef, seasoned clarified butter (niter kibbeh), mitmita, served with ayib and gomen.',
    price: 1250.00,
    category: 'specialties',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvv2p3Y0bwHcgqLT29PHl6660A-ekamYuu2BhMraCWfRn0gk84eRluhNCgT_ZE0Vxt8jBk0BRjzhrxD4bUI7rZoEhEcOOAAEbZau7yOFoNuVQP5A0BjMCKiFaNqcFyKk6qGoVrPAww_T-BUn95kQg963bqsW4r_XnB7Zek2EpHKpnBz7h49CbGR2r4kmWmfxJAZVVU0rzM_T9xr2bYR5cwt15eJt095jhP4vlL3pfsmdlytix0Lt1bUw',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 15
  },
  {
    id: 'menu-2',
    name: 'Gomen Kitfo',
    description: 'Minced collard greens with aromatic spices, garlic, and seasoned herbal butter.',
    price: 650.00,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    available: false,
    isFeatured: false,
    prepTimeMinutes: 12
  },
  {
    id: 'menu-3',
    name: 'Kitfo Leb (Rare)',
    description: 'Finely minced prime beef warmed gently in rich niter kibbeh and Gurage mitmita, served rare.',
    price: 980.00,
    category: 'specialties',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP0SA8WxJYmTktZ4RImC9_gav0izlwyP8RPxHnYudZY8WkQpiKiY65Ms8O_ATNDi7pjlXDmCoUtK52_-peuuxMQO6BARQ54TsDvULUFrQqreiXdwE6O8x5i-hYM8v-siKuXE7ofKvV7SAxSv8meHXfn6Um17pMTMZ2ZqHMZhP0yKvgXDO35mWpn_QzJwECwMRyYl6VFuedGGB70dtt8guAbMBWQ5eBJZ53ZdUXxYbKkIOcmMw8ZXHzaA',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 10
  },
  {
    id: 'menu-4',
    name: 'Gored Gored',
    description: 'Cubed tender beef tossed in spiced clarified butter, mitmita, and awaze paste.',
    price: 890.00,
    category: 'specialties',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvv2p3Y0bwHcgqLT29PHl6660A-ekamYuu2BhMraCWfRn0gk84eRluhNCgT_ZE0Vxt8jBk0BRjzhrxD4bUI7rZoEhEcOOAAEbZau7yOFoNuVQP5A0BjMCKiFaNqcFyKk6qGoVrPAww_T-BUn95kQg963bqsW4r_XnB7Zek2EpHKpnBz7h49CbGR2r4kmWmfxJAZVVU0rzM_T9xr2bYR5cwt15eJt095jhP4vlL3pfsmdlytix0Lt1bUw',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 15
  },
  {
    id: 'menu-5',
    name: 'Dulet Special',
    description: 'Minced tripe, liver, lean beef sautéed with diced onions, jalapeños, and cardamom.',
    price: 750.00,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 18
  },
  {
    id: 'menu-6',
    name: 'Ayib Cottage Cheese',
    description: 'Fresh homemade Ethiopian cottage cheese, mild and creamy, balances spiced dishes.',
    price: 220.00,
    category: 'sides',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  },
  {
    id: 'menu-7',
    name: 'Gomen Besiga (Slow Braised)',
    description: 'Tender beef and slow-cooked collard greens in spiced butter broth, served on banana leaves.',
    price: 480.00,
    category: 'sides',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 10
  },
  {
    id: 'menu-8',
    name: 'Injera Basket (Pure Teff)',
    description: 'Traditional fermented spongy flatbread made with 100% Ethiopian brown and white teff.',
    price: 150.00,
    category: 'sides',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  },
  {
    id: 'menu-9',
    name: 'Timatim & Jalapeño Salad',
    description: 'Diced vine-ripened tomatoes, red onions, and fiery green chilies in lemon-olive dressing.',
    price: 180.00,
    category: 'sides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvv2p3Y0bwHcgqLT29PHl6660A-ekamYuu2BhMraCWfRn0gk84eRluhNCgT_ZE0Vxt8jBk0BRjzhrxD4bUI7rZoEhEcOOAAEbZau7yOFoNuVQP5A0BjMCKiFaNqcFyKk6qGoVrPAww_T-BUn95kQg963bqsW4r_XnB7Zek2EpHKpnBz7h49CbGR2r4kmWmfxJAZVVU0rzM_T9xr2bYR5cwt15eJt095jhP4vlL3pfsmdlytix0Lt1bUw',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 8
  },
  {
    id: 'menu-10',
    name: 'Royal Coffee Ceremony',
    description: 'Fresh green coffee beans roasted on embers, ground tableside, and brewed in a clay jebena.',
    price: 350.00,
    category: 'drinks',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 20
  },
  {
    id: 'menu-11',
    name: 'Honey Tej Wine (House Reserve)',
    description: 'Traditional Ethiopian fermented honey mead, infused with gesho leaves in a vintage berele.',
    price: 280.00,
    category: 'drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP0SA8WxJYmTktZ4RImC9_gav0izlwyP8RPxHnYudZY8WkQpiKiY65Ms8O_ATNDi7pjlXDmCoUtK52_-peuuxMQO6BARQ54TsDvULUFrQqreiXdwE6O8x5i-hYM8v-siKuXE7ofKvV7SAxSv8meHXfn6Um17pMTMZ2ZqHMZhP0yKvgXDO35mWpn_QzJwECwMRyYl6VFuedGGB70dtt8guAbMBWQ5eBJZ53ZdUXxYbKkIOcmMw8ZXHzaA',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  },
  {
    id: 'menu-12',
    name: 'Ambo Sparkling Mineral Water',
    description: 'Naturally carbonated volcanic mineral water bottled at source in Ambo, Ethiopia.',
    price: 90.00,
    category: 'drinks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwawvBMqLpjDJK9EEQdH-Fq0U3YTEVdGHc9dKlyYbmzFdxJFsCpgn-vjGRI56Y1V0qAqEcO3oIUv9gjzPHaYs-aXa3OHZA_9MeaRMCYzrr-n2f9BFLg2D2ZenpcUDPxT6GdN0r8TrcrkzmLqM0dp1qkc5E66AOLIumpRQ_aAR3c-Y9HDPyWU5Dw_XwfgWbPLh3g41xuC3CKsTbBBV2Sgc5FmmqcDL1Z9s7IXIwInp84JqeA3wD8ZcYbw',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 2
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    customerName: 'Elias Makonnen',
    contactPhone: '+251 91 123 4567',
    partySize: 4,
    date: '2026-08-25',
    time: '19:30',
    status: 'Pending',
    isVIP: true,
    specialRequests: 'Traditional mesob seating with extra ayib and kocho.',
    createdAt: '2026-08-25 10:15'
  },
  {
    id: 'res-2',
    customerName: 'Sara Bekele',
    contactPhone: '+251 92 887 6543',
    partySize: 2,
    date: '2026-08-25',
    time: '20:00',
    status: 'Confirmed',
    isVIP: false,
    specialRequests: 'Anniversary dinner table by the window garden.',
    createdAt: '2026-08-25 11:20'
  },
  {
    id: 'res-3',
    customerName: 'Dawit Tadesse',
    contactPhone: '+251 91 445 6789',
    partySize: 8,
    date: '2026-08-26',
    time: '18:00',
    status: 'Confirmed',
    isVIP: true,
    specialRequests: 'Full Jebena coffee ceremony setup after kitfo course.',
    createdAt: '2026-08-24 16:45'
  },
  {
    id: 'res-4',
    customerName: 'Eleanor Vance',
    contactPhone: '+1 (555) 019-2834',
    partySize: 2,
    date: '2026-08-27',
    time: '19:30',
    status: 'Pending',
    isVIP: true,
    specialRequests: 'VIP Lounge reservation, mild mitmita preference.',
    createdAt: '2026-08-25 09:00'
  },
  {
    id: 'res-5',
    customerName: 'Marcus Sterling',
    contactPhone: '+1 (555) 847-1029',
    partySize: 4,
    date: '2026-08-27',
    time: '20:00',
    status: 'Confirmed',
    isVIP: false,
    specialRequests: 'Tasting menu with Tej honey wine pairing.',
    createdAt: '2026-08-24 14:10'
  },
  {
    id: 'res-6',
    customerName: 'Sophia Laurent',
    contactPhone: '+44 20 7946 0958',
    partySize: 6,
    date: '2026-08-28',
    time: '18:15',
    status: 'Cancelled',
    isVIP: false,
    specialRequests: 'International delegation dinner - postponed.',
    createdAt: '2026-08-23 18:30'
  },
  {
    id: 'res-7',
    customerName: 'David Chen',
    contactPhone: '+1 (555) 392-8174',
    partySize: 12,
    date: '2026-08-24',
    time: '12:30',
    status: 'Completed',
    isVIP: false,
    isCorporate: true,
    specialRequests: 'Executive banquet room with multimedia display.',
    createdAt: '2026-08-22 08:40'
  },
  {
    id: 'res-8',
    customerName: 'Bethlehem Haile',
    contactPhone: '+251 93 551 2299',
    partySize: 5,
    date: '2026-08-26',
    time: '20:30',
    status: 'Confirmed',
    isVIP: true,
    specialRequests: 'Gurage cultural heritage celebration table.',
    createdAt: '2026-08-25 08:30'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  address: '128 Elite Avenue, Central District, AD 90210 / Gerji, Bole Sub-City, Addis Ababa',
  phone: '+1 (555) 019-8234 / +251 11 646 0718',
  hoursType: '24hours',
  openTime: '00:00',
  closeTime: '23:59',
  brandName: 'Adulis Luxury & Totot Kitfo',
  tagline: 'Crafted Tradition. Pure Flavor.',
  cityCountry: 'Addis Ababa, Ethiopia',
  description: 'Totot Kitfo brings the authentic Gurage art of kitfo to Gerji — finely minced beef, warmed gently in niter kibbeh and mitmita, served the way it has been for generations.',
  announcement: 'Special Kitfo Reserve available every evening from 6:00 PM.'
};

export const INITIAL_MEDIA_POSTS: MediaItem[] = [
  {
    id: 'media-1',
    title: 'Traditional Dining Space & Mesob Setup',
    type: 'photo',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    author: 'Patron Review via Google Maps',
    date: '2 hours ago',
    likes: 342,
    caption: 'Traditional Gurage hospitality, carved low tables, and ambient warmth.',
    featuredOnBento: true
  },
  {
    id: 'media-2',
    title: 'Fresh Gomen Besiga Platter',
    type: 'photo',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    author: 'Culinary Highlights',
    date: '5 hours ago',
    likes: 218,
    caption: 'Slow-braised collard greens and prime beef on fresh enset leaves.',
    featuredOnBento: true
  },
  {
    id: 'media-3',
    title: 'Signature Kitfo Preparation Live',
    type: 'highlight',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP0SA8WxJYmTktZ4RImC9_gav0izlwyP8RPxHnYudZY8WkQpiKiY65Ms8O_ATNDi7pjlXDmCoUtK52_-peuuxMQO6BARQ54TsDvULUFrQqreiXdwE6O8x5i-hYM8v-siKuXE7ofKvV7SAxSv8meHXfn6Um17pMTMZ2ZqHMZhP0yKvgXDO35mWpn_QzJwECwMRyYl6VFuedGGB70dtt8guAbMBWQ5eBJZ53ZdUXxYbKkIOcmMw8ZXHzaA',
    author: 'Chef Kitchen Stream',
    date: '1 day ago',
    likes: 580,
    caption: 'Prime grass-fed beef hand-chopped and infused with spiced niter kibbeh.',
    featuredOnBento: true
  },
  {
    id: 'media-4',
    title: 'Royal Coffee Ceremony Preparation',
    type: 'photo',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    author: 'Yared M.',
    date: '2 days ago',
    likes: 190,
    caption: 'Aromatic frankincense and fresh popcorn served with dark Ethiopian brew.',
    featuredOnBento: false
  }
];

export const initialMenuItems = INITIAL_MENU_ITEMS;
export const initialReservations = INITIAL_RESERVATIONS;
export const initialSiteSettings = INITIAL_SITE_SETTINGS;
export const initialMediaItems = INITIAL_MEDIA_POSTS;
