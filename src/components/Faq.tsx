import { FAQS } from "@/data/faqs";

/**
 * Native <details> accordion: keyboard operable, screen-reader friendly and
 * searchable in-page without any JavaScript.
 */
export function Faq() {
  return (
    <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
      {FAQS.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="type-h3 text-base text-warm-white lg:text-lg">
              {faq.question}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-signal-yellow transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true" focusable="false">
                <path
                  d="M8 2v12M2 8h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="type-body measure mt-4 pr-10 text-mist">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
