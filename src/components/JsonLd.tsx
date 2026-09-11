/**
 * Emits structured data.
 *
 * Callers are responsible for not passing unconfirmed facts: schema that
 * asserts a business detail the client has not confirmed is worse than no
 * schema at all, which is why LocalBusiness and ContactPoint are gated on
 * `CAN_EMIT_LOCAL_BUSINESS_SCHEMA` in site-config.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
