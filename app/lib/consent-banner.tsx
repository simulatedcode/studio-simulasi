'use client';

import { useEffect, useState } from 'react';
import { useAnalyticsConsent } from '@/app/hooks/use-analytics-consent';

export default function ConsentBanner() {
  const { consent, acceptConsent, declineConsent } = useAnalyticsConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if consent has not been set yet (null)
    if (consent === null) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [consent]);

  if (!isVisible) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center p-4 z-9999">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Glass Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-black/30 p-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h3 className="font-bold text-2xl mb-4 bg-linear-to-r from-white to-gray-200/90 bg-clip-text text-transparent">
            We value your privacy
          </h3>

          <p className="mb-8 text-gray-200/90 leading-relaxed text-lg">
            This site uses Google Analytics to improve your experience.
            All data is anonymized and stored securely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={acceptConsent}
              className="flex-1 py-4 px-6 bg-linear-to-r from-studio-500 to-studio-600 hover:from-studio-600 hover:to-studio-700 text-white font-semibold backdrop-blur-sm border border-white/20"
            >
              I agree
            </button>
            <button
              onClick={declineConsent}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 text-white/90 font-semibold  backdrop-blur-sm border border-white/30"
            >
              Decline
            </button>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            You can change your preferences anytime in browser settings.
          </p>
        </div>
      </div>
    </div>

  );
}
