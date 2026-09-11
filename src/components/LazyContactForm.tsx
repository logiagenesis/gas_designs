"use client";

import dynamic from "next/dynamic";

/**
 * Defers the contact form bundle on pages where the form is well below the
 * fold. The form pulls in react-hook-form, zod and the resolver — worth about
 * a third of the homepage's JavaScript — and none of it is needed to render or
 * read the page.
 *
 * The placeholder reserves the form's height so nothing shifts when it arrives,
 * and carries a plain link to /contact so the route is reachable even if the
 * chunk never loads.
 */
const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[720px] rounded-xl border border-white/10 bg-carbon-2/40 p-6">
        <p className="type-label text-valve-steel">Loading the enquiry form…</p>
        <p className="mt-3 text-sm leading-6 text-valve-steel">
          If it does not appear,{" "}
          <a
            href="/contact"
            className="text-mist underline decoration-white/30 underline-offset-4"
          >
            use the contact page
          </a>
          .
        </p>
      </div>
    ),
  },
);

export function LazyContactForm() {
  return <ContactForm />;
}
