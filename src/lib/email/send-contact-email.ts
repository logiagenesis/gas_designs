import "server-only";
import nodemailer from "nodemailer";
import type { ContactData } from "@/lib/validation/contact";
import { BUSINESS_NAME } from "@/lib/site-config";

/**
 * GAS DESIGNS — CONTACT EMAIL
 *
 * SMTP only, via Google Workspace. No Google APIs, no OAuth flow, no service
 * account. Every credential comes from the environment and none of it is ever
 * logged, returned to the browser, or named in a user-facing message.
 */

/** Thrown when the mail transport has not been configured for this deployment. */
export class SmtpNotConfiguredError extends Error {
  constructor() {
    super("SMTP transport is not configured");
    this.name = "SmtpNotConfiguredError";
  }
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

/** Reads and validates transport configuration. Returns null when incomplete. */
function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);

  if (!host || !user || !pass || !to || Number.isNaN(port)) return null;

  return {
    host,
    port,
    user,
    pass,
    to,
    // Falls back to the authenticated mailbox, which Workspace requires anyway.
    from: process.env.SMTP_FROM?.trim() || user,
  };
}

/** Escapes a value for safe inclusion in the HTML body of the notification. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildRows(data: ContactData): [string, string][] {
  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Company", data.company || "—"],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Location", data.location],
    ["Service", data.service],
    ["Site type", data.siteType],
    ["Enquiry type", data.urgency],
  ];

  const campaign = [
    ["UTM source", data.utmSource],
    ["UTM medium", data.utmMedium],
    ["UTM campaign", data.utmCampaign],
    ["UTM term", data.utmTerm],
    ["UTM content", data.utmContent],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  rows.push(...campaign);
  if (data.pageUrl) rows.push(["Page", data.pageUrl]);
  rows.push(["Submitted", data.submittedAt || new Date().toISOString()]);

  return rows;
}

/**
 * Sends the enquiry to the business mailbox.
 * @throws {SmtpNotConfiguredError} when transport configuration is missing.
 */
export async function sendContactEmail(data: ContactData): Promise<void> {
  const config = readSmtpConfig();
  if (!config) throw new SmtpNotConfiguredError();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  const rows = buildRows(data);

  const text = [
    `New enquiry from the ${BUSINESS_NAME} website`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#16181B;line-height:1.6">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from the ${escapeHtml(
        BUSINESS_NAME,
      )} website</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6F747B">${escapeHtml(
                label,
              )}</td><td style="padding:4px 0"><strong>${escapeHtml(
                value,
              )}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 6px;font-size:14px;color:#6F747B">Message</h3>
      <p style="margin:0;font-size:14px;white-space:pre-wrap">${escapeHtml(
        data.message,
      )}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${BUSINESS_NAME} website" <${config.from}>`,
    to: config.to,
    replyTo: `"${data.fullName}" <${data.email}>`,
    subject: `${data.urgency}: ${data.service} — ${data.location}`,
    text,
    html,
  });
}
