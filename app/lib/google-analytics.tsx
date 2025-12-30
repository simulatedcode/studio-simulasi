'use client';

import Script from 'next/script';
import { useAnalyticsConsent } from '@/app/hooks/use-analytics-consent';
import { GA_TRACKING_ID } from './gtag';

export default function GoogleAnalytics() {
  const { consent } = useAnalyticsConsent();

  // Don't render anything if there's no consent or no tracking ID
  if (!consent || !GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
