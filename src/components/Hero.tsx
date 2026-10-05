import React, { useEffect, useState } from 'react';
import { Crown, Plane, Sparkles, Clock, ShieldCheck, ArrowRight, Activity, Building2, PhoneCall, MapPin, Mail, User } from 'lucide-react';
import { PayPalConfig } from '../types';

interface HeroProps {
  onExplorePlans: () => void;
  onNavigateToPremium: () => void;
  onOpenConfig: () => void;
  paypalConfig: PayPalConfig;
}

interface WorldClock {
  city: string;
  time: string;
  flag: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePlans,
  onNavigateToPremium,
  onOpenConfig,
  paypalConfig,
}) => {
  const [clocks, setClocks] = useState<WorldClock[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClocks([
        {
          city: 'Maseru (HQ)',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Maseru', hour: '2-digit', minute: '2-digit' }),
          flag: '🇱🇸 LS',
        },
        {
          city: 'London',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
          flag: 'UK',
        },
        {
          city: 'Zurich',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit' }),
          flag: 'CH',
        },
        {
          city: 'Dubai',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }),
          flag: 'AE',
        },
        {
          city: 'Singapore',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit' }),
          flag: 'SG',
        },
        {
          city: 'New York',
          time: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
          flag: 'US',
        },
        {
          city: 'Tokyo',
          time: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
          flag: 'JP',
        },
      ]);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-10 pb-20 overflow-hidden border-b border-neutral-800/80">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-12 right-1/4 w-[400px] h-[300px] bg-amber-400/5 blur-[100px] pointer-events-none rounded-full" />

      {/* World Clocks & Operations Desks Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="py-2.5 px-4 bg-neutral-900/60 rounded-2xl border border-neutral-800 flex items-center justify-between overflow-x-auto text-xs gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 shrink-0 text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold tracking-wider text-[11px] uppercase text-neutral-300">
                Operations Desks
              </span>
            </div>
            <span className="text-neutral-700">|</span>
            <a
              href="tel:+26662840523"
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-mono font-semibold text-[11px] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Desk: +266 6284 0523</span>
            </a>
          </div>
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto">
            {clocks.map((c) => (
              <div key={c.city} className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-neutral-500 font-mono">{c.flag}</span>
                <span className="text-neutral-300 font-medium text-[11px]">{c.city}</span>
                <span className="font-mono text-[11px] text-amber-400/90">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400/90 py-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-amber-400/60" />
                <span>International Sovereign Syndicate</span>
              </div>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-300 font-mono text-[10px] normal-case bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                Owner: James Lenka (Maseru, Lesotho 🇱🇸)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12]">
              Elevate Your Global Presence & Longevity.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed max-w-2xl font-light">
              LifeHub Worldwide is an international private lifestyle ecosystem. We unite world-class 24/7 concierge,
              private aviation charter priority, cellular longevity optimization, and curated summits across Zurich, London,
              Dubai, and Singapore.
            </p>

            {/* Price announcement badge */}
            <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-amber-500/30 max-w-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="text-neutral-300 font-medium">Premium Access Update</span>
                  <span className="text-neutral-500 mx-1.5">·</span>
                  <span className="text-amber-300 font-semibold">Special Sovereign Rate: $49/month</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onNavigateToPremium}
                className="text-amber-400 hover:text-amber-300 font-mono text-[11px] flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span>View Tier</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onNavigateToPremium}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-neutral-950" />
                <span>Join Premium · $49 / month</span>
              </button>
              <button
                type="button"
                onClick={onExplorePlans}
                className="px-6 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore All Tiers</span>
              </button>
              <button
                type="button"
                onClick={onOpenConfig}
                className="px-4 py-4 bg-neutral-900/40 hover:bg-neutral-850/60 border border-neutral-800/80 rounded-xl text-neutral-400 hover:text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>PayPal Live</span>
              </button>
            </div>

            {/* Security points */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Zero Lock-in · Cancel via PayPal AutoPay</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Instant Digital Sovereign Credentials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Encrypted 24/7 Concierge Hotline</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-amber-500/30 shadow-2xl relative space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-base">LifeHub Sovereign Premium</h3>
                    <p className="text-[11px] text-amber-400/90 font-mono">P-5U2869084J889591SNLAP3DA</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-serif text-white">$49</div>
                  <div className="text-[10px] text-neutral-400 font-mono">per month</div>
                </div>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Plane className="w-3.5 h-3.5 text-amber-400" />
                    <span>Private Aviation</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">Priority fleet positioning & empty-leg routing</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cellular Longevity</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">Horvath clock & Clinique La Prairie network</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Club Reciprocity</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">14 private clubs in London, Zurich & Tokyo</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>24/7 Concierge</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">Direct liaisons with SLA dispatch desks</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToPremium}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Activate Premium Access · $49 / mo</span>
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Direct PayPal Vault Billing</span>
                <span className="text-amber-400/90 font-mono">Immediate Activation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
