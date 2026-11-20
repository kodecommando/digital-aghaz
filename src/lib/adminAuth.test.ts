import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyAdminCredentials } from './adminAuth';

test('verifyAdminCredentials validates configured owner email and password cleanly', () => {
  const secretPass = ['Digital', 'Aghaz', '123!@#'].join('');
  const valid = verifyAdminCredentials('SalmanMaseed2168@gmail.com ', secretPass, {});
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.email, 'salmanmaseed2168@gmail.com');
  }

  assert.equal(verifyAdminCredentials('wrong@example.com', secretPass, {}).ok, false);
  assert.equal(verifyAdminCredentials('salmanmaseed2168@gmail.com', 'wrongpass', {}).ok, false);
  assert.equal(verifyAdminCredentials('', '', {}).ok, false);
});

test('verifyAdminCredentials supports env credential overrides when supplied', () => {
  const customEnv = {
    ADMIN_AUTH_EMAIL: 'owner@agency.example',
    ADMIN_PASSCODE: 'CustomSecret99!',
  } as unknown as NodeJS.ProcessEnv;

  assert.equal(
    verifyAdminCredentials('owner@agency.example', 'CustomSecret99!', customEnv).ok,
    true
  );
  assert.equal(
    verifyAdminCredentials('salmanmaseed2168@gmail.com', 'CustomSecret99!', customEnv).ok,
    false
  );
});
