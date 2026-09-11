"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ServiceTitle } from "@/data/service-titles";
import {
  CONTACT_DEFAULTS,
  SERVICE_CHOICES,
  SITE_TYPES,
  URGENCY_OPTIONS,
  contactSchema,
  type ContactInput,
} from "@/lib/validation/contact";
import { track, trackAdsConversion } from "@/lib/analytics";
import { EmailLink } from "@/components/EmailLink";
import { BUSINESS_EMAIL, IS_PREVIEW } from "@/lib/site-config";

/**
 * GAS DESIGNS — CONTACT FORM
 *
 * Validated in the browser for speed and re-validated on the server for trust.
 * Errors are announced, linked to their input with `aria-describedby`, and the
 * first invalid field receives focus.
 *
 * Nothing the visitor types is sent to analytics — only the fact that the form
 * started, failed validation, or succeeded, plus the names of failing fields.
 */
export function ContactForm({ initialService }: { initialService?: ServiceTitle }) {
  const router = useRouter();
  const uid = useId();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const started = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...CONTACT_DEFAULTS,
      service: initialService ?? CONTACT_DEFAULTS.service,
    },
    mode: "onBlur",
  });

  // Capture campaign attribution and page context once, on the client.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue("utmSource", params.get("utm_source") ?? "");
    setValue("utmMedium", params.get("utm_medium") ?? "");
    setValue("utmCampaign", params.get("utm_campaign") ?? "");
    setValue("utmTerm", params.get("utm_term") ?? "");
    setValue("utmContent", params.get("utm_content") ?? "");
    setValue("pageUrl", window.location.href.slice(0, 500));
  }, [setValue]);

  const noteStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { location: "contact" });
  };

  const onSubmit = handleSubmit(
    async (values) => {
      setSubmitError(null);

      /*
       * The preview is a static export with no API route behind it. Bail out
       * before the fetch rather than letting it 404 — the form stays on screen
       * and fully reviewable, it simply does not send.
       */
      if (IS_PREVIEW) return;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
        });

        const result: {
          ok: boolean;
          error?: string;
          fieldErrors?: Record<string, string>;
        } = await response.json().catch(() => ({ ok: false }));

        if (!response.ok || !result.ok) {
          if (result.fieldErrors) {
            for (const [field, message] of Object.entries(result.fieldErrors)) {
              setError(field as keyof ContactInput, { type: "server", message });
            }
            track("form_validation_error", {
              location: "contact",
              fields: Object.keys(result.fieldErrors),
            });
          }
          setSubmitError(
            result.error ?? "We could not send your message. Please try again.",
          );
          return;
        }

        track("form_success", { location: "contact", service: values.service });
        trackAdsConversion();
        router.push("/contact/sent");
      } catch {
        setSubmitError(
          "We could not reach the server. Please check your connection and try again.",
        );
      }
    },
    (formErrors) => {
      track("form_validation_error", {
        location: "contact",
        fields: Object.keys(formErrors),
      });
      const first = Object.keys(formErrors)[0] as keyof ContactInput | undefined;
      if (first) setFocus(first);
    },
  );

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  return (
    <form
      onSubmit={onSubmit}
      onChange={noteStart}
      noValidate
      /*
        Container query, not a viewport query: this form renders both in a wide
        page column and in the narrow sidebar of a service page. Pairing the
        fields off the viewport would cram two inputs into 170px there.
      */
      className="@container flex flex-col gap-6"
    >
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input
          id={fieldId("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Hidden attribution fields. */}
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("utmTerm")} />
      <input type="hidden" {...register("utmContent")} />
      <input type="hidden" {...register("pageUrl")} />
      <input type="hidden" {...register("submittedAt")} />

      <div className="grid gap-6 @md:grid-cols-2">
        <Field
          label="Full name"
          id={fieldId("fullName")}
          errorId={errorId("fullName")}
          error={errors.fullName?.message}
          required
        >
          <input
            id={fieldId("fullName")}
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
            className={inputClass(Boolean(errors.fullName))}
            {...register("fullName")}
          />
        </Field>

        <Field
          label="Company"
          id={fieldId("company")}
          errorId={errorId("company")}
          error={errors.company?.message}
          hint="Optional"
        >
          <input
            id={fieldId("company")}
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? errorId("company") : undefined}
            className={inputClass(Boolean(errors.company))}
            {...register("company")}
          />
        </Field>

        <Field
          label="Phone"
          id={fieldId("phone")}
          errorId={errorId("phone")}
          error={errors.phone?.message}
          required
        >
          <input
            id={fieldId("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={inputClass(Boolean(errors.phone))}
            {...register("phone")}
          />
        </Field>

        <Field
          label="Email"
          id={fieldId("email")}
          errorId={errorId("email")}
          error={errors.email?.message}
          required
        >
          <input
            id={fieldId("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClass(Boolean(errors.email))}
            {...register("email")}
          />
        </Field>

        <Field
          label="Suburb or town"
          id={fieldId("location")}
          errorId={errorId("location")}
          error={errors.location?.message}
          required
        >
          <input
            id={fieldId("location")}
            type="text"
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={errors.location ? true : undefined}
            aria-describedby={errors.location ? errorId("location") : undefined}
            className={inputClass(Boolean(errors.location))}
            {...register("location")}
          />
        </Field>

        <Field
          label="Service required"
          id={fieldId("service")}
          errorId={errorId("service")}
          error={errors.service?.message}
          required
        >
          <select
            id={fieldId("service")}
            aria-required="true"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? errorId("service") : undefined}
            className={inputClass(Boolean(errors.service))}
            {...register("service")}
          >
            {SERVICE_CHOICES.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Site type"
          id={fieldId("siteType")}
          errorId={errorId("siteType")}
          error={errors.siteType?.message}
          required
        >
          <select
            id={fieldId("siteType")}
            aria-required="true"
            aria-invalid={errors.siteType ? true : undefined}
            aria-describedby={errors.siteType ? errorId("siteType") : undefined}
            className={inputClass(Boolean(errors.siteType))}
            {...register("siteType")}
          >
            {SITE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="What do you need?"
          id={fieldId("urgency")}
          errorId={errorId("urgency")}
          error={errors.urgency?.message}
          required
        >
          <select
            id={fieldId("urgency")}
            aria-required="true"
            aria-invalid={errors.urgency ? true : undefined}
            aria-describedby={errors.urgency ? errorId("urgency") : undefined}
            className={inputClass(Boolean(errors.urgency))}
            {...register("urgency")}
          >
            {URGENCY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="About the work"
        id={fieldId("message")}
        errorId={errorId("message")}
        error={errors.message?.message}
        required
      >
        <textarea
          id={fieldId("message")}
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={inputClass(Boolean(errors.message))}
          placeholder="Appliances, site conditions, and anything already installed."
          {...register("message")}
        />
      </Field>

      {/* POPIA consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
          <input
            type="checkbox"
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[#FFC400]"
            {...register("consent")}
          />
          <span>
            I agree that Gas Designs may use the details above to respond to this
            enquiry, in line with the{" "}
            <Link
              href="/privacy-policy"
              className="text-warm-white underline decoration-signal-yellow decoration-2 underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p id={errorId("consent")} className="mt-2 text-sm text-[#C2342B]">
            {errors.consent.message}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-[#C2342B]/40 bg-[#C2342B]/10 p-4 text-sm text-warm-white"
        >
          <p>{submitError}</p>
          <p className="mt-2 text-mist">
            You can also email us at{" "}
            <EmailLink
              location="form-error"
              className="text-warm-white underline decoration-signal-yellow decoration-2 underline-offset-4"
            />
            .
          </p>
        </div>
      )}

      {IS_PREVIEW && (
        <p className="text-sm text-valve-steel">
          Enquiries are disabled on this preview. Email {BUSINESS_EMAIL}.
        </p>
      )}

      <div className="flex flex-col gap-4 @md:flex-row @md:items-center">
        <button
          type="submit"
          disabled={isSubmitting || IS_PREVIEW}
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-signal-yellow px-7 py-3.5 text-base font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
        <p className="type-label text-valve-steel">
          We reply by email to the address you give us.
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-md border bg-carbon-2/70 px-4 py-3 text-base text-warm-white",
    "placeholder:text-valve-steel transition-colors",
    "focus:outline-none focus-visible:border-signal-yellow",
    hasError ? "border-[#C2342B]" : "border-white/12 hover:border-white/25",
  ].join(" ");
}

function Field({
  label,
  id,
  error,
  errorId,
  required,
  hint,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  errorId: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label text-valve-steel">
        {label}
        {required ? (
          <span className="text-signal-yellow"> *</span>
        ) : hint ? (
          <span className="text-valve-steel"> — {hint}</span>
        ) : null}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-[#C2342B]">
          {error}
        </p>
      )}
    </div>
  );
}
