export type TabType = 'explore' | 'online' | 'likes' | 'visitors' | 'messaging' | 'profile';

export interface VibeUser {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  location: string;
  profession: string;
  photos: string[];
  bio: string;
  likes: string[]; // "what he likes" e.g., ['Indie Rock', 'Coffee Cupping', 'Bouldering', 'Late Night Drives']
  isOnline: boolean;
  lastActive: string;
  distance: string; // e.g. "2 km away"
  statusVibe?: string; // e.g. "Looking for indie coffee shop partner today"
  likedMe?: boolean;
  visitedAt?: string; // e.g. "15 mins ago"
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  userId: string; // target user id
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isRequest: boolean; // Message request vs active conversation
  requestStatus?: 'pending' | 'accepted' | 'declined';
  messages: ChatMessage[];
}

export interface AuthState {
  isAuthenticated: boolean;
  loginMethod?: 'phone' | 'email' | 'google';
  phoneOrEmail?: string;
}

export const DAILY_INITIATE_CHAT_LIMIT = 20;

export interface CurrentUserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'other';
  location: string;
  profession: string;
  bio: string;
  likes: string[];
  photo: string;
  isVIP: boolean;
  vipPlan?: '1_month' | '3_months' | '6_months' | '1_year';
  vipExpiry?: string;
  dailyInitiatedChatsCount?: number;
  isFaceVerified?: boolean;
  verifiedGender?: 'female' | 'male' | 'other';
  faceVerificationPhoto?: string;
  isFreeGirlVIP?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'visitor' | 'message' | 'like';
  title: string;
  description: string;
  timestamp: string;
  avatar?: string;
  userId?: string;
  threadId?: string;
  isRead: boolean;
}

export interface PricingPlan {
  id: '1_month' | '3_months' | '6_months' | '1_year';
  duration: string;
  price: number;
  formattedPrice: string;
  savings?: string;
  perMonth: string;
  popular?: boolean;
}
