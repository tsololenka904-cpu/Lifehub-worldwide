import React, { useState } from 'react';
import {
  Crown,
  Plane,
  Activity,
  Calendar,
  Building2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Send,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { MemberProfile, MembershipTier, PayPalConfig } from '../types';
import { PayPalButton } from './PayPalButton';
import {
  PAYPAL_AUTOPAY_URL,
  DEFAULT_PAYPAL_PLAN_ID,
  DEFAULT_PAYPAL_CLIENT_ID,
  submitConciergeRequest,
} from '../services/paypal';

interface PremiumAccessViewProps {
  member: MemberProfile | null;
  paypalConfig: PayPalConfig;
  onSubscribeSuccess: (tier: MembershipTier, subscriptionId: string, details?: any) => void;
  onOpenConfig: () => void;
  onEnterPortal: () => void;
}

export const PremiumAccessView: React.FC<PremiumAccessViewProps> = ({
  member,
  paypalConfig,
  onSubscribeSuccess,
  onOpenConfig,
  onEnterPortal,
}) => {
  const [copied, setCopied] = useState(false);
  const [flightOrigin, setFlightOrigin] = useState('London Luton (LTN)');
  const [flightDest, setFlightDest] = useState('Zurich Kloten (ZRH)');
  const [flightDispatched, setFlightDispatched] = useState(false);

  const isPremiumActive = Boolean(member && (member.isPremium || member.paypalSubscriptionId));
  const activeSubId = member?.paypalSubscriptionId || '';

  const premiumTier: MembershipTier = {
    id: 'lh_sovereign_premium',
    name: 'LifeHub Sovereign Premium',
    subtitle:
      'Exclusive worldwide executive concierge, cellular longevity clinics & sovereign syndicate reciprocity',
    priceMonthly: 49,
    priceAnnual: 490,
    planId: paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID,
    popular: true,
    allocation: 'Sovereign Allocation',
    features: [
      '24/7 Dedicated Private Jet Fleet Priority & Empty-Leg Dispatch',
      'Proprietary Epigenetic Biological Age & Cellular Longevity Clinic Network',
      'VIP Accreditation to Closed-Door Summits (Davos, Monaco, St. Moritz, Tokyo)',
      'Cross-Border Family Office Syndicate Dealflow Access',
      'Private Suite VIP Airport Terminal Clearance (London, Zurich, Dubai, LAX)',
      'Reciprocal Privileges at Aman Resorts, Clinique La Prairie & Harrods Penthouse',
    ],
  };

  const copySubscriptionId = () => {
    if (activeSubId) {
      navigator.clipboard.writeText(activeSubId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFlightDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    try {
      await submitConciergeRequest({
        memberId: member.id,
        memberName: member.name,
        category: 'Private Aviation',
        details: `Premium Sovereign Charter Request: ${flightOrigin} to ${flightDest} (Bombardier Global 7500 / Gulfstream G650).`,
        urgency: 'Priority (6h)',
      });
      setFlightDispatched(true);
      setTimeout(() => setFlightDispatched(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <Crown className="w-4 h-4" />
          <span>Sovereign Executive Tier</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif tracking-tight">
          LifeHub Worldwide Premium
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          Integrated sovereign mobility, clinical cellular longevity protocols, and private syndicate dealflow—powered
          by instant PayPal Live Subscription billing at <span className="text-amber-300 font-semibold">$49 per month</span>.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          {isPremiumActive ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PREMIUM ACTIVE · SUBSCRIPTION VERIFIED</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPECIAL SOVEREIGN RATE · $49/MONTH · LIVE PAYPAL</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Member Status Banner if active */}
      {isPremiumActive && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-amber-500/50 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white font-serif">Premium Membership Activated</h2>
              </div>
              <p className="text-xs text-neutral-300">
                All sovereign privileges are active at the $49/month rate. Your subscription is secured in the PayPal Vault.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={PAYPAL_AUTOPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Manage on PayPal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onEnterPortal}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Member Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800/80 flex items-center justify-between">
              <div>
                <span className="text-neutral-500 block text-[10px]">SUBSCRIPTION ID</span>
                <span className="text-amber-300 font-semibold">{activeSubId || 'I-LIVE-CONFIRMED'}</span>
              </div>
              <button
                type="button"
                onClick={copySubscriptionId}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Subscription ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800/80">
              <span className="text-neutral-500 block text-[10px]">PAYPAL PLAN ID</span>
              <span className="text-neutral-300 font-semibold font-mono">
                {paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID}
              </span>
            </div>

            <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800/80">
              <span className="text-neutral-500 block text-[10px]">MONTHLY RATE</span>
              <span className="text-emerald-400 font-semibold font-mono">$49.00 USD / month</span>
            </div>
          </div>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/90 border border-amber-500/40 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  Official Live Subscription
                </span>
                <h3 className="text-2xl font-bold font-serif text-white mt-0.5">
                  LifeHub Sovereign Premium
                </h3>
              </div>
              <div className="text-right">
                <div className="text-3xl sm:text-4xl font-bold font-serif text-white">
                  $49
                </div>
                <div className="text-[11px] text-neutral-400 font-sans">
                  / month
                </div>
                <span className="text-[10px] text-neutral-500 line-through font-mono">
                  $499/mo
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Subscribe with PayPal to immediately unlock the full LifeHub Worldwide sovereign suite at the updated
              rate of <strong>$49 per month</strong>. Your subscription ID will be saved to your profile and you can
              manage recurring payments anytime via PayPal AutoPay.
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 text-left font-mono text-[11px]">
              <div className="flex justify-between items-center text-neutral-400">
                <span>SDK Endpoint:</span>
                <span className="text-neutral-300 truncate max-w-[240px]">paypal.com/sdk/js (vault=true)</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Monthly Rate:</span>
                <span className="text-amber-300 font-semibold">$49.00 USD</span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Plan ID:</span>
                <span className="text-amber-300 font-semibold">
                  {paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-400">
                <span>Client ID:</span>
                <span className="text-neutral-300 font-mono text-[10px]">
                  {(paypalConfig.clientId || DEFAULT_PAYPAL_CLIENT_ID).slice(0, 14)}...
                </span>
              </div>
            </div>

            {/* PayPal Button */}
            <div className="pt-2">
              <PayPalButton
                planId={paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID}
                planName={premiumTier.name}
                amount={49}
                config={{
                  ...paypalConfig,
                  clientId: paypalConfig.clientId || DEFAULT_PAYPAL_CLIENT_ID,
                  planId: paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID,
                  isConfigured: true,
                }}
                onSuccess={(subId, details) => {
                  onSubscribeSuccess(premiumTier, subId, details);
                }}
                onOpenConfig={onOpenConfig}
              />
            </div>

            <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400 space-y-1">
              <p>
                Manage or cancel your subscription at any time via{' '}
                <a
                  href={PAYPAL_AUTOPAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  <span>paypal.com/myaccount/autopay</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Unlocked Sovereign Features Preview & Simulators */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-serif text-white">Unlocked Sovereign Features</h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {isPremiumActive ? 'FULL ACCESS UNLOCKED' : 'PREVIEW MODE ($49/MO)'}
              </span>
            </div>

            {/* Feature 1: Private Jet Fleet Priority */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Plane className="w-4 h-4 text-amber-400" />
                  <span>24/7 Private Jet Fleet Priority</span>
                </span>
                {isPremiumActive ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Direct access to Gulfstream G650 and Bombardier Global 7500 charters with zero ferry surcharges and 4-hour standby call-out.
              </p>

              {isPremiumActive ? (
                <form onSubmit={handleFlightDispatch} className="pt-2 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={flightOrigin}
                      onChange={(e) => setFlightOrigin(e.target.value)}
                      placeholder="Origin"
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 text-xs"
                    />
                    <input
                      type="text"
                      value={flightDest}
                      onChange={(e) => setFlightDest(e.target.value)}
                      placeholder="Destination"
                      className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Instant Aircraft Position Dispatch</span>
                  </button>
                  {flightDispatched && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Aircraft request received by Maseru Operations Desk (+266 6284 0523 · James Lenka). Tail assigned.</span>
                    </div>
                  )}
                </form>
              ) : (
                <div className="pt-1 text-[11px] text-neutral-500 italic">
                  Subscribe via PayPal at $49/mo to dispatch private jet charters and empty-leg notifications.
                </div>
              )}
            </div>

            {/* Feature 2: Cellular Longevity Panel */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Clinical Epigenetics & Longevity Panel</span>
                </span>
                {isPremiumActive ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Comprehensive Horvath clock biological age testing, full-body MRI, and proprietary senolytic cellular protocols at Clinique La Prairie and Geneva partner labs.
              </p>

              {isPremiumActive && (
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block font-mono">BIO AGE DELTA</span>
                    <span className="text-emerald-400 font-mono font-bold">-4.8 Years</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block font-mono">CELL METRIC</span>
                    <span className="text-neutral-200 font-mono font-semibold">Optimal</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block font-mono">NEXT PANEL</span>
                    <span className="text-amber-400 font-mono">Nov 2026</span>
                  </div>
                </div>
              )}
            </div>

            {/* Feature 3: Closed-Door Summits & Syndicate Dealflow */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Closed-Door Global Summits & Syndicate Dealflow</span>
                </span>
                {isPremiumActive ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Direct accreditation to closed-door roundtables in Davos, Monaco, St. Moritz, and Tokyo alongside international family offices and sovereign principals.
              </p>
            </div>

            {/* Feature 4: Partner Reciprocity */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>VIP Terminal Clearance & Aman Upgrades</span>
                </span>
                {isPremiumActive ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Access to Windsor Suite at London Heathrow, VIP Zurich tarmac transfers, Harrods Penthouse styling, and complimentary upgrades at all Aman properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
