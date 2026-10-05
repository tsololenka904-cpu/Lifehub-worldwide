import React from 'react';
import { Crown, Plane, Activity, Sparkles, Building2, Compass, ShieldCheck } from 'lucide-react';
import { PartnerPrivilege } from '../types';

export const PartnersSection: React.FC = () => {
  const partners: (PartnerPrivilege & { icon: React.ElementType })[] = [
    {
      name: 'Aman Resorts & Residences',
      category: 'Ultra-Luxury Hospitality',
      perk: 'Complimentary villa upgrades, $300 wellness credits & private airport transfers across all 35 worldwide properties.',
      icon: Crown,
      locations: 'Venice, Turks & Caicos, Tokyo, Kyoto, Amanzoe, Courchevel',
    },
    {
      name: 'NetJets Global Aviation',
      category: 'Private Jet Fleet',
      perk: 'Guaranteed aircraft positioning with 4-hour call-out, zero ferry surcharges, and customized gourmet catering.',
      icon: Plane,
      locations: 'Worldwide Fleet (Bombardier Global 7500, Gulfstream G650, Citation Latitude)',
    },
    {
      name: 'Clinique La Prairie',
      category: 'Cellular Longevity & Health',
      perk: 'Priority admission to proprietary Revitalisation & Epigenetic Longevity protocols on Lake Geneva.',
      icon: Activity,
      locations: 'Montreux, Switzerland & Global Longevity Hubs',
    },
    {
      name: 'Harrods Private Penthouse',
      category: 'Private Styling & Fine Jewels',
      perk: 'Exclusive access to the Private Shopping Penthouse, bespoke sourcing of rare horology & museum-grade jewels.',
      icon: Sparkles,
      locations: 'Knightsbridge, London',
    },
    {
      name: 'Four Seasons Private Retreats',
      category: 'Private Villas & Islands',
      perk: 'Preferential buyout arrangements, dedicated private chefs, and personalized superyacht excursions.',
      icon: Building2,
      locations: 'Seychelles, Bora Bora, Maui, St. Jean Cap Ferrat',
    },
    {
      name: 'Singita Safari Sanctuaries',
      category: 'Eco-Luxury Conservation',
      perk: 'Complimentary private bush airstrip clearance, private ranger guide, and premium cellar wine tastings.',
      icon: Compass,
      locations: 'Kruger National Park, Serengeti, Volcanoes NP (Rwanda)',
    },
  ];

  return (
    <section className="py-20 bg-[#08080a] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Reciprocity & Privileges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Exclusive Partner Alliances
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Every LifeHub Worldwide subscription includes reciprocal VIP privileges with our vetted global network of
            luxury hospitality, aviation, and longevity institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all text-left space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    {partner.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed font-light">
                    {partner.perk}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="truncate max-w-[240px] font-mono text-neutral-500">
                    {partner.locations}
                  </span>
                  <span className="text-amber-400 font-medium shrink-0">Reciprocal VIP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
