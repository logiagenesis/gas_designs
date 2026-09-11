# Content Strategy

## 1. Position

**Gas Designs sells proof, not promises.**

Every business in this trade claims to be professional, reliable and trusted.
Those words are free, so they persuade nobody. The content strategy is to say
specific, checkable things instead — what gets calculated, where isolation goes,
what gets tested, what gets written down. Specifics are expensive to fake, which
is precisely why they work.

This was reinforced by a constraint rather than chosen in spite of one. With no
credentials, no project photography and no testimonials confirmed for
publication, the usual trust signals were unavailable. What remained was
describing the work accurately — and that turned out to be the stronger play.

---

## 2. Voice

Direct · premium · technical but understandable · safety-first · minimal ·
confident.

**What this sounds like in practice**

| Instead of | Write |
| --- | --- |
| "We pride ourselves on quality workmanship" | "Every installation is pressure tested before it is handed over, and what was tested is written down." |
| "Fast, friendly, professional service" | "The quote follows the site visit rather than preceding it, because a price given before anyone has looked at the routes is a guess." |
| "Fully qualified experts you can trust" | *(nothing — no credential is confirmed, so no credential is claimed)* |
| "Contact us today for a free quote!" | "Tell us what you need running." |

**Rules**

- No exclamation marks.
- No "we pride ourselves", "cutting-edge", "state-of-the-art", "one-stop shop",
  "peace of mind", "hassle-free", "industry-leading".
- No availability, credential or geographic claim that is not confirmed.
- Say the useful thing first. Cut the run-up sentence.
- Where a reader might over-read a claim, say the limit out loud — "this page
  describes the work, not a quotation"; "an illustration of the method, not a
  photograph of a job". The caveats build more trust than they cost.

---

## 3. Structure

**Homepage** — hero · scope strip · nine services · sectors · process · safety
and compliance · FAQ · contact form.

The argument runs: here is what we do → here is where we do it → here is how a
job actually runs → here is why it is safe → here are your questions answered →
here is how to start. Each section answers the objection raised by the one above.

**Service pages** — the same shape nine times: a paragraph on what makes this
kind of work hard, then what the work covers, then a caveat, then a form
pre-filled with that service. A visitor who lands from search on one service page
can enquire without navigating anywhere.

**About** — capability and refusals, no invented history. The "what we will not
do" list does more work than a founder story would, and it is honest.

---

## 4. Governance — how a claim gets published

1. Is it confirmed by the client in writing? If no, it does not ship.
2. Could a reader act on it in a way that costs them money or safety? Then it
   needs a document behind it, not an assurance.
3. Is it a specific, checkable statement, or an adjective? Prefer the former.
4. Would it still be true on the worst day of the year? "24/7" would not be, so
   it is not there.

Unconfirmed facts are gated in `src/lib/site-config.ts`. Components read the
gate, never a literal, so an unconfirmed fact cannot reach a page by accident.
The detail sits in `docs/missing-client-info.md`.

---

## 5. Content still to be made, in order of value

| # | Item | Why | Blocked on |
| --- | --- | --- | --- |
| 1 | Real project photography | The single highest-value addition. The site has places ready for it | Client photos + permissions |
| 2 | Service area copy | Unlocks local search entirely | Client confirmation |
| 3 | A named person on About | Small technical businesses are chosen on a specific human | Client biography |
| 4 | "What to have ready before your gas quote" PDF | Useful, qualifies enquiries, earns links | Nothing — could be written now |
| 5 | Compliance explainer | The CoC questions are what people actually search | Which SANS standards to cite by name |
| 6 | Per-sector kitchen pages | Restaurants, guest houses, school kitchens | Real work to point at |

---

## 6. Maintenance

- Review the FAQ every six months against real enquiry questions — the enquiry
  form is the best keyword research available, and it costs nothing to read.
- Re-check `docs/missing-client-info.md` whenever the client confirms anything;
  several items unlock UI that is already built and waiting.
- Update the Privacy Policy if analytics are enabled later; it currently
  describes the no-cookie default state accurately.
- Never add a service without adding it to `src/data/services.ts` — the
  nine-tuple type will force the layout question to be answered deliberately
  rather than letting the 3 × 3 grid break silently.
