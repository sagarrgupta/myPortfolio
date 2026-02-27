/**
 * Google Analytics event tracking. Safe to call anywhere; no-ops when gtag isn't loaded (e.g. no GA_MEASUREMENT_ID).
 */

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export type GAEventParams = {
  button_name?: string;
  button_location?: string;
  link_url?: string;
  link_text?: string;
  [key: string]: string | number | boolean | undefined;
};

/**
 * Send a custom event to Google Analytics (e.g. button clicks).
 * Only runs in the browser when the Google tag is loaded.
 */
export function trackEvent(
  eventName: string,
  eventParams?: GAEventParams
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, eventParams);
}
