import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAiHelperTheme } from './aiHelperTheme';

test('resolveAiHelperTheme switches palette dynamically between dark and light themes', () => {
  const darkPalette = resolveAiHelperTheme('dark');
  const lightPalette = resolveAiHelperTheme('light');

  assert.equal(darkPalette.paletteId, 'dark-crimson');
  assert.equal(lightPalette.paletteId, 'light-cobalt');

  assert.notEqual(darkPalette.accentHex, lightPalette.accentHex);
  assert.notEqual(darkPalette.surfaceBg, lightPalette.surfaceBg);
  assert.notEqual(darkPalette.ringGradientStyle, lightPalette.ringGradientStyle);
  assert.notEqual(darkPalette.sendBtnClasses, lightPalette.sendBtnClasses);

  assert.ok(darkPalette.ringGradientStyle.includes('#EA0400'));
  assert.ok(lightPalette.ringGradientStyle.includes('#2563EB'));
});
