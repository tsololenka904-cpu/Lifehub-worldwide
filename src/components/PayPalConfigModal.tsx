import React, { useState } from 'react';
import { Settings, X, ShieldCheck, RefreshCw, Check, Sparkles, ExternalLink } from 'lucide-react';
import { PayPalConfig } from '../types';
import {
  DEFAULT_PAYPAL_CLIENT_ID,
  DEFAULT_PAYPAL_PLAN_ID,
  PAYPAL_AUTOPAY_URL,
  saveLocalConfigOverride,
  clearLocalConfigOverride,
} from '../services/paypal';

interface PayPalConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PayPalConfig;
  onUpdateConfig: (newConfig: PayPalConfig) => void;
}

export const PayPalConfigModal: React.FC<PayPalConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [env, setEnv] = useState<'production' | 'sandbox'>(config.env || 'production');
  const [clientId, setClientId] = useState(config.clientId || DEFAULT_PAYPAL_CLIENT_ID);
  const [planId, setPlanId] = useState(config.planId || DEFAULT_PAYPAL_PLAN_ID);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PayPalConfig = {
      ...config,
      env,
      clientId: clientId.trim() || DEFAULT_PAYPAL_CLIENT_ID,
      planId: planId.trim() || DEFAULT_PAYPAL_PLAN_ID,
      isConfigured: true,
      isProduction: env === 'production',
      monthlyPrice: 49,
      currency: 'USD',
    };
    saveLocalConfigOverride(updated);
    onUpdateConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    clearLocalConfigOverride();
    const defaults: PayPalConfig = {
      ...config,
      env: 'production',
      clientId: DEFAULT_PAYPAL_CLIENT_ID,
      planId: DEFAULT_PAYPAL_PLAN_ID,
      isConfigured: true,
      isProduction: true,
      monthlyPrice: 49,
      currency: 'USD',
    };
    setEnv('production');
    setClientId(DEFAULT_PAYPAL_CLIENT_ID);
    setPlanId(DEFAULT_PAYPAL_PLAN_ID);
    onUpdateConfig(defaults);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif tracking-wide">
                PayPal Integration Hub
              </h3>
              <p className="text-xs text-neutral-400">
                Live Production Configuration for LifeHub Worldwide
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSave} className="py-6 space-y-6">
          {/* Target Environment */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Target Environment
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-neutral-900 rounded-lg border border-neutral-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setEnv('production')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    env === 'production'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Production (Live)
                </button>
                <button
                  type="button"
                  onClick={() => setEnv('sandbox')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    env === 'sandbox'
                      ? 'bg-neutral-700 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sandbox (Testing)
                </button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Active setting: <code className="text-amber-300 font-mono">PAYPAL_ENV = {env}</code>.
              Subscriptions charge live credit cards or PayPal balances using PayPal Vault Subscriptions.
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 bg-neutral-950 rounded-xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Active Premium Subscription Rate</div>
              <div className="text-xs text-neutral-400 mt-0.5">Updated to $49/month executive pricing</div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold font-mono text-amber-400">$49.00 USD</span>
              <span className="text-xs text-neutral-400 block font-mono">/ month</span>
            </div>
          </div>

          {/* Input: Client ID */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                PAYPAL_CLIENT_ID (Live Client ID)
              </label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="e.g. BAAxCSTlNyp4..."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-neutral-200 text-xs font-mono placeholder:text-neutral-600 transition-colors"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Found under REST API apps in your PayPal Developer dashboard.
              </span>
            </div>

            {/* Input: Plan ID */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase tracking-wider">
                PAYPAL_PLAN_ID (Live Subscription Plan ID)
              </label>
              <input
                type="text"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                placeholder="e.g. P-5U2869084J889591SNLAP3DA"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-neutral-200 text-xs font-mono placeholder:text-neutral-600 transition-colors"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                The recurring billing plan configured in PayPal Subscriptions products ($49/month).
              </span>
            </div>
          </div>

          {/* AutoPay Management link */}
          <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-xs text-neutral-400 flex items-center justify-between">
            <span>Customer AutoPay portal:</span>
            <a
              href={PAYPAL_AUTOPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <span>paypal.com/myaccount/autopay</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-neutral-800">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-neutral-950" />
                  <span>Configuration Updated!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full sm:w-auto py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium text-xs rounded-xl border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Official Defaults</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
