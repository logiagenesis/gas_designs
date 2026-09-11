const SECTORS = [
  {
    title: "Homes",
    body: "Hobs, ovens, heaters and gas water heating, with the cylinder where it is supposed to be rather than where it fits.",
  },
  {
    title: "Kitchens and hospitality",
    body: "Supply sized for the whole line running at once, with isolation an operator can find and reach mid-service.",
  },
  {
    title: "Industry and plant",
    body: "Process burners, ovens and production equipment, with maintenance planned around production rather than against it.",
  },
  {
    title: "Developments",
    body: "Risers, reticulation and per-unit isolation, agreed early enough to actually influence the routes.",
  },
];

export function SectorsGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SECTORS.map((sector) => (
        <div
          key={sector.title}
          className="rounded-xl border border-white/10 bg-graphite/40 p-6"
        >
          <h3 className="type-h3 text-base text-warm-white">{sector.title}</h3>
          <p className="mt-3 text-sm leading-6 text-valve-steel">{sector.body}</p>
        </div>
      ))}
    </div>
  );
}
