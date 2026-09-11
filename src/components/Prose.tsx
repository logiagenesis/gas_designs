/**
 * Shared long-form type treatment for the legal pages.
 *
 * Links inside a paragraph are underlined, not merely recoloured. Colour alone
 * is not a sufficient distinction — it fails WCAG 1.4.1 and is invisible to
 * anyone who cannot separate the two hues.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 flex flex-col gap-5 text-mist [&>h2]:mt-7 [&>h2]:text-xl [&>h2]:text-warm-white [&>p]:text-base [&>p]:leading-7 [&_a]:text-warm-white [&_a]:underline [&_a]:decoration-signal-yellow [&_a]:decoration-2 [&_a]:underline-offset-4">
      {children}
    </div>
  );
}
