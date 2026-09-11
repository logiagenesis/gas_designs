/**
 * Homepage FAQ.
 *
 * Every answer here is either general safety practice or a description of how
 * the work is carried out. None of them asserts a credential, a registration
 * number, a response time, an availability window or a service area, because
 * none of those is confirmed.
 */
export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export const FAQS: readonly Faq[] = [
  {
    question: "What is a gas Certificate of Compliance?",
    answer:
      "It is a document recording that a gas installation was inspected and found to meet the applicable standards on the day it was tested. It covers the installation itself — the pipework, the connections, the isolation and the appliances as they are installed — rather than the appliances as products.",
  },
  {
    question: "When is a Certificate of Compliance usually needed?",
    answer:
      "Most commonly when a property changes hands, when an insurer asks for one, and after any new installation or change to an existing one. If you have altered an installation, added an appliance or moved a cylinder, the existing certificate no longer describes what is actually there.",
  },
  {
    question: "What should I do if I smell gas?",
    answer:
      "Close the cylinder or main isolation valve, open doors and windows, and leave the area ventilated. Do not operate electrical switches, appliances or anything that could create a spark, and do not try to trace the leak yourself. Once the supply is isolated and the space is ventilated, call a gas installer to find and repair the fault.",
  },
  {
    question: "How often should a gas installation be inspected?",
    answer:
      "It depends on how hard the installation works. A domestic hob is a different proposition from a commercial kitchen running every service. We agree an inspection interval with you based on the installation and its duty, and a certificate is in any case re-issued after changes to the installation.",
  },
  {
    question: "Do you work on homes as well as commercial and industrial sites?",
    answer:
      "Yes. The work spans residential installations, commercial kitchen systems, industrial plant, bulk LPG and developments. The engineering discipline is the same in each case — size the supply for the real load, make isolation obvious, and prove the installation holds pressure before it is handed over.",
  },
  {
    question: "What do you need from me to quote?",
    answer:
      "The appliances you want to run, where the gas has to get to, and what is already installed if anything. Photographs of the existing setup and the appliance data plates help. For anything beyond a straightforward appliance swap, the quote follows a site visit rather than preceding it.",
  },
];
