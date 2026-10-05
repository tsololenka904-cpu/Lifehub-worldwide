import React from 'react';
import { Crown, Sparkles, User, Settings, PhoneCall } from 'lucide-react';
import { MemberProfile, PayPalConfig } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  paypalConfig: PayPalConfig;
  onOpenPayPalConfig: () => void;
  activeMember: MemberProfile | null;
  onToggleMemberPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  paypalConfig,
  onOpenPayPalConfig,
  activeMember,
  onToggleMemberPortal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-neutral-850 border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab('overview')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-neutral-900 to-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-black text-sm tracking-widest shadow-md shadow-amber-950/20 group-hover:border-amber-400 transition-colors">
            LH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-white">
                LIFEHUB
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                WORLDWIDE
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono tracking-wider">
              SOVEREIGN MOBILITY & LONGEVITY
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-wide">
          <button
            type="button"
            onClick={() => onSelectTab('overview')}
            className={`transition-colors py-1 cursor-pointer font-medium tracking-wide ${
              currentTab === 'overview'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('premium')}
            className={`transition-colors py-1 cursor-pointer font-medium tracking-wide flex items-center gap-1.5 ${
              currentTab === 'premium'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'text-neutral-300 hover:text-amber-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Premium Access</span>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/40">
              $49/mo
            </span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('membership')}
            className={`transition-colors py-1 cursor-pointer font-medium tracking-wide ${
              currentTab === 'membership'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Plans
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('partners')}
            className={`transition-colors py-1 cursor-pointer font-medium tracking-wide ${
              currentTab === 'partners'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Partner Privileges
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('calendar')}
            className={`transition-colors py-1 cursor-pointer font-medium tracking-wide ${
              currentTab === 'calendar'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Global Summits
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Operations Desk Direct Phone */}
          <a
            href="tel:+26662840523"
            title="Direct Operations Hotline (Maseru HQ · James Lenka)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900/80 hover:bg-neutral-800 text-amber-300 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-mono transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span className="hidden xl:inline">Desk:</span>
            <span>+266 6284 0523</span>
          </a>

          {/* PayPal Live Gateway Quick Status */}
          <button
            type="button"
            onClick={onOpenPayPalConfig}
            title="Inspect PayPal Live Gateway Settings"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 rounded-xl text-xs font-mono transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="hidden sm:inline">PayPal</span>
            <span className="text-[10px] text-amber-400/90 uppercase font-mono">Live</span>
            <Settings className="w-3 h-3 text-neutral-500 ml-0.5" />
          </button>

          {/* Member Portal Access */}
          <button
            type="button"
            onClick={onToggleMemberPortal}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              activeMember
                ? 'bg-neutral-900 border-amber-500/50 text-amber-300 hover:bg-neutral-850'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">
              {activeMember ? activeMember.name.split(' ')[0] : 'Member Portal'}
            </span>
            {activeMember && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => onSelectTab('premium')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-lg shadow-amber-950/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
            <span>Join Premium · $49/mo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
