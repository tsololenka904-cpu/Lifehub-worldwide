import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PricingSection } from './components/PricingSection';
import { PremiumAccessView } from './components/PremiumAccessView';
import { PartnersSection } from './components/PartnersSection';
import { CalendarSection } from './components/CalendarSection';
import { MemberPortal } from './components/MemberPortal';
import { PayPalConfigModal } from './components/PayPalConfigModal';
import { Footer } from './components/Footer';
import { MemberProfile, MembershipTier, PayPalConfig } from './types';
import {
  fetchPayPalConfig,
  getStoredMemberProfile,
  saveMemberProfile,
  clearMemberProfile,
  verifyPayPalSubscription,
  DEFAULT_PAYPAL_CLIENT_ID,
  DEFAULT_PAYPAL_PLAN_ID,
} from './services/paypal';
import { Crown, Sparkles, Settings, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [paypalConfig, setPaypalConfig] = useState<PayPalConfig>({
    env: 'production',
    clientId: DEFAULT_PAYPAL_CLIENT_ID,
    planId: DEFAULT_PAYPAL_PLAN_ID,
    hasSecret: false,
    isConfigured: true,
    isProduction: true,
    apiEndpoint: 'https://api-m.paypal.com',
    monthlyPrice: 49,
    currency: 'USD',
  });
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<MemberProfile | null>(null);
  const [subscriptionAlert, setSubscriptionAlert] = useState<{
    tierName: string;
    subId: string;
  } | null>(null);

  useEffect(() => {
    // Load stored member profile if any
    const stored = getStoredMemberProfile();
    if (stored) {
      setActiveMember(stored);
    }

    // Load server/local PayPal configuration
    fetchPayPalConfig().then((cfg) => {
      setPaypalConfig(cfg);
    });
  }, []);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribeSuccess = async (
    tier: MembershipTier,
    subscriptionId: string,
    _details?: any
  ) => {
    // Verify subscription with backend / PayPal
    await verifyPayPalSubscription(subscriptionId);

    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));

    const newMember: MemberProfile = {
      id: activeMember?.id || `LH-WW-${Math.floor(1000 + Math.random() * 9000)}`,
      name: activeMember?.name || 'Sovereign Member',
      email: activeMember?.email || 'member@lifehub-worldwide.com',
      tier: tier.name,
      status: 'ACTIVE',
      memberSince:
        activeMember?.memberSince ||
        new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      nextBillingDate: nextMonth.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      paypalSubscriptionId: subscriptionId,
      country: activeMember?.country || 'United Kingdom',
      isPremium: true,
    };

    saveMemberProfile(newMember);
    setActiveMember(newMember);
    setSubscriptionAlert({ tierName: tier.name, subId: subscriptionId });
    setCurrentTab('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setSubscriptionAlert(null);
    }, 6000);
  };

  const handleToggleMemberPortal = () => {
    if (activeMember) {
      setCurrentTab(currentTab === 'portal' ? 'overview' : 'portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Demo Executive Member Profile
      const defaultMember: MemberProfile = {
        id: 'LH-GLOBAL-8821',
        name: 'Alexander von Berg',
        email: 'a.berg@sovereign-syndicate.ch',
        tier: 'LifeHub Sovereign Premium',
        status: 'ACTIVE',
        memberSince: 'Oct 2025',
        nextBillingDate: 'Nov 14, 2026',
        paypalSubscriptionId: 'I-LIVE-BW9281X',
        country: 'Switzerland',
        isPremium: true,
      };
      saveMemberProfile(defaultMember);
      setActiveMember(defaultMember);
      setCurrentTab('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignOut = () => {
    clearMemberProfile();
    setActiveMember(null);
    setCurrentTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        paypalConfig={paypalConfig}
        onOpenPayPalConfig={() => setIsConfigModalOpen(true)}
        activeMember={activeMember}
        onToggleMemberPortal={handleToggleMemberPortal}
      />

      {/* Subscription Alert Toast */}
      {subscriptionAlert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-in slide-in-from-top-4 duration-300">
          <div className="p-4 bg-emerald-950/90 border border-emerald-500/60 rounded-2xl shadow-2xl text-left flex items-start gap-3 backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-white text-sm">
                Subscription Confirmed via PayPal!
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Welcome to <strong>{subscriptionAlert.tierName}</strong> ($49/month). Your PayPal
                subscription <code>{subscriptionAlert.subId}</code> is active and your Sovereign Pass is unlocked.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'portal' && activeMember ? (
          <MemberPortal
            member={activeMember}
            paypalConfig={paypalConfig}
            onOpenConfig={() => setIsConfigModalOpen(true)}
            onSignOut={handleSignOut}
          />
        ) : (
          <>
            {currentTab === 'overview' && (
              <>
                <Hero
                  onExplorePlans={() => {
                    const el = document.getElementById('membership-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      handleSelectTab('membership');
                    }
                  }}
                  onNavigateToPremium={() => handleSelectTab('premium')}
                  onOpenConfig={() => setIsConfigModalOpen(true)}
                  paypalConfig={paypalConfig}
                />
                <PricingSection
                  paypalConfig={paypalConfig}
                  onSubscribeSuccess={handleSubscribeSuccess}
                  onOpenConfig={() => setIsConfigModalOpen(true)}
                />
                <PartnersSection />
                <CalendarSection />
              </>
            )}

            {currentTab === 'premium' && (
              <PremiumAccessView
                member={activeMember}
                paypalConfig={paypalConfig}
                onSubscribeSuccess={handleSubscribeSuccess}
                onOpenConfig={() => setIsConfigModalOpen(true)}
                onEnterPortal={() => handleSelectTab('portal')}
              />
            )}

            {currentTab === 'membership' && (
              <PricingSection
                paypalConfig={paypalConfig}
                onSubscribeSuccess={handleSubscribeSuccess}
                onOpenConfig={() => setIsConfigModalOpen(true)}
              />
            )}

            {currentTab === 'partners' && <PartnersSection />}

            {currentTab === 'calendar' && <CalendarSection />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenConfig={() => setIsConfigModalOpen(true)}
        paypalConfig={paypalConfig}
      />

      {/* PayPal Configuration Inspector Modal */}
      <PayPalConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={paypalConfig}
        onUpdateConfig={(cfg) => setPaypalConfig(cfg)}
      />

      {/* Floating PayPal Gateway Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsConfigModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-850 text-neutral-300 border border-neutral-700/80 shadow-2xl text-xs font-mono backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">PayPal Live Gateway</span>
          <span className="text-amber-400 font-semibold">$49/mo</span>
          <Settings className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
