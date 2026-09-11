/**
 * Conditional tag loading.
 *
 * Nothing is injected unless the matching environment variable is set, so the
 * site runs — and builds — perfectly with every analytics variable blank. That
 * blank state is the default.
 */
import Script from "next/script";
import {
  GA_ID,
  GOOGLE_ADS_ID,
  GTM_ID,
  hasGa4,
  hasGoogleAds,
  hasGtm,
} from "@/lib/analytics";

export function Analytics() {
  // gtag.js is shared by GA4 and Google Ads; load it once for whichever is on.
  const gtagAccount = hasGa4 ? GA_ID : hasGoogleAds ? GOOGLE_ADS_ID : "";

  return (
    <>
      {hasGtm && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {!hasGtm && gtagAccount && (
        <>
          <Script
            id="gtag-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagAccount}`}
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${
              hasGa4 ? `gtag('config','${GA_ID}');` : ""
            }${hasGoogleAds ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}`}
          </Script>
        </>
      )}
    </>
  );
}

/** The GTM <noscript> iframe. Rendered first inside <body>, and only for GTM. */
export function AnalyticsNoScript() {
  if (!hasGtm) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
