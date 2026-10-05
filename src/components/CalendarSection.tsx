import React, { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle2, Crown, Sparkles } from 'lucide-react';
import { SummitEvent } from '../types';

export const CalendarSection: React.FC = () => {
  const [rsvpState, setRsvpState] = useState<Record<string, boolean>>({});

  const events: SummitEvent[] = [
    {
      id: 'evt_davos_2026',
      title: 'Sovereign Wealth & Longevity Summit',
      location: 'Davos, Switzerland · Steigenberger Grandhotel',
      date: 'Jan 18–22, 2026',
      category: 'Summit',
      capacity: '60 Sovereign Delegates',
      status: 'Exclusive',
      description:
        'Closed-door sessions on cross-border family office architecture, preventive cellular medicine, and deep-tech longevity co-investments.',
    },
    {
      id: 'evt_st_moritz_2026',
      title: 'Winter Alpine Wellness & Epigenetics Retreat',
      location: "St. Moritz, Switzerland · Badrutt's Palace",
      date: 'Feb 12–16, 2026',
      category: 'Retreat',
      capacity: '35 Members',
      status: 'Open',
      description:
        'High-altitude cryotherapy, personalized metabolic profiling with Swiss clinicians, and private ski hosting in Corviglia.',
    },
    {
      id: 'evt_monaco_2026',
      title: 'Monaco Grand Prix Superyacht Reception',
      location: 'Port Hercules, Monaco · 72m Sovereign Vessel',
      date: 'May 22–25, 2026',
      category: 'Gala',
      capacity: '80 Guests',
      status: 'Waitlist',
      description:
        'Trackside berth with uninterrupted view of the Nouvelle Chicane, private tender service, and Michelin-starred culinary salon.',
    },
    {
      id: 'evt_tokyo_2026',
      title: 'Asia-Pacific Cellular Longevity Symposium',
      location: 'Tokyo, Japan · Aman Tokyo & Ginza Labs',
      date: 'Oct 8–11, 2026',
      category: 'Symposium',
      capacity: '50 Members',
      status: 'Open',
      description:
        'Briefings on Japanese regenerative stem-cell research, senolytic therapies, and private dining with master kaiseki artisans.',
    },
  ];

  const toggleRsvp = (id: string) => {
    setRsvpState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-[#08080a] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>2026 Sovereign Agenda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Summits & Private Gatherings
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Invitation-only retreats bringing together founders, sovereign families, and visionary longevity researchers across the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evt) => {
            const isRsvpd = Boolean(rsvpState[evt.id]);
            return (
              <div
                key={evt.id}
                className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all text-left space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 flex items-center gap-1 text-[11px]">
                      <Users className="w-3 h-3 text-neutral-500" />
                      {evt.capacity}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {evt.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-serif">{evt.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {evt.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {evt.location}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-light">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Complimentary VIP Accreditation for Members
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRsvp(evt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isRsvpd
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    {isRsvpd ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Accredited</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Request Access</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
