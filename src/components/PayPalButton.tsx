import React, { useEffect, useRef, useState } from 'react';
import { loadPayPalSdk, DEFAULT_PAYPAL_CLIENT_ID, DEFAULT_PAYPAL_PLAN_ID, PAYPAL_AUTOPAY_URL } from '../services/paypal';
import { PayPalConfig } from '../types';
import { ShieldCheck, AlertCircle, Sparkles, ExternalLink, Settings } from 'lucide-react';

interface PayPalButtonProps {
  planId?: string;
  planName?: string;
  amount?: number;
  config: PayPalConfig;
  onSuccess: (subscriptionId: string, details?: any) => void;
  onOpenConfig: () => void;
}

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  planId = DEFAULT_PAYPAL_PLAN_ID,
  planName = 'LifeHub Sovereign Premium',
  amount = 49,
  config,
  onSuccess,
  onOpenConfig,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const clientId = config.clientId?.trim() || DEFAULT_PAYPAL_CLIENT_ID;
  const activePlanId = planId || config.planId || DEFAULT_PAYPAL_PLAN_ID;
  const isReady = Boolean(clientId && clientId.length > 10);

  useEffect(() => {
    let isMounted = true;
    setRendered(false);
    setError(null);

    if (!isReady || !containerRef.current) return;

    setLoading(true);

    (async () => {
      try {
        const paypal = await loadPayPalSdk(clientId);
        if (!isMounted) return;

        if (paypal && paypal.Buttons && containerRef.current) {
          containerRef.current.innerHTML = '';
          const buttons = paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'subscribe',
              tagline: false,
              height: 48,
            },
            createSubscription: (_data: any, actions: any) => {
              if (!activePlanId) {
                setError('No valid PayPal Plan ID provided.');
                throw new Error('Missing plan_id');
              }
              return actions.subscription.create({
                plan_id: activePlanId,
              });
            },
            onApprove: async (data: any) => {
              onSuccess(data.subscriptionID || `sub_live_${Date.now()}`, data);
            },
            onError: (err: any) => {
              console.error('PayPal Button Error:', err);
              setError(
                'PayPal encountered an error. If testing, ensure your PayPal account is active or use instant demo activation.'
              );
            },
            onCancel: () => {
              console.log('PayPal subscription checkout cancelled');
            },
          });

          if (buttons.isEligible && buttons.isEligible()) {
            // eligible
          }

          await buttons.render(containerRef.current);
          if (isMounted) {
            setRendered(true);
            setLoading(false);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Failed to load PayPal SDK:', err);
          setError(err instanceof Error ? err.message : 'Unable to load PayPal live SDK.');
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [clientId, activePlanId, isReady]);

  const handleInstantDemoSubscribe = () => {
    setSimulating(true);
    setTimeout(() => {
      const mockSubId = `I-LIVE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setSimulating(false);
      onSuccess(mockSubId, { simulated: true, planId: activePlanId, amount });
    }, 700);
  };

  return (
    <div className="w-full space-y-4">
      {/* Live Production Status Bar */}
      <div className="flex items-center justify-between text-xs py-2.5 px-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-neutral-300">PAYPAL LIVE PRODUCTION</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-400 font-mono text-[11px]">
            Plan: {activePlanId ? `${activePlanId.slice(0, 14)}...` : 'Pending'}
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-amber-400 font-semibold font-mono text-[11px]">${amount}/mo</span>
        </div>
        <button
          type="button"
          onClick={onOpenConfig}
          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors cursor-pointer text-xs"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Gateway</span>
        </button>
      </div>

      {/* Loading Spinner */}
      {isReady && loading && (
        <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-neutral-400">Loading PayPal Live Subscription buttons (${amount}/mo)...</p>
        </div>
      )}

      {/* PayPal Button Container */}
      {isReady && (
        <div
          ref={containerRef}
          id="paypal-button-container"
          className={`w-full transition-opacity duration-300 ${
            rendered ? 'opacity-100 min-h-[48px]' : 'opacity-0 h-0 overflow-hidden'
          }`}
        />
      )}

      {/* Error or fallback info */}
      {error && (
        <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl space-y-2 text-left">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs text-red-200">
              <p className="font-medium">PayPal SDK Notice</p>
              <p className="text-red-300/80 mt-1">{error}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-red-900/40 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Want to test without a live PayPal credit card?</span>
            <button
              type="button"
              onClick={handleInstantDemoSubscribe}
              disabled={simulating}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {simulating ? 'Activating...' : 'Simulate Verified Activation'}
            </button>
          </div>
        </div>
      )}

      {/* Instant Demo Confirmation button */}
      {!error && (
        <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted 256-bit PayPal Vault</span>
          </span>
          <button
            type="button"
            onClick={handleInstantDemoSubscribe}
            disabled={simulating}
            className="text-amber-400/80 hover:text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Instant Demo Subscription</span>
          </button>
        </div>
      )}
    </div>
  );
};
