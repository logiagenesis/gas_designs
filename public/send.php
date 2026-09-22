<?php
/**
 * Gas Designs — enquiry handler.
 *
 * Plain PHP for cPanel/Apache. No Composer, no dependencies: shared hosting
 * has mail() configured and adding a library is a deployment problem, not a
 * feature. Posted to by src/js/main.js; on any failure the browser falls back
 * to a prefilled mailto: link, so an enquiry is never simply lost.
 *
 * Returns JSON: {"ok":true} or {"ok":false,"error":"..."}.
 */

declare(strict_types=1);

// ---------------------------------------------------------------- settings

/** Where enquiries are delivered. */
const MAIL_TO = 'pierre@gasdesigns.co.za';

/**
 * Envelope sender. MUST be an address on the hosting account's own domain —
 * shared hosts reject or spam-bin mail claiming to come from elsewhere. The
 * visitor's address goes in Reply-To instead.
 */
const MAIL_FROM = 'website@gasdesigns.co.za';

/** Max submissions per IP per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW = 600; // seconds

// ------------------------------------------------------------------ helpers

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail(string $message, int $code = 400): never
{
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

/** Strips CR/LF so a value can never inject extra mail headers. */
function headerSafe(string $value): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value));
}

function field(string $name, int $max = 500): string
{
    $raw = $_POST[$name] ?? '';
    if (!is_string($raw)) {
        return '';
    }
    return mb_substr(trim($raw), 0, $max);
}

function clientIp(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = explode(',', (string) $_SERVER[$key])[0];
            return trim($ip);
        }
    }
    return 'unknown';
}

/**
 * File-based throttle. A speed bump against casual abuse, not a security
 * control — shared hosting gives us no shared store to do better.
 */
function rateLimited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/gd_rate_' . sha1($ip) . '.json';
    $now = time();
    $hits = [];

    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_filter($decoded, static fn($t) => is_int($t) && $t > $now - RATE_WINDOW);
        }
    }

    if (count($hits) >= RATE_LIMIT) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
    return false;
}

// -------------------------------------------------------------------- guard

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed.', 405);
}

if (rateLimited(clientIp())) {
    fail('Too many messages from this connection. Please try again shortly.', 429);
}

/*
 * Honeypot. A real visitor never sees this field, so anything in it means a
 * bot. Answer with an ordinary success — telling a bot it failed only teaches
 * it to try again differently.
 */
if (field('website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// ---------------------------------------------------------------- validate

$name     = field('name', 120);
$phone    = field('phone', 40);
$email    = field('email', 180);
$area     = field('area', 160);
$property = field('property', 60);
$service  = field('service', 120);
$message  = field('message', 4000);

$errors = [];

if (mb_strlen($name) < 2)                              $errors[] = 'name';
if (!preg_match('/^[0-9+()\-\s]{7,24}$/', $phone))     $errors[] = 'phone';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))        $errors[] = 'email';
if (mb_strlen($area) < 2)                              $errors[] = 'area';
if ($property === '')                                  $errors[] = 'property';
if ($service === '')                                   $errors[] = 'service';
if (mb_strlen($message) < 10)                          $errors[] = 'message';
if (($_POST['consent'] ?? '') === '')                  $errors[] = 'consent';

if ($errors) {
    fail('Please check the highlighted fields: ' . implode(', ', $errors), 422);
}

// -------------------------------------------------------------------- send

$subject = headerSafe(sprintf('Quote request — %s — %s', $service, $area));

$body = implode("\n", [
    'New enquiry from the Gas Designs website',
    '',
    'Name:            ' . $name,
    'Phone:           ' . $phone,
    'Email:           ' . $email,
    'Suburb / area:   ' . $area,
    'Property type:   ' . $property,
    'Service:         ' . $service,
    '',
    'Message:',
    $message,
    '',
    '---',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'Page:      ' . headerSafe(field('page_url', 300)),
    'IP:        ' . clientIp(),
]);

$headers = implode("\r\n", [
    'From: Gas Designs Website <' . MAIL_FROM . '>',
    'Reply-To: ' . headerSafe($name) . ' <' . headerSafe($email) . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

$sent = @mail(MAIL_TO, $subject, $body, $headers, '-f' . MAIL_FROM);

if (!$sent) {
    error_log('[gasdesigns] mail() failed for enquiry from ' . $email);
    fail('We could not send your message. Please email us directly.', 502);
}

echo json_encode(['ok' => true]);
