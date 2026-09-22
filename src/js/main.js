/* ==========================================================================
   GAS DESIGNS — behaviour
   Vanilla JS, no framework, no dependencies.
   ========================================================================== */

/* ------------------------------------------------------------ mobile menu */

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-mobile-nav]");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    setOpen(nav.dataset.open !== "true");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* --------------------------------------------------------- image fallbacks
   Photographs are supplied by the client. Until a file lands, show a labelled
   slot rather than a broken image, so a missing asset reads as outstanding
   work instead of a fault.
   -------------------------------------------------------------------------- */

/**
 * A photograph that loaded covers its slot, so the slot can go. One that
 * failed is hidden, letting the labelled slot beneath it show through.
 */
function resolveMedia(img) {
  const holder = img.closest(".media");
  if (!holder) return;

  if (img.naturalWidth > 0) {
    holder.querySelector(".media__slot")?.remove();
  } else {
    img.setAttribute("data-failed", "");
  }
}

function initImages() {
  document.querySelectorAll(".media img").forEach((img) => {
    if (img.complete) {
      resolveMedia(img);
      return;
    }
    img.addEventListener("load", () => resolveMedia(img), { once: true });
    img.addEventListener("error", () => resolveMedia(img), { once: true });
  });
}

/**
 * The brand logo is supplied by the client. Until the file exists, show the
 * name as type in a marked slot rather than a broken image.
 */
function initLogo() {
  document.querySelectorAll("img[data-logo]").forEach((img) => {
    const swap = () => {
      if (img.naturalWidth > 0) return;
      const span = document.createElement("span");
      span.className = "logo-fallback";
      span.textContent = "Gas Designs";
      span.title = "Logo slot — awaiting assets/brand/gasdesigns-logo.svg";
      img.replaceWith(span);
    };
    if (img.complete) swap();
    else img.addEventListener("error", swap, { once: true });
  });
}

/* --------------------------------------------------- service pre-selection
   "Ask about this" on a tile carries ?service=<slug>. Select it in the
   dropdown and move focus to the form.
   -------------------------------------------------------------------------- */

function selectService(value) {
  const select = document.querySelector("#service");
  if (!select || !value) return false;
  const match = Array.from(select.options).find((o) => o.value === value);
  if (!match) return false;
  select.value = value;
  return true;
}

function initServicePreselect() {
  const fromQuery = new URLSearchParams(window.location.search).get("service");
  if (fromQuery) selectService(fromQuery);

  document.querySelectorAll("[data-service-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const value = link.dataset.serviceLink;
      if (!selectService(value)) return;
      e.preventDefault();
      document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => {
        document.querySelector("#name")?.focus({ preventScroll: true });
      }, 420);
    });
  });
}

/* -------------------------------------------------------------------- form */

const VALIDATORS = {
  name: (v) => (v.trim().length >= 2 ? "" : "Enter your name."),
  phone: (v) =>
    /^[0-9+()\-\s]{7,24}$/.test(v.trim())
      ? ""
      : "Enter a contact number of at least 7 digits.",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      ? ""
      : "Enter a valid email address.",
  area: (v) => (v.trim().length >= 2 ? "" : "Enter the suburb or area."),
  property: (v) => (v ? "" : "Choose a property type."),
  service: (v) => (v ? "" : "Choose the service you need."),
  message: (v) =>
    v.trim().length >= 10 ? "" : "Tell us briefly what you need.",
};

function setError(field, msg) {
  const input = document.querySelector(`#${field}`);
  const slot = document.querySelector(`#${field}-error`);
  if (!input || !slot) return;
  slot.textContent = msg;
  if (msg) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function validateForm(form) {
  let firstBad = null;
  for (const [field, check] of Object.entries(VALIDATORS)) {
    const input = form.elements.namedItem(field);
    if (!input) continue;
    const msg = check(input.value);
    setError(field, msg);
    if (msg && !firstBad) firstBad = input;
  }

  const consent = form.elements.namedItem("consent");
  const consentMsg = consent && !consent.checked
    ? "Please confirm we may use your details to reply."
    : "";
  const consentSlot = document.querySelector("#consent-error");
  if (consentSlot) consentSlot.textContent = consentMsg;
  if (consentMsg && !firstBad) firstBad = consent;

  return firstBad;
}

/** Builds the mailto: fallback used when the PHP handler is unreachable. */
function mailtoFallback(form, to) {
  const get = (n) => (form.elements.namedItem(n)?.value || "").trim();
  const body = [
    `Name: ${get("name")}`,
    `Phone: ${get("phone")}`,
    `Email: ${get("email")}`,
    `Suburb / area: ${get("area")}`,
    `Property type: ${get("property")}`,
    `Service required: ${get("service")}`,
    "",
    get("message"),
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(
    `Quote request — ${get("service") || "Gas Designs"}`,
  )}&body=${encodeURIComponent(body)}`;
}

function initForm() {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const submit = form.querySelector('button[type="submit"]');
  const to = form.dataset.fallbackEmail || "";

  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("blur", () => {
      const check = VALIDATORS[el.id];
      if (check) setError(el.id, check(el.value));
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bad = validateForm(form);
    if (bad) {
      bad.focus();
      return;
    }

    // Honeypot: a real visitor never sees this field.
    if ((form.elements.namedItem("website")?.value || "") !== "") {
      window.location.href = form.dataset.thanks || "/thank-you/";
      return;
    }

    submit.disabled = true;
    const original = submit.textContent;
    submit.textContent = "Sending…";
    if (status) {
      status.hidden = true;
      status.removeAttribute("data-tone");
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      let ok = res.ok;
      try {
        const data = await res.json();
        ok = ok && data.ok !== false;
      } catch {
        /* handler returned no JSON; rely on the status code */
      }

      if (ok) {
        window.location.href = form.dataset.thanks || "/thank-you/";
        return;
      }
      throw new Error("handler rejected");
    } catch {
      // PHP not available (e.g. the static preview) or the send failed.
      if (status) {
        status.hidden = false;
        status.dataset.tone = "error";
        status.innerHTML =
          'We could not send that from the website. ' +
          '<a href="' +
          mailtoFallback(form, to) +
          '">Send it by email instead</a> and it will reach us.';
      }
      submit.disabled = false;
      submit.textContent = original;
    }
  });
}

/* -------------------------------------------------------------------- misc */

function initYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initLogo();
  initImages();
  initServicePreselect();
  initForm();
  initYear();
});
