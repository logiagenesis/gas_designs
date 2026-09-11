/** Consistent section rhythm and a shared heading treatment. */
export function Section({
  id,
  className = "",
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-t-white/10 py-16 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  intro,
  id,
  as: Tag = "h2",
}: {
  label?: string;
  title: string;
  intro?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-3xl">
      {label && <p className="type-label text-signal-yellow">{label}</p>}
      <Tag id={id} className={`type-h2 text-warm-white ${label ? "mt-4" : ""}`}>
        {title}
      </Tag>
      {intro && <p className="type-body measure mt-5 text-mist">{intro}</p>}
    </div>
  );
}
