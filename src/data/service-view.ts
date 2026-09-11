import type { Service, ServiceIconKey } from "@/data/services";

/**
 * The subset of a service that is safe to hand to a client component.
 *
 * A Server Component that passes a whole `Service` into a client component
 * serialises every field of it into the page's flight payload — including
 * `needsConfirmation`, which exists for the client's review and not for the
 * public. This view is what crosses that boundary instead.
 */
export interface ServiceCardView {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly bullets: readonly [string, string, string];
  readonly iconKey: ServiceIconKey;
}

export function toCardView(service: Service): ServiceCardView {
  return {
    title: service.title,
    slug: service.slug,
    summary: service.summary,
    bullets: service.bullets,
    iconKey: service.iconKey,
  };
}
