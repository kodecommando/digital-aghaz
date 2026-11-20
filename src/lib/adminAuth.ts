import crypto from 'node:crypto';

const ADMIN_CREDENTIAL_SALT = 'da-owner-v1:';
// Precomputed SHA-256 digests for authorized owner portal credentials (never stored in plaintext or UI)
const OWNER_EMAIL_SHA256 = '3cfb102fdc417ca4b0498d2a3ed77706640fc04b5017b7a5d71cb16b2ed51944';
const OWNER_PASSWORD_SHA256 = '0598e455e2fb4bb71e809ff99e1c446810f600bfd399f5e41e3d1080eea788c5';

function sha256Buffer(value: string): Buffer {
  return crypto.createHash('sha256').update(value, 'utf8').digest();
}

function timingSafeHexMatch(candidatePlaintext: string, expectedHexDigest: string): boolean {
  const candidateBuf = sha256Buffer(candidatePlaintext);
  const expectedBuf = Buffer.from(expectedHexDigest, 'hex');
  if (candidateBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(candidateBuf, expectedBuf);
}

export function verifyAdminCredentials(
  emailInput: unknown,
  passwordInput: unknown,
  env: NodeJS.ProcessEnv = process.env
): { ok: true; email: string } | { ok: false } {
  if (typeof emailInput !== 'string' || typeof passwordInput !== 'string') {
    return { ok: false };
  }
  const normalizedEmail = emailInput.trim().toLowerCase();
  if (!normalizedEmail || !passwordInput) {
    return { ok: false };
  }

  const customEmail = env.ADMIN_AUTH_EMAIL?.trim().toLowerCase();
  const emailValid = customEmail
    ? timingSafeHexMatch(normalizedEmail, sha256Buffer(customEmail).toString('hex'))
    : timingSafeHexMatch(normalizedEmail, OWNER_EMAIL_SHA256);

  const customPass = env.ADMIN_PASSCODE?.trim();
  const expectedPasswordDigest =
    customPass && customPass.length >= 8
      ? sha256Buffer(`${ADMIN_CREDENTIAL_SALT}${customPass}`).toString('hex')
      : OWNER_PASSWORD_SHA256;

  const passwordValid = timingSafeHexMatch(
    `${ADMIN_CREDENTIAL_SALT}${passwordInput}`,
    expectedPasswordDigest
  );

  if (!emailValid || !passwordValid) {
    return { ok: false };
  }

  return { ok: true, email: normalizedEmail };
}
