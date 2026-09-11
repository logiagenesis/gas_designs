/**
 * Scope bar.
 *
 * Deliberately carries no statistics, no years-in-business, no client count
 * and no credential. Every line restates confirmed scope — the nine service
 * categories and the sectors they cover — because nothing else about the
 * business has been confirmed for publication.
 */
const SCOPE = [
  { label: "Sectors", value: "Residential · Commercial · Industrial" },
  { label: "Work", value: "Installation · Maintenance · Compliance" },
  { label: "Service lines", value: "Nine, from domestic hobs to bulk LPG" },
  { label: "Enquiries", value: "Answered by email, direct" },
];

export function TrustStrip() {
  return (
    <div className="border-t border-t-white/10 bg-carbon-2">
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCOPE.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <dt className="type-label text-valve-steel">{item.label}</dt>
              <dd className="text-sm text-warm-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
