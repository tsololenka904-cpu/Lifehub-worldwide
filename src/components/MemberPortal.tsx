import React, { useEffect, useState } from 'react';
import {
  Crown,
  Plane,
  Activity,
  Send,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  QrCode,
  Sparkles,
  PhoneCall,
  RefreshCw,
  Mail,
  MapPin,
  User,
} from 'lucide-react';
import { MemberProfile, ConciergeRequest, PayPalConfig } from '../types';
import {
  PAYPAL_AUTOPAY_URL,
  submitConciergeRequest,
  fetchConciergeRequests,
} from '../services/paypal';

interface MemberPortalProps {
  member: MemberProfile;
  paypalConfig: PayPalConfig;
  onOpenConfig: () => void;
  onSignOut: () => void;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  member,
  paypalConfig,
  onOpenConfig,
  onSignOut,
}) => {
  const [subTab, setSubTab] = useState<'pass' | 'concierge' | 'billing'>('pass');
  const [requests, setRequests] = useState<ConciergeRequest[]>([]);
  const [category, setCategory] = useState('Private Aviation');
  const [details, setDetails] = useState('');
  const [urgency, setUrgency] = useState('Standard (24h)');
  const [submitting, setSubmitting] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState(false);

  useEffect(() => {
    fetchConciergeRequests().then((reqs) => {
      if (reqs && reqs.length > 0) {
        setRequests(reqs);
      }
    });
  }, []);

  const handleConciergeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    setSubmitting(true);
    try {
      const newReq = await submitConciergeRequest({
        memberId: member.id,
        memberName: member.name,
        category,
        details,
        urgency,
      });
      setRequests((prev) => [newReq, ...prev]);
      setDetails('');
      setSubmitting(false);
      setSubmittedAlert(true);
      setTimeout(() => setSubmittedAlert(false), 3500);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Crown className="w-4 h-4" />
            <span>Sovereign Member Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">
            Welcome, {member.name}
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Member ID: <span className="font-mono text-neutral-300">{member.id}</span> · Tier:{' '}
            <span className="text-amber-400 font-semibold">{member.tier}</span> · Status:{' '}
            <span className="text-emerald-400 font-semibold">{member.status}</span> · Rate:{' '}
            <span className="text-amber-300 font-mono font-semibold">$49/month</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSignOut}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-medium transition-colors cursor-pointer"
          >
            Switch Profile
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 max-w-md">
        <button
          type="button"
          onClick={() => setSubTab('pass')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            subTab === 'pass'
              ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Digital Sovereign Pass
        </button>
        <button
          type="button"
          onClick={() => setSubTab('concierge')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            subTab === 'concierge'
              ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          24/7 Concierge Desk
        </button>
        <button
          type="button"
          onClick={() => setSubTab('billing')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            subTab === 'billing'
              ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          PayPal Billing
        </button>
      </div>

      {/* Tab 1: Digital Sovereign Pass */}
      {subTab === 'pass' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            {/* Holographic Executive Pass Card */}
            <div className="relative w-full max-w-lg mx-auto aspect-[1.586/1] rounded-2xl p-7 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-amber-500/50 shadow-2xl shadow-amber-950/40 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af370a_1px,transparent_1px),linear-gradient(to_bottom,#d4af370a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-400/15 via-transparent to-transparent pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif font-black text-amber-300 text-xs">
                    LH
                  </div>
                  <div>
                    <div className="font-serif font-bold text-white text-xs tracking-widest uppercase">
                      LifeHub Worldwide
                    </div>
                    <div className="text-[9px] text-amber-400/80 uppercase tracking-wider font-mono">
                      Sovereign Pass · $49/mo
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] text-amber-300 font-semibold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{member.status}</span>
                </div>
              </div>

              {/* Chip and Hologram */}
              <div className="relative z-10 py-3 flex items-center justify-between">
                <div className="w-11 h-8 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-100/40 shadow-inner flex flex-col justify-around p-1">
                  <div className="w-full h-[1px] bg-amber-900/40" />
                  <div className="w-full h-[1px] bg-amber-900/40" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                    Tier Privilege
                  </div>
                  <div className="text-base sm:text-lg font-serif font-bold text-amber-300 uppercase tracking-wider">
                    {member.tier}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-2 border-t border-amber-500/20 flex items-end justify-between">
                <div>
                  <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-mono">Holder</div>
                  <div className="text-sm font-semibold text-white tracking-wide">{member.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">ID: {member.id}</div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="text-[9px] text-neutral-400 uppercase tracking-wider font-mono">Valid Thru</div>
                    <div className="text-xs font-mono font-medium text-amber-200">{member.nextBillingDate}</div>
                  </div>
                  <div className="p-1 bg-white rounded">
                    <QrCode className="w-7 h-7 text-black" />
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-lg mx-auto mt-4 flex items-center justify-between text-xs text-neutral-400 px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified in Global System</span>
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                Sub: {member.paypalSubscriptionId || 'I-LIVE-CONFIRMED'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>24/7 Operations Desk Liaison</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  LIVE DESK
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct liaison with Operations Lead & Owner <strong>James Lenka</strong> for priority aviation, medical diagnostics, and executive positioning:
              </p>

              {/* Primary Desk Card */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Headquarters: Maseru, Lesotho 🇱🇸</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">Owner: James Lenka</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-neutral-300 font-mono">Direct Tel:</span>
                  <a
                    href="tel:+26662840523"
                    className="text-amber-400 hover:text-amber-300 font-bold font-mono text-sm tracking-wide transition-colors"
                  >
                    +266 6284 0523
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-neutral-850">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-400" />
                    <span>Email:</span>
                  </span>
                  <a
                    href="mailto:jameslenka84@gmail.com"
                    className="text-neutral-200 hover:text-amber-300 transition-colors truncate max-w-[200px]"
                  >
                    jameslenka84@gmail.com
                  </a>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+26662840523"
                  className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href="https://wa.me/26662840523?text=LifeHub%20Worldwide%20Sovereign%20Concierge%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>WhatsApp / Chat</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Active Vault Protection</span>
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your monthly membership is handled automatically via PayPal Live Subscription at <strong>$49/month</strong>.
                You can update cards or cancel anytime directly in your PayPal dashboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 24/7 Concierge Desk */}
      {subTab === 'concierge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Dispatch Concierge Request</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Our global desks coordinate private flights, medical diagnostics, luxury stays, and private event credentials.
              </p>
            </div>

            <form onSubmit={handleConciergeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Request Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-xl text-neutral-200 text-xs"
                >
                  <option value="Private Aviation">Private Aviation & Fleet Charter</option>
                  <option value="Longevity Consultation">Longevity Protocol & Biomarker Labs</option>
                  <option value="Luxury Residence">Luxury Residence & Private Island</option>
                  <option value="VIP Summit Access">VIP Global Summit & Gala Accreditation</option>
                  <option value="Superyacht Charter">Mediterranean & Caribbean Superyacht</option>
                  <option value="Bespoke Dining">Michelin 3-Star Private Dining Room</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard (24h)', 'Priority (6h)', 'Urgent (1h)'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setUrgency(lvl)}
                      className={`py-2 px-2 text-[11px] rounded-lg border transition-all cursor-pointer ${
                        urgency === lvl
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'bg-neutral-950 border-neutral-800/80 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Request Details & Specifications
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g. Need Bombardier Global 7500 charter for 6 passengers from Zurich Kloten (ZRH) to Dubai Al Maktoum (DWC) on Nov 14th with ground limousine transfers..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-neutral-200 text-xs leading-relaxed placeholder:text-neutral-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !details.trim()}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>Dispatching to Global Desk...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch to Operations Liaison</span>
                  </>
                )}
              </button>

              {submittedAlert && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Request received. Global Operations Desk has assigned a dedicated liaison.</span>
                </div>
              )}
            </form>
          </div>

          {/* Requests History List */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Active & Historical Dispatches</span>
            </h3>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 text-left"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      {req.category === 'Private Aviation' && <Plane className="w-3.5 h-3.5 text-amber-400" />}
                      {req.category === 'Longevity Consultation' && <Activity className="w-3.5 h-3.5 text-amber-400" />}
                      {req.category === 'Luxury Residence' && <Building2 className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{req.category}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{req.details}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
                    <span>ID: {req.id}</span>
                    <span>Urgency: {req.urgency}</span>
                    <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PayPal Billing */}
      {subTab === 'billing' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-bold font-serif text-white">PayPal Subscription Overview</h3>
                <p className="text-xs text-neutral-400">Managed via PayPal Vault Subscription API</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ACTIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="text-neutral-500 block text-[10px]">PAYPAL SUBSCRIPTION ID</span>
                <span className="text-neutral-200 font-medium">
                  {member.paypalSubscriptionId || 'I-LIVE-BW9281X'}
                </span>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="text-neutral-500 block text-[10px]">MONTHLY SUBSCRIPTION RATE</span>
                <span className="text-amber-400 font-semibold font-mono text-sm">$49.00 USD / month</span>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="text-neutral-500 block text-[10px]">NEXT BILLING CYCLE</span>
                <span className="text-neutral-200 font-medium">{member.nextBillingDate}</span>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <span className="text-neutral-500 block text-[10px]">MEMBERSHIP PLAN</span>
                <span className="text-neutral-200 font-medium">{member.tier}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={PAYPAL_AUTOPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Manage in PayPal AutoPay</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onOpenConfig}
                className="w-full sm:flex-1 py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Gateway Configuration</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
