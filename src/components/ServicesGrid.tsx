import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { toCardView } from "@/data/service-view";

/**
 * The nine service tiles.
 *
 * LAYOUT CONTRACT: exactly three columns and three rows from 1024px up — no
 * masonry, no four-column variant, no 3-3-2 or 3-3-1 remainder. `SERVICES` is
 * typed as a nine-tuple, so the row count cannot drift without a type error,
 * and `auto-rows-fr` keeps every row exactly the same height.
 */
export function ServicesGrid({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3 lg:gap-6">
      {SERVICES.map((service) => (
        <li key={service.slug} className="h-full">
          <ServiceCard service={toCardView(service)} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
