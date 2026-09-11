/**
 * GAS DESIGNS — ANALYTICS EVENTS
 *
 * PRIVACY RULE: no personal information is ever sent to analytics. Only the
 * event name and a small, closed set of non-identifying parameters are pushed.
 * Form field *values* — name, phone, email, message — never leave the server.
 *
 * Every call is a no-op when no tag is configured, so the site behaves
 * identically with all analytics environment variables blank.
 */

/** The closed set of events the site reports. */
export type AnalyticsEvent =
  | "cta_primary_click"
  | "cta_secondary_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "form_start"
  | "form_validation_error"
  | "form_success"
  | "service_card_click"
  | "thank_you_view";

/**
 * Non-identifying event parameters only.
 * `location` is a page region such as "header" or "hero".
 * `service` is a service slug. `fields` is a list of field *names* that failed
 * validation — never the values the visitor typed.
 */
export interface AnalyticsParams {
  location?: string;
  service?: string;
  fields?: string[];
}

interface DataLayerWindow extends Window {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? "";

/** GTM takes precedence; GA4 only loads directly when GTM is absent. */
export const hasGtm = GTM_ID.length > 0;
export const hasGa4 = !hasGtm && GA_ID.length > 0;
export const hasGoogleAds = GOOGLE_ADS_ID.length > 0;
export const hasAnyTag = hasGtm || hasGa4 || hasGoogleAds;

/**
 * Reports an event to whichever tag is configured. Safe to call during SSR
 * and safe to call when nothing is configured.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const w = window as DataLayerWindow;
  const payload: Record<string, unknown> = { event };
  if (params.location) payload.location = params.location;
  if (params.service) payload.service = params.service;
  if (params.fields?.length) payload.fields = params.fields.join(",");

  if (hasGtm) {
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(payload);
    return;
  }

  if (typeof w.gtag === "function") {
    const { event: _omit, ...rest } = payload;
    void _omit;
    w.gtag("event", event, rest);
  }
}

/**
 * Reports a Google Ads conversion. Only fires when both the Ads account and a
 * conversion label are configured.
 */
export function trackAdsConversion(): void {
  if (typeof window === "undefined") return;
  if (!hasGoogleAds || !GOOGLE_ADS_CONVERSION_LABEL) return;

  const w = window as DataLayerWindow;
  if (typeof w.gtag !== "function") return;

  w.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
}
