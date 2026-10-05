export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  memberSince: string;
  nextBillingDate: string;
  paypalSubscriptionId?: string;
  country: string;
  isPremium: boolean;
}

export interface PayPalConfig {
  env: 'production' | 'sandbox';
  clientId: string;
  planId: string;
  hasSecret: boolean;
  isConfigured: boolean;
  isProduction: boolean;
  apiEndpoint: string;
  monthlyPrice?: number;
  currency?: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  priceAnnual: number;
  planId: string;
  popular?: boolean;
  allocation: string;
  features: string[];
}

export interface ConciergeRequest {
  id: string;
  memberId: string;
  memberName: string;
  category: string;
  details: string;
  urgency: string;
  status: string;
  createdAt: string;
}

export interface SummitEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  category: 'Summit' | 'Retreat' | 'Gala' | 'Symposium';
  capacity: string;
  status: 'Exclusive' | 'Open' | 'Waitlist';
  description: string;
}

export interface PartnerPrivilege {
  name: string;
  category: string;
  perk: string;
  locations: string;
}
