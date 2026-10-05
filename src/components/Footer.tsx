import React from 'react';
import { Crown, ShieldCheck, ExternalLink, Settings, PhoneCall, Mail, MapPin, User, Heart } from 'lucide-react';
import { PayPalConfig } from '../types';
import { PAYPAL_AUTOPAY_URL } from '../services/paypal';

interface FooterProps {
  onOpenConfig: () => void;
  paypalConfig: PayPalConfig;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfig, paypalConfig }) => {
  return (
    <footer className="bg-black text-neutral-400 text-xs border-t border-neutral-900 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Founder */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif font-black text-amber-300 text-xs">
                LH
              </div>
              <span className="font-serif font-bold text-white text-base tracking-wide">
                LIFEHUB WORLDWIDE
              </span>
            </div>
            <p className="text-neutral-400 font-light leading-relaxed">
              Global executive membership ecosystem uniting 24/7 concierge, private aviation fleet dispatch,
              cellular longevity clinics, and closed-door summits.
            </p>
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Owner: James Lenka</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Made from Maseru, Lesotho 🇱🇸</span>
              </div>
            </div>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-amber-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Premium Access: $49/mo Live Production</span>
            </div>
          </div>

          {/* Col 2: Operations Desks */}
          <div className="space-y-3 font-mono">
            <h4 className="font-serif font-semibold text-white uppercase tracking-wider text-xs">
              Operations Desks
            </h4>
            <div className="p-3 bg-neutral-950 rounded-xl border border-amber-500/20 space-y-2">
              <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Headquarters & Direct Hotline
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <a href="tel:+26662840523" className="hover:text-amber-300 transition-colors">
                  +266 6284 0523
                </a>
              </div>
              <div className="text-[11px] text-neutral-300 flex items-center gap-1">
                <Mail className="w-3 h-3 text-amber-400" />
                <a href="mailto:jameslenka84@gmail.com" className="hover:text-amber-300 transition-colors truncate">
                  jameslenka84@gmail.com
                </a>
              </div>
              <div className="text-[10px] text-neutral-500 pt-0.5">
                Maseru, Lesotho · Operations Lead
              </div>
            </div>
            <ul className="space-y-1.5 text-[11px] pt-1">
              <li className="text-neutral-400 flex items-center justify-between">
                <span>International Desk:</span>
                <span className="text-neutral-300">+266 6284 0523</span>
              </li>
              <li className="text-neutral-400 flex items-center justify-between">
                <span>Regional Routing:</span>
                <span className="text-neutral-300">Southern Africa / Global</span>
              </li>
              <li className="text-neutral-400 flex items-center justify-between">
                <span>Direct Support:</span>
                <span className="text-amber-400">James Lenka</span>
              </li>
            </ul>
          </div>

          {/* Col 3: PayPal Vault Subscriptions */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-white uppercase tracking-wider text-xs">
              Subscription Management
            </h4>
            <p className="text-neutral-400 font-light leading-relaxed text-[11px]">
              Recurring billing is powered directly by PayPal Vault Subscriptions at <strong>$49/month</strong>.
              Members can view billing cycles, update cards, or cancel with zero penalty anytime.
            </p>
            <div className="pt-1">
              <a
                href={PAYPAL_AUTOPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
              >
                <span>paypal.com/myaccount/autopay</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="pt-2 text-[11px] text-neutral-400">
              Direct assistance: <a href="mailto:jameslenka84@gmail.com" className="text-amber-300 hover:underline">jameslenka84@gmail.com</a>
            </div>
          </div>

          {/* Col 4: Gateway Configuration */}
          <div className="space-y-3">
            <h4 className="font-serif font-semibold text-white uppercase tracking-wider text-xs">
              Gateway Configuration
            </h4>
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">ENV:</span>
                <span className="text-emerald-400 uppercase">{paypalConfig.env} (Live)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Rate:</span>
                <span className="text-amber-300">$49.00 USD/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Desk Tel:</span>
                <span className="text-neutral-300">+26662840523</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Vault:</span>
                <span className="text-neutral-300">Active</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenConfig}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] transition-colors cursor-pointer font-medium"
            >
              <Settings className="w-3 h-3" />
              <span>Inspect PayPal Live Settings</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between text-neutral-400 gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} LifeHub Worldwide.</span>
            <span>Owner: <strong className="text-white">James Lenka</strong>.</span>
            <span>Made with precision in <strong className="text-white">Maseru, Lesotho 🇱🇸</strong>.</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 flex-wrap">
            <span>Operations: <a href="tel:+26662840523" className="text-amber-400 font-mono hover:underline">+26662840523</a></span>
            <span>·</span>
            <span><a href="mailto:jameslenka84@gmail.com" className="text-neutral-300 hover:underline">jameslenka84@gmail.com</a></span>
            <span>·</span>
            <span className="text-amber-400/90 font-mono">Premium $49/mo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
