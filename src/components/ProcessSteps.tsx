const STEPS = [
  {
    n: "01",
    title: "Enquiry",
    body: "Tell us the appliances, the site and what is already installed. Photographs of the existing setup save a visit.",
  },
  {
    n: "02",
    title: "Site assessment",
    body: "We look at routes, ventilation, clearances and where the gas has to stand. Anything beyond an appliance swap is quoted after this, not before.",
  },
  {
    n: "03",
    title: "Design and quote",
    body: "Supply sized for the full load, isolation planned, and a written scope that says what is included and what is not.",
  },
  {
    n: "04",
    title: "Installation",
    body: "Pipework run, appliances connected, isolation and shut-off fitted where they can actually be reached in a hurry.",
  },
  {
    n: "05",
    title: "Test and hand over",
    body: "Pressure and soundness testing, then documentation and a walk-through of how to isolate the installation.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
      {STEPS.map((step) => (
        <li key={step.n} className="flex flex-col gap-3 bg-carbon p-6">
          <span className="type-label text-signal-yellow">{step.n}</span>
          <h3 className="type-h3 text-base text-warm-white">{step.title}</h3>
          <p className="text-sm leading-6 text-valve-steel">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
