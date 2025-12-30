import { useState, useEffect } from 'react';

const STORAGE_KEY = 'analyticsConsent';

export function useAnalyticsConsent() {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'true') setConsent(true);
            else if (stored === 'false') setConsent(false);
            else setConsent(null);
        }
    }, []);

    const acceptConsent = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setConsent(true);
    };

    const declineConsent = () => {
        localStorage.setItem(STORAGE_KEY, 'false');
        setConsent(false);
    };

    return {
        consent,
        acceptConsent,
        declineConsent,
    };
}
