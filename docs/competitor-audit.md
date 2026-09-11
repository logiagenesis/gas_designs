# Competitor Audit

## Status: BLOCKED — no web access

**No competitor audit was carried out, because no competitor page could be
fetched.** This document records what was attempted and what the result was. It
contains no competitor analysis, because producing one without having seen the
pages would mean inventing it.

---

## What the brief asked for

> Audit 20 South African competitors in LPG, natural gas, gas COC, commercial
> kitchen gas, industrial gas, bulk LPG, leak detection, and maintenance.
>
> A source counts only if its URL, article, video transcript, podcast transcript,
> or official notes were successfully fetched.

---

## What was attempted

The build environment routes all outbound HTTP through a network egress proxy.
Every page fetch was refused.

| Target | Purpose | Result |
| --- | --- | --- |
| `https://dp-energies.co.za/` | Service-category reference (brief §3.1) | `EGRESS_BLOCKED` |
| `https://www.gasdesigns.co.za/` | Existing client site, if any | `EGRESS_BLOCKED` |
| `https://lpgas.co.za/resources/regulations-and-compliance/` | Standards reference | `EGRESS_BLOCKED` |
| `https://en.wikipedia.org/wiki/Ball_valve` | Control test on a neutral host | `EGRESS_BLOCKED` |

The control test matters: the block is environment-wide, not specific to
competitor domains or to any one site's robots policy.

Proxy state at the time of the attempts:

```
$ curl -sS "$HTTPS_PROXY/__agentproxy/status"
{ "enabled": true, "selective": false, "bundleCoversEveryHost": true, ... }
```

Only package registries (`registry.npmjs.org`, `pypi.org` and similar) bypass the
proxy, which is why `npm install` succeeded while every page fetch failed.

---

## What *was* available, and why it does not count

A web **search** tool was available and did return real result listings — titles
and URLs for South African gas companies and for LPGSA compliance pages.

**Those listings are not an audit.** The brief is explicit that a source counts
only if it was successfully fetched, and the per-item requirements make the
reason obvious: *visual style*, *CTA strategy*, *headline observations*, *trust
and compliance claims*, and *weakness* cannot be assessed from a search-results
snippet. Writing them from a title and a URL would be fabrication.

So no competitor names appear below, no counts, and no "20 audited" claim.

### The only search-derived material used anywhere

Two facts about the regulatory framework appeared consistently across search
result snippets and are treated as general background, not as competitor research:

- Gas installations in South Africa fall under the Pressure Equipment Regulations
  made under the Occupational Health and Safety Act (No. 85 of 1993).
- A Certificate of Compliance is issued after inspection, and installers are
  registered with SAQCC Gas.

The site refers to these in general terms only, and **never cites a specific SANS
standard number**, because the snippets disagreed with one another and no source
page could be opened to resolve the conflict. `docs/missing-client-info.md` asks
Pierre which standards he wants cited by name.

---

## Effect on the build

The build proceeded from confirmed brief facts alone. In practice this changed
little, because the instruction that governs everything else — no claim without
confirmation — already ruled out the main thing a competitor audit is used for,
which is deciding which claims to match.

What was lost:

- No evidence base for what competitors claim, so no way to know which claims are
  table stakes in this market and which are differentiators.
- No read on prevailing price framing, guarantee language or response-time
  promises.
- No sample of how competitors handle the compliance/credential question — the
  single most useful thing to have seen.

What was **not** lost: the positioning. The site's angle — compliance and proof
as the product, no unverifiable claims, no stock imagery, a valve rather than a
flame — comes from the brief's own constraints and from the service list, not
from what anyone else is doing.

---

## To complete this properly

On a machine with normal web access:

1. Fetch DP Energies as a service-category reference only.
2. Search each category — "gas installation", "gas COC", "commercial kitchen gas",
   "bulk LPG", "industrial gas", "gas leak detection" — with and without a
   geographic modifier, once the service area is confirmed.
3. For each of 20 competitors record: name · URL · what was fetched · services ·
   visual style · CTA strategy · SEO and headline observations · trust and
   compliance claims · weakness · Gas Designs counter-move.
4. Pay particular attention to how each one handles SAQCC registration and
   certificate issuing. That is where this market's trust is won, and where the
   Gas Designs site is currently silent by necessity rather than by choice.
