import React, { useState } from 'react';
import { Crown, Check, Sparkles, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { MembershipTier, PayPalConfig } from '../types';
import { PayPalButton } from './PayPalButton';
import { PAYPAL_AUTOPAY_URL, DEFAULT_PAYPAL_PLAN_ID } from '../services/paypal';

interface PricingSectionProps {
  paypalConfig: PayPalConfig;
  onSubscribeSuccess: (tier: MembershipTier, subscriptionId: string, details?: any) => void;
  onOpenConfig: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  paypalConfig,
  onSubscribeSuccess,
  onOpenConfig,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTierId, setSelectedTierId] = useState<string>('lh_global_elite');

  const tiers: MembershipTier[] = [
    {
      id: 'lh_executive',
      name: 'Executive Member',
      subtitle: 'Global digital access, lifestyle perks & executive community',
      priceMonthly: 19,
      priceAnnual: 190,
      planId: paypalConfig.planId ? `${paypalConfig.planId}_EXEC` : 'P-EXEC-MONTHLY',
      allocation: 'Open Enrollment',
      features: [
        'Global Sovereign Member Directory',
        'Concierge Lifestyle Desk (48-hr response)',
        'Partner Privileges (Aman, NetJets, Clinique)',
        'Quarterly Virtual Longevity Briefings',
        'Standard Event Ticketing Access',
      ],
    },
    {
      id: 'lh_global_elite',
      name: 'LifeHub Sovereign Premium',
      subtitle: 'Our signature tier linked to your live PayPal Subscription Plan',
      priceMonthly: 49,
      priceAnnual: 490,
      planId: paypalConfig.planId || DEFAULT_PAYPAL_PLAN_ID,
      popular: true,
      allocation: 'Signature Allocation · Limited Worldwide',
      features: [
        '24/7 Dedicated Private Lifestyle Liaison',
        'Private Jet Fleet Priority & Empty-Leg Dispatch',
        'Epigenetic Age Biomarker Clinic Reciprocity',
        'VIP Access to Davos & Monaco Global Summits',
        'Private Club Reciprocity across 14 Capitals',
        'Complimentary Suite Upgrades at Luxury Partners',
        'Direct PayPal Live Vault Billing ($49/month)',
      ],
    },
    {
      id: 'lh_founders_circle',
      name: 'Founders Circle',
      subtitle: 'Sovereign family office network & bespoke executive positioning',
      priceMonthly: 199,
      priceAnnual: 1990,
      planId: paypalConfig.planId ? `${paypalConfig.planId}_FOUNDER` : 'P-FOUNDERS-LIVE',
      allocation: 'By Invitation / Vetting',
      features: [
        'Direct Liaison with Managing Partner',
        'Guaranteed 1-hour Jet Positioning SLA',
        'Annual Private Island Retreat in the Grenadines',
        'Family Office Syndicate Dealflow Access',
        'Bespoke Longevity Medical Concierge Retainer',
        'Full Guest Credential for Spouse & Executive Associate',
      ],
    },
  ];

  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[1];
  const activePrice = billingCycle === 'monthly' ? selectedTier.priceMonthly : selectedTier.priceAnnual;

  return (
    <section id="membership-section" className="py-20 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Crown className="w-3.5 h-3.5" />
            <span>Sovereign Membership Privileges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Curated Global Membership Tiers
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Subscribed securely via PayPal Live Vault Billing. All memberships include instant digital credentials,
            concierge access, and partner reciprocity.
          </p>

          {/* Special price update callout */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Premium Access Updated to $49/month (formerly $499/mo)</span>
          </div>

          {/* Billing cycle toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Annual Privileges</span>
                <span className="text-[10px] text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30">
                  Save 2 Months
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {tiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnual;
            const period = billingCycle === 'monthly' ? '/ month' : '/ year';

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer text-left border ${
                  isSelected
                    ? 'bg-neutral-900/90 border-amber-500/80 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-neutral-950" />
                    <span>Signature Sovereign Tier · $49/mo</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-white">{tier.name}</h3>
                      <p className="text-[11px] text-amber-400/80 font-mono mt-0.5">{tier.allocation}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px] font-light">
                    {tier.subtitle}
                  </p>

                  <div className="py-2 border-y border-neutral-800/80 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-serif text-white">${price}</span>
                    <span className="text-xs text-neutral-400 font-mono">{period}</span>
                    {tier.popular && billingCycle === 'monthly' && (
                      <span className="text-[11px] text-neutral-500 line-through ml-auto font-mono">
                        $499/mo
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                      Privileges Included:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="font-light">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800">
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 shadow-md'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                    }`}
                  >
                    <span>{isSelected ? 'Selected Tier' : 'Select Plan'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Plan PayPal Checkout Widget */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-neutral-900/90 border border-amber-500/40 shadow-2xl relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Live PayPal Subscription Gateway
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-0.5">
                {selectedTier.name}
              </h3>
            </div>
            <div className="sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
                ${activePrice}
              </div>
              <div className="text-[11px] text-neutral-400 font-sans">
                {billingCycle === 'monthly' ? '/ month' : '/ year'}
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-light text-left">
            Complete your subscription via the official PayPal live production gateway.
            Your membership activates immediately and your digital pass will be synced to your profile.
          </p>

          {/* PayPal Plan details block */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 text-left font-mono text-[11px]">
            <div className="flex justify-between items-center text-neutral-400">
              <span>Selected Tier:</span>
              <span className="text-neutral-200 font-medium">{selectedTier.name}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>Billed Amount:</span>
              <span className="text-amber-300 font-semibold font-mono">
                ${activePrice} USD {billingCycle === 'monthly' ? '/ month' : '/ year'}
              </span>
            </div>
            <div className="flex justify-between items-center text-neutral-400">
              <span>PayPal Plan ID:</span>
              <span className="text-neutral-300 truncate max-w-[240px] font-mono">
                {selectedTier.planId}
              </span>
            </div>
          </div>

          {/* Interactive PayPal Button */}
          <div className="pt-2">
            <PayPalButton
              planId={selectedTier.planId}
              planName={selectedTier.name}
              amount={activePrice}
              config={paypalConfig}
              onSuccess={(subscriptionId, details) => {
                onSubscribeSuccess(selectedTier, subscriptionId, details);
              }}
              onOpenConfig={onOpenConfig}
            />
          </div>

          {/* AutoPay cancellation info */}
          <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400 space-y-1">
            <p>
              Manage or cancel your subscription at any time with zero penalty via{' '}
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
    </section>
  );
};
