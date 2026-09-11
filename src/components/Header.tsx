"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { track } from "@/lib/analytics";
import { BUSINESS_NAME, CAN_SHOW_PHONE, PRIMARY_NAV, UNCONFIRMED, confirmedValue } from "@/lib/site-config";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu, and the page does not scroll behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const phone = CAN_SHOW_PHONE ? confirmedValue(UNCONFIRMED.phone) : null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "glass-panel border-b border-b-white/10"
          : "border-b border-b-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center text-warm-white"
          aria-label={`${BUSINESS_NAME} — home`}
        >
          <Logo variant="full" className="h-7 w-auto lg:h-8" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-signal-yellow"
                    : "text-mist hover:text-warm-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Rendered only once a phone number is confirmed for publication. */}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden rounded-md px-3 py-2 font-mono text-sm text-mist transition-colors hover:text-warm-white lg:inline-flex"
            >
              {phone}
            </a>
          )}

          <Link
            href="/contact"
            onClick={() => track("cta_primary_click", { location: "header" })}
            className="hidden rounded-md bg-signal-yellow px-5 py-2.5 text-sm font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft lg:inline-flex"
          >
            Request a Quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-warm-white lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-t-white/10 lg:hidden"
      >
        <nav aria-label="Primary — mobile" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-base font-medium ${
                      active ? "text-signal-yellow" : "text-mist"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            onClick={() => track("cta_primary_click", { location: "mobile-menu" })}
            className="mt-3 block rounded-md bg-signal-yellow px-5 py-3 text-center text-base font-semibold text-carbon"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}

/**
 * Menu toggle drawn from the same two-bar geometry as the valve lever, so the
 * header does not introduce a second icon language.
 */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="transition-transform duration-200"
      >
        {open ? (
          <>
            <path d="M5 5 19 19" />
            <path d="M19 5 5 19" />
          </>
        ) : (
          <>
            <path d="M3 8h18" />
            <path d="M3 16h12" />
          </>
        )}
      </g>
    </svg>
  );
}
