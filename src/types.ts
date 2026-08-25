export type CategoryType = 'specialties' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  available: boolean;
  isFeatured?: boolean;
  prepTimeMinutes?: number;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Reservation {
  id: string;
  customerName: string;
  contactPhone: string;
  partySize: number;
  date: string;
  time: string;
  status: ReservationStatus;
  isVIP?: boolean;
  isCorporate?: boolean;
  specialRequests?: string;
  createdAt: string;
}

export interface SiteSettings {
  address: string;
  phone: string;
  hoursType: '24hours' | 'custom';
  openTime: string;
  closeTime: string;
  brandName: string;
  tagline: string;
  cityCountry: string;
  description: string;
  announcement: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'highlight';
  imageUrl: string;
  author: string;
  date: string;
  likes: number;
  caption: string;
  featuredOnBento: boolean;
}

export type TabType = 
  | 'dashboard' 
  | 'menu' 
  | 'reservations' 
  | 'bento_media' 
  | 'settings' 
  | 'consumer_site' 
  | 'analytics' 
  | 'reports';
