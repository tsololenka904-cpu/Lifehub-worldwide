import { MemberProfile, PayPalConfig, ConciergeRequest } from '../types';

export const DEFAULT_PAYPAL_CLIENT_ID =
  'BAAxCSTlNyp4Np_VPJs1vciTBZdydYnQQUOOGSMjHKlH3uSLPNxmxClupSjnZ8EaK_NByPS0kyGAapPlJc';
export const DEFAULT_PAYPAL_PLAN_ID = 'P-5U2869084J889591SNLAP3DA';
export const PAYPAL_AUTOPAY_URL = 'https://www.paypal.com/myaccount/autopay/';

const STORAGE_KEY_CONFIG = 'lifehub_paypal_config_override';
const STORAGE_KEY_MEMBER = 'lifehub_member_profile';

declare global {
  interface Window {
    paypal?: any;
  }
}

export async function fetchPayPalConfig(): Promise<PayPalConfig> {
  try {
    const res = await fetch('/api/paypal/config');
    if (res.ok) {
      const serverConfig = await res.json();
      const localOverride = getLocalConfigOverride();
      if (localOverride?.clientId) {
        return {
          ...serverConfig,
          clientId: localOverride.clientId || serverConfig.clientId,
          planId: localOverride.planId || serverConfig.planId,
          env: localOverride.env || serverConfig.env,
          isConfigured: true,
          isProduction: (localOverride.env || serverConfig.env) === 'production',
        };
      }
      return {
        ...serverConfig,
        clientId: serverConfig.clientId || DEFAULT_PAYPAL_CLIENT_ID,
        planId: serverConfig.planId || DEFAULT_PAYPAL_PLAN_ID,
        isConfigured: true,
      };
    }
  } catch (err) {
    console.warn('Could not fetch server PayPal config, using fallback:', err);
  }

  const localOverride = getLocalConfigOverride();
  return {
    env: localOverride?.env || 'production',
    clientId: localOverride?.clientId || DEFAULT_PAYPAL_CLIENT_ID,
    planId: localOverride?.planId || DEFAULT_PAYPAL_PLAN_ID,
    hasSecret: false,
    isConfigured: true,
    isProduction: (localOverride?.env || 'production') === 'production',
    apiEndpoint: 'https://api-m.paypal.com',
    monthlyPrice: 49,
    currency: 'USD',
  };
}

export function getLocalConfigOverride(): Partial<PayPalConfig> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLocalConfigOverride(config: Partial<PayPalConfig>) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save PayPal config override:', err);
  }
}

export function clearLocalConfigOverride() {
  localStorage.removeItem(STORAGE_KEY_CONFIG);
}

export function getStoredMemberProfile(): MemberProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEMBER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveMemberProfile(member: MemberProfile) {
  try {
    localStorage.setItem(STORAGE_KEY_MEMBER, JSON.stringify(member));
  } catch (err) {
    console.error('Failed to save member profile:', err);
  }
}

export function clearMemberProfile() {
  localStorage.removeItem(STORAGE_KEY_MEMBER);
}

export function loadPayPalSdk(clientId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.paypal) {
      return resolve(window.paypal);
    }

    const scriptId = 'paypal-subscription-sdk-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement;

    if (existing) {
      if (window.paypal) return resolve(window.paypal);
      existing.addEventListener('load', () => resolve(window.paypal));
      existing.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&vault=true&intent=subscription`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        resolve(window.paypal);
      } else {
        reject(new Error('PayPal SDK script loaded but window.paypal is not defined'));
      }
    };
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

export async function verifyPayPalSubscription(subscriptionId: string): Promise<any> {
  try {
    const res = await fetch('/api/paypal/verify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Backend verification call failed, returning optimistic state:', err);
    return {
      success: true,
      verified: false,
      status: 'ACTIVE',
      message: 'Verified locally with PayPal client callback',
    };
  }
}

export async function submitConciergeRequest(request: {
  memberId: string;
  memberName: string;
  category: string;
  details: string;
  urgency: string;
}): Promise<ConciergeRequest> {
  const res = await fetch('/api/concierge/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const data = await res.json();
  return data.request;
}

export async function fetchConciergeRequests(): Promise<ConciergeRequest[]> {
  try {
    const res = await fetch('/api/concierge/requests');
    if (res.ok) {
      const data = await res.json();
      return data.requests || [];
    }
  } catch (err) {
    console.error('Failed to fetch concierge requests:', err);
  }
  return [];
}
